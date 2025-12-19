'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  const isBlogPosts = pathname === '/' || pathname.startsWith('/posts/');
  const isPhotos = pathname === '/photos';

  return (
    <nav className="flex flex-row md:flex-col gap-3 md:gap-4">
      <Link
        href="/"
        className={`px-4 py-2 rounded-lg transition-colors text-sm ${
          isBlogPosts
            ? 'bg-white text-[#4A5568] font-medium shadow-sm'
            : 'text-[#718096] hover:bg-white/50 hover:text-[#4A5568]'
        }`}
      >
        Posts
      </Link>
      <Link
        href="/photos"
        className={`px-4 py-2 rounded-lg transition-colors text-sm ${
          isPhotos
            ? 'bg-white text-[#4A5568] font-medium shadow-sm'
            : 'text-[#718096] hover:bg-white/50 hover:text-[#4A5568]'
        }`}
      >
        Photos
      </Link>
    </nav>
  );
}
