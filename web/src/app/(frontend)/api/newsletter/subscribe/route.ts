import { NextRequest, NextResponse } from "next/server";
import { submitForm } from "@/lib/forms/submit";
import { newsletterSchema } from "@/lib/forms/schemas/newsletter";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = await submitForm({
    schemaType: "newsletterSubscriber",
    zodSchema: newsletterSchema,
    payload: body,
    emailSubject: `New newsletter subscriber: ${(body as Record<string, string>)?.email ?? "unknown"}`,
  });

  if (!result.ok) {
    if (result.errors) {
      return NextResponse.json({ error: "Validation failed", errors: result.errors }, { status: 400 });
    }
    return NextResponse.json({ error: result.message ?? "Subscription failed" }, { status: 500 });
  }

  // Optional: Beehiiv sync (non-blocking)
  const beehiivKey = process.env.BEEHIIV_API_KEY;
  const beehiivPub = process.env.BEEHIIV_PUBLICATION_ID;
  const b = body as Record<string, string>;
  if (beehiivKey && beehiivPub && b.email) {
    fetch(`https://api.beehiiv.com/v2/publications/${beehiivPub}/subscriptions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${beehiivKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: b.email.toLowerCase().trim(),
        utm_source: b.utmSource || b.source || "website",
        utm_medium: b.utmMedium || "organic",
      }),
    }).catch(err => console.error("[newsletter] Beehiiv sync error:", err));
  }

  return NextResponse.json({ success: true, message: "Subscribed!" });
}
