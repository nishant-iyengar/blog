'use client';

import { usePathname } from 'next/navigation';
import BouncingBall from './BouncingBall';

export default function ConditionalBouncingBall() {
  const pathname = usePathname();
  const isGamesPage = pathname.startsWith('/games');
  
  if (isGamesPage) {
    return null;
  }
  
  return <BouncingBall />;
}

