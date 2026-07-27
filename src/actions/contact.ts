"use server";

import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/lib/models";
import { sendContactNotification } from "@/lib/api-utils";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export async function submitContactForm(data: z.infer<typeof contactSchema>) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: "Invalid form data" };
  }

  try {
    await connectDB();
    await Contact.create(parsed.data);
    await sendContactNotification(parsed.data);
    return { success: true, message: "Message sent successfully" };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, message: "Failed to send message" };
  }
}
