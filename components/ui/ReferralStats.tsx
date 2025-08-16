'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Users, GraduationCap, TrendingUp, Copy, Check, Share2, BookOpen } from 'lucide-react';
import { useSafeAuth } from '@/context/AuthContext';

interface ReferralStatsProps {
  userEmail: string;
  className?: string;
}

interface ReferralData {
  referralCode: string;
  totalReferrals: number;
  totalEarnings: number;
  userLevel: number;
  recentReferrals: Array<{
    email: string;
    date: string;
    commission: number;
  }>;
}

export default function ReferralStats({ userEmail, className = '' }: ReferralStatsProps) {
  const [stats, setStats] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchReferralStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/referrals/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail })
      });

      const result = await response.json();

      if (result.success) {
        setStats(result.stats);
      } else {
        setError(result.error || 'Error cargando estadísticas');
      }
    } catch (error) {
      console.error('Error fetching referral stats:', error);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    if (userEmail) {
      fetchReferralStats();
    }
  }, [userEmail, fetchReferralStats]);

  const handleCopyCode = async () => {
    if (!stats?.referralCode) return;
    
    try {
      await navigator.clipboard.writeText(stats.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleCopyLink = async () => {
    if (!stats?.referralCode) return;
    
    try {
      const referralLink = `https://cripto-force-dashboard.vercel.app/login?ref=${stats.referralCode}`;
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar enlace:', err);
    }
  };

  const handleShare = async () => {
    if (!stats?.referralCode) return;

    const referralLink = `https://cripto-force-dashboard.vercel.app/login?ref=${stats.referralCode}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '¡Únete a Crypto Force!',
          text: `¡Descubre el poder de la educación financiera en Crypto Force usando mi código: ${stats.referralCode}!`,
          url: referralLink
        });
      } catch (err) {
        console.error('Error al compartir:', err);
        handleCopyLink(); // Fallback
      }
    } else {
      handleCopyLink(); // Fallback
    }
  };

  if (loading) {
    return (
      <div className={`bg-[#1a1a1a] rounded-xl p-6 border border-white/10 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-white/10 rounded mb-4"></div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="h-16 bg-white/10 rounded"></div>
            <div className="h-16 bg-white/10 rounded"></div>
            <div className="h-16 bg-white/10 rounded"></div>
          </div>
          <div className="h-12 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-[#1a1a1a] rounded-xl p-6 border border-red-500/30 ${className}`}>
        <div className="text-center">
          <div className="text-red-400 text-sm mb-2">Error cargando estadísticas</div>
          <p className="text-white/60 text-xs">{error}</p>
          <button 
            onClick={fetchReferralStats}
            className="mt-3 px-4 py-2 bg-[#ec4d58] hover:bg-[#d43d47] text-white text-sm rounded-lg transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className={`bg-[#1a1a1a] rounded-xl p-6 border border-white/10 ${className}`}>
        <div className="text-center text-white/60">
          No se encontraron datos de referidos
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-[#1a1a1a] rounded-xl p-6 border border-white/10 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#ec4d58]/20 rounded-lg flex items-center justify-center">
          <GraduationCap className="text-[#ec4d58] w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Centro de Educación Financiera</h3>
          <p className="text-white/60 text-sm">Nivel {stats.userLevel}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#2a2d36]/50 rounded-lg p-4 text-center">
          <Users className="text-[#ec4d58] w-6 h-6 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{stats.totalReferrals}</div>
          <div className="text-white/60 text-xs">Estudiantes</div>
        </div>
        
        <div className="bg-[#2a2d36]/50 rounded-lg p-4 text-center">
          <BookOpen className="text-blue-500 w-6 h-6 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{stats.totalReferrals * 3}</div>
          <div className="text-white/60 text-xs">Lecciones Compartidas</div>
        </div>
        
        <div className="bg-[#2a2d36]/50 rounded-lg p-4 text-center">
          <GraduationCap className="text-yellow-500 w-6 h-6 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{stats.userLevel}</div>
          <div className="text-white/60 text-xs">Nivel Educador</div>
        </div>
      </div>

      {/* Referral Code */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-white/80 mb-2">
          Tu código de referido (CF + Tu Nickname)
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-[#2a2d36] border border-white/20 rounded-lg px-4 py-3">
            <code className="text-[#ec4d58] font-mono text-lg font-bold">
              {stats.referralCode || 'CARGANDO...'}
            </code>
          </div>
          <button
            onClick={handleCopyCode}
            className="px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg hover:bg-[#3a3d46] transition-colors"
            title="Copiar código"
          >
            {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-white/60" />}
          </button>
          <button
            onClick={handleShare}
            className="px-4 py-3 bg-[#ec4d58] hover:bg-[#d43d47] text-white rounded-lg transition-colors"
            title="Compartir enlace"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Referral Link */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-white/80 mb-2">
          Tu enlace de referido (auto-completa el código)
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-[#2a2d36] border border-white/20 rounded-lg px-4 py-3 overflow-hidden">
            <code className="text-white/80 font-mono text-sm break-all">
              {`https://cripto-force-dashboard.vercel.app/login?ref=${stats.referralCode}`}
            </code>
          </div>
          <button
            onClick={handleCopyLink}
            className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            title="Copiar enlace"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>
        <p className="text-white/50 text-xs mt-2">
          💡 Al compartir este enlace, el código se auto-completa automáticamente en el formulario de registro
        </p>
      </div>

      {/* Recent Referrals */}
      {stats.recentReferrals && stats.recentReferrals.length > 0 && (
        <div>
          <h4 className="text-white font-medium mb-3">Nuevos Estudiantes</h4>
          <div className="space-y-2">
            {stats.recentReferrals.slice(0, 3).map((referral, index) => (
              <div key={index} className="bg-[#2a2d36]/30 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="text-white/80 text-sm">{referral.email.replace(/(.{3}).*@/, '$1***@')}</div>
                  <div className="text-white/50 text-xs">{new Date(referral.date).toLocaleDateString()}</div>
                </div>
                <div className="text-blue-400 text-sm font-medium">📚 Estudiante</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-6 bg-[#2a2d36]/30 rounded-lg p-4">
        <h4 className="text-white font-medium mb-2">Comparte Educación Financiera</h4>
        <ul className="text-white/70 text-sm space-y-1">
          <li>• Comparte conocimiento que transforma vidas</li>
          <li>• Ayuda a tus seres queridos a empoderarse financieramente</li>
          <li>• Construye una comunidad de aprendizaje</li>
          <li>• El valor real está en la educación que compartes</li>
        </ul>
      </div>
    </div>
  );
}
