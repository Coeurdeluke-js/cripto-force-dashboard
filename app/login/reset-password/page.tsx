'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Lock, 
  Eye, 
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Shield
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    // Extraer el código de reset del URL
    const resetCode = searchParams.get('code');
    
    console.log('🔐 Reset Password Code:', resetCode ? 'Presente' : 'No encontrado');
    
    if (resetCode) {
      // El código está presente, proceder con la validación
      console.log('🔐 Código de reset encontrado, procediendo con validación...');
    } else {
      setErrors({ general: 'Enlace de reset inválido o expirado. Solicita un nuevo enlace.' });
    }
  }, [searchParams]);

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

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const resetCode = searchParams.get('code');
    if (!resetCode) {
      setErrors({ general: 'Enlace de reset inválido. Solicita un nuevo enlace.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      
      // Usar el código de reset para cambiar la contraseña
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: resetCode,
        type: 'recovery'
      });
      
      if (error) {
        throw new Error('Código de reset inválido o expirado');
      }
      
      // Ahora actualizar la contraseña
      const { data: updateData, error: updateError } = await supabase.auth.updateUser({
        password: formData.password
      });
      
      if (updateError) {
        throw new Error(updateError.message);
      }
      
      console.log('✅ Contraseña actualizada exitosamente');
      setIsSuccess(true);
      
      // Sign out after password change for security
      await supabase.auth.signOut();
      
    } catch (error) {
      console.error('❌ Error actualizando contraseña:', error);
      setErrors({ 
        general: error instanceof Error ? error.message : 'Error actualizando contraseña'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-[#1e2028]/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                ¡Contraseña actualizada!
              </h1>
              <p className="text-white/70">
                Tu contraseña ha sido cambiada exitosamente.
              </p>
            </div>

            <div className="pt-4">
              <Link 
                href="/login/signin"
                className="block w-full py-3 px-6 bg-gradient-to-r from-[#ec4d58] to-[#d93c47] hover:from-[#d93c47] hover:to-[#ec4d58] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#ec4d58]/25"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            href="/login/signin" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Volver al login
          </Link>
          
          <h1 className="text-4xl font-bold text-white mb-2">
            Nueva contraseña
          </h1>
          <p className="text-white/70 text-lg">
            Ingresa tu nueva contraseña
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-[#1e2028]/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mensaje de error general */}
            {errors.general && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {errors.general}
              </div>
            )}

            {/* Nueva contraseña */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Nueva contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#2a2d36] border rounded-lg focus:outline-none focus:ring-2 transition-all pl-12 pr-12 ${
                    errors.password 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-white/20 focus:ring-[#ec4d58] focus:border-[#ec4d58]'
                  }`}
                  placeholder="Mínimo 6 caracteres"
                />
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
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

            {/* Confirmar contraseña */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#2a2d36] border rounded-lg focus:outline-none focus:ring-2 transition-all pl-12 pr-12 ${
                    errors.confirmPassword 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-white/20 focus:ring-[#ec4d58] focus:border-[#ec4d58]'
                  }`}
                  placeholder="Repite la contraseña"
                />
                <Shield size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Información de seguridad */}
            <div className="bg-[#2a2d36]/50 rounded-lg p-4">
              <p className="text-white/70 text-sm">
                <Shield size={16} className="inline mr-2" />
                Tu nueva contraseña debe tener al menos 6 caracteres para mayor seguridad.
              </p>
            </div>

            {/* Botón de envío */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#ec4d58] to-[#d93c47] hover:from-[#d93c47] hover:to-[#ec4d58] text-white hover:shadow-lg hover:shadow-[#ec4d58]/25'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Actualizando contraseña...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Shield size={20} />
                    Actualizar contraseña
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ec4d58]"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
