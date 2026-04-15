# Analytics setup

## Vercel Analytics (recommended baseline)
1. Open Vercel project `konative-website`.
2. Go to **Analytics** tab.
3. Click **Enable Analytics**.
4. Redeploy once enabled.

## Optional: Google Tag Manager (GTM)
If marketing needs GTM and GA4:
1. Create GTM container for `konative.com`.
2. Keep container ID (`GTM-XXXXXXX`).
3. Set `NEXT_PUBLIC_GTM_ID` in:
   - `.env.local`
   - Vercel Environment Variables (Development, Preview, Production)
4. Add the same ID to SEO Defaults global in Payload admin once that field exists.

## Tracking governance
- Keep one source of truth for IDs in environment variables.
- Avoid hardcoding analytics IDs in source code.
- Use GTM for future tags to avoid repeated code deployments.
