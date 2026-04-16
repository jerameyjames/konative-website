import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "../../../../../payload.config";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await getPayload({ config });

    const posts = await payload.find({
      collection: "market-intel-posts",
      where: { isPublished: { equals: true } },
      sort: "-publishedDate",
      limit: 50,
    });

    return NextResponse.json(posts);
  } catch (err) {
    console.error("Market intel fetch error:", err);
    return NextResponse.json({ docs: [] });
  }
}
