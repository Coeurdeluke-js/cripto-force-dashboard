"use client";
import React, { useState, useEffect } from 'react';
import { Copy, Share2, ExternalLink, UserPlus, Crown, Users } from 'lucide-react';
import { useSafeAuth } from '@/context/AuthContext';

interface ReferralCodeDisplayProps {
  userLevel: number;
  className?: string;
}

export default function ReferralCodeDisplay({ userLevel, className = "" }: ReferralCodeDisplayProps) {
  const { userData } = useSafeAuth();
  const [success, setSuccess] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string>("");
  const [totalReferrals, setTotalReferrals] = useState<number>(0);

  useEffect(() => {
    if (userData?.nickname) {
      // Generar código de referido basado en el nickname del usuario
      const code = `CRYPTOFORCE_${userData.nickname.toUpperCase().replace(/\s+/g, '_')}`;
      setReferralCode(code);
    }
  }, [userData]);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      
      // Mensajes específicos para cada campo
      if (field === 'code') {
        setSuccess('Código de referido copiado');
      } else if (field === 'link') {
        setSuccess('Enlace copiado');
      }
      
      setTimeout(() => {
        setCopiedField(null);
        setSuccess(null);
      }, 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const generateRegistrationLink = () => {
    return `https://cripto-force-dashboard.vercel.app/login/register?ref=${referralCode}`;
  };

  // Función de compartir eliminada - solo mantenemos copiar

  const getLevelDisplay = (level: number) => {
    switch (level) {
      case 0: return 'Maestro';
      case 1: return 'Iniciado';
      case 2: return 'Acólito';
      case 3: return 'Warrior';
      case 4: return 'Lord';
      case 5: return 'Darth';
      default: return 'Iniciado';
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return '#8A8A8A'; // Maestro - Gris
      case 1: return '#fafafa'; // Iniciado - Blanco
      case 2: return '#8B5CF6'; // Acólito - Púrpura
      case 3: return '#3B82F6'; // Warrior - Azul
      case 4: return '#10B981'; // Lord - Verde
      case 5: return '#EF4444'; // Darth - Rojo
      default: return '#fafafa'; // Iniciado por defecto
    }
  };

  if (!referralCode) {
    return (
      <div className="min-h-screen bg-[#121212] text-white p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8A8A8A]"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#121212] text-white p-8 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#8A8A8A] mb-2">
            Mi Código de Referido
          </h1>
          <p className="text-gray-400">
            Comparte tu código y construye tu red de referidos
          </p>
        </div>

        {/* Mensajes de estado */}
        {success && (
          <div className="mb-6 p-4 bg-[#3ED598]/20 border border-[#3ED598]/50 rounded-lg text-[#3ED598]">
            {success}
          </div>
        )}

        {/* Código de Referido Principal */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl border border-[#3a3a3a] p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <UserPlus className="w-6 h-6 text-[#8A8A8A]" />
            <h2 className="text-xl font-semibold text-white">Tu Código de Referido</h2>
          </div>
          
          <div className="bg-[#0a0a0a] rounded-lg p-4 border border-[#3a3a3a] mb-4">
            <div className="flex items-center justify-between">
              <code className="text-2xl font-mono text-[#8A8A8A] font-bold">
                {referralCode}
              </code>
              <button
                onClick={() => copyToClipboard(referralCode, 'code')}
                className={`p-2 rounded-lg transition-colors ${
                  copiedField === 'code' 
                    ? 'bg-[#3ED598] text-white' 
                    : 'bg-[#3a3a3a] text-gray-300 hover:bg-[#4a4a4a]'
                }`}
                title="Copiar código"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Solo el botón de copiar código principal */}
          <button
            onClick={() => copyToClipboard(referralCode, 'code')}
            className="px-4 py-2 bg-[#8A8A8A] hover:bg-[#7a7a7a] text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copiar Código
          </button>
        </div>

        {/* Enlace de Registro */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl border border-[#3a3a3a] p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ExternalLink className="w-6 h-6 text-[#8A8A8A]" />
            <h2 className="text-xl font-semibold text-white">Enlace de Registro</h2>
          </div>
          
          <div className="bg-[#0a0a0a] rounded-lg p-4 border border-[#3a3a3a] mb-4">
            <div className="flex items-center justify-between">
              <code className="text-sm font-mono text-gray-300 break-all">
                {generateRegistrationLink()}
              </code>
              <button
                onClick={() => copyToClipboard(generateRegistrationLink(), 'link')}
                className={`p-2 rounded-lg transition-colors ${
                  copiedField === 'link' 
                    ? 'bg-[#3ED598] text-white' 
                    : 'bg-[#3a3a3a] text-gray-300 hover:bg-[#4a4a4a]'
                }`}
                title="Copiar enlace"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Solo el botón de copiar enlace principal */}
          <button
            onClick={() => copyToClipboard(generateRegistrationLink(), 'link')}
            className="px-4 py-2 bg-[#8A8A8A] hover:bg-[#7a7a7a] text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copiar Enlace
          </button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl border border-[#3a3a3a] p-6">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-6 h-6 text-[#ec4d58]" />
              <h3 className="text-lg font-semibold text-white">Total Referidos</h3>
            </div>
            <p className="text-3xl font-bold text-[#ec4d58]">{totalReferrals}</p>
            <p className="text-sm text-gray-400">usuarios referidos</p>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl border border-[#3a3a3a] p-6">
            <div className="flex items-center gap-3 mb-3">
              <Crown className="w-6 h-6" style={{ color: getLevelColor(userLevel) }} />
              <h3 className="text-lg font-semibold text-white">Tu Nivel</h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: getLevelColor(userLevel) }}>{getLevelDisplay(userLevel)}</p>
            <p className="text-sm text-gray-400">nivel actual</p>
          </div>
        </div>

        {/* Referidos Recientes - Por ahora vacío */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl border border-[#3a3a3a] p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-[#8A8A8A]" />
            <h2 className="text-xl font-semibold text-white">Referidos Recientes</h2>
          </div>
          
          <div className="text-center py-8">
            <p className="text-gray-400 mb-2">Aún no tienes referidos</p>
            <p className="text-sm text-gray-500">Comparte tu código para empezar a construir tu red</p>
          </div>
        </div>
      </div>
    </div>
  );
}
