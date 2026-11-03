import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z
    .string()
    .trim()
    .min(5)
    .max(120)
    .regex(EMAIL_RE, "Invalid email address"),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(2000),
});

type ContactPayload = z.infer<typeof contactSchema>;

/* Naive in-memory rate limit: 5 messages per 10 minutes per IP */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

/**
 * Optional email delivery. When RESEND_API_KEY + CONTACT_TO_EMAIL are
 * configured the message is also forwarded by email. Without a key, the
 * message is still persisted to the database — nothing silently disappears.
 */
async function forwardEmail(payload: ContactPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: payload.email,
        subject: `Portfolio contact: ${payload.subject}`,
        text: [
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          "",
          payload.message,
        ].join("\n"),
      }),
    });
    return res.ok;
  } catch (error) {
    console.error("Email forwarding failed:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Too many messages sent. Please try again a bit later.",
        },
        { status: 429 }
      );
    }

    const body: unknown = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!fields[key]) fields[key] = issue.message;
      }
      return NextResponse.json(
        {
          ok: false,
          message: "Please fix the highlighted fields and try again.",
          fields,
        },
        { status: 400 }
      );
    }

    // Persist the message (real, durable delivery — stored in the database)
    await db.contactMessage.create({ data: parsed.data });

    const emailed = await forwardEmail(parsed.data);

    return NextResponse.json({
      ok: true,
      message: emailed
        ? "Message sent — it's already in my inbox. I'll get back to you soon."
        : "Message received and saved — I'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Something went wrong on my end. Please reach out by email instead.",
      },
      { status: 500 }
    );
  }
}
