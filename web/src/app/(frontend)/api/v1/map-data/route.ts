/**
 * GET /api/v1/map-data
 *
 * Returns all map layers as parallel GeoJSON FeatureCollections:
 *   - projects    : Sanity dataCenterProject (OSM, Wikidata, news extraction)
 *   - facilities  : dc_facilities (IM3 Atlas)
 *   - network     : network_facilities (PeeringDB)
 *   - power       : generation_pipeline (EIA-860M, top 500 by MW)
 *
 * Layers with no data return empty FeatureCollections — the map still renders.
 */

import { NextResponse } from "next/server";
import { createClient as createSanity } from "@sanity/client";
import { createClient as createSupabase } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const sanity = createSanity({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const supabase = createSupabase(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── helpers ──────────────────────────────────────────────────────────────────

function point(lng: number, lat: number) {
  return { type: "Point" as const, coordinates: [lng, lat] };
}

function fc(features: GeoJSON.Feature[]) {
  return { type: "FeatureCollection" as const, features };
}

// ── fetchers ─────────────────────────────────────────────────────────────────

async function fetchProjects() {
  try {
    const rows = await sanity.fetch(`*[_type == "dataCenterProject" && defined(location)]{
      _id, name, operator, location, city, state, country,
      status, capacityMw, source, sourceUrl
    }`);
    const features = rows.map((p: {
      _id: string; name: string; operator?: string;
      location: { lat: number; lng: number };
      city?: string; state?: string; country: string;
      status: string; capacityMw?: number; source: string; sourceUrl?: string;
    }) => ({
      type: "Feature" as const,
      geometry: point(p.location.lng, p.location.lat),
      properties: {
        layer: "projects",
        id: p._id, name: p.name, operator: p.operator,
        city: p.city, state: p.state, country: p.country,
        status: p.status, mw: p.capacityMw || 0,
        source: p.source, sourceUrl: p.sourceUrl,
      },
    }));
    return { features, total: features.length };
  } catch {
    return { features: [], total: 0 };
  }
}

async function fetchFacilities() {
  try {
    const { data, error } = await supabase
      .from("dc_facilities")
      .select("id,name,operator,city,state,country,status,capacity_mw,facility_type,source,source_url,location")
      .limit(2000);
    if (error || !data) return { features: [], total: 0 };

    const features = data
      .filter((r) => r.location)
      .map((r) => {
        // location is a PostGIS geography — Supabase returns it as WKT or GeoJSON string
        const coords = parseLocation(r.location);
        if (!coords) return null;
        return {
          type: "Feature" as const,
          geometry: point(coords[0], coords[1]),
          properties: {
            layer: "facilities",
            id: r.id, name: r.name, operator: r.operator,
            city: r.city, state: r.state, country: r.country,
            status: r.status, mw: r.capacity_mw || 0,
            facilityType: r.facility_type, source: r.source,
            sourceUrl: r.source_url,
          },
        };
      })
      .filter(Boolean) as GeoJSON.Feature[];

    return { features, total: features.length };
  } catch {
    return { features: [], total: 0 };
  }
}

async function fetchNetwork() {
  try {
    const { data, error } = await supabase
      .from("network_facilities")
      .select("pdb_id,name,org_name,city,state,country,net_count,ix_count,carrier_count,status,location")
      .limit(2000);
    if (error || !data) return { features: [], total: 0 };

    const features = data
      .filter((r) => r.location)
      .map((r) => {
        const coords = parseLocation(r.location);
        if (!coords) return null;
        return {
          type: "Feature" as const,
          geometry: point(coords[0], coords[1]),
          properties: {
            layer: "network",
            id: r.pdb_id, name: r.name, org_name: r.org_name,
            city: r.city, state: r.state, country: r.country,
            net_count: r.net_count, ix_count: r.ix_count,
            carrier_count: r.carrier_count, status: r.status,
            source: "peeringdb",
          },
        };
      })
      .filter(Boolean) as GeoJSON.Feature[];

    return { features, total: features.length };
  } catch {
    return { features: [], total: 0 };
  }
}

async function fetchPower() {
  try {
    const { data, error } = await supabase
      .from("generation_pipeline")
      .select("plant_id,plant_name,utility_name,state,county,technology,capacity_mw,planned_year,status_code,balancing_authority,location")
      .not("location", "is", null)
      .not("capacity_mw", "is", null)
      .gte("planned_year", new Date().getFullYear())
      .order("capacity_mw", { ascending: false })
      .limit(500);
    if (error || !data) return { features: [], total: 0 };

    const features = data.map((r) => {
      const coords = parseLocation(r.location);
      if (!coords) return null;
      return {
        type: "Feature" as const,
        geometry: point(coords[0], coords[1]),
        properties: {
          layer: "power",
          id: r.plant_id, name: r.plant_name,
          utilityName: r.utility_name, state: r.state, county: r.county,
          technology: r.technology, mw: r.capacity_mw,
          plannedYear: r.planned_year, statusCode: r.status_code,
          ba: r.balancing_authority, source: "eia_860m",
        },
      };
    }).filter(Boolean) as GeoJSON.Feature[];

    return { features, total: features.length };
  } catch {
    return { features: [], total: 0 };
  }
}

// Parse Supabase geography string. Returns [lng, lat] or null.
// Supabase returns GEOGRAPHY as WKT: "POINT(-77.03 38.90)" or GeoJSON text
function parseLocation(loc: unknown): [number, number] | null {
  if (!loc) return null;
  const s = String(loc);
  // WKT POINT
  const wkt = s.match(/POINT\s*\(([^ ]+)\s+([^ )]+)\)/i);
  if (wkt) return [parseFloat(wkt[1]), parseFloat(wkt[2])];
  // GeoJSON object
  try {
    const g = JSON.parse(s);
    if (g.type === "Point" && Array.isArray(g.coordinates)) {
      return [g.coordinates[0], g.coordinates[1]];
    }
  } catch { /* ignore */ }
  return null;
}

// ── handler ───────────────────────────────────────────────────────────────────

export async function GET() {
  const [projects, facilities, network, power] = await Promise.all([
    fetchProjects(),
    fetchFacilities(),
    fetchNetwork(),
    fetchPower(),
  ]);

  return NextResponse.json({
    layers: {
      projects: fc(projects.features),
      facilities: fc(facilities.features),
      network: fc(network.features),
      power: fc(power.features),
    },
    counts: {
      projects: projects.total,
      facilities: facilities.total,
      network: network.total,
      power: power.total,
      total: projects.total + facilities.total + network.total + power.total,
    },
  });
}
