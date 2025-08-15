'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSafeAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Dashboard() {
  const router = useRouter();
  const { userData, isReady } = useSafeAuth();

  useEffect(() => {
    if (isReady) {
      // Si no hay usuario logueado, redirigir a login
      if (!userData) {
        router.push('/login');
        return;
      }

      // Redirigir al mensaje de bienvenida como página predeterminada
      router.push('/dashboard/mensaje');
    }
  }, [isReady, userData, router]);

  // Mostrar loading mientras se determina la redirección
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
      <LoadingSpinner message="Cargando dashboard..." />
    </div>
  );
}