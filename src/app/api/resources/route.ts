import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Resource } from "@/lib/models";
import { apiError, paginateParams, paginatedResult, buildSearchFilter } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const { page, limit, skip, sort, search } = paginateParams(searchParams);

    const filter: Record<string, unknown> = {
      isPublished: true,
      ...buildSearchFilter(search, ["title", "description"]),
    };

    const category = searchParams.get("category");
    const type = searchParams.get("type");
    if (category) filter.category = category;
    if (type) filter.type = type;

    const [resources, total] = await Promise.all([
      Resource.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      Resource.countDocuments(filter),
    ]);

    return NextResponse.json(paginatedResult(resources, total, page, limit));
  } catch (error) {
    console.error("Resources GET error:", error);
    return apiError("Failed to fetch resources", 500);
  }
}
