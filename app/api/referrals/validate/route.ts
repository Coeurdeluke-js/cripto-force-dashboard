import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Código de referido es requerido' },
        { status: 400 }
      );
    }

    // Crear cliente con service role para consultas avanzadas
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Validar código usando la función SQL
    const { data, error } = await supabase
      .rpc('validate_referral_code', { code });

    if (error) {
      console.error('Error validando código:', error);
      return NextResponse.json(
        { error: 'Error interno del servidor' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      valid: data.valid,
      referrer: data.valid ? {
        nickname: data.referrer_nickname,
        email: data.referrer_email
      } : null
    });

  } catch (error) {
    console.error('Error en validación de referido:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
