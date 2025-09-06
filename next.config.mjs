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
};

export default nextConfig;
