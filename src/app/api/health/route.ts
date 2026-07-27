import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({
      success: true,
      message: "NBN API is running",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ success: false, message: "Database connection failed" }, { status: 503 });
  }
}
