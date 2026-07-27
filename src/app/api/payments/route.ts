import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Payment, User } from "@/lib/models";
import { getAuthUser } from "@/lib/auth";
import { apiSuccess, apiError, generateInvoiceNumber } from "@/lib/api-utils";
import { config } from "@/lib/config";
import Razorpay from "razorpay";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await getAuthUser(req);
    if (!user) return apiError("Not authenticated", 401);

    const { plan, amount } = await req.json();
    if (!plan || !amount) return apiError("Plan and amount required", 400);

    if (!config.razorpay.keyId || !config.razorpay.keySecret) {
      return apiError("Payment gateway not configured", 503);
    }

    const razorpay = new Razorpay({
      key_id: config.razorpay.keyId,
      key_secret: config.razorpay.keySecret,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: generateInvoiceNumber(),
    });

    const gstAmount = Math.round(amount * 0.18);
    await Payment.create({
      user: user._id,
      amount,
      plan,
      razorpayOrderId: order.id,
      invoiceNumber: order.receipt as string,
      gstAmount,
      status: "pending",
    });

    return apiSuccess({ orderId: order.id, amount: order.amount, currency: order.currency, keyId: config.razorpay.keyId });
  } catch (error) {
    console.error("Payment order error:", error);
    return apiError("Failed to create payment order", 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const user = await getAuthUser(req);
    if (!user) return apiError("Not authenticated", 401);

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json();

    const expectedSignature = crypto
      .createHmac("sha256", config.razorpay.keySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return apiError("Invalid payment signature", 400);
    }

    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId, user: user._id },
      { razorpayPaymentId, status: "completed" },
      { new: true }
    );

    if (payment) {
      await User.findByIdAndUpdate(user._id, {
        membershipStatus: "active",
        membershipPlan: payment.plan,
      });
    }

    return apiSuccess(payment, "Payment verified");
  } catch (error) {
    console.error("Payment verify error:", error);
    return apiError("Payment verification failed", 500);
  }
}
