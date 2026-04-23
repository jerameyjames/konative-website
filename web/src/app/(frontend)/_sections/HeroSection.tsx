'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface Deal {
  id: string
  name: string
  entity: string
  size: string
  status: 'ACTIVE' | 'ANNOUNCED' | 'CLOSED'
  geography: string
}

interface HealthStats {
  articleCount: number
  feedCount: number
  dealCount: number
}

interface HeroSectionProps {
  deals: Deal[]
  stats: HealthStats
}

const PLACEHOLDER_DEALS: Deal[] = [
  { id: '1', name: 'Project Northstar',   entity: 'CPPIB / Digital Bridge',   size: '$3.4B', status: 'ACTIVE',    geography: 'Ontario, Canada' },
  { id: '2', name: 'Cascade Power Build', entity: 'Blackstone Infrastructure', size: '$780M', status: 'ANNOUNCED', geography: 'Pacific Northwest' },
  { id: '3', name: 'Mesa Verde AI Park',  entity: 'Undisclosed SWF',           size: '$1.2B', status: 'ACTIVE',    geography: 'Texas, USA' },
  { id: '4', name: 'Ridgeline Series A',  entity: 'Emerging Markets Dev Corp', size: '$120M', status: 'ANNOUNCED', geography: 'Alberta, Canada' },
  { id: '5', name: 'Atlantic Gateway',    entity: 'Macquarie Asset Mgmt',      size: '$2.1B', status: 'ACTIVE',    geography: 'Eastern Seaboard' },
]

function useCountUp(target: number, duration = 1200) {
  const [val, setVal] = useState<number | string>(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      io.disconnect()
      const isFloat = String(target).includes('.')
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        const cur = ease * target
        setVal(isFloat ? parseFloat(cur.toFixed(1)) : Math.floor(cur))
        if (t < 1) requestAnimationFrame(tick)
        else setVal(target)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])
  return [val, ref] as const
}

const statusDot = (s: string) =>
  s === 'ACTIVE' ? '#22c55e' : s === 'ANNOUNCED' ? '#D97706' : '#888'

export default function HeroSection({ deals, stats }: HeroSectionProps) {
  const displayDeals = deals.length > 0 ? deals : PLACEHOLDER_DEALS
  const tickerDeals = [...displayDeals, ...displayDeals]

  const [dealCount, dealRef] = useCountUp(stats.dealCount || displayDeals.length)

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#08142D',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('https://images.pexels.com/photos/17489152/pexels-photo-17489152.jpeg?w=1600&q=85')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(115deg, rgba(8,20,45,0.97) 0%, rgba(8,20,45,0.85) 45%, rgba(12,32,70,0.55) 75%, rgba(30,79,191,0.2) 100%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 2, flex: 1,
        display: 'flex', alignItems: 'center',
        maxWidth: 1320, margin: '0 auto', width: '100%',
        padding: '0 48px', gap: 80, paddingTop: 68,
      }}>
        <div style={{ flex: 1, maxWidth: 780 }}>
          <p style={{
            display: 'flex', alignItems: 'center', gap: 12,
            fontFamily: 'Inter, sans-serif', fontWeight: 600,
            fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: '#E07B39', marginBottom: 32,
          }}>
            <span style={{ display: 'block', width: 36, height: 1, background: '#E07B39', flexShrink: 0 }} />
            Energy Infrastructure Brokerage &amp; Development
          </p>

          <h1 style={{
            fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800,
            fontSize: 'clamp(60px, 8.5vw, 108px)', lineHeight: 0.88,
            textTransform: 'uppercase', letterSpacing: '0.01em',
            color: '#fff', marginBottom: 32,
          }}>
            BRING US<br />
            YOUR <span style={{ color: '#E07B39' }}>PROJECT.</span><br />
            <span style={{ color: 'rgba(255,255,255,0.22)' }}>WE TAKE IT</span><br />
            FROM HERE.
          </h1>

          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 400,
            fontSize: 17, lineHeight: 1.7,
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 580, marginBottom: 44,
          }}>
            Konative assembles end-to-end energy infrastructure deals — connecting investors, landholders, supply chain, power sourcing, and the right teams to move your project from concept to commissioned.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
              background: '#1E4FBF', color: '#fff',
              padding: '18px 40px', textDecoration: 'none', display: 'inline-block',
            }}>
              START YOUR PROJECT NOW
            </Link>
            <Link href="#capabilities" style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 500,
              fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
              background: 'transparent', color: 'rgba(255,255,255,0.7)',
              padding: '17px 32px', border: '1px solid rgba(255,255,255,0.25)',
              textDecoration: 'none', display: 'inline-block',
            }}>
              SEE HOW WE WORK
            </Link>
          </div>
        </div>

        <div style={{ flexShrink: 0, width: 280, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[
            { val: '$7.6B+', label: 'Deal Flow Tracked', rust: true },
            { val: '6',      label: 'End-to-End Capabilities', rust: false },
            { val: '24h',    label: 'Response Guarantee', rust: false },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '20px 22px',
            }}>
              <div style={{
                fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700,
                fontSize: 40, lineHeight: 1, marginBottom: 4,
                color: stat.rust ? '#E07B39' : '#fff',
              }}>
                {stat.val}
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 500,
                fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
          <div style={{
            background: 'rgba(224,123,57,0.15)',
            border: '1px solid rgba(224,123,57,0.35)',
            padding: '20px 22px',
          }}>
            <div ref={dealRef as React.RefObject<HTMLDivElement>} style={{
              fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700,
              fontSize: 28, lineHeight: 1.2, marginBottom: 4, color: '#E07B39',
            }}>
              {dealCount} ACTIVE
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 500,
              fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
            }}>
              Projects in Motion
            </div>
          </div>
        </div>
      </div>

      <div style={{
        position: 'relative', zIndex: 2,
        borderTop: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(4,10,22,0.85)', backdropFilter: 'blur(8px)',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          animation: 'ticker-scroll 28s linear infinite',
          whiteSpace: 'nowrap',
        }}>
          {tickerDeals.map((deal, i) => (
            <div key={`${deal.id}-${i}`} style={{
              padding: '14px 36px',
              fontFamily: 'Inter, sans-serif',
              fontSize: 11, letterSpacing: '0.13em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              borderRight: '1px solid rgba(255,255,255,0.07)',
              display: 'inline-flex', alignItems: 'center', gap: 10, flexShrink: 0,
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: statusDot(deal.status), flexShrink: 0,
                display: 'inline-block',
              }} />
              {deal.name} · {deal.size} · {deal.geography}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
