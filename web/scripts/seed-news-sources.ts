/**
 * Seed newsSource documents into Sanity.
 *
 * Usage (from web/ directory):
 *   SANITY_API_TOKEN=<token> npx tsx scripts/seed-news-sources.ts
 *
 * Safe to re-run — uses _id-based createOrReplace so existing docs are updated.
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN are required.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-01-01", token, useCdn: false });

interface NewsSourceSeed {
  _id: string;
  name: string;
  slug: string;
  feedUrl: string;
  sourceType: "rss" | "newsroom" | "government" | "industry";
  active: boolean;
  category?: string;
}

const sources: NewsSourceSeed[] = [
  {
    _id: "newsSource-datacenter-frontier",
    name: "Data Center Frontier",
    slug: "datacenter-frontier",
    feedUrl: "https://www.datacenterfrontier.com/rss.xml",
    sourceType: "rss",
    active: true,
    category: "data-center",
  },
  {
    _id: "newsSource-datacenter-knowledge",
    name: "Data Center Knowledge",
    slug: "datacenter-knowledge",
    feedUrl: "https://www.datacenterknowledge.com/rss.xml",
    sourceType: "rss",
    active: true,
    category: "data-center",
  },
  {
    _id: "newsSource-datacenter-dynamics",
    name: "Data Centre Dynamics",
    slug: "datacenter-dynamics",
    feedUrl: "https://www.datacenterdynamics.com/en/rss/",
    sourceType: "rss",
    active: true,
    category: "data-center",
  },
  {
    _id: "newsSource-structure-research",
    name: "Structure Research",
    slug: "structure-research",
    feedUrl: "https://www.structureresearch.net/feed/",
    sourceType: "rss",
    active: true,
    category: "data-center",
  },
  {
    _id: "newsSource-utility-dive",
    name: "Utility Dive",
    slug: "utility-dive",
    feedUrl: "https://www.utilitydive.com/feeds/news/",
    sourceType: "rss",
    active: true,
    category: "power",
  },
  {
    _id: "newsSource-eia-news",
    name: "EIA News",
    slug: "eia-news",
    feedUrl: "https://www.eia.gov/rss/todayinenergy.xml",
    sourceType: "government",
    active: true,
    category: "power",
  },
  {
    _id: "newsSource-ferc-news",
    name: "FERC News Releases",
    slug: "ferc-news",
    feedUrl: "https://www.ferc.gov/news-events/news/rss.xml",
    sourceType: "government",
    active: true,
    category: "power",
  },
  {
    _id: "newsSource-the-register-dc",
    name: "The Register (Data Centre)",
    slug: "the-register-dc",
    feedUrl: "https://www.theregister.com/data_centre/headlines.atom",
    sourceType: "rss",
    active: true,
    category: "data-center",
  },
  {
    _id: "newsSource-bisnow-dc",
    name: "Bisnow (Data Center)",
    slug: "bisnow-datacenter",
    feedUrl: "https://www.bisnow.com/rss/national/data-center",
    sourceType: "rss",
    active: true,
    category: "real-estate",
  },
  {
    _id: "newsSource-commercial-observer",
    name: "Commercial Observer",
    slug: "commercial-observer",
    feedUrl: "https://commercialobserver.com/feed/",
    sourceType: "rss",
    active: true,
    category: "real-estate",
  },
  {
    _id: "newsSource-pv-magazine",
    name: "PV Magazine (Solar + Storage)",
    slug: "pv-magazine",
    feedUrl: "https://pv-magazine-usa.com/feed/",
    sourceType: "rss",
    active: true,
    category: "power",
  },
  {
    _id: "newsSource-renewable-energy-world",
    name: "Renewable Energy World",
    slug: "renewable-energy-world",
    feedUrl: "https://www.renewableenergyworld.com/feed/",
    sourceType: "rss",
    active: true,
    category: "power",
  },
];

async function main() {
  console.log(`Seeding ${sources.length} newsSource documents into Sanity (${projectId}/${dataset})…\n`);

  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const src of sources) {
    const { _id, slug, ...rest } = src;
    const doc = {
      _id,
      _type: "newsSource",
      slug: { _type: "slug", current: slug },
      ...rest,
    };

    try {
      const existing = await client.getDocument(_id);
      await client.createOrReplace(doc);
      if (existing) {
        console.log(`  ✓ updated  ${src.name}`);
        updated++;
      } else {
        console.log(`  + created  ${src.name}`);
        created++;
      }
    } catch (err) {
      console.error(`  ✗ failed   ${src.name}: ${err}`);
      failed++;
    }
  }

  console.log(`\nDone. Created: ${created}  Updated: ${updated}  Failed: ${failed}`);
  if (failed > 0) process.exit(1);
}

main();
