/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8002',
      },
      {
        protocol: 'http',
        hostname: 'kuyadoga.com',
        port: '8002',
      },
      {
        protocol: 'https',
        hostname: 'kuyadoga.com',
      },
      {
        protocol: 'https',
        hostname: 'admin.kuyadoga.com',
      },
    ],
  },
};

export default nextConfig;
