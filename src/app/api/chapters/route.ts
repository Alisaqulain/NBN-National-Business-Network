import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Chapter } from "@/lib/models";
import { getAuthUser } from "@/lib/auth";
import { apiSuccess, apiError, paginateParams, paginatedResult, buildSearchFilter } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const { page, limit, skip, sort, search } = paginateParams(searchParams);

    const filter: Record<string, unknown> = {
      isActive: true,
      ...buildSearchFilter(search, ["name", "city", "state", "address"]),
    };

    const city = searchParams.get("city");
    const state = searchParams.get("state");
    const category = searchParams.get("category");
    if (city) filter.city = city;
    if (state) filter.state = state;
    if (category) filter.category = category;

    const [chapters, total] = await Promise.all([
      Chapter.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      Chapter.countDocuments(filter),
    ]);

    return NextResponse.json(paginatedResult(chapters, total, page, limit));
  } catch (error) {
    console.error("Chapters GET error:", error);
    return apiError("Failed to fetch chapters", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await getAuthUser(req);
    if (!user || user.role !== "admin") return apiError("Forbidden", 403);

    const chapter = await Chapter.create(await req.json());
    return apiSuccess(chapter, "Chapter created", 201);
  } catch (error) {
    console.error("Chapter POST error:", error);
    return apiError("Failed to create chapter", 500);
  }
}
