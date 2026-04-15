# Konative deploy readiness checklist

This checklist captures the remaining infrastructure actions after automated setup.

## Completed (when true)
- Vercel project `konative-site` exists, **Root Directory** = `web`, and Git is connected.
- Postgres (Vercel Postgres or Neon) is linked to `konative-site`.
- Core DB env vars (`DATABASE_URL` / `DATABASE_URI`, `POSTGRES_*`, `PG*` as applicable) exist in Dev/Preview/Prod.
- `PAYLOAD_SECRET` and `NEXT_PUBLIC_SITE_URL` exist in Vercel envs.
- Local `web/.env.local` exists and `DATABASE_URI` matches your database URL.

## Remaining manual actions

### 1) Finalize Blob token
The CLI flow created Blob stores but did not complete automated environment-link selection.

1. Open Vercel project `konative-site` -> **Storage** -> **Blob**.
2. Keep one store (recommended: `konative-media-linked`) and remove extras.
3. Generate or copy a **Read/Write token**.
4. Set `BLOB_READ_WRITE_TOKEN` in:
   - Vercel Development
   - Vercel Preview
   - Vercel Production
   - `web/.env.local`

### 2) Preview env alignment
Custom variable assignment for Preview had CLI branch-target constraints.

In Vercel Dashboard -> Settings -> Environment Variables:
- Ensure these exist for Preview:
  - `DATABASE_URI` (same value as `DATABASE_URL`)
  - `PAYLOAD_SECRET`
  - `NEXT_PUBLIC_SITE_URL` (`https://konative.com`)
  - `BLOB_READ_WRITE_TOKEN` (real token)

### 3) DNS cutover
Follow `docs/dns-setup.md`:
- Either delegate nameservers to Vercel OR set A/CNAME records at registrar.
- Validate with:
  - `vercel domains inspect konative.com`
  - `vercel domains inspect www.konative.com`

### 4) Email provider
Follow `docs/email-setup.md`:
- Set `RESEND_API_KEY`
- Set `RESEND_FROM_EMAIL`

### 5) Analytics
Follow `docs/analytics-setup.md`:
- Enable Vercel Analytics
- Optional GTM: set `NEXT_PUBLIC_GTM_ID`

## Ready-to-deploy signal
Code is infrastructure-ready for deployment when:
- `DATABASE_URI` in all environments points to the live Neon URL
- `BLOB_READ_WRITE_TOKEN` is real (not placeholder)
- DNS verification is green in Vercel
- Required env vars are populated for Dev/Preview/Prod
