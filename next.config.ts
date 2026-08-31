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

  async headers() {
    return [
      // Statische Assets: 1 Jahr immutable cachen
      {
        source: '/:path*.(ico|png|jpg|jpeg|webp|svg|gif|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // OG-Image und ähnliche seltener gecachte Assets
      {
        source: '/og-image.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
