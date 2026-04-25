'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import { Map, Source, Layer, Popup, type MapLayerMouseEvent } from 'react-map-gl/maplibre'
import type { CircleLayerSpecification } from 'maplibre-gl'
import type { FeatureCollection, Point } from 'geojson'
import 'maplibre-gl/dist/maplibre-gl.css'

type Status = 'operational' | 'construction' | 'announced'

interface ProjectProps {
  id: string
  name: string
  operator?: string
  city?: string
  state?: string
  mw: number
  status: Status
  source: string
}

export const STATUS_COLORS: Record<Status, string> = {
  operational: '#22d3ee',
  construction: '#E07B39',
  announced: '#a78bfa',
}

export interface MapStats {
  total: number
  operational: number
  construction: number
  announced: number
  totalMw: number
}

const STATUS_COUNT_KEY: Record<Status, keyof MapStats> = {
  operational: 'operational',
  construction: 'construction',
  announced: 'announced',
}

const SOURCE_LABELS: Record<string, string> = {
  osm: 'OpenStreetMap',
  wikidata: 'Wikidata',
  news_extraction: 'News',
  ieso_queue: 'IESO',
  manual: 'Manual',
}

export default function DataCenterMap() {
  const [data, setData] = useState<FeatureCollection<Point, ProjectProps> | null>(null)
  const [stats, setStats] = useState<MapStats | null>(null)
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all')
  const [hover, setHover] = useState<{ lng: number; lat: number; props: ProjectProps } | null>(null)

  useEffect(() => {
    fetch('/api/v1/projects')
      .then(r => r.json())
      .then(d => { setData(d); setStats(d.stats) })
      .catch(() => {})
  }, [])

  const filtered = useMemo<FeatureCollection<Point, ProjectProps>>(() => {
    if (!data) return { type: 'FeatureCollection', features: [] }
    return {
      type: 'FeatureCollection',
      features: statusFilter === 'all'
        ? data.features
        : data.features.filter(f => f.properties.status === statusFilter),
    }
  }, [data, statusFilter])

  const circleLayer: CircleLayerSpecification = {
    id: 'dc-bubbles',
    type: 'circle',
    source: 'dc',
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['get', 'mw'],
        0, 6, 50, 10, 250, 16, 1000, 26, 5000, 42,
      ],
      'circle-color': ['match', ['get', 'status'],
        'operational', STATUS_COLORS.operational,
        'construction', STATUS_COLORS.construction,
        'announced', STATUS_COLORS.announced,
        '#888',
      ],
      'circle-opacity': 0.75,
      'circle-stroke-width': 1.5,
      'circle-stroke-color': 'rgba(12,32,70,0.8)',
    },
  }

  const onMove = useCallback((e: MapLayerMouseEvent) => {
    const f = e.features?.[0]
    if (!f) return setHover(null)
    const [lng, lat] = (f.geometry as Point).coordinates
    setHover({ lng, lat, props: f.properties as ProjectProps })
  }, [])

  const filterCount = (s: Status | 'all') =>
    s === 'all' ? (stats?.total ?? 0) : (stats?.[STATUS_COUNT_KEY[s]] ?? 0)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Map
        initialViewState={{ longitude: -96, latitude: 45, zoom: 3.2 }}
        mapStyle="https://tiles.openfreemap.org/styles/dark"
        interactiveLayerIds={['dc-bubbles']}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
        cursor={hover ? 'pointer' : 'default'}
        attributionControl={{ compact: true }}
      >
        <Source id="dc" type="geojson" data={filtered}>
          <Layer {...circleLayer} />
        </Source>
        {hover && (
          <Popup longitude={hover.lng} latitude={hover.lat} closeButton={false} offset={14} anchor="top">
            <div style={{ fontSize: 12, color: '#0C2046', minWidth: 200, maxWidth: 260 }}>
              <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: 15, textTransform: 'uppercase', marginBottom: 2, lineHeight: 1.2 }}>
                {hover.props.name}
              </div>
              {hover.props.operator && (
                <div style={{ color: '#555', fontSize: 11, marginBottom: 6 }}>{hover.props.operator}</div>
              )}
              {(hover.props.city || hover.props.state) && (
                <div style={{ color: '#777', fontSize: 11, marginBottom: 6 }}>
                  {[hover.props.city, hover.props.state].filter(Boolean).join(', ')}
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                {hover.props.mw > 0 && (
                  <span style={{ fontWeight: 700, fontSize: 12 }}>{hover.props.mw} MW</span>
                )}
                <span style={{ color: STATUS_COLORS[hover.props.status], textTransform: 'uppercase', fontWeight: 700, fontSize: 10, letterSpacing: '0.1em' }}>
                  {hover.props.status}
                </span>
                <span style={{ color: '#999', fontSize: 10 }}>
                  {SOURCE_LABELS[hover.props.source] ?? hover.props.source}
                </span>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {/* Filter chips */}
      <div style={{
        position: 'absolute', zIndex: 10, top: 16, left: 16,
        display: 'flex', gap: 6, flexWrap: 'wrap',
      }}>
        {(['all', 'operational', 'construction', 'announced'] as const).map(s => {
          const count = filterCount(s)
          const active = statusFilter === s
          const color = s !== 'all' ? STATUS_COLORS[s] : '#E07B39'
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              disabled={count === 0 && s !== 'all'}
              style={{
                padding: '6px 12px',
                background: active ? color : 'rgba(8,20,45,0.88)',
                color: active ? '#fff' : count === 0 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.8)',
                border: `1px solid ${active ? color : 'rgba(255,255,255,0.15)'}`,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600, fontSize: 10,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: count === 0 && s !== 'all' ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', gap: 5,
                backdropFilter: 'blur(8px)',
              }}
            >
              {s !== 'all' && (
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: active ? '#fff' : color, flexShrink: 0, opacity: count === 0 ? 0.3 : 1 }} />
              )}
              {s === 'all' ? 'All' : s}
              <span style={{ opacity: 0.7, fontWeight: 400 }}>({count.toLocaleString()})</span>
            </button>
          )
        })}
      </div>

      {/* Empty state when filter returns nothing */}
      {data && filtered.features.length === 0 && (
        <div style={{
          position: 'absolute', zIndex: 10,
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          background: 'rgba(8,20,45,0.9)', border: '1px solid rgba(255,255,255,0.1)',
          padding: '20px 28px', textAlign: 'center', backdropFilter: 'blur(8px)',
        }}>
          <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginBottom: 6 }}>
            No {statusFilter} projects yet
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
            Data populates as news extraction runs daily
          </div>
        </div>
      )}

      {/* Stats overlay */}
      {stats && (
        <div style={{
          position: 'absolute', zIndex: 10, bottom: 32, right: 16,
          background: 'rgba(8,20,45,0.88)', padding: '14px 18px',
          border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
          fontFamily: 'Inter, sans-serif',
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E07B39', marginBottom: 10 }}>
            Live Tracker · US + CA
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12 }}>
            <div style={{ color: 'rgba(255,255,255,0.85)' }}>
              <strong style={{ color: '#fff' }}>{stats.total.toLocaleString()}</strong> total projects
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: STATUS_COLORS.operational, display: 'inline-block' }} />
              <span style={{ color: 'rgba(255,255,255,0.65)' }}>{stats.operational.toLocaleString()} operational</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: STATUS_COLORS.construction, display: 'inline-block' }} />
              <span style={{ color: 'rgba(255,255,255,0.65)' }}>{stats.construction.toLocaleString()} under construction</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: STATUS_COLORS.announced, display: 'inline-block' }} />
              <span style={{ color: 'rgba(255,255,255,0.65)' }}>{stats.announced.toLocaleString()} announced</span>
            </div>
            {stats.totalMw > 0 && (
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 4, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 6 }}>
                {stats.totalMw.toLocaleString()} MW tracked
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
