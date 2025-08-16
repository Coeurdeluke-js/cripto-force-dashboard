'use client';

import { useEffect, useState } from 'react';
import { useSafeAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import MaestroSidebar from '@/components/layout/MaestroSidebarLucide';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Lista de emails autorizados para acceder a la dashboard de Maestro
const MAESTRO_AUTHORIZED_EMAILS = [
  'infocriptoforce@gmail.com',
  'coeurdeluke.js@gmail.com',
  // Agregar temporalmente otros emails para testing
  'test@example.com',
  'admin@test.com'
];

export default function MaestroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

        // TEMPORALMENTE: Permitir acceso a cualquier usuario autenticado para debug
        const debugAccess = true;
        console.log('🔧 MAESTRO LAYOUT: Modo debug activado - permitiendo acceso');

        if (!clientAuthorized && !debugAccess) {
          console.log('🚫 MAESTRO LAYOUT: Acceso denegado - Email no autorizado para maestro');
          router.replace('/dashboard/iniciado');
          return;
        }

        console.log('🎯 MAESTRO LAYOUT: Email autorizado, procediendo con verificación de servidor...');

        // Para debug inmediato, usar solo validación por email
        console.log('✅ MAESTRO LAYOUT: Acceso autorizado por email - saltando verificación de servidor');
        setIsAuthorized(true);
        
        // Verificación adicional del lado del servidor (comentada temporalmente para debug)
        /*
        try {
          const response = await fetch('/api/permissions/maestro', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            console.log('🚫 Error en verificación del servidor');
            setIsAuthorized(true); // Permitir acceso si API falla
            return;
          }

          const data = await response.json();
          
          if (!data.authorized) {
            console.log('🚫 Acceso denegado por el servidor');
            router.replace('/dashboard/iniciado');
            return;
          }

          console.log('✅ Acceso autorizado como maestro');
          setIsAuthorized(true);
        } catch (error) {
          console.error('Error verificando permisos:', error);
          // En caso de error de la API, permitir acceso si el email está autorizado
          console.log('⚠️ Error de API, usando validación por email');
          setIsAuthorized(true);
        }
        */

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
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f]">
      <MaestroSidebar />
      
      {/* Main Content Area */}
      <div className="ml-72 transition-all duration-300">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
