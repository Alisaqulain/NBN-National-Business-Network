import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models";
import { apiSuccess, apiError } from "@/lib/api-utils";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    const { slug } = await params;
    const blog = await Blog.findOne({ slug, isPublished: true }).lean();
    if (!blog) return apiError("Blog not found", 404);
    return apiSuccess(blog);
  } catch (error) {
    console.error("Blog slug GET error:", error);
    return apiError("Failed to fetch blog", 500);
  }
}
