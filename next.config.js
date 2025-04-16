/** @type {import('next').NextConfig} */
module.exports = {
  // Using Pages Router by default
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? true : false,
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
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

class VeliteWebpackPlugin {
  static started = false;
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    // executed three times in nextjs
    // twice for the server (nodejs / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      const { build } = await import("velite");
      await build({ watch: dev, clean: !dev });
    });
  }
}
