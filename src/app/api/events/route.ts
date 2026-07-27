import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Event } from "@/lib/models";
import { getAuthUser } from "@/lib/auth";
import { apiSuccess, apiError, paginateParams, paginatedResult, buildSearchFilter } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const { page, limit, skip, sort, search } = paginateParams(searchParams);

    const filter: Record<string, unknown> = {
      isPublished: true,
      ...buildSearchFilter(search, ["title", "description", "city"]),
    };

    const type = searchParams.get("type");
    if (type) filter.type = type;

    const [events, total] = await Promise.all([
      Event.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      Event.countDocuments(filter),
    ]);

    return NextResponse.json(paginatedResult(events, total, page, limit));
  } catch (error) {
    console.error("Events GET error:", error);
    return apiError("Failed to fetch events", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await getAuthUser(req);
    if (!user || !["admin", "moderator"].includes(user.role)) return apiError("Forbidden", 403);

    const event = await Event.create(await req.json());
    return apiSuccess(event, "Event created", 201);
  } catch (error) {
    console.error("Event POST error:", error);
    return apiError("Failed to create event", 500);
  }
}
