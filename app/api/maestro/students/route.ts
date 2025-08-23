import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    console.log('🔍 API /api/maestro/students - Iniciando...');
    
    const supabase = await createClient();
    console.log('✅ Cliente Supabase creado');
    
    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('❌ Error de autenticación:', authError);
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }
    
    console.log('✅ Usuario autenticado:', user.email);
    
    // Verificar que sea un maestro (nivel 0)
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('user_level, nickname')
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

    if (userProfile.user_level !== 0) {
      console.error('❌ Usuario no es maestro. Nivel:', userProfile.user_level);
      return NextResponse.json({ error: 'Acceso denegado. Solo maestros pueden ver esta información' }, { status: 403 });
    }

    console.log('✅ Usuario es maestro, procediendo a obtener usuarios...');

    // Obtener todos los usuarios del sistema con todos los campos necesarios
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select(`
        id,
        nombre,
        apellido,
        email,
        nickname,
        movil,
        exchange,
        user_level,
        referral_code,
        referred_by,
        total_referrals,
        created_at,
        updated_at
      `)
      .order('created_at', { ascending: false });

    if (usersError) {
      console.error('❌ Error obteniendo usuarios:', usersError);
      console.error('❌ Detalles del error:', {
        message: usersError.message,
        details: usersError.details,
        hint: usersError.hint,
        code: usersError.code
      });
      return NextResponse.json({ 
        error: 'Error obteniendo usuarios: ' + usersError.message,
        details: usersError.details,
        hint: usersError.hint,
        code: usersError.code
      }, { status: 500 });
    }

    console.log('✅ Usuarios obtenidos:', users?.length || 0);
    
    // Log de los primeros usuarios para debugging
    if (users && users.length > 0) {
      console.log('🔍 Primer usuario como ejemplo:', {
        id: users[0].id,
        email: users[0].email,
        nickname: users[0].nickname,
        nombre: users[0].nombre,
        apellido: users[0].apellido,
        user_level: users[0].user_level,
        has_movil: !!users[0].movil,
        has_exchange: !!users[0].exchange
      });
    }

    // Respuesta simplificada
    return NextResponse.json({
      success: true,
      users: users || [],
      total: users?.length || 0,
      debug: {
        authenticatedUser: user.email,
        userLevel: userProfile.user_level,
        usersFound: users?.length || 0
      }
    });

  } catch (error) {
    console.error('❌ Error en API de estudiantes:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Verificar que sea un maestro (nivel 0)
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('user_level')
      .eq('email', user.email)
      .single();

    if (profileError || !userProfile) {
      return NextResponse.json({ error: 'Perfil de usuario no encontrado' }, { status: 404 });
    }

    if (userProfile.user_level !== 0) {
      return NextResponse.json({ error: 'Acceso denegado. Solo maestros pueden realizar esta acción' }, { status: 403 });
    }

    const body = await request.json();
    const { action, userId, userData } = body;

    switch (action) {
      case 'update_user':
        if (!userId || !userData) {
          return NextResponse.json({ error: 'Datos incompletos para actualizar usuario' }, { status: 400 });
        }

        const { error: updateError } = await supabase
          .from('users')
          .update({
            nombre: userData.nombre,
            apellido: userData.apellido,
            nickname: userData.nickname,
            movil: userData.movil,
            exchange: userData.exchange,
            user_level: userData.user_level,
            updated_at: new Date().toISOString()
          })
          .eq('id', userId);

        if (updateError) {
          console.error('Error actualizando usuario:', updateError);
          return NextResponse.json({ error: 'Error actualizando usuario' }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Usuario actualizado correctamente' });

      case 'delete_user':
        if (!userId) {
          return NextResponse.json({ error: 'ID de usuario requerido' }, { status: 400 });
        }

        const { error: deleteError } = await supabase
          .from('users')
          .delete()
          .eq('id', userId);

        if (deleteError) {
          console.error('Error eliminando usuario:', deleteError);
          return NextResponse.json({ error: 'Error eliminando usuario' }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Usuario eliminado correctamente' });

      default:
        return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
    }

  } catch (error) {
    console.error('Error en API de estudiantes (POST):', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
