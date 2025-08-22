'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Lock, CheckCircle, Play } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  path: string;
  icon: React.JSX.Element;
  description: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  level: 'nivel1' | 'nivel2';
}

interface EnhancedModuloCarouselProps {
  modules: Module[];
  title: string;
  className?: string;
}

export default function EnhancedModuloCarousel({ modules, title, className = '' }: EnhancedModuloCarouselProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Wheel navigation with enhanced focus
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Enhanced wheel navigation with smooth scrolling
      const scrollAmount = e.deltaY * 1.5;
      const currentScroll = carousel.scrollLeft;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      
      let newScroll = currentScroll + scrollAmount;
      newScroll = Math.max(0, Math.min(newScroll, maxScroll));
      
      carousel.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    };

    // Add wheel listener with passive: false
    carousel.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      carousel.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Drag and drop navigation
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    
    // Add cursor style
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grabbing';
      carouselRef.current.style.userSelect = 'none';
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUpOrLeave = useCallback(() => {
    setIsDragging(false);
    
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
      carouselRef.current.style.userSelect = 'auto';
    }
  }, []);

  // Touch support for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    
    e.preventDefault();
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Show scrollbar and arrows on desktop when hovering
  const handleMouseEnter = useCallback(() => {
    if (window.innerWidth >= 768) { // Desktop only
      setShowScrollbar(true);
      setShowArrows(true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowScrollbar(false);
    setShowArrows(false);
  }, []);

  // Navigation functions
  const scrollToPrevious = useCallback(() => {
    if (!carouselRef.current) return;
    
    const carousel = carouselRef.current;
    const cardWidth = carousel.querySelector('.module-card')?.clientWidth || 320;
    const scrollAmount = cardWidth + 16; // card width + gap
    
    carousel.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  }, []);

  const scrollToNext = useCallback(() => {
    if (!carouselRef.current) return;
    
    const carousel = carouselRef.current;
    const cardWidth = carousel.querySelector('.module-card')?.clientWidth || 320;
    const scrollAmount = cardWidth + 16; // card width + gap
    
    carousel.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }, []);

  const canScrollLeft = () => {
    if (!carouselRef.current) return false;
    return carouselRef.current.scrollLeft > 0;
  };

  const canScrollRight = () => {
    if (!carouselRef.current) return false;
    const carousel = carouselRef.current;
    return carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth;
  };

  return (
    <div 
      className={`mb-8 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style jsx>{`
        /* Custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ec4d58;
          border-radius: 4px;
          transition: background 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d43d48;
        }
        
        /* Hide scrollbar on mobile */
        @media (max-width: 767px) {
          .custom-scrollbar::-webkit-scrollbar {
            display: none;
          }
        }
        
        /* Line clamp styles */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <h3 className="text-xl font-semibold text-[#fafafa] mb-4 flex items-center">
        {title}
        <span className="ml-2 text-sm text-gray-400">({modules.length} módulos)</span>
      </h3>

      <div className="relative group">
        {/* Navigation arrows - only visible on desktop when hovering */}
        {showArrows && canScrollLeft() && (
          <button
            onClick={scrollToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-[#232323]/90 hover:bg-[#232323] text-[#fafafa] p-2 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
            aria-label="Módulos anteriores"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        
        {showArrows && canScrollRight() && (
          <button
            onClick={scrollToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-[#232323]/90 hover:bg-[#232323] text-[#fafafa] p-2 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
            aria-label="Módulos siguientes"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        <div 
          ref={containerRef}
          className="relative overflow-hidden"
        >
          <div
            ref={carouselRef}
            className={`custom-scrollbar transition-all duration-300 ${
              showScrollbar ? 'overflow-x-auto' : 'overflow-x-hidden'
            }`}
            style={{
              scrollbarWidth: showScrollbar ? 'auto' : 'none',
              msOverflowStyle: showScrollbar ? 'auto' : 'none'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: isDragging ? 'none' : 'auto'
            }}
          >
            <div className="flex space-x-4 pb-4">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className="module-card flex-shrink-0 w-80 bg-[#0f0f0f] border border-[#232323] rounded-lg p-4 transition-all duration-200 hover:border-[#ec4d58]/50 hover:shadow-lg hover:shadow-[#ec4d58]/10"
                  style={{ minHeight: '200px' }}
                >
                  {/* Module Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="text-[#ec4d58]">
                        {module.icon}
                      </div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">
                        {module.level}
                      </span>
                    </div>
                    
                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                      {module.isLocked ? (
                        <Lock className="w-5 h-5 text-gray-500" />
                      ) : module.isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-[#3ED598]" />
                      ) : (
                        <Play className="w-5 h-5 text-[#ec4d58]" />
                      )}
                    </div>
                  </div>

                  {/* Module Title */}
                  <h4 className="text-lg font-semibold text-[#fafafa] mb-2 line-clamp-2">
                    {module.title}
                  </h4>

                  {/* Module Description */}
                  <p className="text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                    {module.description}
                  </p>

                  {/* Action Button - ONLY this button allows access */}
                  <div className="mt-auto">
                    {module.isLocked ? (
                      <button
                        disabled
                        className="w-full px-4 py-2 bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed text-sm font-medium"
                      >
                        Bloqueado
                      </button>
                    ) : (
                      <Link
                        href={module.path}
                        className="block w-full px-4 py-2 bg-[#ec4d58] hover:bg-[#d43d48] text-white rounded-lg text-sm font-medium text-center transition-colors duration-200"
                      >
                        {module.isCompleted ? 'Revisar' : 'Comenzar'}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation hint */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="hidden md:inline">🖱️ Usa la rueda del mouse o arrastra para navegar</span>
          <span className="md:hidden">👆 Desliza para navegar</span>
        </div>
      </div>
    </div>
  );
}
