/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  compilerOptions: {
    // 追加
    baseUrl: "src",
    paths: {
      "./*": ["/hktech/*"],
    },
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
