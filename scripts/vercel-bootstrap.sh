#!/usr/bin/env bash
# First-time Vercel setup for this monorepo: create/link project, optional Git + prod deploy.
# Run from repo root: ./scripts/vercel-bootstrap.sh
# With production deploy: ./scripts/vercel-bootstrap.sh --deploy
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WEB="$ROOT/web"
cd "$WEB"

die() { echo "$*" >&2; exit 1; }

command -v vercel >/dev/null || die "Install Vercel CLI first: npm i -g vercel"
command -v npm >/dev/null || die "npm not found"

echo "== [1/3] Build check (web/) =="
npm ci
npm run build

if [[ ! -f .vercel/project.json ]]; then
  echo ""
  echo "== [2/3] Link this directory to a Vercel project =="
  echo "If no project exists yet, the CLI will create one. Pick team and project name (e.g. konative-website)."
  vercel link
else
  echo ""
  echo "== [2/3] Already linked (web/.vercel/project.json present). Skipping vercel link."
fi

echo ""
echo "== Connect GitHub for deploy-on-push (run once if not connected) =="
GIT_REMOTE=$(git -C "$ROOT" config --get remote.origin.url 2>/dev/null || true)
if [[ -n "$GIT_REMOTE" ]]; then
  echo "  cd web && vercel git connect \"$GIT_REMOTE\""
else
  echo "  cd web && vercel git connect https://github.com/jerameyjames/konative-website.git"
fi
echo "Then open Vercel → Project → Settings → General:"
echo "  Root Directory = web   (required: app lives in web/, not repo root)"
echo ""

if [[ "${1:-}" == "--deploy" ]]; then
  echo "== [3/3] Production deploy (CLI) =="
  vercel deploy --prod
else
  echo "== [3/3] Production deploy (optional) =="
  echo "  ./scripts/vercel-bootstrap.sh --deploy"
  echo "or:  cd web && vercel deploy --prod"
fi

echo ""
echo "== Custom domain (konative.com) =="
echo "  cd web && vercel domains add konative.com"
echo "  cd web && vercel domains add www.konative.com"
echo "Configure registrar DNS per CLAUDE.md → Registrar DNS."
