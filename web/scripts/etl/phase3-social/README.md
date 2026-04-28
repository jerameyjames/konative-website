# Phase 3 Social/Land ETL

ETL pipelines for two open social/land GIS datasets (Canada). Outputs PMTiles to `tiles/v1/` and writes `tiles/v1/manifest-social.json`.

## Layers

| Layer ID | Title | Source type | Zoom |
|---|---|---|---|
| `ca_cirnac_indigenous_lands` | Aboriginal Lands of Canada Legislative Boundaries | ESRI REST (paginated) | 3–12 |
| `ca_statcan_census_subdivisions` | Census Subdivisions 2021 | Zip → Shapefile | 5–12 |

### ca_cirnac_indigenous_lands

- **Source:** [CLSS Administrative Boundaries (NRCan / CIRNAC)](https://open.canada.ca/data/en/dataset/b6567c5c-8339-4055-99fa-63f92114d9e4)
- **ESRI endpoint:** `https://proxyinternet.nrcan-rncan.gc.ca/arcgis/rest/services/CLSS-SATC/CLSS_Administrative_Boundaries/MapServer/0/query`
- **Record count:** ~3,366 polygons (reserve and Crown land boundaries)
- **License:** Open Government Licence – Canada

### ca_statcan_census_subdivisions

- **Source:** [Statistics Canada 2021 Census Subdivision Boundaries (generalized)](https://www12.statcan.gc.ca/census-recensement/2021/geo/sip-pis/boundary-limites/index-eng.cfm)
- **Download:** `lcsd000b21a_e.zip` (~200 MB uncompressed)
- **Key fields:** `CSDUID`, `CSDNAME`, `PRNAME`
- **License:** Open Government Licence – Canada

## Usage

```bash
# From web/
npm run etl:phase3-social           # run all layers
npm run etl:phase3-social:dry       # dry-run (validate only)

# Or directly with tsx:
npx tsx scripts/etl/phase3-social/run.ts --layer ca_cirnac_indigenous_lands --skip-upload
npx tsx scripts/etl/phase3-social/run.ts --layer ca_statcan_census_subdivisions --skip-upload
```

`--skip-upload` copies PMTiles to `tiles/v1/` (for local dev / git). Omit it to upload to R2 (requires `R2_BUCKET`, `R2_ENDPOINT` env vars).

## Overriding source URLs

| Env var | Default |
|---|---|
| `CA_CIRNAC_QUERY_URL` | NRCan CLSS ESRI REST endpoint above |
| `CA_CIRNAC_WHERE` | `1=1` |
| `CA_STATCAN_CSD_ZIP_URL` | StatCan 2021 CSD generalized boundary zip |

## Implementation notes

- **CIRNAC ESRI paging:** The CLSS service returns dense polygons; responses exceed JSON parse limits at page sizes >50 with full precision. The pipeline fetches 50 records/page with `geometryPrecision=5`, falls back to HTTP pagination if `ogr2ogr` hits the transfer limit.
- **StatCan:** Downloaded zip (~200 MB), unzipped with `unzip`, converted shapefile → GeoJSON with `ogr2ogr`, then tiled with `tippecanoe`.
- **tippecanoe flags:** `-z12 -Z{minZoom} --drop-smallest-as-needed --simplification=8 --coalesce-smallest-as-needed`
- **Scratch dir:** `.tmp/etl-phase3-social/` (gitignored)
