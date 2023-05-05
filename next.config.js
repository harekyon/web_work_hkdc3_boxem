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
    basePath: "/hktech",
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
