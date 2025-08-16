import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
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

    // Obtener usuarios reales de la base de datos
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select(`
        id,
        email, 
        nickname, 
        nombre,
        apellido,
        created_at,
        referral_code,
        referred_by,
        user_level,
        total_referrals
      `)
      .order('created_at', { ascending: false });

    if (usersError) {
      console.error('Error obteniendo usuarios:', usersError);
      return NextResponse.json(
        { error: 'Error obteniendo usuarios' },
        { status: 500 }
      );
    }

    // Calcular métricas reales
    const totalUsers = users?.length || 0;
    const today = new Date().toISOString().split('T')[0];
    const registrationsToday = users?.filter(user => 
      user.created_at && user.created_at.startsWith(today)
    ).length || 0;

    const usersWithReferrals = users?.filter(user => 
      user.total_referrals && user.total_referrals > 0
    ).length || 0;

    const totalReferrals = users?.reduce((sum, user) => 
      sum + (user.total_referrals || 0), 0
    ) || 0;

    return NextResponse.json({
      success: true,
      metrics: {
        totalUsers,
        registrationsToday,
        usersWithReferrals,
        totalReferrals,
        systemStatus: 'Operativo',
        lastUpdate: new Date().toISOString()
      },
      recentUsers: users?.slice(0, 10).map(user => ({
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        nombre: user.nombre,
        apellido: user.apellido,
        created_at: user.created_at,
        user_level: user.user_level || 1,
        total_referrals: user.total_referrals || 0
      })) || [],
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error en estadísticas del maestro:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
