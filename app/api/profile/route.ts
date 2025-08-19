import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('uid', user.id)
      .single();

    if (profileError) {
      return NextResponse.json({ error: 'Error obteniendo perfil' }, { status: 500 });
    }

    const userProfile = {
      id: profile.id,
      uid: profile.uid,
      nombre: profile.nombre || '',
      apellido: profile.apellido || '',
      nickname: profile.nickname || '',
      email: profile.email || '',
      movil: profile.movil || '',
      exchange: profile.exchange || '',
      user_level: profile.user_level || 1,
      referral_code: profile.referral_code || '',
      referred_by: profile.referred_by || '',
      total_referrals: profile.total_referrals || 0,
      total_earnings: profile.total_earnings || 0,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
      avatar: profile.avatar || '/images/default-avatar.png',
      birthdate: profile.birthdate || '',
      country: profile.country || '',
      bio: profile.bio || '',
      modulesCompleted: 0,
      achievements: 0
    };

    return NextResponse.json({ profile: userProfile });

  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const updates = await request.json();
    
    const allowedFields = [
      'nombre', 'apellido', 'nickname', 'movil', 'exchange',
      'birthdate', 'country', 'bio', 'avatar'
    ];

    const validUpdates: any = {};
    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        validUpdates[key] = updates[key];
      }
    });

    validUpdates.updated_at = new Date().toISOString();

    const { data: updatedProfile, error: updateError } = await supabase
      .from('users')
      .update(validUpdates)
      .eq('uid', user.id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: 'Error actualizando perfil' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Perfil actualizado correctamente',
      profile: updatedProfile
    });

  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

