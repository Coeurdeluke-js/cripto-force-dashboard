'use client';

import { useEffect, useState } from 'react';
import { useSafeAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import MaestroSidebar from '@/components/layout/MaestroSidebar';
import MaestroDownbar from '@/components/layout/MaestroDownbar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { MaestroSidebarProvider, useMaestroSidebar } from '@/components/layout/MaestroSidebarContext';

// Lista de emails autorizados para acceder a la dashboard de Maestro
const MAESTRO_AUTHORIZED_EMAILS = [
  'infocryptoforce@gmail.com',
  'coeurdeluke.js@gmail.com'
];

function MaestroLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded } = useMaestroSidebar();
  const { userData, isReady } = useSafeAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      if (isReady) {
        if (!userData) {
          console.log('🚫 No hay usuario, redirigiendo a login');
          router.replace('/login/signin');
          return;
        }

        console.log('👤 MAESTRO LAYOUT: Verificando acceso para:', userData.email);
        console.log('📋 MAESTRO LAYOUT: Emails autorizados:', MAESTRO_AUTHORIZED_EMAILS);

        // Verificar si el email está en la lista de autorizados
        const userEmail = userData.email.toLowerCase().trim();
        const clientAuthorized = MAESTRO_AUTHORIZED_EMAILS.includes(userEmail);

        console.log('🔍 MAESTRO LAYOUT: Email procesado:', userEmail);
        console.log('✅ MAESTRO LAYOUT: ¿Autorizado por lista?:', clientAuthorized);

        // Verificar autorización real para producción
        if (!clientAuthorized) {
          console.log('🚫 MAESTRO LAYOUT: Acceso denegado - Email no autorizado para maestro');
          router.replace('/login/dashboard-selection');
          return;
        }

        console.log('✅ MAESTRO LAYOUT: Acceso autorizado por email');
        setIsAuthorized(true);

        setIsLoading(false);
      }
    };

    checkAccess();
  }, [isReady, userData, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <LoadingSpinner message="Verificando acceso de maestro..." />
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">Acceso Denegado</div>
          <p className="text-gray-400">No tienes permisos para acceder al dashboard de maestro.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] mobile-container">
      {/* Layout container con flexbox */}
      <div className="flex min-h-screen">
        {/* Sidebar - Solo visible en desktop y colapsable */}
        <div className="hidden md:block flex-shrink-0">
          <MaestroSidebar />
        </div>
        
        {/* Main Content Area - Completamente visible y responsive */}
        <div className={`flex-1 transition-all duration-300 ${
          isExpanded ? 'md:ml-0' : 'md:ml-0'
        }`}>
          <main className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 pb-20 md:pb-6 w-full max-w-none">
            {children}
          </main>
        </div>
      </div>

      {/* Downbar móvil - Solo visible en móvil */}
      <MaestroDownbar />
    </div>
  );
}

export default function MaestroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MaestroSidebarProvider>
      <MaestroLayoutContent>
        {children}
      </MaestroLayoutContent>
    </MaestroSidebarProvider>
  );
}
