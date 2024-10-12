import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    // experimental: { reactCompiler: true },
    serverExternalPackages: ["@prisma/client", "bcrypt"],
};

export default nextConfig;
