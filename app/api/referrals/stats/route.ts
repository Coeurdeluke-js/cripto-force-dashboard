import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      );
    }

    // Verificar que el usuario solo puede ver sus propias estadísticas
    if (user.email !== email) {
      return NextResponse.json(
        { error: 'No autorizado para ver estas estadísticas' },
        { status: 403 }
      );
    }

    // Llamar a la función SQL para obtener estadísticas
    const { data: stats, error: statsError } = await supabase
      .rpc('get_user_referral_stats', {
        user_email: email
      });

    if (statsError) {
      console.error('Error obteniendo estadísticas de referidos:', statsError);
      return NextResponse.json(
        { error: 'Error obteniendo estadísticas de referidos' },
        { status: 500 }
      );
    }

    if (!stats || !stats.success) {
      return NextResponse.json(
        { error: stats?.error || 'No se pudieron obtener las estadísticas' },
        { status: 404 }
      );
    }

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Error en API de estadísticas de referidos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
