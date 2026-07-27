"use server";

import { connectDB } from "@/lib/mongodb";
import { User, Member } from "@/lib/models";
import { signToken, formatUser } from "@/lib/auth";
import { generateOTP, sendOTPEmail, sendWelcomeEmail } from "@/lib/api-utils";
import { cookies } from "next/headers";

export async function registerUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  businessName: string;
  category: string;
  city: string;
  state: string;
  website?: string;
  businessDescription?: string;
}) {
  try {
    await connectDB();

    const existing = await User.findOne({ email: data.email.toLowerCase() });
    if (existing) return { success: false, message: "Email already registered" };

    const otp = generateOTP();
    const user = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phone: data.phone,
      otp,
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
    });

    await Member.create({
      user: user._id,
      businessName: data.businessName,
      category: data.category,
      city: data.city,
      state: data.state,
      website: data.website,
      businessDescription: data.businessDescription,
    });

    await sendOTPEmail(data.email, otp);
    return { success: true, message: "Registration successful" };
  } catch (error) {
    console.error("Register action error:", error);
    return { success: false, message: "Registration failed" };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return { success: false, message: "Invalid email or password" };
    }

    const token = signToken({ userId: user._id.toString(), email: user.email, role: user.role });
    const cookieStore = await cookies();
    cookieStore.set("nbn_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return { success: true, data: { user: formatUser(user), token } };
  } catch (error) {
    console.error("Login action error:", error);
    return { success: false, message: "Login failed" };
  }
}

export async function verifyOtp(email: string, otp: string) {
  try {
    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() }).select("+otp");
    if (!user || user.otp !== otp || !user.otpExpiry || user.otpExpiry < new Date()) {
      return { success: false, message: "Invalid or expired OTP" };
    }

    user.isEmailVerified = true;
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    await sendWelcomeEmail(email, user.firstName);

    const token = signToken({ userId: user._id.toString(), email: user.email, role: user.role });
    const cookieStore = await cookies();
    cookieStore.set("nbn_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return { success: true, data: { user: formatUser(user), token } };
  } catch (error) {
    console.error("Verify OTP action error:", error);
    return { success: false, message: "Verification failed" };
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("nbn_token");
  return { success: true };
}
