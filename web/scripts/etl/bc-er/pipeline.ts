import { copyFile, mkdir } from "node:fs/promises";
import { statSync } from "node:fs";
import path from "node:path";
import type { BcErLayerConfig } from "./config";
import { fetchLayerGeoJson, type FetchOptions } from "./fetch";
import { buildRoot, repoRoot, runCommand } from "./utils";

export interface BcErLayerRunResult {
  layerId: string;
  tilesPath: string;
  fileSizeBytes: number;
  featureCount: number;
  generatedAt: string;
}

/**
 * Full BCER → PMTiles pipeline for one layer:
 *   1. Paginated GeoJSON fetch from the BCER ArcGIS service
 *   2. tippecanoe → PMTiles
 *   3. Copy to web/public/tiles/v1/ and tiles/v1/
 */
export async function runBcErLayerPipeline(
  config: BcErLayerConfig,
  options: FetchOptions = {}
): Promise<BcErLayerRunResult> {
  console.log(`\n=== ${config.id} ===`);

  // Step 1 — fetch GeoJSON (paginated, WGS84)
  const geoJsonOut = await fetchLayerGeoJson(config, options);

  // Step 2 — tippecanoe → PMTiles
  const pmtilesOut = path.join(buildRoot, "pmtiles", `${config.id}.pmtiles`);
  console.log(`tippecanoe → ${pmtilesOut}`);
  await runCommand("tippecanoe", [
    "--force",
    "--read-parallel",
    "--drop-densest-as-needed",
    `-Z${config.minZoom}`,
    `-z${config.maxZoom}`,
    "--layer",
    config.sourceLayer,
    "-o",
    pmtilesOut,
    geoJsonOut,
  ]);

  const fileSizeBytes = statSync(pmtilesOut).size;
  console.log(`  PMTiles size: ${(fileSizeBytes / 1024 / 1024).toFixed(2)} MB`);

  // Step 3 — copy to both public tile directories (mirrors osm-canada)
  const destPublic = path.join(
    repoRoot,
    "web",
    "public",
    "tiles",
    "v1",
    `${config.id}.pmtiles`
  );
  const destRoot = path.join(repoRoot, "tiles", "v1", `${config.id}.pmtiles`);

  await mkdir(path.dirname(destPublic), { recursive: true });
  await mkdir(path.dirname(destRoot), { recursive: true });
  await copyFile(pmtilesOut, destPublic);
  await copyFile(pmtilesOut, destRoot);
  console.log(`  Copied → web/public/tiles/v1/${config.id}.pmtiles`);
  console.log(`  Copied → tiles/v1/${config.id}.pmtiles`);

  return {
    layerId: config.id,
    tilesPath: config.tilesPath,
    fileSizeBytes,
    featureCount: 0, // populated by caller if it wants to track
    generatedAt: new Date().toISOString(),
  };
}
