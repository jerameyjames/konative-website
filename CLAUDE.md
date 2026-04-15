# Konative (repo)

Agent context for the monorepo: app code lives in **`web/`** (Next.js 16 + Payload CMS). See `web/AGENTS.md` for site-specific rules.

## Deploy Configuration (configured by /setup-deploy)

- **Platform:** Vercel (Next.js 16 + Payload in `web/`)
- **Vercel project:** `tolowastudioincubator/konative-site` — link and run **`vercel deploy`** from the **repository root** (`.vercel/` lives at root). **Root Directory must be `web`** (Vercel Dashboard → Project → Settings → General → Root Directory). If it is left as `.`, builds fail with “No Next.js version detected” or missing `vercel-build`. Do **not** run `vercel link` only inside `web/` or builds resolve to `web/web` and break.
- **Naming:** The **GitHub** repository slug is `konative-website`; the **only** Vercel project for this app is **`konative-site`**. A duplicate Vercel project that reused the GitHub name was **removed**—do not recreate it or point domains at it.
- **Framework:** Project should use the **Next.js** preset on Vercel. If `*.vercel.app` returns **NOT_FOUND** despite a successful build, set **Framework Preset** to Next.js (or redeploy after it is set).
- **Production URL:** https://konative.com (preview: https://konative-site.vercel.app until custom domain is attached to this project)
- **Git remote:** https://github.com/jerameyjames/konative-website (`main`) — repo name only; deploy target is **`konative-site`** on Vercel.
- **Vercel project root:** set **Root Directory** to `web` in the Vercel project settings (this repo is not only the Next app at the filesystem root).
- **No Vercel project yet:** Run **`./scripts/vercel-bootstrap.sh`** from the repo root (after `npm i -g vercel` and `vercel login`). It builds `web/`, creates the project if needed, **`vercel link`** at **repo root**, **`vercel git connect`**, and optional **`--deploy`**. Until Git is connected, **pushing to GitHub does not deploy**.
- **Deploy workflow:** After the project exists and **Git is connected** with **Root Directory = `web`**, auto-deploy on push to `main`; preview deployments on PRs (default Vercel Git integration).
- **Deploy status command:** `vercel ls --prod` (from `web/` after `vercel link`), or use the Vercel dashboard **Deployments** tab.
- **Merge method:** Per repo preference (GitHub default or team convention).
- **Project type:** Web app (marketing site + `/api/inquiry`).
- **Post-deploy health check:** `curl -sf https://konative.com -o /dev/null -w "%{http_code}\n"` (expect `200`). Note: `curl -I` (HEAD) may return `405` on some hosts; use GET without `-I` or open the URL in a browser. **HTTP 200 alone is not enough:** if DNS still points at parking or forwarding, the body will not be this Next.js app (see **Registrar DNS** below).

### Registrar DNS (external — required for konative.com)

Pushing to **Git** updates the Vercel deployment. **DNS at the registrar** is what makes **konative.com** hit that deployment. This step is part of shipping to production, not optional polish.

1. **Add domains in Vercel:** Project → **Settings → Domains** → add `konative.com` and `www.konative.com` (or `vercel domains add` from `web/` after `vercel link`).
2. **Read the exact records Vercel expects** (authoritative; IPs/CNAME targets can be project-specific):

   ```bash
   cd web && vercel domains inspect konative.com
   ```

3. **General-purpose defaults** from [Vercel: Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain) — **always reconcile with `inspect` output**:

   | Host | Type | Value |
   |------|------|--------|
   | `@` | **A** | `76.76.21.21` |
   | `www` | **CNAME** | `cname.vercel-dns-0.com` |

4. **At the registrar (e.g. GoDaddy):** create or update those records. **Remove** domain **forwarding**, **masking**, **parking**, and any conflicting **A** records. Those produce `/lander`, syndicated placeholder pages, or non-Konative content even when Git and Vercel are correct.

5. **CAA:** If the zone has CAA records, allow Let’s Encrypt per [Vercel: A record and CAA](https://vercel.com/kb/guide/a-record-and-caa-with-vercel) (e.g. `0 issue "letsencrypt.org"`).

6. **Verify before calling deploy “done”:**

   - `vercel domains inspect konative.com` shows **Valid** configuration.
   - `curl -sL https://konative.com/ | head -c 400` shows real **HTML from this app**, not a one-line `window.location` to `/lander` or a parked domain shell.

### Custom deploy hooks

- **Pre-merge:** `cd web && npm ci && npm run build`
- **Deploy trigger:** Automatic on merge to `main` (Vercel).
- **Deploy status:** Vercel deployment list / dashboard, or poll `https://konative.com` until the new revision is live.
- **Health check:** https://konative.com (homepage loads; API routes return expected status).

### Environment variables (Vercel)

- Copy from `web/.env.example` (create one locally if missing). Production must include Payload + DB: **`DATABASE_URI`** (preferred), or **`POSTGRES_URL`** / **`DATABASE_URL`** if your host only injects those, plus `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL`, and optional `BLOB_READ_WRITE_TOKEN` / `INQUIRY_WEBHOOK_URL` per `web/docs/database-setup.md`.

### Notion

- **Project hub (canonical):** [Konative.com — Project Hub](https://www.notion.so/34232e0a547481b39bc1e081765d6df6) (legacy hub: [konative.com Founder OS HUB](https://www.notion.so/34132e0a547481489537d232018bbbb0)). See `docs/notion-setup.md`.
