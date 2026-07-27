import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/lib/models";
import { apiSuccess, apiError, sendContactNotification } from "@/lib/api-utils";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return apiError("Missing required fields", 400);
    }

    const contact = await Contact.create({ name, email, phone, subject, message });
    await sendContactNotification({ name, email, subject, message });

    return apiSuccess(contact, "Message sent successfully", 201);
  } catch (error) {
    console.error("Contact POST error:", error);
    return apiError("Failed to send message", 500);
  }
}
