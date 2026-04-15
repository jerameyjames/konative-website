# Postgres provisioning for Konative

## Priority order
1. Vercel Postgres (preferred for deployment simplicity)
2. Neon
3. Supabase Postgres

## Current status
- A Neon Postgres resource (`konative-db`) may be provisioned and linked to Vercel project `konative-site` (or attach Postgres in the Vercel dashboard for that project).
- Neon / Vercel often populate `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `POSTGRES_URL`, or `POSTGRES_*` / `PG*` variants.
- **On Vercel**, `payload.config.ts` uses **`@payloadcms/db-vercel-postgres`** (`vercelPostgresAdapter({})` with no manual pool). That delegates to **`@vercel/postgres`**, which resolves Neon / Vercel integration variables at runtime (dashboard values can look like opaque tokens in `vercel env pull`; that is expected). For **local** dev with a normal Postgres URL, set **`POSTGRES_URL`** or **`DATABASE_URL`** to a plain `postgres://…` string in `.env.local`; the adapter uses the regular `pg` pool when the host is `localhost` / `127.0.0.1`.

## Connection string format (required)
Use this format for all providers:

`postgres://<user>:<password>@<host>:5432/<database>?sslmode=require`

## Option A: Vercel Postgres (recommended)
1. Vercel Dashboard -> `konative-site` -> **Storage** -> **Create Database** -> **Postgres**.
2. Accept default region near deployment region (IAD recommended if app stays in US East).
3. Link database to `konative-site`.
4. Copy generated `POSTGRES_URL` or connection URI.
5. Set **`DATABASE_URI`** (recommended) or rely on **`POSTGRES_URL`** / **`DATABASE_URL`** if your integration only provides those names—in Vercel env vars (Dev/Preview/Prod) and `.env.local`.

## Option B: Neon
1. (Already completed) Neon integration is installed and connected to the project.
2. Pull vars locally with `vercel env pull .env.development.local`.
3. Optionally set **`DATABASE_URI`** in Vercel to mirror `DATABASE_URL` if you want one explicit name across docs and local `.env.local`.
4. Keep SSL required for all production connections.

## Option C: Supabase Postgres
1. Create Supabase project at [https://supabase.com](https://supabase.com).
2. Open Project Settings -> Database.
3. Copy connection string (session/pooling URI) with SSL enabled.
4. Set `DATABASE_URI` in Vercel + `.env.local`.
