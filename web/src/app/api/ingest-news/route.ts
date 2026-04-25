import { NextResponse } from "next/server";

import { runNewsIngestion } from "../../../lib/newsIngestion";
import { getSanityWriteClient } from "../../../sanity/writeClient";

export const dynamic = "force-dynamic";

function getRequestToken(request: Request) {
  const headerToken = request.headers.get("x-news-ingest-token");
  if (headerToken) return headerToken;

  const authHeader = request.headers.get("authorization");
  if (!authHeader) return null;

  const [scheme, value] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !value) return null;
  return value;
}

async function runIngestionRequest(request: Request) {
  const configuredToken = process.env.NEWS_INGEST_TOKEN;
  const cronSecret = process.env.CRON_SECRET;

  if (!configuredToken && !cronSecret) {
    return NextResponse.json(
      { ok: false, error: "Server missing NEWS_INGEST_TOKEN or CRON_SECRET environment variable." },
      { status: 500 },
    );
  }

  const providedToken = getRequestToken(request);
  const validTokens = [configuredToken, cronSecret].filter(Boolean);
  if (!providedToken || !validTokens.includes(providedToken)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const sourceSlug = url.searchParams.get("source") || undefined;

  const sanity = getSanityWriteClient();
  const summary = await runNewsIngestion(sanity, { sourceSlug });

  return NextResponse.json({
    ok: true,
    sourceFilter: sourceSlug || null,
    summary,
    runAt: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  return runIngestionRequest(request);
}

export async function GET(request: Request) {
  return runIngestionRequest(request);
}
