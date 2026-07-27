import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import { signToken, formatUser } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/api-utils";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) return apiError("Email and OTP required", 400);

    const user = await User.findOne({ email: email.toLowerCase() }).select("+otp");
    if (!user || user.otp !== otp || !user.otpExpiry || user.otpExpiry < new Date()) {
      return apiError("Invalid or expired OTP", 400);
    }

    const token = signToken({ userId: user._id.toString(), email: user.email, role: user.role });
    return apiSuccess({ token }, "Code verified");
  } catch (error) {
    console.error("Verify reset OTP error:", error);
    return apiError("Verification failed", 500);
  }
}
