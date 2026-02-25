/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '6500',
        pathname: '/static/images/**',
      },
    ],
  },
};

export default nextConfig;


