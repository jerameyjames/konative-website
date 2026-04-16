import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://tcbworxmlmxoyzcvdjhh.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYndvcnhtbG14b3l6Y3ZkamhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyODczMTksImV4cCI6MjA5MTg2MzMxOX0.bAU-JCOSEH5RuJZcpDR5WTSU7zTjOEQ4sn6kaY8UIYg";

interface SupabaseArticle {
  id: string;
  title: string;
  url: string;
  source_name: string;
  category: string;
  summary: string;
  curator_note: string | null;
  published_at: string;
}

export async function GET() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/market_intel_articles?select=id,title,url,source_name,category,summary,curator_note,published_at&is_published=eq.true&order=published_at.desc&limit=50`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      },
    );

    if (!res.ok) {
      console.error("Supabase fetch error:", res.status, await res.text());
      return NextResponse.json({ docs: [] });
    }

    const articles: SupabaseArticle[] = await res.json();

    const docs = articles.map((a) => ({
      id: a.id,
      title: a.title,
      summary: a.summary,
      sourceUrl: a.url,
      sourceName: a.source_name,
      category: a.category,
      publishedDate: a.published_at,
      curatorNote: a.curator_note ?? undefined,
    }));

    return NextResponse.json({ docs });
  } catch (err) {
    console.error("Market intel fetch error:", err);
    return NextResponse.json({ docs: [] });
  }
}
