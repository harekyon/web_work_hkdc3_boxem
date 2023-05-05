/** @type {import('next').NextConfig} */

const viewMode = "production";
const prefixPath = viewMode === "production" ? "/hktech" : "";

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  compilerOptions: {
    // 追加
    baseUrl: "src",
    basePath: prefixPath,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
