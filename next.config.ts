import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  headers: async () => [
    {
      source: "/(.*)",
      headers: [{ key: "x-vercel-toolbar", value: "false" }],
    },
  ],
};

export default nextConfig;
