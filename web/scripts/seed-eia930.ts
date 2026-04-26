/**
 * Seed balancing_authority_stats from EIA-930 (Hourly Electric Grid Monitor).
 *
 * Source: https://api.eia.gov/v2/electricity/rto/region-data/
 * Free API — no key required for public data. Register at eia.gov for higher limits.
 *
 * Usage (from web/):
 *   SUPABASE_SERVICE_ROLE_KEY=<key> npx tsx scripts/seed-eia930.ts
 *
 * Optional: EIA_API_KEY=<key> for higher rate limits
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tcbworxmlmxoyzcvdjhh.supabase.co'
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SERVICE_ROLE_KEY) { console.error('ERROR: SUPABASE_SERVICE_ROLE_KEY required.'); process.exit(1) }

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
const EIA_KEY = process.env.EIA_API_KEY || 'DEMO_KEY'

// Balancing authority metadata (ISO code → human name + region)
const BA_META: Record<string, { name: string; region: string }> = {
  PJM:    { name: 'PJM Interconnection',                  region: 'Mid-Atlantic & Midwest' },
  CISO:   { name: 'California ISO',                       region: 'California' },
  ERCO:   { name: 'ERCOT',                                region: 'Texas' },
  MISO:   { name: 'Midcontinent ISO',                     region: 'Central US & Canada' },
  NYIS:   { name: 'New York ISO',                         region: 'New York' },
  ISNE:   { name: 'ISO New England',                      region: 'New England' },
  SWPP:   { name: 'Southwest Power Pool',                 region: 'Great Plains' },
  BPAT:   { name: 'Bonneville Power Administration',      region: 'Pacific Northwest' },
  PACW:   { name: 'PacifiCorp West',                      region: 'Western US' },
  PACE:   { name: 'PacifiCorp East',                      region: 'Western US' },
  NEVP:   { name: 'Nevada Power',                         region: 'Nevada' },
  AZPS:   { name: 'Arizona Public Service',               region: 'Arizona' },
  WALC:   { name: 'Western Area Lower Colorado',          region: 'Arizona/Nevada' },
  SRP:    { name: 'Salt River Project',                   region: 'Arizona' },
  WACM:   { name: 'Western Area Colorado-Missouri',       region: 'Colorado' },
  PSCO:   { name: 'Public Service of Colorado',           region: 'Colorado' },
  NWMT:   { name: 'NorthWestern Energy',                  region: 'Montana' },
  DOPD:   { name: 'PUD No. 1 of Douglas County',          region: 'Washington' },
  GRID:   { name: 'Gridforce Energy Management',          region: 'Oregon' },
  IPCO:   { name: 'Idaho Power',                          region: 'Idaho' },
  PSEI:   { name: 'Puget Sound Energy',                   region: 'Washington' },
  AVA:    { name: 'Avista',                               region: 'Washington' },
  TPWR:   { name: 'City of Tacoma',                       region: 'Washington' },
  GWA:    { name: 'NaturEner Power Watch',                region: 'Montana' },
  WWA:    { name: 'NaturEner Wind Watch',                 region: 'Montana' },
  DEAA:   { name: 'Arlington Valley',                     region: 'Arizona' },
  HGMA:   { name: 'New Harquahala',                       region: 'Arizona' },
  TEPC:   { name: 'Tucson Electric Power',                region: 'Arizona' },
  EPE:    { name: 'El Paso Electric',                     region: 'Texas/New Mexico' },
  PNM:    { name: 'Public Service New Mexico',            region: 'New Mexico' },
  GRIF:   { name: 'Griffith Energy',                      region: 'Arizona' },
  SERC:   { name: 'SERC Reliability',                     region: 'Southeast' },
  DUK:    { name: 'Duke Energy Carolinas',                region: 'Carolinas' },
  CPLE:   { name: 'Duke Energy Progress East',            region: 'Carolinas' },
  CPLW:   { name: 'Duke Energy Progress West',            region: 'Carolinas' },
  SC:     { name: 'South Carolina E&G',                   region: 'South Carolina' },
  SCEG:   { name: 'Dominion Energy SC',                   region: 'South Carolina' },
  FPL:    { name: 'Florida Power & Light',                region: 'Florida' },
  FPC:    { name: 'Duke Energy Florida',                  region: 'Florida' },
  TEC:    { name: 'Tampa Electric',                       region: 'Florida' },
  JEA:    { name: 'JEA',                                  region: 'Florida' },
  HST:    { name: 'City of Homestead',                    region: 'Florida' },
  GVL:    { name: 'Gainesville Regional Utilities',       region: 'Florida' },
  TAL:    { name: 'City of Tallahassee',                  region: 'Florida' },
  SOCO:   { name: 'Southern Company',                     region: 'Georgia/Alabama' },
  AEC:    { name: 'PowerSouth Energy',                    region: 'Alabama/Florida' },
  TVA:    { name: 'Tennessee Valley Authority',           region: 'Tennessee Valley' },
  LGEE:   { name: 'LG&E and KU Energy',                   region: 'Kentucky' },
  AECI:   { name: 'Associated Electric Coop',             region: 'Missouri' },
  AMPL:   { name: 'Ameren Illinois',                      region: 'Illinois' },
  AMMO:   { name: 'Ameren Missouri',                      region: 'Missouri' },
  MHEB:   { name: 'Manitoba Hydro',                       region: 'Manitoba, Canada' },
  IESO:   { name: 'Ontario IESO',                         region: 'Ontario, Canada' },
  NBSO:   { name: 'NB System Operator',                   region: 'New Brunswick, Canada' },
  HQT:    { name: 'Hydro-Québec TransÉnergie',            region: 'Quebec, Canada' },
  BCHA:   { name: 'BC Hydro',                             region: 'British Columbia, Canada' },
  AESO:   { name: 'Alberta Electric System Operator',     region: 'Alberta, Canada' },
  CFE:    { name: 'Comisión Federal de Electricidad',     region: 'Mexico' },
  GCPD:   { name: 'Grant County PUD',                     region: 'Washington' },
  CHPD:   { name: 'Chelan County PUD',                    region: 'Washington' },
}

interface EiaRow {
  period: string
  respondent: string
  'respondent-name': string
  type: string
  'type-name': string
  value: number
  'value-units': string
}

async function fetchLatestDemand(): Promise<Map<string, { demand: number; netGen: number; period: string }>> {
  const url = `https://api.eia.gov/v2/electricity/rto/region-data/data/` +
    `?api_key=${EIA_KEY}` +
    `&frequency=hourly` +
    `&data[0]=value` +
    `&facets[type][]=D` +
    `&facets[type][]=NG` +
    `&sort[0][column]=period&sort[0][direction]=desc` +
    `&length=500`

  console.log('Fetching EIA-930 region data…')
  const res = await fetch(url, { headers: { 'User-Agent': 'konative-ingest/1.0' } })
  if (!res.ok) throw new Error(`EIA API HTTP ${res.status}`)
  const json = await res.json() as { response: { data: EiaRow[] } }
  const rows: EiaRow[] = json.response?.data ?? []
  console.log(`  ${rows.length} rows returned`)

  // Group by BA: take latest demand (D) and net generation (NG) per BA
  const map = new Map<string, { demand: number; netGen: number; period: string }>()
  for (const row of rows) {
    const ba = row.respondent
    if (!map.has(ba)) map.set(ba, { demand: 0, netGen: 0, period: row.period })
    const entry = map.get(ba)!
    if (row.type === 'D') entry.demand = row.value ?? 0
    if (row.type === 'NG') entry.netGen = row.value ?? 0
  }
  return map
}

async function fetchInterchange(): Promise<Map<string, number>> {
  const url = `https://api.eia.gov/v2/electricity/rto/interchange-data/data/` +
    `?api_key=${EIA_KEY}` +
    `&frequency=hourly` +
    `&data[0]=value` +
    `&sort[0][column]=period&sort[0][direction]=desc` +
    `&length=200`

  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'konative-ingest/1.0' } })
    if (!res.ok) return new Map()
    const json = await res.json() as { response: { data: Array<{ fromba: string; value: number }> } }
    const rows = json.response?.data ?? []
    const map = new Map<string, number>()
    for (const row of rows) {
      if (!map.has(row.fromba)) map.set(row.fromba, row.value ?? 0)
    }
    return map
  } catch {
    return new Map()
  }
}

async function main() {
  const [demand, interchange] = await Promise.all([fetchLatestDemand(), fetchInterchange()])
  console.log(`  ${demand.size} BAs with demand data`)

  const records = [...demand.entries()].map(([ba_code, d]) => ({
    ba_code,
    ba_name: BA_META[ba_code]?.name ?? ba_code,
    region: BA_META[ba_code]?.region ?? null,
    demand_mwh: d.demand || null,
    net_gen_mwh: d.netGen || null,
    interchange: interchange.get(ba_code) ?? null,
    period: d.period ? new Date(d.period).toISOString() : null,
    updated_at: new Date().toISOString(),
  }))

  console.log(`  Upserting ${records.length} BA stats…`)
  const { error } = await supabase
    .from('balancing_authority_stats')
    .upsert(records, { onConflict: 'ba_code' })

  if (error) {
    console.error('  ✗ Upsert error:', error.message)
    process.exit(1)
  }

  await supabase.from('data_sources')
    .upsert({ key: 'eia_930', name: 'EIA-930 Hourly Electric Grid Monitor', last_ingested_at: new Date().toISOString(), record_count: records.length }, { onConflict: 'key' })

  console.log(`\nEIA-930 seed complete. ${records.length} balancing authority stats upserted.`)
}

main().catch(e => { console.error(e); process.exit(1) })
