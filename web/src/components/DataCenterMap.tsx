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
  mw: number
  status: Status
}

const STATUS_COLORS: Record<Status, string> = {
  operational: '#22d3ee',
  construction: '#E07B39',
  announced: '#a78bfa',
}

interface Stats {
  total: number
  operational: number
  construction: number
  announced: number
  totalMw: number
}

export default function DataCenterMap() {
  const [data, setData] = useState<FeatureCollection<Point, ProjectProps> | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all')
  const [hover, setHover] = useState<{ lng: number; lat: number; props: ProjectProps } | null>(null)

  useEffect(() => {
    fetch('/api/v1/projects')
      .then(r => r.json())
      .then(d => {
        setData(d)
        setStats(d.stats)
      })
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
        0, 4, 50, 8, 250, 14, 1000, 24, 5000, 40,
      ],
      'circle-color': ['match', ['get', 'status'],
        'operational', STATUS_COLORS.operational,
        'construction', STATUS_COLORS.construction,
        'announced', STATUS_COLORS.announced,
        '#888',
      ],
      'circle-opacity': 0.7,
      'circle-stroke-width': 1.5,
      'circle-stroke-color': '#0C2046',
    },
  }

  const onMove = useCallback((e: MapLayerMouseEvent) => {
    const f = e.features?.[0]
    if (!f) return setHover(null)
    const [lng, lat] = (f.geometry as Point).coordinates
    setHover({ lng, lat, props: f.properties as ProjectProps })
  }, [])

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
          <Popup longitude={hover.lng} latitude={hover.lat} closeButton={false} offset={12} anchor="top">
            <div style={{ fontSize: 12, color: '#0C2046', minWidth: 180 }}>
              <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: 16, textTransform: 'uppercase', marginBottom: 4 }}>
                {hover.props.name}
              </div>
              {hover.props.operator && <div style={{ color: '#666', marginBottom: 4 }}>{hover.props.operator}</div>}
              <div>
                {hover.props.mw > 0 && <span><strong>{hover.props.mw} MW</strong> · </span>}
                <span style={{ color: STATUS_COLORS[hover.props.status], textTransform: 'uppercase', fontWeight: 600, fontSize: 10, letterSpacing: '0.1em' }}>
                  {hover.props.status}
                </span>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {/* Filter chips */}
      <div style={{
        position: 'absolute', zIndex: 10, top: 16, left: 16,
        display: 'flex', gap: 8, flexWrap: 'wrap',
      }}>
        {(['all', 'operational', 'construction', 'announced'] as const).map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            style={{
              padding: '6px 14px',
              background: statusFilter === s ? '#E07B39' : 'rgba(12,32,70,0.85)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.15)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600, fontSize: 10,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            {s === 'all' ? `All (${stats?.total || 0})` : s}
          </button>
        ))}
      </div>

      {/* Stats overlay */}
      {stats && (
        <div style={{
          position: 'absolute', zIndex: 10, bottom: 32, right: 16,
          background: 'rgba(12,32,70,0.85)', padding: '16px 20px',
          border: '1px solid rgba(255,255,255,0.1)',
          fontFamily: 'Inter, sans-serif',
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E07B39', marginBottom: 8 }}>
            Live Tracker · US + CA
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>
            <div>Projects: <strong>{stats.total.toLocaleString()}</strong></div>
            <div>Total MW: <strong>{stats.totalMw.toLocaleString()}</strong></div>
            <div>Operational: <strong>{stats.operational.toLocaleString()}</strong></div>
            <div>Proposed: <strong>{stats.announced.toLocaleString()}</strong></div>
          </div>
        </div>
      )}
    </div>
  )
}
