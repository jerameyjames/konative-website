'use client'

import { Suspense } from 'react'

/**
 * MapEmbed — compact, prop-driven embeddable wrapper around DataCenterMap.
 *
 * Design notes:
 * - Uses next/dynamic with ssr:false so the heavy MapLibre/PMTiles bundle is
 *   never included in the server-rendered HTML, keeping pillar page LCP/SEO intact.
 * - A lightweight skeleton placeholder is shown until the dynamic import resolves
 *   and the map mounts (client-side only).
 * - The `layers` prop is informational/documented only — DataCenterMap does NOT
 *   currently accept a layers prop for controlling which infrastructure PMTiles
 *   categories are shown. The component initialises with DEFAULT_INFRA_ENABLED
 *   (indigenous: true, all others: false). Passing `layers` via MapEmbed has no
 *   effect on the rendered tile overlays; see the Limitations section in
 *   task-2.1-report.md. Do NOT fabricate an API that does not exist.
 * - `readout` is informational/documented only — DataCenterMap always renders the
 *   MapReadout coordinate panel when backgroundMode is false. MapEmbed cannot
 *   suppress it without modifying DataCenterMap. When readout=false (default for
 *   compact embeds), MapEmbed uses backgroundMode=true which hides all UI overlays
 *   (readout, controls, panels) and disables interactivity. When readout=true,
 *   backgroundMode=false is used to expose the full interactive UI.
 * - R2 PMTiles are fetched via the same-origin tile proxy (/api/v1/tiles/*), same
 *   as /map. No tile URL changes needed.
 */

import dynamic from 'next/dynamic'

// Lazy-load the full DataCenterMap bundle client-side only.
// The loading fallback is height-aware so it matches the container; we pass a
// fixed default here and override in the wrapper when height differs.
const DataCenterMap = dynamic(() => import('@/components/DataCenterMap'), {
  ssr: false,
})

// ── types ─────────────────────────────────────────────────────────────────────

export interface MapEmbedProps {
  /**
   * Which infrastructure layer category keys to show by default.
   * Valid values: 'power' | 'gas' | 'fiber' | 'water' | 'exclusions' |
   * 'land-use' | 'climate' | 'rail' | 'indigenous'.
   *
   * LIMITATION: DataCenterMap does not expose an external API to set which
   * infrastructure categories are enabled. This prop is reserved for a future
   * DataCenterMap refactor that lifts infraEnabled to a prop. Currently it has
   * no effect on the rendered map — the map uses its DEFAULT_INFRA_ENABLED
   * (indigenous: true, all others off). See task-2.1-report.md.
   */
  layers?: string[]

  /** Height of the map container in pixels. Defaults to 420. */
  height?: number

  /**
   * Whether to show the interactive MapReadout coordinate panel and all UI
   * overlays (layer control, search bar, panels).
   *
   * - false (default): uses backgroundMode=true → compact, read-only, no UI chrome,
   *   pointer events disabled. Ideal for pillar-page embeds above/below content.
   * - true: uses backgroundMode=false → full interactive map with all controls.
   */
  readout?: boolean

  /**
   * Initial map center as [longitude, latitude].
   * Defaults to [-96, 45] (continental North America overview).
   */
  initialCenter?: [number, number]

  /** Initial map zoom level. Defaults to 3.2. */
  initialZoom?: number

  /** Optional caption rendered below the map. */
  caption?: string
}

// ── skeleton ──────────────────────────────────────────────────────────────────

function MapSkeleton({ height }: { height: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        height,
        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #f1f5f9 100%)',
        backgroundSize: '200% 200%',
        animation: 'mapEmbedShimmer 1.6s ease-in-out infinite',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid overlay suggesting a map */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(17,24,39,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17,24,39,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 10,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(17,17,17,0.28)',
        position: 'relative',
        zIndex: 1,
      }}>
        Loading map…
      </div>
      <style>{`
        @keyframes mapEmbedShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}

// ── component ─────────────────────────────────────────────────────────────────

/**
 * Embeddable map component for Konative pillar pages.
 *
 * Wraps DataCenterMap via next/dynamic (ssr:false) so the heavy MapLibre bundle
 * is never included in server-rendered HTML.
 *
 * @example
 * // Compact read-only embed (default)
 * <MapEmbed height={420} caption="Power infrastructure — sourced from NRCAN/EIA" />
 *
 * @example
 * // Full interactive embed centered on Ontario
 * <MapEmbed readout initialCenter={[-79.4, 43.7]} initialZoom={6} height={560} />
 */
export default function MapEmbed({
  layers: _layers, // reserved — see JSDoc limitation above
  height = 420,
  readout = false,
  initialCenter,
  initialZoom,
  caption,
}: MapEmbedProps) {
  // When readout=false (compact embed), use backgroundMode=true to suppress all
  // UI chrome and disable pointer events. When readout=true, expose the full
  // interactive map (backgroundMode=false).
  const backgroundMode = !readout

  return (
    <div style={{ width: '100%' }}>
      {/* Map container — fixed height, relative so MapLibre absolute children are bounded.
          Suspense boundary shows the skeleton while the dynamic bundle is loading. */}
      <div style={{ position: 'relative', width: '100%', height }}>
        <Suspense fallback={<MapSkeleton height={height} />}>
          <DataCenterMap
            backgroundMode={backgroundMode}
            initialCenter={initialCenter}
            initialZoom={initialZoom}
          />
        </Suspense>
      </div>

      {/* Optional caption */}
      {caption && (
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 10,
          color: 'rgba(17,17,17,0.44)',
          letterSpacing: '0.06em',
          marginTop: 6,
          marginBottom: 0,
          lineHeight: 1.5,
        }}>
          {caption}
        </p>
      )}
    </div>
  )
}

// Re-export MapSkeleton for use as the dynamic loading fallback in consuming pages.
export { MapSkeleton }
