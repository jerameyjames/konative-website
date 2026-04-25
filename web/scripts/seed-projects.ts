/**
 * One-time seed script: pulls OSM + Wikidata data center records and writes to Sanity.
 * Run: cd web && npx tsx scripts/seed-projects.ts
 */
import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

function makeDocId(source: string, sourceId: string) {
  return `dcProject.${source}.${sourceId.replace(/[^a-zA-Z0-9_-]/g, '_')}`
}

async function upsert(raw: {
  name: string; operator?: string; lat: number; lng: number;
  city?: string; state?: string; country: 'US' | 'CA';
  status: string; capacityMw?: number;
  source: string; sourceId: string; sourceUrl?: string;
}) {
  const docId = makeDocId(raw.source, raw.sourceId)
  const existing = await sanity.getDocument(docId)
  if (existing?.verified) return 'skipped'
  await sanity.createOrReplace({
    _id: docId, _type: 'dataCenterProject',
    name: raw.name, operator: raw.operator,
    location: { _type: 'geopoint', lat: raw.lat, lng: raw.lng },
    city: raw.city, state: raw.state, country: raw.country,
    status: raw.status, capacityMw: raw.capacityMw,
    source: raw.source, sourceId: raw.sourceId, sourceUrl: raw.sourceUrl,
    extractionConfidence: 1.0,
    lastSeenAt: new Date().toISOString(),
  })
  return existing ? 'updated' : 'created'
}

// ── OSM ────────────────────────────────────────────────────────────────────────
async function seedOsm() {
  console.log('Fetching OSM data centers (US + CA)...')
  const QUERY = `[out:json][timeout:180];
(
  area["ISO3166-1"="US"][admin_level=2];
  area["ISO3166-1"="CA"][admin_level=2];
)->.searchArea;
(
  nwr["telecom"="data_center"](area.searchArea);
  nwr["building"="data_center"](area.searchArea);
  nwr["man_made"="data_center"](area.searchArea);
);
out center tags;`

  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'konative-site/1.0' },
    body: 'data=' + encodeURIComponent(QUERY),
  })
  if (!res.ok) throw new Error(`Overpass ${res.status}`)
  const data = await res.json()
  const elements = data.elements as any[]
  console.log(`  Got ${elements.length} OSM elements`)

  let created = 0, updated = 0, skipped = 0, errored = 0
  for (const el of elements) {
    try {
      const lat = el.lat ?? el.center?.lat
      const lng = el.lon ?? el.center?.lon
      if (!lat || !lng) continue
      const name = el.tags.name || el.tags['name:en'] || el.tags.operator
      if (!name) continue
      const country: 'US' | 'CA' = lat > 49 && lng < -50 ? 'CA' : 'US'
      const r = await upsert({
        name, operator: el.tags.operator, lat, lng,
        city: el.tags['addr:city'], state: el.tags['addr:state'] || el.tags['addr:province'],
        country, status: 'operational',
        capacityMw: el.tags['power:rating'] ? parseFloat(el.tags['power:rating']) : undefined,
        source: 'osm', sourceId: `${el.type}/${el.id}`,
        sourceUrl: `https://www.openstreetmap.org/${el.type}/${el.id}`,
      })
      if (r === 'created') created++
      else if (r === 'updated') updated++
      else skipped++
    } catch (e) { errored++; console.error('OSM upsert error', e) }
  }
  console.log(`  OSM done — created:${created} updated:${updated} skipped:${skipped} errored:${errored}`)
}

// ── Wikidata ───────────────────────────────────────────────────────────────────
async function seedWikidata() {
  console.log('Fetching Wikidata data centers (US + CA)...')
  const SPARQL = `SELECT ?item ?itemLabel ?coord ?operatorLabel ?country WHERE {
  ?item wdt:P31/wdt:P279* wd:Q1378425 .
  ?item wdt:P17 ?country .
  VALUES ?country { wd:Q30 wd:Q16 }
  OPTIONAL { ?item wdt:P625 ?coord. }
  OPTIONAL { ?item wdt:P137 ?operator. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}`
  const url = `https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(SPARQL)}`
  const res = await fetch(url, { headers: { Accept: 'application/sparql-results+json', 'User-Agent': 'konative-site/1.0' } })
  if (!res.ok) throw new Error(`Wikidata ${res.status}`)
  const data = await res.json()
  const bindings = data.results.bindings as any[]
  console.log(`  Got ${bindings.length} Wikidata bindings`)

  let created = 0, updated = 0, skipped = 0
  for (const b of bindings) {
    if (!b.coord?.value) continue
    const m = /Point\(([-\d.]+) ([-\d.]+)\)/.exec(b.coord.value)
    if (!m) continue
    const lng = parseFloat(m[1]), lat = parseFloat(m[2])
    const qid = b.item.value.split('/').pop()!
    const country = b.country.value.includes('Q30') ? 'US' : 'CA'
    const r = await upsert({
      name: b.itemLabel.value, operator: b.operatorLabel?.value,
      lat, lng, country, status: 'operational',
      source: 'wikidata', sourceId: qid, sourceUrl: b.item.value,
    })
    if (r === 'created') created++
    else if (r === 'updated') updated++
    else skipped++
  }
  console.log(`  Wikidata done — created:${created} updated:${updated} skipped:${skipped}`)
}

// ── Main ──────────────────────────────────────────────────────────────────────
;(async () => {
  try {
    await seedOsm()
    await seedWikidata()
    console.log('\nSeed complete. Check Sanity Studio for records.')
  } catch (e) {
    console.error('Seed failed:', e)
    process.exit(1)
  }
})()
