import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type FacilityRow = {
  id: number
  name: string
  operator: string | null
  city: string | null
  state: string | null
  county: string | null
  country: string | null
  sqft: number | null
  capacity_mw: number | null
  status: string | null
  facility_type: string | null
  source_url: string | null
  source: string | null
  ingested_at: string | null
}

type ScoreRow = {
  availability_score: number
  power_score: number
  water_score: number
  fiber_score: number
  land_score: number
  permitting_score: number
  momentum_score: number
  lat: number
  lng: number
}

async function getFacility(id: number): Promise<{ facility: FacilityRow; scores: ScoreRow } | null> {
  const [facRes, scoreRes] = await Promise.all([
    supabase.from('dc_facilities').select('*').eq('id', id).single(),
    supabase.from('dc_availability_scores').select('availability_score,power_score,water_score,fiber_score,land_score,permitting_score,momentum_score,lat,lng').eq('id', id).single(),
  ])
  if (facRes.error || !facRes.data) return null
  return {
    facility: facRes.data as FacilityRow,
    scores: (scoreRes.data ?? { availability_score: 0, power_score: 0, water_score: 0, fiber_score: 0, land_score: 10, permitting_score: 8, momentum_score: 8, lat: 0, lng: 0 }) as ScoreRow,
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const result = await getFacility(Number(id))
  if (!result) return { title: 'Facility Not Found | Konative' }
  const { facility } = result
  return {
    title: `${facility.name} | Konative`,
    description: `${facility.name} — ${facility.status ?? 'data center'} in ${facility.state ?? facility.country}. Availability Score and infrastructure analysis by Konative.`,
  }
}

const STATUS_LABELS: Record<string, string> = {
  operational: 'Operational',
  construction: 'Under Construction',
  announced: 'Announced',
  planned: 'Planned',
  decommissioned: 'Decommissioned',
}

const STATUS_COLORS: Record<string, string> = {
  operational: '#22c55e',
  construction: '#f59e0b',
  announced: '#3b82f6',
  planned: '#8b5cf6',
  decommissioned: '#6b7280',
}

function ScoreBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f6f7fb' }}>{value}<span style={{ color: '#64748b' }}>/{max}</span></span>
      </div>
      <div style={{ background: '#1e293b', borderRadius: 4, height: 6, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 4, transition: 'width 0.3s ease' }} />
      </div>
    </div>
  )
}

export default async function FacilityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const numId = Number(id)
  if (isNaN(numId)) return notFound()

  const result = await getFacility(numId)
  if (!result) return notFound()

  const { facility: f, scores: s } = result
  const statusColor = STATUS_COLORS[f.status ?? ''] ?? '#6b7280'
  const statusLabel = STATUS_LABELS[f.status ?? ''] ?? (f.status ?? 'Unknown')

  const totalMax = 35 + 20 + 15 + 10 + 8 + 8
  const scorePct = Math.round((s.availability_score / totalMax) * 100)

  return (
    <div style={{ background: '#0b1020', minHeight: '100vh', color: '#f6f7fb', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid #1e293b', padding: '0.75rem 2rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', fontSize: '0.8rem', color: '#64748b' }}>
          <Link href="/map" style={{ color: '#64748b', textDecoration: 'none' }}>Map</Link>
          <span style={{ margin: '0 0.5rem' }}>›</span>
          <span style={{ color: '#94a3b8' }}>{f.name}</span>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '2.5rem 2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{ background: statusColor + '22', color: statusColor, border: `1px solid ${statusColor}44`, borderRadius: 4, fontSize: '0.75rem', padding: '0.2rem 0.6rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {statusLabel}
            </span>
            {f.facility_type && (
              <span style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.facility_type}</span>
            )}
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, margin: '0 0 0.25rem', letterSpacing: '-0.01em' }}>
            {f.name}
          </h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '1rem' }}>
            {[f.operator, f.city, f.state, f.country].filter(Boolean).join(' · ')}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: '2rem' }}>
          {/* Left: details */}
          <div>
            {/* Key metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Capacity', value: f.capacity_mw ? `${f.capacity_mw} MW` : '—' },
                { label: 'Floor Area', value: f.sqft ? `${(f.sqft / 1000).toFixed(0)}K sqft` : '—' },
                { label: 'State / Region', value: f.state ?? f.country ?? '—' },
                { label: 'County', value: f.county ?? '—' },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: '#0f1728', border: '1px solid #1e293b', borderRadius: 8, padding: '1rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>{label}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 600, fontFamily: 'Barlow Condensed, sans-serif' }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Infrastructure context */}
            <div style={{ background: '#0f1728', border: '1px solid #1e293b', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', margin: '0 0 1rem', fontWeight: 600 }}>Infrastructure Proximity</h2>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.6, margin: '0 0 1rem' }}>
                Scores reflect proximity to transmission infrastructure, water monitoring sites, and fiber exchange points within Konative&apos;s market coverage area. Scores are updated as new data sources are ingested.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: '#64748b' }}>Coordinates: </span>
                  <span style={{ color: '#f6f7fb', fontVariantNumeric: 'tabular-nums' }}>
                    {s.lat ? `${s.lat.toFixed(4)}, ${s.lng.toFixed(4)}` : '—'}
                  </span>
                </div>
                <div>
                  <span style={{ color: '#64748b' }}>Source: </span>
                  {f.source_url
                    ? <a href={f.source_url} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa' }}>{f.source ?? 'View'}</a>
                    : <span style={{ color: '#f6f7fb' }}>{f.source ?? '—'}</span>
                  }
                </div>
              </div>
            </div>

            {/* Konative CTA */}
            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f1728 100%)', border: '1px solid #334155', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, margin: '0 0 0.5rem', letterSpacing: '0.02em' }}>
                Land Near This Facility?
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.6, margin: '0 0 1rem' }}>
                Konative brokers powered land to data center developers and hyperscalers. If you own or control land in this area, we want to talk.
              </p>
              <Link
                href="/contact"
                style={{ display: 'inline-block', background: '#16a34a', color: '#fff', textDecoration: 'none', padding: '0.6rem 1.25rem', borderRadius: 6, fontSize: '0.875rem', fontWeight: 600 }}
              >
                Get a Site Assessment →
              </Link>
            </div>
          </div>

          {/* Right: Availability Score card */}
          <div>
            <div style={{ background: '#0f1728', border: '1px solid #1e293b', borderRadius: 8, padding: '1.5rem', position: 'sticky', top: '1.5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b', marginBottom: '0.5rem' }}>
                  Availability Score
                </div>
                <div style={{ fontSize: '3.5rem', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, lineHeight: 1, color: scorePct >= 80 ? '#22c55e' : scorePct >= 60 ? '#f59e0b' : '#ef4444' }}>
                  {s.availability_score}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>out of {totalMax}</div>
                <div style={{ marginTop: '0.75rem', background: '#1e293b', borderRadius: 100, height: 8, overflow: 'hidden' }}>
                  <div style={{ width: `${scorePct}%`, height: '100%', background: scorePct >= 80 ? '#22c55e' : scorePct >= 60 ? '#f59e0b' : '#ef4444', borderRadius: 100 }} />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #1e293b', paddingTop: '1.25rem' }}>
                <ScoreBar label="Power" value={s.power_score} max={35} color="#f59e0b" />
                <ScoreBar label="Water" value={s.water_score} max={20} color="#3b82f6" />
                <ScoreBar label="Fiber" value={s.fiber_score} max={15} color="#8b5cf6" />
                <ScoreBar label="Land" value={s.land_score} max={10} color="#22c55e" />
                <ScoreBar label="Permitting" value={s.permitting_score} max={8} color="#06b6d4" />
                <ScoreBar label="Momentum" value={s.momentum_score} max={8} color="#ec4899" />
              </div>

              <p style={{ fontSize: '0.7rem', color: '#475569', marginTop: '1rem', lineHeight: 1.5 }}>
                Scores derived from proximity to USGS water monitoring sites, EIA transmission lines, and PeeringDB network exchange points. Updated on each data ingest cycle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
