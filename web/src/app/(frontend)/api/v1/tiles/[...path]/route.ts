import { NextRequest, NextResponse } from 'next/server'

// Proxy R2 PMTiles to add CORS headers the bucket lacks.
// The R2 bucket (konative-tiles) has no CORS policy, so direct browser
// fetches fail with net::ERR_FAILED. Routing through this handler is
// same-origin from the browser's perspective.

const R2_BASE = 'https://pub-70584c42a8ad4fb1a38f5273a1665067.r2.dev'

export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Range, Content-Type',
    },
  })
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const r2Url = `${R2_BASE}/${path.join('/')}`

  const upstream: HeadersInit = {}
  const range = req.headers.get('Range')
  if (range) upstream['Range'] = range

  try {
    const r2 = await fetch(r2Url, {
      headers: upstream,
      // Cache upstream response in the Next.js data cache for 24 h.
      // Tiles change only when the ETL runs (quarterly / on demand).
      next: { revalidate: 86400 },
    })

    const out = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Range, Content-Type',
      'Access-Control-Expose-Headers': 'Accept-Ranges, Content-Range, Content-Length, ETag',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    })

    for (const h of ['Content-Type', 'Content-Range', 'Content-Length', 'Accept-Ranges', 'ETag']) {
      const v = r2.headers.get(h)
      if (v) out.set(h, v)
    }

    return new NextResponse(r2.body, { status: r2.status, headers: out })
  } catch {
    return NextResponse.json({ error: 'tile fetch failed' }, { status: 502 })
  }
}
