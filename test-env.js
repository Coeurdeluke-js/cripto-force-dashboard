// Script de test rápido para variables de entorno
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer archivo .env.local manualmente
try {
  const envPath = join(__dirname, '.env.local');
  const envContent = readFileSync(envPath, 'utf8');
  
  // Parsear variables de entorno
  const envVars = {};
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  });
  
  console.log('🔍 TEST RÁPIDO - Variables de entorno:');
  console.log('================================================');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', envVars.NEXT_PUBLIC_SUPABASE_URL || '❌ NO DISPONIBLE');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY || '❌ NO DISPONIBLE');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', envVars.SUPABASE_SERVICE_ROLE_KEY || '❌ NO DISPONIBLE');
  console.log('================================================');
  
  // Verificar si las variables están definidas
  const required = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'];
  const missing = required.filter(key => !envVars[key]);
  
  if (missing.length > 0) {
    console.log('❌ Variables faltantes:', missing);
    process.exit(1);
  } else {
    console.log('✅ Todas las variables requeridas están disponibles');
  }
  
} catch (error) {
  console.error('❌ Error al leer .env.local:', error.message);
  process.exit(1);
}
