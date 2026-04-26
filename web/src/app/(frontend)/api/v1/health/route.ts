import { NextResponse } from 'next/server'
import { createClient as createSanity } from '@sanity/client'
import { createClient as createSupabase } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const sanity = createSanity({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const supabase = createSupabase(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  // Sanity counts (editorial)
  const sanityPromise = sanity.fetch(`{
    "articleCount": count(*[_type == "newsItem"]),
    "feedCount": count(*[_type == "newsSource" && active == true]),
    "dealCount": count(*[_type == "landSubmission" && status == "active"])
  }`).catch(() => ({ articleCount: 0, feedCount: 0, dealCount: 0 }))

  // Supabase infrastructure counts (the data Konative actually maintains)
  const facilitiesPromise = supabase.from('dc_facilities').select('id', { count: 'exact', head: true })
  const generatorsPromise = supabase.from('generation_pipeline').select('id', { count: 'exact', head: true })
  const waterPromise = supabase.from('water_sites').select('id', { count: 'exact', head: true })
  const networkPromise = supabase.from('network_facilities').select('id', { count: 'exact', head: true })

  const [stats, fac, gen, water, net] = await Promise.all([
    sanityPromise, facilitiesPromise, generatorsPromise, waterPromise, networkPromise,
  ])

  return NextResponse.json({
    articleCount: stats.articleCount ?? 0,
    feedCount: stats.feedCount ?? 0,
    dealCount: stats.dealCount ?? 0,
    facilitiesScored: fac.count ?? 0,
    generatorsTracked: gen.count ?? 0,
    waterSitesIndexed: water.count ?? 0,
    networkNodesIndexed: net.count ?? 0,
  })
}
