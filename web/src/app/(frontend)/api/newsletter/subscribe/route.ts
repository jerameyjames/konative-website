import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  let body: { email?: string; name?: string; source?: string; utm_source?: string; utm_medium?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { email, name, source, utm_source, utm_medium } = body

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  const { error } = await supabase.from('newsletter_subscribers').upsert(
    {
      email: email.toLowerCase().trim(),
      name: name || null,
      source: source || null,
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      status: 'active',
      subscribed_at: new Date().toISOString(),
    },
    { onConflict: 'email' },
  )

  if (error) {
    console.error('Subscriber insert error:', error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }

  // Beehiiv integration (optional)
  if (process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID) {
    try {
      await fetch(
        `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.toLowerCase().trim(),
            utm_source: utm_source || source || 'website',
            utm_medium: utm_medium || 'organic',
          }),
        },
      )
    } catch (err) {
      console.error('Beehiiv sync error:', err)
    }
  }

  // Ghost integration (optional) — requires GHOST_ADMIN_API_KEY and GHOST_URL
  if (process.env.GHOST_ADMIN_API_KEY && process.env.GHOST_URL) {
    try {
      // Ghost Admin API member creation via fetch
      const ghostUrl = process.env.GHOST_URL.replace(/\/$/, '')
      const res = await fetch(`${ghostUrl}/ghost/api/admin/members/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Ghost ${process.env.GHOST_ADMIN_API_KEY}`,
        },
        body: JSON.stringify({
          members: [{ email: email.toLowerCase().trim(), name: name || '' }],
        }),
      })
      if (!res.ok) {
        console.error('Ghost member creation failed:', res.status)
      }
    } catch (err) {
      console.error('Ghost sync error:', err)
    }
  }

  return NextResponse.json({ success: true, message: 'Subscribed!' })
}
