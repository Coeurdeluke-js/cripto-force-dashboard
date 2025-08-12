import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// This route ensures the table exists (via Supabase SQL API) and then inserts the user via REST.
// Required server env vars:
// - SUPABASE_SERVICE_ROLE_KEY
// - SUPABASE_PROJECT_REF (e.g. qtbplksozfropbubykud)

type IncomingBody = {
  nombre: string
  apellido: string
  nickname: string
  email: string
  movil?: string
  exchange?: string
  uid?: string
  // Optional, only for fallback path (public info)
  supabaseUrl?: string
  supabaseAnon?: string
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('=== API DEBUG START ===');
    console.log('Request body:', body);
    
    // Debug environment variables
    console.log('Environment variables available:');
    console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
    console.log('SUPABASE_PROJECT_REF:', process.env.SUPABASE_PROJECT_REF);
    
    // Check if keys are actually loaded
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const projectRef = process.env.SUPABASE_PROJECT_REF;
    
    console.log('Keys loaded:');
    console.log('Service Key length:', serviceKey ? serviceKey.length : 0);
    console.log('Anon Key length:', anonKey ? anonKey.length : 0);
    console.log('URL:', url);
    console.log('Project Ref:', projectRef);
    console.log('=== API DEBUG END ===');

    // Validate required fields
    const missing: string[] = [];
    if (!body?.nombre?.trim()) missing.push('nombre');
    if (!body?.apellido?.trim()) missing.push('apellido');
    if (!body?.nickname?.trim()) missing.push('nickname');
    if (!body?.email?.trim()) missing.push('email');

    if (missing.length) {
      return NextResponse.json(
        { error: `Campos requeridos faltantes: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    // Use client-provided credentials if server env vars are not available
    const finalUrl = url || body.supabaseUrl;
    const finalAnonKey = anonKey || body.supabaseAnon;
    const finalServiceKey = serviceKey;
    
    console.log('Final credentials:');
    console.log('Final URL:', finalUrl);
    console.log('Final Anon Key exists:', !!finalAnonKey);
    console.log('Final Service Key exists:', !!finalServiceKey);

    if (!finalUrl) {
      return NextResponse.json({ error: 'Supabase URL no disponible' }, { status: 400 });
    }

    if (!finalAnonKey && !finalServiceKey) {
      return NextResponse.json({ error: 'No hay claves de Supabase disponibles' }, { status: 400 });
    }

    const row = {
      nombre: body.nombre.trim(),
      apellido: body.apellido.trim(),
      nickname: body.nickname.trim(),
      email: body.email.trim().toLowerCase(),
      movil: body.movil || null,
      exchange: body.exchange || null,
      uid: body.uid || null,
      created_at: new Date().toISOString(),
    };

    console.log('Attempting to insert user data:', row);

    // Try to create table first if using service role key
    if (finalServiceKey) {
      try {
        console.log('Attempting to create table with service role key...');
        const admin = createClient(finalUrl, finalServiceKey);
        
        // Try to insert directly
        const { data: adminData, error: adminError } = await admin
          .from('users')
          .insert(row)
          .select()
          .single();
          
        if (adminError) {
          console.log('Admin insert error:', adminError);
          // If table doesn't exist, try to create it
          if (adminError.message.includes('relation "users" does not exist')) {
            console.log('Table does not exist, attempting to create...');
            const { error: createError } = await admin.rpc('exec_sql', {
              sql: `
                CREATE TABLE IF NOT EXISTS public.users (
                  id SERIAL PRIMARY KEY,
                  nombre TEXT NOT NULL,
                  apellido TEXT NOT NULL,
                  nickname TEXT NOT NULL,
                  email TEXT UNIQUE NOT NULL,
                  movil TEXT,
                  exchange TEXT,
                  uid TEXT,
                  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
              `
            });
            
            if (createError) {
              console.log('Table creation error:', createError);
            } else {
              console.log('Table created successfully, retrying insert...');
              const { data: retryData, error: retryError } = await admin
                .from('users')
                .insert(row)
                .select()
                .single();
                
              if (retryError) {
                console.log('Retry insert error:', retryError);
                return NextResponse.json({ error: retryError.message }, { status: 500 });
              }
              
              console.log('User created successfully with service role key');
              return NextResponse.json({ user: retryData });
            }
          }
          return NextResponse.json({ error: adminError.message }, { status: 500 });
        }
        
        console.log('User created successfully with service role key');
        return NextResponse.json({ user: adminData });
      } catch (error) {
        console.log('Service role key attempt failed:', error);
      }
    }

    // Fallback: use anon key
    if (finalAnonKey) {
      try {
        console.log('Attempting to insert with anon key...');
        const client = createClient(finalUrl, finalAnonKey);
        const { data: anonData, error: anonError } = await client
          .from('users')
          .insert(row)
          .select()
          .single();
          
        if (anonError) {
          console.log('Anon key insert error:', anonError);
          return NextResponse.json({ error: anonError.message }, { status: 500 });
        }
        
        console.log('User created successfully with anon key');
        return NextResponse.json({ user: anonData });
      } catch (error) {
        console.log('Anon key attempt failed:', error);
        return NextResponse.json({ error: 'Error al crear usuario con clave anónima' }, { status: 500 });
      }
    }

    return NextResponse.json({ error: 'No se pudo crear el usuario' }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? 'Error inesperado' },
      { status: 500 }
    )
  }
}


