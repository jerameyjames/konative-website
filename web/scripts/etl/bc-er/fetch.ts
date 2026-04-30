import { writeFile } from "node:fs/promises";
import path from "node:path";
import type { BcErLayerConfig } from "./config";
import { buildRoot } from "./utils";

const PAGE_SIZE = 2000;

interface ArcgisFeatureGeometry {
  type: "Point" | "LineString" | "MultiLineString" | "Polygon" | "MultiPolygon";
  coordinates: unknown;
}

interface ArcgisFeature {
  type: "Feature";
  geometry: ArcgisFeatureGeometry | null;
  properties: Record<string, unknown>;
  id?: number | string;
}

interface ArcgisGeoJsonPage {
  type: "FeatureCollection";
  features: ArcgisFeature[];
  exceededTransferLimit?: boolean;
  properties?: { exceededTransferLimit?: boolean };
}

export interface FetchOptions {
  /** WGS84 envelope: [xmin, ymin, xmax, ymax]. When set, scopes the export. */
  bbox?: [number, number, number, number];
}

/**
 * Pull the entire layer from an ArcGIS FeatureServer/MapServer as one GeoJSON
 * FeatureCollection in WGS84, paginated via `resultOffset`. Returns the local
 * path to the written GeoJSON file under .tmp/etl-bc-er/geojson/.
 */
export async function fetchLayerGeoJson(
  layer: BcErLayerConfig,
  options: FetchOptions = {}
): Promise<string> {
  const out = path.join(buildRoot, "geojson", `${layer.id}.geojson`);
  const features: ArcgisFeature[] = [];
  let offset = 0;
  let pageCount = 0;

  while (true) {
    const params = new URLSearchParams({
      where: layer.where,
      outFields: "*",
      outSR: "4326",
      f: "geojson",
      returnGeometry: "true",
      resultOffset: String(offset),
      resultRecordCount: String(PAGE_SIZE),
      orderByFields: "OBJECTID",
    });

    if (options.bbox) {
      params.set("geometry", options.bbox.join(","));
      params.set("geometryType", "esriGeometryEnvelope");
      params.set("inSR", "4326");
      params.set("spatialRel", "esriSpatialRelIntersects");
    }

    const url = `${layer.serviceUrl}/query?${params.toString()}`;
    // eslint-disable-next-line no-await-in-loop
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(
        `BCER fetch failed (${res.status} ${res.statusText}) for ${layer.id} at offset ${offset}: ${url}`
      );
    }
    // eslint-disable-next-line no-await-in-loop
    const page = (await res.json()) as ArcgisGeoJsonPage;
    const got = page.features?.length ?? 0;
    features.push(...(page.features ?? []));
    pageCount += 1;
    console.log(
      `  page ${pageCount}: +${got} features (running total ${features.length})`
    );

    const exceeded =
      page.exceededTransferLimit === true ||
      page.properties?.exceededTransferLimit === true;
    if (got < PAGE_SIZE && !exceeded) break;
    if (got === 0) break;
    offset += got;
  }

  // Strip Esri-injected `_objectid` collisions and stamp the layer name so
  // tippecanoe sees a stable per-feature identifier when generating tiles.
  for (const f of features) {
    if (f.properties && typeof f.properties === "object") {
      f.properties.__layer = layer.id;
    }
  }

  const fc = { type: "FeatureCollection", features } as const;
  await writeFile(out, JSON.stringify(fc));
  console.log(`  wrote ${out} (${features.length} features)`);
  return out;
}
