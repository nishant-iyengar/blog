import createMDX from '@next/mdx';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include md and mdx files
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  /* config options here */
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
