import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  let body: { type?: string; data?: { email?: string; subscription_id?: string } }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { type, data } = body
  const email = data?.email

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 })
  }

  if (type === 'subscription.created') {
    await supabase.from('newsletter_subscribers').upsert(
      {
        email: email.toLowerCase().trim(),
        status: 'active',
        source: 'beehiiv_webhook',
        subscribed_at: new Date().toISOString(),
      },
      { onConflict: 'email' },
    )
  } else if (type === 'subscription.deleted') {
    await supabase
      .from('newsletter_subscribers')
      .update({ status: 'unsubscribed' })
      .eq('email', email.toLowerCase().trim())
  }

  return new NextResponse(null, { status: 204 })
}
