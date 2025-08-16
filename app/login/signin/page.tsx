'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowLeft,
  LogIn,
  AlertCircle,
  User
} from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useSafeAuth } from '@/context/AuthContext';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function SignInPage() {
  const router = useRouter();
  const { setUserData, isReady } = useSafeAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [attemptCount, setAttemptCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  // Mostrar loading mientras no esté listo
  if (!isReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Verificar si está bloqueado por demasiados intentos
    if (isBlocked) {
      setErrors({ general: 'Demasiados intentos fallidos. Espera 15 minutos antes de intentar de nuevo.' });
      return;
    }

    setIsSubmitting(true);

    try {
      // AUTENTICACIÓN REAL CON SUPABASE
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error || 'Email o contraseña incorrectos');
        return;
      }

      // Si la autenticación es exitosa, obtener datos del usuario
      const userData = result.userData;
      
      // Guardar datos del usuario en el contexto
      setUserData(userData);
      
      console.log('Inicio de sesión exitoso para:', formData.email);
      
      // Redirigir al selector de dashboard después del login exitoso
      router.push('/login/dashboard-selection');
    } catch (error) {
      console.error('Error en el login:', error);
      // Mostrar mensaje limpio al usuario (sin stack trace)
      setErrors({ general: 'Error al iniciar sesión. Verifica tus credenciales e inténtalo de nuevo.' });
      
      // Incrementar contador de intentos fallidos
      const newAttemptCount = attemptCount + 1;
      setAttemptCount(newAttemptCount);
      
      // Bloquear después de 3 intentos fallidos
      if (newAttemptCount >= 3) {
        setIsBlocked(true);
        setErrors({ general: 'Demasiados intentos fallidos. Cuenta bloqueada por 15 minutos por seguridad.' });
        
        // Desbloquear después de 15 minutos
        setTimeout(() => {
          setIsBlocked(false);
          setAttemptCount(0);
          setErrors({});
        }, 15 * 60 * 1000); // 15 minutos
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center p-4">
      {/* Fondo con triángulos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/10 transform rotate-45"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-white/10 transform -rotate-45"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-white/10 transform rotate-12"></div>
          <div className="absolute bottom-40 right-1/4 w-28 h-28 border border-white/10 transform -rotate-12"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Volver al inicio
          </Link>
          
          <h1 className="text-4xl font-bold text-white mb-2">
            Bienvenido de vuelta
          </h1>
          <p className="text-white/70 text-lg">
            Inicia sesión en tu cuenta de <span className="text-[#EC4D58]">Crypto Force</span>
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-[#1e2028]/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#2a2d36] border rounded-lg focus:outline-none focus:ring-2 transition-all pl-12 ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-white/20 focus:ring-[#FFD447] focus:border-[#FFD447]'
                  }`}
                  placeholder="tu@email.com"
                />
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#2a2d36] border rounded-lg focus:outline-none focus:ring-2 transition-all pl-12 pr-12 ${
                    errors.password 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-white/20 focus:ring-[#FFD447] focus:border-[#FFD447]'
                  }`}
                  placeholder="Tu contraseña"
                />
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Mensaje de error general */}
            {errors.general && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {errors.general}
              </div>
            )}

            {/* Opciones adicionales */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-white/70">
                <input type="checkbox" className="rounded border-white/20 bg-[#2a2d36] text-[#EC4D58] focus:ring-[#EC4D58]" />
                Recordarme
              </label>
              <Link href="/login/forgot-password" className="text-sm text-[#EC4D58] hover:text-[#D43F4A] transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Botón de envío */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#EC4D58] to-[#D43F4A] hover:from-[#D43F4A] hover:to-[#EC4D58] text-white hover:shadow-lg hover:shadow-[#EC4D58]/25'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-[#EC4D58] border-t-transparent rounded-full animate-spin"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn size={20} />
                    Iniciar Sesión
                  </div>
                )}
              </button>
            </div>
            
            {/* Botones de debug - Solo en desarrollo */}
            {process.env.NODE_ENV === 'development' && (
              <div className="pt-2 space-y-2">
                <details className="bg-gray-800/50 rounded-lg p-2">
                  <summary className="text-sm text-gray-400 cursor-pointer">🔧 Herramientas de Debug</summary>
                  <div className="mt-2 space-y-2">
                    <button
                      type="button"
                      onClick={async () => {
                        if (!formData.email) {
                          alert('Por favor ingresa un email primero');
                          return;
                        }
                        try {
                          console.log('🔧 Intentando arreglar usuario:', formData.email);
                          const response = await fetch('/api/debug/fix-user-auth', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: formData.email })
                          });
                          const result = await response.json();
                          alert('Diagnóstico:\n' + JSON.stringify(result, null, 2));
                          console.log('🔧 Fix User Auth:', result);
                        } catch (error) {
                          console.error('Error arreglando usuario:', error);
                          alert('Error: ' + error);
                        }
                      }}
                      className="w-full bg-orange-600 text-white py-1 px-3 rounded text-xs hover:bg-orange-700 transition-colors"
                    >
                      🔧 Diagnosticar Auth
                    </button>
                    
                    <button
                      type="button"
                      onClick={async () => {
                        if (!formData.email || !formData.password) {
                          alert('Por favor ingresa email Y contraseña primero');
                          return;
                        }
                        const confirmed = confirm('¿Recrear usuario en Auth?');
                        if (!confirmed) return;
                        
                        try {
                          const response = await fetch('/api/debug/recreate-auth-user', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                              email: formData.email,
                              password: formData.password 
                            })
                          });
                          const result = await response.json();
                          alert('Resultado:\n' + JSON.stringify(result, null, 2));
                          if (result.success) {
                            alert('✅ Usuario recreado! Intenta hacer login.');
                          }
                        } catch (error) {
                          console.error('Error recreando usuario:', error);
                          alert('Error: ' + error);
                        }
                      }}
                      className="w-full bg-red-600 text-white py-1 px-3 rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      🚨 Recrear Usuario
                    </button>
                  </div>
                </details>
              </div>
            )}

            {/* Enlaces adicionales */}
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#1e2028] text-white/60">O continúa con</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-[#2a2d36] border border-white/20 rounded-lg hover:bg-[#3a3d46] transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-[#2a2d36] border border-white/20 rounded-lg hover:bg-[#3a3d46] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  Twitter
                </button>
              </div>
            </div>

            {/* Enlace de registro */}
            <div className="text-center pt-4">
              <p className="text-white/70">
                ¿No tienes una cuenta?{' '}
                <Link href="/login" className="text-[#EC4D58] hover:text-[#D43F4A] transition-colors font-medium">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
