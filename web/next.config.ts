import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Monorepo: keep Turbopack rooted on this app (avoids picking a parent lockfile).
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default withPayload(nextConfig);
