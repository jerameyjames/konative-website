import { createClient, type SanityClient } from '@sanity/client'

export function getSanityWriteClient(): SanityClient {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
  })
}

export interface RawProject {
  name: string
  operator?: string
  lat: number
  lng: number
  city?: string
  state?: string
  country: 'US' | 'CA'
  status: 'operational' | 'construction' | 'announced'
  capacityMw?: number
  source: 'osm' | 'wikidata' | 'news_extraction' | 'ieso_queue'
  sourceId: string
  sourceUrl?: string
  extractionConfidence: number
}

function makeDocId(p: RawProject): string {
  return `dcProject.${p.source}.${p.sourceId.replace(/[^a-zA-Z0-9_-]/g, '_')}`
}

/**
 * Upsert one project. Returns 'created' | 'updated' | 'skipped'.
 * Skipped if a manually verified record exists (don't overwrite human curation).
 */
export async function upsertProject(
  client: SanityClient,
  raw: RawProject
): Promise<'created' | 'updated' | 'skipped'> {
  const docId = makeDocId(raw)
  const existing = await client.getDocument(docId)
  if (existing && existing.verified) return 'skipped'

  const doc = {
    _id: docId,
    _type: 'dataCenterProject',
    name: raw.name,
    operator: raw.operator,
    location: { _type: 'geopoint', lat: raw.lat, lng: raw.lng },
    city: raw.city,
    state: raw.state,
    country: raw.country,
    status: raw.status,
    capacityMw: raw.capacityMw,
    source: raw.source,
    sourceId: raw.sourceId,
    sourceUrl: raw.sourceUrl,
    extractionConfidence: raw.extractionConfidence,
    lastSeenAt: new Date().toISOString(),
  }

  await client.createOrReplace(doc)
  return existing ? 'updated' : 'created'
}
