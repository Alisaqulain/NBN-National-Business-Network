import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import { signToken, formatUser } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/api-utils";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) return apiError("Email and password required", 400);

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return apiError("Invalid email or password", 401);
    }

    const token = signToken({ userId: user._id.toString(), email: user.email, role: user.role });

    const response = apiSuccess({ user: formatUser(user), token }, "Login successful");
    response.cookies.set("ebn_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return apiError("Login failed", 500);
  }
}
