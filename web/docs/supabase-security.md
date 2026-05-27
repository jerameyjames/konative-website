# Supabase security (konative-intel)

Project: **konative-intel** (`tcbworxmlmxoyzcvdjhh`, `us-west-1`).

This database backs map layers, market intel ingest, and related APIs. Security advisories appear in the [Supabase Dashboard → Database → Security Advisor](https://supabase.com/dashboard/project/tcbworxmlmxoyzcvdjhh/advisors/security).

## What we fixed (2026-05-27)

| Finding | Severity | Remediation |
|--------|----------|-------------|
| Map views (`*_map`, `dc_availability_scores`) used `SECURITY DEFINER` | ERROR | `ALTER VIEW … SET (security_invoker = true)` |
| `touch_interconnection_queue_updated_at` / `get_interconnection_queue_radius` mutable `search_path` | WARN | `SET search_path = public, pg_temp` on functions |
| `newsletter_subscribers` permissive anon INSERT | WARN | Dropped `Allow newsletter signup` (signups are Sanity + Ghost) |
| `st_estimatedextent` callable via REST | WARN | Revoke attempted in migration (see backlog) |

Migrations (repo):

- `web/supabase/migrations/20260527120000_security_advisor_remediation.sql`
- `web/supabase/migrations/20260527120100_postgis_api_hardening.sql`

## Backlog (platform / maintenance window)

These still appear in Security Advisor until a larger PostGIS/pg_net maintenance pass or Supabase support runbook:

1. **`spatial_ref_sys` without RLS (ERROR)** — table is owned by `supabase_admin`; migrations cannot `ENABLE ROW LEVEL SECURITY`. Mitigation applied: revoke `anon` / `authenticated` table privileges. To clear the lint entirely, open [Supabase Support](https://supabase.com/dashboard/support/new) and ask them to enable RLS on `public.spatial_ref_sys` with a read-only policy, or relocate PostGIS per [PostGIS extension docs](https://supabase.com/docs/guides/database/extensions/postgis#troubleshooting).

2. **`postgis` / `pg_net` in `public` (WARN)** — enable extensions in the `extensions` schema on new projects; moving them on this project requires dump → `DROP EXTENSION … CASCADE` → recreate in `extensions` (downtime). Schedule with a backup.

3. **`st_estimatedextent` EXECUTE for `anon` (WARN)** — grants are owned by `supabase_admin`; revokes from migration role may not stick. Long-term fix is moving PostGIS out of `public` or support-assisted privilege lockdown.

## Staying on top of advisories

### Weekly (automated)

GitHub Actions workflow **Supabase security lint** (`.github/workflows/supabase-security-lint.yml`):

- Runs on PRs that touch `web/supabase/**` and every Monday 12:00 UTC.
- Requires repo secret **`SUPABASE_ACCESS_TOKEN`** (personal access token with project read access).
- Fails the job on **ERROR**-level lints.

### After schema changes

From `web/`:

```bash
export SUPABASE_ACCESS_TOKEN=your_token
npx supabase db lint --linked --fail-on error
```

Or from repo root:

```bash
./scripts/check-supabase-security.sh
```

### Manual dashboard review

1. Open [Security Advisor](https://supabase.com/dashboard/project/tcbworxmlmxoyzcvdjhh/advisors/security) and [Performance Advisor](https://supabase.com/dashboard/project/tcbworxmlmxoyzcvdjhh/advisors/performance).
2. Triage new **ERROR** items before merge/deploy.
3. Track **WARN** items in this doc or Notion ops board.

### Postgres logs

Routine connection/checkpoint logs are normal. Investigate **ERROR** / **FATAL** in Dashboard → Logs → Postgres. Cron jobs calling `net.http_post` for RSS ingest are expected.

## Related env vars

See `web/.env.local.example` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`). Never expose the service role key to the browser.
