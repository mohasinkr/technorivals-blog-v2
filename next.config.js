/** @type {import('next').NextConfig} */
module.exports = {
  // Using Pages Router by default
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? true : false,
  },
  // TypeScript configuration
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  // Image configuration for Storyblok
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
      {
        protocol: "https",
        hostname: "img.storyblok.com",
      },
      {
        protocol: "https",
        hostname: "img2.storyblok.com",
      },
    ],
    // Optional: Add image formats that are supported
    formats: ["image/avif", "image/webp"],
  },
};
