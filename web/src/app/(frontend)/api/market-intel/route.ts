import { NextResponse } from "next/server";

import { getSanityReadClient } from "../../../../sanity/readClient";

export const dynamic = "force-dynamic";

const groq = `*[_type == "marketIntelPost" && isPublished == true] | order(publishedAt desc)[0...50]{
  "id": _id,
  title,
  "summary": coalesce(summary, ""),
  "sourceUrl": sourceUrl,
  "sourceName": coalesce(sourceName, ""),
  "category": coalesce(category, ""),
  curatorNote,
  "publishedDate": publishedAt
}`;

export async function GET() {
  try {
    const client = getSanityReadClient();
    const rows = await client.fetch<
      {
        id: string;
        title: string;
        summary: string;
        sourceUrl?: string;
        sourceName: string;
        category: string;
        curatorNote?: string;
        publishedDate?: string;
      }[]
    >(groq);

    const docs = rows.map((a) => ({
      id: a.id,
      title: a.title,
      summary: a.summary,
      sourceUrl: a.sourceUrl,
      sourceName: a.sourceName,
      category: a.category,
      publishedDate: a.publishedDate,
      curatorNote: a.curatorNote ?? undefined,
    }));

    return NextResponse.json({ docs });
  } catch (err) {
    console.error("Market intel (Sanity) fetch error:", err);
    return NextResponse.json({ docs: [] });
  }
}
