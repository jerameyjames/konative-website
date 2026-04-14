# Konative

| What | URL |
|------|-----|
| **Production** | [https://konative.com](https://konative.com) |
| **Git repository** | [github.com/jerameyjames/konative-website](https://github.com/jerameyjames/konative-website) (`main`) |

Founder OS structure and PRD live in **`docs/`**. Notion hub (live): [konative.com](https://www.notion.so/konative-com-34132e0a547481489537d232018bbbb0).

## Public site (Next.js)

The credibility-first marketing site lives in **`web/`** (Next.js 16 + TypeScript + Tailwind).

```bash
cd web
npm install
npm run dev
```

- Production build: `npm run build` then `npm run start`
- Vercel: set the project root directory to `web` (or deploy from that folder)
- Optional: set `INQUIRY_WEBHOOK_URL` to POST inquiry JSON to your automation (see `web/.env.example`)

- [`docs/founder-os-konative.md`](docs/founder-os-konative.md) — operating model (vision → workstreams → rhythm)
- [`docs/requirements-prd.md`](docs/requirements-prd.md) — konative.com requirements and backlog epics
- [`docs/DESIGN-DOC.md`](docs/DESIGN-DOC.md) — credibility-first strategy and launch direction
- [`docs/phase-one-offer.md`](docs/phase-one-offer.md) — draft paid offer, CTA, pricing, timeline, and deliverables
- [`docs/homepage-outline.md`](docs/homepage-outline.md) — homepage IA, section order, and supporting page map
- [`docs/launch-copy-outline.md`](docs/launch-copy-outline.md) — first-pass launch messaging and homepage copy structure
- [`docs/trust-legal-proof-assets.md`](docs/trust-legal-proof-assets.md) — v1 trust layer, anonymized proof options, and legal/privacy asset list
- [`docs/v1-ship-checklist.md`](docs/v1-ship-checklist.md) — ASAP launch definition of done and launch gate checklist
- [`docs/implementation-plan.md`](docs/implementation-plan.md) — greenfield build plan, task order, and PRD traceability for the public site
- [`docs/project-plan.md`](docs/project-plan.md) — ordered execution plan from offer lock through launch
- [`docs/notion-setup.md`](docs/notion-setup.md) — Notion links + task board setup
