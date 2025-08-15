import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      );
    }

    // Crear cliente con service role
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Obtener estadísticas usando la función SQL
    const { data, error } = await supabase
      .rpc('get_user_referral_stats', { user_email: email });

    if (error) {
      console.error('Error obteniendo estadísticas:', error);
      return NextResponse.json(
        { error: 'Error interno del servidor' },
        { status: 500 }
      );
    }

    if (!data.success) {
      return NextResponse.json(
        { error: data.error || 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      stats: {
        referralCode: data.referral_code,
        totalReferrals: data.total_referrals,
        totalEarnings: data.total_earnings,
        userLevel: data.user_level,
        recentReferrals: data.recent_referrals
      }
    });

  } catch (error) {
    console.error('Error en estadísticas de referidos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
