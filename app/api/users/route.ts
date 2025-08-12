import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Debug: Verificar variables de entorno
    console.log('🔍 Debug API - Variables de entorno:');
    console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Disponible' : '❌ No disponible');
    console.log('SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Disponible' : '❌ No disponible');
    console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Disponible' : '❌ No disponible');

    // Validar campos requeridos
    const requiredFields = ['nombre', 'apellido', 'nickname', 'email', 'password'];
    const missing = requiredFields.filter(field => !body[field] || body[field].trim() === '');
    
    if (missing.length > 0) {
      return NextResponse.json({ 
        error: `Campos requeridos faltantes: ${missing.join(', ')}` 
      }, { status: 400 });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ 
        error: 'Formato de email inválido' 
      }, { status: 400 });
    }

    // Validar password (mínimo 6 caracteres)
    if (body.password.length < 6) {
      return NextResponse.json({ 
        error: 'La contraseña debe tener al menos 6 caracteres' 
      }, { status: 400 });
    }

    // Preparar datos para insertar
    const userData = {
      nombre: body.nombre.trim(),
      apellido: body.apellido.trim(),
      nickname: body.nickname.trim(),
      email: body.email.toLowerCase().trim(),
      movil: body.movil || null,
      exchange: body.exchange || null,
      uid: body.uid || null,
      codigo_referido: body.codigoReferido || null,
      // No incluimos password aquí - se manejará por separado
    };

    console.log('📝 Datos del usuario a insertar:', userData);

    // Obtener variables de entorno
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ 
        error: 'Configuración de Supabase incompleta' 
      }, { status: 500 });
    }

    // Crear cliente de Supabase con anon key (ahora funciona con RLS)
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    console.log('🚀 Intentando insertar usuario en Supabase...');

    // Insertar usuario usando la anon key (ahora funciona con RLS)
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();

    if (error) {
      console.error('❌ Error al insertar usuario:', error);
      
      // Manejar errores específicos de validación
      if (error.code === '23505') { // Unique violation
        if (error.message.includes('email')) {
          return NextResponse.json({ 
            error: 'Este email ya está registrado' 
          }, { status: 409 });
        }
        if (error.message.includes('nickname')) {
          return NextResponse.json({ 
            error: 'Este nickname ya está en uso' 
          }, { status: 409 });
        }
        if (error.message.includes('exchange_uid')) {
          return NextResponse.json({ 
            error: 'Esta combinación de Exchange y UID ya existe' 
          }, { status: 409 });
        }
      }
      
      if (error.code === '23514') { // Check violation
        return NextResponse.json({ 
          error: 'Datos inválidos: ' + error.message 
        }, { status: 400 });
      }

      return NextResponse.json({ 
        error: 'Error al crear usuario: ' + error.message 
      }, { status: 500 });
    }

    console.log('✅ Usuario creado exitosamente:', data);

    // Retornar éxito (sin datos sensibles)
    return NextResponse.json({ 
      success: true,
      message: 'Usuario registrado exitosamente',
      userId: data.id
    });

  } catch (err: any) {
    console.error('💥 Error inesperado en API:', err);
    return NextResponse.json({ 
      error: 'Error interno del servidor: ' + err.message 
    }, { status: 500 });
  }
}


