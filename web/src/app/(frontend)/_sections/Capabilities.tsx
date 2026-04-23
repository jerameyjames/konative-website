'use client'

import { useState } from 'react'

const capabilities = [
  {
    num: '01 — Capital',
    title: 'Investor Matchmaking & Deal Structure',
    body: 'We connect landholders and developers with institutional and sovereign capital. We structure the deal, run the introduction process, and stay in the room through close.',
  },
  {
    num: '02 — Land',
    title: 'Site Acquisition & Feasibility',
    body: 'Site identification, feasibility analysis, zoning review, and landholder relationship management. We find and qualify the right land before capital is committed.',
  },
  {
    num: '03 — Supply Chain',
    title: 'Buildings & Modular Sourcing',
    body: 'End-to-end procurement for prefab and modular infrastructure — buildings, enclosures, cooling, and site hardware. We have the supplier relationships to move fast.',
  },
  {
    num: '04 — Power',
    title: 'Turbine & Generation Sourcing',
    body: "Power generation procurement, turbine sourcing, and grid interconnection strategy. We know what's available, what's on lead time, and what the ISO queue looks like in your region.",
  },
  {
    num: '05 — Energy Strategy',
    title: 'Behind-the-Meter Design',
    body: 'On-site generation, battery storage, and grid-independent architecture. We design the behind-the-meter strategy that protects your project from grid constraints and rate exposure.',
  },
  {
    num: '06 — People',
    title: 'Staffing & Ops Readiness',
    body: 'Staffing recommendations, placement support, and operational structure design. We make sure the right people are in place before your project goes live.',
  },
]

export default function Capabilities() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="capabilities" style={{ background: '#08142D', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 48px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end', marginBottom: 64 }}>
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
              color: '#E07B39', marginBottom: 20,
            }}>
              <span style={{ display: 'block', width: 28, height: 1, background: '#E07B39' }} />
              What We Do
            </div>
            <h2 style={{
              fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800,
              fontSize: 'clamp(44px, 5.5vw, 80px)', lineHeight: 0.9,
              textTransform: 'uppercase', letterSpacing: '0.01em', color: '#fff',
            }}>
              END-TO-END.<br /><span style={{ color: '#E07B39' }}>NO GAPS.</span>
            </h2>
          </div>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.75,
            color: 'rgba(255,255,255,0.45)', maxWidth: 480,
          }}>
            Most projects stall because no single partner owns the full stack. Konative does — from the first feasibility call to a staffed, operating asset. Six capabilities, one team, one accountability.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1, background: 'rgba(255,255,255,0.08)',
        }}>
          {capabilities.map((cap, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: '#08142D',
                padding: '40px 36px',
                borderLeft: hovered === i ? '2px solid #E07B39' : '2px solid transparent',
                transition: 'border-color 0.2s, background 0.2s',
              }}
            >
              <div style={{
                fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700,
                fontSize: 13, letterSpacing: '0.2em', color: '#E07B39', marginBottom: 16,
              }}>
                {cap.num}
              </div>
              <h3 style={{
                fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700,
                fontSize: 26, textTransform: 'uppercase', color: '#fff',
                lineHeight: 1, marginBottom: 12,
              }}>
                {cap.title}
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 13,
                lineHeight: 1.7, color: 'rgba(255,255,255,0.45)',
              }}>
                {cap.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
