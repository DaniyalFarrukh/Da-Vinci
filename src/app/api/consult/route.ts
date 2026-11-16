import { NextRequest, NextResponse } from "next/server";
import { consultSchema } from "@/lib/consult-schema";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, number[]>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const timestamps = (rateLimitStore.get(ip) || []).filter(
    (t) => now - t < WINDOW_MS
  );
  if (timestamps.length >= MAX_REQUESTS) {
    const oldest = timestamps[0] ?? now;
    const retryAfterSec = Math.max(
      1,
      Math.ceil((WINDOW_MS - (now - oldest)) / 1000)
    );
    rateLimitStore.set(ip, timestamps);
    return { allowed: false, retryAfterSec };
  }
  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);
  return { allowed: true, retryAfterSec: 0 };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many consultation requests. Please try again shortly.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSec) },
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON request body." },
      { status: 400 }
    );
  }

  const parsed = consultSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] || "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      {
        ok: false,
        message: "Please correct the highlighted fields.",
        errors: fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot triggered: return fake 200 without sending email
  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONSULT_FROM_EMAIL;
  const toEmail = process.env.CONSULT_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Email delivery is not configured on this server yet. Please set RESEND_API_KEY, CONSULT_FROM_EMAIL, and CONSULT_TO_EMAIL.",
      },
      { status: 503 }
    );
  }

  const html = `
    <h2>New Consultation Request — da Vinci Dental Works</h2>
    <p><strong>Location:</strong> ${escapeHtml(data.locationId)}</p>
    <p><strong>Doctor:</strong> ${escapeHtml(data.doctor)}</p>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(`${data.countryCode} ${data.phone}`)}</p>
    <p><strong>Address:</strong> ${escapeHtml(
      `${data.streetAddress}, ${data.city}, ${data.state} ${data.postalCode}`
    )}</p>
    <p><strong>Message:</strong><br/>${escapeHtml(data.message || "—")}</p>
  `;

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: data.email,
      subject: `Consultation Request (${data.locationId}) — ${data.name}`,
      html,
    }),
  });

  if (!resendRes.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Unable to send consultation email at this time.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
