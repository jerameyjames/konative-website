'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── Design tokens ──────────────────────────────────────────────────────────
const C = {
  orange:    '#C84B1F',
  orangeDark:'#A33D17',
  black:     '#111111',
  bg:        '#FFFFFF',
  dark:      '#0A0A0A',
  darkCard:  '#1A1A1A',
  warmOff:   '#F2F0EB',
  border:    '#E0DDD8',
  gray:      '#666666',
}

// ─── Hooks ──────────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-up')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      })
    }, { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useCountUp(target: number, duration = 1200) {
  const [val, setVal] = useState<number | string>(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        io.disconnect()
        const isFloat = String(target).includes('.')
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          const ease = t < 0.5 ? 2*t*t : -1+(4-2*t)*t
          const cur = ease * target
          setVal(isFloat ? parseFloat(cur.toFixed(1)) : Math.floor(cur))
          if (t < 1) requestAnimationFrame(tick)
          else setVal(isFloat ? target : target)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])
  return [val, ref] as const
}

// ─── InfraPhoto ──────────────────────────────────────────────────────────────
function InfraPhoto({ label = 'infrastructure', style = {}, overlay = false }: { label?: string, style?: React.CSSProperties, overlay?: boolean }) {
  return (
    <div className="infra-photo" style={style}>
      {overlay && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1 }} />}
      <span className="infra-photo-label" style={{ zIndex: 2, position: 'relative' }}>{label}</span>
    </div>
  )
}

// ─── TypeScript interfaces ───────────────────────────────────────────────────
interface Article {
  id: string
  title: string
  summary?: string
  category: string
  source?: string
  published_at: string
  url?: string
  image_url?: string | null
}

interface Deal {
  id: string
  name: string
  entity: string
  type: string
  size: string
  status: 'ACTIVE' | 'ANNOUNCED' | 'CLOSED'
  geography: string
  description?: string
}

interface HealthStats {
  articleCount: number
  feedCount: number
  dealCount: number
  lastFetch?: string
}

// ─── ISO region data ─────────────────────────────────────────────────────────
const ISO_REGIONS = [
  { name: 'PJM',   full: 'Mid-Atlantic & Midwest', states: 'PA, OH, IL, NJ + 10 more', cap: '185 GW', status: 'MONITORING' },
  { name: 'CAISO', full: 'California',              states: 'CA',                        cap: '80 GW',  status: 'CONSTRAINED' },
  { name: 'ERCOT', full: 'Texas',                   states: 'TX',                        cap: '102 GW', status: 'MONITORING' },
  { name: 'MISO',  full: 'Central US & Canada',     states: 'MN, IN, MI + 12 more',      cap: '196 GW', status: 'MONITORING' },
  { name: 'NYISO', full: 'New York',                states: 'NY',                        cap: '40 GW',  status: 'CONSTRAINED' },
  { name: 'ISONE', full: 'New England',             states: 'MA, CT, ME + 4 more',       cap: '34 GW',  status: 'CONSTRAINED' },
  { name: 'SPP',   full: 'Great Plains',            states: 'KS, OK, NE + 8 more',       cap: '95 GW',  status: 'MONITORING' },
  { name: 'IESO',  full: 'Ontario, Canada',         states: 'Ontario',                   cap: '38 GW',  status: 'MONITORING' },
]
const isoStatusColor = (s: string) => s === 'MONITORING' ? '#4ade80' : '#ef4444'

// ─── Placeholder data ─────────────────────────────────────────────────────────
const PLACEHOLDER_ARTICLES: Article[] = [
  { id: '1', title: 'PJM Queue Hits Record 3,000+ GW — What It Means for Data Center Siting',           category: 'Power & Energy',    source: 'Utility Dive',             published_at: '2026-04-19' },
  { id: '2', title: 'Saudi Aramco Energy Ventures Commits $4.2B to North American Digital Infrastructure', category: 'Investment',         source: 'Bloomberg',                published_at: '2026-04-18' },
  { id: '3', title: 'Why Prefabricated Modular Is Now the Default Choice for Sub-100MW Builds',          category: 'Modular DC',         source: 'DataCenter Dynamics',      published_at: '2026-04-17' },
  { id: '4', title: 'Generator Lead Times Now 52 Weeks: The Hidden Constraint on New Deployments',       category: 'Supply Chain',       source: 'DCD Intelligence',         published_at: '2026-04-16' },
  { id: '5', title: 'FERC Order 2023-A: How New Interconnection Rules Are Reshaping Project Timelines',  category: 'Policy',             source: 'Greentech Media',          published_at: '2026-04-15' },
  { id: '6', title: 'CPPIB Targets 3.4 GW Across Four Modular DC Platforms Through 2028',               category: 'Sovereign Capital',  source: 'Infrastructure Investor',  published_at: '2026-04-14' },
]

const PLACEHOLDER_DEALS: Deal[] = [
  { id: '1', name: 'Project Northstar',  entity: 'CPPIB / Digital Bridge',        type: 'Sovereign Wealth', size: '$3.4B',  status: 'ACTIVE',     geography: 'Ontario, Canada',         description: 'Multi-site modular DC development across three Ontario municipalities with First Nations partnership structure.' },
  { id: '2', name: 'Cascade Power Build', entity: 'Blackstone Infrastructure',    type: 'Infrastructure',   size: '$780M',  status: 'ANNOUNCED',  geography: 'Pacific Northwest, USA',   description: 'Hyperscale-adjacent modular builds targeting CAISO interconnection queue positions acquired in Q4 2025.' },
  { id: '3', name: 'Mesa Verde AI Park', entity: 'Undisclosed SWF',               type: 'Sovereign Wealth', size: '$1.2B',  status: 'ACTIVE',     geography: 'Texas, USA',               description: 'AI-optimized modular campus adjacent to ERCOT substation with confirmed 400MW capacity agreement.' },
  { id: '4', name: 'Ridgeline Series A', entity: 'Emerging Markets Dev Corp',     type: 'Development',      size: '$120M',  status: 'ANNOUNCED',  geography: 'Alberta, Canada',          description: 'Indigenous-led modular DC development with provincial economic development mandate and land certainty.' },
  { id: '5', name: 'Atlantic Gateway',   entity: 'Macquarie Asset Mgmt',          type: 'Infrastructure',   size: '$2.1B',  status: 'ACTIVE',     geography: 'Eastern Seaboard, USA',    description: 'Multi-region edge modular deployment targeting ISONE and PJM interconnection queue positions.' },
]

const statusColor = (s: string) => s === 'ACTIVE' ? '#22c55e' : s === 'ANNOUNCED' ? '#D97706' : '#888'

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── HeroSection ─────────────────────────────────────────────────────────────
function HeroSection({ stats }: { stats: HealthStats }) {
  const [articleCount, articleRef] = useCountUp(stats.articleCount)
  const [feedCount,    feedRef]    = useCountUp(stats.feedCount)
  const [dealCount,    dealRef]    = useCountUp(stats.dealCount)
  const [gwCount,      gwRef]      = useCountUp(15.6)

  const [hoveredCTA, setHoveredCTA] = useState<null | 'primary' | 'secondary'>(null)

  const statCells = [
    { ref: articleRef, val: articleCount, suffix: '',    label: 'Curated Articles' },
    { ref: feedRef,    val: feedCount,    suffix: '',    label: 'Live Intel Feeds' },
    { ref: dealRef,    val: dealCount,    suffix: '',    label: 'Active Deals' },
    { ref: gwRef,      val: gwCount,      suffix: ' GW', label: 'GW Absorbed 2025' },
  ]

  return (
    <section style={{ background: '#080808', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Background photo */}
      <InfraPhoto style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} label="server corridor" />

      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.45) 100%)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', flex: 1, paddingTop: 64 }}>
        <div style={{ maxWidth: 780 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.orange, marginBottom: 24 }}>
            Intelligence Platform · Development Brokerage · Media Property
          </p>

          <h1 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: 'clamp(52px, 8vw, 100px)', lineHeight: 0.92, textTransform: 'uppercase', color: '#fff', marginBottom: 32, letterSpacing: '0.01em' }}>
            THE <span style={{ color: C.orange }}>INTELLIGENCE<br />PLATFORM</span><br />FOR DATA CENTER<br />DEVELOPMENT.
          </h1>

          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.78)', maxWidth: 580, marginBottom: 40 }}>
            Konative aggregates market intelligence, tracks deal flow, and serves as the development quarterback for principals moving from capital and land to a credible modular data center build.
          </p>

          <div style={{ display: 'flex', flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              onMouseEnter={() => setHoveredCTA('primary')}
              onMouseLeave={() => setHoveredCTA(null)}
              style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
                background: hoveredCTA === 'primary' ? C.orangeDark : C.orange,
                color: '#fff', padding: '16px 32px', textDecoration: 'none', transition: 'background 0.2s', display: 'inline-block',
              }}
            >
              REQUEST A PROJECT READINESS REVIEW
            </Link>
            <Link
              href="/market-intel"
              onMouseEnter={() => setHoveredCTA('secondary')}
              onMouseLeave={() => setHoveredCTA(null)}
              style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
                background: 'transparent', color: '#fff', padding: '16px 32px',
                border: hoveredCTA === 'secondary' ? '1px solid #fff' : '1px solid rgba(255,255,255,0.4)',
                textDecoration: 'none', transition: 'border-color 0.2s', display: 'inline-block',
              }}
            >
              EXPLORE THE INTELLIGENCE
            </Link>
          </div>
        </div>
      </div>

      {/* Stats band */}
      <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {statCells.map((cell, i) => (
            <div
              key={i}
              ref={cell.ref as React.RefObject<HTMLDivElement>}
              style={{ padding: '28px 32px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
            >
              <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: 48, color: '#fff', lineHeight: 1 }}>
                {cell.val}{cell.suffix}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: 6 }}>
                {cell.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ProblemSection ───────────────────────────────────────────────────────────
function ProblemSection() {
  const problemCards = [
    { title: 'No Single Source',        body: 'Market intelligence is fragmented across 40+ publications, ISO reports, and private deal channels. No platform synthesizes it for modular DC principals.' },
    { title: '12–24 Month Delays',      body: 'Without coordinated feasibility, connectivity, and capital introductions, projects stall at the worst possible stages — costing capital and competitive position.' },
    { title: 'Fragmented Intelligence', body: 'Power data, deal flow, policy shifts, and build-partner availability live in silos. Konative is the first platform to unify them under one operational layer.' },
  ]

  return (
    <section style={{ background: C.dark, padding: '120px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.orange, marginBottom: 20 }}>
          THE PROBLEM
        </p>

        <h2 className="fade-up" style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: 'clamp(48px, 7vw, 88px)', lineHeight: 0.92, textTransform: 'uppercase', color: '#fff', marginBottom: 64, maxWidth: 700, letterSpacing: '0.01em' }}>
          THE <span style={{ color: C.orange }}>CRISIS</span> NOBODY TALKS ABOUT.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(255,255,255,0.08)' }}>
          {problemCards.map((card, i) => (
            <div key={i} className="fade-up" style={{ background: C.dark, padding: '48px 40px', borderTop: `2px solid ${C.orange}` }}>
              <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: 28, textTransform: 'uppercase', color: '#fff', marginBottom: 16, letterSpacing: '0.02em' }}>
                {card.title}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)' }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>

        <div className="fade-up" style={{ marginTop: 80, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 40 }}>
          <p style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 600, fontSize: 26, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.02em' }}>
            Konative exists at the intersection of three functions that{' '}
            <span style={{ color: '#fff' }}>don&apos;t exist under one roof.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── WhatKonativeIs ───────────────────────────────────────────────────────────
function WhatKonativeIs() {
  const [hoveredCard, setHoveredCard] = useState<null | number>(null)

  const cards = [
    {
      label: 'Function 01',
      title: 'Intelligence Platform',
      body:  'Live market data, curated feeds from 16 active sources, and power market tracking across all 8 North American ISO regions. Updated daily.',
      ctaHref: '/market-intel',
      ctaText: 'Explore Market Intel →',
    },
    {
      label: 'Function 02',
      title: 'Development Brokerage',
      body:  'Site feasibility, grid connectivity, capital stack introductions, and build partner identification. From stalled to deployed.',
      ctaHref: '/contact',
      ctaText: 'Request a Review →',
    },
    {
      label: 'Function 03',
      title: 'Media & Newsletter',
      body:  'Premium intelligence newsletter reaching 2,000–5,000 decision-makers who control modular DC procurement budgets. 2x/week.',
      ctaHref: '#newsletter',
      ctaText: 'Subscribe Free →',
    },
  ]

  return (
    <section style={{ background: C.bg, padding: '120px 32px', borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="fade-up" style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', color: C.orange, marginBottom: 16, letterSpacing: '0.2em' }}>
            WHAT WE ARE
          </p>
          <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: 'clamp(40px, 5vw, 68px)', lineHeight: 0.92, textTransform: 'uppercase', color: C.black, letterSpacing: '0.01em', maxWidth: 600 }}>
            THREE <span style={{ color: C.orange }}>FUNCTIONS.</span> ONE PLATFORM.
          </h2>
        </div>

        <div style={{ border: `1px solid ${C.border}`, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {cards.map((card, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                padding: '48px 40px',
                borderRight: i < 2 ? `1px solid ${C.border}` : 'none',
                borderLeft: hoveredCard === i ? `3px solid ${C.orange}` : '3px solid transparent',
                transition: 'border-color 0.15s',
                background: C.bg,
              }}
            >
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: C.orange, marginBottom: 20 }}>
                {card.label}
              </p>
              <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: 34, textTransform: 'uppercase', color: C.black, marginBottom: 16, lineHeight: 1 }}>
                {card.title}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.7, color: '#555', marginBottom: 32 }}>
                {card.body}
              </p>
              <Link href={card.ctaHref} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.08em', color: C.orange, textDecoration: 'none', borderBottom: `1px solid ${C.orange}`, paddingBottom: 2 }}>
                {card.ctaText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── IntelFeed ────────────────────────────────────────────────────────────────
function IntelFeed({ articles, stats }: { articles: Article[], stats: HealthStats }) {
  const displayArticles = articles.length > 0 ? articles.slice(0, 6) : PLACEHOLDER_ARTICLES
  const [hoveredArticle, setHoveredArticle] = useState<null | number>(null)
  const [railEmail,      setRailEmail]      = useState('')
  const [railSubmitted,  setRailSubmitted]  = useState(false)
  const [railSubmitting, setRailSubmitting] = useState(false)
  const [viewAllHov, setViewAllHov]         = useState(false)

  const handleRailSubmit = async () => {
    if (!railEmail || railSubmitting) return
    setRailSubmitting(true)
    try {
      await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: railEmail, source: 'homepage_rail' }),
      })
      setRailSubmitted(true)
    } catch {
      setRailSubmitted(true)
    } finally {
      setRailSubmitting(false)
    }
  }

  return (
    <section style={{ background: C.bg, padding: '120px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 80 }}>
        {/* Left column */}
        <div>
          <div className="fade-up" style={{ marginBottom: 56 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', color: C.orange, marginBottom: 16, letterSpacing: '0.2em' }}>
              LIVE INTELLIGENCE
            </p>
            <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: 'clamp(40px, 5vw, 68px)', lineHeight: 0.92, textTransform: 'uppercase', color: C.black, letterSpacing: '0.01em' }}>
              WHAT&apos;S MOVING <span style={{ color: C.orange }}>THE MARKET</span> RIGHT NOW.
            </h2>
          </div>

          <div style={{ border: `1px solid ${C.border}`, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {displayArticles.map((article, i) => (
              <div
                key={article.id}
                className="fade-up"
                onMouseEnter={() => setHoveredArticle(i)}
                onMouseLeave={() => setHoveredArticle(null)}
                style={{
                  borderLeft: hoveredArticle === i ? `3px solid ${C.orange}` : '3px solid transparent',
                  boxShadow: hoveredArticle === i ? '0 4px 16px rgba(0,0,0,0.08)' : 'none',
                  borderRight: (i % 3 < 2) ? `1px solid ${C.border}` : 'none',
                  borderBottom: i < 3 ? `1px solid ${C.border}` : 'none',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                  background: C.bg,
                }}
              >
                <InfraPhoto style={{ height: 140, width: '100%' }} label={article.category.toLowerCase()} />
                <div style={{ padding: '20px 20px 24px' }}>
                  <span style={{ display: 'inline-block', background: C.orange, color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 8px', marginBottom: 12 }}>
                    {article.category}
                  </span>
                  <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: 19, lineHeight: 1.15, textTransform: 'uppercase', color: C.black, marginBottom: 12, letterSpacing: '0.01em' }}>
                    {article.title}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#888' }}>
                      {article.source} · {article.published_at}
                    </span>
                    <a href={article.url || '#'} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11, color: C.orange, textDecoration: 'none' }}>
                      Read →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link
              href="/market-intel"
              onMouseEnter={() => setViewAllHov(true)}
              onMouseLeave={() => setViewAllHov(false)}
              style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
                background: viewAllHov ? C.orangeDark : C.orange,
                color: '#fff', padding: '14px 40px', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s',
              }}
            >
              VIEW ALL INTELLIGENCE →
            </Link>
          </div>
        </div>

        {/* Right rail newsletter */}
        <div style={{ background: C.warmOff, padding: '40px 32px', position: 'sticky', top: 80, alignSelf: 'flex-start' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', color: C.orange, marginBottom: 16, letterSpacing: '0.2em' }}>
            THE INTELLIGENCE BRIEF
          </p>
          <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: 28, textTransform: 'uppercase', color: C.black, marginBottom: 16, lineHeight: 1 }}>
            GET THE INTELLIGENCE IN YOUR INBOX
          </h3>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.6, color: '#555', marginBottom: 24 }}>
            Join decision-makers tracking the modular DC buildout. 2x/week.
          </p>
          {railSubmitted ? (
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: C.orange, marginBottom: 12 }}>Subscribed! ✓</p>
          ) : (
            <>
              <input
                type="email"
                placeholder="Your email address"
                value={railEmail}
                onChange={e => setRailEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRailSubmit()}
                style={{ width: '100%', padding: '12px 16px', border: `1px solid ${C.border}`, background: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 14, marginBottom: 10, outline: 'none', boxSizing: 'border-box' }}
              />
              <button
                onClick={handleRailSubmit}
                disabled={railSubmitting}
                style={{ width: '100%', padding: 14, background: C.orange, color: '#fff', border: 'none', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                SUBSCRIBE FREE
              </button>
            </>
          )}
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#888', marginTop: 12 }}>
            {stats.articleCount} curated articles · {stats.feedCount} live feeds · Updated daily
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── DealsTracker ─────────────────────────────────────────────────────────────
function DealsTracker({ deals }: { deals: Deal[] }) {
  const displayDeals = deals.length > 0 ? deals : PLACEHOLDER_DEALS
  const [activeTab,   setActiveTab]   = useState('ALL')
  const [openDeal,    setOpenDeal]    = useState<null | number>(null)
  const [hoveredRow,  setHoveredRow]  = useState<null | number>(null)
  const [ghostHov,    setGhostHov]    = useState(false)

  const TABS = ['ALL', 'SOVEREIGN WEALTH', 'INFRASTRUCTURE', 'DEVELOPMENT']

  const filteredDeals = activeTab === 'ALL'
    ? displayDeals
    : displayDeals.filter(d => d.type.toUpperCase().includes(activeTab.replace(/ /g, '')))
  const visibleDeals = filteredDeals.slice(0, 3)

  return (
    <section style={{ background: C.warmOff, padding: '120px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', color: C.orange, marginBottom: 16, letterSpacing: '0.2em' }}>
          DEAL FLOW
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
          <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: 'clamp(40px, 5vw, 68px)', lineHeight: 0.92, textTransform: 'uppercase', color: C.black }}>
            TRACK THE <span style={{ color: C.orange }}>CAPITAL</span> MOVING INTO<br />NORTH AMERICAN DATA CENTER.
          </h2>
          <p style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: 18, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
            5 Active Deals · $7.6B+ Tracked
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{ borderBottom: `1px solid ${C.border}`, display: 'flex', gap: 0 }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em',
                padding: '12px 20px', background: 'transparent', border: 'none', cursor: 'pointer',
                color: activeTab === tab ? C.orange : '#555',
                borderBottom: activeTab === tab ? `2px solid ${C.orange}` : '2px solid transparent',
                marginBottom: -1,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderTop: 'none' }}>
          {/* Header row */}
          <div style={{ background: C.warmOff, borderBottom: `1px solid ${C.border}`, padding: '12px 24px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}>
            {['Deal / Entity', 'Type', 'Size', 'Geography', 'Status'].map(h => (
              <span key={h} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: C.gray }}>
                {h}
              </span>
            ))}
          </div>

          {visibleDeals.map((deal, i) => (
            <div key={deal.id}>
              <div
                onClick={() => setOpenDeal(openDeal === i ? null : i)}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                  padding: '20px 24px', borderBottom: `1px solid ${C.border}`,
                  cursor: 'pointer', background: hoveredRow === i ? '#fafafa' : '#fff',
                  transition: 'background 0.15s',
                }}
              >
                <div>
                  <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: 18, textTransform: 'uppercase', color: C.black }}>{deal.name}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#888', marginTop: 2 }}>{deal.entity}</div>
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#555', display: 'flex', alignItems: 'center' }}>{deal.type}</div>
                <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: 20, color: C.black, display: 'flex', alignItems: 'center' }}>{deal.size}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#555', display: 'flex', alignItems: 'center' }}>{deal.geography}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor(deal.status), display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.08em', color: statusColor(deal.status) }}>{deal.status}</span>
                  <span style={{ marginLeft: 'auto', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#aaa', transform: openDeal === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', display: 'inline-block' }}>▼</span>
                </div>
              </div>
              {openDeal === i && deal.description && (
                <div style={{ background: C.warmOff, padding: '24px 24px 32px', borderBottom: `1px solid ${C.border}` }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.7, color: '#444', maxWidth: 640 }}>{deal.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link
            href="/deals"
            onMouseEnter={() => setGhostHov(true)}
            onMouseLeave={() => setGhostHov(false)}
            style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em',
              border: `1px solid ${C.black}`,
              color: ghostHov ? '#fff' : C.black,
              background: ghostHov ? C.black : 'transparent',
              padding: '14px 40px', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s, color 0.2s',
            }}
          >
            VIEW ALL DEALS →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── PowerMarketsSection ──────────────────────────────────────────────────────
function PowerMarketsSection() {
  const [earlyAccessHov, setEarlyAccessHov] = useState(false)

  return (
    <section style={{ background: C.dark, padding: '120px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
        <div className="fade-up" style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', color: C.orange, marginBottom: 16, letterSpacing: '0.2em' }}>
            POWER MARKETS
          </p>
          <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 0.92, textTransform: 'uppercase', color: '#fff', letterSpacing: '0.01em', marginBottom: 20 }}>
            <span style={{ color: C.orange }}>POWER</span> IS THE CONSTRAINT.<br />WE TRACK IT.
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.55)', maxWidth: 560, margin: '0 auto 32px' }}>
            Real-time availability data across 8 ISO regions — PJM, CAISO, ERCOT, MISO, NYISO, ISONE, SPP, IESO.
          </p>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: C.orange, color: '#fff', padding: '6px 16px', display: 'inline-block' }}>
            LIVE DATA LAUNCHING Q3 2026
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'rgba(255,255,255,0.06)' }}>
          {ISO_REGIONS.map((region, i) => (
            <div key={i} className="fade-up" style={{ background: '#111', padding: '32px 28px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: 36, color: '#fff', textTransform: 'uppercase', lineHeight: 1 }}>{region.name}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: isoStatusColor(region.status), display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 9, letterSpacing: '0.1em', color: isoStatusColor(region.status) }}>{region.status}</span>
                </span>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{region.full}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.25)', marginBottom: 20 }}>{region.states}</p>
              <div style={{ height: 40, background: 'rgba(255,255,255,0.04)', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>DATA Q3 2026</span>
              </div>
              <div>
                <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: 22, color: '#fff' }}>{region.cap}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)' }}>Capacity</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link
            href="#newsletter"
            onMouseEnter={() => setEarlyAccessHov(true)}
            onMouseLeave={() => setEarlyAccessHov(false)}
            style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em',
              background: earlyAccessHov ? C.orangeDark : C.orange,
              color: '#fff', padding: '14px 40px', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s',
            }}
          >
            GET EARLY ACCESS
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── WhoWeServe ───────────────────────────────────────────────────────────────
function WhoWeServe() {
  const [hoveredPanel, setHoveredPanel] = useState<null | number>(null)

  const panels = [
    {
      label: 'Segment 01',
      title: 'Institutional Investors',
      desc:  '$50M–$2B+ AUM groups evaluating modular DC as an infrastructure asset class. We provide deal flow, feasibility support, and capital introductions.',
    },
    {
      label: 'Segment 02',
      title: 'Indigenous Development Corporations',
      desc:  'Land, power access, and economic development mandates. Konative bridges traditional territory asset advantages with modular DC deployment capital.',
    },
    {
      label: 'Segment 03',
      title: 'Enterprise AI Platforms',
      desc:  'Infrastructure developers entering modular DC from adjacent sectors. We provide the market intelligence and development quarterback function.',
    },
  ]

  return (
    <section style={{ background: C.bg, padding: '120px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="fade-up" style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', color: C.orange, marginBottom: 16, letterSpacing: '0.2em' }}>
            WHO WE SERVE
          </p>
          <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: 'clamp(40px, 5vw, 68px)', lineHeight: 0.92, textTransform: 'uppercase', color: C.black, letterSpacing: '0.01em', maxWidth: 800 }}>
            PRECISION DESIGNED FOR THE MOST <span style={{ color: C.orange }}>AMBITIOUS</span> CAPITAL VENTURES.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
          {panels.map((panel, i) => {
            const hov = hoveredPanel === i
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredPanel(i)}
                onMouseLeave={() => setHoveredPanel(null)}
                style={{ position: 'relative', height: 480, overflow: 'hidden', cursor: 'pointer' }}
              >
                <InfraPhoto style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} label={panel.title.toLowerCase()} />
                <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.55)', transition: 'background 0.3s', zIndex: 1 }} />
                <div style={{ position: 'absolute', inset: 0, zIndex: 2, padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', color: C.orange, marginBottom: 12, letterSpacing: '0.2em' }}>
                    {panel.label}
                  </p>
                  <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: 32, textTransform: 'uppercase', color: '#fff', marginBottom: 12, lineHeight: 1 }}>
                    {panel.title}
                  </h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', marginBottom: 24 }}>
                    {panel.desc}
                  </p>
                  <Link href="/contact" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: 2, display: 'inline-block', opacity: hov ? 1 : 0.6, transition: 'opacity 0.3s' }}>
                    Learn More →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── NewsletterSponsor ────────────────────────────────────────────────────────
function NewsletterSponsor() {
  const [nlEmail,     setNlEmail]     = useState('')
  const [nlSubmitted, setNlSubmitted] = useState(false)
  const [sponsorHov,  setSponsorHov]  = useState(false)

  const handleSubmit = async () => {
    if (!nlEmail) return
    try {
      await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: nlEmail, source: 'homepage_newsletter_section' }),
      })
    } catch {
      // silent fail
    }
    setNlSubmitted(true)
  }

  return (
    <section id="newsletter" style={{ background: C.bg }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Left: newsletter sign-up */}
        <div className="fade-up" style={{ background: C.bg, padding: '80px 64px', borderRight: `1px solid ${C.border}` }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', color: C.orange, marginBottom: 16, letterSpacing: '0.2em' }}>
            THE INTELLIGENCE BRIEF
          </p>
          <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 0.92, textTransform: 'uppercase', color: C.black, letterSpacing: '0.01em', marginBottom: 24, maxWidth: 520 }}>
            THE ONLY PREMIUM NEWSLETTER FOR MODULAR DC <span style={{ color: C.orange }}>DECISION-MAKERS.</span>
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.7, color: '#555', maxWidth: 480, marginBottom: 32 }}>
            2x/week: curated market digest + deep-dive analysis. Join the principals, developers, and vendors tracking the largest infrastructure buildout in a generation.
          </p>
          {nlSubmitted ? (
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: C.orange, marginBottom: 12 }}>Subscribed! ✓</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'row', gap: 0, marginBottom: 12 }}>
              <input
                type="email"
                placeholder="Your email address"
                value={nlEmail}
                onChange={e => setNlEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                style={{ flex: 1, padding: '14px 16px', border: `1px solid ${C.border}`, borderRight: 'none', background: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 14, outline: 'none' }}
              />
              <button
                onClick={handleSubmit}
                style={{ padding: '14px 28px', background: C.orange, color: '#fff', border: 'none', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                SUBSCRIBE FREE
              </button>
            </div>
          )}
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#aaa' }}>
            61 curated articles · 16 live feeds · Updated daily
          </p>
        </div>

        {/* Right: sponsorship */}
        <div className="fade-up" style={{ background: C.warmOff, padding: '80px 64px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', color: C.orange, marginBottom: 16, letterSpacing: '0.2em' }}>
            FOR VENDORS & PARTNERS
          </p>
          <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 0.92, textTransform: 'uppercase', color: C.black, letterSpacing: '0.01em', marginBottom: 24, maxWidth: 520 }}>
            REACH THE DECISION-MAKERS WHO BUY WHAT <span style={{ color: C.orange }}>YOU SELL.</span>
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.7, color: '#555', maxWidth: 480, marginBottom: 40 }}>
            Flat-fee newsletter sponsorships. Direct inbox access to modular DC procurement decision-makers. No programmatic. No waste.
          </p>
          <Link
            href="/contact"
            onMouseEnter={() => setSponsorHov(true)}
            onMouseLeave={() => setSponsorHov(false)}
            style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em',
              background: sponsorHov ? '#333' : C.black,
              color: '#fff', padding: '16px 40px', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s',
            }}
          >
            EXPLORE SPONSORSHIP →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── StatsBar ─────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { val: '$383B', label: 'Global DC Market (2025)' },
    { val: '17.4%', label: 'CAGR Modular DC' },
    { val: '15.6 GW', label: 'Absorbed in 2025' },
    { val: '$1T', label: 'Saudi Commitment to US AI Infrastructure' },
  ]

  return (
    <section style={{ background: C.orange }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {stats.map((s, i) => (
          <div key={i} className="fade-up" style={{ padding: '48px 32px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.2)' : 'none' }}>
            <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: 52, color: '#fff', lineHeight: 1 }}>
              {s.val}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── AssessmentCTA ────────────────────────────────────────────────────────────
function AssessmentCTA() {
  const [ctaHov, setCtaHov] = useState(false)

  return (
    <section style={{ background: C.bg, padding: '120px 32px', borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        {/* Left */}
        <div className="fade-up">
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', color: C.orange, marginBottom: 16, letterSpacing: '0.2em' }}>
            DEVELOPMENT READINESS REVIEW
          </p>
          <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 0.92, textTransform: 'uppercase', color: C.black, letterSpacing: '0.01em', marginBottom: 24 }}>
            READY TO <span style={{ color: C.orange }}>COMPRESS</span><br />YOUR TIMELINE?
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.7, color: '#555', maxWidth: 480 }}>
            The Development Readiness Review covers site and power feasibility, connectivity brokerage, capital stack introductions, and build partner identification.
          </p>
        </div>

        {/* Right */}
        <div className="fade-up">
          <div style={{ display: 'flex', flexDirection: 'row', gap: 48, marginBottom: 40 }}>
            {[
              { num: '01',    label: '24h Response Guarantee' },
              { num: '99.8%', label: 'Platform Uptime SLA' },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: 48, color: C.black, lineHeight: 1 }}>{item.num}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888', marginTop: 6 }}>{item.label}</div>
              </div>
            ))}
          </div>
          <Link
            href="/contact"
            onMouseEnter={() => setCtaHov(true)}
            onMouseLeave={() => setCtaHov(false)}
            style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em',
              background: ctaHov ? C.orangeDark : C.orange,
              color: '#fff', padding: '20px 48px', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s',
            }}
          >
            REQUEST A PROJECT READINESS REVIEW
          </Link>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function LegacyHomePage() {
  useScrollReveal()

  const [articles, setArticles] = useState<Article[]>([])
  const [deals,    setDeals]    = useState<Deal[]>([])
  const [stats,    setStats]    = useState<HealthStats>({ articleCount: 61, feedCount: 16, dealCount: 5 })

  useEffect(() => {
    fetch('/api/v1/content?limit=6').then(r => r.json()).then(d => setArticles(d.articles || d.data || [])).catch(() => {})
    fetch('/api/v1/deals').then(r => r.json()).then(d => setDeals(d.deals || d.data || [])).catch(() => {})
    fetch('/api/v1/health').then(r => r.json()).then(d => setStats(d)).catch(() => {})
  }, [])

  return (
    <>
      <HeroSection stats={stats} />
      <ProblemSection />
      <WhatKonativeIs />
      <IntelFeed articles={articles} stats={stats} />
      <DealsTracker deals={deals} />
      <PowerMarketsSection />
      <WhoWeServe />
      <NewsletterSponsor />
      <StatsBar />
      <AssessmentCTA />
    </>
  )
}
