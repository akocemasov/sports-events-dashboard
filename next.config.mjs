/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.thesportsdb.com',
      },
      {
        protocol: 'https',
        hostname: 'r2.thesportsdb.com',
      },
    ],
  },
};

export default nextConfig;
