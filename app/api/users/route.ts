import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as IncomingBody

    const missing: string[] = []
    if (!body?.nombre?.trim()) missing.push('nombre')
    if (!body?.apellido?.trim()) missing.push('apellido')
    if (!body?.nickname?.trim()) missing.push('nickname')
    if (!body?.email?.trim()) missing.push('email')

    if (missing.length) {
      return NextResponse.json(
        { error: `Campos requeridos faltantes: ${missing.join(', ')}` },
        { status: 400 }
      )
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    let projectRef = process.env.SUPABASE_PROJECT_REF
    if (!projectRef && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const u = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL)
        const [ref] = u.hostname.split('.')
        if (ref) projectRef = ref
      } catch {}
    }

    const row = {
      nombre: body.nombre.trim(),
      apellido: body.apellido.trim(),
      nickname: body.nickname.trim(),
      email: body.email.trim().toLowerCase(),
      movil: body.movil ?? null,
      exchange: body.exchange ?? null,
      uid: body.uid ?? null,
    }

    // Preferred path: try Service Role first if available
    const urlPublic = process.env.NEXT_PUBLIC_SUPABASE_URL || body.supabaseUrl
    if (urlPublic && serviceKey) {
      const admin = createClient(urlPublic, serviceKey)
      const { data: adminData, error: adminError } = await admin
        .from('users')
        .insert(row)
        .select()
        .single()
      if (adminError) {
        return NextResponse.json({ error: adminError.message }, { status: 500 })
      }
      return NextResponse.json({ user: adminData })
    }

    // Alternative: REST with projectRef + service key (unreachable now, kept for reference)
    if (serviceKey && projectRef && false) {
      const restUrl = `https://${projectRef}.supabase.co/rest/v1/users`

      const insertRes = await fetch(restUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify(row),
        cache: 'no-store',
      })

      if (!insertRes.ok) {
        const text = await insertRes.text()
        return NextResponse.json(
          { error: `Error insertando usuario: ${insertRes.status} ${text}` },
          { status: 500 }
        )
      }
      const data = await insertRes.json()
      return NextResponse.json({ user: Array.isArray(data) ? data[0] : data })
    }

    // Fallback: use anon key via supabase-js (works when RLS está desactivado)
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || body.supabaseUrl
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || body.supabaseAnon
    if (url && anon) {
      const client = createClient(url, anon)
      const { data: anonData, error: anonError } = await client
        .from('users')
        .insert(row)
        .select()
        .single()
      if (anonError) {
        return NextResponse.json({ error: anonError.message }, { status: 500 })
      }
      return NextResponse.json({ user: anonData })
    }

    const diag = {
      hasUrl: Boolean(urlPublic || url),
      hasServiceKey: Boolean(serviceKey),
      hasAnon: Boolean(anon),
      projectRef: projectRef || null,
    }
    return NextResponse.json({ error: 'Env no disponible', diag }, { status: 500 })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? 'Error inesperado' },
      { status: 500 }
    )
  }
}


