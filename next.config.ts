import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'r2.elliot00.com',
      },
    ],
  },
  experimental: {
    useTypeScriptCli: true,
  },
}

export default nextConfig
