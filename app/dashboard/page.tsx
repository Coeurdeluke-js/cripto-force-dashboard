import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import TimeZoneClock from '@/components/ui/TimeZoneClock';
import Image from 'next/image';
import ThemeToggle from '@/components/ui/ThemeToggle';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  
  // Aquí implementarás la lógica para determinar el nivel del usuario
  // Por ahora, redirigimos a todos los usuarios al dashboard de iniciado
  redirect('/dashboard/iniciado');
}