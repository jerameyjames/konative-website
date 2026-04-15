import { getPayload } from "payload";
import { NextResponse } from "next/server";

import config from "@payload-config";

export const dynamic = "force-dynamic";

/**
 * Lightweight DB check (does not expose secrets). Use for deploy / DNS verification.
 */
export async function GET() {
  try {
    const payload = await getPayload({ config });
    const pages = await payload.find({ collection: "pages", limit: 1 });
    return NextResponse.json({
      ok: true,
      pagesSample: pages.docs.length,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 503 });
  }
}
