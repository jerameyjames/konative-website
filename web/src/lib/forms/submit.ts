import { ZodSchema } from "zod";
import { getSanityWriteClient } from "@/sanity/writeClient";

export type SubmitResult =
  | { ok: true; id: string }
  | { ok: false; errors: { path: string; message: string }[]; message?: undefined }
  | { ok: false; errors?: undefined; message: string };

export interface SubmitOptions<T> {
  schemaType: string;
  zodSchema: ZodSchema<T>;
  payload: unknown;
  emailSubject: string;
  emailHtml?: string;
}

/** Validate → persist to Sanity (source of truth) → notify via Resend. */
export async function submitForm<T extends Record<string, unknown>>(
  options: SubmitOptions<T>,
): Promise<SubmitResult> {
  const { schemaType, zodSchema, payload, emailSubject, emailHtml } = options;

  // 1. Validate
  const parsed = zodSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.issues.map(e => ({
        path: e.path.join("."),
        message: e.message,
      })),
    };
  }

  // 2. Persist to Sanity — always first, source of truth
  let docId: string;
  try {
    const client = getSanityWriteClient();
    const doc = await client.create({
      _type: schemaType,
      ...(parsed.data as Record<string, unknown>),
      submittedAt: new Date().toISOString(),
    });
    docId = doc._id;
  } catch (err) {
    console.error(`[submitForm] Sanity write failed for ${schemaType}:`, err);
    return {
      ok: false,
      message: "Failed to save submission. Please try again.",
    };
  }

  // 3. Notify via Resend — non-blocking, loud-fail in logs only
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO || "jeramey.james@gmail.com";
  const from = process.env.RESEND_FROM || "Konative <team@konative.com>";

  if (!apiKey) {
    console.warn(
      `[submitForm] RESEND_API_KEY not set — skipping email for ${schemaType} (doc ${docId})`,
    );
  } else {
    const html =
      emailHtml ||
      `<h2>${emailSubject}</h2><pre>${JSON.stringify(parsed.data, null, 2)}</pre><p>Sanity doc: ${docId}</p>`;
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject: emailSubject, html }),
    }).catch(err => console.error(`[submitForm] Resend error for ${schemaType}:`, err));
  }

  return { ok: true, id: docId };
}
