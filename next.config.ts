import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ],
    qualities: [100, 70]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb'
    }
  }
}

export default nextConfig
