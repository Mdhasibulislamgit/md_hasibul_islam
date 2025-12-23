/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable symlinks to fix Windows permissions issue with Turbopack
  webpack: (config: any) => {
    config.resolve.symlinks = false;
    return config;
  },
  // Configure Turbopack root directory to avoid lockfile warnings
  // Configure Turbopack root directory to avoid lockfile warnings
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
