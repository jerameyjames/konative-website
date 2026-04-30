import type { LayerCategory } from "@/types/map-layers";

export interface BcErLayerConfig {
  id: string;
  title: string;
  category: LayerCategory;
  /** ArcGIS FeatureServer/MapServer layer URL (no /query). */
  serviceUrl: string;
  /** ArcGIS WHERE clause used for the export. */
  where: string;
  /** Geometry hint for the rendered MapLibre sub-layer. */
  geometryHint: "line" | "point";
  /** tippecanoe --layer value; must match sourceLayer in manifest. */
  sourceLayer: string;
  tilesPath: `tiles/v1/${string}.pmtiles`;
  minZoom: number;
  maxZoom: number;
  attribution: string;
  defaultVisible?: boolean;
  /** Source page shown in /licenses and credits popover. */
  sourceUrl: string;
}

const BcErAttr =
  "© BC Energy Regulator (Open Government Licence — British Columbia)";

/**
 * Vancouver Island bounding box in WGS84 (lng,lat).
 * Used when running with --vancouver-island-only to scope the export.
 * Loose enough to also pick up Sunshine Coast / lower mainland feeds that
 * supply the Island via the Coastal Facilities Project.
 */
export const VANCOUVER_ISLAND_BBOX: [number, number, number, number] = [
  -128.6, 48.2, -122.8, 51.1,
];

export const BC_ER_LAYERS: BcErLayerConfig[] = [
  {
    id: "bc_er_pipelines_permitted",
    title: "BC pipelines — permitted (BCER)",
    category: "gas",
    serviceUrl:
      "https://geoweb-ags.bc-er.ca/arcgis/rest/services/PASR/PASR_PL_SEGMENT_LN/MapServer/0",
    where: "STATUS = 'Active'",
    geometryHint: "line",
    sourceLayer: "bc_er_pipelines_permitted",
    tilesPath: "tiles/v1/bc_er_pipelines_permitted.pmtiles",
    minZoom: 4,
    maxZoom: 14,
    attribution: BcErAttr,
    defaultVisible: true,
    sourceUrl:
      "https://data-bc-er.opendata.arcgis.com/datasets/bc-er::pipeline-segments-permitted",
  },
  {
    id: "bc_er_pipeline_installations_permitted",
    title: "BC pipeline installations — permitted (BCER)",
    category: "gas",
    serviceUrl:
      "https://geoweb-ags.bc-er.ca/arcgis/rest/services/PASR/PASR_PL_INSTALLATION_PT/MapServer/0",
    where: "1=1",
    geometryHint: "point",
    sourceLayer: "bc_er_pipeline_installations_permitted",
    tilesPath: "tiles/v1/bc_er_pipeline_installations_permitted.pmtiles",
    minZoom: 6,
    maxZoom: 14,
    attribution: BcErAttr,
    defaultVisible: false,
    sourceUrl:
      "https://data-bc-er.opendata.arcgis.com/datasets/bc-er::pipeline-installations-permitted",
  },
];

export function getBcErLayer(id: string): BcErLayerConfig {
  const layer = BC_ER_LAYERS.find((l) => l.id === id);
  if (!layer) {
    throw new Error(
      `Unknown BCER layer "${id}". Expected one of: ${BC_ER_LAYERS.map(
        (l) => l.id
      ).join(", ")}`
    );
  }
  return layer;
}
