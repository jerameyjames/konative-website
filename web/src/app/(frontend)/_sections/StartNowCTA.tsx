'use client'

import Link from 'next/link'

export default function StartNowCTA() {
  return (
    <section id="start-now" style={{
      background: '#0C2046', padding: '100px 0',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=70')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.07,
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1320, margin: '0 auto', padding: '0 48px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center',
      }}>
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            fontFamily: 'Inter, sans-serif', fontWeight: 600,
            fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: '#E07B39', marginBottom: 20,
          }}>
            <span style={{ display: 'block', width: 28, height: 1, background: '#E07B39' }} />
            Start Now
          </div>
          <h2 style={{
            fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800,
            fontSize: 'clamp(44px, 5.5vw, 80px)', lineHeight: 0.9,
            textTransform: 'uppercase', letterSpacing: '0.01em',
            color: '#fff', marginBottom: 20,
          }}>
            YOUR PROJECT<br />STARTS <span style={{ color: '#E07B39' }}>TODAY.</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.7,
            color: 'rgba(255,255,255,0.55)', maxWidth: 480,
          }}>
            Tell us where you are — investor, landholder, developer — and we respond within 24 hours. No consultants, no pitch decks. Just a direct conversation about whether and how we can move your project forward.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
          <Link href="/contact" style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 600,
            fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase',
            background: '#1E4FBF', color: '#fff',
            padding: '22px 48px', textDecoration: 'none', display: 'inline-block',
            alignSelf: 'stretch', textAlign: 'center',
          }}>
            START YOUR PROJECT NOW
          </Link>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 12,
            color: 'rgba(255,255,255,0.3)', textAlign: 'center', width: '100%',
          }}>
            24-hour response guarantee · No obligation · Direct to the team
          </p>
        </div>
      </div>
    </section>
  )
}
