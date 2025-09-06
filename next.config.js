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
    // For development, you can also use this (less secure):
    // domains: ['localhost'],
  },
  // Handle subdomain routing
  async rewrites() {
    return [
      // Rewrite subdomain requests to the subdomain page
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?<subdomain>.*)\\.jirocash\\.com',
          },
        ],
        destination: '/subdomain',
      },
    ];
  },
  // Other Next.js configurations...
}

module.exports = nextConfig
