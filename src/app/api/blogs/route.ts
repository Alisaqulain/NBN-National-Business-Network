import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models";
import { getAuthUser } from "@/lib/auth";
import { apiSuccess, apiError, paginateParams, paginatedResult, buildSearchFilter } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const { page, limit, skip, sort, search } = paginateParams(searchParams);

    const filter: Record<string, unknown> = {
      isPublished: true,
      ...buildSearchFilter(search, ["title", "excerpt", "content"]),
    };

    const category = searchParams.get("category");
    if (category) filter.category = category;

    const [blogs, total] = await Promise.all([
      Blog.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      Blog.countDocuments(filter),
    ]);

    return NextResponse.json(paginatedResult(blogs, total, page, limit));
  } catch (error) {
    console.error("Blogs GET error:", error);
    return apiError("Failed to fetch blogs", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await getAuthUser(req);
    if (!user || user.role !== "admin") return apiError("Forbidden", 403);

    const blog = await Blog.create(await req.json());
    return apiSuccess(blog, "Blog created", 201);
  } catch (error) {
    console.error("Blog POST error:", error);
    return apiError("Failed to create blog", 500);
  }
}
