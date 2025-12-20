'use client';

import { ReactNode, useEffect } from 'react';

interface SectionLinkProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function SectionLink({ id, children, className }: SectionLinkProps) {
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let the browser handle the hash navigation naturally
    // This ensures the URL updates properly in the address bar
    const element = document.getElementById(id);
    if (element) {
      // Small delay to let the hash update first
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 10);
    }
  };

  return (
    <a 
      id={id} 
      href={`#${id}`}
      onClick={handleClick} 
      className={className}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      {children}
    </a>
  );
}
