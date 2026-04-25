import { NextRequest, NextResponse } from 'next/server'
import * as XLSX from 'xlsx'
import { getSanityWriteClient, upsertProject, type RawProject } from '@/lib/projectIngestion'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

// URL drifts — check https://www.ieso.ca/Sector-Participants/Connection-Process/Application-Status when 404
const IESO_URL = 'https://www.ieso.ca/-/media/Files/IESO/Document-Library/connection-assessments/connection-application-status.xlsx'

const CITY_COORDS: Record<string, [number, number]> = {
  'toronto': [43.6532, -79.3832],
  'mississauga': [43.5890, -79.6441],
  'ottawa': [45.4215, -75.6972],
  'hamilton': [43.2557, -79.8711],
  'london': [42.9849, -81.2453],
  'kitchener': [43.4516, -80.4925],
  'windsor': [42.3149, -83.0364],
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const isVercelCron = req.headers.get('user-agent')?.includes('vercel-cron')
  if (!isVercelCron && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const res = await fetch(IESO_URL, {
      headers: { 'User-Agent': 'konative-site/1.0 (deals@konative.com)' },
    })

    if (!res.ok) throw new Error(`IESO returned ${res.status}`)
    const buffer = await res.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: 'array' })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet)

    const client = getSanityWriteClient()
    let created = 0, updated = 0, skipped = 0

    for (const row of rows) {
      const projectType = String(row['Project Type'] || row['Type'] || '').toLowerCase()
      if (!projectType.includes('load')) continue

      const mw = parseFloat(String(row['MW'] || row['Capacity'] || '0'))
      if (!mw || mw < 50) continue

      const name = String(row['Project Name'] || row['Applicant'] || `Load Project ${row['CAA ID']}`)
      const status = String(row['Status'] || '').toLowerCase()
      const mappedStatus: 'construction' | 'announced' =
        status.includes('final') || status.includes('approved') ? 'construction' : 'announced'

      const region = String(row['Region'] || row['Connection Point'] || '').toLowerCase()
      const cityKey = Object.keys(CITY_COORDS).find(k => region.includes(k))
      const [lat, lng] = cityKey ? CITY_COORDS[cityKey] : CITY_COORDS['toronto']

      const raw: RawProject = {
        name,
        operator: row['Applicant'] ? String(row['Applicant']) : undefined,
        lat, lng,
        state: 'Ontario',
        country: 'CA',
        status: mappedStatus,
        capacityMw: mw,
        source: 'ieso_queue',
        sourceId: String(row['CAA ID'] || row['ID'] || name).replace(/\s+/g, '_'),
        sourceUrl: 'https://www.ieso.ca/Sector-Participants/Connection-Process/Application-Status',
        extractionConfidence: 0.75,
      }

      const result = await upsertProject(client, raw)
      if (result === 'created') created++
      else if (result === 'updated') updated++
      else skipped++
    }

    return NextResponse.json({ ok: true, totalRows: rows.length, created, updated, skipped })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
