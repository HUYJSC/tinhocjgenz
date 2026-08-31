import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
            value: "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
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
      {
        source: "/(icon.*|apple-icon.*|favicon.ico|logo.*|site.webmanifest)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, immutable",
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
      {
        source: "/dich-vu",
        destination: "/khoa-hoc",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
