import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Вот теперь это свойство находится на своем месте
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
