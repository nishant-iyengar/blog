'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import TankTroublePage from '@/app/games/tank-trouble/page';

export default function GamesPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if we're on mobile (width < 768px)
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        router.push('/');
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <div className="flex flex-col md:flex-row pt-[60px] md:pt-0">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 max-w-6xl mx-auto px-4 md:px-8 py-8 w-full">
          <header className="mb-8 flex justify-end">
            <div className="text-right">
              <div className="text-base text-[#4A5568]">Nishant Iyengar</div>
              <div className="text-sm text-[#718096] mt-1">iyengar.nish@gmail.com</div>
            </div>
          </header>
          
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-[#4A5568]">Games</h1>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-[#4A5568] mb-4">Tank Trouble</h2>
                <TankTroublePage />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

