import 'dotenv/config';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';

// Prefer .env.local if present (common in Next.js apps)
dotenv.config({ path: '.env.local' });
// Fallback to .env
dotenv.config();

function ensureEnvFromFiles() {
  const files = ['.env.local', '.env'];
  for (const file of files) {
    try {
      const p = path.resolve(process.cwd(), file);
      if (!fs.existsSync(p)) continue;
      const raw = fs.readFileSync(p, 'utf8');
      for (const line of raw.split(/\r?\n/)) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
        if (!m) continue;
        const key = m[1];
        let value = m[2];
        if (value?.startsWith('"') && value?.endsWith('"')) value = value.slice(1, -1);
        if (value?.startsWith("'") && value?.endsWith("'")) value = value.slice(1, -1);
        if (!(key in process.env)) process.env[key] = value;
      }
    } catch {}
  }
}

ensureEnvFromFiles();

/*
  Runs DDL against Supabase using the SQL API with SUPABASE_SERVICE_ROLE_KEY.

  Required env vars:
  - SUPABASE_SERVICE_ROLE_KEY
  - SUPABASE_PROJECT_REF   (e.g. abcdefghijklmnopqrs)

  Usage:
  npm run create:users:sql
*/

const SQL = `
create table if not exists public.users (
  nombre   text not null,
  apellido text not null,
  nickname text not null,
  email    text not null unique,
  movil    text,
  exchange text,
  uid      text
);
`;

async function main() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  let projectRef = process.env.SUPABASE_PROJECT_REF;

  if (!projectRef && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const u = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);
      // e.g. https://qtbplksozfropbubykud.supabase.co
      const [ref] = u.hostname.split('.');
      if (ref) projectRef = ref;
      process.env.SUPABASE_PROJECT_REF = projectRef as string;
    } catch {}
  }

  if (!serviceKey) {
    console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }
  if (!projectRef) {
    console.error('Missing SUPABASE_PROJECT_REF');
    process.exit(1);
  }

  const endpoint = 'https://api.supabase.com/v1/query';

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${serviceKey}`,
      'apikey': serviceKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: SQL,
      project: projectRef,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('SQL API error:', res.status, text);
    process.exit(1);
  }

  console.log('Table public.users created or already exists');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


