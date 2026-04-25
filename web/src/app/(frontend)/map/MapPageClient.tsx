'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const DataCenterMap = dynamic(() => import('@/components/DataCenterMap'), { ssr: false })

const STATUS_LEGEND = [
  { color: '#22d3ee', label: 'Operational' },
  { color: '#E07B39', label: 'Under Construction' },
  { color: '#a78bfa', label: 'Announced / Proposed' },
]

const SIZE_LEGEND = [
  { r: 4,  label: '< 50 MW' },
  { r: 8,  label: '50–250 MW' },
  { r: 14, label: '250–1,000 MW' },
  { r: 24, label: '1,000+ MW' },
]

export default function MapPageClient() {
  return (
    <div style={{ background: '#08142D', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Page header */}
      <div style={{
        paddingTop: 96, paddingBottom: 32,
        paddingLeft: 48, paddingRight: 48,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
              color: '#E07B39', marginBottom: 12,
            }}>
              <span style={{ display: 'block', width: 28, height: 1, background: '#E07B39' }} />
              Live Intelligence
            </p>
            <h1 style={{
              fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800,
              fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.95,
              textTransform: 'uppercase', color: '#fff', marginBottom: 12,
            }}>
              US + CANADA<br />
              <span style={{ color: '#E07B39' }}>DATA CENTER MAP</span>
            </h1>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.6,
              color: 'rgba(255,255,255,0.45)', maxWidth: 520,
            }}>
              Operational facilities, active construction sites, and announced projects across North America.
              Sourced from OpenStreetMap, Wikidata, and daily news extraction. Updated automatically.
            </p>
          </div>

          {/* Legend */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.09)',
            padding: '20px 24px',
            display: 'flex', gap: 40, flexWrap: 'wrap',
          }}>
            {/* Status */}
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
                Status
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {STATUS_LEGEND.map(({ color, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0, opacity: 0.85 }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bubble size */}
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
                Bubble Size = MW
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {SIZE_LEGEND.map(({ r, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      width: r * 2, height: r * 2, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.18)',
                      border: '1.5px solid rgba(255,255,255,0.3)',
                      flexShrink: 0,
                    }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Data sources */}
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
                Sources
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {['OpenStreetMap', 'Wikidata', 'News extraction', 'IESO queue (CA)'].map(s => (
                  <div key={s} style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#E07B39', flexShrink: 0 }} />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full map */}
      <div style={{ height: '72vh', position: 'relative' }}>
        <DataCenterMap />
      </div>

      {/* Footer strip */}
      <div style={{
        padding: '18px 48px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
      }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>
          OSM/Wikidata: weekly refresh · News extraction: daily · Hover a bubble for project details
        </p>
        <div style={{ display: 'flex', gap: 20 }}>
          <Link href="/land/submit" style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#E07B39', textDecoration: 'none',
          }}>
            Submit Your Land →
          </Link>
          <Link href="/capacity" style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
          }}>
            Find Capacity →
          </Link>
        </div>
      </div>
    </div>
  )
}
