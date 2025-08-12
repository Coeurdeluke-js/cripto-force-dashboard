'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Gift, Users, DollarSign, Copy, CheckCircle, Share2 } from 'lucide-react';
import ReferralCode from '@/components/ui/ReferralCode';

export default function ReferidosPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [referralStats, setReferralStats] = useState({
    code: 'CF123456',
    referrals: 12,
    earnings: 150.50,
    pendingReferrals: 3
  });

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralStats.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Únete a Crypto Force',
          text: `¡Únete a Crypto Force usando mi código de referido: ${referralStats.code}!`,
          url: `${window.location.origin}/login?ref=${referralStats.code}`
        });
      } catch (err) {
        console.error('Error al compartir:', err);
      }
    } else {
      // Fallback para navegadores que no soportan Web Share API
      handleCopyCode();
    }
  };

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
            Gana con Cada Referido
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Invita a tus amigos a Crypto Force y gana recompensas por cada persona que se registre usando tu código
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#ec4d58]/20 rounded-lg flex items-center justify-center">
                <Users size={24} className="text-[#ec4d58]" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Referidos Totales</p>
                <p className="text-2xl font-bold text-white">{referralStats.referrals}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign size={24} className="text-green-500" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Ganancias Totales</p>
                <p className="text-2xl font-bold text-white">${referralStats.earnings}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users size={24} className="text-blue-500" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Pendientes</p>
                <p className="text-2xl font-bold text-white">{referralStats.pendingReferrals}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Código de Referido */}
        <div className="bg-[#1a1a1a] rounded-xl p-8 border border-white/10 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            Tu Código de Referido
          </h3>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="bg-[#2a2d36] border border-white/20 rounded-lg px-6 py-4">
              <span className="text-2xl font-mono font-bold text-[#ec4d58]">
                {referralStats.code}
              </span>
            </div>
            
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-2 bg-[#ec4d58] hover:bg-[#d43d47] text-white px-4 py-3 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle size={20} />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy size={20} />
                  Copiar
                </>
              )}
            </button>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              <Share2 size={20} />
              Compartir
            </button>
          </div>
        </div>

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
