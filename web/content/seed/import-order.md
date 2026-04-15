# Konative Seed Import Order

This guide defines the safest order to import content into Payload with the current schema.

## Recommended Import Sequence

1. **Create media assets first**
   - Upload images needed by `split-image-text` and optional hero/card images.
   - Record each created media document ID.
   - Replace each `"[PLACEHOLDER_MEDIA_ID]"` value in `content/seed/pages.yaml` before page import.

2. **Create pages**
   - Source file: `content/seed/pages.yaml`
   - Collection: `pages`
   - Create records in this order:
     - `home`
     - `about`
     - `services`
     - `contact`
   - Ensure each `layout` block has a valid `blockType` matching a registered block slug.

3. **Create services entries (if/when services collection exists)**
   - Source file: `content/seed/services.yaml`
   - Collection: `services`
   - Map each `services[]` item to collection fields.
   - If the `services` collection schema differs, adapt this file rather than rewriting copy.

4. **Apply shared non-page content**
   - Source file: `content/seed/site-content.yaml`
   - Use for:
     - About values/team placeholders (if represented outside blocks)
     - Contact form copy labels/placeholders (if modeled in globals/components)
     - SEO defaults/per-page metadata backup
     - Testimonial placeholders (if `testimonials` collection is active)

5. **Final QA pass in Payload admin**
   - Open each page in live preview.
   - Confirm CTA labels and links point to `/contact`.
   - Confirm no unresolved `PLACEHOLDER` tags remain in published fields except intended testimonials.

## Page Field Mapping (Current Schema)

Based on `src/collections/Pages.ts` and block configs:

- `title` -> `pages.title`
- `slug` -> `pages.slug`
- `meta.title` -> `pages.meta.title`
- `meta.description` -> `pages.meta.description`
- `layout[]` -> `pages.layout[]`

### Block: `hero-rotating`
- `headline`
- `rotatingWords[]` with `{ word }`
- `subtitle`
- `ctaLabel`
- `ctaLink`
- `backgroundImage` (optional)

### Block: `stat-bar`
- `stats[]` with:
  - `value`
  - `label`

### Block: `three-card-grid`
- `sectionTitle`
- `cards[]` with:
  - `title`
  - `description`
  - `linkLabel`
  - `linkUrl`
  - `image` (optional)

### Block: `split-image-text`
- `heading`
- `body`
- `ctaLabel`
- `ctaLink`
- `image` (**required**)
- `imagePosition` (`left` or `right`)

### Block: `cta-band`
- `heading`
- `ctaLabel`
- `ctaLink`
- `style` (`primary`, `warm`, or `neutral`)

## Placeholder Resolution Checklist

Before production publish:

- Replace all `"[PLACEHOLDER_MEDIA_ID]"` values with real media IDs.
- Decide whether testimonial placeholders should remain hidden until approved references are available.
- Keep `[PLACEHOLDER]` tags only where intentionally pending legal/brand approval.

## Conversion Consistency Guardrails

- Primary CTA language should remain: **Start Partnership Inquiry** or **Submit Partnership Inquiry**.
- Keep `/contact` as the CTA destination unless routing strategy changes.
- Preserve industry language that differentiates Konative:
  - manufacturer rep
  - dealer network
  - territory coverage
  - outdoor living
  - hardscape
  - surfaces
  - fabrication
  - showroom
