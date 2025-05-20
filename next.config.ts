import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL || "file:./dev.db",
  },
};

export default nextConfig;