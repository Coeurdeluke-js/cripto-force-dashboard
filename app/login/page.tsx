'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Hash, 
  Users, 
  Eye, 
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  SkipForward
} from 'lucide-react';
import CountryPhoneInput from '@/components/ui/CountryPhoneInput';

interface FormData {
  nombre: string;
  apellido: string;
  nickname: string;
  email: string;
  numeroMovil: string;
  exchange: string;
  uid: string;
  codigoReferido: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function LoginPage() {
  const router = useRouter();
  const PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qtbplksozfropbubykud.supabase.co';
  const PUBLIC_SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  // Debug: Log environment variables
  console.log('=== CLIENT ENV DEBUG ===');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  console.log('PUBLIC_SUPABASE_URL:', PUBLIC_SUPABASE_URL);
  console.log('PUBLIC_SUPABASE_ANON:', PUBLIC_SUPABASE_ANON);
  console.log('PUBLIC_SUPABASE_ANON length:', PUBLIC_SUPABASE_ANON.length);
  console.log('=== END CLIENT ENV DEBUG ===');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    nickname: '',
    email: '',
    numeroMovil: '',
    exchange: '',
    uid: '',
    codigoReferido: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const exchanges = [
    { value: 'bidget', label: 'Bidget' },
    { value: 'zoomex', label: 'ZoomEx' }
  ];

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

    // Validaciones requeridas
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es requerido';
    }

    if (!formData.nickname.trim()) {
      newErrors.nickname = 'El nickname es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
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
    
    setIsSubmitting(true);
    setErrors({});

    try {
      const formDataToSend = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        nickname: formData.nickname,
        email: formData.email,
        movil: formData.numeroMovil || null,
        exchange: formData.exchange || null,
        uid: formData.uid || null,
        referralCode: formData.codigoReferido || null,
        password: formData.password,
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseAnon: PUBLIC_SUPABASE_ANON,
      };

      console.log('Sending form data:', {
        ...formDataToSend,
        supabaseAnon: formDataToSend.supabaseAnon ? `${formDataToSend.supabaseAnon.substring(0, 20)}...` : 'undefined'
      });

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }

      // Success
      setErrors({ submit: '¡Cuenta creada exitosamente!' });
      
      // Clear form
      setFormData({
        nombre: '',
        apellido: '',
        nickname: '',
        email: '',
        numeroMovil: '',
        exchange: '',
        uid: '',
        codigoReferido: '',
        password: '',
        confirmPassword: ''
      });
      
      // Redirect to signin after 2 seconds
      setTimeout(() => {
        router.push('/login/signin');
      }, 2000);

    } catch (error: any) {
      console.error('Error en el registro:', error);
      setErrors(prev => ({ ...prev, submit: error.message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    router.push('/login/dashboard-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center p-4 relative">
      {/* Fondo con triángulos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/10 transform rotate-45"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-white/10 transform -rotate-45"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-white/10 transform rotate-12"></div>
          <div className="absolute bottom-40 right-1/4 w-28 h-28 border border-white/10 transform -rotate-12"></div>
        </div>
      </div>

      {/* Skip Button - Bottom Right Corner */}
      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 flex items-center gap-2 z-50"
      >
        <SkipForward size={16} />
        Saltar
      </button>

      <div className="relative z-10 w-full max-w-2xl">
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
            Únete a <span className="text-[#EC4D58]">Crypto Force</span>
          </h1>
          <p className="text-white/70 text-lg">
            Comienza tu viaje en la comunidad más poderosa del trading
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-[#1e2028]/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Personal */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <User size={20} className="text-[#EC4D58]" />
                Información Personal
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className={`w-full px-4 py-3 bg-[#2a2d36] border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.nombre 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/20 focus:ring-[#EC4D58] focus:border-[#EC4D58]'
                    }`}
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.nombre}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    value={formData.apellido}
                    onChange={(e) => handleInputChange('apellido', e.target.value)}
                    className={`w-full px-4 py-3 bg-[#2a2d36] border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.apellido 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/20 focus:ring-[#EC4D58] focus:border-[#EC4D58]'
                    }`}
                    placeholder="Tu apellido"
                  />
                  {errors.apellido && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.apellido}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Nickname *
                </label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#2a2d36] border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.nickname 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-white/20 focus:ring-[#EC4D58] focus:border-[#EC4D58]'
                  }`}
                  placeholder="Tu nickname en la comunidad"
                />
                {errors.nickname && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.nickname}
                  </p>
                )}
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Mail size={20} className="text-[#EC4D58]" />
                Información de Contacto
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#2a2d36] border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-white/20 focus:ring-[#EC4D58] focus:border-[#EC4D58]'
                  }`}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Número Móvil (Opcional)
                </label>
                <CountryPhoneInput
                  value={formData.numeroMovil}
                  onChange={(value) => handleInputChange('numeroMovil', value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Información de Trading */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Building size={20} className="text-[#EC4D58]" />
                Información de Trading (Opcional)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Exchange
                  </label>
                  <select
                    value={formData.exchange}
                    onChange={(e) => handleInputChange('exchange', e.target.value)}
                    className="w-full px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC4D58] focus:border-[#EC4D58] transition-all"
                  >
                    <option value="">Selecciona un exchange</option>
                    {exchanges.map((exchange) => (
                      <option key={exchange.value} value={exchange.value}>
                        {exchange.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    UID
                  </label>
                  <input
                    type="text"
                    value={formData.uid}
                    onChange={(e) => handleInputChange('uid', e.target.value)}
                    className="w-full px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC4D58] focus:border-[#EC4D58] transition-all"
                    placeholder="Tu UID del exchange"
                  />
                </div>
              </div>
            </div>

            {/* Sistema de Referidos */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Users size={20} className="text-[#EC4D58]" />
                Sistema de Referidos
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Código de Referido (Opcional)
                </label>
                <input
                  type="text"
                  value={formData.codigoReferido}
                  onChange={(e) => handleInputChange('codigoReferido', e.target.value)}
                  className="w-full px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC4D58] focus:border-[#EC4D58] transition-all"
                  placeholder="Código de referido si tienes uno"
                />
                <p className="text-white/60 text-sm mt-2">
                  Si alguien te invitó, ingresa su código para obtener beneficios especiales
                </p>
              </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Hash size={20} className="text-[#EC4D58]" />
                Seguridad
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Contraseña *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full px-4 py-3 bg-[#2a2d36] border rounded-lg focus:outline-none focus:ring-2 transition-all pr-12 ${
                      errors.password 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/20 focus:ring-[#EC4D58] focus:border-[#EC4D58]'
                    }`}
                    placeholder="Mínimo 8 caracteres"
                  />
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

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Confirmar Contraseña *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full px-4 py-3 bg-[#2a2d36] border rounded-lg focus:outline-none focus:ring-2 transition-all pr-12 ${
                      errors.confirmPassword 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/20 focus:ring-[#EC4D58] focus:border-[#EC4D58]'
                    }`}
                    placeholder="Repite tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
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
            </div>

            {/* Botón de envío */}
            <div className="pt-6">
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
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creando cuenta...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle size={20} />
                    Crear Cuenta
                  </div>
                )}
              </button>
            </div>

            {/* Enlace de login */}
            <div className="text-center pt-4">
              {errors.submit && (
                <p className="text-red-400 mb-4 flex items-center justify-center gap-2">
                  <AlertCircle size={16} />
                  {errors.submit}
                </p>
              )}
              <p className="text-white/70">
                ¿Ya tienes una cuenta?{' '}
                <Link href="/login/signin" className="text-[#EC4D58] hover:text-[#D43F4A] transition-colors font-medium">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
