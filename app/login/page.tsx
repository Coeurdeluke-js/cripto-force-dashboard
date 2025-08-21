'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LogIn, 
  UserPlus, 
  ArrowRight,
  Shield,
  Users,
  TrendingUp,
  BookOpen,
  Crown
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<'login' | 'register' | null>(null);

  const handleLogin = () => {
    router.push('/login/signin');
  };

  const handleRegister = () => {
    router.push('/login/register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] text-white font-inter">
      {/* Header */}
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-3 text-[#8A8A8A] hover:text-white transition-colors">
          <ArrowRight className="w-5 h-5 rotate-180" />
          <span className="text-sm font-medium">Volver al inicio</span>
        </Link>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Login/Register Options */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full space-y-8">
            {/* Logo */}
            <div className="text-center mb-12">
              <div className="mx-auto mb-6 opacity-0 scale-95 animate-[fadeInScale_1200ms_ease-out_forwards]">
                <Image 
                  src="/logo-dark-theme.png" 
                  alt="Crypto Force" 
                  width={180} 
                  height={180} 
                  priority 
                  className="mx-auto"
                />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Crypto Force
              </h1>
              <p className="text-gray-400 text-lg">
                Tu academia de trading profesional
              </p>
            </div>

            {/* Login/Register Cards */}
            <div className="space-y-6">
              {/* Login Card */}
              <div 
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                  isHovered === 'login' 
                    ? 'border-[#EC4D58] bg-[#EC4D58]/10' 
                    : 'border-[#3a3a3a] bg-[#1a1a1a] hover:border-[#EC4D58]/50 hover:bg-[#EC4D58]/5'
                }`}
                onMouseEnter={() => setIsHovered('login')}
                onMouseLeave={() => setIsHovered(null)}
                onClick={handleLogin}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl transition-colors ${
                      isHovered === 'login' ? 'bg-[#EC4D58]' : 'bg-[#3a3a3a]'
                    }`}>
                      <LogIn className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Iniciar Sesión</h2>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-transform ${
                    isHovered === 'login' ? 'translate-x-1' : ''
                  }`} />
                </div>
                <p className="text-gray-400 mb-4">
                  Accede a tu cuenta existente y continúa tu formación
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span>Acceso seguro y verificado</span>
                </div>
              </div>

              {/* Register Card */}
              <div 
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                  isHovered === 'register' 
                    ? 'border-[#8A8A8A] bg-[#8A8A8A]/10' 
                    : 'border-[#3a3a3a] bg-[#1a1a1a] hover:border-[#8A8A8A]/50 hover:bg-[#8A8A8A]/5'
                }`}
                onMouseEnter={() => setIsHovered('register')}
                onMouseLeave={() => setIsHovered(null)}
                onClick={handleRegister}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl transition-colors ${
                      isHovered === 'register' ? 'bg-[#8A8A8A]' : 'bg-[#3a3a3a]'
                    }`}>
                      <UserPlus className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Crear Cuenta</h2>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-transform ${
                    isHovered === 'register' ? 'translate-x-1' : ''
                  }`} />
                </div>
                <p className="text-gray-400 mb-4">
                  Únete a nuestra comunidad y comienza tu viaje en el trading
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>Comunidad activa y creciente</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-12 pt-8 border-t border-[#3a3a3a]">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">
                ¿Por qué elegir Crypto Force?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <TrendingUp className="w-4 h-4 text-[#EC4D58]" />
                  <span>Trading profesional</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <BookOpen className="w-4 h-4 text-[#8A8A8A]" />
                  <span>Academia completa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  <span>Múltiples niveles</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>Comunidad activa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Background Image/Pattern */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#EC4D58]/20 via-[#8A8A8A]/10 to-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/trading-pattern.png')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10 flex items-center justify-center w-full">
            <div className="text-center text-white/80">
              <h2 className="text-3xl font-bold mb-4">Transforma tu futuro financiero</h2>
              <p className="text-xl">Únete a miles de traders exitosos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.92); }
          55% { opacity: 1; transform: scale(1.03); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
