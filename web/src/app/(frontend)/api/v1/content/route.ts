import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const category = params.get('category')
  const sourceType = params.get('source_type')
  const sourceName = params.get('source_name')
  const isPremium = params.get('is_premium')
  const search = params.get('search')
  const fromDate = params.get('from_date')
  const toDate = params.get('to_date')
  const limit = Math.min(Number(params.get('limit')) || 50, 200)
  const offset = Number(params.get('offset')) || 0

  let query = supabase
    .from('market_intel_articles')
    .select('*', { count: 'exact' })
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (category) query = query.eq('category', category)
  if (sourceType) query = query.eq('source_type', sourceType)
  if (sourceName) query = query.ilike('source_name', `%${sourceName}%`)
  if (isPremium) query = query.eq('is_premium', isPremium === 'true')
  if (search) query = query.or(`title.ilike.%${search}%,summary.ilike.%${search}%`)
  if (fromDate) query = query.gte('published_at', fromDate)
  if (toDate) query = query.lte('published_at', toDate)

  const { data, count, error } = await query

  if (error) {
    console.error('Content API error:', error)
    return NextResponse.json({ items: [], total: 0, offset, limit }, { status: 500 })
  }

  return NextResponse.json({
    items: data || [],
    total: count || 0,
    offset,
    limit,
  })
}
