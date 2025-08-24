'use client';

import { useState, useEffect } from 'react';
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
import { supabase } from '@/lib/supabaseClient';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function SignInPage() {
  const router = useRouter();
  const { userData, loading, isReady } = useSafeAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [attemptCount, setAttemptCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  // Cargar credenciales guardadas al montar el componente
  useEffect(() => {
    const savedCredentials = localStorage.getItem('rememberedCredentials');
    if (savedCredentials) {
      try {
        const credentials = JSON.parse(savedCredentials);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        if (new Date(credentials.timestamp) > thirtyDaysAgo) {
          setFormData({
            email: credentials.email,
            password: credentials.password
          });
          setRememberMe(true);
        } else {
          localStorage.removeItem('rememberedCredentials');
        }
      } catch (error) {
        console.error('Error loading saved credentials:', error);
        localStorage.removeItem('rememberedCredentials');
      }
    }
  }, []);

  // Debug: Mostrar estado del contexto
  useEffect(() => {
    console.log('🔍 SignInPage - Estado del contexto:', {
      loading,
      isReady,
      userData: userData ? 'Presente' : 'No presente'
    });
  }, [loading, isReady, userData]);

  // Si ya hay usuario autenticado, redirigir
  useEffect(() => {
    if (userData && !loading) {
      console.log('✅ SignInPage - Usuario ya autenticado, redirigiendo...');
      router.push('/login/dashboard-selection');
    }
  }, [userData, loading, router]);

  // Mostrar loading mientras no esté listo
  if (!isReady) {
    console.log('⏳ SignInPage - Mostrando loading, isReady:', isReady);
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-white mt-4">Cargando contexto de autenticación...</p>
          <p className="text-white/60 text-sm">loading: {loading.toString()}</p>
          <p className="text-white/60 text-sm">isReady: {isReady.toString()}</p>
        </div>
      </div>
    );
  }

  // Si ya hay usuario autenticado, mostrar loading mientras redirige
  if (userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-white mt-4">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  // Función para manejar cambios en "Recordarme"
  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
    
    // Si se desmarca "Recordarme", limpiar credenciales guardadas
    if (!checked) {
      localStorage.removeItem('rememberedCredentials');
      console.log('Casilla "Recordarme" desmarcada - credenciales eliminadas');
    }
  };

  // Función para limpiar credenciales guardadas manualmente
  const handleClearCredentials = () => {
    localStorage.removeItem('rememberedCredentials');
    setFormData({ email: '', password: '' });
    setRememberMe(false);
    console.log('Credenciales guardadas limpiadas manualmente');
  };

  // Función para guardar credenciales
  const saveCredentials = (email: string, password: string, shouldRemember: boolean) => {
    if (shouldRemember) {
      const credentials = {
        email,
        password,
        rememberMe: true,
        timestamp: new Date().toISOString()
      };
      
      try {
        localStorage.setItem('rememberedCredentials', JSON.stringify(credentials));
        console.log('Credenciales guardadas para recordar');
        return true;
      } catch (error) {
        console.error('Error saving credentials:', error);
        return false;
      }
    } else {
      localStorage.removeItem('rememberedCredentials');
      return true;
    }
  };

  // Función para verificar si hay credenciales guardadas
  const hasSavedCredentials = () => {
    return localStorage.getItem('rememberedCredentials') !== null;
  };

  // Función para manejar login con Google
  const handleGoogleLogin = async () => {
    try {
      setIsSubmitting(true);
      console.log('Iniciando sesión con Google...');
      
      // Implementación real con Supabase OAuth
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://qtbplksozfropbubykud.supabase.co/auth/v1/callback',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('Error en Google OAuth:', error);
        setErrors({ general: `Error al conectar con Google: ${error.message}` });
        return;
      }

      console.log('Redirigiendo a Google OAuth...', data);
      // Supabase maneja la redirección automáticamente
      
    } catch (error) {
      console.error('Error inesperado en Google login:', error);
      setErrors({ general: 'Error al conectar con Google. Intenta de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para manejar login con Twitter
  const handleTwitterLogin = async () => {
    try {
      setIsSubmitting(true);
      console.log('Iniciando sesión con Twitter...');
      
      // Implementación futura de Twitter OAuth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Funcionalidad de Twitter en desarrollo...');
      
    } catch (error) {
      setErrors({ general: 'Funcionalidad de Twitter no disponible aún.' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
      console.log('🔐 Iniciando autenticación con Supabase...');
      
      // AUTENTICACIÓN DIRECTA CON SUPABASE
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        console.error('❌ Error de autenticación:', error);
        setErrors({ general: error.message || 'Email o contraseña incorrectos' });
        
        // Incrementar contador de intentos fallidos
        const newAttemptCount = attemptCount + 1;
        setAttemptCount(newAttemptCount);
        
        // Bloquear después de 3 intentos fallidos
        if (newAttemptCount >= 3) {
          setIsBlocked(true);
          setTimeout(() => {
            setIsBlocked(false);
            setAttemptCount(0);
          }, 15 * 60 * 1000); // 15 minutos
        }
        
        return;
      }

      if (data.user) {
        console.log('✅ Usuario autenticado exitosamente:', data.user.email);
        
        // Si la autenticación es exitosa, manejar "Recordarme"
        if (rememberMe) {
          // Guardar credenciales en localStorage
          saveCredentials(formData.email, formData.password, true);
          console.log('Credenciales guardadas para recordar');
        } else {
          // Limpiar credenciales guardadas si no se marca "Recordarme"
          localStorage.removeItem('rememberedCredentials');
          console.log('Credenciales guardadas eliminadas');
        }
        
        // Redirigir al selector de dashboard después del login exitoso
        console.log('🚀 Redirigiendo a selección de dashboard...');
        router.push('/login/dashboard-selection');
      }
      
    } catch (error) {
      console.error('❌ Error inesperado en el login:', error);
      setErrors({ general: 'Error inesperado al iniciar sesión. Inténtalo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center p-4">
      {/* Fondo con elementos sutiles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-3">
          <div className="absolute top-20 left-20 w-32 h-32 border border-[#2a2a2a] transform rotate-45"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-[#2a2a2a] transform -rotate-45"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-[#2a2a2a] transform rotate-12"></div>
          <div className="absolute bottom-40 right-1/4 w-28 h-28 border border-[#2a2a2a] transform -rotate-12"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[#8a8a8a] hover:text-[#a0a0a0] transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            Volver al inicio
          </Link>
          
          <h1 className="text-3xl font-semibold text-white mb-2">
            Bienvenido de vuelta
          </h1>
          <p className="text-[#8a8a8a] text-base">
            Inicia sesión en tu cuenta de <span className="text-[#ec4d58] font-medium">Crypto Force</span>
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-[#1e1e1e]/90 backdrop-blur-sm rounded-xl p-8 border border-[#2a2a2a] shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#a0a0a0] mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg focus:outline-none focus:ring-2 transition-all pl-12 ${
                    errors.email 
                      ? 'border-[#ec4d58] focus:ring-[#ec4d58]/50' 
                      : 'border-[#3a3a3a] focus:ring-[#4a4a4a] focus:border-[#4a4a4a]'
                  }`}
                  placeholder="tu@email.com"
                />
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6a6a6a]" />
              </div>
              {errors.email && (
                <p className="text-[#ec4d58] text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-[#a0a0a0] mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg focus:outline-none focus:ring-2 transition-all pl-12 pr-12 ${
                    errors.password 
                      ? 'border-[#ec4d58] focus:ring-[#ec4d58]/50' 
                      : 'border-[#3a3a3a] focus:ring-[#4a4a4a] focus:border-[#4a4a4a]'
                  }`}
                  placeholder="Tu contraseña"
                />
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6a6a6a]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6a6a6a] hover:text-[#8a8a8a] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[#ec4d58] text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Mensaje de error general */}
            {errors.general && (
              <div className="p-3 rounded-lg bg-[#ec4d58]/10 border border-[#ec4d58]/20 text-[#ec4d58] text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {errors.general}
              </div>
            )}

            {/* Opciones adicionales */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-[#8a8a8a]">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => handleRememberMeChange(e.target.checked)} 
                    className="rounded border-[#3a3a3a] bg-[#2a2a2a] text-[#4a4a4a] focus:ring-[#4a4a4a] focus:ring-offset-2 focus:ring-offset-[#1e1e1e]" 
                  />
                  <span>Recordarme</span>
                </label>
                
                {/* Estado de credenciales guardadas - CORREGIDO: Una sola línea */}
                {hasSavedCredentials() && (
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20 flex items-center gap-1">
                    <span>✓</span>
                    <span>Guardado</span>
                  </span>
                )}
                {rememberMe && (
                  <button
                    type="button"
                    onClick={handleClearCredentials}
                    className="text-xs text-[#6a6a6a] hover:text-[#8a8a8a] transition-colors px-2 py-1 rounded-md hover:bg-[#3a3a3a]"
                    title="Limpiar credenciales guardadas"
                  >
                    Limpiar
                  </button>
                )}
              </div>
              
              <Link 
                href="/login/forgot-password" 
                className="text-sm text-[#6a6a6a] hover:text-[#8a8a8a] transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Información sobre "Recordarme" */}
            {rememberMe && (
              <div className="p-3 bg-[#2a2a2a]/50 border border-[#3a3a3a] rounded-lg">
                <p className="text-[#8a8a8a] text-xs leading-relaxed">
                  <span className="font-medium text-[#a0a0a0]">Recordarme activado:</span> Tus credenciales se guardarán en este dispositivo para futuros inicios de sesión.
                  {hasSavedCredentials() && (
                    <span className="block mt-1 text-emerald-400">
                      ✓ Credenciales actualmente guardadas en este dispositivo.
                    </span>
                  )}
                </p>
              </div>
            )}

            {/* Advertencia de seguridad */}
            {hasSavedCredentials() && (
              <div className="p-3 bg-[#2a2a2a]/50 border border-[#3a3a3a] rounded-lg">
                <p className="text-[#8a8a8a] text-xs leading-relaxed">
                  <span className="font-medium text-[#a0a0a0]">Seguridad:</span> Las credenciales están guardadas en este dispositivo. 
                  Solo usa esta función en dispositivos personales y seguros.
                </p>
              </div>
            )}

            {/* Botón de envío */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || isBlocked}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  isSubmitting || isBlocked
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#ec4d58] to-[#d93c47] hover:from-[#d93c47] hover:to-[#ec4d58] text-white hover:shadow-lg hover:shadow-[#ec4d58]/25'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Iniciando sesión...
                  </div>
                ) : isBlocked ? (
                  <div className="flex items-center justify-center gap-2">
                    <Lock size={20} />
                    Cuenta bloqueada
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn size={20} />
                    Iniciar Sesión
                  </div>
                )}
              </button>
            </div>

            {/* Enlaces adicionales */}
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#3a3a3a]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#1e1e1e] text-[#6a6a6a]">O continúa con</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#2a2a2a]/50 border border-[#3a3a3a] rounded-lg hover:bg-[#3a3a3a]/70 transition-colors text-[#8a8a8a] hover:text-[#a0a0a0] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  onClick={handleTwitterLogin}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#2a2a2a]/50 border border-[#3a3a3a] rounded-lg hover:bg-[#3a3a3a]/70 transition-colors text-[#8a8a8a] hover:text-[#a0a0a0] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  Twitter
                </button>
              </div>
            </div>

            {/* Opción para vincular cuenta existente */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={async () => {
                  try {
                    setIsSubmitting(true);
                    // Usar el mismo flujo de OAuth pero con login_hint
                    const { data, error } = await supabase.auth.signInWithOAuth({
                      provider: 'google',
                      options: {
                        redirectTo: 'https://qtbplksozfropbubykud.supabase.co/auth/v1/callback',
                        queryParams: {
                          access_type: 'offline',
                          prompt: 'consent',
                          login_hint: formData.email, // Sugerir el email al usuario
                        },
                      },
                    });

                    if (error) {
                      setErrors({ general: `Error al conectar con Google: ${error.message}` });
                      return;
                    }

                    console.log('Redirigiendo a Google para vincular cuenta...', data);
                    // Supabase maneja la redirección automáticamente
                    
                  } catch (error) {
                    setErrors({ general: 'Error al vincular cuenta con Google' });
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                disabled={isSubmitting || !formData.email}
                className="text-sm text-[#6a6a6a] hover:text-[#8a8a8a] transition-colors underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ¿Ya tienes cuenta? Vincular con Google
              </button>
            </div>

            {/* Enlace de registro */}
            <div className="text-center pt-4">
              <p className="text-[#6a6a6a]">
                ¿No tienes una cuenta?{' '}
                <Link href="/login" className="text-[#8a8a8a] hover:text-[#a0a0a0] transition-colors font-medium">
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
