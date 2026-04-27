import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { LayerConfig } from "./config";
import { buildRoot, ensureEnv, repoRoot, runCommand } from "./utils";

export interface LayerRunResult {
  layerId: string;
  tilesPath: string;
  generatedAt: string;
}

function buildArcGisGeoJsonUrl(config: LayerConfig): string {
  const params = new URLSearchParams();
  params.set("where", config.where);
  params.set("outFields", config.outFields.join(","));
  params.set("outSR", "4326");
  params.set("f", "geojson");
  params.set("returnGeometry", "true");
  return `${config.esriQueryUrl}?${params.toString()}`;
}

export async function runLayerPipeline(
  config: LayerConfig,
  opts: { skipUpload: boolean }
): Promise<LayerRunResult> {
  const rawGeoJson = path.join(buildRoot, "raw", `${config.id}.geojson`);
  const normalizedGeoJson = path.join(buildRoot, "geojson", `${config.id}.geojson`);
  const outputPmtiles = path.join(buildRoot, "pmtiles", `${config.id}.pmtiles`);
  const sourceUrl = buildArcGisGeoJsonUrl(config);

  console.log(`\n=== ${config.id} ===`);
  console.log(`source: ${sourceUrl}`);

  // Pull source data from ArcGIS endpoint via ogr2ogr.
  await runCommand("ogr2ogr", [
    "-f",
    "GeoJSON",
    rawGeoJson,
    sourceUrl,
    "-nlt",
    "PROMOTE_TO_MULTI",
  ]);

  // Normalize to WGS84 and keep schema stable for tippecanoe.
  await runCommand("ogr2ogr", [
    "-f",
    "GeoJSON",
    normalizedGeoJson,
    rawGeoJson,
    "-t_srs",
    "EPSG:4326",
    "-lco",
    "COORDINATE_PRECISION=6",
    "-nln",
    config.sourceLayer,
  ]);

  // tippecanoe can emit PMTiles when output extension is .pmtiles on modern builds.
  await runCommand("tippecanoe", [
    "--force",
    "--read-parallel",
    "--drop-densest-as-needed",
    "--simplification=10",
    "--minimum-zoom",
    String(config.minZoom),
    "--maximum-zoom",
    String(config.maxZoom),
    "--layer",
    config.sourceLayer,
    "--output",
    outputPmtiles,
    normalizedGeoJson,
  ]);

  if (!opts.skipUpload) {
    const bucket = ensureEnv("R2_BUCKET");
    const endpoint = ensureEnv("R2_ENDPOINT");
    const awsRegion = process.env.AWS_REGION || "auto";

    const objectKey = config.tilesPath;
    console.log(`uploading to r2://${bucket}/${objectKey}`);
    await runCommand("aws", [
      "--region",
      awsRegion,
      "--endpoint-url",
      endpoint,
      "s3",
      "cp",
      outputPmtiles,
      `s3://${bucket}/${objectKey}`,
    ]);
  } else {
    // Copy the built PMTiles into the committed tiles/v1/ directory so the
    // Next.js tile-serving route and git history both have the file.
    const tilesV1Dir = path.join(repoRoot, "tiles", "v1");
    await mkdir(tilesV1Dir, { recursive: true });
    const destPath = path.join(tilesV1Dir, `${config.id}.pmtiles`);
    await copyFile(outputPmtiles, destPath);
    console.log(`Copied ${config.id}.pmtiles → tiles/v1/`);
  }

  return {
    layerId: config.id,
    tilesPath: config.tilesPath,
    generatedAt: new Date().toISOString(),
  };
}
