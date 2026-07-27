import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { config } from "./config";
import { connectDB } from "./mongodb";
import { User, IUser } from "./models/User";

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export function signToken(payload: TokenPayload) {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn as jwt.SignOptions["expiresIn"],
  });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, config.jwt.secret) as TokenPayload;
}

export function formatUser(user: IUser) {
  return {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    avatar: user.avatar,
    isVerified: user.isVerified,
    membershipStatus: user.membershipStatus,
    membershipPlan: user.membershipPlan,
    createdAt: user.createdAt.toISOString(),
  };
}

export async function getAuthUser(req?: NextRequest): Promise<IUser | null> {
  await connectDB();

  let token: string | undefined;

  if (req) {
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get("nbn_token")?.value;
    } catch {
      /* cookies() unavailable outside request */
    }
  }

  if (!token) return null;

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);
    return user;
  } catch {
    return null;
  }
}
