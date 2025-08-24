import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    console.log('🔍 API /api/referrals/stats - Iniciando...');
    
    const supabase = await createClient();
    console.log('✅ Cliente Supabase creado');
    
    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('❌ Error de autenticación:', authError);
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }
    
    console.log('✅ Usuario autenticado:', user.email);
    
    // Usar la función SQL get_user_referral_stats que está disponible en la base de datos
    const { data: referralStats, error: statsError } = await supabase
      .rpc('get_user_referral_stats', { user_email_input: user.email });

    if (statsError) {
      console.error('❌ Error obteniendo estadísticas de referidos:', statsError);
      
      // Fallback: obtener datos básicos del perfil
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('id, nickname, user_level, referral_code, total_referrals')
        .eq('email', user.email)
        .single();

      if (profileError) {
        console.error('❌ Error obteniendo perfil de fallback:', profileError);
        return NextResponse.json({ error: 'Perfil de usuario no encontrado' }, { status: 404 });
      }

      // Preparar respuesta básica
      const basicStats = {
        referral_code: userProfile.referral_code || 'NO_CODE',
        total_referrals: userProfile.total_referrals || 0,
        total_earnings: 0,
        user_level: userProfile.user_level || 1,
        recent_referrals: []
      };

      console.log('✅ Estadísticas básicas obtenidas:', basicStats);
      return NextResponse.json(basicStats);
    }

    if (!referralStats) {
      console.error('❌ No se obtuvieron estadísticas de referidos');
      return NextResponse.json({ error: 'No se pudieron obtener estadísticas' }, { status: 500 });
    }

    console.log('✅ Estadísticas completas obtenidas:', referralStats);

    // La función SQL devuelve los datos en el formato correcto
    return NextResponse.json(referralStats);

  } catch (error) {
    console.error('❌ Error en API de estadísticas de referidos:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
