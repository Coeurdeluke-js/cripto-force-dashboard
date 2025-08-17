import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    console.log('API DIAGNOSE: Diagnose user request received');
    
    // Verificar autorización
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    console.log('API DIAGNOSE: Token extracted, length:', token.length);
    
    // Verificar el token con Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      console.error('API DIAGNOSE: Auth error:', authError);
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    console.log('API DIAGNOSE: Token verified, user ID:', user.id);
    console.log('API DIAGNOSE: User email:', user.email);

    // Obtener perfil del usuario autenticado
    const { data: authUserProfiles, error: authProfileError } = await supabase
      .from('users')
      .select('*')
      .eq('uid', user.id);

    console.log('API DIAGNOSE: Auth user profiles data:', authUserProfiles);
    console.log('API DIAGNOSE: Auth profile error:', authProfileError);

    // Obtener el body de la request
    const body = await request.json();
    const { targetUserId, targetUserEmail } = body;

    console.log('API DIAGNOSE: Target user ID:', targetUserId);
    console.log('API DIAGNOSE: Target user email:', targetUserEmail);

    let targetUserProfile = null;
    let targetUserError = null;

    // Buscar usuario por ID si se proporciona
    if (targetUserId) {
      const { data: userById, error: errorById } = await supabase
        .from('users')
        .select('*')
        .eq('id', targetUserId);

      console.log('API DIAGNOSE: User by ID data:', userById);
      console.log('API DIAGNOSE: User by ID error:', errorById);

      if (userById && userById.length > 0) {
        targetUserProfile = userById[0];
        console.log('API DIAGNOSE: Target user found by ID:', targetUserProfile);
      } else {
        targetUserError = `No se encontró usuario con ID: ${targetUserId}`;
      }
    }

    // Si no se encontró por ID, buscar por email
    if (!targetUserProfile && targetUserEmail) {
      const { data: userByEmail, error: errorByEmail } = await supabase
        .from('users')
        .select('*')
        .eq('email', targetUserEmail);

      console.log('API DIAGNOSE: User by email data:', userByEmail);
      console.log('API DIAGNOSE: User by email error:', errorByEmail);

      if (userByEmail && userByEmail.length > 0) {
        targetUserProfile = userByEmail[0];
        console.log('API DIAGNOSE: Target user found by email:', targetUserProfile);
      } else {
        targetUserError = targetUserError || `No se encontró usuario con email: ${targetUserEmail}`;
      }
    }

    // Obtener estadísticas generales de la tabla users
    const { count: totalUsers, error: countError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    console.log('API DIAGNOSE: Total users count:', totalUsers);
    console.log('API DIAGNOSE: Count error:', countError);

    // Buscar posibles duplicados
    const { data: possibleDuplicates, error: duplicatesError } = await supabase
      .from('users')
      .select('uid, email, COUNT(*)')
      .group('uid, email')
      .having('COUNT(*) > 1');

    console.log('API DIAGNOSE: Possible duplicates:', possibleDuplicates);
    console.log('API DIAGNOSE: Duplicates error:', duplicatesError);

    // Preparar diagnóstico completo
    const diagnosis = {
      timestamp: new Date().toISOString(),
      authenticatedUser: {
        id: user.id,
        email: user.email,
        profiles: authUserProfiles || [],
        profileCount: authUserProfiles ? authUserProfiles.length : 0,
        isMaestro: authUserProfiles && authUserProfiles.length > 0 ? 
          (authUserProfiles[0].user_level === 'maestro' || authUserProfiles[0].user_level === 3 || authUserProfiles[0].user_level === '3') : 
          false
      },
      targetUser: {
        requestedId: targetUserId,
        requestedEmail: targetUserEmail,
        found: !!targetUserProfile,
        profile: targetUserProfile,
        error: targetUserError
      },
      databaseStatus: {
        totalUsers: totalUsers || 0,
        possibleDuplicates: possibleDuplicates || [],
        hasDuplicates: possibleDuplicates && possibleDuplicates.length > 0
      },
      recommendations: []
    };

    // Generar recomendaciones
    if (!targetUserProfile) {
      diagnosis.recommendations.push('El usuario objetivo no fue encontrado en la base de datos');
      if (targetUserId) {
        diagnosis.recommendations.push(`Verificar que el ID ${targetUserId} existe en la tabla users`);
      }
      if (targetUserEmail) {
        diagnosis.recommendations.push(`Verificar que el email ${targetUserEmail} existe en la tabla users`);
      }
    }

    if (authUserProfiles && authUserProfiles.length > 1) {
      diagnosis.recommendations.push('El usuario autenticado tiene múltiples perfiles - considerar limpieza');
    }

    if (possibleDuplicates && possibleDuplicates.length > 0) {
      diagnosis.recommendations.push('Se detectaron posibles duplicados en la base de datos');
    }

    if (!diagnosis.authenticatedUser.isMaestro) {
      diagnosis.recommendations.push('El usuario autenticado no tiene permisos de Maestro');
    }

    console.log('API DIAGNOSE: Diagnosis completed:', diagnosis);

    return NextResponse.json({
      success: true,
      message: 'Diagnóstico completado',
      diagnosis
    });

  } catch (error) {
    console.error('API DIAGNOSE: Unexpected error:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

