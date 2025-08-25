import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// Lista de emails autorizados para acceder a la dashboard de Maestro
const MAESTRO_AUTHORIZED_EMAILS = [
  'infocryptoforce@gmail.com',
  'coeurdeluke.js@gmail.com'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('🔍 Middleware ejecutándose para:', pathname);

  // TEMPORALMENTE DESACTIVADO PARA DEBUGGING
  console.log('⚠️ Middleware temporalmente desactivado para debugging');
  return NextResponse.next();

  // Proteger rutas de Maestro
  if (pathname.startsWith('/dashboard/maestro')) {
    console.log('🛡️ Middleware: Protegiendo ruta de Maestro');
    
    try {
      const supabase = await createClient();
      const { data: { user }, error } = await supabase.auth.getUser();

      console.log('🔍 Middleware: Usuario obtenido:', user ? 'SÍ' : 'NO');
      console.log('🔍 Middleware: Error:', error);

      // Si no hay usuario autenticado, redirigir al login
      if (error || !user) {
        console.log('🚫 Middleware: Usuario no autenticado intentando acceder a Maestro');
        return NextResponse.redirect(new URL('/login/signin', request.url));
      }

      // Verificar si el email está autorizado
      const userEmail = user?.email?.toLowerCase().trim();
      const isAuthorized = userEmail ? MAESTRO_AUTHORIZED_EMAILS.includes(userEmail as string) : false;

      console.log('🔍 Middleware: Email del usuario:', userEmail);
      console.log('🔍 Middleware: ¿Autorizado?:', isAuthorized);

      if (!isAuthorized) {
        console.log(`🚫 Middleware: Usuario ${userEmail?.substring(0, 3)}*** no autorizado para Maestro`);
        return NextResponse.redirect(new URL('/login/dashboard-selection', request.url));
      }

      console.log(`✅ Middleware: Acceso autorizado a Maestro para ${userEmail?.substring(0, 3)}***`);
      return NextResponse.next();

    } catch (error) {
      console.error('Error en middleware de Maestro:', error);
      return NextResponse.redirect(new URL('/login/dashboard-selection', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/maestro/:path*',
    '/api/maestro/:path*'
  ]
};