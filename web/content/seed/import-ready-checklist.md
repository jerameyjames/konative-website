# Import-Ready Checklist

Use this checklist when importing Konative seed content into Payload.

## Pre-Import

- [ ] Confirm target environment (local, preview, or production).
- [ ] Confirm current Payload schema includes:
  - [ ] `pages` collection with `title`, `slug`, `layout`, `meta`
  - [ ] blocks: `hero-rotating`, `stat-bar`, `three-card-grid`, `split-image-text`, `cta-band`
- [ ] Confirm `content/seed/pages.yaml` exists.
- [ ] Confirm `content/seed/services.yaml` exists (if services collection is active).
- [ ] Confirm `content/seed/site-content.yaml` exists.
- [ ] Confirm all required media assets are uploaded.
- [ ] Replace every `"[PLACEHOLDER_MEDIA_ID]"` in `content/seed/pages.yaml` with real media IDs.

## Import Execution

- [ ] Import media first.
- [ ] Import `pages` records from `content/seed/pages.yaml`.
- [ ] Import services records from `content/seed/services.yaml` (if applicable).
- [ ] Apply shared content from `content/seed/site-content.yaml` to matching collections/globals.
- [ ] Verify no import errors for required fields or invalid `blockType` values.

## Post-Import Validation

- [ ] Open `home` page in preview and verify block order:
  - [ ] Hero Rotating
  - [ ] Stat Bar
  - [ ] Three Card Grid
  - [ ] Split Image Text
  - [ ] CTA Band
- [ ] Open `about`, `services`, and `contact` pages and verify content loads.
- [ ] Confirm all primary CTAs point to `/contact`.
- [ ] Confirm CTA labels are partnership-inquiry driven.
- [ ] Confirm page `meta.title` and `meta.description` are populated.
- [ ] Confirm required `split-image-text.image` values resolve to valid media.

## Placeholder Governance

- [ ] Keep `[PLACEHOLDER]` tags only where intentionally pending approval.
- [ ] Do not publish testimonial placeholders without stakeholder approval.
- [ ] Replace placeholder author/company names before public launch.

## Final Go/No-Go

- [ ] No unresolved required-field errors.
- [ ] No broken internal links from CTA buttons.
- [ ] No generic filler copy introduced during import.
- [ ] Content remains specific to Konative manufacturer representation in the Pacific Northwest.
- [ ] Approved to publish.
