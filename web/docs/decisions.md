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
- Context: A parallel `konative-site/` folder and an older static marketing app in `web/` caused duplicate sources and mismatched Vercel project names (`konative-website` vs `konative-site`).
- Decision: **One app**: the Payload + Next implementation lives only in **`web/`**. The Vercel project name **`konative-site`** is the default in `scripts/vercel-bootstrap.sh` and infra docs. Deprecated duplicate folders and large inbox exports were removed from the working tree; AI OS markdown playbooks live under **`docs/ai-os/`**.
- Why: Single source of truth for Git, CI, and deploy; fewer path mistakes (`web/.env.local` vs nested folder).
- Tradeoffs: Anyone with links to the old `konative-website` Vercel project must migrate env vars, domains, and Postgres/Blob links to **`konative-site`** (or rename the project in Vercel to match).
- Affected files: `web/**`, root `README.md`, `CLAUDE.md`, `scripts/vercel-bootstrap.sh`, `web/docs/database-setup.md`, `web/docs/deploy-readiness-checklist.md`, `web/docs/dns-setup.md`, `web/docs/analytics-setup.md`, `web/next.config.ts`, `docs/ai-os/*`

### 2026-04-15 — Vercel Postgres adapter (`db-vercel-postgres`) — superseded
- Context: `@payloadcms/db-postgres` + `DATABASE_URI` failed at runtime on Vercel (`ENOTFOUND base`) because Neon integration env values are not plain `postgres://` strings in the worker.
- Decision: Use **`@payloadcms/db-vercel-postgres`** with `POSTGRES_URL` / `DATABASE_URL` / `DATABASE_URI` fallback order in `payload.config.ts`.
- Why: Matches Vercel + Neon Storage integration and Payload’s documented deployment path.
- Affected files: `web/payload.config.ts`, `web/package.json`, `web/.env.example`, `web/docs/database-setup.md`
- **Superseded 2026-04-15 (later):** `db-vercel-postgres` surfaced `Invalid URL` when env values copied via API were not usable connection strings. **`@payloadcms/db-postgres`** with the same env fallback accepts resolved `postgresql://` URLs from `vercel env pull` / plain upserts. Reverted to standard adapter.

### 2026-04-15 — Payload DB: `@payloadcms/db-postgres` (standard)
- Context: Production health checks failed after domain/env migration; connection string must be a real `postgresql://` URL in the runtime.
- Decision: Use **`@payloadcms/db-postgres`** with `POSTGRES_URL` → `DATABASE_URL` → `DATABASE_URI` in `payload.config.ts`.
- Why: Works for Neon on Vercel and local dev with one code path; avoids adapter-specific parsing of integration placeholders.
- Tradeoffs: Slightly different from Payload’s Vercel-branded adapter; both use `pg` under the hood for app queries.
- Affected files: `web/payload.config.ts`, `web/package.json`, `web/docs/database-setup.md`, `scripts/vercel-copy-plain-env-from-project.mjs`

### 2026-04-15 — Production host: `konative-site` + domain cutover
- Context: Custom domain pointed at `konative-website` while the Payload app shipped on `konative-site`.
- Decision: **API + CLI migration** documented in root `CLAUDE.md`: `scripts/vercel-migrate-konative-site.mjs` aligns **Root Directory**, copies env from the legacy project, and (with `--move-domains`) moves `konative.com` / `www` to `konative-site`.
- Why: One production project, one DB-backed app, DNS and env stay consistent.
- Affected files: `scripts/vercel-migrate-konative-site.mjs`, `CLAUDE.md`, `web/src/app/(frontend)/page.tsx` (explicit `/` → `home` slug for App Router)
