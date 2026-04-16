import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const [feedsRes, articlesRes, subscribersRes] = await Promise.all([
    supabase.from('feed_sources').select('id, is_active, error_count', { count: 'exact' }),
    supabase
      .from('market_intel_articles')
      .select('id, is_published', { count: 'exact' }),
    supabase.from('newsletter_subscribers').select('id', { count: 'exact' }),
  ])

  const feeds = feedsRes.data || []
  const activeFeedCount = feeds.filter((f) => f.is_active).length
  const erroringFeedCount = feeds.filter(
    (f) => typeof f.error_count === 'number' && f.error_count > 0,
  ).length

  const publishedCount =
    articlesRes.data?.filter((a) => a.is_published).length ?? 0

  const lastFetchRes = await supabase
    .from('feed_sources')
    .select('last_fetched_at')
    .order('last_fetched_at', { ascending: false })
    .limit(1)
    .single()

  return NextResponse.json({
    feeds: {
      total: feedsRes.count ?? feeds.length,
      active: activeFeedCount,
      erroring: erroringFeedCount,
    },
    articles: {
      total: articlesRes.count ?? 0,
      published: publishedCount,
    },
    subscribers: {
      total: subscribersRes.count ?? 0,
    },
    last_fetch: lastFetchRes.data?.last_fetched_at ?? null,
  })
}
