'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to signin page when accessing the root
    router.push('/login/signin');
  }, [router]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen bg-[#121212] text-white font-inter flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-6 opacity-0 scale-95 animate-[fadeInScale_1200ms_ease-out_forwards]">
          <Image src="/logo-dark-theme.png" alt="Crypto Force" width={220} height={220} priority />
        </div>
        <div className="w-8 h-8 border-4 border-[#EC4D58] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white/70">Redirigiendo...</p>
      </div>
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