import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Member } from "@/lib/models";
import { apiError, paginateParams, paginatedResult, buildSearchFilter } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const { page, limit, skip, search } = paginateParams(searchParams);

    const filter: Record<string, unknown> = {
      ...buildSearchFilter(search, ["businessName", "category", "city"]),
    };

    const category = searchParams.get("category");
    const city = searchParams.get("city");
    if (category) filter.category = category;
    if (city) filter.city = city;

    const [members, total] = await Promise.all([
      Member.find(filter)
        .populate("user", "firstName lastName email avatar")
        .sort("-createdAt")
        .skip(skip)
        .limit(limit)
        .lean(),
      Member.countDocuments(filter),
    ]);

    return NextResponse.json(paginatedResult(members, total, page, limit));
  } catch (error) {
    console.error("Members GET error:", error);
    return apiError("Failed to fetch members", 500);
  }
}
