import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Disable static optimization for pages that might use Supabase
  async headers() {
    return [
      {
        source: '/dashboard/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ]
  },
}

export default nextConfig
