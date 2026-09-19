import type { NextConfig } from 'next';

const rawBackendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
const backendUrl = rawBackendUrl.startsWith('http://') || rawBackendUrl.startsWith('https://')
  ? rawBackendUrl
  : `http://${rawBackendUrl}`;

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;


