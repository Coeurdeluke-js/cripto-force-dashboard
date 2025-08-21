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
    
    // Obtener perfil del usuario
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('id, nickname, user_level, referral_code, total_referrals')
      .eq('email', user.email)
      .single();

    if (profileError) {
      console.error('❌ Error obteniendo perfil:', profileError);
      return NextResponse.json({ error: 'Perfil de usuario no encontrado' }, { status: 404 });
    }

    if (!userProfile) {
      console.error('❌ Perfil de usuario no encontrado');
      return NextResponse.json({ error: 'Perfil de usuario no encontrado' }, { status: 404 });
    }

    console.log('✅ Perfil obtenido:', userProfile);

    // Obtener referidos recientes del usuario
    const { data: recentReferrals, error: referralsError } = await supabase
      .from('users')
      .select('nickname, created_at, user_level')
      .eq('referred_by', userProfile.referral_code)
      .order('created_at', { ascending: false })
      .limit(5);

    if (referralsError) {
      console.error('❌ Error obteniendo referidos:', referralsError);
      // No fallar si no se pueden obtener referidos, continuar con datos básicos
    }

    // Calcular ganancias totales (placeholder por ahora)
    const totalEarnings = 0; // TODO: Implementar cálculo real de ganancias

    // Preparar respuesta
    const referralStats = {
      referral_code: userProfile.referral_code || 'NO_CODE',
      total_referrals: userProfile.total_referrals || 0,
      total_earnings: totalEarnings,
      user_level: userProfile.user_level || 1,
      recent_referrals: recentReferrals || []
    };

    console.log('✅ Estadísticas preparadas:', referralStats);

    return NextResponse.json(referralStats);

  } catch (error) {
    console.error('❌ Error en API de estadísticas de referidos:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
