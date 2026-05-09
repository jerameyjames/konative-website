'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Map, Source, Layer, type MapLayerMouseEvent, type MapRef } from 'react-map-gl/maplibre'
import type { CircleLayerSpecification } from 'maplibre-gl'
import type { Feature, FeatureCollection, Point } from 'geojson'
import 'maplibre-gl/dist/maplibre-gl.css'

const MAP_STYLE = 'https://tiles.openfreemap.org/styles/dark'

type StateCode = 'ALL' | 'NV' | 'WV' | 'FL' | 'OK'

interface StateView {
  code: StateCode
  label: string
  longitude: number
  latitude: number
  zoom: number
}

const STATE_VIEWS: StateView[] = [
  { code: 'ALL', label: 'All four states', longitude: -93, latitude: 36, zoom: 3.6 },
  { code: 'OK', label: 'Oklahoma', longitude: -97.5, latitude: 35.6, zoom: 6 },
  { code: 'NV', label: 'Nevada', longitude: -117, latitude: 39, zoom: 5.7 },
  { code: 'WV', label: 'West Virginia', longitude: -80.5, latitude: 38.7, zoom: 6.5 },
  { code: 'FL', label: 'Florida', longitude: -82.5, latitude: 28, zoom: 5.8 },
]

const STATUS_COLORS: Record<string, string> = {
  stalled: '#f59e0b',
  canceled: '#ef4444',
  paused: '#a78bfa',
  blocked: '#fb7185',
}

const GOVERNOR_COLOR = '#22d3ee'

// ── Layer specs ───────────────────────────────────────────────────────────────

const stalledLayer: CircleLayerSpecification = {
  id: 'stalled-projects',
  type: 'circle',
  source: 'stalled-projects',
  paint: {
    'circle-radius': [
      'interpolate', ['linear'], ['zoom'],
      3, 4,
      6, 7,
      9, 11,
    ],
    'circle-color': [
      'match',
      ['get', 'status'],
      'stalled', STATUS_COLORS.stalled,
      'canceled', STATUS_COLORS.canceled,
      'paused', STATUS_COLORS.paused,
      'blocked', STATUS_COLORS.blocked,
      '#9ca3af',
    ],
    'circle-stroke-width': 1.5,
    'circle-stroke-color': '#0b0f17',
    'circle-opacity': 0.95,
  },
}

const governorLayer: CircleLayerSpecification = {
  id: 'governors',
  type: 'circle',
  source: 'governors',
  paint: {
    'circle-radius': [
      'interpolate', ['linear'], ['zoom'],
      3, 8,
      6, 12,
      9, 16,
    ],
    'circle-color': GOVERNOR_COLOR,
    'circle-stroke-width': 2.5,
    'circle-stroke-color': '#0b0f17',
    'circle-opacity': 0.85,
  },
}

// ── Component ─────────────────────────────────────────────────────────────────

interface GovernorProps {
  id: string
  state: string
  stateName: string
  name: string
  party: string
  termEnds: string
  capitalCity: string
  ngaRole: string
  ngaInitiative: string
  dcPolicyNotes: string
  sources: string[]
}

interface ProjectProps {
  id: string
  name: string
  operator: string
  city: string
  state: string
  status: string
  mw: number | null
  blockReason: string
  blockReasonDetail: string
  ownerFunder: string
  relatedSources: string[]
  stalledAt: string | null
}

type Selected =
  | { kind: 'governor'; data: GovernorProps }
  | { kind: 'project'; data: ProjectProps }
  | null

const EMPTY_FC: FeatureCollection<Point> = { type: 'FeatureCollection', features: [] }

export default function GovernorMapClient() {
  const mapRef = useRef<MapRef | null>(null)
  const [governors, setGovernors] = useState<FeatureCollection<Point>>(EMPTY_FC)
  const [stalled, setStalled] = useState<FeatureCollection<Point>>(EMPTY_FC)
  const [stateView, setStateView] = useState<StateCode>('ALL')
  const [selected, setSelected] = useState<Selected>(null)
  const [loading, setLoading] = useState(true)

  // Load both feature collections in parallel.
  useEffect(() => {
    let cancelled = false
    Promise.all([
      fetch('/api/v1/governor-data?type=governors').then((r) => r.json()),
      fetch('/api/v1/governor-data?type=stalled-projects').then((r) => r.json()),
    ])
      .then(([g, s]) => {
        if (cancelled) return
        if (g?.type === 'FeatureCollection') setGovernors(g)
        if (s?.type === 'FeatureCollection') setStalled(s)
      })
      .catch((e) => console.error('governor-data load', e))
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  // Filter features by selected state.
  const filteredStalled = useMemo<FeatureCollection<Point>>(() => {
    if (stateView === 'ALL') return stalled
    return {
      type: 'FeatureCollection',
      features: stalled.features.filter((f) => f.properties?.state === stateView),
    }
  }, [stalled, stateView])

  const filteredGovernors = useMemo<FeatureCollection<Point>>(() => {
    if (stateView === 'ALL') return governors
    return {
      type: 'FeatureCollection',
      features: governors.features.filter((f) => f.properties?.state === stateView),
    }
  }, [governors, stateView])

  // Active governor for the side card when a state is selected.
  const activeGovernor = useMemo<GovernorProps | null>(() => {
    if (stateView === 'ALL') return null
    const f = governors.features.find((f) => f.properties?.state === stateView) as
      | Feature<Point, GovernorProps>
      | undefined
    return f?.properties ?? null
  }, [governors, stateView])

  // Camera flyTo when state filter changes.
  useEffect(() => {
    const v = STATE_VIEWS.find((s) => s.code === stateView) ?? STATE_VIEWS[0]
    mapRef.current?.flyTo({
      center: [v.longitude, v.latitude],
      zoom: v.zoom,
      duration: 800,
    })
  }, [stateView])

  const onMapClick = useCallback((e: MapLayerMouseEvent) => {
    const feature = e.features?.[0]
    if (!feature) {
      setSelected(null)
      return
    }
    const props = feature.properties as Record<string, unknown>
    if (props?.layer === 'governors') {
      setSelected({ kind: 'governor', data: hydrateGovernor(props) })
    } else if (props?.layer === 'stalled-projects') {
      setSelected({ kind: 'project', data: hydrateProject(props) })
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 56px)' }}>
      {/* Top toolbar */}
      <div className="gov-toolbar">
        <div className="gov-toolbar-title">
          <strong>Governor Brief</strong>
          <span className="gov-subtitle">Stalled / canceled / paused / blocked DC projects</span>
        </div>
        <div className="gov-state-pills">
          {STATE_VIEWS.map((v) => (
            <button
              key={v.code}
              type="button"
              className={`gov-pill ${stateView === v.code ? 'gov-pill-active' : ''}`}
              onClick={() => { setStateView(v.code); setSelected(null) }}
            >
              {v.code === 'ALL' ? 'All' : v.code}
            </button>
          ))}
        </div>
      </div>

      <Map
        ref={(r) => { mapRef.current = r }}
        initialViewState={{ longitude: -93, latitude: 36, zoom: 3.6 }}
        mapStyle={MAP_STYLE}
        interactiveLayerIds={['stalled-projects', 'governors']}
        onClick={onMapClick}
        cursor="pointer"
        style={{ width: '100%', height: '100%' }}
      >
        <Source id="stalled-projects" type="geojson" data={filteredStalled}>
          <Layer {...stalledLayer} />
        </Source>
        <Source id="governors" type="geojson" data={filteredGovernors}>
          <Layer {...governorLayer} />
        </Source>
      </Map>

      {/* Legend */}
      <div className="gov-legend">
        <strong>Status</strong>
        {Object.entries(STATUS_COLORS).map(([k, color]) => (
          <span key={k}>
            <i style={{ background: color }} /> {k}
          </span>
        ))}
        <span style={{ marginLeft: 8 }}>
          <i style={{ background: GOVERNOR_COLOR }} /> Governor (capital)
        </span>
      </div>

      {/* Counts */}
      <div className="gov-counts">
        {loading ? (
          'Loading…'
        ) : (
          <>
            {filteredStalled.features.length} project{filteredStalled.features.length === 1 ? '' : 's'}
            {' · '}
            {filteredGovernors.features.length} governor{filteredGovernors.features.length === 1 ? '' : 's'}
          </>
        )}
      </div>

      {/* Governor card (when a single state is selected) */}
      {activeGovernor && !selected && (
        <aside className="gov-panel">
          <header>
            <span className="gov-state-badge">{activeGovernor.state}</span>
            <h3>{activeGovernor.name}</h3>
            <p className="gov-meta">
              {activeGovernor.party}{activeGovernor.termEnds ? ` · ${activeGovernor.termEnds}` : ''}
            </p>
            {activeGovernor.capitalCity && (
              <p className="gov-meta">Capital: {activeGovernor.capitalCity}</p>
            )}
          </header>
          {activeGovernor.ngaRole && (
            <div className="gov-pill-tag gov-pill-nga">NGA — {activeGovernor.ngaRole}</div>
          )}
          {activeGovernor.ngaInitiative && (
            <p className="gov-initiative">{activeGovernor.ngaInitiative}</p>
          )}
          {activeGovernor.dcPolicyNotes && (
            <section>
              <h4>DC Policy</h4>
              <p>{activeGovernor.dcPolicyNotes}</p>
            </section>
          )}
          {activeGovernor.sources?.length > 0 && (
            <section>
              <h4>Sources</h4>
              <ul>
                {activeGovernor.sources.map((s, i) => (
                  <li key={i}><a href={s} target="_blank" rel="noreferrer">{shortHost(s)}</a></li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      )}

      {/* Selection panel */}
      {selected && (
        <aside className="gov-panel">
          <button type="button" className="gov-close" onClick={() => setSelected(null)}>×</button>
          {selected.kind === 'governor' ? (
            <GovernorCard g={selected.data} />
          ) : (
            <ProjectCard p={selected.data} />
          )}
        </aside>
      )}

      <style jsx>{`
        .gov-toolbar {
          position: absolute; top: 12px; left: 12px; right: 12px; z-index: 10;
          display: flex; align-items: center; gap: 12px;
          background: rgba(11, 15, 23, 0.85); backdrop-filter: blur(8px);
          border: 1px solid #1f2937; border-radius: 8px;
          padding: 8px 12px; color: #e5e7eb;
        }
        .gov-toolbar-title { display: flex; flex-direction: column; }
        .gov-toolbar-title strong { font-size: 14px; }
        .gov-subtitle { font-size: 11px; color: #9ca3af; }
        .gov-state-pills { margin-left: auto; display: flex; gap: 6px; }
        .gov-pill {
          background: transparent; border: 1px solid #374151; color: #e5e7eb;
          padding: 4px 10px; border-radius: 999px; font-size: 12px; cursor: pointer;
        }
        .gov-pill-active { background: #22d3ee; color: #0b0f17; border-color: #22d3ee; }
        .gov-legend {
          position: absolute; left: 12px; bottom: 12px; z-index: 10;
          display: flex; gap: 10px; align-items: center; flex-wrap: wrap;
          background: rgba(11, 15, 23, 0.85); backdrop-filter: blur(8px);
          border: 1px solid #1f2937; border-radius: 6px;
          padding: 6px 10px; color: #e5e7eb; font-size: 11px;
        }
        .gov-legend strong { font-size: 11px; color: #9ca3af; margin-right: 4px; }
        .gov-legend i {
          display: inline-block; width: 10px; height: 10px; border-radius: 50%;
          margin-right: 4px; vertical-align: middle;
        }
        .gov-counts {
          position: absolute; right: 12px; bottom: 12px; z-index: 10;
          background: rgba(11, 15, 23, 0.85); backdrop-filter: blur(8px);
          border: 1px solid #1f2937; border-radius: 6px;
          padding: 6px 10px; color: #e5e7eb; font-size: 11px;
        }
        .gov-panel {
          position: absolute; right: 12px; top: 70px; bottom: 56px; z-index: 10;
          width: 360px; max-width: calc(100vw - 24px);
          background: rgba(11, 15, 23, 0.92); backdrop-filter: blur(8px);
          border: 1px solid #1f2937; border-radius: 8px;
          padding: 16px; color: #e5e7eb;
          overflow-y: auto;
        }
        .gov-panel header { margin-bottom: 12px; }
        .gov-panel h3 { margin: 4px 0 0; font-size: 18px; color: #f3f4f6; }
        .gov-panel h4 { font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin: 12px 0 4px; }
        .gov-panel p { font-size: 13px; line-height: 1.5; margin: 4px 0; color: #d1d5db; }
        .gov-meta { font-size: 12px; color: #9ca3af; margin: 2px 0; }
        .gov-state-badge {
          display: inline-block; padding: 2px 8px; background: #22d3ee; color: #0b0f17;
          border-radius: 4px; font-size: 11px; font-weight: 700; letter-spacing: 0.05em;
        }
        .gov-pill-tag {
          display: inline-block; padding: 3px 10px; border-radius: 999px;
          font-size: 11px; font-weight: 600; margin: 4px 0;
        }
        .gov-pill-nga { background: #fbbf24; color: #0b0f17; }
        .gov-initiative {
          padding: 10px 12px; background: rgba(251, 191, 36, 0.08);
          border-left: 3px solid #fbbf24; border-radius: 4px;
          font-size: 13px; line-height: 1.5; margin: 8px 0;
        }
        .gov-close {
          position: absolute; top: 8px; right: 10px;
          background: none; border: none; color: #9ca3af; font-size: 22px; cursor: pointer;
          line-height: 1; padding: 2px 6px;
        }
        .gov-close:hover { color: #f3f4f6; }
        ul { padding-left: 16px; margin: 4px 0; }
        li { font-size: 12px; margin: 2px 0; }
        a { color: #67e8f9; }
        a:hover { text-decoration: underline; }
      `}</style>
    </div>
  )
}

// ── Cards ─────────────────────────────────────────────────────────────────────

function GovernorCard({ g }: { g: GovernorProps }) {
  return (
    <>
      <header>
        <span className="gov-state-badge">{g.state}</span>
        <h3>{g.name}</h3>
        <p className="gov-meta">
          {g.party}{g.termEnds ? ` · ${g.termEnds}` : ''}
        </p>
        {g.capitalCity && <p className="gov-meta">Capital: {g.capitalCity}</p>}
      </header>
      {g.ngaRole && <div className="gov-pill-tag gov-pill-nga">NGA — {g.ngaRole}</div>}
      {g.ngaInitiative && <p className="gov-initiative">{g.ngaInitiative}</p>}
      {g.dcPolicyNotes && (
        <section>
          <h4>DC Policy</h4>
          <p>{g.dcPolicyNotes}</p>
        </section>
      )}
      {g.sources?.length > 0 && (
        <section>
          <h4>Sources</h4>
          <ul>
            {g.sources.map((s, i) => (
              <li key={i}><a href={s} target="_blank" rel="noreferrer">{shortHost(s)}</a></li>
            ))}
          </ul>
        </section>
      )}
      <style jsx>{`
        header { margin-bottom: 12px; }
        h3 { margin: 4px 0 0; font-size: 18px; color: #f3f4f6; }
        h4 { font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin: 12px 0 4px; }
        p { font-size: 13px; line-height: 1.5; margin: 4px 0; color: #d1d5db; }
        .gov-meta { font-size: 12px; color: #9ca3af; margin: 2px 0; }
        .gov-state-badge { display: inline-block; padding: 2px 8px; background: #22d3ee; color: #0b0f17; border-radius: 4px; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; }
        .gov-pill-tag { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; margin: 4px 0; }
        .gov-pill-nga { background: #fbbf24; color: #0b0f17; }
        .gov-initiative { padding: 10px 12px; background: rgba(251, 191, 36, 0.08); border-left: 3px solid #fbbf24; border-radius: 4px; font-size: 13px; line-height: 1.5; margin: 8px 0; }
        ul { padding-left: 16px; margin: 4px 0; }
        li { font-size: 12px; margin: 2px 0; }
        a { color: #67e8f9; }
        a:hover { text-decoration: underline; }
      `}</style>
    </>
  )
}

function ProjectCard({ p }: { p: ProjectProps }) {
  const statusColor = STATUS_COLORS[p.status] ?? '#9ca3af'
  return (
    <>
      <header>
        <span className="status-pill" style={{ background: statusColor }}>{p.status.toUpperCase()}</span>
        <h3>{p.name}</h3>
        <p className="meta">
          {p.city ? `${p.city}, ${p.state}` : p.state}
          {p.mw ? ` · ${p.mw} MW` : ''}
        </p>
        {p.ownerFunder && <p className="meta">Owner / Funder: <strong>{p.ownerFunder}</strong></p>}
        {p.operator && p.operator !== p.ownerFunder && <p className="meta">Operator: {p.operator}</p>}
        {p.stalledAt && <p className="meta">Stalled: {p.stalledAt}</p>}
      </header>
      {p.blockReason && (
        <section>
          <h4>Reason: {p.blockReason}</h4>
          {p.blockReasonDetail && <p>{p.blockReasonDetail}</p>}
        </section>
      )}
      {p.relatedSources?.length > 0 && (
        <section>
          <h4>Sources</h4>
          <ul>
            {p.relatedSources.map((s, i) => (
              <li key={i}><a href={s} target="_blank" rel="noreferrer">{shortHost(s)}</a></li>
            ))}
          </ul>
        </section>
      )}
      <style jsx>{`
        header { margin-bottom: 12px; }
        h3 { margin: 4px 0 0; font-size: 18px; color: #f3f4f6; }
        h4 { font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin: 12px 0 4px; }
        p { font-size: 13px; line-height: 1.5; margin: 4px 0; color: #d1d5db; }
        .meta { font-size: 12px; color: #9ca3af; margin: 2px 0; }
        .status-pill { display: inline-block; padding: 2px 8px; color: #0b0f17; border-radius: 4px; font-size: 10px; font-weight: 700; letter-spacing: 0.05em; }
        ul { padding-left: 16px; margin: 4px 0; }
        li { font-size: 12px; margin: 2px 0; }
        a { color: #67e8f9; }
        a:hover { text-decoration: underline; }
      `}</style>
    </>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function hydrateGovernor(p: Record<string, unknown>): GovernorProps {
  return {
    id: String(p.id ?? ''),
    state: String(p.state ?? ''),
    stateName: String(p.stateName ?? ''),
    name: String(p.name ?? ''),
    party: String(p.party ?? ''),
    termEnds: String(p.termEnds ?? ''),
    capitalCity: String(p.capitalCity ?? ''),
    ngaRole: String(p.ngaRole ?? ''),
    ngaInitiative: String(p.ngaInitiative ?? ''),
    dcPolicyNotes: String(p.dcPolicyNotes ?? ''),
    sources: parseStringArray(p.sources),
  }
}

function hydrateProject(p: Record<string, unknown>): ProjectProps {
  return {
    id: String(p.id ?? ''),
    name: String(p.name ?? ''),
    operator: String(p.operator ?? ''),
    city: String(p.city ?? ''),
    state: String(p.state ?? ''),
    status: String(p.status ?? ''),
    mw: typeof p.mw === 'number' ? p.mw : null,
    blockReason: String(p.blockReason ?? ''),
    blockReasonDetail: String(p.blockReasonDetail ?? ''),
    ownerFunder: String(p.ownerFunder ?? ''),
    relatedSources: parseStringArray(p.relatedSources),
    stalledAt: typeof p.stalledAt === 'string' ? p.stalledAt : null,
  }
}

function parseStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x))
  if (typeof v === 'string') {
    try {
      const parsed = JSON.parse(v)
      return Array.isArray(parsed) ? parsed.map((x) => String(x)) : []
    } catch {
      return []
    }
  }
  return []
}

function shortHost(url: string): string {
  try {
    const u = new URL(url)
    return u.hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}
