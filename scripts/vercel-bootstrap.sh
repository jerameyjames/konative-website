#!/usr/bin/env bash
# First-time Vercel setup for this monorepo.
# IMPORTANT: Run `vercel link` from the REPO ROOT (not web/). Project Root Directory must be `web`
# in Vercel; linking only inside `web/` breaks deploys (double `web/web` path).
# Usage: ./scripts/vercel-bootstrap.sh [--deploy]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WEB="$ROOT/web"
PROJECT="${VERCEL_PROJECT_NAME:-konative-website}"
SCOPE="${VERCEL_TEAM_SLUG:-tolowastudioincubator}"

die() { echo "$*" >&2; exit 1; }

command -v vercel >/dev/null || die "Install Vercel CLI first: npm i -g vercel"
command -v npm >/dev/null || die "npm not found"

echo "== [1/4] Build check (web/) =="
(cd "$WEB" && npm ci && npm run build)

echo ""
echo "== [2/4] Link repo root to Vercel project (creates .vercel in repo root) =="
cd "$ROOT"
if [[ ! -f .vercel/project.json ]]; then
  if ! vercel project inspect "$PROJECT" --scope "$SCOPE" >/dev/null 2>&1; then
    echo "Creating project $PROJECT on team $SCOPE ..."
    vercel project add "$PROJECT" --scope "$SCOPE"
  fi
  vercel link --yes --scope "$SCOPE" --project "$PROJECT"
else
  echo "Already linked (.vercel/project.json present)."
fi

echo ""
echo "== [3/4] Connect GitHub (once) + Root Directory = web =="
GIT_REMOTE=$(git -C "$ROOT" config --get remote.origin.url 2>/dev/null || true)
if [[ -n "$GIT_REMOTE" ]]; then
  echo "Running: vercel git connect \"$GIT_REMOTE\""
  vercel git connect "$GIT_REMOTE" 2>/dev/null || echo "(Git may already be connected; OK.)"
else
  echo "No git remote; connect manually in Vercel → Git."
fi
echo "In Vercel → Project → Settings → General: Root Directory = web"
echo "In Vercel → Project → Settings → General: Framework Preset should be Next.js (auto after first good deploy)."

echo ""
if [[ "${1:-}" == "--deploy" ]]; then
  echo "== [4/4] Production deploy (from repo root) =="
  vercel deploy --prod --yes
else
  echo "== [4/4] Production deploy (optional) =="
  echo "  ./scripts/vercel-bootstrap.sh --deploy"
  echo "or:  cd $ROOT && vercel deploy --prod --yes"
fi

echo ""
echo "== Custom domain =="
echo "  vercel domains add konative.com"
echo "  vercel domains add www.konative.com"
echo "Then registrar DNS per CLAUDE.md (apex A + www CNAME, or nameservers to Vercel)."
