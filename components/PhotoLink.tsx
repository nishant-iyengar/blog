'use client';

import { ReactNode, useEffect } from 'react';

interface PhotoLinkProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function PhotoLink({ id, children, className }: PhotoLinkProps) {
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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Update URL with hash without scrolling
    window.history.pushState(null, '', `#${id}`);
    // Scroll to element
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id={id} onClick={handleClick} className={className}>
      {children}
    </div>
  );
}
