import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable experimental features that might cause issues
  experimental: {
    // Remove optimizePackageImports as it might cause chunk issues
  },
  
  // Simple webpack configuration
  webpack: (config, { isServer }) => {
    // Only add fallbacks for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  
  // Ensure proper chunk loading
  output: 'standalone',
  
  // Add proper headers for static assets
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
