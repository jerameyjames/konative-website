import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Parent of `web/` — must match Vercel `outputFileTracingRoot` when Root Directory is `web`. */
const webDir = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(webDir, "..");

const nextConfig: NextConfig = {
  turbopack: {
    root: monorepoRoot,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
      { protocol: "https", hostname: "cdn.builder.io", pathname: "/**" },
    ],
  },
};

export default nextConfig;
