/**
 * Seed audience landing pages into Sanity.
 * Run: cd web && npx tsx scripts/seed-audiences.ts
 */
import { createClient } from '@sanity/client'
import { tribesSeed } from '../src/content/audiences/seed-data/tribes'
import { advisorsSeed } from '../src/content/audiences/seed-data/advisors'
import { investorsSeed } from '../src/content/audiences/seed-data/investors'
import { landownersSeed } from '../src/content/audiences/seed-data/landowners'
import { utilitiesSeed } from '../src/content/audiences/seed-data/utilities'
import { developersEpcsSeed } from '../src/content/audiences/seed-data/developers-epcs'
import { operatorsSeed } from '../src/content/audiences/seed-data/operators'
import type { AudiencePage } from '../src/content/audiences/types'

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const seeds: AudiencePage[] = [
  tribesSeed,
  advisorsSeed,
  investorsSeed,
  landownersSeed,
  utilitiesSeed,
  developersEpcsSeed,
  operatorsSeed,
]

async function upsert(page: AudiencePage) {
  const docId = `audiencePage.${page.slug}`
  await sanity.createOrReplace({
    _id: docId,
    _type: 'audiencePage',
    slug: { _type: 'slug', current: page.slug },
    displayName: page.displayName,
    tileDescription: page.tileDescription,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    order: page.order,
    hero: page.hero,
    whyNow: page.whyNow,
    whatYouAlreadyHave: page.whatYouAlreadyHave,
    whatKonativeDoes: {
      title: page.whatKonativeDoes.title,
      bands: page.whatKonativeDoes.bands,
    },
    firstEngagement: page.firstEngagement,
    trust: page.trust,
    adjacentAudiences: page.adjacentAudiences,
    finalCta: page.finalCta,
  })
  return docId
}

async function main() {
  console.log(`Seeding ${seeds.length} audience pages...`)
  for (const page of seeds) {
    const id = await upsert(page)
    console.log(`  ✓ ${id} (${page.displayName})`)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
