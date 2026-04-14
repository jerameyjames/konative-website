import { NextResponse } from "next/server";

const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim() : "";

  if (!name || !email || !emailOk(email)) {
    return NextResponse.json(
      { error: "Name and a valid email are required." },
      { status: 400 },
    );
  }

  const safeFields = {
    name,
    email,
    orgType:
      typeof record.orgType === "string" ? record.orgType.trim() : undefined,
    geography:
      typeof record.geography === "string" ? record.geography.trim() : undefined,
    projectStage:
      typeof record.projectStage === "string"
        ? record.projectStage.trim()
        : undefined,
    timelineUrgency:
      typeof record.timelineUrgency === "string"
        ? record.timelineUrgency.trim()
        : undefined,
    projectNote:
      typeof record.projectNote === "string"
        ? record.projectNote.trim()
        : undefined,
  };

  if (process.env.NODE_ENV !== "production") {
    console.info("[inquiry]", safeFields);
  }

  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "konative.com",
          receivedAt: new Date().toISOString(),
          ...safeFields,
        }),
      });
      if (!res.ok) {
        return NextResponse.json(
          { error: "Upstream handler rejected the request." },
          { status: 502 },
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Upstream handler unavailable." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
