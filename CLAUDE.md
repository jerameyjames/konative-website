# Konative (repo)

Agent context for the monorepo: app code lives in **`web/`** (Next.js). See `web/AGENTS.md` and `web/CLAUDE.md` for Next.js-specific rules.

## Deploy Configuration (configured by /setup-deploy)

- **Platform:** Vercel (Next.js 16 app in `web/`)
- **Production URL:** https://konative.com
- **Git remote:** https://github.com/jerameyjames/konative-website (`main`)
- **Vercel project root:** set **Root Directory** to `web` in the Vercel project settings (this repo is not only the Next app at the filesystem root).
- **Deploy workflow:** Auto-deploy on push to `main`; preview deployments on PRs (default Vercel Git integration).
- **Deploy status command:** `vercel ls --prod` (from `web/` after `vercel link`), or use the Vercel dashboard **Deployments** tab.
- **Merge method:** Per repo preference (GitHub default or team convention).
- **Project type:** Web app (marketing site + `/api/inquiry`).
- **Post-deploy health check:** `curl -sf https://konative.com -o /dev/null -w "%{http_code}\n"` (expect `200`). Note: `curl -I` (HEAD) may return `405` on some hosts; use GET without `-I` or open the URL in a browser.

### Custom deploy hooks

- **Pre-merge:** `cd web && npm ci && npm run build && npm run lint`
- **Deploy trigger:** Automatic on merge to `main` (Vercel).
- **Deploy status:** Vercel deployment list / dashboard, or poll `https://konative.com` until the new revision is live.
- **Health check:** https://konative.com (homepage loads; API routes return expected status).

### Environment variables (Vercel)

- Copy from `web/.env.example`. Production: set `INQUIRY_WEBHOOK_URL` (and any others you add) in the Vercel project **Settings → Environment Variables**.

### Notion

- **Project hub (canonical):** [Konative.com — Project Hub](https://www.notion.so/34232e0a547481b39bc1e081765d6df6) (legacy hub: [konative.com Founder OS HUB](https://www.notion.so/34132e0a547481489537d232018bbbb0)). See `docs/notion-setup.md`.
