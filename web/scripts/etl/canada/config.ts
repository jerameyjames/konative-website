export type LayerId =
  | "ca_nrcan_transmission_lines"
  | "ca_nrcan_substations"
  | "ca_nrcan_power_plants"
  | "ca_cer_pipelines";

export interface LayerConfig {
  id: LayerId;
  title: string;
  category: "power" | "gas";
  sourceLayer: string;
  tilesPath: `tiles/v1/${string}.pmtiles`;
  sourceUrl: string;
  esriQueryUrl: string;
  where: string;
  outFields: string[];
  minZoom: number;
  maxZoom: number;
  license: "OGL-Canada-2.0";
  attribution: string;
  defaultVisible?: boolean;
}

const NRCanAttr =
  "Contains information licensed under the Open Government Licence - Canada.";
const CERAttr =
  "Contains information licensed under the Open Government Licence - Canada (Canada Energy Regulator).";

/**
 * Dataset defaults are intentionally configurable via env so the ETL can be
 * pointed at updated source services without code changes.
 */
export const LAYERS: LayerConfig[] = [
  {
    id: "ca_nrcan_transmission_lines",
    title: "Electric transmission lines (Canada)",
    category: "power",
    sourceLayer: "transmission_lines",
    tilesPath: "tiles/v1/ca_nrcan_transmission_lines.pmtiles",
    sourceUrl:
      "https://open.canada.ca/data/en/dataset/35c51098-5cd8-44b0-b1cd-c8ce2f5dae89",
    esriQueryUrl:
      process.env.CA_TRANSMISSION_QUERY_URL ||
      "https://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_infrastructure_of_north_america_en/MapServer/1/query",
    where: process.env.CA_TRANSMISSION_WHERE || "Country='Canada'",
    outFields: ["*"],
    minZoom: 4,
    maxZoom: 12,
    license: "OGL-Canada-2.0",
    attribution: `NRCan / NACEI. ${NRCanAttr}`,
    defaultVisible: true,
  },
  {
    id: "ca_nrcan_substations",
    title: "Power substations (Canada)",
    category: "power",
    sourceLayer: "substations",
    tilesPath: "tiles/v1/ca_nrcan_substations.pmtiles",
    sourceUrl:
      "https://open.canada.ca/data/en/dataset/3393d1fd-9c20-4854-9acc-dcc504aec275",
    esriQueryUrl:
      process.env.CA_SUBSTATIONS_QUERY_URL ||
      "https://mapservices.gov.yk.ca/arcgis/rest/services/GeoYukon/GY_UtilitiesCommunications/MapServer/8/query",
    where: process.env.CA_SUBSTATIONS_WHERE || "1=1",
    outFields: ["*"],
    minZoom: 5,
    maxZoom: 13,
    license: "OGL-Canada-2.0",
    attribution: `NRCan / Open Government. ${NRCanAttr}`,
  },
  {
    id: "ca_nrcan_power_plants",
    title: "Power plants >=100MW (Canada)",
    category: "power",
    sourceLayer: "power_plants",
    tilesPath: "tiles/v1/ca_nrcan_power_plants.pmtiles",
    sourceUrl:
      "https://open.canada.ca/data/en/dataset/40fbe40c-01cd-49d3-8add-0d20ed64c90d",
    esriQueryUrl:
      process.env.CA_POWER_PLANTS_QUERY_URL ||
      "https://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_infrastructure_of_north_america_en/MapServer/15/query",
    where: process.env.CA_POWER_PLANTS_WHERE || "Country='Canada'",
    outFields: ["*"],
    minZoom: 4,
    maxZoom: 12,
    license: "OGL-Canada-2.0",
    attribution: `NRCan / NACEI. ${NRCanAttr}`,
  },
  {
    id: "ca_cer_pipelines",
    title: "CER regulated pipelines (Canada)",
    category: "gas",
    sourceLayer: "pipelines",
    tilesPath: "tiles/v1/ca_cer_pipelines.pmtiles",
    sourceUrl:
      "https://open.canada.ca/data/en/dataset/16282d1a-383f-4b9e-b703-a3ee21e59dc5",
    esriQueryUrl:
      process.env.CA_PIPELINES_QUERY_URL ||
      "https://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_infrastructure_of_north_america_en/MapServer/2/query",
    where: process.env.CA_PIPELINES_WHERE || "Country='Canada'",
    outFields: ["*"],
    minZoom: 4,
    maxZoom: 12,
    license: "OGL-Canada-2.0",
    attribution: `Canada Energy Regulator / NACEI. ${CERAttr}`,
  },
];

export function getLayer(layerId: string): LayerConfig {
  const layer = LAYERS.find((entry) => entry.id === layerId);
  if (!layer) {
    throw new Error(
      `Unknown layer "${layerId}". Expected one of: ${LAYERS.map((l) => l.id).join(", ")}`
    );
  }
  return layer;
}
