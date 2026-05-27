#!/usr/bin/env bash
# Run Supabase Database Linter against konative-intel. Fails on ERROR-level findings.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB="$ROOT/web"

if [[ -z "${SUPABASE_ACCESS_TOKEN:-}" ]]; then
  echo "SUPABASE_ACCESS_TOKEN is required (Supabase Dashboard → Account → Access Tokens)." >&2
  exit 1
fi

cd "$WEB"
npx --yes supabase@latest db lint --linked --fail-on error

echo "Supabase security lint: no ERROR-level findings."
