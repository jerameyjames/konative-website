import {
  BC_ER_LAYERS,
  VANCOUVER_ISLAND_BBOX,
  getBcErLayer,
} from "./config";
import { writeBcErManifest } from "./manifest";
import { runBcErLayerPipeline } from "./pipeline";
import {
  cleanBuildDir,
  commandExists,
  ensureBuildDirs,
} from "./utils";

interface CliOptions {
  layer?: string;
  vancouverIslandOnly: boolean;
  dryRun: boolean;
}

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = { vancouverIslandOnly: false, dryRun: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--layer" && argv[i + 1]) {
      options.layer = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg === "--vancouver-island-only") {
      options.vancouverIslandOnly = true;
      continue;
    }
    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      console.log(`Usage: npx tsx scripts/etl/bc-er/run.ts [options]

Options:
  --layer <layerId>            Run a single layer only
  --vancouver-island-only      Restrict the export to the Vancouver Island bbox
  --dry-run                    Validate config + tooling only

Layer IDs:
${BC_ER_LAYERS.map((l) => `  ${l.id}`).join("\n")}

Source: BC Energy Regulator GIS Open Data Portal
        https://data-bc-er.opendata.arcgis.com/
License: Open Government Licence — British Columbia
`);
      process.exit(0);
    }
  }
  return options;
}

async function assertTooling(): Promise<void> {
  if (!(await commandExists("tippecanoe"))) {
    throw new Error(
      "Missing required tool: tippecanoe. Install with: brew install tippecanoe"
    );
  }
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));

  if (options.dryRun) {
    console.log("Dry run: validating config (skipping tooling checks).");
    if (options.layer) {
      const one = getBcErLayer(options.layer);
      console.log(`Layer selected: ${one.id}`);
    } else {
      console.log(
        `Layers configured: ${BC_ER_LAYERS.map((l) => l.id).join(", ")}`
      );
    }
    if (options.vancouverIslandOnly) {
      console.log(`Bbox: [${VANCOUVER_ISLAND_BBOX.join(", ")}]`);
    }
    console.log("Dry run OK.");
    return;
  }

  await assertTooling();
  await cleanBuildDir();
  await ensureBuildDirs();

  const targets = options.layer ? [getBcErLayer(options.layer)] : BC_ER_LAYERS;
  const fetchOpts = options.vancouverIslandOnly
    ? { bbox: VANCOUVER_ISLAND_BBOX }
    : {};

  if (options.vancouverIslandOnly) {
    console.log(
      `Scoping to Vancouver Island bbox: [${VANCOUVER_ISLAND_BBOX.join(", ")}]`
    );
  }

  const results: Array<{
    layerId: string;
    fileSizeBytes: number;
    generatedAt: string;
  }> = [];

  for (const layer of targets) {
    // eslint-disable-next-line no-await-in-loop
    const result = await runBcErLayerPipeline(layer, fetchOpts);
    results.push({
      layerId: result.layerId,
      fileSizeBytes: result.fileSizeBytes,
      generatedAt: result.generatedAt,
    });
  }

  await writeBcErManifest(results);

  console.log("\n── Summary ──");
  for (const r of results) {
    console.log(
      `  ${r.layerId}: ${(r.fileSizeBytes / 1024 / 1024).toFixed(2)} MB`
    );
  }
  console.log("\nBCER ETL complete.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
