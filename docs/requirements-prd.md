# Konative.com — Product requirements (PRD)

**Status:** Draft v0.1  
**Owner:** TBD  
**Last updated:** 2026-04-12  

## Context

Konative’s public site (`konative.com`) uses a redirect to `/lander`; unauthenticated automated requests may receive **403** on some paths. Product specifics below include **assumptions** to validate with stakeholders and analytics.

## Goals

1. **Clarity:** Visitors understand what Konative offers and who it is for within one screen.
2. **Conversion:** Primary CTA is obvious; funnel events are measurable.
3. **Trust:** Security, privacy, and social proof are visible where appropriate.
4. **Performance:** Core Web Vitals and mobile experience meet an agreed bar.
5. **Maintainability:** Content and layout can be updated without a full redeploy for every copy tweak (within your stack’s constraints).

## Non-goals (initial)

- Full account dashboard scope (unless konative.com is the app itself—clarify).
- Internationalization beyond a single primary locale (unless required).

## Personas (draft)

| Persona | Need | Success signal |
|---------|------|----------------|
| Primary buyer / user | Understand fit fast, start key action | CTA completion |
| Partner / press | Credibility, story, contact | Inbound or download |

## Functional requirements

### F1 — Marketing surface

| ID | Requirement | Priority | Acceptance criteria |
|----|-------------|----------|---------------------|
| F1.1 | Hero with value proposition, supporting line, primary CTA | P0 | Message visible above fold on 375px and 1280px widths |
| F1.2 | Navigation: logo, anchor or pages as needed, CTA | P0 | All links work; focus order logical |
| F1.3 | Footer: legal links, contact, social if applicable | P1 | No broken links; privacy/terms accessible |

### F2 — Conversion & measurement

| ID | Requirement | Priority | Acceptance criteria |
|----|-------------|----------|---------------------|
| F2.1 | Single primary CTA with consistent label | P0 | Documented event name for analytics |
| F2.2 | Analytics events for CTA, scroll milestones (if used), form submit | P0 | Events visible in chosen analytics tool in staging |
| F2.3 | Optional secondary actions (newsletter, demo) do not compete visually with primary | P1 | Design review |

### F3 — Forms & data capture (if applicable)

| ID | Requirement | Priority | Acceptance criteria |
|----|-------------|----------|---------------------|
| F3.1 | Validation, error messages, success state | P0 | Screen reader announces errors; keyboard-only usable |
| F3.2 | Spam/abuse mitigation (honeypot, rate limit, or CAPTCHA policy) | P1 | Documented approach |

### F4 — Content & SEO

| ID | Requirement | Priority | Acceptance criteria |
|----|-------------|----------|---------------------|
| F4.1 | Unique `<title>` and meta description per main page | P0 | Lighthouse SEO basics pass |
| F4.2 | Open Graph / social preview for main template | P1 | Preview validates in OG debugger |
| F4.3 | `robots.txt` / `sitemap.xml` policy aligned with launch | P1 | No accidental noindex on production |

### F5 — Non-functional

| ID | Requirement | Priority | Acceptance criteria |
|----|-------------|----------|---------------------|
| N1 | WCAG 2.1 AA target for marketing pages | P0 | Spot-check with axe + keyboard |
| N2 | Performance budget (LCP, CLS, INP) | P0 | Targets set in writing; measured on 3G fast + desktop |
| N3 | HTTPS, HSTS if applicable, no mixed content | P0 | Security headers per hosting |
| N4 | Privacy: cookie consent if using non-essential cookies | P1 | Matches legal guidance |

## Epics → initial backlog (for Notion Tasks DB)

1. **E1 — IA & copy lock:** Final sitemap, hero, footer, legal copy.
2. **E2 — Visual system:** Tokens, components, responsive behavior.
3. **E3 — CTA & analytics:** Instrumentation and QA in staging + prod.
4. **E4 — SEO & perf:** Meta, OG, CWV improvements.
5. **E5 — Hardening:** A11y pass, cross-browser, 403/redirect behavior documented for bots vs users.

## Open questions

1. What is Konative’s exact product category and ICP (one paragraph)?
2. Is `/lander` the canonical home, or should root render content without extra redirect hops?
3. What is the primary CTA (signup, demo, waitlist, contact)?
4. Which analytics and hosting (e.g. Vercel) are authoritative?

## Traceability

Link each **Epic** to a **Project** row in Notion; decompose into **Tasks** with IDs matching F1.x / F2.x where possible.
