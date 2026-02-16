import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev", "127.0.0.1"],
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.vercel.sh"
      },
      {
        protocol: "https",
        hostname: "i.scdn.co"
      }
    ]
  }
};

export default nextConfig;
