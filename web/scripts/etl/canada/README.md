# Canada P0 ETL (Stream A)

This pipeline builds Phase-1 Canada infrastructure PMTiles and writes
`tiles/v1/manifest.json`.

## Layers

- `ca_nrcan_transmission_lines`
- `ca_nrcan_substations`
- `ca_nrcan_power_plants`
- `ca_cer_pipelines`

## Required local tools

- `ogr2ogr` (GDAL)
- `tippecanoe`
- `aws` CLI (only when upload is enabled)

## Required environment

- `R2_BUCKET`
- `R2_ENDPOINT` (for example, `https://<accountid>.r2.cloudflarestorage.com`)
- AWS credentials for R2 (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)

## Run

From `web/`:

```bash
npx tsx scripts/etl/canada/run.ts
```

Single layer:

```bash
npx tsx scripts/etl/canada/run.ts --layer ca_nrcan_power_plants
```

Skip upload:

```bash
npx tsx scripts/etl/canada/run.ts --skip-upload
```

Dry run:

```bash
npx tsx scripts/etl/canada/run.ts --dry-run
```

## Notes

- Source endpoints and filters are configurable in `config.ts` via environment variables.
- `tiles/v1/{layer}.pmtiles` paths are immutable by contract (see `MULTIAGENT.md`).
