import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/**/*": ["./data/**/*"],
    "/admin/**/*": ["./data/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "heightveda.com",
      },
      {
        protocol: "https",
        hostname: "heightveda.in",
      },
      {
        protocol: "https",
        hostname: "allergysaffa.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin/login",
        destination: "/admin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
