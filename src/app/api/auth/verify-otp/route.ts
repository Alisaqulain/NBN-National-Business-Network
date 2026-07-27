import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import { signToken, formatUser } from "@/lib/auth";
import { apiSuccess, apiError, sendWelcomeEmail } from "@/lib/api-utils";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) return apiError("Email and OTP required", 400);

    const user = await User.findOne({ email: email.toLowerCase() }).select("+otp");
    if (!user || user.otp !== otp || !user.otpExpiry || user.otpExpiry < new Date()) {
      return apiError("Invalid or expired OTP", 400);
    }

    user.isEmailVerified = true;
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    await sendWelcomeEmail(email, user.firstName);

    const token = signToken({ userId: user._id.toString(), email: user.email, role: user.role });
    const response = apiSuccess({ user: formatUser(user), token }, "Email verified");
    response.cookies.set("nbn_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Verify OTP error:", error);
    return apiError("Verification failed", 500);
  }
}
