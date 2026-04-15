# AGENTS.md

## Mission
This repository is the **Site 0 implementation** of Tolowa Studio's WebOS: a reusable website operating system for building premium, scalable business websites using **Payload CMS + Next.js**.

The immediate objective is to build **konative.com** as the first live implementation. The strategic objective is to turn this repo into a reusable studio starter for future websites.

## Core principles
1. **Reusability over one-off customization.** Every structural decision should improve the future starter.
2. **Phase-based delivery.** Work only on the current approved milestone.
3. **No chaos architecture.** Do not add pages, blocks, patterns, or schema complexity without a clear reason.
4. **Konative is Site 0.** It should feel premium and specific, but its architecture must remain reusable.
5. **Notion is the system of record.** When creating or updating work, sync relevant outcomes to the AI OS workspace via Desktop Commander / Notion access.
6. **Prefer small safe iterations.** Show plans, then implement in batches.
7. **Use real content structure, not placeholders.** Temporary filler is acceptable only when clearly marked and easy to replace.

## Current project context
- Domain: `konative.com`
- Business: woman-owned sales representation and marketing firm for outdoor living, surfaces, and fabrication
- Primary goal: generate manufacturer partnership inquiries
- Reference site: `https://www.kimley-horn.com/`
- Design direction: warm, confident, spacious, premium professional-services site
- Long-term stack: Payload CMS + Next.js + reusable block library + future multi-tenant evolution

## Approved initial page scope
- Home
- About
- Services
- Contact

## Approved initial block scope (14 max)
1. HeroRotating
2. ThreeCardGrid
3. StatBar
4. SplitImageText
5. ServicesList
6. TestimonialCarousel
7. BrandLogoStrip
8. CTABand
9. RichContent
10. TeamGrid
11. ContactForm
12. MediaFeature
13. FAQAccordion
14. FooterCTA

## Milestone order
1. Scaffold repo and verify local run
2. Define core Payload collections and globals
3. Register and build first 5 blocks
4. Compose and render home page
5. Build About / Services / Contact
6. Configure form handling and preview
7. Deploy preview
8. Sync docs to Notion and finalize editor workflow

## Execution behavior
- Always begin major work by restating the milestone and listing files expected to change.
- Prefer editing existing files over generating parallel alternatives.
- Keep folder structure clean and predictable.
- Use TypeScript throughout.
- Favor server components unless interactivity requires client components.
- Use design tokens and consistent naming.
- Keep content modeling generic enough for future reuse.
- If a change affects the WebOS starter, document it in `docs/decisions.md`.

## Notion behavior
Because this environment has Notion + filesystem access, the agent may:
- create/update project notes in the AI OS workspace,
- seed task status updates,
- create a Konative project page if missing,
- add records to the Block Library and Site Registry,
provided the action is clearly logged in the response.

Do not invent database IDs. Discover them from the workspace or ask for confirmation if ambiguous.

## Definition of done for current kickoff
- Project scaffold exists and runs
- Payload admin runs locally
- Core collections/globals exist
- First 5 blocks are registered
- Home page can be composed in Payload
- Notion has corresponding project/task/milestone updates
