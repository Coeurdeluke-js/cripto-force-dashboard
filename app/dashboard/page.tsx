import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  try {
    // Verificar que las variables de entorno estén disponibles
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase environment variables not configured, redirecting to iniciado');
      redirect('/dashboard/iniciado');
    }

  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  
  // Aquí implementarás la lógica para determinar el nivel del usuario
  // Por ahora, redirigimos a todos los usuarios al dashboard de iniciado
  redirect('/dashboard/iniciado');
  } catch (error) {
    console.error('Error in dashboard page:', error);
    // En caso de error, redirigir al dashboard de iniciado
    redirect('/dashboard/iniciado');
  }
}