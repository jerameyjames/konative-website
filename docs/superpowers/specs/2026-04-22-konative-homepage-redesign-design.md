# Konative Homepage Redesign — Design Spec
**Date:** 2026-04-22  
**Status:** Approved  
**Scope:** Full homepage (`LegacyHomePage.tsx`) + Header nav + global color tokens

---

## Problem

The current site leads with "Intelligence Platform" — positioning Konative as a media/data product. The business is a **brokerage and deal facilitator**. Potential clients land on a page that looks like a SaaS dashboard, not a firm that closes energy infrastructure deals. The site needs to convince investors, landholders, and developers that Konative is real, has top talent, and can start on their project now.

---

## Design Decisions

### Narrative structure: Option C — Outcomes First
"Bring us your project. We take it from here."

Every section is written from the client's perspective. They arrive, self-identify (investor / landholder / developer), see exactly what Konative does for them, meet the team, see deal flow, and hit a hard CTA.

### Service presentation: Stakeholder entry + full capability grid
- Three stakeholder cards (investor / landholder / developer) — each with a role-specific CTA
- Full six-pillar capability grid beneath — proves end-to-end ownership regardless of client entry point

### Color system: Navy + Rust/Amber
- **Foundation:** Deep navy (`#08142D`, `#0C2046`)
- **Primary accent:** Rust/amber (`#E07B39`) — used on eyebrows, section labels, h2 accents, hover states, team roles, news categories, logo wordmark accent
- **Amber warm:** `#F0A050` — team role titles, sidebar category labels
- **Rust deep:** `#C86428` — news category badge backgrounds
- **Action blue:** `#1E4FBF` / `#5B8DEF` — CTA buttons, nav CTA, newsletter section — kept deliberate contrast so actions read clearly against warm accents
- Rationale: navy reads institutional/serious money (Jacobs Engineering energy); rust/amber provides the vibrant contrast the all-blue palette lacked; combination evokes dusk infrastructure photography naturally

### Hero image
Datacenter building exterior at blue hour — modern steel panel facade with warm amber LED accent strips along the base. Exemplar: the Boston Globe datacenter render. Permanent asset: Unsplash `photo-1558618666-fcd25c85cd64` or CMS-managed image.

### Dynamic content (MVP scope)
- **Animated deal ticker** — scrolling marquee at the hero base. Pulls from `/api/v1/deals`. Green/amber status dots. No build dependencies beyond existing data.
- **News feed with imagery** — existing `/api/v1/content` feed displayed as image cards (featured 2-up + sidebar list). Images sourced from article `image_url` field with Unsplash fallbacks by category.
- **Count-up stats** — existing IntersectionObserver animation retained.
- No video hero, no project map, no parallax — deferred to post-MVP.

### CTA action
Email/contact form at `/contact` for now. Future: CRM intake flow. Flag as follow-on task in implementation.

---

## Page Sections (in order)

### 1. Header
- **Logo:** KO (white) + NATIVE (rust `#E07B39`)
- **Nav links:** Services (`#capabilities`) · Team (`#team`) · Deals (`/deals`) · Market Intel (`/market-intel`) — Services and Team are in-page hash anchors since no separate route exists yet
- **Nav CTA:** "Start Your Project" → `/contact` (institutional blue pill)
- Transparent over hero, solid navy on scroll (existing behavior retained)

### 2. Hero
- Full-bleed datacenter exterior photography (blue hour, amber accent lighting)
- Gradient overlay: `rgba(8,20,45,0.97)` → `rgba(12,32,70,0.55)` → `rgba(30,79,191,0.2)`
- **Eyebrow:** "Energy Infrastructure Brokerage & Development" (rust, with leading rule)
- **H1:** BRING US / YOUR PROJECT. / WE TAKE IT / FROM HERE.
  - "PROJECT." in rust
  - "WE TAKE IT" dimmed (`rgba(255,255,255,0.22)`)
- **Subhead:** "Konative assembles end-to-end energy infrastructure deals — connecting investors, landholders, supply chain, power sourcing, and the right teams to move your project from concept to commissioned."
- **CTAs:** "START YOUR PROJECT NOW" → `/contact` (blue primary) + "SEE HOW WE WORK" → `#capabilities` (ghost, in-page anchor)
- **Trust stats sidebar** (right column): $7.6B+ Deal Flow / 6 Capabilities / 24h Response / NOW (rust card)
- **Deal ticker** at hero base: scrolling marquee of active deals with status dots. Falls back to the 5 placeholder deals in `PLACEHOLDER_DEALS` if the Supabase table is empty (expected for MVP).

### 3. Who We Serve
- Background: `#0C2046`
- Three cards: Investors & Capital Partners / Landholders & Land Owners / Developers & Builders
- Each card: large dim number, title, 2-sentence description, role-specific CTA link (rust underline)
- Hover: rust top border + subtle rust background tint

### 4. What We Do — Six Capabilities
- Background: `#08142D`
- Intro: h2 "END-TO-END. NO GAPS." + paragraph right column
- 3×2 grid:
  1. Capital — Investor Matchmaking & Deal Structure
  2. Land — Site Acquisition & Feasibility
  3. Supply Chain — Buildings & Modular Sourcing
  4. Power — Turbine & Generation Sourcing
  5. Energy Strategy — Behind-the-Meter Design
  6. People — Staffing & Ops Readiness
- Hover: rust left border + subtle rust tint

### 5. Team
- Background: `#0C2046`
- 3-up card grid with photography (portrait top, info bottom)
- **Jeramey James** — Founder & Principal. Former CIO, Gartner advisor. Solutions architect and infrastructure operations. ISP and tribal enterprise background.
- **Scott Swartzbaugh** — Partner, Supply Chain & Procurement. 20+ years strategic supplier partnerships.
- **Jerry Borlin** — Partner, Relationships & Deal Creation. Enterprise deal closer, complex high-stakes engagements.
- Slot row below: "More advisors and partners — Expanding 2026" (dashed border placeholder)
- Team photos: placeholder Unsplash professional headshots for MVP; CMS-swappable

### 6. Market Intelligence (MVP)
- Background: `#08142D`
- Section intro: "We stay ahead of the market so your project decisions are grounded in what's actually happening."
- **Left:** 2-column news card grid — 1 featured (full width, tall image) + 2 below. Images from `image_url` or category-matched Unsplash fallback. Category badge (rust deep). "Read →" link (rust).
- **Right sidebar:** 4 sidebar items (title, category, date) + "View All Intelligence →" button
- Data: `/api/v1/content?limit=6`
- **Newsletter strip** below grid: inline within section. Blue background (`#1E4FBF`). Email input + subscribe button.

### 7. CTA — Start Now
- Dark navy with faint photography overlay (8% opacity)
- H2: "YOUR PROJECT STARTS TODAY." ("TODAY." in rust)
- Copy: "Tell us where you are — investor, landholder, developer — and we respond within 24 hours."
- CTA button: "START YOUR PROJECT NOW" → `/contact`
- Sub-note: "24-hour response guarantee · No obligation · Direct to the team"

### 8. Footer
- 4-column: Brand description / Services links / Company links / Stakeholder entry links
- Stakeholder column: "I'm an Investor" / "I Have Land" / "I Have a Project" / "Newsletter"
- Wordmark rust accent retained
- `© 2026 Konative · Tolowa Pacific LLC`

---

## Files to Change

| File | Change |
|---|---|
| `web/src/app/(frontend)/LegacyHomePage.tsx` | Full rewrite of all section components and page composition |
| `web/src/components/Header.tsx` | Nav links reordered (Services/Team/Deals/Market Intel), logo NATIVE color → rust, CTA text → "Start Your Project" |
| `web/src/app/globals.css` | Add CSS custom properties for new color tokens (navy, rust, amber scales) — styles currently live inline in component files; tokens go in globals for consistency |

---

## Data Dependencies (no new APIs needed)

| Data | Source | Usage |
|---|---|---|
| Deal ticker | `/api/v1/deals` | Hero ticker marquee |
| News cards | `/api/v1/content?limit=6` | Market Intel section |
| Health stats | `/api/v1/health` | Count-up stats (retained) |

---

## Out of Scope (follow-on)

- CRM integration / project intake form (replace `/contact` email form)
- Video hero background
- Interactive project map
- Parallax scroll effects
- Individual service pages (`/services/*`)
- Real team photography (CMS swap)
- Real deal data (Supabase seeding — separate task)
- Newsletter CRM automation
