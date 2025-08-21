import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    console.log('🔍 API /api/referrals/validate - Iniciando...');
    
    const supabase = await createClient();
    console.log('✅ Cliente Supabase creado');
    
    // Obtener datos del request
    const { code } = await request.json();
    
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ 
        success: false, 
        error: 'Código de referido requerido' 
      }, { status: 400 });
    }

    console.log('🔍 Validando código:', code);

    // Buscar usuario con ese código de referido
    const { data: referrer, error: searchError } = await supabase
      .from('users')
      .select('id, nickname, email, user_level')
      .eq('referral_code', code.trim())
      .single();

    if (searchError) {
      if (searchError.code === 'PGRST116') {
        // No se encontró ningún usuario con ese código
        console.log('❌ Código no válido:', code);
        return NextResponse.json({
          success: true,
          valid: false,
          error: 'Código de referido no válido'
        });
      }
      
      console.error('❌ Error buscando referido:', searchError);
      return NextResponse.json({
        success: false,
        error: 'Error validando código de referido'
      }, { status: 500 });
    }

    if (!referrer) {
      console.log('❌ Código no válido:', code);
      return NextResponse.json({
        success: true,
        valid: false,
        error: 'Código de referido no válido'
      });
    }

    // Verificar que el referido no sea el mismo usuario (evitar auto-referencias)
    // Esto se puede implementar si es necesario

    console.log('✅ Código válido para:', referrer.nickname);

    return NextResponse.json({
      success: true,
      valid: true,
      referrer: {
        nickname: referrer.nickname,
        email: referrer.email,
        user_level: referrer.user_level
      }
    });

  } catch (error) {
    console.error('❌ Error en API de validación de referidos:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
