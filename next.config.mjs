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
  // Handle subdomain routing
  async rewrites() {
    return [
      // Rewrite subdomain requests to the subdomain page for production
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
      // Rewrite subdomain requests for localhost development
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?<subdomain>.*)\\.localhost:3000',
          },
        ],
        destination: '/subdomain',
      },
    ];
  },
};

export default nextConfig;
