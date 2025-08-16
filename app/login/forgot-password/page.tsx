'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Mail, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Send
} from 'lucide-react';

interface FormData {
  email: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('🔐 Enviando reset de contraseña a:', formData.email);
      
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Error enviando email de recuperación');
      }
      
      console.log('✅ Reset email enviado:', result);
      setIsEmailSent(true);
      
    } catch (error) {
      console.error('❌ Error al enviar email:', error);
      setErrors({ 
        general: error instanceof Error ? error.message : 'Error al enviar email de recuperación'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEmailSent) {
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
          <div className="bg-[#1e2028]/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Email enviado
              </h1>
              <p className="text-white/70">
                Hemos enviado un enlace de recuperación a <span className="text-[#FFD447]">{formData.email}</span>
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-white/60 text-sm">
                Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
              </p>
              
              <div className="pt-4 space-y-3">
                              <Link 
                href="/login/signin"
                className="block w-full py-3 px-6 bg-gradient-to-r from-[#ec4d58] to-[#d93c47] hover:from-[#d93c47] hover:to-[#ec4d58] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#ec4d58]/25"
              >
                  Volver al login
                </Link>
                
                <button
                  onClick={() => setIsEmailSent(false)}
                  className="block w-full py-3 px-6 bg-[#2a2d36] border border-white/20 text-white font-semibold rounded-lg hover:bg-[#3a3d46] transition-colors"
                >
                  Enviar otro email
                </button>
              </div>
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
            Recuperar contraseña
          </h1>
          <p className="text-white/70 text-lg">
            Ingresa tu email para recibir un enlace de recuperación
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
                      : 'border-white/20 focus:ring-[#ec4d58] focus:border-[#ec4d58]'
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

            {/* Mensaje de error general */}
            {errors.general && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {errors.general}
              </div>
            )}

            {/* Información adicional */}
            <div className="bg-[#2a2d36]/50 rounded-lg p-4">
              <p className="text-white/70 text-sm">
                Te enviaremos un enlace seguro a tu email para que puedas restablecer tu contraseña de forma segura.
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
                    Enviando email...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Send size={20} />
                    Enviar enlace de recuperación
                  </div>
                )}
              </button>
            </div>

            {/* Enlaces adicionales */}
            <div className="text-center pt-4 space-y-3">
              <p className="text-white/70 text-sm">
                ¿Recordaste tu contraseña?{' '}
                <Link href="/login/signin" className="text-[#ec4d58] hover:text-[#d93c47] transition-colors font-medium">
                  Inicia sesión aquí
                </Link>
              </p>
              
              <p className="text-white/70 text-sm">
                ¿No tienes una cuenta?{' '}
                <Link href="/login" className="text-[#ec4d58] hover:text-[#d93c47] transition-colors font-medium">
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
