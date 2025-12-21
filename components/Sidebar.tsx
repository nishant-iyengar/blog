'use client';

import { useState, useRef, useEffect } from 'react';
import Navigation from './Navigation';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sidebarRef.current) return;

      const deltaX = e.clientX - startXRef.current;
      const threshold = 30; // Minimum drag distance

      if (isOpen) {
        // If open, dragging left closes it
        if (deltaX < -threshold) {
          setIsOpen(false);
          setIsDragging(false);
        }
      } else {
        // If closed, dragging right opens it
        if (deltaX > threshold) {
          setIsOpen(true);
          setIsDragging(false);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, isOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startXRef.current = e.clientX;
    setIsDragging(true);
  };

  return (
    <>
      {/* Mobile Navigation Bar - Always visible at top on mobile */}
      <nav className="md:hidden w-full bg-[#EDF2F7] border-b border-[#E2E8F0] px-4 py-3 sticky top-0 z-50">
        <Navigation />
      </nav>

      {/* Desktop Sidebar */}
      <aside
        ref={sidebarRef}
        className={`hidden md:block relative transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64' : 'w-0'
        } min-h-screen bg-[#EDF2F7] border-r border-[#E2E8F0] overflow-hidden`}
      >
        <div className={`h-full p-6 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <Navigation />
        </div>
        
        {/* Drag Handle */}
        <div
          onMouseDown={handleMouseDown}
          className={`absolute top-0 right-0 w-2 h-full cursor-ew-resize hover:bg-[#629C77]/30 transition-colors ${
            isOpen ? 'block' : 'hidden'
          }`}
          style={{ zIndex: 10 }}
        />
      </aside>

      {/* Collapsed Toggle Button - Only show on desktop when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="hidden md:block fixed left-0 top-1/2 -translate-y-1/2 z-20 bg-[#EDF2F7] border-r border-[#E2E8F0] px-2 py-4 rounded-r-lg hover:bg-[#629C77] hover:text-white transition-colors"
          aria-label="Open sidebar"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </>
  );
}
