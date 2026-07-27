import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Testimonial } from "@/lib/models";
import { apiError, paginateParams, paginatedResult } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = paginateParams(searchParams);

    const [testimonials, total] = await Promise.all([
      Testimonial.find({ isPublished: true }).sort("-createdAt").skip(skip).limit(limit).lean(),
      Testimonial.countDocuments({ isPublished: true }),
    ]);

    return NextResponse.json(paginatedResult(testimonials, total, page, limit));
  } catch (error) {
    console.error("Testimonials GET error:", error);
    return apiError("Failed to fetch testimonials", 500);
  }
}
