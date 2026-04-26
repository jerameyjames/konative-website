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
  name: string; operator?: string; lat: number; lng: number
  country: 'US' | 'CA'; sourceId: string; sourceUrl: string
}) {
  const docId = makeDocId('wikidata', raw.sourceId)
  const existing = await sanity.getDocument(docId)
  if (existing?.verified) return 'skipped'
  await sanity.createOrReplace({
    _id: docId, _type: 'dataCenterProject',
    name: raw.name, operator: raw.operator,
    location: { _type: 'geopoint', lat: raw.lat, lng: raw.lng },
    country: raw.country, status: 'operational',
    source: 'wikidata', sourceId: raw.sourceId, sourceUrl: raw.sourceUrl,
    extractionConfidence: 1.0, lastSeenAt: new Date().toISOString(),
  })
  return existing ? 'updated' : 'created'
}

const SPARQL = `SELECT ?item ?itemLabel ?coord ?operatorLabel ?country WHERE {
  ?item wdt:P31 wd:Q671224 .
  ?item wdt:P17 ?country .
  VALUES ?country { wd:Q30 wd:Q16 }
  OPTIONAL { ?item wdt:P625 ?coord. }
  OPTIONAL { ?item wdt:P137 ?operator. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}`

;(async () => {
  console.log('Fetching Wikidata (Q671224 = data center)...')
  const url = `https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(SPARQL)}`
  const res = await fetch(url, {
    headers: { Accept: 'application/sparql-results+json', 'User-Agent': 'konative/1.0' },
  })
  if (!res.ok) { console.error('Wikidata error:', res.status); process.exit(1) }
  const data = await res.json()
  const bindings = data.results.bindings
  console.log(`  Got ${bindings.length} bindings`)

  let created = 0, updated = 0, skipped = 0, noCoord = 0
  for (const b of bindings) {
    if (!b.coord?.value) { noCoord++; continue }
    const m = /Point\(([-\d.]+) ([-\d.]+)\)/.exec(b.coord.value)
    if (!m) { noCoord++; continue }
    const lng = parseFloat(m[1]), lat = parseFloat(m[2])
    const qid = b.item.value.split('/').pop()!
    const country = b.country.value.includes('Q30') ? 'US' : 'CA'
    const r = await upsert({ name: b.itemLabel.value, operator: b.operatorLabel?.value, lat, lng, country, sourceId: qid, sourceUrl: b.item.value })
    if (r === 'created') created++
    else if (r === 'updated') updated++
    else skipped++
  }
  console.log(`  done — created:${created} updated:${updated} skipped:${skipped} no-coord:${noCoord}`)
})()
