import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    // 50 is used for photos under the dark hero overlay, where lower quality isn't visible
    qualities: [50, 75],
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
