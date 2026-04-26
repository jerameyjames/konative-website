/**
 * Seed dc_facilities from the IM3 Open Source Data Center Atlas.
 *
 * Source: https://github.com/IMMM-SFA/datacenter-atlas
 * File:   data_center_database/im3_us_data_center_locations.gpkg  (GeoPackage = SQLite)
 *
 * Usage (from web/):
 *   SUPABASE_SERVICE_ROLE_KEY=<key> npx tsx scripts/seed-im3.ts
 *
 * Requires: better-sqlite3  →  npm i -D better-sqlite3 @types/better-sqlite3
 */

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import https from "https";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tcbworxmlmxoyzcvdjhh.supabase.co";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SERVICE_ROLE_KEY) {
  console.error("ERROR: SUPABASE_SERVICE_ROLE_KEY required.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const GPKG_URL =
  "https://github.com/IMMM-SFA/datacenter-atlas/raw/main/data_center_database/im3_us_data_center_locations.gpkg";
const GPKG_PATH = path.join(process.cwd(), ".tmp-im3.gpkg");

async function download(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const follow = (u: string) =>
      https.get(u, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          follow(res.headers.location!);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} downloading ${u}`));
          return;
        }
        res.pipe(file);
        file.on("finish", () => { file.close(); resolve(); });
      }).on("error", reject);
    follow(url);
  });
}

interface Im3Row {
  id: string | null;
  name: string | null;
  operator: string | null;
  state: string | null;
  state_abb: string | null;
  county: string | null;
  sqft: number | null;
  lat: number;
  lon: number;
  type: string | null;
}

async function main() {
  // Dynamically import better-sqlite3 (devDep)
  let Database: typeof import("better-sqlite3");
  try {
    Database = (await import("better-sqlite3")).default;
  } catch {
    console.error("better-sqlite3 not installed. Run: npm i -D better-sqlite3 @types/better-sqlite3");
    process.exit(1);
  }

  console.log("Downloading IM3 GeoPackage…");
  await download(GPKG_URL, GPKG_PATH);
  console.log("  ✓ Downloaded to", GPKG_PATH);

  const db = new Database(GPKG_PATH, { readonly: true });

  // The GeoPackage has a table matching the filename stem.
  // Columns: fid, geom, id, state, state_abb, state_id, county, county_id,
  //          operator, ref, name, sqft, lon, lat, type
  const rows = db.prepare(
    `SELECT id, name, operator, state, state_abb, county, sqft, lat, lon, type
     FROM point
     WHERE lat IS NOT NULL AND lon IS NOT NULL`
  ).all() as Im3Row[];

  console.log(`  ${rows.length} point records to upsert…`);

  const records = rows.map((r) => ({
    source_id: r.id ?? null,
    source: "im3",
    name: r.name || "Unknown",
    operator: r.operator ?? null,
    state: r.state_abb ?? r.state ?? null,
    county: r.county ?? null,
    country: "US",
    sqft: r.sqft ?? null,
    capacity_mw: null,           // IM3 doesn't include MW
    status: "operational",
    facility_type: r.type ?? null,
    location: `POINT(${r.lon} ${r.lat})`,
    source_url: "https://github.com/IMMM-SFA/datacenter-atlas",
  }));

  // Upsert in batches of 100
  const BATCH = 100;
  let inserted = 0;
  for (let i = 0; i < records.length; i += BATCH) {
    const batch = records.slice(i, i + BATCH);
    const { error } = await supabase
      .from("dc_facilities")
      .upsert(batch, { onConflict: "source_id,source" });
    if (error) {
      console.error(`  ✗ batch ${i}–${i + BATCH - 1}:`, error.message);
    } else {
      inserted += batch.length;
      process.stdout.write(`\r  inserted ${inserted}/${records.length}`);
    }
  }
  console.log("\n  ✓ Done.");

  db.close();
  fs.unlinkSync(GPKG_PATH);

  // Update source registry
  await supabase
    .from("data_sources")
    .update({ last_ingested_at: new Date().toISOString(), record_count: inserted })
    .eq("key", "im3");

  console.log(`\nIM3 seed complete. ${inserted} facilities upserted.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
