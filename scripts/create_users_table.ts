import 'dotenv/config';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';

dotenv.config({ path: '.env.local' });
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
import { Client } from 'pg';

/*
  Usage:
  1) Set env var DATABASE_URL to your Supabase Postgres connection string
     (e.g. postgres://postgres:[PASSWORD]@db.[HASH].supabase.co:5432/postgres)
     You can also place it in a .env file as DATABASE_URL=...
  2) npm run create:users

  Notes:
  - SUPABASE_SERVICE_ROLE_KEY is not used for direct Postgres DDL. For SQL over HTTP you would need the Meta API.
  - This script connects directly to the database to create the table.
*/

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('Missing DATABASE_URL env var');
    process.exit(1);
  }

  const client = new Client({ connectionString: databaseUrl });
  await client.connect();

  // Create table if not exists with requested schema
  const sql = `
    create table if not exists public.users (
      nombre   text,
      apellido text,
      nickname text,
      email    text unique,
      movil    text,
      exchange text,
      uid      text
    );
  `;

  try {
    await client.query('begin');
    await client.query(sql);
    await client.query('commit');
    console.log('Table public.users is ready');
  } catch (err) {
    await client.query('rollback');
    console.error('Failed creating table:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();


