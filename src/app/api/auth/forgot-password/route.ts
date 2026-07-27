import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import { apiSuccess, apiError, generateOTP, sendOTPEmail } from "@/lib/api-utils";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();
    if (!email) return apiError("Email required", 400);

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return apiSuccess(null, "If email exists, OTP has been sent");

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendOTPEmail(email, otp);
    return apiSuccess(null, "If email exists, OTP has been sent");
  } catch (error) {
    console.error("Forgot password error:", error);
    return apiError("Request failed", 500);
  }
}
