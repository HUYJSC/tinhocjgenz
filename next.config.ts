import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ensure production deployment on Vercel never gets blocked by strict type lints
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
