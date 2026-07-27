import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User, Member } from "@/lib/models";
import { signToken, formatUser } from "@/lib/auth";
import { apiSuccess, apiError, generateOTP, sendOTPEmail, sendWelcomeEmail } from "@/lib/api-utils";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      firstName, lastName, email, password, phone,
      businessName, category, city, state, website, businessDescription,
    } = body;

    if (!firstName || !lastName || !email || !password || !businessName || !category || !city || !state) {
      return apiError("Missing required fields", 400);
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return apiError("Email already registered", 409);

    const otp = generateOTP();
    const user = await User.create({
      firstName, lastName, email, password, phone,
      otp, otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
    });

    await Member.create({
      user: user._id, businessName, category, city, state,
      website: website || undefined,
      businessDescription: businessDescription || undefined,
    });

    await sendOTPEmail(email, otp);

    return apiSuccess({ userId: user._id.toString() }, "Registration successful. Please verify your email.", 201);
  } catch (error) {
    console.error("Register error:", error);
    return apiError("Registration failed", 500);
  }
}
