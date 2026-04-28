import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { LAYERS, type LayerConfig } from "./config";
import { repoRoot } from "./utils";

interface LayerRunInfo {
  layerId: string;
  generatedAt: string;
}

export interface LayerManifestEntry {
  id: string;
  title: string;
  category: string;
  country: string;
  tilesUrl: string;
  sourceLayer: string;
  minZoom: number;
  maxZoom: number;
  license: string;
  attribution: string;
  sourceUrl: string;
  lastUpdated: string;
  defaultVisible: boolean;
}

export interface LayerManifest {
  version: number;
  generatedAt: string;
  layers: LayerManifestEntry[];
}

export async function writeManifest(runInfo: LayerRunInfo[]): Promise<void> {
  const runInfoMap = new Map(runInfo.map((item) => [item.layerId, item]));
  const generatedAt = new Date().toISOString();

  const layers: LayerManifestEntry[] = LAYERS.map((layer: LayerConfig) => {
    const layerRunInfo = runInfoMap.get(layer.id);
    const lastUpdated = layerRunInfo?.generatedAt || generatedAt;
    return {
      id: layer.id,
      title: layer.title,
      category: layer.category,
      country: layer.country,
      tilesUrl: `/tiles/v1/${layer.id}.pmtiles`,
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

  const manifest: LayerManifest = {
    version: 1,
    generatedAt,
    layers,
  };

  const outputDir = path.join(repoRoot, "tiles", "v1");
  await mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, "manifest-social.json");
  await writeFile(outputPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`\nWrote ${outputPath}`);
}
