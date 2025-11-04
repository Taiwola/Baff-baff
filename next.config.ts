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
        hostname: 'res.cloudinary.com'
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb'
    }
  },
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
}

export default nextConfig
