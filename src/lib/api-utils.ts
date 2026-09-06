import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { config } from "./config";

export function apiSuccess<T>(data: T, message?: string, status = 200) {
  return NextResponse.json({ success: true, data, message }, { status });
}

export function apiError(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

export function generateInvoiceNumber() {
  const date = new Date();
  const prefix = `EBN${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}`;
  return `${prefix}-${crypto.randomInt(10000, 99999)}`;
}

export function paginateParams(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));
  const skip = (page - 1) * limit;
  const sort = searchParams.get("sort") || "-createdAt";
  const search = searchParams.get("search") || "";
  return { page, limit, skip, sort, search };
}

export function paginatedResult<T>(data: T[], total: number, page: number, limit: number) {
  return {
    success: true,
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export function buildSearchFilter(search: string, fields: string[]) {
  if (!search) return {};
  return {
    $or: fields.map((field) => ({ [field]: { $regex: search, $options: "i" } })),
  };
}

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: false,
  auth: config.email.user ? { user: config.email.user, pass: config.email.pass } : undefined,
});

export async function sendEmail(to: string, subject: string, html: string) {
  if (!config.email.user) {
    console.log(`[Email] To: ${to} | Subject: ${subject}`);
    return;
  }
  await transporter.sendMail({ from: config.email.from, to, subject, html });
}

export async function sendOTPEmail(to: string, otp: string) {
  await sendEmail(
    to,
    "EBN – Verification Code",
    `<div style="font-family:Inter,sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#F7F8FA;border-radius:16px;">
      <h2 style="color:#143055;font-family:Poppins,sans-serif;">Verify Your Email</h2>
      <p style="color:#64748b;">Your EBN verification code is:</p>
      <p style="font-size:32px;font-weight:bold;color:#16999A;letter-spacing:8px;">${otp}</p>
      <p style="color:#64748b;font-size:14px;">This code expires in 10 minutes.</p>
    </div>`
  );
}

export async function sendWelcomeEmail(to: string, name: string) {
  await sendEmail(
    to,
    "Welcome to Entrepreneur Business Network!",
    `<div style="font-family:Inter,sans-serif;max-width:480px;margin:0 auto;padding:32px;">
      <h2 style="color:#143055;font-family:Poppins,sans-serif;">Welcome, ${name}!</h2>
      <p style="color:#64748b;">Your journey to quality business referrals starts now.</p>
    </div>`
  );
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await sendEmail(
    config.email.from,
    `EBN Contact: ${data.subject}`,
    `<p><strong>From:</strong> ${data.name} (${data.email})</p><p>${data.message}</p>`
  );
}
