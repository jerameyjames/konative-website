import { createHash } from "node:crypto";

import { XMLParser } from "fast-xml-parser";

type PayloadInstance = any;

type SourceDoc = {
  id: string | number;
  name: string;
  slug?: string;
  feedUrl?: string;
  countries?: string[];
  topics?: string[];
};

type ParsedItem = {
  title: string;
  url: string;
  summary?: string;
  publishedAt: string;
  rawFingerprint: string;
};

type PerSourceResult = {
  sourceName: string;
  sourceSlug?: string;
  discovered: number;
  created: number;
  skipped: number;
  status: "succeeded" | "partial" | "failed";
  error?: string;
};

type RunOptions = {
  sourceSlug?: string;
  maxSources?: number;
};

export type NewsIngestionSummary = {
  sourceCount: number;
  discovered: number;
  created: number;
  skipped: number;
  results: PerSourceResult[];
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  parseTagValue: true,
  trimValues: true,
});

const stripHtml = (value: string) => value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const asArray = <T>(value: T | T[] | undefined): T[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const normalizeDate = (value: unknown) => {
  if (!value || typeof value !== "string") return new Date().toISOString();
  const parsed = new Date(value);
  if (Number.isNaN(parsed.valueOf())) return new Date().toISOString();
  return parsed.toISOString();
};

const fingerprintFor = (sourceId: string | number, rawFingerprint: string, publishedAt: string) =>
  createHash("sha256").update(`${sourceId}::${rawFingerprint}::${publishedAt}`).digest("hex");

function parseFeed(xmlText: string): ParsedItem[] {
  const parsed = parser.parse(xmlText);

  const rssItems = asArray(parsed?.rss?.channel?.item).map((item: any) => {
    const linkValue = typeof item?.link === "string" ? item.link : item?.link?.href;
    return {
      title: String(item?.title || "").trim(),
      url: String(linkValue || "").trim(),
      summary: stripHtml(String(item?.description || item?.["content:encoded"] || "").trim()),
      publishedAt: normalizeDate(item?.pubDate || item?.published || item?.updated),
      rawFingerprint: String(item?.guid || linkValue || item?.title || "").trim(),
    };
  });

  const atomItems = asArray(parsed?.feed?.entry).map((entry: any) => {
    const links = asArray(entry?.link);
    const primaryLink = links.find((link: any) => link?.href)?.href || links[0]?.href;
    const summary = entry?.summary || entry?.content || "";
    return {
      title: String(entry?.title || "").trim(),
      url: String(primaryLink || "").trim(),
      summary: stripHtml(String(summary || "").trim()),
      publishedAt: normalizeDate(entry?.published || entry?.updated),
      rawFingerprint: String(entry?.id || primaryLink || entry?.title || "").trim(),
    };
  });

  return [...rssItems, ...atomItems].filter((item) => item.title && item.url && item.rawFingerprint);
}

async function ingestSource(payload: PayloadInstance, source: SourceDoc): Promise<PerSourceResult> {
  const run = await payload.create({
    collection: "ingestion-runs",
    data: {
      runLabel: `Source ingest: ${source.name}`,
      status: "running",
      source: source.id,
      startedAt: new Date().toISOString(),
      itemsDiscovered: 0,
      itemsCreated: 0,
      itemsSkipped: 0,
    },
  });

  if (!source.feedUrl) {
    const error = "No feedUrl configured for this source.";
    await payload.update({
      collection: "ingestion-runs",
      id: run.id,
      data: {
        status: "partial",
        completedAt: new Date().toISOString(),
        errorLog: error,
      },
    });
    return {
      sourceName: source.name,
      sourceSlug: source.slug,
      discovered: 0,
      created: 0,
      skipped: 0,
      status: "partial",
      error,
    };
  }

  try {
    const response = await fetch(source.feedUrl, {
      headers: {
        "user-agent": "KonativeNewsBot/1.0 (+https://konative.com)",
      },
    });

    if (!response.ok) {
      throw new Error(`Feed request failed with status ${response.status}`);
    }

    const xml = await response.text();
    const parsedItems = parseFeed(xml);

    let created = 0;
    let skipped = 0;

    for (const item of parsedItems) {
      const ingestFingerprint = fingerprintFor(source.id, item.rawFingerprint, item.publishedAt);

      const existing = await payload.find({
        collection: "news-items",
        where: { ingestFingerprint: { equals: ingestFingerprint } },
        limit: 1,
      });

      if (existing.docs[0]) {
        skipped += 1;
        continue;
      }

      await payload.create({
        collection: "news-items",
        data: {
          title: item.title,
          url: item.url,
          summary: item.summary?.slice(0, 350),
          contentType: "news",
          source: source.id,
          sourceName: source.name,
          publishedAt: item.publishedAt,
          discoveredAt: new Date().toISOString(),
          countries: source.countries || ["us"],
          topics: source.topics || ["construction"],
          ingestFingerprint,
          status: "published",
        },
      });

      created += 1;
    }

    await payload.update({
      collection: "news-sources",
      id: source.id,
      data: {
        lastIngestedAt: new Date().toISOString(),
        lastIngestError: "",
      },
    });

    await payload.update({
      collection: "ingestion-runs",
      id: run.id,
      data: {
        status: "succeeded",
        completedAt: new Date().toISOString(),
        itemsDiscovered: parsedItems.length,
        itemsCreated: created,
        itemsSkipped: skipped,
      },
    });

    return {
      sourceName: source.name,
      sourceSlug: source.slug,
      discovered: parsedItems.length,
      created,
      skipped,
      status: "succeeded",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown ingest error";

    await payload.update({
      collection: "news-sources",
      id: source.id,
      data: {
        lastIngestedAt: new Date().toISOString(),
        lastIngestError: message,
      },
    });

    await payload.update({
      collection: "ingestion-runs",
      id: run.id,
      data: {
        status: "failed",
        completedAt: new Date().toISOString(),
        errorLog: message,
      },
    });

    return {
      sourceName: source.name,
      sourceSlug: source.slug,
      discovered: 0,
      created: 0,
      skipped: 0,
      status: "failed",
      error: message,
    };
  }
}

export async function runNewsIngestion(payload: PayloadInstance, options: RunOptions = {}): Promise<NewsIngestionSummary> {
  const andConditions: any[] = [{ active: { equals: true } }];
  if (options.sourceSlug) {
    andConditions.push({ slug: { equals: options.sourceSlug } });
  }

  const sources = await payload.find({
    collection: "news-sources",
    where: andConditions.length > 1 ? { and: andConditions } : andConditions[0],
    sort: "-priority",
    limit: options.maxSources || 100,
  });

  const results: PerSourceResult[] = [];
  let discovered = 0;
  let created = 0;
  let skipped = 0;

  for (const source of sources.docs as SourceDoc[]) {
    const result = await ingestSource(payload, source);
    discovered += result.discovered;
    created += result.created;
    skipped += result.skipped;
    results.push(result);
  }

  return {
    sourceCount: sources.docs.length,
    discovered,
    created,
    skipped,
    results,
  };
}
