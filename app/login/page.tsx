'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, Building, Hash, Gift, SkipForward } from 'lucide-react';
import CountryPhoneInput from '@/components/ui/CountryPhoneInput';
import ReferralCode from '@/components/ui/ReferralCode';

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    nickname: '',
    email: '',
    numeroMovil: '+54 ',
    exchange: '',
    uid: '',
    codigoReferido: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validaciones básicas
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
    if (!formData.nickname.trim()) newErrors.nickname = 'El nickname es requerido';
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    // Validar password
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validar confirmación de password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Validar número de móvil si se proporciona
    if (formData.numeroMovil && formData.numeroMovil.trim() !== '+54 ') {
      const phoneRegex = /^\+\d{8,15}$/;
      const cleanPhone = formData.numeroMovil.replace(/\s/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        newErrors.numeroMovil = 'Formato de teléfono inválido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      // Preparar datos para enviar
      const dataToSend = {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        nickname: formData.nickname.trim(),
        email: formData.email.toLowerCase().trim(),
        movil: formData.numeroMovil.trim() !== '+54 ' ? formData.numeroMovil.trim() : null,
        exchange: formData.exchange || null,
        uid: formData.uid || null,
        codigoReferido: formData.codigoReferido || null,
        password: formData.password
      };

      console.log('📤 Enviando datos:', dataToSend);

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      const result = await response.json();
      console.log('📥 Respuesta del servidor:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Error al crear cuenta');
      }

      // Éxito
      setErrors({ submit: '¡Cuenta creada exitosamente! Redirigiendo...' });
      
      // Limpiar formulario
      setFormData({
        nombre: '',
        apellido: '',
        nickname: '',
        email: '',
        numeroMovil: '+54 ',
        exchange: '',
        uid: '',
        codigoReferido: '',
        password: '',
        confirmPassword: ''
      });

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push('/login/signin');
      }, 2000);

    } catch (error: any) {
      console.error('❌ Error en el formulario:', error);
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    router.push('/login/dashboard-selection');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-inter flex items-center justify-center p-4">
      {/* Botón Skip */}
      <button 
        onClick={handleSkip}
        className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 flex items-center gap-2 z-50"
      >
        <SkipForward size={16} /> Saltar
      </button>

      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#ec4d58] rounded-full mx-auto mb-4 flex items-center justify-center">
            <User size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Crear Cuenta</h1>
          <p className="text-white/70">Únete a Crypto Force</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Nombre *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#2a2d36] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec4d58] transition-all ${
                    errors.nombre ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Tu nombre"
                />
                {errors.nombre && (
                  <p className="text-red-400 text-sm mt-1">{errors.nombre}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Apellido *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.apellido}
                  onChange={(e) => handleInputChange('apellido', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#2a2d36] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec4d58] transition-all ${
                    errors.apellido ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Tu apellido"
                />
                {errors.apellido && (
                  <p className="text-red-400 text-sm mt-1">{errors.apellido}</p>
                )}
              </div>
            </div>
          </div>

          {/* Nickname */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Nickname *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.nickname}
                onChange={(e) => handleInputChange('nickname', e.target.value)}
                className={`w-full px-4 py-3 bg-[#2a2d36] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec4d58] transition-all ${
                  errors.nickname ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="Tu nickname"
              />
              {errors.nickname && (
                <p className="text-red-400 text-sm mt-1">{errors.nickname}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Email *
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 bg-[#2a2d36] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec4d58] transition-all ${
                  errors.email ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Número de móvil (opcional)
            </label>
            <CountryPhoneInput
              value={formData.numeroMovil}
              onChange={(value) => handleInputChange('numeroMovil', value)}
              placeholder="Número de teléfono"
            />
            {errors.numeroMovil && (
              <p className="text-red-400 text-sm mt-1">{errors.numeroMovil}</p>
            )}
          </div>

          {/* Exchange y UID */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Exchange (opcional)
              </label>
              <select
                value={formData.exchange}
                onChange={(e) => handleInputChange('exchange', e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec4d58] transition-all"
              >
                <option value="">Seleccionar</option>
                <option value="Bidget">Bidget</option>
                <option value="ZoomEx">ZoomEx</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                UID (opcional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.uid}
                  onChange={(e) => handleInputChange('uid', e.target.value)}
                  className="w-full px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec4d58] transition-all"
                  placeholder="Tu UID"
                />
              </div>
            </div>
          </div>

          {/* Código de referido */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Código de referido (opcional)
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.codigoReferido}
                onChange={(e) => handleInputChange('codigoReferido', e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec4d58] transition-all"
                placeholder="Código de referido"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Contraseña *
            </label>
            <div className="relative">
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full px-4 py-3 bg-[#2a2d36] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec4d58] transition-all ${
                  errors.password ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="Mínimo 6 caracteres"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Confirmar contraseña *
            </label>
            <div className="relative">
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`w-full px-4 py-3 bg-[#2a2d36] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec4d58] transition-all ${
                  errors.confirmPassword ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="Repite tu contraseña"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Mensaje de error/éxito */}
          {errors.submit && (
            <div className={`p-3 rounded-lg text-sm ${
              errors.submit.includes('exitosamente') 
                ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                : 'bg-red-500/20 border border-red-500/30 text-red-400'
            }`}>
              {errors.submit}
            </div>
          )}

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#ec4d58] hover:bg-[#d43d47] disabled:bg-[#ec4d58]/50 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creando cuenta...
              </>
            ) : (
              'Crear cuenta'
            )}
          </button>
        </form>

        {/* Enlaces */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-white/70">
            ¿Ya tienes cuenta?{' '}
            <a href="/login/signin" className="text-[#ec4d58] hover:text-[#d43d47] font-medium transition-colors">
              Inicia sesión aquí
            </a>
          </p>
          <p className="text-white/70">
            <a href="/login/forgot-password" className="text-[#ec4d58] hover:text-[#d43d47] font-medium transition-colors">
              ¿Olvidaste tu contraseña?
            </a>
          </p>
        </div>

        {/* Código de referido del usuario */}
        <div className="mt-8">
          <ReferralCode 
            code="CF123456"
            referrals={0}
            earnings={0}
          />
        </div>
      </div>
    </div>
  );
}
