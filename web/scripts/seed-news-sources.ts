import { getPayload } from "payload";

import config from "../payload.config";

type SeedSource = {
  name: string;
  slug: string;
  sourceType: "rss" | "newsroom" | "government" | "industry";
  sourceUrl: string;
  feedUrl?: string;
  countries: ("us" | "ca")[];
  topics: (
    | "construction"
    | "permitting"
    | "regulations"
    | "investment"
    | "power"
    | "sustainability"
    | "tax"
  )[];
  priority: number;
  notes?: string;
};

const TOP_SOURCES: SeedSource[] = [
  {
    name: "Google News - US Datacenter Construction + Regulation",
    slug: "google-news-us-datacenter",
    sourceType: "rss",
    sourceUrl: "https://news.google.com",
    feedUrl:
      "https://news.google.com/rss/search?q=US+data+center+construction+permitting+regulations+investment&hl=en-US&gl=US&ceid=US:en",
    countries: ["us"],
    topics: ["construction", "permitting", "regulations", "investment"],
    priority: 100,
    notes: "High-volume discovery source for US project and policy updates.",
  },
  {
    name: "Google News - Canada Datacenter Construction + Regulation",
    slug: "google-news-canada-datacenter",
    sourceType: "rss",
    sourceUrl: "https://news.google.com",
    feedUrl:
      "https://news.google.com/rss/search?q=Canada+data+centre+construction+regulations+investment&hl=en-CA&gl=CA&ceid=CA:en",
    countries: ["ca"],
    topics: ["construction", "permitting", "regulations", "investment"],
    priority: 99,
    notes: "High-volume discovery source for Canada project and policy updates.",
  },
  {
    name: "Data Center Dynamics",
    slug: "data-center-dynamics",
    sourceType: "industry",
    sourceUrl: "https://www.datacenterdynamics.com",
    feedUrl: "https://www.datacenterdynamics.com/en/rss/",
    countries: ["us", "ca"],
    topics: ["construction", "investment", "power", "sustainability"],
    priority: 95,
  },
  {
    name: "DataCenterKnowledge",
    slug: "datacenterknowledge",
    sourceType: "industry",
    sourceUrl: "https://www.datacenterknowledge.com",
    feedUrl: "https://www.datacenterknowledge.com/rss.xml",
    countries: ["us", "ca"],
    topics: ["construction", "investment", "power"],
    priority: 90,
  },
  {
    name: "US White House - Presidential Actions",
    slug: "white-house-presidential-actions",
    sourceType: "government",
    sourceUrl: "https://www.whitehouse.gov/presidential-actions/",
    feedUrl: "https://www.whitehouse.gov/presidential-actions/feed/",
    countries: ["us"],
    topics: ["regulations", "permitting", "investment"],
    priority: 95,
  },
  {
    name: "US Permitting Council",
    slug: "us-permitting-council",
    sourceType: "government",
    sourceUrl: "https://www.permitting.gov/newsroom",
    countries: ["us"],
    topics: ["permitting", "regulations", "construction"],
    priority: 92,
    notes: "Primary source for FAST-41 datacenter permitting milestones.",
  },
  {
    name: "ISED Canada Newsroom",
    slug: "ised-canada-newsroom",
    sourceType: "government",
    sourceUrl: "https://ised-isde.canada.ca/site/ised/en/news",
    countries: ["ca"],
    topics: ["regulations", "investment"],
    priority: 92,
    notes: "Federal Canadian policy and investment announcements for AI/datacenters.",
  },
  {
    name: "CNW / Newswire Canada - Data Centre",
    slug: "cnw-datacenter",
    sourceType: "newsroom",
    sourceUrl: "https://www.newswire.ca",
    countries: ["ca"],
    topics: ["investment", "construction", "regulations"],
    priority: 88,
    notes: "Primary Canadian corporate announcement wire used by telecom and utilities.",
  },
  {
    name: "Bell Canada Enterprise Newsroom",
    slug: "bell-canada-newsroom",
    sourceType: "newsroom",
    sourceUrl: "https://www.bce.ca/news-and-media/newsroom",
    countries: ["ca"],
    topics: ["investment", "construction", "power"],
    priority: 86,
    notes: "High-signal source for sovereign-AI/datacenter capacity in Canada.",
  },
  {
    name: "DataCenter.fyi Public Tracker",
    slug: "datacenter-fyi",
    sourceType: "industry",
    sourceUrl: "http://datacenter.fyi",
    countries: ["us", "ca"],
    topics: ["construction", "permitting", "investment"],
    priority: 84,
    notes: "Structured public-record tracker for permits and project pipeline.",
  },
];

async function upsertSource(payload: Awaited<ReturnType<typeof getPayload>>, source: SeedSource) {
  const existing = await payload.find({
    collection: "news-sources",
    where: { slug: { equals: source.slug } },
    limit: 1,
  });

  if (existing.docs[0]) {
    await payload.update({
      collection: "news-sources",
      id: existing.docs[0].id,
      data: source,
    });
    return "updated";
  }

  await payload.create({
    collection: "news-sources",
    data: source,
  });

  return "created";
}

async function main() {
  const payload = await getPayload({ config });

  let created = 0;
  let updated = 0;

  for (const source of TOP_SOURCES) {
    const result = await upsertSource(payload, source);
    if (result === "created") created += 1;
    if (result === "updated") updated += 1;
  }

  console.log(`Seed complete: ${created} created, ${updated} updated, ${TOP_SOURCES.length} total.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
