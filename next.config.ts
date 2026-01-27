import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = withNextIntl({
  // i18n is handled by next-intl
  
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: []
    },
  },
  
  transpilePackages: ['framer-motion'],
  
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ]
  },
  
  reactStrictMode: false,
  
  webpack: (config: any) => {
    // Enable modern webpack features
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    
    // Ensure framer-motion is properly bundled
    config.resolve.alias = {
      ...config.resolve.alias,
      'framer-motion': require.resolve('framer-motion'),
    };
    
    return config;
  }
});

export default nextConfig