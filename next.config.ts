import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Kuvaoptimointiparannukset
  images: {
    // Optimoi kuvat automaattisesti - AVIF ensisijaisesti
    formats: ['image/avif', 'image/webp'],
    // Määritä koot joita käytät
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Kuvalaadun optimointi
    minimumCacheTTL: 31536000, // 1 vuosi
    // Lisää domains jos käytät ulkoisia kuvia
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Suorituskyvyn optimointi
  compiler: {
    // Poista console.log tuotantoversiosta
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Gzip-pakkausta
  compress: true,
  
  // Optimoidaan bundle
  experimental: {
    // Optimoi bundle koko
    optimizePackageImports: ['framer-motion'],
  },

  // Turbopack config - tyhjä objekti sallii Turbopackin käytön yhdessä Webpack-konfiguraation kanssa
  // Tämä poistaa virheilmoituksen "using Turbopack with a webpack config" rakennusympäristössä.
  turbopack: {},
  
  // Webpack optimoinnit
  webpack: (config, { dev, isServer }) => {
    // Optimoi production build
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk
            vendor: {
              chunks: 'all',
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
            },
            // Common chunk
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }
    
    return config;
  },
};

export default nextConfig;
