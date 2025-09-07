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
  // Enable wildcard domains for subdomain routing
  experimental: {
    // This allows Next.js to handle wildcard subdomains
    serverComponentsExternalPackages: [],
  },
  // Handle subdomain routing - middleware will handle this now
  async rewrites() {
    return [
      // Keep existing rewrites if any
    ];
  },
  // Other Next.js configurations...
}

module.exports = nextConfig
