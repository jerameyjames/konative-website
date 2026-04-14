import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid picking up an unrelated parent lockfile when other projects exist on the machine.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
