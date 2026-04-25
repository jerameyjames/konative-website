'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { STATUS_COLORS, type MapStats } from '@/components/DataCenterMap'

const DataCenterMap = dynamic(() => import('@/components/DataCenterMap'), { ssr: false })

const SIZE_LEGEND = [
  { r: 6,  label: 'No MW data' },
  { r: 10, label: '50 MW' },
  { r: 16, label: '250 MW' },
  { r: 26, label: '1,000+ MW' },
]

export default function MapPageClient() {
  const [stats, setStats] = useState<MapStats | null>(null)
  const [sourceCounts, setSourceCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    fetch('/api/v1/projects')
      .then(r => r.json())
      .then(d => {
        setStats(d.stats)
        // Count by source from features
        const counts: Record<string, number> = {}
        for (const f of d.features ?? []) {
          const src = f.properties?.source ?? 'unknown'
          counts[src] = (counts[src] ?? 0) + 1
        }
        setSourceCounts(counts)
      })
      .catch(() => {})
  }, [])

  const SOURCE_DISPLAY = [
    { key: 'osm', label: 'OpenStreetMap' },
    { key: 'wikidata', label: 'Wikidata' },
    { key: 'news_extraction', label: 'News extraction' },
    { key: 'ieso_queue', label: 'IESO queue (CA)' },
  ]

  const hasMwData = (stats?.totalMw ?? 0) > 0

  return (
    <div style={{ background: '#08142D', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Page header */}
      <div style={{
        paddingTop: 96, paddingBottom: 32,
        paddingLeft: 48, paddingRight: 48,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>

          {/* Title */}
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

          {/* Legend panel */}
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
                {(Object.entries(STATUS_COLORS) as [keyof typeof STATUS_COLORS, string][]).map(([status, color]) => {
                  const count = stats?.[status] ?? 0
                  return (
                    <div key={status} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0, opacity: count > 0 ? 0.85 : 0.2 }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: count > 0 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)' }}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                        {stats && <span style={{ marginLeft: 6, opacity: 0.5 }}>({count.toLocaleString()})</span>}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Bubble size */}
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
                Bubble Size = MW capacity
                {!hasMwData && <span style={{ marginLeft: 6, color: 'rgba(255,165,0,0.6)' }}>· limited data</span>}
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
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: label === 'No MW data' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.7)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Data sources */}
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
                Sources
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {SOURCE_DISPLAY.map(({ key, label }) => {
                  const count = sourceCounts[key] ?? 0
                  const active = count > 0
                  return (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: active ? '#E07B39' : 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: active ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)' }}>
                        {label}
                        {stats !== null && (
                          <span style={{ marginLeft: 6 }}>
                            {active ? `(${count.toLocaleString()})` : '— pending'}
                          </span>
                        )}
                      </span>
                    </div>
                  )
                })}
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
          OSM/Wikidata: weekly · News extraction: daily · Hover any bubble for project details
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
