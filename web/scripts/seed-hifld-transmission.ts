/**
 * Seed transmission_lines from HIFLD Electric Power Transmission Lines.
 *
 * Source: HIFLD Open Data (ArcGIS Feature Service)
 * Free, no auth. ~230k transmission line segments across the US.
 * We import lines with voltage >= 115 kV to keep storage reasonable (~8k records).
 *
 * Usage (from web/):
 *   SUPABASE_SERVICE_ROLE_KEY=<key> npx tsx scripts/seed-hifld-transmission.ts
 *
 * Optional:
 *   MIN_KV=230    — minimum voltage to import (default 115)
 *   MAX_RECORDS=5000 — max records to import (default 3000)
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tcbworxmlmxoyzcvdjhh.supabase.co'
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SERVICE_ROLE_KEY) { console.error('ERROR: SUPABASE_SERVICE_ROLE_KEY required.'); process.exit(1) }

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

const MIN_KV = parseInt(process.env.MIN_KV || '115')
const MAX_RECORDS = parseInt(process.env.MAX_RECORDS || '3000')

// HIFLD Electric Power Transmission Lines feature service
const BASE_URL = 'https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Electric_Power_Transmission_Lines/FeatureServer/0/query'

interface HifldFeature {
  attributes: {
    ID?: string | number
    VOLTAGE?: number
    STATUS?: string
    OWNER?: string
    TYPE?: string
    STATE?: string
  }
  geometry?: {
    paths?: number[][][]
  }
}

interface HifldResponse {
  features: HifldFeature[]
  exceededTransferLimit?: boolean
}

async function fetchPage(offset: number, pageSize: number): Promise<HifldResponse> {
  const params = new URLSearchParams({
    where: `VOLTAGE >= ${MIN_KV} AND STATUS = 'IN SERVICE'`,
    outFields: 'ID,VOLTAGE,STATUS,OWNER,TYPE,STATE',
    resultOffset: String(offset),
    resultRecordCount: String(pageSize),
    outSR: '4326',
    f: 'geojson',
    returnGeometry: 'true',
    geometryPrecision: '4',
  })

  const res = await fetch(`${BASE_URL}?${params}`, {
    headers: { 'User-Agent': 'konative-ingest/1.0' },
  })
  if (!res.ok) throw new Error(`HIFLD HTTP ${res.status}`)
  return res.json() as Promise<HifldResponse>
}

function pathsToWKT(paths: number[][][]): string | null {
  if (!paths || paths.length === 0) return null
  // Use the first (longest) path
  const coords = paths[0]
  if (!coords || coords.length < 2) return null
  const pts = coords.map(([x, y]) => `${x} ${y}`).join(', ')
  return `LINESTRING(${pts})`
}

async function main() {
  console.log(`Fetching HIFLD transmission lines (>= ${MIN_KV} kV, IN SERVICE)…`)

  const PAGE = 1000
  let allFeatures: HifldFeature[] = []
  let offset = 0

  while (allFeatures.length < MAX_RECORDS) {
    const data = await fetchPage(offset, Math.min(PAGE, MAX_RECORDS - allFeatures.length))
    allFeatures = allFeatures.concat(data.features ?? [])
    console.log(`  fetched ${allFeatures.length} so far…`)
    if (!data.exceededTransferLimit || data.features.length === 0) break
    offset += PAGE
  }

  console.log(`  ${allFeatures.length} transmission line segments to import`)

  const records = allFeatures
    .map(f => {
      const geom = pathsToWKT(f.geometry?.paths ?? [])
      if (!geom) return null
      const a = f.attributes
      return {
        hifld_id: a.ID != null ? String(a.ID) : null,
        voltage_kv: a.VOLTAGE ?? null,
        status: a.STATUS ?? null,
        owner: a.OWNER ?? null,
        type: a.TYPE ?? null,
        state: a.STATE ?? null,
        geom,
      }
    })
    .filter(Boolean) as Array<{
      hifld_id: string | null; voltage_kv: number | null; status: string | null
      owner: string | null; type: string | null; state: string | null; geom: string
    }>

  console.log(`  ${records.length} records with valid geometry`)

  // Truncate and re-insert (full refresh)
  console.log('  Truncating existing transmission_lines…')
  await supabase.from('transmission_lines').delete().neq('id', 0)

  const BATCH = 100
  let inserted = 0
  for (let i = 0; i < records.length; i += BATCH) {
    const batch = records.slice(i, i + BATCH)
    const { error } = await supabase.from('transmission_lines').insert(batch)
    if (error) {
      console.error(`  ✗ batch ${i}:`, error.message)
    } else {
      inserted += batch.length
      process.stdout.write(`\r  inserted ${inserted}/${records.length}`)
    }
  }
  console.log('\n  ✓ Done.')

  await supabase.from('data_sources')
    .upsert({ key: 'hifld_transmission', name: 'HIFLD Electric Transmission Lines', last_ingested_at: new Date().toISOString(), record_count: inserted }, { onConflict: 'key' })

  console.log(`\nHIFLD seed complete. ${inserted} transmission lines inserted.`)
  console.log(`Source: https://hifld-geoplatform.opendata.arcgis.com/datasets/electric-power-transmission-lines`)
}

main().catch(e => { console.error(e); process.exit(1) })
