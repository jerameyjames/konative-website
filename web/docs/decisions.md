# Decisions Log

## Purpose
Capture architecture decisions that affect the future WebOS starter.

## Entry format
### YYYY-MM-DD — Title
- Context:
- Decision:
- Why:
- Tradeoffs:
- Affected files:

## Initial assumptions
- Payload CMS + Next.js is the starter stack
- Konative is Site 0
- Vercel is acceptable for initial deployment speed
- Future multi-tenant evolution happens after starter validation

### 2026-04-15 — Canonical app in `web/`, Vercel project `konative-site`
- Context: A parallel `konative-site/` folder and an older static marketing app in `web/` caused duplicate sources and mismatched Vercel project names (legacy duplicate Vercel project vs **`konative-site`**).
- Decision: **One app**: the Payload + Next implementation lives only in **`web/`**. The Vercel project name **`konative-site`** is the default in `scripts/vercel-bootstrap.sh` and infra docs. Deprecated duplicate folders and large inbox exports were removed from the working tree; AI OS markdown playbooks live under **`docs/ai-os/`**.
- Why: Single source of truth for Git, CI, and deploy; fewer path mistakes (`web/.env.local` vs nested folder).
- Tradeoffs: The legacy duplicate **Vercel** project (same name as the **GitHub** repo slug `konative-website`) was **deleted** after domains/env pointed at **`konative-site`**. Remaining name collision is only GitHub (`…/konative-website`) vs Vercel (`konative-site`)—documented in `CLAUDE.md` / `README.md`, not a second deploy target.
- Affected files: `web/**`, root `README.md`, `CLAUDE.md`, `scripts/vercel-bootstrap.sh`, `web/docs/database-setup.md`, `web/docs/deploy-readiness-checklist.md`, `web/docs/dns-setup.md`, `web/docs/analytics-setup.md`, `web/next.config.ts`, `docs/ai-os/*`
