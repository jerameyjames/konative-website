# Konative Homepage Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Konative homepage as a brokerage-first site with a navy + rust/amber color system, full-bleed infrastructure photography, an animated deal ticker, and news feed cards — replacing the current "intelligence platform" narrative.

**Architecture:** Split the monolithic `LegacyHomePage.tsx` (928 lines) into focused section components under `_sections/`. Each section is a standalone `'use client'` component. `LegacyHomePage.tsx` becomes a thin composition layer that fetches data and passes it down. Header, Footer, and globals.css are updated independently.

**Tech Stack:** Next.js 16, React 19, TypeScript, inline styles (existing convention — no Tailwind), CSS custom properties in globals.css. No new dependencies.

**Verification gate:** No test framework exists. Each task ends with `cd web && npm run build` passing clean. Visual verification via `npm run dev` at http://localhost:3005.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `web/src/app/(frontend)/globals.css` | Add navy/rust/amber CSS tokens |
| Modify | `web/src/components/Header.tsx` | New nav links, rust wordmark, "Start Your Project" CTA |
| Create | `web/src/app/(frontend)/_sections/HeroSection.tsx` | Hero image, headline, stats sidebar, deal ticker |
| Create | `web/src/app/(frontend)/_sections/WhoWeServe.tsx` | Three stakeholder cards |
| Create | `web/src/app/(frontend)/_sections/Capabilities.tsx` | Six-pillar capability grid |
| Create | `web/src/app/(frontend)/_sections/TeamSection.tsx` | Three team cards + expansion placeholder |
| Create | `web/src/app/(frontend)/_sections/MarketIntel.tsx` | News card grid + sidebar + newsletter strip |
| Create | `web/src/app/(frontend)/_sections/StartNowCTA.tsx` | Final CTA section |
| Modify | `web/src/components/Footer.tsx` | Navy background, stakeholder entry links, rust wordmark |
| Modify | `web/src/app/(frontend)/LegacyHomePage.tsx` | Thin composition layer, data fetching |

---

## Task 1: Add navy/rust/amber design tokens to globals.css

**Files:**
- Modify: `web/src/app/(frontend)/globals.css`

- [ ] **Step 1: Add new tokens to the `:root` block**

Open `web/src/app/(frontend)/globals.css`. Find the `:root {` block. Add the following immediately after the existing token declarations (before the closing `}`):

```css
  /* ── Navy + Rust/Amber system (brokerage redesign) ── */
  --navy-900: #08142D;
  --navy-800: #0C2046;
  --navy-700: #0F2A5C;
  --blue-600: #1E4FBF;
  --blue-400: #5B8DEF;
  --rust-500: #E07B39;
  --rust-600: #C86428;
  --amber-400: #F0A050;
  --navy-border: rgba(255,255,255,0.08);
  --navy-border-2: rgba(255,255,255,0.13);
  --navy-dim: rgba(255,255,255,0.45);
  --navy-dimmer: rgba(255,255,255,0.22);
```

- [ ] **Step 2: Verify build still passes**

```bash
cd web && npm run build 2>&1 | tail -5
```

Expected: `✓ Compiled successfully` or `Route (app)` table with no errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/jerameyjames/repos/konative
git add web/src/app/\(frontend\)/globals.css
git commit -m "feat(design): add navy/rust/amber CSS tokens"
```

---

## Task 2: Update Header

**Files:**
- Modify: `web/src/components/Header.tsx`

- [ ] **Step 1: Replace the nav links array**

In `web/src/components/Header.tsx`, find:

```typescript
const navLinks: { label: string; url: string }[] = [
  { label: "Market Intel", url: "/market-intel" },
  { label: "Blog", url: "/news" },
  { label: "Deals", url: "/deals" },
  { label: "Dashboard", url: "/dashboard" },
  { label: "Power Markets", url: "/power-markets" },
  { label: "Assessment", url: "/assessment" },
];
```

Replace with:

```typescript
const navLinks: { label: string; url: string }[] = [
  { label: "Services", url: "/#capabilities" },
  { label: "Team", url: "/#team" },
  { label: "Deals", url: "/deals" },
  { label: "Market Intel", url: "/market-intel" },
];
```

- [ ] **Step 2: Update wordmark NATIVE color to rust**

Find:
```typescript
  const wordmarkNativeStyle: React.CSSProperties = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: 22,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "#C84B1F",
  };
```

Replace with:
```typescript
  const wordmarkNativeStyle: React.CSSProperties = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: 22,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "#E07B39",
  };
```

- [ ] **Step 3: Update CTA button text and solid navy background on scroll**

Find the CTA `<Link>` that renders "REQUEST A REVIEW". Replace its contents and the `href`:

```tsx
<Link
  href="/contact"
  style={ctaStyle}
  onMouseEnter={() => setCtaHovered(true)}
  onMouseLeave={() => setCtaHovered(false)}
>
  START YOUR PROJECT
</Link>
```

Find `ctaStyle` and update the background color:
```typescript
  const ctaStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    background: ctaHovered ? "#2a5fd0" : "#1E4FBF",
    color: "#fff",
    padding: "10px 20px",
    textDecoration: "none",
    flexShrink: 0,
    transition: "background 0.2s",
  };
```

- [ ] **Step 4: Update header solid background color from white to navy**

Find:
```typescript
    background: scrolled ? "rgba(255,255,255,0.98)" : "transparent",
    borderBottom: scrolled ? "1px solid #E0DDD8" : "1px solid transparent",
```

Replace with:
```typescript
    background: scrolled ? "rgba(8,20,45,0.97)" : "transparent",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
```

- [ ] **Step 5: Update nav link and login colors for navy background**

The `linkColor` drives nav text. Currently it's `#111` when scrolled (dark text for white bg). Change to white since the scrolled bg is now navy:

Find:
```typescript
  const linkColor = scrolled ? "#111" : "#fff";
```

Replace:
```typescript
  const linkColor = "#fff";
```

Find the `loginStyle` block and update border/color/background for navy:
```typescript
  const loginStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "9px 14px",
    textDecoration: "none",
    border: loginHovered
      ? "1px solid rgba(255,255,255,0.6)"
      : "1px solid rgba(255,255,255,0.25)",
    color: "#fff",
    background: loginHovered ? "rgba(255,255,255,0.08)" : "transparent",
    transition: "border-color 0.2s, background 0.2s",
  };
```

- [ ] **Step 6: Remove the Log in link (routes to /cms — not for public nav)**

Find and delete:
```tsx
<Link
  href="/cms"
  style={loginStyle}
  onMouseEnter={() => setLoginHovered(true)}
  onMouseLeave={() => setLoginHovered(false)}
>
  Log in
</Link>
```

Also remove the `loginHovered` state and `loginStyle` variable since they're no longer used.

- [ ] **Step 7: Verify build**

```bash
cd web && npm run build 2>&1 | tail -5
```

Expected: clean build, no TypeScript errors.

- [ ] **Step 8: Commit**

```bash
cd /Users/jerameyjames/repos/konative
git add web/src/components/Header.tsx
git commit -m "feat(header): brokerage nav, rust wordmark, navy bg, blue CTA"
```

---

## Task 3: HeroSection component

**Files:**
- Create: `web/src/app/(frontend)/_sections/HeroSection.tsx`

- [ ] **Step 1: Create the `_sections` directory and HeroSection file**

```bash
mkdir -p /Users/jerameyjames/repos/konative/web/src/app/\(frontend\)/_sections
```

Create `web/src/app/(frontend)/_sections/HeroSection.tsx`:

```typescript
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
  { id: '1', name: 'Project Northstar',   entity: 'CPPIB / Digital Bridge',  size: '$3.4B', status: 'ACTIVE',    geography: 'Ontario, Canada' },
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
  const tickerDeals = [...displayDeals, ...displayDeals] // duplicate for seamless loop

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
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(115deg, rgba(8,20,45,0.97) 0%, rgba(8,20,45,0.85) 45%, rgba(12,32,70,0.55) 75%, rgba(30,79,191,0.2) 100%)',
      }} />

      {/* Body */}
      <div style={{
        position: 'relative', zIndex: 2, flex: 1,
        display: 'flex', alignItems: 'center',
        maxWidth: 1320, margin: '0 auto', width: '100%',
        padding: '0 48px', gap: 80, paddingTop: 68,
      }}>

        {/* Left: headline + CTAs */}
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

        {/* Right: trust stat cards */}
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
          {/* NOW card */}
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

      {/* Deal ticker */}
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
```

- [ ] **Step 2: Add the ticker keyframe animation to globals.css**

In `web/src/app/(frontend)/globals.css`, add at the bottom of the file:

```css
/* ── Deal ticker animation ── */
@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd web && npx tsc --noEmit 2>&1 | head -20
```

Expected: no output (no errors).

- [ ] **Step 4: Commit**

```bash
cd /Users/jerameyjames/repos/konative
git add web/src/app/\(frontend\)/_sections/HeroSection.tsx web/src/app/\(frontend\)/globals.css
git commit -m "feat(hero): new hero section with deal ticker and trust stats"
```

---

## Task 4: WhoWeServe section

**Files:**
- Create: `web/src/app/(frontend)/_sections/WhoWeServe.tsx`

- [ ] **Step 1: Create the file**

Create `web/src/app/(frontend)/_sections/WhoWeServe.tsx`:

```typescript
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
    desc: 'You have a project in motion but missing pieces — capital, equipment supply chain, grid connection, staffing, or the right partners. We quarterback what\'s missing and compress your timeline from stalled to operational.',
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd web && npx tsc --noEmit 2>&1 | head -10
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
cd /Users/jerameyjames/repos/konative
git add web/src/app/\(frontend\)/_sections/WhoWeServe.tsx
git commit -m "feat(sections): WhoWeServe stakeholder cards"
```

---

## Task 5: Capabilities section

**Files:**
- Create: `web/src/app/(frontend)/_sections/Capabilities.tsx`

- [ ] **Step 1: Create the file**

Create `web/src/app/(frontend)/_sections/Capabilities.tsx`:

```typescript
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
    body: 'Power generation procurement, turbine sourcing, and grid interconnection strategy. We know what\'s available, what\'s on lead time, and what the ISO queue looks like in your region.',
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

        {/* Intro row */}
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

        {/* 3×2 grid */}
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd web && npx tsc --noEmit 2>&1 | head -10
```

- [ ] **Step 3: Commit**

```bash
cd /Users/jerameyjames/repos/konative
git add web/src/app/\(frontend\)/_sections/Capabilities.tsx
git commit -m "feat(sections): Capabilities six-pillar grid"
```

---

## Task 6: TeamSection component

**Files:**
- Create: `web/src/app/(frontend)/_sections/TeamSection.tsx`

- [ ] **Step 1: Create the file**

Create `web/src/app/(frontend)/_sections/TeamSection.tsx`:

```typescript
'use client'

const members = [
  {
    name: 'Jeramey James',
    role: 'Founder & Principal',
    bio: 'Former CIO turned Gartner advisor. Solutions architect and infrastructure operations background spanning ISP, tribal enterprise, and enterprise consulting. Brings the technical depth and boardroom credibility to get deals done.',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
    linkedin: 'https://www.linkedin.com/in/jerameyjames/',
  },
  {
    name: 'Scott Swartzbaugh',
    role: 'Partner — Supply Chain & Procurement',
    bio: '20+ years building high-performance supply chains and strategic supplier partnerships. The person who knows what\'s available, what\'s on lead time, and how to move equipment when everyone else is waiting.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    linkedin: 'https://www.linkedin.com/in/scott-swartzbaugh-ab156b1/',
  },
  {
    name: 'Jerry Borlin',
    role: 'Partner — Relationships & Deal Creation',
    bio: 'Enterprise deal closer with a career record of winning the most complex, highest-stakes engagements. Genuine, proactive, and the kind of partner who shows up before you ask. He builds the relationships that open the rooms.',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80',
    linkedin: 'https://www.linkedin.com/in/jerryborlin/',
  },
]

export default function TeamSection() {
  return (
    <section id="team" style={{ background: '#0C2046', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 48px' }}>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          fontFamily: 'Inter, sans-serif', fontWeight: 600,
          fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
          color: '#E07B39', marginBottom: 20,
        }}>
          <span style={{ display: 'block', width: 28, height: 1, background: '#E07B39' }} />
          The Team
        </div>

        <h2 style={{
          fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800,
          fontSize: 'clamp(44px, 5.5vw, 80px)', lineHeight: 0.9,
          textTransform: 'uppercase', letterSpacing: '0.01em',
          color: '#fff', marginBottom: 60,
        }}>
          TOP TALENT.<br /><span style={{ color: '#E07B39' }}>REAL EXPERIENCE.</span>
        </h2>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1, background: 'rgba(255,255,255,0.08)',
        }}>
          {members.map((member, i) => (
            <div key={i} style={{ background: '#0C2046', overflow: 'hidden' }}>
              {/* Photo */}
              <div style={{
                height: 260, position: 'relative',
                backgroundImage: `url('${member.photo}')`,
                backgroundSize: 'cover', backgroundPosition: 'center top',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 50%, rgba(12,32,70,0.92) 100%)',
                }} />
              </div>
              {/* Info */}
              <div style={{ padding: '28px 32px 36px' }}>
                <div style={{
                  fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700,
                  fontSize: 28, textTransform: 'uppercase', color: '#fff',
                  marginBottom: 4, lineHeight: 1,
                }}>
                  {member.name}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontWeight: 600,
                  fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: '#F0A050', marginBottom: 14,
                }}>
                  {member.role}
                </div>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13,
                  lineHeight: 1.7, color: 'rgba(255,255,255,0.45)',
                }}>
                  {member.bio}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block', marginTop: 16,
                    fontFamily: 'Inter, sans-serif', fontWeight: 600,
                    fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.3)', textDecoration: 'none',
                  }}
                >
                  LinkedIn →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Expansion placeholder */}
        <div style={{
          marginTop: 1,
          background: 'rgba(255,255,255,0.02)',
          border: '1px dashed rgba(255,255,255,0.08)',
          padding: '32px 40px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: 13,
            color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em',
          }}>
            More advisors and partners joining the team
          </span>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: 11,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'rgba(224,123,57,0.35)',
          }}>
            Expanding 2026
          </span>
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd web && npx tsc --noEmit 2>&1 | head -10
```

- [ ] **Step 3: Commit**

```bash
cd /Users/jerameyjames/repos/konative
git add web/src/app/\(frontend\)/_sections/TeamSection.tsx
git commit -m "feat(sections): team cards with LinkedIn links"
```

---

## Task 7: MarketIntel section (news cards + newsletter strip)

**Files:**
- Create: `web/src/app/(frontend)/_sections/MarketIntel.tsx`

- [ ] **Step 1: Create the file**

Create `web/src/app/(frontend)/_sections/MarketIntel.tsx`:

```typescript
'use client'

import { useState } from 'react'

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

interface MarketIntelProps {
  articles: Article[]
}

const CATEGORY_IMAGES: Record<string, string> = {
  'Power & Energy':    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
  'Investment':        'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  'Supply Chain':      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
  'Modular DC':        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  'Policy':            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  'Sovereign Capital': 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
}
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'

const PLACEHOLDER_ARTICLES: Article[] = [
  { id: '1', title: 'PJM Queue Hits Record 3,000+ GW — What It Means for Data Center Siting',            category: 'Power & Energy',    source: 'Utility Dive',            published_at: '2026-04-19' },
  { id: '2', title: 'Saudi Aramco Energy Ventures Commits $4.2B to North American Digital Infrastructure', category: 'Investment',         source: 'Bloomberg',               published_at: '2026-04-18' },
  { id: '3', title: 'Why Prefabricated Modular Is Now the Default Choice for Sub-100MW Builds',           category: 'Modular DC',         source: 'DataCenter Dynamics',     published_at: '2026-04-17' },
  { id: '4', title: 'Generator Lead Times Now 52 Weeks: The Hidden Constraint on New Deployments',        category: 'Supply Chain',       source: 'DCD Intelligence',        published_at: '2026-04-16' },
  { id: '5', title: 'FERC Order 2023-A: How New Interconnection Rules Are Reshaping Project Timelines',   category: 'Policy',             source: 'Greentech Media',         published_at: '2026-04-15' },
  { id: '6', title: 'CPPIB Targets 3.4 GW Across Four Modular DC Platforms Through 2028',                category: 'Sovereign Capital',  source: 'Infrastructure Investor', published_at: '2026-04-14' },
]

function getImage(article: Article): string {
  return article.image_url || CATEGORY_IMAGES[article.category] || DEFAULT_IMAGE
}

export default function MarketIntel({ articles }: MarketIntelProps) {
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const display = articles.length > 0 ? articles.slice(0, 6) : PLACEHOLDER_ARTICLES
  const [featured, ...rest] = display
  const sidebarItems = rest.slice(2) // items 3-6 go in sidebar

  const handleSubscribe = async () => {
    if (!email || submitting) return
    setSubmitting(true)
    try {
      await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage_market_intel' }),
      })
    } catch { /* silent */ }
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <section id="market-intel" style={{ background: '#08142D', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 48px' }}>

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
              color: '#E07B39', marginBottom: 20,
            }}>
              <span style={{ display: 'block', width: 28, height: 1, background: '#E07B39' }} />
              Market Intelligence
            </div>
            <h2 style={{
              fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800,
              fontSize: 'clamp(44px, 5.5vw, 80px)', lineHeight: 0.9,
              textTransform: 'uppercase', letterSpacing: '0.01em', color: '#fff',
            }}>
              WHAT&apos;S MOVING<br /><span style={{ color: '#E07B39' }}>THE MARKET.</span>
            </h2>
          </div>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.6,
            color: 'rgba(255,255,255,0.45)', maxWidth: 360,
          }}>
            We stay ahead of the market so your project decisions are grounded in what&apos;s actually happening — not last quarter&apos;s report.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 64 }}>

          {/* Left: featured + 2 cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {/* Featured article */}
            <a href={featured.url || '#'} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#0C2046', overflow: 'hidden' }}>
                <div style={{
                  height: 220, position: 'relative',
                  backgroundImage: `url('${getImage(featured)}')`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }}>
                  <span style={{
                    position: 'absolute', bottom: 12, left: 12,
                    background: '#C86428', color: '#fff',
                    fontFamily: 'Inter, sans-serif', fontWeight: 600,
                    fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
                    padding: '3px 8px',
                  }}>
                    {featured.category}
                  </span>
                </div>
                <div style={{ padding: '20px 24px 24px' }}>
                  <div style={{
                    fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700,
                    fontSize: 22, textTransform: 'uppercase', color: '#fff',
                    lineHeight: 1.15, marginBottom: 10,
                  }}>
                    {featured.title}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
                      {featured.source} · {featured.published_at}
                    </span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11, color: '#E07B39' }}>
                      Read →
                    </span>
                  </div>
                </div>
              </div>
            </a>

            {/* Two smaller cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(255,255,255,0.08)' }}>
              {rest.slice(0, 2).map((article) => (
                <a key={article.id} href={article.url || '#'} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#0C2046', overflow: 'hidden' }}>
                    <div style={{
                      height: 140, position: 'relative',
                      backgroundImage: `url('${getImage(article)}')`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                    }}>
                      <span style={{
                        position: 'absolute', bottom: 8, left: 8,
                        background: '#C86428', color: '#fff',
                        fontFamily: 'Inter, sans-serif', fontWeight: 600,
                        fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
                        padding: '2px 6px',
                      }}>
                        {article.category}
                      </span>
                    </div>
                    <div style={{ padding: '16px 18px 20px' }}>
                      <div style={{
                        fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700,
                        fontSize: 17, textTransform: 'uppercase', color: '#fff',
                        lineHeight: 1.15, marginBottom: 8,
                      }}>
                        {article.title}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
                          {article.source}
                        </span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 10, color: '#E07B39' }}>
                          Read →
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 10,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)', padding: '0 20px 12px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              Also in the feed
            </div>
            {sidebarItems.map((article) => (
              <a
                key={article.id}
                href={article.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none', display: 'block',
                  padding: '18px 20px',
                  borderLeft: '2px solid transparent',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontWeight: 600,
                  fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: '#F0A050', marginBottom: 6,
                }}>
                  {article.category}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13,
                  lineHeight: 1.45, color: 'rgba(255,255,255,0.65)', marginBottom: 6,
                }}>
                  {article.title}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
                  {article.source} · {article.published_at}
                </div>
              </a>
            ))}
            <div style={{ padding: '16px 20px', marginTop: 'auto' }}>
              <a href="/market-intel" style={{
                display: 'block', textAlign: 'center', padding: '14px',
                border: '1px solid rgba(224,123,57,0.3)',
                fontFamily: 'Inter, sans-serif', fontWeight: 600,
                fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#E07B39', textDecoration: 'none',
              }}>
                View All Intelligence →
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter strip */}
        <div style={{
          background: '#1E4FBF', marginTop: 64,
          padding: '40px 48px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 24,
        }}>
          <div>
            <h3 style={{
              fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800,
              fontSize: 32, textTransform: 'uppercase', color: '#fff', lineHeight: 1,
            }}>
              The Intelligence Brief
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>
              2×/week — curated market digest for energy infrastructure principals.
            </p>
          </div>
          {submitted ? (
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#fff' }}>
              Subscribed ✓
            </p>
          ) : (
            <div style={{ display: 'flex', gap: 0 }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                style={{
                  padding: '14px 18px', width: 260,
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.25)', borderRight: 'none',
                  color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 14, outline: 'none',
                }}
              />
              <button
                onClick={handleSubscribe}
                disabled={submitting}
                style={{
                  padding: '14px 24px', background: '#fff', color: '#1E4FBF',
                  fontFamily: 'Inter, sans-serif', fontWeight: 700,
                  fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                  border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                Subscribe Free
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd web && npx tsc --noEmit 2>&1 | head -10
```

- [ ] **Step 3: Commit**

```bash
cd /Users/jerameyjames/repos/konative
git add web/src/app/\(frontend\)/_sections/MarketIntel.tsx
git commit -m "feat(sections): MarketIntel news cards + sidebar + newsletter strip"
```

---

## Task 8: StartNowCTA section

**Files:**
- Create: `web/src/app/(frontend)/_sections/StartNowCTA.tsx`

- [ ] **Step 1: Create the file**

Create `web/src/app/(frontend)/_sections/StartNowCTA.tsx`:

```typescript
'use client'

import Link from 'next/link'

export default function StartNowCTA() {
  return (
    <section id="start-now" style={{
      background: '#0C2046', padding: '100px 0',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Faint background image */}
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd web && npx tsc --noEmit 2>&1 | head -10
```

- [ ] **Step 3: Commit**

```bash
cd /Users/jerameyjames/repos/konative
git add web/src/app/\(frontend\)/_sections/StartNowCTA.tsx
git commit -m "feat(sections): StartNowCTA hard close section"
```

---

## Task 9: Update Footer

**Files:**
- Modify: `web/src/components/Footer.tsx`

- [ ] **Step 1: Replace Footer.tsx entirely**

The current Footer is orange-branded with dark background. Replace with the navy + rust version. Read the current file first to preserve the existing export signature, then overwrite with:

```typescript
'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#08142D', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '64px 0 32px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 48px' }}>

        {/* 4-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <Link href="/" style={{
              display: 'inline-block', marginBottom: 16, textDecoration: 'none',
              fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800,
              fontSize: 22, letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>
              <span style={{ color: '#fff' }}>KO</span>
              <span style={{ color: '#E07B39' }}>NATIVE</span>
            </Link>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13,
              lineHeight: 1.7, color: 'rgba(255,255,255,0.35)', maxWidth: 260,
            }}>
              End-to-end energy infrastructure brokerage and development. Connecting investors, landholders, supply chain, and teams to close deals that move.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)', marginBottom: 16,
            }}>
              Services
            </h4>
            {['Capital Matchmaking', 'Site Acquisition', 'Supply Chain', 'Power Sourcing', 'BTM Strategy', 'Staffing'].map(s => (
              <Link key={s} href="/contact" style={{
                display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 13,
                color: 'rgba(255,255,255,0.45)', textDecoration: 'none', marginBottom: 8,
              }}>
                {s}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)', marginBottom: 16,
            }}>
              Company
            </h4>
            {[
              { label: 'Team', href: '/#team' },
              { label: 'Deals', href: '/deals' },
              { label: 'Market Intel', href: '/market-intel' },
              { label: 'Contact', href: '/contact' },
            ].map(l => (
              <Link key={l.label} href={l.href} style={{
                display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 13,
                color: 'rgba(255,255,255,0.45)', textDecoration: 'none', marginBottom: 8,
              }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Stakeholder entry */}
          <div>
            <h4 style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)', marginBottom: 16,
            }}>
              Start Here
            </h4>
            {[
              { label: "I'm an Investor", href: '/contact' },
              { label: 'I Have Land', href: '/contact' },
              { label: 'I Have a Project', href: '/contact' },
              { label: 'Newsletter', href: '/#market-intel' },
            ].map(l => (
              <Link key={l.label} href={l.href} style={{
                display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 13,
                color: 'rgba(255,255,255,0.45)', textDecoration: 'none', marginBottom: 8,
              }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 24,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'Inter, sans-serif', fontSize: 11,
          color: 'rgba(255,255,255,0.2)',
        }}>
          <span>© 2026 Konative · Tolowa Pacific LLC</span>
          <span>Energy Infrastructure Brokerage &amp; Development</span>
        </div>

      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
cd web && npm run build 2>&1 | tail -8
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
cd /Users/jerameyjames/repos/konative
git add web/src/components/Footer.tsx
git commit -m "feat(footer): navy redesign with stakeholder entry links and rust wordmark"
```

---

## Task 10: Compose LegacyHomePage

**Files:**
- Modify: `web/src/app/(frontend)/LegacyHomePage.tsx`

- [ ] **Step 1: Replace LegacyHomePage.tsx with the thin composition layer**

This replaces all 928 lines. The new file fetches data and passes it to the section components:

```typescript
'use client'

import { useEffect, useState } from 'react'
import HeroSection from './_sections/HeroSection'
import WhoWeServe from './_sections/WhoWeServe'
import Capabilities from './_sections/Capabilities'
import TeamSection from './_sections/TeamSection'
import MarketIntel from './_sections/MarketIntel'
import StartNowCTA from './_sections/StartNowCTA'

interface ApiDeal {
  id: string
  entity_name: string | null
  deal_type: string | null
  deal_value_usd: number | null
  status: string | null
  partner_companies: string[] | null
  us_locations: string[] | null
  summary: string | null
  category: string | null
}

// Same shape as the Deal interface in HeroSection — must stay in sync
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

interface HealthStats {
  articleCount: number
  feedCount: number
  dealCount: number
}

function formatUsd(v: number | null): string {
  if (!v) return '—'
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(1)}B`
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(0)}M`
  return `$${v.toLocaleString()}`
}

function mapDeal(d: ApiDeal): UiDeal {
  const statusRaw = (d.status || 'ACTIVE').toUpperCase()
  const status: UiDeal['status'] =
    statusRaw === 'ANNOUNCED' ? 'ANNOUNCED'
    : statusRaw === 'CLOSED' ? 'CLOSED'
    : 'ACTIVE'

  return {
    id: d.id,
    name: d.entity_name || 'Unnamed deal',
    entity: d.partner_companies?.join(' / ') || d.entity_name || '—',
    type: (d.deal_type || d.category || 'Development').replace(/_/g, ' '),
    size: formatUsd(d.deal_value_usd),
    status,
    geography: d.us_locations?.join(', ') || 'North America',
  }
}

export default function LegacyHomePage() {
  const [deals,    setDeals]    = useState<UiDeal[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [stats,    setStats]    = useState<HealthStats>({ articleCount: 61, feedCount: 16, dealCount: 5 })

  useEffect(() => {
    fetch('/api/v1/deals')
      .then(r => r.json())
      .then(d => {
        const rows: ApiDeal[] = d.deals || d.data || d || []
        setDeals(rows.map(mapDeal))
      })
      .catch(() => {})

    fetch('/api/v1/content?limit=6')
      .then(r => r.json())
      .then(d => setArticles(d.articles || d.data || []))
      .catch(() => {})

    fetch('/api/v1/health')
      .then(r => r.json())
      .then(d => setStats(d))
      .catch(() => {})
  }, [])

  return (
    <>
      <HeroSection deals={deals} stats={stats} />
      <WhoWeServe />
      <Capabilities />
      <TeamSection />
      <MarketIntel articles={articles} />
      <StartNowCTA />
    </>
  )
}
```

- [ ] **Step 2: Full build verification**

```bash
cd web && npm run build 2>&1 | tail -12
```

Expected: clean build, all routes resolved. Fix any TypeScript errors before continuing.

- [ ] **Step 3: Visual verification**

```bash
cd web && npm run dev
```

Open http://localhost:3005 and verify:
- Hero renders with photography, rust headline accent, deal ticker scrolling
- "Who We Serve" section with three stakeholder cards
- "What We Do" six-pillar grid with `#capabilities` anchor
- Team section with three cards and LinkedIn links
- Market Intel with news cards and newsletter strip
- CTA section with blue button
- Footer in navy with rust wordmark

- [ ] **Step 4: Commit**

```bash
cd /Users/jerameyjames/repos/konative
git add web/src/app/\(frontend\)/LegacyHomePage.tsx
git commit -m "feat(homepage): compose brokerage-first homepage from new section components"
```

---

## Task 11: Update page metadata and open PR

**Files:**
- Modify: `web/src/app/(frontend)/layout.tsx`

- [ ] **Step 1: Update the metadata title and description**

In `web/src/app/(frontend)/layout.tsx`, find the `metadata` export and replace with:

```typescript
export const metadata = {
  title: "Konative | Energy Infrastructure Brokerage & Development",
  description:
    "End-to-end energy infrastructure deal facilitation — connecting investors, landholders, supply chain, power sourcing, and the right teams. Bring us your project. We take it from here.",
};
```

- [ ] **Step 2: Final build**

```bash
cd web && npm run build 2>&1 | tail -8
```

Expected: clean.

- [ ] **Step 3: Commit and push**

```bash
cd /Users/jerameyjames/repos/konative
git add web/src/app/\(frontend\)/layout.tsx
git commit -m "feat(meta): update page title and description for brokerage positioning"
git push origin main
```

- [ ] **Step 4: Verify Vercel deployment**

```bash
cd web && vercel ls --prod 2>&1 | head -6
```

Wait for status `● Ready`, then:

```bash
curl -sL https://konative.com/ | grep -i "bring us\|brokerage" | head -3
```

Expected: HTML containing the new headline or meta description, confirming the new build is live.

---

## Follow-on Tasks (out of scope for this plan)

- **CRM intake form** — replace `/contact` email form with a structured project intake that feeds a CRM
- **Real team photography** — swap Unsplash placeholder headshots via Sanity CMS
- **Supabase deal seeding** — populate the `deals` table so the ticker shows real data
- **Newsletter CRM automation** — wire `/api/newsletter/subscribe` into a CRM sequence
- **Individual service pages** — `/services/capital`, `/services/land`, etc. for SEO
