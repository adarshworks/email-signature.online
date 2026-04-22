import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Next.js Image Optimization for the Google user content CDN.
    // Without this, the avatar (LCP candidate) is served as raw JPEG with no caching.
    // With this, Next.js converts it to WebP and serves from its own cache.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
