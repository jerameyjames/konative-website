-- Konative Phase 2: PostGIS schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- 1. Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Data center facilities (IM3 Atlas + future manual entries)
CREATE TABLE IF NOT EXISTS dc_facilities (
  id            BIGSERIAL PRIMARY KEY,
  source_id     TEXT,
  source        TEXT NOT NULL,          -- 'im3', 'manual'
  name          TEXT NOT NULL,
  operator      TEXT,
  city          TEXT,
  state         TEXT,
  county        TEXT,
  country       TEXT DEFAULT 'US',
  sqft          INTEGER,
  capacity_mw   NUMERIC,
  status        TEXT DEFAULT 'operational',
  facility_type TEXT,
  location      GEOGRAPHY(POINT, 4326) NOT NULL,
  source_url    TEXT,
  ingested_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Network / colocation facilities (PeeringDB)
CREATE TABLE IF NOT EXISTS network_facilities (
  id            BIGSERIAL PRIMARY KEY,
  pdb_id        INTEGER UNIQUE,
  name          TEXT NOT NULL,
  org_name      TEXT,
  city          TEXT,
  state         TEXT,
  country       TEXT,
  net_count     INTEGER,
  ix_count      INTEGER,
  carrier_count INTEGER,
  status        TEXT,
  location      GEOGRAPHY(POINT, 4326) NOT NULL,
  ingested_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Planned generation pipeline (EIA-860M)
CREATE TABLE IF NOT EXISTS generation_pipeline (
  id              BIGSERIAL PRIMARY KEY,
  plant_id        TEXT,
  plant_name      TEXT NOT NULL,
  utility_name    TEXT,
  state           TEXT,
  county          TEXT,
  technology      TEXT,
  capacity_mw     NUMERIC,
  planned_year    INTEGER,
  planned_month   INTEGER,
  status_code     TEXT,
  balancing_authority TEXT,
  location        GEOGRAPHY(POINT, 4326),
  ingested_at     TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Spatial indexes
CREATE INDEX IF NOT EXISTS dc_facilities_location_idx
  ON dc_facilities USING GIST(location);
CREATE INDEX IF NOT EXISTS network_facilities_location_idx
  ON network_facilities USING GIST(location);
CREATE INDEX IF NOT EXISTS generation_pipeline_location_idx
  ON generation_pipeline USING GIST(location)
  WHERE location IS NOT NULL;

-- 6. Source registry
CREATE TABLE IF NOT EXISTS data_sources (
  id               BIGSERIAL PRIMARY KEY,
  key              TEXT UNIQUE NOT NULL,
  name             TEXT NOT NULL,
  url              TEXT,
  source_type      TEXT,
  last_ingested_at TIMESTAMPTZ,
  record_count     INTEGER DEFAULT 0,
  notes            TEXT
);

INSERT INTO data_sources (key, name, url, source_type, notes) VALUES
  ('im3',      'IM3 Open Source Data Center Atlas',
               'https://github.com/IMMM-SFA/datacenter-atlas',
               'download', '105 point + 1,239 building + 135 campus records (GeoPackage)'),
  ('peeringdb','PeeringDB Facilities',
               'https://www.peeringdb.com/api/fac',
               'api', 'Free REST API — colocation/IX facilities, net_count indicates density'),
  ('eia_860m', 'EIA-860M Planned Generators',
               'https://www.eia.gov/electricity/data/eia860m/',
               'download', 'Monthly Excel — planned utility-scale generators by county/state')
ON CONFLICT (key) DO NOTHING;

-- 7. RLS: allow anon reads (scripts use service_role for writes)
ALTER TABLE dc_facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE network_facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_pipeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_sources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read dc_facilities"
  ON dc_facilities FOR SELECT TO anon USING (true);
CREATE POLICY "public read network_facilities"
  ON network_facilities FOR SELECT TO anon USING (true);
CREATE POLICY "public read generation_pipeline"
  ON generation_pipeline FOR SELECT TO anon USING (true);
CREATE POLICY "public read data_sources"
  ON data_sources FOR SELECT TO anon USING (true);
