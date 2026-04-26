/**
 * Seed network_facilities from PeeringDB.
 *
 * Source: https://www.peeringdb.com/api/fac
 * Free, no auth required. Full dump ~2,500 facilities globally.
 *
 * Usage (from web/):
 *   SUPABASE_SERVICE_ROLE_KEY=<key> npx tsx scripts/seed-peeringdb.ts
 *
 * Optionally filter to North America only:
 *   PEERINGDB_COUNTRY=US,CA npx tsx scripts/seed-peeringdb.ts
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tcbworxmlmxoyzcvdjhh.supabase.co";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SERVICE_ROLE_KEY) {
  console.error("ERROR: SUPABASE_SERVICE_ROLE_KEY required.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const COUNTRY_FILTER = (process.env.PEERINGDB_COUNTRY ?? "US,CA,MX")
  .split(",")
  .map((c) => c.trim().toUpperCase());

interface PdbFacility {
  id: number;
  name: string;
  org_name: string;
  city: string;
  state: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  net_count: number;
  ix_count: number;
  carrier_count: number;
  status: string;
}

async function fetchAll(): Promise<PdbFacility[]> {
  const url = "https://www.peeringdb.com/api/fac?depth=0";
  console.log("Fetching PeeringDB facilities…");
  const res = await fetch(url, {
    headers: { "User-Agent": "konative-ingest/1.0 (konative.com)" },
  });
  if (!res.ok) throw new Error(`PeeringDB HTTP ${res.status}`);
  const data = (await res.json()) as { data: PdbFacility[] };
  return data.data;
}

async function main() {
  const all = await fetchAll();
  console.log(`  ${all.length} total facilities from PeeringDB`);

  const filtered = all.filter(
    (f) =>
      COUNTRY_FILTER.includes(f.country?.toUpperCase()) &&
      f.latitude != null &&
      f.longitude != null
  );
  console.log(`  ${filtered.length} after filtering to ${COUNTRY_FILTER.join(",")} with coordinates`);

  const records = filtered.map((f) => ({
    pdb_id: f.id,
    name: f.name,
    org_name: f.org_name ?? null,
    city: f.city ?? null,
    state: f.state ?? null,
    country: f.country ?? null,
    net_count: f.net_count ?? 0,
    ix_count: f.ix_count ?? 0,
    carrier_count: f.carrier_count ?? 0,
    status: f.status ?? "ok",
    location: `POINT(${f.longitude} ${f.latitude})`,
  }));

  const BATCH = 100;
  let inserted = 0;
  for (let i = 0; i < records.length; i += BATCH) {
    const batch = records.slice(i, i + BATCH);
    const { error } = await supabase
      .from("network_facilities")
      .upsert(batch, { onConflict: "pdb_id" });
    if (error) {
      console.error(`  ✗ batch ${i}:`, error.message);
    } else {
      inserted += batch.length;
      process.stdout.write(`\r  upserted ${inserted}/${records.length}`);
    }
  }
  console.log("\n  ✓ Done.");

  await supabase
    .from("data_sources")
    .update({ last_ingested_at: new Date().toISOString(), record_count: inserted })
    .eq("key", "peeringdb");

  console.log(`\nPeeringDB seed complete. ${inserted} network facilities upserted.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
