import { LAYERS, getLayer } from "./config";
import { writeManifest } from "./manifest";
import { runLayerPipeline } from "./pipeline";
import { cleanBuildDir, commandExists, ensureBuildDirs } from "./utils";

interface CliOptions {
  layer?: string;
  skipUpload: boolean;
  dryRun: boolean;
}

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    skipUpload: false,
    dryRun: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--layer" && argv[i + 1]) {
      options.layer = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg === "--skip-upload") {
      options.skipUpload = true;
      continue;
    }
    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      console.log(`Usage: npx tsx scripts/etl/phase3-social/run.ts [options]

Options:
  --layer <layerId>   Run a single layer only
                      Choices: ${LAYERS.map((l) => l.id).join(", ")}
  --skip-upload       Skip R2 upload step (copies to tiles/v1/ instead)
  --dry-run           Validate config + tooling only, no downloads
  --help, -h          Show this help message
`);
      process.exit(0);
    }
  }

  return options;
}

async function assertTooling(): Promise<void> {
  const required = ["ogr2ogr", "tippecanoe", "unzip"];
  const missing: string[] = [];
  for (const cmd of required) {
    // eslint-disable-next-line no-await-in-loop
    const ok = await commandExists(cmd);
    if (!ok) missing.push(cmd);
  }
  if (missing.length > 0) {
    throw new Error(
      `Missing required tooling: ${missing.join(", ")}. Install with your package manager before running ETL.`
    );
  }
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));

  if (options.dryRun) {
    console.log("Dry run: validating config (skipping tooling checks).");
    if (options.layer) {
      const one = getLayer(options.layer);
      console.log(`Layer selected: ${one.id} (${one.sourceType})`);
    } else {
      console.log(
        `Layers configured:\n${LAYERS.map((l) => `  ${l.id} [${l.sourceType}]`).join("\n")}`
      );
    }
    console.log("Dry run OK.");
    return;
  }

  await assertTooling();
  await cleanBuildDir();
  await ensureBuildDirs();

  const targets = options.layer ? [getLayer(options.layer)] : LAYERS;
  const results: Array<{ layerId: string; generatedAt: string }> = [];

  for (const layer of targets) {
    // eslint-disable-next-line no-await-in-loop
    const result = await runLayerPipeline(layer, { skipUpload: options.skipUpload });
    results.push({ layerId: result.layerId, generatedAt: result.generatedAt });
  }

  await writeManifest(results);
  console.log("\nPhase 3 social ETL complete.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
