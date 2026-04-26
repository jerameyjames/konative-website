import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

// Webhook handler for Beehiiv subscription events.
//
// Configure in Beehiiv Dashboard → Integrations → Webhooks:
//   URL:    https://konative.com/api/webhooks/beehiiv
//   Events: subscription.created, subscription.deleted
//   Secret: set BEEHIIV_WEBHOOK_SECRET on Vercel; paste same value in Beehiiv
//
// Server-to-server only. Uses service role key to write to newsletter_subscribers
// (anon key would hit RLS).

function verifySignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
  // Constant-time comparison
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature.replace(/^sha256=/, '')))
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text()
  const secret = process.env.BEEHIIV_WEBHOOK_SECRET

  // If a secret is configured, enforce signature verification.
  // If not configured, accept the webhook (useful for first-time wire-up testing).
  if (secret) {
    const sig = request.headers.get('x-beehiiv-signature') ?? request.headers.get('beehiiv-signature')
    if (!verifySignature(rawBody, sig, secret)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
  }

  let body: { type?: string; data?: { email?: string; subscription_id?: string } }
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { type, data } = body
  const email = data?.email?.toLowerCase().trim()
  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    console.error('[beehiiv-webhook] SUPABASE_SERVICE_ROLE_KEY not set')
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://tcbworxmlmxoyzcvdjhh.supabase.co',
    serviceKey,
  )

  if (type === 'subscription.created') {
    const { error } = await supabase.from('newsletter_subscribers').upsert(
      {
        email,
        is_active: true,
        source: 'beehiiv',
        beehiiv_id: data?.subscription_id ?? null,
        subscribed_at: new Date().toISOString(),
        unsubscribed_at: null,
      },
      { onConflict: 'email' },
    )
    if (error) console.error('[beehiiv-webhook] insert error:', error.message)
  } else if (type === 'subscription.deleted') {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({ is_active: false, unsubscribed_at: new Date().toISOString() })
      .eq('email', email)
    if (error) console.error('[beehiiv-webhook] update error:', error.message)
  }

  return new NextResponse(null, { status: 204 })
}
