import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const category = params.get('category')
  const entityName = params.get('entity_name')
  const status = params.get('status')
  const limit = Math.min(Number(params.get('limit')) || 50, 200)
  const offset = Number(params.get('offset')) || 0

  let query = supabase
    .from('investment_deals')
    .select('*', { count: 'exact' })
    .order('deal_value_usd', { ascending: false })
    .range(offset, offset + limit - 1)

  if (category) query = query.eq('category', category)
  if (entityName) query = query.ilike('entity_name', `%${entityName}%`)
  if (status) query = query.eq('status', status)

  const { data, count, error } = await query

  if (error) {
    console.error('Deals API error:', error)
    return NextResponse.json({ deals: [], total: 0 }, { status: 500 })
  }

  return NextResponse.json({
    deals: data || [],
    total: count || 0,
  })
}
