# Konative V1 Ship Checklist

## Purpose
This checklist defines what must be true before the ASAP public launch of `konative.com`.

It is intentionally biased toward the **fastest credible release**:

- ship what builds trust
- ship what makes the CTA work
- do not ship extra scope

## Launch Goal
Launch a public-facing Konative site that can be used immediately in live deal flow and that clearly supports the CTA:

**Request a Project Readiness Review**

## Definition of Done
The site is ready to launch when:

- the public story is clear
- the CTA works
- trust assets are present
- legal/privacy basics are covered
- redirects/routing are safe
- basic analytics are live
- the experience is credible on mobile and desktop

## Content Readiness
- [ ] Hero headline, subhead, and CTA are final
- [ ] Homepage sections follow `docs/homepage-outline.md`
- [ ] Launch copy follows `docs/launch-copy-outline.md`
- [ ] Offer block aligns with `docs/phase-one-offer.md`
- [ ] Trust section includes founder credibility and anonymized proof approach
- [ ] All placeholder copy is removed from the public-facing pages

## CTA and Inquiry Flow
- [ ] Primary CTA label is `Request a Project Readiness Review`
- [ ] CTA appears in hero and at least one lower-page CTA band
- [ ] CTA destination page or section exists
- [ ] Inquiry form fields are defined and implemented
- [ ] Success state is visible and clear
- [ ] Failure/retry state is visible and clear
- [ ] Fallback contact path exists if form submission fails
- [ ] Internal owner knows where inquiries are received and how quickly to respond

## Trust and Proof Layer
- [ ] Founder name/title/bio are present
- [ ] Konative domain-based contact path is live
- [ ] At least one anonymized proof asset or sample deliverable structure is ready
- [ ] Geography/domain specificity is visible in the copy
- [ ] Trust does not depend on unavailable named case studies

## Legal and Privacy
- [ ] Privacy page exists
- [ ] Contact page or contact destination exists
- [ ] Legal/terms page exists if required for the inquiry flow
- [ ] Form copy explains what information is collected and why
- [ ] Public branding is `Konative only`
- [ ] Footer/contact/legal language is reviewed and approved

## Routing and Entry Path
- [ ] Root path is treated as the canonical public entry as soon as technically feasible
- [ ] Redirect behavior is reviewed before cutover
- [ ] Redirect matrix exists for any `/lander` transition
- [ ] Rollback plan exists in case canonical routing causes regressions
- [ ] Metadata/canonical tags align with the intended entry path

## Accessibility
- [ ] Navigation works by keyboard
- [ ] CTA buttons and form controls have visible focus states
- [ ] Form labels and error messages are clear
- [ ] Color contrast is acceptable for core flows
- [ ] Mobile layout remains readable and usable

### Working accessibility target
Aim for **WCAG 2.1 AA on the primary marketing and inquiry flows** for v1.

## Performance and UX
- [ ] Hero content loads quickly on mobile
- [ ] No obviously broken layout on common mobile/desktop sizes
- [ ] Images/assets are optimized enough for launch
- [ ] No major visual glitches in the CTA flow

## Analytics
- [ ] CTA click event is tracked
- [ ] Form submission success event is tracked
- [ ] Outbound contact-link click is tracked if used
- [ ] Analytics choice matches privacy/cookie behavior
- [ ] Someone knows where to review the initial launch metrics

## Launch Operations
- [ ] Launch owner is identified
- [ ] Inquiry-response owner is identified
- [ ] Legal/privacy reviewer is identified
- [ ] Site can be updated quickly after launch if issues are found

## Explicitly Out of Scope For V1
- [ ] Private client portal
- [ ] Internal knowledge-base integration
- [ ] Named case-study library
- [ ] Full CMS sophistication if not needed for immediate launch
- [ ] Broader procurement-trigger productization

## Launch Decision Rule
If a missing item does **not** materially affect:

- trust
- CTA conversion
- legal/privacy safety
- routing stability

it should not block the ASAP launch.

## Post-Launch Checks
- [ ] Site is used in active deal flow immediately
- [ ] At least one real prospect sees the launch version in a live context
- [ ] Initial CTA/inquiry behavior is reviewed within the first few days
- [ ] Fast fixes are queued if friction shows up

## Open Inputs Still Needed
- What anonymized proof asset will ship first?
- Does Konative already have the domain-based email/contact path ready?
- Who is the final legal/privacy approver?
- Is the first release one-page or multi-page?
