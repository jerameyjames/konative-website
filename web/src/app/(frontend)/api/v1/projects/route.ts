import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

export const dynamic = 'force-dynamic'

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export async function GET() {
  try {
    const projects = await sanity.fetch(`*[_type == "dataCenterProject" && defined(location)]{
      _id, name, operator, location, city, state, country,
      status, capacityMw, source, sourceUrl, extractionConfidence
    }`)

    const features = projects.map((p: {
      _id: string; name: string; operator?: string; location: { lat: number; lng: number };
      city?: string; state?: string; country: string; status: string;
      capacityMw?: number; source: string; sourceUrl?: string;
    }) => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [p.location.lng, p.location.lat] },
      properties: {
        id: p._id,
        name: p.name,
        operator: p.operator,
        city: p.city,
        state: p.state,
        country: p.country,
        status: p.status,
        mw: p.capacityMw || 0,
        source: p.source,
        sourceUrl: p.sourceUrl,
      },
    }))

    return NextResponse.json({
      type: 'FeatureCollection',
      features,
      stats: {
        total: projects.length,
        operational: projects.filter((p: { status: string }) => p.status === 'operational').length,
        construction: projects.filter((p: { status: string }) => p.status === 'construction').length,
        announced: projects.filter((p: { status: string }) => p.status === 'announced').length,
        totalMw: projects.reduce((sum: number, p: { capacityMw?: number }) => sum + (p.capacityMw || 0), 0),
      },
    })
  } catch (err) {
    console.error('Projects API error:', err)
    return NextResponse.json({ type: 'FeatureCollection', features: [], stats: {} }, { status: 500 })
  }
}
