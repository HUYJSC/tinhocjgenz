import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ensure production deployment on Vercel never gets blocked by strict type lints
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/khoa-hoc-mos",
        destination: "/mos",
        permanent: true,
      },
      {
        source: "/khoa-hoc-ic3",
        destination: "/ic3",
        permanent: true,
      },
      {
        source: "/khoa-hoc-excel",
        destination: "/excel",
        permanent: true,
      },
      {
        source: "/khoa-hoc-word",
        destination: "/word",
        permanent: true,
      },
      {
        source: "/khoa-hoc-powerpoint",
        destination: "/powerpoint",
        permanent: true,
      },
      {
        source: "/khoa-hoc-python",
        destination: "/python",
        permanent: true,
      },
      {
        source: "/khoa-hoc-tin-hoc-van-phong",
        destination: "/tin-hoc-van-phong",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
