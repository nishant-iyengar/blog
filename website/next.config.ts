import createMDX from '@next/mdx';
import type { NextConfig } from "next";
// Load environment variables from root .env early
import './lib/env-loader';

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include md and mdx files
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
