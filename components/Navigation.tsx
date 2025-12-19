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
            ? 'bg-[#629C77] text-white font-medium'
            : 'text-[#718096] hover:bg-[#EDF2F7] hover:text-[#4A5568]'
        }`}
      >
        Posts
      </Link>
      <Link
        href="/photos"
        className={`px-4 py-2 rounded-lg transition-colors text-sm ${
          isPhotos
            ? 'bg-[#629C77] text-white font-medium'
            : 'text-[#718096] hover:bg-[#EDF2F7] hover:text-[#4A5568]'
        }`}
      >
        Photos
      </Link>
    </nav>
  );
}
