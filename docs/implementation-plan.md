# Implementation Plan: Konative.com Credibility-First Launch

## Overview
This plan translates the strategy in `docs/DESIGN-DOC.md` into a buildable public launch.

Because the current project folder contains planning docs but no existing app scaffold, this plan assumes a **greenfield implementation** optimized for the fastest credible release.

### Launch target
Ship an ASAP public-facing Konative site that:

- clearly explains the company and buyer fit
- supports the CTA `Request a Project Readiness Review`
- gives the founder a URL that can be used immediately in live deal flow
- avoids portal, CMS, and internal knowledge-base complexity in v1

## Architecture Decisions
- **Public experience:** one-page marketing site with anchored sections for the first launch
- **Supporting routes:** dedicated `contact`/CTA route or section, `privacy`, and legal/contact route as needed
- **Rendering model:** static-first marketing pages
- **Stack default:** `Next.js + TypeScript + Vercel` unless an equivalent fast-deploy stack is chosen during implementation
- **Form strategy:** lightweight inquiry form with anti-spam, success/failure handling, and simple routing to founder-owned inbox + tracker
- **Analytics minimum:** CTA clicks, submit success, outbound contact clicks
- **Canonical entry:** root path as soon as technically feasible
- **Deferred from v1:** client portal, internal knowledge base, named case-study library, sophisticated CMS

## Greenfield Assumption
No existing application files were found in the repository root during planning (`package.json`, `app/`, `src/`, `pages/`, `next.config.*`, `tsconfig.json` were all absent at the root).

The public site scaffold now lives in **`web/`** (Next.js App Router + TypeScript + Tailwind). Deploy using `web` as the project root (for example on Vercel). If an external production codebase exists elsewhere, adapt this plan to that codebase, but keep the IA, CTA, and launch scope unchanged.

## Build Slices

### Slice 1: Project bootstrap
Create the site scaffold, deployment baseline, and file structure needed to start shipping sections.

### Slice 2: Public homepage shell
Build the one-page layout, anchored navigation, hero, and CTA shell.

### Slice 3: Core story sections
Add urgency, status quo, capabilities, audience, and engagement sections.

### Slice 4: CTA and inquiry flow
Build the review-request path, form handling, spam protection, and success/failure states.

### Slice 5: Trust, legal, and privacy
Add founder credibility, anonymized proof framing, privacy page, and legal/contact structure.

### Slice 6: Launch instrumentation and QA
Add analytics events, confirm accessibility/performance/routing, and prepare cutover.

## Task List

### Phase 1: Foundation

## Task 1: Bootstrap the site scaffold
**Description:** Initialize the public site with a minimal production-ready stack and deployment baseline.

**Acceptance criteria:**
- [ ] App scaffold exists
- [ ] Type-safe baseline exists
- [ ] Local dev and production build commands are defined

**Verification:**
- [ ] App boots locally
- [ ] Production build succeeds

**Dependencies:** None

**Files likely touched:**
- `package.json`
- `tsconfig.json`
- `next.config.*`
- `app/layout.tsx`
- `app/page.tsx`
- baseline styling/config files

**Estimated scope:** M

## Task 2: Establish the site frame and anchored navigation
**Description:** Build the homepage shell, top navigation, footer frame, and root-route structure.

**Acceptance criteria:**
- [ ] Root route renders the public homepage shell
- [ ] Anchored navigation or equivalent one-page nav works
- [ ] Footer placeholder structure exists

**Verification:**
- [ ] Desktop and mobile shells render without layout breakage
- [ ] Navigation jumps to the intended sections

**Dependencies:** Task 1

**Files likely touched:**
- `app/page.tsx`
- `components/site-header.*`
- `components/site-footer.*`
- `components/section-shell.*`

**Estimated scope:** M

### Checkpoint: Foundation
- [ ] App scaffold is stable
- [ ] Root route exists
- [ ] One-page navigation frame works

### Phase 2: Core Messaging Surface

## Task 3: Implement hero and urgency sections
**Description:** Add the highest-value above-the-fold messaging and the urgency framing from the launch copy outline.

**Acceptance criteria:**
- [ ] Hero includes headline, subhead, and CTA
- [ ] Urgency section explains timing pressure clearly
- [ ] Copy follows `docs/launch-copy-outline.md`

**Verification:**
- [ ] A prospect can understand the offer and next step within one screen plus one scroll

**Dependencies:** Task 2

**Files likely touched:**
- `app/page.tsx`
- `components/hero-section.*`
- `components/urgency-section.*`

**Estimated scope:** M

## Task 4: Implement status quo, capabilities, and audience sections
**Description:** Add the middle-of-page story that explains the fragmented status quo, Konative’s role, and who the site is for.

**Acceptance criteria:**
- [ ] Status quo section exists
- [ ] What Konative does section exists
- [ ] Who we serve section exists

**Verification:**
- [ ] Messaging remains specific to investment groups and Indigenous Development Corporations

**Dependencies:** Task 3

**Files likely touched:**
- `app/page.tsx`
- `components/status-quo-section.*`
- `components/capabilities-section.*`
- `components/audience-section.*`

**Estimated scope:** M

## Task 5: Implement the engagement and trust sections
**Description:** Add the phase-one offer explanation and competence-first trust layer.

**Acceptance criteria:**
- [ ] Engagement section exists and aligns with `docs/phase-one-offer.md`
- [ ] Trust section exists and aligns with `docs/trust-legal-proof-assets.md`
- [ ] Final CTA band exists

**Verification:**
- [ ] Public trust does not depend on named case studies

**Dependencies:** Task 4

**Files likely touched:**
- `app/page.tsx`
- `components/engagement-section.*`
- `components/trust-section.*`
- `components/final-cta-section.*`

**Estimated scope:** M

### Checkpoint: Core Messaging
- [ ] Homepage tells the full story end-to-end
- [ ] CTA appears in all required places
- [ ] Trust layer is present without extra scope

### Phase 3: CTA Flow and Supporting Routes

## Task 6: Build the request-review inquiry flow
**Description:** Implement the public inquiry form and the user-facing states around it.

**Acceptance criteria:**
- [ ] CTA destination exists
- [ ] Minimum fields are implemented
- [ ] Success state is implemented
- [ ] Failure/retry state is implemented
- [ ] Fallback contact method is present

**Verification:**
- [ ] Form can be submitted successfully in staging
- [ ] Failure handling does not dead-end the user

**Dependencies:** Task 5

**Files likely touched:**
- `app/contact/page.tsx` or CTA section code
- `components/review-request-form.*`
- form handler / route files

**Estimated scope:** M

## Task 7: Add anti-spam and routing defaults
**Description:** Add the minimum viable protections and operational routing for the inquiry flow.

**Acceptance criteria:**
- [ ] Honeypot or equivalent anti-spam measure exists
- [ ] Submission routes to founder-owned inbox + default tracker
- [ ] Internal owner can verify where submissions go

**Verification:**
- [ ] Test submissions reach the expected destination

**Dependencies:** Task 6

**Files likely touched:**
- form handler / route files
- environment/config files

**Estimated scope:** S

## Task 8: Build privacy and legal/supporting pages
**Description:** Add the supporting routes required to make the site professionally launchable.

**Acceptance criteria:**
- [ ] Privacy page exists
- [ ] Legal/contact route exists as needed
- [ ] Footer links resolve correctly

**Verification:**
- [ ] All footer/legal/contact links work in staging

**Dependencies:** Tasks 5-7

**Files likely touched:**
- `app/privacy/page.tsx`
- `app/legal/page.tsx` or equivalent
- footer component

**Estimated scope:** S

### Checkpoint: CTA + Supporting Routes
- [ ] Inquiry flow works
- [ ] Legal/privacy routes exist
- [ ] Footer/contact experience is complete

### Phase 4: Launch Readiness

## Task 9: Add analytics and launch instrumentation
**Description:** Implement the minimum event tracking required by the v1 ship checklist.

**Acceptance criteria:**
- [ ] CTA click event is tracked
- [ ] Form success event is tracked
- [ ] Outbound contact click is tracked if used

**Verification:**
- [ ] Events appear in the chosen analytics tool in staging or test mode

**Dependencies:** Tasks 6-8

**Files likely touched:**
- analytics setup files
- CTA/form components

**Estimated scope:** S

## Task 10: Validate accessibility, performance, and mobile behavior
**Description:** Run the launch checklist against the real build and fix any blocking issues.

**Acceptance criteria:**
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] Core mobile layouts are usable
- [ ] Basic performance is acceptable for launch

**Verification:**
- [ ] Manual accessibility pass on homepage + CTA flow
- [ ] Manual mobile pass on key breakpoints

**Dependencies:** Tasks 3-9

**Files likely touched:**
- multiple page/component files as needed

**Estimated scope:** M

## Task 11: Finalize routing and launch cutover
**Description:** Handle root canonical entry, redirect behavior, and go-live readiness.

**Acceptance criteria:**
- [ ] Redirect matrix exists
- [ ] Rollback plan exists
- [ ] Root entry and metadata behavior are confirmed

**Verification:**
- [ ] Staging behaves the same way the intended live cutover will behave

**Dependencies:** Tasks 2-10

**Files likely touched:**
- route config
- hosting config
- metadata config

**Estimated scope:** S

### Checkpoint: Launch Ready
- [ ] V1 ship checklist passes
- [ ] Root route is canonical or cutover plan is explicit
- [ ] Site is ready for live use in deal flow

### Phase 5: Traceability and Follow-Through

## Task 12: Add PRD-to-build traceability note
**Description:** Map the launch implementation back to the PRD and design decisions so future work does not drift.

**Acceptance criteria:**
- [ ] PRD requirements relevant to v1 launch are mapped to implemented areas
- [ ] Open requirements/deferred items are listed clearly

**Verification:**
- [ ] Reviewer can tell what launch covers and what remains deferred

**Dependencies:** Tasks 3-11

**Files likely touched:**
- `docs/requirements-prd.md`
- `docs/implementation-plan.md`
- `docs/project-plan.md`

**Estimated scope:** S

## Requirements Traceability
### PRD coverage for v1
- **F1.1 Hero / value proposition / CTA**  
  Covered by Tasks 2-5
- **F1.2 Navigation**  
  Covered by Task 2
- **F1.3 Footer / legal / contact**  
  Covered by Task 8
- **F2.1 Single primary CTA**  
  Covered by Tasks 3, 5, 6
- **F2.2 Analytics events**  
  Covered by Task 9
- **F3.1 Form validation / errors / success**  
  Covered by Task 6
- **F3.2 Spam / abuse mitigation**  
  Covered by Task 7
- **F4.1 Title / meta description**  
  Covered by Tasks 2 and 11
- **F4.2 Open Graph / social preview**  
  Covered by Task 11
- **F4.3 Robots / sitemap / launch-safe indexing**  
  Covered by Task 11
- **N1 Accessibility target**  
  Covered by Task 10
- **N2 Performance budget**  
  Covered by Task 10
- **N3 HTTPS / mixed content / headers**  
  Covered by Task 11 and hosting setup
- **N4 Privacy / consent**  
  Covered by Tasks 8 and 9

### Explicitly deferred
- Internal knowledge-base build-out
- Client portal / gated workspace
- Named public case-study library
- Broader growth-phase marketing features

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| No proof asset is ready in time | High | Use sanitized sample deliverable structure instead of delaying launch |
| Contact routing is unreliable | High | Keep v1 routing simple: founder-owned inbox + test submissions before launch |
| Root canonical cutover breaks existing traffic | High | Use redirect matrix + rollback plan before go-live |
| Scope expands into portal/CMS work | High | Treat anything beyond public site + legal/contact pages as deferred |
| Copy drifts into generic consulting language | Medium | Keep `docs/launch-copy-outline.md` as the source of truth |
| Legal/privacy review slows release | Medium | Assign owner early and keep first release legally minimal but complete |

## Open Questions
- Is the launch site one-page with supporting routes, or does the team want multi-page immediately?
- Will the public site mention the `8-10 week` engagement duration, or keep that inside the sales conversation?
- What is the first anonymized proof asset to ship?
- What analytics tool is the actual default for v1?

## Verification Checklist Before Build Starts
- [ ] Offer doc is reviewed
- [ ] Homepage outline is reviewed
- [ ] Launch copy outline is reviewed
- [ ] Trust/legal/proof doc is reviewed
- [ ] V1 ship checklist is reviewed
- [ ] Open launch blockers have owners
