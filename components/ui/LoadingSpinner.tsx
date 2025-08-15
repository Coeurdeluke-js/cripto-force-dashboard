'use client';

import Image from 'next/image';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  showLogo?: boolean;
}

export default function LoadingSpinner({ 
  message = 'Cargando...', 
  size = 'md',
  showLogo = true 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  const logoSizes = {
    sm: { width: 40, height: 40 },
    md: { width: 60, height: 60 },
    lg: { width: 80, height: 80 }
  };

  return (
    <div className="text-center">
      {showLogo && (
        <div className="mb-4 opacity-0 scale-95 animate-[fadeInScale_800ms_ease-out_forwards]">
          <Image 
            src="/logo.png" 
            alt="Crypto Force" 
            width={logoSizes[size].width}
            height={logoSizes[size].height}
            className="mx-auto"
            priority 
          />
        </div>
      )}
      <div className={`${sizeClasses[size]} border-2 border-[#ec4d58]/30 border-t-[#ec4d58] rounded-full animate-spin mx-auto mb-4`}></div>
      <p className="text-white/80 text-sm">{message}</p>
      
      <style jsx global>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.92); }
          55% { opacity: 1; transform: scale(1.03); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
