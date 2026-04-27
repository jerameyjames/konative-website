/**
 * Tile-serving route: serves PMTiles and manifest.json from the repo's
 * tiles/v1/ directory (committed to git for P0; deferred to R2 later).
 *
 * Route: GET /api/v1/tiles/{...path}
 * Example: GET /api/v1/tiles/ca_nrcan_transmission_lines.pmtiles
 *          GET /api/v1/tiles/manifest.json
 *
 * PMTiles byte-range requests are forwarded from MapLibre's pmtiles protocol
 * adapter via standard HTTP Range headers.
 */

import { createReadStream, statSync } from "node:fs";
import path from "node:path";
import { type NextRequest, NextResponse } from "next/server";
import { Readable } from "node:stream";

// Resolved at module-load time; works for both local dev and Vercel (where
// the repo root is accessible relative to the Next.js output).
const TILES_DIR = path.resolve(process.cwd(), "..", "tiles", "v1");

const MIME: Record<string, string> = {
  ".pmtiles": "application/octet-stream",
  ".json": "application/json",
};

function ext(filePath: string): string {
  return path.extname(filePath).toLowerCase();
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
): Promise<NextResponse> {
  const segments = params.path ?? [];

  // Prevent path traversal
  const joined = segments.join("/");
  if (joined.includes("..")) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const filePath = path.join(TILES_DIR, joined);

  // Verify the resolved path stays within TILES_DIR
  if (!filePath.startsWith(TILES_DIR + path.sep) && filePath !== TILES_DIR) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  let stat: ReturnType<typeof statSync>;
  try {
    stat = statSync(filePath);
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }

  if (!stat.isFile()) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const contentType = MIME[ext(filePath)] ?? "application/octet-stream";
  const fileSize = stat.size;
  const rangeHeader = request.headers.get("range");

  if (rangeHeader) {
    // Parse "bytes=start-end"
    const match = rangeHeader.match(/bytes=(\d*)-(\d*)/);
    if (!match) {
      return new NextResponse("Range Not Satisfiable", { status: 416 });
    }
    const start = match[1] ? parseInt(match[1], 10) : 0;
    const end = match[2] ? parseInt(match[2], 10) : fileSize - 1;

    if (start > end || end >= fileSize) {
      return new NextResponse("Range Not Satisfiable", {
        status: 416,
        headers: { "Content-Range": `bytes */${fileSize}` },
      });
    }

    const chunkSize = end - start + 1;
    const stream = createReadStream(filePath, { start, end });
    const webStream = Readable.toWeb(stream) as ReadableStream<Uint8Array>;

    return new NextResponse(webStream, {
      status: 206,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(chunkSize),
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  // Full file response
  const stream = createReadStream(filePath);
  const webStream = Readable.toWeb(stream) as ReadableStream<Uint8Array>;

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(fileSize),
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
