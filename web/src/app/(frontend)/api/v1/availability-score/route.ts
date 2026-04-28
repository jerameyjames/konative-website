import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { assembleCAS, type EnvironmentalFlags } from '@/lib/availability-score'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// ── Supabase helper ───────────────────────────────────────────────────────────

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
}

// ── Queue data via existing RPC ───────────────────────────────────────────────

interface QueueRpcRow {
  id: string
  capacity_mw: number
  poi_lat: number | null
  poi_lng: number | null
  distance_km: number
}

async function fetchQueueData(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  lat: number,
  lng: number
): Promise<{
  totalMwWithin50Km: number
  queueProjectCount: number
  nearestQueueKm: number | null
  queueCountWithin25Km: number
}> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any).rpc('get_interconnection_queue_radius', {
    p_lat: lat,
    p_lng: lng,
    p_radius_km: 50,
  })

  if (error || !data) {
    return { totalMwWithin50Km: 0, queueProjectCount: 0, nearestQueueKm: null, queueCountWithin25Km: 0 }
  }

  const rows = data as QueueRpcRow[]
  const totalMwWithin50Km = rows.reduce((s: number, r: QueueRpcRow) => s + Number(r.capacity_mw ?? 0), 0)
  const queueProjectCount = rows.length
  const distances = rows.map((r: QueueRpcRow) => r.distance_km).filter((d): d is number => typeof d === 'number')
  const nearestQueueKm = distances.length > 0 ? Math.min(...distances) : null
  const queueCountWithin25Km = rows.filter((r: QueueRpcRow) => r.distance_km <= 25).length

  return { totalMwWithin50Km, queueProjectCount, nearestQueueKm, queueCountWithin25Km }
}

// ── Environmental constraint bbox approximation ───────────────────────────────
// Lightweight check: known large protected areas / key Indigenous land bboxes.
// Full PostGIS lookup would need the CPCAD / CIRNAC tables loaded into Supabase.
// This static approximation covers major known constraints at ~5km granularity.

interface BBoxRegion {
  name: string
  minLat: number; maxLat: number; minLng: number; maxLng: number
  type: 'protected' | 'indigenous'
  bufferKm: number // effective buffer already baked into bbox expansion
}

const CONSTRAINT_REGIONS: BBoxRegion[] = [
  // Major national parks (expanded bbox to ~2km buffer)
  { name: 'Banff NP',              minLat: 50.8,  maxLat: 52.1,  minLng: -116.8, maxLng: -115.1, type: 'protected',  bufferKm: 2 },
  { name: 'Jasper NP',             minLat: 52.0,  maxLat: 53.5,  minLng: -119.2, maxLng: -116.0, type: 'protected',  bufferKm: 2 },
  { name: 'Pacific Rim NP',        minLat: 48.5,  maxLat: 49.4,  minLng: -126.2, maxLng: -124.6, type: 'protected',  bufferKm: 2 },
  { name: 'Riding Mountain NP',    minLat: 50.4,  maxLat: 51.1,  minLng: -100.7, maxLng:  -99.5, type: 'protected',  bufferKm: 2 },
  { name: 'Georgian Bay Islands NP',minLat: 44.8, maxLat: 45.2,  minLng:  -80.0, maxLng:  -79.6, type: 'protected',  bufferKm: 2 },
  { name: 'Gros Morne NP',         minLat: 49.0,  maxLat: 50.0,  minLng:  -58.2, maxLng:  -56.9, type: 'protected',  bufferKm: 2 },
  { name: 'Cape Breton Highlands NP',minLat:46.5, maxLat: 47.1,  minLng:  -61.0, maxLng:  -60.2, type: 'protected',  bufferKm: 2 },
  // Major Indigenous territory zones (5km buffer approximation)
  { name: 'Treaty 6 territory',    minLat: 52.0,  maxLat: 55.0,  minLng: -116.5, maxLng: -102.0, type: 'indigenous', bufferKm: 5 },
  { name: 'Treaty 7 territory',    minLat: 49.0,  maxLat: 52.0,  minLng: -115.0, maxLng: -108.5, type: 'indigenous', bufferKm: 5 },
  { name: 'Treaty 3 territory',    minLat: 48.0,  maxLat: 51.0,  minLng:  -95.5, maxLng:  -84.0, type: 'indigenous', bufferKm: 5 },
  { name: 'Nisga\'a territory',    minLat: 55.0,  maxLat: 57.0,  minLng: -130.5, maxLng: -127.5, type: 'indigenous', bufferKm: 5 },
  { name: 'Nunavut (all)',         minLat: 56.0,  maxLat: 83.1,  minLng:  -95.4, maxLng:  -61.3, type: 'indigenous', bufferKm: 5 },
]

function checkEnvironmentalConstraints(lat: number, lng: number): EnvironmentalFlags {
  let nearProtectedArea = false
  let nearIndigenousLands = false
  let protectedAreaName: string | undefined
  let indigenousLandsName: string | undefined

  for (const region of CONSTRAINT_REGIONS) {
    if (lat >= region.minLat && lat <= region.maxLat && lng >= region.minLng && lng <= region.maxLng) {
      if (region.type === 'protected' && !nearProtectedArea) {
        nearProtectedArea = true
        protectedAreaName = region.name
      } else if (region.type === 'indigenous' && !nearIndigenousLands) {
        nearIndigenousLands = true
        indigenousLandsName = region.name
      }
    }
  }

  return { nearProtectedArea, nearIndigenousLands, protectedAreaName, indigenousLandsName }
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = parseFloat(searchParams.get('lat') ?? '')
  const lng = parseFloat(searchParams.get('lng') ?? '')

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json({ error: 'lat and lng are required and must be valid numbers' }, { status: 400 })
  }
  if (lat < 41 || lat > 84 || lng < -141 || lng > -52) {
    return NextResponse.json(
      { error: 'Coordinates appear to be outside Canada (lat 41–84, lng -141 to -52)' },
      { status: 400 }
    )
  }

  const supabase = getSupabase()

  // Fetch queue data (needs Supabase) — gracefully degrade if unavailable
  const queueData = supabase
    ? await fetchQueueData(supabase, lat, lng)
    : { totalMwWithin50Km: 0, queueProjectCount: 0, nearestQueueKm: null, queueCountWithin25Km: 0 }

  // Environmental constraint approximation (static — no DB needed)
  const envFlags = checkEnvironmentalConstraints(lat, lng)

  const result = assembleCAS({
    lat,
    lng,
    ...queueData,
    envFlags,
    // nearbyFireCount: omit → falls back to provincial wildfire table
  })

  return NextResponse.json(result)
}
