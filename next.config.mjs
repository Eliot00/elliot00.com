/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'elliot-blog.oss-cn-shanghai.aliyuncs.com',
      },
    ],
  },
}

export default nextConfig
