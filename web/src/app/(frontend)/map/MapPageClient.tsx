'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { LAYER_COLORS, LAYER_LABELS, type MapCounts, type LayerKey } from '@/components/DataCenterMap'

const DataCenterMap = dynamic(() => import('@/components/DataCenterMap'), { ssr: false })

const SOURCES = [
  { key: 'facilities', label: 'IM3 Atlas',   desc: 'Verified US data centers',     url: 'https://github.com/IMMM-SFA/datacenter-atlas' },
  { key: 'network',    label: 'PeeringDB',    desc: 'Colocation & IX facilities',   url: 'https://www.peeringdb.com' },
  { key: 'power',      label: 'EIA-860M',     desc: 'Planned generation pipeline',  url: 'https://www.eia.gov/electricity/data/eia860m/' },
  { key: 'projects',   label: 'OSM/Wikidata', desc: 'Community + news extraction',  url: 'https://www.openstreetmap.org' },
] as const

export default function MapPageClient() {
  const [counts, setCounts] = useState<MapCounts | null>(null)

  useEffect(() => {
    fetch('/api/v1/map-data')
      .then(r => r.json())
      .then(d => setCounts(d.counts))
      .catch(() => {})
  }, [])

  const total = counts?.total ?? 0

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
              Facilities, power pipeline, and connectivity infrastructure across North America.
              Four open data layers — toggle by category. Updated automatically.
            </p>
            {total > 0 && (
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>
                <strong style={{ color: '#E07B39' }}>{total.toLocaleString()}</strong> records across all layers
              </p>
            )}
          </div>

          {/* Layer legend panel */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.09)',
            padding: '20px 24px',
            display: 'flex', flexDirection: 'column', gap: 16, minWidth: 260,
          }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
              Data Layers
            </div>

            {SOURCES.map(({ key, label, desc, url }) => {
              const count = counts?.[key as LayerKey] ?? 0
              const active = count > 0
              return (
                <div key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{
                    width: 10, height: 10, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                    background: LAYER_COLORS[key as LayerKey],
                    opacity: active ? 0.9 : 0.2,
                  }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <a href={url} target="_blank" rel="noopener noreferrer" style={{
                        fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600,
                        color: active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)',
                        textDecoration: 'none',
                      }}>
                        {label}
                      </a>
                      {counts !== null && (
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: active ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.15)' }}>
                          {active ? `(${count.toLocaleString()})` : '— pending seed'}
                        </span>
                      )}
                    </div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>
                      {desc}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Map */}
      <div style={{ height: '72vh', position: 'relative' }}>
        <DataCenterMap />
      </div>

      {/* Footer */}
      <div style={{
        padding: '18px 48px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
      }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>
          IM3/PeeringDB: on-demand · EIA-860M: monthly · OSM/Wikidata: weekly · News: daily · Hover any dot for details
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
