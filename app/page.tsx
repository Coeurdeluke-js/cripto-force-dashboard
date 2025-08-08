'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page when accessing the root
    router.push('/login');
  }, [router]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen bg-[#121212] text-white font-inter flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#FFD447] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white/70">Redirigiendo...</p>
      </div>
    </div>
  );
}