import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Referral, Member } from "@/lib/models";
import { getAuthUser } from "@/lib/auth";
import { apiSuccess, apiError, paginateParams, paginatedResult } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const user = await getAuthUser(req);
    if (!user) return apiError("Not authenticated", 401);

    const member = await Member.findOne({ user: user._id });
    if (!member) return apiError("Member profile not found", 404);

    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = paginateParams(searchParams);
    const status = searchParams.get("status");

    const filter: Record<string, unknown> = {
      $or: [{ from: member._id }, { to: member._id }],
    };
    if (status) filter.status = status;

    const [referrals, total] = await Promise.all([
      Referral.find(filter)
        .populate("from", "businessName category city")
        .populate("to", "businessName category city")
        .sort("-createdAt")
        .skip(skip)
        .limit(limit)
        .lean(),
      Referral.countDocuments(filter),
    ]);

    return NextResponse.json(paginatedResult(referrals, total, page, limit));
  } catch (error) {
    console.error("Referrals GET error:", error);
    return apiError("Failed to fetch referrals", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await getAuthUser(req);
    if (!user) return apiError("Not authenticated", 401);

    const fromMember = await Member.findOne({ user: user._id });
    if (!fromMember) return apiError("Member profile not found", 404);

    const { toMemberId, description, value } = await req.json();
    if (!toMemberId || !description) return apiError("Missing required fields", 400);

    const referral = await Referral.create({
      from: fromMember._id,
      to: toMemberId,
      description,
      value,
    });

    return apiSuccess(referral, "Referral created", 201);
  } catch (error) {
    console.error("Referral POST error:", error);
    return apiError("Failed to create referral", 500);
  }
}
