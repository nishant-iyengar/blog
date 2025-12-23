'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface PhotoLinkProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function PhotoLink({ id, children, className }: PhotoLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if there's a hash in the URL on mount
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1); // Remove the #
      if (hash === id) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, [id]);

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    // Update URL hash using Next.js router
    router.push(`${pathname}#${id}`, { scroll: false });
    // Scroll to element
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 10);
  };

  return (
    <div 
      id={id} 
      data-photo-tile
      onClick={handleClick} 
      className={className}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e);
        }
      }}
    >
      {children}
    </div>
  );
}
