import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  let body: {
    event_type?: string
    entity_type?: string
    entity_id?: string
    metadata?: Record<string, unknown>
  }
  try {
    body = await request.json()
  } catch {
    return new NextResponse(null, { status: 400 })
  }

  const { event_type, entity_type, entity_id, metadata } = body

  if (!event_type || !entity_type || !entity_id) {
    return new NextResponse(null, { status: 400 })
  }

  // Insert analytics event
  await supabase.from('analytics_events').insert({
    event_type,
    entity_type,
    entity_id,
    metadata: metadata || {},
    created_at: new Date().toISOString(),
  })

  // Update sponsor placement counts
  if (
    entity_type === 'sponsorship_placement' &&
    (event_type === 'sponsor_impression' || event_type === 'sponsor_click')
  ) {
    const field = event_type === 'sponsor_impression' ? 'impressions' : 'clicks'

    // Fetch current value and increment
    const { data } = await supabase
      .from('sponsorship_placements')
      .select(field)
      .eq('id', entity_id)
      .single()

    if (data) {
      const currentVal = (data as Record<string, number>)[field] || 0
      await supabase
        .from('sponsorship_placements')
        .update({ [field]: currentVal + 1 })
        .eq('id', entity_id)
    }
  }

  return new NextResponse(null, { status: 204 })
}
