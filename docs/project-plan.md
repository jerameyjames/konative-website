# Project Plan: Konative.com Credibility-First Launch

## Overview
Yes, all three next steps are needed if the goal is to move from strategy to a launched site:

1. **Homepage/copy outline** turns positioning into something prospects can understand fast.
2. **V1 ship checklist** turns reviewer concerns into launch-safe requirements.
3. **Implementation plan** turns the site into buildable work with ordered dependencies.

They should not be treated as three separate projects. They are three sequential layers of the same launch plan.

The launch target is **ASAP**. This plan should optimize for the fastest credible public release, not a long pre-launch polish cycle.

This project plan assumes the approved direction in `docs/DESIGN-DOC.md`:

- **Approach A:** credibility-first public site
- **Primary goal:** help close current live opportunities
- **Secondary goal:** create a clean lead-gen surface
- **Deferred goal:** internal knowledge base or gated workspace after public launch

## Working Decisions
- `docs/requirements-prd.md` remains the source of truth for launch acceptance criteria.
- `docs/DESIGN-DOC.md` remains the source of truth for positioning and strategic direction.
- This file is the source of truth for **execution order, checkpoints, and ownership questions**.
- The first release is a **public marketing/trust surface**, not a client portal.
- The internal knowledge-base idea stays in scope as a later phase, not a launch blocker.

## Dependency Graph
Phase-one paid offer + CTA
    ->
Legal/entity/proof decisions
    ->
Homepage IA + copy outline
    ->
Launch checklist (form, analytics, privacy, redirects, a11y)
    ->
Implementation plan
    ->
Public-site build
    ->
Staging QA + launch
    ->
Post-launch measurement
    ->
Internal knowledge-base decision

## Priority Order
### Required for launch
- Lock the **phase-one paid offer**
- Choose the **primary CTA**
- Define the **homepage and trust story**
- Write the **ship checklist**
- Produce the **implementation plan**
- Build, QA, and launch the public site

### Deferred until after launch
- Private/gated deal room
- Internal knowledge-base build-out
- Broader procurement-trigger productization

## Task List

### Phase 1: Offer and Launch Inputs

## Task 1: Lock the phase-one paid offer
**Description:** Define the exact offer the site is selling so copy, CTA, and trust language stop being vague.

**Acceptance criteria:**
- [ ] The offer has a name.
- [ ] The offer has a price or pricing structure.
- [ ] The offer has a timeline and exact deliverables.

**Verification:**
- [ ] The offer can be pasted into the homepage CTA section without placeholders.
- [ ] The offer answers "what happens if I contact Konative?" in one paragraph.
- [ ] Draft artifact exists in `docs/phase-one-offer.md`.

**Dependencies:** None

**Files likely touched:**
- `docs/DESIGN-DOC.md`
- `docs/phase-one-offer.md`
- `docs/project-plan.md`

**Estimated scope:** S

## Task 2: Resolve launch-blocking business decisions
**Description:** Close the business and trust questions that prevent the public site from being shipped responsibly.

**Acceptance criteria:**
- [ ] A primary CTA label is chosen.
- [ ] Public proof assets are defined: founder bio, partner ecosystem, anonymized examples, or equivalents.
- [ ] Public branding posture is decided.
- [ ] Decision is made on root vs `/lander` as the canonical public entry.

**Verification:**
- [ ] No launch-blocking question remains in `docs/DESIGN-DOC.md` without an owner or default.

**Dependencies:** Task 1

**Files likely touched:**
- `docs/DESIGN-DOC.md`
- `docs/project-plan.md`
- `docs/requirements-prd.md`

**Estimated scope:** S

### Checkpoint: Phase 1
- [ ] The site offer is concrete enough to sell.
- [ ] The CTA and public branding posture are decided.
- [ ] The public entry path decision is made.

### Phase 2: Content and Trust Surface

## Task 3: Produce the homepage IA and page map
**Description:** Turn the strategy into a concrete public information architecture for launch.

**Acceptance criteria:**
- [ ] Homepage section order is defined.
- [ ] Required supporting pages are listed.
- [ ] Each section has one clear job in the conversion flow.

**Verification:**
- [ ] A designer or builder can wireframe the site without inventing structure.
- [ ] Homepage IA artifact exists in `docs/homepage-outline.md`.

**Dependencies:** Tasks 1-2

**Files likely touched:**
- `docs/DESIGN-DOC.md`
- `docs/homepage-outline.md`
- `docs/project-plan.md`

**Estimated scope:** S

## Task 4: Draft the launch copy outline
**Description:** Create a structured copy pack for the homepage and supporting trust sections.

**Acceptance criteria:**
- [ ] Hero headline, subhead, and CTA draft exist.
- [ ] "Why Konative," "What We Do," "Who We Serve," and "Why Now" drafts exist.
- [ ] Trust-layer content is defined even if named case studies are unavailable.

**Verification:**
- [ ] A prospect can understand the company, buyer fit, and next step within one screen plus one scroll.
- [ ] Launch copy artifact exists in `docs/launch-copy-outline.md`.

**Dependencies:** Task 3

**Files likely touched:**
- `docs/DESIGN-DOC.md`
- `docs/launch-copy-outline.md`
- `docs/project-plan.md`

**Estimated scope:** M

## Task 5: Define trust, legal, and proof assets
**Description:** Convert the abstract trust layer into a concrete asset list for launch.

**Acceptance criteria:**
- [ ] Founder/team credential assets are listed.
- [ ] Anonymized proof or sample deliverable options are listed.
- [ ] Required legal/privacy/contact pages are listed.

**Verification:**
- [ ] The trust layer does not depend on unavailable named case studies.
- [ ] The legal/privacy pages required for launch are explicit.
- [ ] Trust/legal/proof artifact exists in `docs/trust-legal-proof-assets.md`.

**Dependencies:** Tasks 2-4

**Files likely touched:**
- `docs/DESIGN-DOC.md`
- `docs/trust-legal-proof-assets.md`
- `docs/project-plan.md`

**Estimated scope:** S

### Checkpoint: Phase 2
- [ ] The public story is structured.
- [ ] The launch copy outline exists.
- [ ] Trust and legal assets are defined enough to build around.

### Phase 3: Launch-Safe Build Planning

## Task 6: Write the v1 ship checklist
**Description:** Turn reviewer concerns into a concrete launch checklist covering routing, forms, analytics, privacy, accessibility, and QA.

**Acceptance criteria:**
- [ ] Accessibility target for v1 is explicit.
- [ ] Form handling, spam protection, and failure states are defined.
- [ ] Analytics minimum events are defined.
- [ ] Redirect validation and rollback expectations are defined.
- [ ] Definition of done for launch is written.

**Verification:**
- [ ] A builder can answer "what must be true before launch?" from one checklist.
- [ ] Ship checklist artifact exists in `docs/v1-ship-checklist.md`.

**Dependencies:** Tasks 2-5

**Files likely touched:**
- `docs/DESIGN-DOC.md`
- `docs/project-plan.md`
- `docs/requirements-prd.md`
- `docs/v1-ship-checklist.md`

**Estimated scope:** M

## Task 7: Write the implementation plan
**Description:** Translate the launch-ready spec into buildable work: pages, components, integrations, routing, and operational defaults.

**Acceptance criteria:**
- [ ] Public pages/components are listed.
- [ ] CTA flow and data-routing defaults are listed.
- [ ] Hosting/deploy default is chosen or explicitly deferred with a default assumption.
- [ ] Redirect table and rollback approach are included.

**Verification:**
- [ ] An engineer can estimate build effort without reopening the entire office-hours transcript.
- [ ] Implementation plan artifact exists in `docs/implementation-plan.md`.

**Dependencies:** Task 6

**Files likely touched:**
- `docs/project-plan.md`
- `docs/implementation-plan.md`
- `docs/requirements-prd.md`
- `docs/DESIGN-DOC.md`

**Estimated scope:** M

## Task 8: Add requirements traceability
**Description:** Link the strategic design and the PRD so implementation work has one clear acceptance map.

**Acceptance criteria:**
- [ ] PRD items relevant to launch are mapped to design/build decisions.
- [ ] Reviewers can tell which acceptance criteria belong to which launch task.

**Verification:**
- [ ] The team can review the launch scope without ambiguity about what counts as "done."

**Dependencies:** Task 7

**Files likely touched:**
- `docs/requirements-prd.md`
- `docs/DESIGN-DOC.md`
- `docs/project-plan.md`

**Estimated scope:** S

### Checkpoint: Phase 3
- [ ] The launch checklist exists.
- [ ] The implementation plan exists.
- [ ] The PRD, design doc, and plan are aligned.

### Phase 4: Build and Launch

## Task 9: Build the public marketing surface
**Description:** Implement the credibility-first site based on the approved IA, copy, CTA, and launch checklist.

**Acceptance criteria:**
- [ ] The public homepage and required supporting pages exist.
- [ ] The CTA path works end-to-end.
- [ ] Legal/footer/contact structure matches launch decisions.

**Verification:**
- [ ] Local or staging build succeeds.
- [ ] Manual review confirms messaging, navigation, and CTA behavior.

**Dependencies:** Tasks 6-8

**Files likely touched:**
- `app/*` or equivalent site files
- `components/*` or equivalent
- configuration and deployment files

**Estimated scope:** L

## Task 10: Run staging QA and launch readiness review
**Description:** Validate the launch candidate against the ship checklist before going live.

**Acceptance criteria:**
- [ ] Redirect behavior is validated.
- [ ] Accessibility spot checks are completed.
- [ ] Analytics and form events are verified.
- [ ] Legal/privacy/contact pages are present and linked.

**Verification:**
- [ ] Staging review passes with no P0 launch blockers.

**Dependencies:** Task 9

**Files likely touched:**
- staging environment config
- QA notes/checklists

**Estimated scope:** M

## Task 11: Launch and measure
**Description:** Push the public trust surface live and use it in active deal flow immediately.

**Acceptance criteria:**
- [ ] `konative.com` serves the intended launch experience.
- [ ] The site is used in active prospect outreach and proposals.
- [ ] Initial inquiry tracking is active.

**Verification:**
- [ ] Live site works on desktop and mobile.
- [ ] At least one live outreach cycle uses the site as the primary trust URL.

**Dependencies:** Task 10

**Files likely touched:**
- deployment config
- post-launch notes

**Estimated scope:** S

### Checkpoint: Phase 4
- [ ] Public site is live.
- [ ] The CTA works.
- [ ] Launch metrics are being captured.
- [ ] The release happened on the fastest credible timeline, not after avoidable scope expansion.

### Phase 5: Post-Launch Follow-Through

## Task 12: Assess internal knowledge-base phase
**Description:** Re-evaluate the internal repository requirement after the public site is live and being used in real deals.

**Acceptance criteria:**
- [ ] The team decides whether Notion/private docs are sufficient for now.
- [ ] If not sufficient, the next gated-workspace scope is defined as a separate phase.

**Verification:**
- [ ] Internal knowledge-base work is either explicitly deferred or separately scoped.

**Dependencies:** Task 11

**Files likely touched:**
- `docs/project-plan.md`
- `docs/notion-setup.md`
- future internal-hub planning docs

**Estimated scope:** S

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Offer remains vague | High | Complete Task 1 before copy or design moves forward |
| Public proof is too thin | High | Use competence-first trust layer, anonymized deliverables, and founder credibility |
| Routing or redirect behavior breaks launch | High | Define redirect matrix and validate in staging before cutover |
| Legal/entity ambiguity slows launch | Medium | Resolve Konative vs Tolowa Pacific footer/legal language early |
| Team tries to build the knowledge base too soon | Medium | Keep internal-hub work explicitly post-launch |
| Demand urgency gets lost to perfectionism | High | Treat ASAP launch as a forcing function and cut anything that does not materially improve trust or CTA conversion |
| CTA generates unqualified traffic | Medium | Define qualified inquiry rubric and shape form copy accordingly |

## Parallelization Opportunities
- Safe to parallelize after Phase 1:
  - copy drafting
  - trust/proof asset collection
  - legal/privacy page drafting
- Must stay sequential:
  - offer definition before CTA finalization
  - launch checklist before implementation plan
  - implementation plan before build
- Needs coordination:
  - root vs `/lander` decision
  - legal footer language
  - analytics/privacy alignment

## Open Questions
- Which CTA label feels strongest for the actual buyer: `Request a pro forma` or `Schedule a consultation`?
- Do you want the first implementation plan to assume a specific stack/platform, or keep it platform-agnostic until build starts?
- Who owns legal/privacy review for the first public launch?
- What is the minimum acceptable trust layer if no named public proof can be shown yet?

## Immediate Next Moves
- [x] Bootstrap public site scaffold in `web/` (homepage, `/privacy`, `/legal`, inquiry API stub)
- [ ] Wire inquiry delivery (email provider or `INQUIRY_WEBHOOK_URL`) and replace placeholder legal/privacy after counsel review
- [ ] Review and refine `docs/phase-one-offer.md`
- [ ] Complete Task 2: finalize proof assets, timeline posture, and public branding details
- [ ] Review and refine `docs/homepage-outline.md`
- [ ] Review and refine `docs/launch-copy-outline.md`
- [ ] Review and refine `docs/trust-legal-proof-assets.md`
- [ ] Review and refine `docs/v1-ship-checklist.md`
- [ ] Review and refine `docs/implementation-plan.md`
- [ ] Start Task 8: add PRD-to-build traceability note if we want it split out beyond the implementation-plan appendix
