'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  const isBlogPosts = pathname === '/' || pathname.startsWith('/posts/');
  const isPhotos = pathname === '/photos';
  const isAnimals = pathname === '/animals';
  const isGames = pathname.startsWith('/games');

  return (
    <nav className="flex flex-row md:flex-col gap-2 md:gap-4 justify-center md:justify-start">
      <Link
        href="/"
        className={`px-3 py-2 md:px-4 rounded-lg transition-colors text-sm font-medium whitespace-nowrap ${
          isBlogPosts
            ? 'bg-[#629C77] !text-white'
            : 'text-[#718096] hover:bg-[#EDF2F7] hover:text-[#4A5568]'
        }`}
      >
        Posts
      </Link>
      <Link
        href="/photos"
        className={`px-3 py-2 md:px-4 rounded-lg transition-colors text-sm font-medium whitespace-nowrap ${
          isPhotos
            ? 'bg-[#629C77] !text-white'
            : 'text-[#718096] hover:bg-[#EDF2F7] hover:text-[#4A5568]'
        }`}
      >
        Photos
      </Link>
      <Link
        href="/animals"
        className={`px-3 py-2 md:px-4 rounded-lg transition-colors text-sm font-medium whitespace-nowrap ${
          isAnimals
            ? 'bg-[#629C77] !text-white'
            : 'text-[#718096] hover:bg-[#EDF2F7] hover:text-[#4A5568]'
        }`}
      >
        Animals
      </Link>
      <Link
        href="/games"
        className={`hidden md:block px-3 py-2 md:px-4 rounded-lg transition-colors text-sm font-medium whitespace-nowrap ${
          isGames
            ? 'bg-[#629C77] !text-white'
            : 'text-[#718096] hover:bg-[#EDF2F7] hover:text-[#4A5568]'
        }`}
      >
        Games
      </Link>
    </nav>
  );
}
