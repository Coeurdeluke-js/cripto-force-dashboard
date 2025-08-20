import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST() {
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

    // Actualizar la última actividad del usuario en la tabla users
    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        last_activity: new Date().toISOString(),
        is_online: true
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('Error actualizando actividad del usuario:', updateError);
      // No retornamos error aquí para no interrumpir la experiencia del usuario
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error en heartbeat:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
