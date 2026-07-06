import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Slug-Umbenennung 2026-07-06:
      // /team  → /about  (Über kenalu hatte vorher den Slug /team)
      {
        source: '/team',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/team/:slug',
        destination: '/about/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
