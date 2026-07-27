import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Member } from "@/lib/models";
import { getAuthUser, formatUser } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return apiError("Not authenticated", 401);
  const member = await Member.findOne({ user: user._id });
  return apiSuccess({ user: formatUser(user), member });
}
