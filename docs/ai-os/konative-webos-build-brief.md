# Konative.com — Day-One Build Brief & WebOS Framework

## Document Purpose

This document is the executable launch brief for **konative.com**, the first site built on Tolowa Studio's WebOS platform. It serves three roles:

1. **Immediate build spec** — everything needed to design, build, and deploy konative.com this week
2. **WebOS Site 0 reference** — the canonical implementation that defines the reusable block library, CMS schema, and editing workflow for all future studio sites
3. **Notion integration blueprint** — how this system connects to the existing AI OS methodology and extends it with a repeatable website production capability

---

## Part 1: Konative.com — Site Brief

### 1.1 Domain & Business Context

- **Domain:** konative.com
- **Business:** Konative — the woman-owned rep business focused on sales and marketing for the outdoor living, countertops, and fabrication industry (Great Floors, Cosentino, etc.)
- **Founders:** Katrina (CEO/face of the brand) + Jeramey (operations/strategy)
- **Geographic focus:** Pacific Northwest, with national scalability
- **Business model:** B2B sales representation and marketing services for manufacturers and distributors in outdoor living, surfaces, and fabrication

### 1.2 Site Purpose & Success Metric

- **Primary goal:** Establish credibility and generate inbound partnership inquiries from manufacturers
- **Success metric:** A manufacturer visits konative.com and submits a partnership inquiry within 60 seconds of understanding "who they are and what they do"
- **Secondary goal:** Recruit talent (sub-reps, territory managers) as the business scales

### 1.3 Design Direction — Kimley-Horn Concept Application

Kimley-Horn (kimley-horn.com) is a $6B+ engineering consultancy that presents as:

- **Confident and established** — warm, clean, human-centered design with large hero typography
- **Service-oriented structure** — services, projects/experience, team, about, careers, contact
- **People-first messaging** — "We don't just design solutions, we redefine possibilities"
- **Visual rhythm** — rotating hero text ("Possibility / Creativity / Collaboration / Flexibility"), followed by 3-card service/experience/team grid, then culture/awards, then testimonials
- **Warm neutral palette** — clean whites, warm grays, with confident accent color
- **Professional photography** — real people, real projects, real environments
- **Fortune 100 credibility signals** — awards, media mentions, stats (10,000 employees, 150 offices)

**Translation to Konative:**

| Kimley-Horn Element | Konative Adaptation |
|---|---|
| "Expect More + Possibility/Creativity/Collaboration" rotating hero | "Expect More" hero with rotating words: "Results / Reach / Revenue / Representation" |
| 3-card grid (Experience / Services / Team) | 3-card grid (Our Brands / Our Services / Our Approach) |
| Fortune 100 awards section | Industry credibility: brands represented, territories covered, years of combined experience |
| People-first culture section | Woman-owned spotlight, founder story, team-first positioning |
| Engineering project case studies | Brand partnership case studies / success stories |
| Testimonial from named client | Manufacturer testimonials with name, title, company |
| "Nearly 10,000 employees" stat bar | "X brands represented / X territories / X years combined experience" stat bar |
| Clean service category pages | Service pages: Sales Representation, Marketing Strategy, Trade Show Management, Territory Development |
| Careers / team section | "Join Our Team" — recruit sub-reps and territory managers |

### 1.4 Tone & Art Direction

```
Art direction: Premium B2B professional services → confident, warm, human
Palette: Warm neutrals (Kimley-Horn style), accent: deep teal or warm copper/terracotta
Typography: Display — confident serif or strong geometric sans. Body — clean, readable sans.
Density: Spacious — generous whitespace, premium feel
Imagery: Real photography of outdoor living installations, countertop materials, fabrication environments
Motion: Subtle, professional — fade-in sections, smooth scroll, no flashy effects
```

### 1.5 Page Map

**Phase 1 (Launch — this week):**

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | Hero + services overview + credibility + CTA |
| About | `/about` | Founder story, woman-owned, mission, values |
| Services | `/services` | Overview of all service categories |
| Contact | `/contact` | Partnership inquiry form + general contact |

**Phase 2 (Week 2-3):**

| Page | Route | Purpose |
|---|---|---|
| Individual Service Pages | `/services/[slug]` | Deep dive per service category |
| Brands / Portfolio | `/brands` | Logos and descriptions of represented brands |
| Team | `/team` | Team bios as business grows |
| Careers | `/careers` | Recruit sub-reps and territory managers |
| Blog / Insights | `/insights` | Industry content for SEO and authority |

### 1.6 Content Model (Payload CMS Schema)

**Collections:**

| Collection | Fields | Purpose |
|---|---|---|
| Pages | title, slug, meta (title, description, image), layout (blocks array) | All site pages composed from blocks |
| Services | title, slug, icon, summary, description (rich text), image, cta | Service category entries |
| Brands | name, logo, url, description, category (outdoor/surfaces/fabrication), featured | Brand portfolio |
| Team Members | name, title, photo, bio, linkedin, order | Team directory |
| Testimonials | quote, author, title, company, logo, featured | Social proof |
| Case Studies | title, slug, brand (relation), challenge, solution, results, images | Success stories |
| Blog Posts | title, slug, author (relation), publishedAt, content (rich text), categories, meta | Industry content |
| Form Submissions | name, email, company, phone, message, type (partnership/general/career), createdAt | Lead capture |

**Globals:**

| Global | Fields | Purpose |
|---|---|---|
| Site Settings | siteName, logo, favicon, socialLinks, contactEmail, phone, address | Site-wide config |
| Navigation | header (links array), footer (links array, columns) | Nav structure |
| Theme | primaryColor, accentColor, fontDisplay, fontBody | Per-site theming (WebOS-ready) |
| SEO Defaults | defaultTitle, defaultDescription, defaultImage, gtmId | SEO baseline |

### 1.7 Block Library (Site 0 — Reusable Across All Future Sites)

These 14 blocks form the initial WebOS block library. Every block is a self-contained React component registered in Payload's layout builder.

| # | Block Name | Description | Kimley-Horn Equivalent |
|---|---|---|---|
| 1 | `HeroRotating` | Full-width hero with rotating accent words, subtitle, CTA | "Expect More + Possibility/Creativity" |
| 2 | `ThreeCardGrid` | 3 equal cards with icon/image, title, description, link | Experience/Services/Team grid |
| 3 | `StatBar` | Horizontal strip with 3-4 key statistics + labels | "Nearly 10,000 employees…" |
| 4 | `SplitImageText` | 50/50 image + text with CTA, reversible | About Us / Culture section |
| 5 | `ServicesList` | Grid/list of service cards pulled from Services collection | Services overview |
| 6 | `TestimonialCarousel` | Sliding testimonials with quote, name, company | Client testimonials |
| 7 | `BrandLogoStrip` | Scrolling or grid of brand/partner logos | "Our Brands" credibility |
| 8 | `CTABand` | Full-width colored band with headline + CTA button | "Inspired work begins…" |
| 9 | `RichContent` | Flexible rich text block with optional media | General content sections |
| 10 | `TeamGrid` | Grid of team member cards from Team collection | "Meet Our Teammates" |
| 11 | `ContactForm` | Structured form with field config, submits to Payload | Partnership inquiry |
| 12 | `MediaFeature` | Full-bleed or contained image/video with caption | Award/media spotlight |
| 13 | `FAQAccordion` | Expandable Q&A pairs | Common questions |
| 14 | `FooterCTA` | Pre-footer conversion section with headline + dual CTAs | Final conversion moment |

### 1.8 Home Page Block Composition

The home page is assembled from blocks in this order:

```
1. HeroRotating — "Expect More [Results / Reach / Revenue / Representation]"
   Subtitle: "Premium sales representation for the outdoor living and surfaces industry."
   CTA: "Partner With Us"

2. StatBar — "12+ Brands Represented | 6 Territories | 40+ Years Combined Experience"

3. ThreeCardGrid — Our Brands / Our Services / Our Approach
   Each card: image, 2-line description, "Learn More →"

4. SplitImageText — About Konative
   "Woman-owned. Pacific Northwest roots. National ambition."
   Photo of Katrina / outdoor living environment
   CTA: "Our Story →"

5. BrandLogoStrip — Logos of represented brands

6. ServicesList — 4 service categories with icons and summaries

7. TestimonialCarousel — 2-3 manufacturer testimonials

8. MediaFeature — Featured project or award spotlight

9. CTABand — "Ready to grow your brand in the Pacific Northwest?"
   CTA: "Start the Conversation"

10. FooterCTA — Contact info + secondary CTA
```

---

## Part 2: WebOS Technical Implementation

### 2.1 Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | Next.js 15 (App Router) | Server components, streaming, ISR, Payload-native |
| CMS | Payload CMS 3.x | MIT license, Next.js-native, block-based layout builder, live preview |
| Database | PostgreSQL (Neon for speed, Cloud SQL for GCP consistency) | Typed schemas, relational content, tenant isolation |
| Hosting | Vercel (Site 0) → GCP/GKE (multi-tenant platform later) | One-click deploy now, migrate to owned infra at scale |
| Media | Vercel Blob (Site 0) → Cloudflare R2 (multi-tenant) | S3-compatible, cost-effective at scale |
| Styling | Tailwind CSS v4 | Utility-first, design token integration, fast iteration |
| Fonts | Fontshare or Google Fonts | Per-site theming via CSS variables |
| Analytics | Plausible or PostHog | Privacy-first, self-hostable |
| Forms | Payload Form Builder plugin | Native form handling, no third-party dependency |
| Email | Resend | Transactional email for form submissions |

### 2.2 Repository Structure

```
konative/
├── payload.config.ts          # Payload configuration
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (frontend)/        # Public-facing routes
│   │   │   ├── layout.tsx     # Site layout with nav/footer
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── [slug]/        # Dynamic pages from Payload
│   │   │   ├── services/      # Services listing + [slug]
│   │   │   ├── about/         # About page
│   │   │   └── contact/       # Contact page
│   │   └── (payload)/         # Payload admin panel
│   │       └── admin/
│   ├── blocks/                # Reusable block components
│   │   ├── HeroRotating/
│   │   │   ├── config.ts      # Payload block field definition
│   │   │   └── Component.tsx  # React render component
│   │   ├── ThreeCardGrid/
│   │   ├── StatBar/
│   │   ├── SplitImageText/
│   │   ├── ServicesList/
│   │   ├── TestimonialCarousel/
│   │   ├── BrandLogoStrip/
│   │   ├── CTABand/
│   │   ├── RichContent/
│   │   ├── TeamGrid/
│   │   ├── ContactForm/
│   │   ├── MediaFeature/
│   │   ├── FAQAccordion/
│   │   └── FooterCTA/
│   ├── collections/           # Payload collection configs
│   │   ├── Pages.ts
│   │   ├── Services.ts
│   │   ├── Brands.ts
│   │   ├── TeamMembers.ts
│   │   ├── Testimonials.ts
│   │   ├── CaseStudies.ts
│   │   ├── BlogPosts.ts
│   │   └── FormSubmissions.ts
│   ├── globals/               # Payload global configs
│   │   ├── SiteSettings.ts
│   │   ├── Navigation.ts
│   │   ├── Theme.ts
│   │   └── SEODefaults.ts
│   ├── components/            # Shared UI components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Button/
│   │   ├── Container/
│   │   └── RenderBlocks.tsx   # Block renderer utility
│   └── lib/                   # Utilities
│       ├── payload.ts         # Payload client helpers
│       └── utils.ts
├── public/                    # Static assets
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env
```

### 2.3 Deployment Sequence (Today)

**Hour 1: Scaffold**
```bash
# Clone official Payload website template
npx create-payload-app@latest konative -t website

# Or use Vercel one-click deploy
# https://vercel.com/templates/next.js/payload-website-starter
```

**Hour 2: Configure CMS schema**
- Define collections: Pages, Services, Brands, Testimonials, Team, FormSubmissions
- Define globals: SiteSettings, Navigation, Theme, SEODefaults
- Register all 14 block types in Pages collection layout field

**Hour 3-4: Build block components**
- Start with HeroRotating, ThreeCardGrid, StatBar, SplitImageText, CTABand
- These 5 blocks are enough for a compelling home page
- Use Cursor + Claude to accelerate component authoring

**Hour 5: Content entry**
- Enter real Konative content: hero copy, service descriptions, brand list, stat numbers
- Upload Katrina's photo, brand logos, outdoor living imagery
- Configure navigation and footer

**Hour 6: Deploy**
- Push to GitHub → auto-deploy to Vercel
- Point konative.com DNS to Vercel
- Verify live preview works in Payload admin
- Test contact form submission flow

### 2.4 Live Preview Configuration

Payload live preview enables real-time visual editing inside the admin panel — the critical feature that eliminates "how do I update this?" friction.

```typescript
// payload.config.ts (simplified)
import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export default buildConfig({
  admin: {
    livePreview: {
      url: ({ data, collectionConfig }) =>
        `${process.env.NEXT_PUBLIC_SITE_URL}${data?.slug === 'home' ? '/' : `/${data?.slug}`}`,
      collections: ['pages', 'services', 'case-studies'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  // ... collections, globals, blocks
})
```

---

## Part 3: Notion AI OS Integration

### 3.1 Where This Fits in the AI OS

The WebOS is not a replacement for the AI OS — it is a **production capability** that the AI OS orchestrates. Think of it as a new "department" in the business operating system.

```
AI OS (Notion)
├── Strategy Layer (Garry Tan Office Hours, Addy's 7 Steps)
│   └── "Should we build this site? For whom? What's the business case?"
│
├── Planning Layer (Liam Ottley Business OS)
│   └── "What's the project scope, timeline, deliverables, revenue model?"
│
├── Execution Layer (WebOS — NEW)
│   └── "Build the site: scaffold → blocks → content → deploy → edit"
│
└── Operations Layer (n8n, automation, monitoring)
    └── "Keep it running: uptime, analytics, content updates, form routing"
```

### 3.2 Notion Hub Structure — WebOS Command Center

Create this structure inside your existing Notion workspace:

```
📁 AI OS
├── 📁 WebOS — Studio Website Production System
│   ├── 📄 WebOS Overview
│   │   └── System architecture, tech stack, deployment modes
│   │
│   ├── 📊 Site Registry (Database)
│   │   └── All sites: domain, status, mode (managed/handoff), tenant ID,
│   │       deploy URL, admin URL, launch date, monthly revenue
│   │
│   ├── 📊 Block Library (Database)
│   │   └── All blocks: name, description, status (stable/beta/planned),
│   │       screenshot, config file path, usage count across sites
│   │
│   ├── 📊 Content Schema Registry (Database)
│   │   └── All collections/globals: name, fields summary, which sites use it
│   │
│   ├── 📄 New Site Launch Checklist
│   │   └── Step-by-step from "client says yes" to "site is live"
│   │
│   ├── 📄 Design Extraction Workflow
│   │   └── How to analyze a reference URL and translate to blocks + tokens
│   │
│   ├── 📄 Editor Guide Template
│   │   └── Standard handoff doc for anyone editing a WebOS site
│   │
│   ├── 📄 Handoff Playbook
│   │   └── Export/import process for ejecting a tenant to standalone
│   │
│   └── 📄 Deployment Runbook
│       └── Vercel deploy, GCP deploy, DNS, SSL, monitoring setup
│
├── 📁 Projects
│   ├── 📄 Konative.com (Site 0)
│   │   └── Brief, page map, content tracker, design tokens, launch status
│   ├── 📄 TolowaPacific.com
│   ├── 📄 SpokaneWire.com
│   └── 📄 [Future Sites]
```

### 3.3 Site Registry Database Schema

| Property | Type | Purpose |
|---|---|---|
| Domain | Title | Primary identifier |
| Status | Select: Planning / Building / Live / Paused / Archived | Current state |
| Deployment Mode | Select: Managed / Handoff / Internal | Business relationship |
| Tenant ID | Text | Multi-tenant identifier (future) |
| Admin URL | URL | Payload admin panel link |
| Live URL | URL | Public site URL |
| Hosting | Select: Vercel / GCP / Client-hosted | Where it runs |
| Monthly Revenue | Number | Recurring revenue from managed sites |
| Launch Date | Date | Go-live date |
| GitHub Repo | URL | Source code |
| Reference URL | URL | Design inspiration source |
| Block Count | Number | How many blocks the site uses |
| Owner | Person | Who manages this site |
| Notes | Rich text | Context, decisions, issues |

### 3.4 Block Library Database Schema

| Property | Type | Purpose |
|---|---|---|
| Block Name | Title | Component name (e.g., HeroRotating) |
| Status | Select: Stable / Beta / Planned / Deprecated | Maturity |
| Category | Select: Hero / Content / Social Proof / CTA / Navigation / Form / Media | Grouping |
| Description | Rich text | What it does, when to use it |
| Config Path | Text | File path in repo (e.g., src/blocks/HeroRotating/config.ts) |
| Screenshot | Files | Visual reference of the rendered block |
| Sites Using | Relation → Site Registry | Which sites include this block |
| Fields | Rich text | Summary of configurable fields |
| Created | Date | When it was first built |
| Last Updated | Date | Last modification |

### 3.5 New Site Launch Checklist (Template)

This checklist is triggered by the AI OS when a new website project is approved:

**Phase 0: Strategy (AI OS Skills)**
- [ ] Run Garry Tan Office Hours on the business concept
- [ ] Run Addy's 7 Steps on the market and positioning
- [ ] Define: who is this site for, what action should they take, what makes this business different?
- [ ] Identify reference URL(s) for design direction

**Phase 1: Design Extraction**
- [ ] Fetch reference URL(s) — extract typography, color, spacing, section patterns
- [ ] Map reference sections to existing WebOS blocks
- [ ] Identify 0-3 new blocks needed (if any)
- [ ] Define color tokens and font pairing for this site
- [ ] Create design-test.html to validate the design system

**Phase 2: CMS Setup**
- [ ] Create new site entry in Site Registry (Notion)
- [ ] Scaffold Payload project from Studio Starter template
- [ ] Configure site-specific globals: SiteSettings, Theme, Navigation
- [ ] Verify all needed collections exist (or add site-specific ones)
- [ ] Enable live preview for all page types

**Phase 3: Build**
- [ ] Compose home page from blocks in Payload admin
- [ ] Build any new block types needed
- [ ] Create all Phase 1 pages (typically: Home, About, Services, Contact)
- [ ] Enter real content — no placeholder text
- [ ] Generate or source real imagery — no stock placeholders
- [ ] Test at 375px mobile and 1440px desktop
- [ ] Test dark mode (if applicable)
- [ ] Verify contact form submits and routes correctly

**Phase 4: Deploy**
- [ ] Push to GitHub
- [ ] Deploy to Vercel (or GCP)
- [ ] Point DNS for domain
- [ ] Verify SSL
- [ ] Test live URL end-to-end
- [ ] Set up analytics (Plausible/PostHog)
- [ ] Set up uptime monitoring

**Phase 5: Handoff**
- [ ] Write site-specific editing notes in Editor Guide
- [ ] Train site operator on Payload admin (record Loom)
- [ ] Add to automated backup schedule
- [ ] Update Site Registry with live status and URLs

### 3.6 Design Extraction Workflow

When you find a URL you want to replicate for a new client site:

**Step 1: Capture** (10 min)
- Open the reference URL
- Screenshot: hero, navigation, 3-4 key sections, footer
- Note: font families, heading sizes, body size, color palette, spacing rhythm, section heights

**Step 2: Decompose** (15 min)
- Map each section to an existing WebOS block
- Note which blocks need new variants or new blocks entirely
- Identify the content schema behind the site: what collections would model this content?

**Step 3: Token Translation** (10 min)
- Extract exact font names and sizes → map to `--font-display`, `--font-body`, type scale
- Extract colors → define `--color-primary`, `--color-bg`, `--color-surface`, accent
- Extract spacing rhythm → confirm 4px system alignment
- Document in a "Design Tokens" section on the project's Notion page

**Step 4: Block Assembly** (varies)
- In Payload admin, compose pages using existing blocks with the new tokens
- Build 0-3 new blocks if the reference site has a pattern not yet in the library
- Update Block Library database in Notion with any new blocks

**Step 5: Content + Polish** (varies)
- Enter real client content into each block
- Generate or source real imagery matching the art direction
- Fine-tune spacing, alignment, and responsive behavior

---

## Part 4: Execution Timeline — Konative.com

### Day 1 (Today — April 15, 2026)

| Time Block | Task | Deliverable |
|---|---|---|
| Morning (1 hr) | Scaffold Payload project from website template | Working local dev environment |
| Morning (1 hr) | Define CMS schema: collections + globals + blocks | payload.config.ts with all types |
| Midday (2 hr) | Build core blocks: HeroRotating, ThreeCardGrid, StatBar, SplitImageText, CTABand | 5 working block components |
| Afternoon (1 hr) | Enter Konative home page content in Payload admin | Composed home page |
| Afternoon (1 hr) | Deploy to Vercel + point konative.com DNS | Live preview URL |

### Day 2-3

| Task | Deliverable |
|---|---|
| Build remaining blocks: ServicesList, TestimonialCarousel, BrandLogoStrip, ContactForm, FooterCTA | Full block library |
| Create About, Services, Contact pages | All Phase 1 pages live |
| Generate imagery: outdoor living, surfaces, fabrication environments | Real visual assets |
| Configure form submissions + email routing via Resend | Working lead capture |
| Test mobile + desktop + contact flow end-to-end | QA complete |

### Day 4-5

| Task | Deliverable |
|---|---|
| Polish: animations, hover states, scroll reveals, dark mode | Production-quality frontend |
| SEO: meta tags, OG images, sitemap, robots.txt | Search-ready |
| Set up Notion WebOS hub: Site Registry, Block Library, Launch Checklist | Documented system |
| Record Loom: "How to edit Konative.com" for Katrina | Editor onboarding |
| Go live: final DNS, SSL, analytics, uptime monitoring | konative.com is LIVE |

### Week 2-4: WebOS Maturation

| Task | Deliverable |
|---|---|
| Extract Studio Starter template from Konative codebase | Reusable template repo |
| Build Site 1 (TolowaPacific.com) using the starter | Proven repeatability |
| Document all blocks with screenshots in Notion Block Library | Visual reference |
| Write Handoff Playbook for client-owned deployments | Agency capability |
| Evaluate multi-tenant plugin for managed hosting model | Scale readiness |

---

## Part 5: Skill Definition — "WebOS Launch"

This is the AI OS skill that can be invoked for any future site build, just like Office Hours or Addy's 7 Steps:

### Skill: WebOS Launch

**Trigger:** "I need to build a new site for [domain/business]"

**Input Requirements:**
1. Domain name
2. Business description (1-2 sentences)
3. Primary site goal (credibility, leads, sales, recruitment)
4. Reference URL (design inspiration)
5. Content assets available (logos, photos, copy, testimonials)

**Execution Steps:**
1. **Brief** — Generate site brief using this document's Part 1 as template
2. **Extract** — Analyze reference URL, map to existing blocks, identify gaps
3. **Scaffold** — Clone Studio Starter, configure site-specific globals and theme
4. **Compose** — Assemble pages from blocks in Payload admin
5. **Content** — Enter real content, generate/source imagery
6. **Deploy** — Push to Vercel/GCP, point DNS, verify
7. **Document** — Add to Site Registry, update Block Library, write Editor Guide
8. **Handoff** — Train operator, record Loom, set up monitoring

**Output:** Live website + Notion documentation + editor training

**Time target:**
- Site using only existing blocks: 1-2 days
- Site requiring 1-3 new blocks: 3-5 days
- Site requiring significant new patterns: 1-2 weeks

---

## Part 6: Cost Model

### Per-Site Costs (Managed Mode)

| Item | Monthly Cost | Notes |
|---|---|---|
| Vercel Pro | ~$0 marginal per site | Shared team plan |
| Neon Postgres | ~$0-5 per site | Free tier generous; paid scales linearly |
| Vercel Blob (media) | ~$0-2 per site | Pay per GB stored |
| Resend (email) | ~$0 marginal | 3,000 emails/mo free |
| Plausible analytics | ~$0-4 per site | Or self-hosted for $0 |
| Domain | ~$1/mo amortized | Annual registration |
| **Total per managed site** | **$1-12/mo** | |

### Revenue Model

| Tier | Build Fee | Monthly | Margin |
|---|---|---|---|
| Standard site (existing blocks) | $3,000-5,000 | $200-300/mo managed | 95%+ on recurring |
| Custom site (new blocks) | $5,000-10,000 | $300-500/mo managed | 90%+ on recurring |
| Handoff site (client-owned) | $8,000-15,000 | $0 (optional retainer) | 100% on build |

At 20 managed sites × $250/mo average = $5,000/mo recurring revenue from hosting alone, with near-zero marginal cost per site due to shared infrastructure.

---

## Appendix A: Key URLs and Resources

| Resource | URL |
|---|---|
| Payload CMS Docs | https://payloadcms.com/docs |
| Payload Website Template | https://github.com/payloadcms/payload/tree/main/templates/website |
| Vercel One-Click Deploy | https://vercel.com/templates/next.js/payload-website-starter |
| Payload Multi-Tenant Plugin | https://payloadcms.com/docs/plugins/multi-tenant |
| Payload Live Preview Docs | https://payloadcms.com/docs/live-preview/overview |
| Payload Block Tutorial | https://www.youtube.com/watch?v=qSkSKlw_fW8 |
| Payload Blocks Copy-Paste Library | https://blok0.xyz/blog/payload-cms-blocks-nextjs |
| Kimley-Horn (reference site) | https://www.kimley-horn.com |
| Neon Postgres | https://neon.tech |
| Resend Email | https://resend.com |
| Plausible Analytics | https://plausible.io |

## Appendix B: Environment Variables Template

```env
# Payload
PAYLOAD_SECRET=generate-a-random-string-here
DATABASE_URI=postgres://user:pass@host/konative

# Next.js
NEXT_PUBLIC_SITE_URL=https://konative.com

# Media Storage
BLOB_READ_WRITE_TOKEN=vercel-blob-token

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=hello@konative.com

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=konative.com
```
