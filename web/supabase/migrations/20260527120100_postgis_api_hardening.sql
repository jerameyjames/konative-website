-- PostGIS catalog is owned by supabase_admin; RLS cannot be enabled via migrations.
-- Revoke API access so spatial_ref_sys is not exposed over PostgREST (lint 0013 mitigation).
revoke all on table public.spatial_ref_sys from anon, authenticated, public;

-- Revoke unused PostGIS SECURITY DEFINER RPCs (map uses views + get_interconnection_queue_radius).
do $$
declare
  fn record;
begin
  for fn in
    select p.oid::regprocedure as sig
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname = 'st_estimatedextent'
  loop
    execute format('revoke all on function %s from anon, authenticated, public', fn.sig);
  end loop;
end $$;

grant execute on function public.get_interconnection_queue_radius(double precision, double precision, double precision) to anon, authenticated;
