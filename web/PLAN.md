# PLAN.md

## Objective
Launch Konative.com as Site 0 of the WebOS using Payload CMS + Next.js, while establishing a reusable architecture for future studio sites.

## Reference inputs
- Konative build brief
- AI OS Notion template
- AI OS kickoff playbook
- Kimley-Horn reference structure

## Phase 1 — Repository scaffold
### Goal
Create a working local Payload + Next.js website starter and confirm dev environment health.

### Expected outputs
- App scaffolded
- Project boots locally
- Environment variables documented
- Base repo structure confirmed

### Files likely affected
- package.json
- payload.config.ts
- src/**
- .env.example
- README.md

## Phase 2 — CMS foundation
### Goal
Create reusable content model for business websites.

### Collections
- Pages
- Services
- Testimonials
- TeamMembers
- FormSubmissions

### Globals
- SiteSettings
- Navigation
- Theme
- SEODefaults

### Expected outputs
- Payload config updated
- Collections and globals registered
- Basic admin editing works

## Phase 3 — Block system v1
### Goal
Build and register the first 5 blocks needed to compose the Konative home page.

### Blocks
- HeroRotating
- ThreeCardGrid
- StatBar
- SplitImageText
- CTABand

### Expected outputs
- Block configs created
- Components render correctly
- Pages layout field supports block composition

## Phase 4 — Home page composition
### Goal
Render a polished initial home page using real structure and near-final copy.

### Home sequence
1. HeroRotating
2. StatBar
3. ThreeCardGrid
4. SplitImageText
5. CTABand

### Expected outputs
- Home page accessible
- Navigation and footer functional
- Styling direction established

## Phase 5 — Phase 1 pages
### Goal
Build About, Services, Contact pages and form handling.

### Expected outputs
- `/about`
- `/services`
- `/contact`
- Form submission flow

## Phase 6 — Preview + deployment
### Goal
Enable preview, deploy preview environment, and verify baseline quality.

### Expected outputs
- Live preview working
- Preview deployment live
- Basic QA complete

## Rules
- Do not skip phases.
- Do not exceed the initial block list without approval.
- Keep abstractions minimal until reused.
- Keep copy premium but editable.
- Prefer maintainability over novelty.
