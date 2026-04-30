# BCER pipeline ETL (BC + Vancouver Island)

Pulls active permitted pipeline geometry from the **BC Energy Regulator GIS Open
Data Portal** and bakes it into PMTiles for the Konative datacenter map.

## Why this exists

The previous `gas` category in the map was sourced from:

- `ca_cer_pipelines` — federal CER pipelines (interprovincial only, no
  Vancouver Island, no provincial distribution).
- `osm_ca_pipelines` — OSM `man_made=pipeline` (sparse contributor coverage in
  BC; almost nothing on Vancouver Island).

The BCER dataset covers **provincially permitted pipelines in BC**, including
**FortisBC Energy Inc.** segments on Vancouver Island and the Sunshine Coast
Coastal Facilities Project that feeds the Island.

## Source

- Portal: https://data-bc-er.opendata.arcgis.com/
- License: Open Government Licence — British Columbia
- Layers consumed:
  - `PASR/PASR_PL_SEGMENT_LN/MapServer/0` — pipeline centre-lines (permitted,
    `STATUS = 'Active'`).
  - `PASR/PASR_PL_INSTALLATION_PT/MapServer/0` — pipeline installation points
    (compressors, meters, etc).

## Tooling

- Node 22 (built-in `fetch`)
- `tippecanoe` (`brew install tippecanoe`)

## Run it

From `web/`:

```bash
# Full BC export (both layers)
npx tsx scripts/etl/bc-er/run.ts

# Vancouver Island only (faster, focused)
npx tsx scripts/etl/bc-er/run.ts --vancouver-island-only

# One layer
npx tsx scripts/etl/bc-er/run.ts --layer bc_er_pipelines_permitted

# Validate without hitting the network or tippecanoe
npx tsx scripts/etl/bc-er/run.ts --dry-run
```

Outputs:

- `web/public/tiles/v1/bc_er_pipelines_permitted.pmtiles`
- `web/public/tiles/v1/bc_er_pipeline_installations_permitted.pmtiles`
- `web/public/tiles/v1/manifest-bcer.json` (also mirrored at
  `tiles/v1/manifest-bcer.json`)

The `/api/v1/layer-manifest` route already merges every `manifest-*.json` in
`public/tiles/v1/`, so the new layers appear in `DataCenterMap` under the **Gas**
toggle as soon as the files exist.

## Caveats

- **FortisBC distribution mains are not public.** BCER permits the transmission
  segments and major installations, not every neighbourhood service line.
- **Vancouver Island bbox** is `[-128.6, 48.2, -122.8, 51.1]` and intentionally
  loose — it includes the Sunshine Coast and the Coastal Facilities feeder so
  the map stays useful at provincial zoom levels.
- The `gas` category currently defaults to **off** in
  `web/src/components/DataCenterMap.tsx`. Flip it on there if we want this
  visible on first paint.
