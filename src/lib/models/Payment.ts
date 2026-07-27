import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPayment extends Document {
  user: Types.ObjectId;
  amount: number;
  currency: string;
  plan: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  status: "pending" | "completed" | "failed" | "refunded";
  invoiceNumber: string;
  gstAmount: number;
  couponCode?: string;
}

const paymentSchema = new Schema<IPayment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    plan: { type: String, required: true },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: String,
    status: { type: String, enum: ["pending", "completed", "failed", "refunded"], default: "pending" },
    invoiceNumber: { type: String, required: true, unique: true },
    gstAmount: { type: Number, default: 0 },
    couponCode: String,
  },
  { timestamps: true }
);

export const Payment = mongoose.models.Payment || mongoose.model<IPayment>("Payment", paymentSchema);
