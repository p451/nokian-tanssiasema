import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Kuvaoptimointiparannukset
  images: {
    // Optimoi kuvat automaattisesti
    formats: ['image/webp', 'image/avif'],
    // Määritä koot joita käytät
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Kuvalaadun optimointi
    minimumCacheTTL: 31536000, // 1 vuosi
  },
  
  // Suorituskyvyn optimointi
  compiler: {
    // Poista console.log tuotantoversiosta
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Gzip-pakkausta
  compress: true,
  
  // Experimental features - poistetaan ongelmalliset
  experimental: {
    // Poistetaan CSS-optimointi toistaiseksi build-ongelman vuoksi
    // optimizeCss: true,
  },
};

export default nextConfig;
