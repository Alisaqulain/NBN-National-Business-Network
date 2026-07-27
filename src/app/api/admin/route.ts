import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User, Member, Chapter, Event, Referral, Payment } from "@/lib/models";
import { getAuthUser } from "@/lib/auth";
import { apiSuccess, apiError, paginateParams, paginatedResult } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const user = await getAuthUser(req);
    if (!user || user.role !== "admin") return apiError("Forbidden", 403);

    const [users, members, chapters, events, referrals, payments, revenue] = await Promise.all([
      User.countDocuments(),
      Member.countDocuments(),
      Chapter.countDocuments({ isActive: true }),
      Event.countDocuments({ isPublished: true }),
      Referral.countDocuments(),
      Payment.countDocuments({ status: "completed" }),
      Payment.aggregate([
        { $match: { status: "completed" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);

    return apiSuccess({
      users,
      members,
      chapters,
      events,
      referrals,
      payments,
      revenue: revenue[0]?.total || 0,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return apiError("Failed to fetch stats", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await getAuthUser(req);
    if (!user || user.role !== "admin") return apiError("Forbidden", 403);

    const { searchParams } = new URL(req.url);
    const resource = searchParams.get("resource") || "users";
    const { page, limit, skip } = paginateParams(searchParams);

    let data: unknown[] = [];
    let total = 0;

    if (resource === "users") {
      [data, total] = await Promise.all([
        User.find().sort("-createdAt").skip(skip).limit(limit).lean(),
        User.countDocuments(),
      ]);
    }

    return NextResponse.json(paginatedResult(data, total, page, limit));
  } catch (error) {
    console.error("Admin list error:", error);
    return apiError("Failed to fetch data", 500);
  }
}
