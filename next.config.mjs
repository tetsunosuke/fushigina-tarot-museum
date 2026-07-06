/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // 日本語パス起因のWebpackキャッシュの書き込みエラーを回避
      config.cache = false;
    }
    return config;
  }
};

export default nextConfig;

