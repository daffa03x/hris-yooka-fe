/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        domains: ["localhost", "127.0.0.1", "api.yooka.id"],
      },
};

export default nextConfig;
