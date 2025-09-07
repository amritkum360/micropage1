/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.jirocash.com',
        pathname: '/uploads/**',
      },
    ],
  },
  // External packages for server components
  serverExternalPackages: ['mongoose'],
  // Handle subdomain routing - removed as we're using middleware now
  async rewrites() {
    return [
      // Fallback for published websites
      {
        source: '/published/:id',
        destination: '/published/:id',
      },
    ];
  },
  // Other Next.js configurations...
}

module.exports = nextConfig
