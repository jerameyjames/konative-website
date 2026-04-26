import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const REGION_COORDS: Record<string, [number, number]> = {
  'toronto':   [43.6532, -79.3832],
  'southwest': [42.9849, -81.2453],
  'west':      [43.4516, -80.4925],
  'niagara':   [43.0896, -79.0849],
  'essa':      [44.2500, -79.7833],
  'ottawa':    [45.4215, -75.6972],
  'east':      [44.2312, -76.4860],
  'northeast': [46.4917, -80.9930],
  'northwest': [48.3809, -89.2477],
  'bruce':     [44.3300, -81.3400],
  'ontario':   [43.6532, -79.3832],
  'unknown':   [43.6532, -79.3832],
}

function makeDocId(source: string, sourceId: string) {
  return `dcProject.${source}.${sourceId.replace(/[^a-zA-Z0-9_-]/g, '_')}`
}

;(async () => {
  const res = await fetch('https://www.ieso.ca/-/media/files/IESO/files/applicationstatusdata.json', {
    headers: { 'User-Agent': 'konative-site/1.0' },
  })
  if (!res.ok) { console.error('IESO fetch failed:', res.status); process.exit(1) }
  const rows: any[] = await res.json()
  console.log(`Fetched ${rows.length} total rows`)

  let created = 0, updated = 0, skipped = 0
  for (const row of rows) {
    const type = (row.Type || '').toLowerCase()
    if (type !== 'load' && type !== 'additional load') continue
    const mwMatch = /(\d+(?:\.\d+)?)\s*MW/i.exec(row.Size || '')
    const mw = mwMatch ? parseFloat(mwMatch[1]) : 0
    if (!mw || mw < 50) continue

    const regionKey = (row.Location || '').toLowerCase().trim()
    const [lat, lng] = REGION_COORDS[regionKey] ?? REGION_COORDS['ontario']
    const siaStatus = (row.SiaStatus || '').toLowerCase()
    const status: 'construction' | 'announced' =
      siaStatus.includes('complete') || siaStatus.includes('final') ? 'construction' : 'announced'

    const docId = makeDocId('ieso_queue', String(row.CaaId || row.CaaIdAndDate).replace(/\s+/g, '_'))
    const existing = await sanity.getDocument(docId)
    if (existing?.verified) { skipped++; continue }

    await sanity.createOrReplace({
      _id: docId, _type: 'dataCenterProject',
      name: row.Name || `Load Project ${row.CaaIdAndDate}`,
      operator: row.Applicant || undefined,
      location: { _type: 'geopoint', lat, lng },
      state: 'Ontario', country: 'CA',
      status, capacityMw: mw,
      source: 'ieso_queue',
      sourceId: String(row.CaaId || row.CaaIdAndDate).replace(/\s+/g, '_'),
      sourceUrl: 'https://www.ieso.ca/Sector-Participants/Connection-Process/Application-Status',
      extractionConfidence: 0.75,
      lastSeenAt: new Date().toISOString(),
    })
    if (existing) { updated++; console.log(`  updated: ${row.Name} (${mw}MW)`) }
    else { created++; console.log(`  created: ${row.Name} (${mw}MW, ${status})`) }
  }
  console.log(`\nDone — created:${created} updated:${updated} skipped:${skipped}`)
})()
