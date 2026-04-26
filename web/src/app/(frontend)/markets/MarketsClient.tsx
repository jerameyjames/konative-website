'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { MARKETS } from './[state]/page'

type MarketsMap = typeof MARKETS
const TIER_COLORS = { primary: '#E07B39', emerging: '#a78bfa', developing: '#4ade80' }
const TIER_LABELS = { primary: 'PRIMARY', emerging: 'EMERGING', developing: 'DEVELOPING' }

export default function MarketsClient({ markets }: { markets: MarketsMap }) {
  const primary = Object.entries(markets).filter(([, m]) => m.tier === 'primary')
  const emerging = Object.entries(markets).filter(([, m]) => m.tier === 'emerging')

  return (
    <div style={{ background: '#08142D', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ paddingTop: 96, paddingBottom: 48, paddingLeft: 48, paddingRight: 48, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#E07B39', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'block', width: 28, height: 1, background: '#E07B39' }} />
            Intelligence by Market
          </p>
          <h1 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.93, textTransform: 'uppercase', color: '#fff', margin: '0 0 16px' }}>
            NORTH AMERICAN<br /><span style={{ color: '#E07B39' }}>DATA CENTER MARKETS</span>
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.45)', maxWidth: 520, margin: '0 0 20px' }}>
            Power pipeline, network infrastructure, and project data for {Object.keys(markets).length} key markets. Updated automatically from open data sources.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/canada" style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E07B39', textDecoration: 'none', padding: '10px 18px', border: '1px solid rgba(224,123,57,0.4)', borderRadius: 4 }}>
              Canada Deep Dive →
            </Link>
            <Link href="/map" style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '10px 18px', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 4 }}>
              Open Map View →
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '48px 48px 80px' }}>
        <MarketGroup label="Primary Markets" markets={primary} />
        <div style={{ marginTop: 48 }}>
          <MarketGroup label="Emerging Markets" markets={emerging} />
        </div>
      </div>
    </div>
  )
}

function MarketGroup({ label, markets }: { label: string; markets: [string, MarketsMap[string]][] }) {
  return (
    <div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>
        {label}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.06)' }}>
        {markets.map(([slug, m]) => <MarketCard key={slug} slug={slug} market={m} />)}
      </div>
    </div>
  )
}

function MarketCard({ slug, market: m }: { slug: string; market: MarketsMap[string] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={`/markets/${slug}`} style={{ textDecoration: 'none' }}>
      <div
        style={{ background: hovered ? 'rgba(255,255,255,0.04)' : '#08142D', padding: '28px 28px', transition: 'background 0.15s', cursor: 'pointer' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: 32, color: '#fff', lineHeight: 1, textTransform: 'uppercase' }}>
            {m.name}
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, fontWeight: 600, letterSpacing: '0.15em', color: TIER_COLORS[m.tier], border: `1px solid ${TIER_COLORS[m.tier]}`, padding: '2px 6px', textTransform: 'uppercase', marginTop: 4, flexShrink: 0 }}>
            {TIER_LABELS[m.tier]}
          </span>
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
          {m.iso} · {m.country === 'US' ? 'United States' : m.country === 'CA' ? 'Canada' : 'Mexico'}
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, margin: '0 0 16px' }}>
          {m.subheadline}
        </p>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#E07B39', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          View Market →
        </span>
      </div>
    </Link>
  )
}
