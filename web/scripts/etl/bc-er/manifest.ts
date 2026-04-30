import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { BC_ER_LAYERS, type BcErLayerConfig } from "./config";
import { repoRoot } from "./utils";

interface LayerRunInfo {
  layerId: string;
  generatedAt: string;
}

export async function writeBcErManifest(
  runInfo: LayerRunInfo[]
): Promise<void> {
  const runInfoMap = new Map(runInfo.map((item) => [item.layerId, item]));
  const generatedAt = new Date().toISOString();

  // Only emit layers that actually built this run, so partial runs (e.g.
  // --layer foo) don't blow away tiles produced by an earlier full run.
  const layers = BC_ER_LAYERS.filter((l) => runInfoMap.has(l.id)).map(
    (layer: BcErLayerConfig) => {
      const info = runInfoMap.get(layer.id)!;
      return {
        id: layer.id,
        title: layer.title,
        category: layer.category,
        country: "CA" as const,
        tilesUrl: `/${layer.tilesPath}`,
        sourceLayer: layer.sourceLayer,
        minZoom: layer.minZoom,
        maxZoom: layer.maxZoom,
        license: "OGL-Provincial" as const,
        attribution: layer.attribution,
        sourceUrl: layer.sourceUrl,
        lastUpdated: info.generatedAt,
        defaultVisible: layer.defaultVisible ?? false,
        geometryHint: layer.geometryHint,
      };
    }
  );

  const manifest = { version: 1, generatedAt, layers };
  const json = JSON.stringify(manifest, null, 2) + "\n";

  // Write to tiles/v1/ (root) and web/public/tiles/v1/
  const destRoot = path.join(repoRoot, "tiles", "v1");
  const destPublic = path.join(repoRoot, "web", "public", "tiles", "v1");

  for (const dir of [destRoot, destPublic]) {
    // eslint-disable-next-line no-await-in-loop
    await mkdir(dir, { recursive: true });
    const outPath = path.join(dir, "manifest-bcer.json");
    // eslint-disable-next-line no-await-in-loop
    await writeFile(outPath, json, "utf8");
    console.log(`  Wrote ${outPath}`);
  }
}
