/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.thesportsdb.com'],
    unoptimized: true, // For static export if needed
  },
  // Enable React Compiler (experimental) - Requires babel-plugin-react-compiler
  // Uncomment and install the plugin to enable:
  // experimental: {
  //   reactCompiler: true,
  // },
};

export default nextConfig;
