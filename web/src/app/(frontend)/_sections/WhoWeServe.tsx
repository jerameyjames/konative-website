'use client'

import Link from 'next/link'
import { useState } from 'react'

const panels = [
  {
    num: '01',
    title: 'Investors &\nCapital Partners',
    desc: 'You have capital ready to work. We identify sites, structure the deal, source the supply chain, handle power strategy, and staff the project — so your investment moves from commitment to commissioned asset.',
    cta: 'Put Your Capital to Work →',
    href: '/contact',
  },
  {
    num: '02',
    title: 'Landholders &\nLand Owners',
    desc: 'You hold land with power access, zoning potential, or strategic location. We bring the capital partners, the development structure, the equipment, and the build team to turn your asset into a revenue-producing infrastructure project.',
    cta: 'Monetize Your Land →',
    href: '/contact',
  },
  {
    num: '03',
    title: 'Developers &\nBuilders',
    desc: "You have a project in motion but missing pieces — capital, equipment supply chain, grid connection, staffing, or the right partners. We quarterback what's missing and compress your timeline from stalled to operational.",
    cta: 'Accelerate Your Project →',
    href: '/contact',
  },
]

export default function WhoWeServe() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="who-we-serve" style={{ background: '#0C2046', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 48px' }}>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          fontFamily: 'Inter, sans-serif', fontWeight: 600,
          fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
          color: '#E07B39', marginBottom: 20,
        }}>
          <span style={{ display: 'block', width: 28, height: 1, background: '#E07B39' }} />
          Who We Serve
        </div>

        <h2 style={{
          fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800,
          fontSize: 'clamp(44px, 5.5vw, 80px)', lineHeight: 0.9,
          textTransform: 'uppercase', letterSpacing: '0.01em',
          color: '#fff', marginBottom: 60,
        }}>
          YOUR <span style={{ color: '#E07B39' }}>SITUATION.</span><br />OUR FULL STACK.
        </h2>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1, background: 'rgba(255,255,255,0.08)',
        }}>
          {panels.map((panel, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: '#0C2046',
                padding: '48px 40px',
                borderTop: hovered === i ? '3px solid #E07B39' : '3px solid transparent',
                transition: 'border-color 0.2s, background 0.2s',
                cursor: 'default',
              }}
            >
              <div style={{
                fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700,
                fontSize: 60, color: 'rgba(255,255,255,0.07)', lineHeight: 1, marginBottom: 16,
              }}>
                {panel.num}
              </div>
              <h3 style={{
                fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700,
                fontSize: 30, textTransform: 'uppercase', color: '#fff',
                marginBottom: 14, lineHeight: 1, whiteSpace: 'pre-line',
              }}>
                {panel.title}
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14,
                lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', marginBottom: 24,
              }}>
                {panel.desc}
              </p>
              <Link href={panel.href} style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#E07B39', textDecoration: 'none',
                borderBottom: '1px solid #E07B39', paddingBottom: 2,
              }}>
                {panel.cta}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
