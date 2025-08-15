'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Gift, Users, DollarSign, Copy, CheckCircle, Share2 } from 'lucide-react';
import ReferralCode from '@/components/ui/ReferralCode';
import ReferralStats from '@/components/ui/ReferralStats';
import { useSafeAuth } from '@/context/AuthContext';

export default function ReferidosPage() {
  const router = useRouter();
  const { userData, isReady } = useSafeAuth();
  const [copied, setCopied] = useState(false);

  // Mostrar loading mientras no esté listo
  if (!isReady || !userData?.email) {
    return (
      <div className="min-h-screen bg-[#121212] text-white font-inter flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ec4d58]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white font-inter">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-white/10 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Volver
          </button>
          <h1 className="text-xl font-bold text-white">Sistema de Referidos</h1>
          <div className="w-20"></div> {/* Spacer para centrar el título */}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-[#ec4d58] to-[#d43d47] rounded-full mx-auto mb-6 flex items-center justify-center">
            <Gift size={48} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Hola, {userData.nickname || userData.nombre}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Gana recompensas invitando a tus amigos a Crypto Force. ¡Cada referido exitoso te da $5!
          </p>
        </div>

        {/* Dynamic Referral Stats */}
        <ReferralStats userEmail={userData.email} className="mb-8" />

        {/* Cómo Funciona */}
        <div className="bg-[#1a1a1a] rounded-xl p-8 border border-white/10 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            ¿Cómo Funciona?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ec4d58]/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#ec4d58]">1</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Comparte tu Código</h4>
              <p className="text-white/60">
                Comparte tu código único con amigos y familiares
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ec4d58]/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#ec4d58]">2</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Se Registran</h4>
              <p className="text-white/60">
                Ellos se registran usando tu código de referido
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ec4d58]/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#ec4d58]">3</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Ganas Recompensas</h4>
              <p className="text-white/60">
                Recibes recompensas por cada referido exitoso
              </p>
            </div>
          </div>
        </div>

        {/* Beneficios */}
        <div className="bg-[#1a1a1a] rounded-xl p-8 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            Beneficios del Sistema de Referidos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#ec4d58]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle size={16} className="text-[#ec4d58]" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Recompensas Inmediatas</h4>
                <p className="text-white/60">
                  Gana recompensas desde el primer referido exitoso
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#ec4d58]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle size={16} className="text-[#ec4d58]" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Sin Límites</h4>
                <p className="text-white/60">
                  No hay límite en la cantidad de referidos que puedes hacer
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#ec4d58]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle size={16} className="text-[#ec4d58]" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Tracking en Tiempo Real</h4>
                <p className="text-white/60">
                  Monitorea tus referidos y ganancias en tiempo real
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#ec4d58]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle size={16} className="text-[#ec4d58]" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Comunidad Crecida</h4>
                <p className="text-white/60">
                  Ayuda a construir la comunidad más poderosa del trading
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
