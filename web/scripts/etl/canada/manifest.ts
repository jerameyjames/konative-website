import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { LAYERS, type LayerConfig } from "./config";

interface LayerRunInfo {
  layerId: string;
  generatedAt: string;
}

export async function writeManifest(runInfo: LayerRunInfo[]): Promise<void> {
  const runInfoMap = new Map(runInfo.map((item) => [item.layerId, item]));
  const generatedAt = new Date().toISOString();

  const layers = LAYERS.map((layer: LayerConfig) => {
    const layerRunInfo = runInfoMap.get(layer.id);
    const lastUpdated = layerRunInfo?.generatedAt || generatedAt;
    return {
      id: layer.id,
      title: layer.title,
      category: layer.category,
      country: "CA",
      tilesUrl: `/${layer.tilesPath}`,
      sourceLayer: layer.sourceLayer,
      minZoom: layer.minZoom,
      maxZoom: layer.maxZoom,
      license: layer.license,
      attribution: layer.attribution,
      sourceUrl: layer.sourceUrl,
      lastUpdated,
      defaultVisible: layer.defaultVisible ?? false,
    };
  });

  const manifest = {
    version: 1,
    generatedAt,
    layers,
  };

  const outputDir = path.resolve(__dirname, "..", "..", "..", "..", "tiles", "v1");
  await mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, "manifest.json");
  await writeFile(outputPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`\nWrote ${outputPath}`);
}
