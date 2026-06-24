-- Remediate Supabase Database Linter security findings (konative-intel).
-- See web/docs/supabase-security.md for rationale and ongoing review process.

-- Map views: respect underlying table RLS (Postgres 15+ security_invoker).
alter view public.dc_facilities_map set (security_invoker = true);
alter view public.generation_pipeline_map set (security_invoker = true);
alter view public.network_facilities_map set (security_invoker = true);
alter view public.dc_availability_scores set (security_invoker = true);

-- Interconnection queue helpers: pin search_path (lint 0011).
create or replace function public.touch_interconnection_queue_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create or replace function public.get_interconnection_queue_radius(
  p_lat double precision,
  p_lng double precision,
  p_radius_km double precision default 50
)
returns table (
  id uuid,
  authority text,
  project_name text,
  capacity_mw numeric,
  resource_type text,
  study_phase text,
  queue_date date,
  expected_cod date,
  poi_name text,
  poi_lat double precision,
  poi_lng double precision,
  source_url text,
  last_updated timestamptz,
  distance_km double precision
)
language sql
stable
set search_path = public, pg_temp
as $$
  with center as (
    select st_setsrid(st_makepoint(p_lng, p_lat), 4326)::geography as geog
  )
  select
    q.id,
    q.authority,
    q.project_name,
    q.capacity_mw,
    q.resource_type,
    q.study_phase,
    q.queue_date,
    q.expected_cod,
    q.poi_name,
    q.poi_lat,
    q.poi_lng,
    q.source_url,
    q.last_updated,
    st_distance(q.poi_geog, c.geog) / 1000.0 as distance_km
  from public.interconnection_queue q
  cross join center c
  where q.poi_geog is not null
    and st_dwithin(q.poi_geog, c.geog, p_radius_km * 1000.0)
  order by distance_km asc, q.capacity_mw desc;
$$;

-- Newsletter signups are Sanity/Ghost-first; remove permissive anon INSERT (lint 0024).
drop policy if exists "Allow newsletter signup" on public.newsletter_subscribers;

-- PostGIS: not used by map API; revoke SECURITY DEFINER RPC exposure (lint 0028/0029).
revoke execute on function public.st_estimatedextent(text, text) from public, anon, authenticated;
revoke execute on function public.st_estimatedextent(text, text, text) from public, anon, authenticated;
revoke execute on function public.st_estimatedextent(text, text, text, boolean) from public, anon, authenticated;
