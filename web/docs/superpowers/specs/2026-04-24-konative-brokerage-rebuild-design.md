# Konative.com — Brokerage Rebuild Design Spec
**Date:** 2026-04-24  
**Status:** Approved  
**Approach:** Combined 2+3 — parallel three-door rebuild with deep landholder funnel  

---

## 1. Positioning & Audience

**Business model:** Full-service data center brokerage. Revenue = retained planning fee + brokerage commission on close + project management day rate.

**Lead practice:** Site selection / powered land (supply-side moat).  
**Full service lines:** Plan → Source → Run (site selection, tenant-rep, landlord-rep, capital markets, occupier advisory).

**Three audiences, one homepage:**
- **Primary:** Landholders / power-adjacent landowners (A)  
- **Secondary:** Investors / developers / capital (B)  
- **Secondary:** Occupiers / hyperscalers / AI tenants (C)

**Core proposition for landholders:** "If you own powered land, the AI buildout wants to talk to you." Konative sources, qualifies, and brokers powered land to hyperscalers, developers, and data center operators — and manages the project from contract to construction.

---

## 2. Information Architecture

```
/                         Homepage — three doors
/land                     Landholder funnel (deep)
  /land/submit            Multi-step intake (4 steps)
  /land/what-its-worth    Valuation framework explainer
  /land/process           "What happens after you submit"
/invest                   Investor / capital door
  /invest/deal-flow       Gated deal pipeline (NDA email-gated)
  /invest/buy-box         Investor profile intake
/capacity                 Occupier door
  /capacity/rfp           RFP intake
  /capacity/markets       Top markets brief
/intel                    Intelligence hub
  /intel/news             Live news feed (US + Canada)
  /intel/markets          Market reports per metro
  /intel/deals            Public deal tracker (premium gate for detail)
/services                 Plan • Source • Run (explicit fee structure)
/about                    Team, track record, process
/contact                  General inquiry (fallback)
```

---

## 3. Homepage Composition

Top-to-bottom section order:

1. **Hero** — H1: "If you own powered land, the AI buildout wants to talk to you." Three-door card row directly below: `Own land →` (amber/primary), `Deploy capital →` (navy/secondary), `Find capacity →` (navy/secondary).
2. **Signal ticker bar** — auto-scrolling row of latest 6 news items from `/api/latest-news`. Reinforces market urgency.
3. **Three-door explainer** — three columns, one per audience, each with a one-sentence promise, three proof-point bullets, and the funnel CTA.
4. **Why Konative** — Plan • Source • Run, three-card grid (reuses `ThreeCardGrid` block).
5. **Live intel preview** — split panel: latest 5 news items (left) + latest 5 deals (right). Both link to `/intel`.
6. **Market footprint** — US/Canada map with active metros highlighted (static SVG + Sanity-driven metro list, no map library dependency).
7. **Newsletter capture** — `NewsletterSignup` banner variant, source tag `homepage_footer`.
8. **Team + footer.**

**Header nav:** `Land` · `Invest` · `Capacity` · `Intel` · `Services` · `About` + rust-colored CTA button `Submit your land →`.

---

## 4. Landholder Funnel (deep)

### `/land/submit` — Multi-step intake

**Step 1 — Property**
- County, state (required)
- Parcel APN (optional)
- Total acreage (required)
- Ownership type: sole / partnership / trust / LLC
- Have you talked to other brokers? Y/N

**Step 2 — Power & Infrastructure**
- Distance to nearest substation (miles)
- Known transmission line voltage: <115kV / 115–230kV / 230–500kV / 500+kV / unknown
- Distance to fiber backbone (optional)
- Water access: Y / N / unknown
- Zoning (drop-down: agricultural / industrial / mixed / unknown)

**Step 3 — Intent**
- Timeline: now / 6 months / 12 months / exploring
- Price expectation: range input OR "tell me what it's worth"
- Preferred structure: sell outright / ground lease / JV / open to all

**Step 4 — Contact**
- Name, email, phone (required)
- Role: owner / agent / family rep / other
- Referral source

### Submission behavior
1. Persist to Sanity `landSubmission` document — source of truth, never lost.
2. Auto-respond via Resend with "What your land may be worth" PDF (template: explains $/MW framework, comparable transactions, what data we still need).
3. Internal notification email to `jeramey.james@gmail.com`.
4. HubSpot contact + deal auto-created (Phase 2, behind `HUBSPOT_AUTO_SYNC=true` flag).
5. Redirect to `/land/process` confirmation page showing 7 / 30 / 90 day timeline + embedded state-filtered news feed.

### `/land/what-its-worth`
Evergreen explainer: acreage × power proximity × transmission capacity = rough value band. No appraisal, sets expectations and educates. Includes FAQ schema markup.

### `/land/process`
Timeline graphic: Submission → Qualification call (48h) → Site review (2wk) → Buyer outreach (30d) → LOI → Due diligence → Close. Honest about timelines. CTA to schedule a call.

---

## 5. Investor & Occupier Funnels (Phase 1 lighter)

### `/invest` + `/invest/buy-box`
Single intake: name, firm, AUM band, check size, asset preference (powered land / stabilized colo / development JV / platform), geography preferences.  
Persists to Sanity `investorProfile`.

### `/invest/deal-flow`
NDA checkbox gates access. Displays redacted teasers from `deals` collection: entity + size band + geography only. Free users see teasers; subscribers see partner companies, summary, source links (`PremiumGate` component).

### `/capacity/rfp`
Single intake: company, contact, MW required, target online date, market preferences (multi-select metros), workload type (training / inference / general compute / colocation), connectivity requirements.  
Persists to Sanity `capacityRequest`.

---

## 6. Forms Infrastructure

### Root cause of current broken state
- `/api/contact` returns 200 success even when Resend is unconfigured — submissions are lost, no DB write.
- `/api/newsletter/subscribe` throws 500 when Supabase env vars are absent.
- No unified submission persistence model — each form is a one-off.

### New shared pipeline: `src/lib/forms/submit.ts`

```typescript
submit(schemaType, payload)
  → validate(payload, zodSchema)         // throws on invalid
  → persistToSanity(schemaType, payload) // always first, source of truth
  → notifyEmail(template, payload)       // Resend; loud-fail in prod if key missing
  → enqueueCRM(payload)                  // HubSpot MCP (Phase 2, behind flag)
  → return { id, ok, errors }
```

### New Sanity schemas
| Schema | Purpose |
|---|---|
| `landSubmission` | Landholder intake (4-step) |
| `investorProfile` | Investor buy-box |
| `capacityRequest` | Occupier RFP |
| `contactInquiry` | General contact (replaces current no-persist route) |
| `newsletterSubscriber` | Newsletter (Sanity-first, Supabase optional) |

All five include: UTM/source fields, IP hash for rate-limit, `status` (new / contacted / qualified / dead), `createdAt`.

### Validation
- `zod` schemas per form type in `src/lib/forms/schemas/`
- Shared between client-side preview validation and server-side route validation

### Spam protection
- Cloudflare Turnstile (free tier) on all four lead forms
- `TURNSTILE_SECRET_KEY` + `NEXT_PUBLIC_TURNSTILE_SITE_KEY` env vars

### Newsletter fix
- Write to Sanity `newsletterSubscriber` first — missing Supabase key never breaks subscribe again
- Beehiiv/Ghost optional sync kept but non-blocking

### Resend fix
- Switch `from` to `team@konative.com` once domain verified in Resend dashboard
- Until then: surface explicit config warning in route log on missing key (no silent success)

### UI consistency
- New `<FormShell>` component: label, input, error, helptext, submit, success/error state
- New `<StepForm>` multi-step wizard for land intake
- All forms share same design language, eliminating visual inconsistency

---

## 7. Intelligence Layer

### News pipeline

**New Sanity schemas:**
- `newsSource` — name, url, type (rss / scrape / api), country, region, active bool, lastFetchedAt
- `newsItem` — title, url, summary, sourceRef, publishedAt, countries[], tags[], metros[], status (draft / published / hidden), aiSummary, aiTags
- `ingestionRun` — sourceRef, startedAt, finishedAt, itemsFetched, itemsNew, errors[]

**Seed RSS sources (free, no licensing issues):**
- Data Center Dynamics, Data Center Frontier, Data Center Knowledge
- Utility Dive, T&D World, RTO Insider previews
- FERC press releases, NERC notices
- ISO/RTO interconnection queue pages: PJM, MISO, ERCOT, CAISO, SPP, NYISO, ISO-NE, AESO, IESO
- State econ-dev press releases: Loudoun, Phoenix, Columbus, Dallas, Atlanta, Chicago, Quebec, Calgary
- Hyperscaler press rooms: AWS, Google, Microsoft, Meta, Oracle, Equinix, Digital Realty

**Ingest worker extension (`/api/ingest-news`):**
- Vercel Cron: daily at 06:00 UTC + on-demand POST
- Fetch each active source, dedupe by URL hash
- Optional AI pass (Tier-1 Ollama `qwen2.5-coder:14b`): 2-sentence summary, auto-tag, metro extraction, relevance score 0–1
- Auto-publish items with score ≥ 0.6; hold lower-scored items for manual CMS review
- Write `ingestionRun` log every cycle; visible in `/dashboard`

### Market intel (`/intel/markets`)
- One page per metro (~12 initial: Loudoun, Phoenix, Dallas, Columbus, Atlanta, Chicago, Austin, Portland, Reno, Montreal, Quebec City, Calgary)
- Sanity `marketReport` doc per metro: power availability, $/kW-mo range, vacancy, planned capacity, transmission constraints, key utilities, notable transactions, "what we're hearing," lastUpdated
- Hand-curated monthly; AI-assisted draft from metro's recent `newsItem` set
- Phase 1: Loudoun, Phoenix, Dallas (week 2)
- Phase 2: remaining 9 metros (week 3–4)

### Deal tracker (`/intel/deals`)
- Public table with filters: geography, deal type, size band
- Free: entity + size band + geography
- Subscribers (`PremiumGate`): partner companies, summary, source links
- Premium gate = carrot for newsletter signups

### Content / SEO backbone

**Landholder (highest-traffic long-tail):**
1. "How much is my land worth to a data center?"
2. "What makes land 'powered'?"
3. "Substation proximity: how close is close enough?"
4. "Sell vs. ground-lease vs. JV — which gets me the most?"
5. "How long does a hyperscaler land deal actually take?"
6. "What due diligence will a buyer run on my parcel?"

**Investor:**
7. "Powered land vs. stabilized colo vs. development JV — risk-adjusted returns"
8. "Reading the interconnection queue: signal vs. noise"
9. "How brokers get paid in data center transactions"
10. Quarterly market letter (gated, drives newsletter)

**Occupier:**
11. "Powered shell vs. build-to-suit vs. colo — decision framework"
12. "Why your 18-month timeline is now 36 months (and how to get it back)"
13. "Top 12 markets ranked: power, latency, incentives"
14. RFP template download (email-gated)

**Trust signals:**
- Team bios + LinkedIn (schema already has fields)
- Track record: closed-deal logos, $ volume, MW transacted (specificity > vagueness)
- Services page: Plan → Source → Run with explicit fee structure (differentiator — most brokerages hide this)
- Newsletter subscriber count once ≥ 500

---

## 8. Technical Architecture

### New API routes
| Route | Type | Purpose |
|---|---|---|
| `/api/land/submit` | POST | Multi-step land intake |
| `/api/investor/submit` | POST | Investor profile intake |
| `/api/capacity/submit` | POST | Occupier RFP intake |

### Modified API routes
| Route | Change |
|---|---|
| `/api/contact` | Full rewrite — uses shared pipeline, persists to Sanity |
| `/api/newsletter/subscribe` | Rewrite — Sanity-first, Supabase optional |
| `/api/ingest-news` | Extend — multi-source, tag/summarize, ingestionRun log |
| `/api/market-intel` | Extend — metro filter, serve `marketReport` docs |

### New shared modules
```
src/lib/forms/submit.ts           unified submission pipeline
src/lib/forms/schemas/            zod schemas per form type
src/lib/ingest/fetch.ts           RSS fetch + dedup
src/lib/ingest/tag.ts             AI tag/summarize (Ollama-backed)
src/components/ui/FormShell.tsx   shared form wrapper
src/components/ui/StepForm.tsx    multi-step wizard
```

### Integrations
| Integration | Status | Notes |
|---|---|---|
| Resend | Fix | Domain verify, loud-fail on missing key |
| HubSpot | Phase 2 | MCP already connected; auto-sync behind flag |
| Beehiiv | Keep | Optional newsletter sync, non-blocking |
| Cloudflare Turnstile | New | Spam gate on all lead forms |
| Vercel Cron | New | Daily ingest at 06:00 UTC |

### Environment variables to add
```
TURNSTILE_SECRET_KEY
NEXT_PUBLIC_TURNSTILE_SITE_KEY
HUBSPOT_AUTO_SYNC              (optional, default false)
```

### Vercel cron config (`web/vercel.json`)
```json
{
  "crons": [{ "path": "/api/ingest-news", "schedule": "0 6 * * *" }]
}
```

---

## 9. Phased Delivery

### Week 1 — Foundation (three parallel tracks)
**Track A — Forms infrastructure:**
- Add 5 Sanity schemas: `landSubmission`, `investorProfile`, `capacityRequest`, `contactInquiry`, `newsletterSubscriber`
- Build `src/lib/forms/submit.ts` shared pipeline + zod schemas
- Rewrite `/api/contact` and `/api/newsletter/subscribe`
- Build `<FormShell>` and `<StepForm>` UI components
- Wire Cloudflare Turnstile

**Track B — Landholder funnel:**
- `/land` hub page
- `/land/submit` 4-step intake using `<StepForm>`
- `/land/process` confirmation + state-filtered news embed
- `/land/what-its-worth` valuation explainer
- Valuation-range PDF template (Resend attachment)
- `/invest` + `/capacity` placeholder email-capture doors

**Track C — News pipeline:**
- Add `newsSource`, `newsItem`, `ingestionRun` Sanity schemas
- Extend `/api/ingest-news` for multi-source + AI tagging
- Seed 8 initial RSS sources
- Verify feed populates Sanity and `/intel/news` renders

### Week 2 — Three-door homepage + intel hub
- Homepage full rebuild: hero, three-door cards, signal ticker, intel preview, footprint map, newsletter banner
- Header nav update: Land / Invest / Capacity / Intel / Services / About + rust CTA
- `/intel/deals` table with premium gate
- `/intel/markets` shell + first 3 metro reports (Loudoun, Phoenix, Dallas)

### Week 3 — Full investor + occupier funnels + content shell
- `/invest/deal-flow` NDA gate + redacted teasers
- `/invest/buy-box` full intake
- `/capacity/rfp` full intake
- `/services` page: Plan → Source → Run with fee structure
- 6 landholder SEO content pages (highest-traffic)
- HubSpot auto-sync behind flag

### Week 4 — Polish + launch
- `/about` team page
- 6 remaining metro reports
- 8 remaining SEO content pages (investor + occupier)
- Full QA pass: all forms end-to-end, ingest cron verified, all funnels tested
- DNS + Vercel domain verification (konative.com)
- Production deploy

---

## 10. Success Metrics (30-day post-launch)

| Metric | Target |
|---|---|
| Land submissions | ≥ 10 / month |
| Investor profiles | ≥ 5 / month |
| Capacity RFPs | ≥ 3 / month |
| Newsletter subscribers | ≥ 100 new / month |
| `/intel/news` items published | ≥ 50 / week (automated) |
| Form error rate | 0% (all submissions persisted) |
| Organic impressions on landholder queries | Baseline established |
