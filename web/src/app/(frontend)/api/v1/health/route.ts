import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

export const dynamic = 'force-dynamic'

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export async function GET() {
  try {
    const stats = await sanity.fetch(`{
      "articleCount": count(*[_type == "newsItem"]),
      "feedCount": count(*[_type == "newsSource" && active == true]),
      "dealCount": count(*[_type == "landSubmission" && status == "active"])
    }`)

    return NextResponse.json({
      articleCount: stats.articleCount ?? 0,
      feedCount: stats.feedCount ?? 0,
      dealCount: stats.dealCount ?? 0,
    })
  } catch (err) {
    console.error('Health API (Sanity) error:', err)
    return NextResponse.json({ articleCount: 0, feedCount: 0, dealCount: 0 }, { status: 500 })
  }
}
