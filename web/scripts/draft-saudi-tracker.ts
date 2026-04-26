/**
 * Generate a weekly "Saudi Tracker" draft post from Sanity newsItem documents.
 *
 * Pulls recent (last 14 days) news items mentioning Saudi-relevant entities
 * (HUMAIN, MGX, G42, QIA, DataVolt, PIF, NEOM, Aramco, Brookfield-Gulf JVs),
 * groups by entity, and emits a structured markdown draft for Jeramey to polish
 * in Sanity Studio.
 *
 * Usage (from web/):
 *   SANITY_API_TOKEN=<token> npx tsx scripts/draft-saudi-tracker.ts
 *
 * Output:
 *   - Prints draft markdown to stdout
 *   - Writes draft to .tmp-saudi-tracker-<YYYY-MM-DD>.md
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!PROJECT_ID) {
  console.error('ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID required')
  process.exit(1)
}

const sanity = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: TOKEN, // optional — public reads work without it for published items
})

interface NewsItem {
  _id: string
  title: string
  url: string
  summary?: string
  sourceName?: string
  publishedAt: string
  topics?: string[]
  countries?: string[]
}

const ENTITIES = [
  { key: 'HUMAIN', label: 'HUMAIN (PIF)', patterns: ['humain', 'pif ai', 'saudi public investment'] },
  { key: 'MGX', label: 'MGX / Mubadala', patterns: ['mgx', 'mubadala', 'aligned'] },
  { key: 'G42', label: 'G42 (Abu Dhabi)', patterns: ['g42', 'g-42'] },
  { key: 'QIA', label: 'QIA / Qatar Investment Authority', patterns: ['qia', 'qatar investment'] },
  { key: 'DataVolt', label: 'DataVolt', patterns: ['datavolt'] },
  { key: 'NEOM', label: 'NEOM', patterns: ['neom'] },
  { key: 'Aramco', label: 'Saudi Aramco', patterns: ['aramco'] },
  { key: 'BrookfieldGulf', label: 'Brookfield × Gulf Capital', patterns: ['brookfield', 'queen alia'] },
  { key: 'OracleSaudi', label: 'Oracle / xAI / NVIDIA Gulf builds', patterns: ['oracle saudi', 'xai humain', 'nvidia humain', 'cisco saudi'] },
]

function matchesEntity(item: NewsItem, patterns: string[]): boolean {
  const haystack = `${item.title} ${item.summary || ''} ${(item.topics || []).join(' ')}`.toLowerCase()
  return patterns.some(p => haystack.includes(p.toLowerCase()))
}

async function main() {
  const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()

  console.error(`Fetching newsItems published after ${fourteenDaysAgo.slice(0, 10)}…`)

  const items: NewsItem[] = await sanity.fetch(
    `*[_type == "newsItem" && status == "published" && publishedAt > $since] | order(publishedAt desc)[0...200]{
      _id, title, url, summary, sourceName, publishedAt, topics, countries
    }`,
    { since: fourteenDaysAgo }
  )

  console.error(`  Got ${items.length} items in window`)

  // Group by entity
  const buckets: Record<string, { label: string; items: NewsItem[] }> = {}
  for (const ent of ENTITIES) {
    const matches = items.filter(it => matchesEntity(it, ent.patterns))
    if (matches.length > 0) {
      buckets[ent.key] = { label: ent.label, items: matches }
    }
  }

  const today = new Date().toISOString().slice(0, 10)
  const totalMatched = Object.values(buckets).reduce((s, b) => s + b.items.length, 0)

  let md = ''
  md += `# Saudi Tracker — Week of ${today}\n\n`
  md += `*Konative's weekly intelligence on Gulf sovereign capital flows into North American AI infrastructure.*\n\n`

  if (totalMatched === 0) {
    md += `> No tracked entities had qualifying news in the last 14 days. Recommended action: pull from manual research, expand keyword set, or skip this week's tracker.\n\n`
  } else {
    md += `**This week:** ${totalMatched} qualifying items across ${Object.keys(buckets).length} tracked entities.\n\n`
    md += `---\n\n`

    for (const ent of ENTITIES) {
      const bucket = buckets[ent.key]
      if (!bucket) continue
      md += `## ${bucket.label}\n\n`
      for (const item of bucket.items.slice(0, 4)) {
        const dateStr = item.publishedAt.slice(0, 10)
        md += `- **${item.title}** (${item.sourceName || 'Source'}, ${dateStr}) — [link](${item.url})\n`
        if (item.summary) md += `  - ${item.summary.slice(0, 280)}${item.summary.length > 280 ? '…' : ''}\n`
      }
      md += `\n*Konative angle:* [DRAFT — fill in 1–2 sentences on what this means for site selection, capacity in NA, or partnership opportunities]\n\n`
      md += `---\n\n`
    }
  }

  md += `## What we're watching next\n\n`
  md += `- [ ] HUMAIN US site selection updates\n`
  md += `- [ ] MGX / Aligned acquisition pipeline\n`
  md += `- [ ] G42 NA infrastructure announcements\n`
  md += `- [ ] DataVolt build partner selection in US/Canada\n`
  md += `- [ ] Federal CFIUS / national security review activity around Gulf DC investments\n\n`

  md += `_Have a tip on Gulf capital flows or a North American site that fits a Gulf sovereign mandate? **[Reach out](https://konative.com/contact)**._\n`

  // Write to file
  const outPath = path.join(process.cwd(), `.tmp-saudi-tracker-${today}.md`)
  fs.writeFileSync(outPath, md)

  // Print to stdout
  console.log(md)
  console.error(`\n✓ Draft written to ${outPath}`)
  console.error(`  Polish in Sanity Studio → newsItem (contentType: "analysis", topics: ["saudi-tracker"]) or paste into Beehiiv.`)
}

main().catch(e => { console.error(e); process.exit(1) })
