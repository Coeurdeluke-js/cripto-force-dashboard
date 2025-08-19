'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity,
  Database,
  CheckCircle
} from 'lucide-react';

export default function AnalyticsPage() {
  const [realMetrics, setRealMetrics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    registrationsToday: 0,
    usersWithReferrals: 0,
    totalReferrals: 0,
    referredUsers: 0,
    referralConversionRate: 0,
    systemStatus: 'Operativo',
    lastUpdate: new Date().toLocaleString('es-ES')
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealStats = async () => {
      try {
        const response = await fetch('/api/maestro/real-stats');
        if (response.ok) {
          const data = await response.json();
          setRealMetrics(data.metrics);
        }
      } catch (error) {
        console.error('Error fetching real stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRealStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8A8A8A]"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none min-w-0">
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#8A8A8A] mb-2">
          Analytics del Sistema
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-400">
          Métricas en tiempo real del sistema Crypto Force
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-3 sm:p-4 lg:p-6 border border-[#3a3a3a]">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-[#8A8A8A]/20 rounded-lg">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#8A8A8A]" />
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
          </div>
          <div className="space-y-1">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{realMetrics.totalUsers}</p>
            <p className="text-xs sm:text-sm text-gray-400">Total Usuarios</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-3 sm:p-4 lg:p-6 border border-[#3a3a3a]">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-green-500/20 rounded-lg">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
          </div>
          <div className="space-y-1">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{realMetrics.activeUsers}</p>
            <p className="text-xs sm:text-sm text-gray-400">Usuarios Activos</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-3 sm:p-4 lg:p-6 border border-[#3a3a3a]">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-blue-500/20 rounded-lg">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
          </div>
          <div className="space-y-1">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{realMetrics.registrationsToday}</p>
            <p className="text-xs sm:text-sm text-gray-400">Registros Hoy</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-3 sm:p-4 lg:p-6 border border-[#3a3a3a]">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-purple-500/20 rounded-lg">
              <Database className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
          </div>
          <div className="space-y-1">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{realMetrics.usersWithReferrals}</p>
            <p className="text-xs sm:text-sm text-gray-400">Con Referidos</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-3 sm:p-4 lg:p-6 border border-[#3a3a3a]">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-3 sm:mb-4">
            Estadísticas de Referidos
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between p-2 sm:p-3 bg-[#2a2a2a] rounded-lg">
              <span className="text-gray-400 text-sm sm:text-base">Total Referidos</span>
              <span className="text-white font-medium text-sm sm:text-base">{realMetrics.totalReferrals}</span>
            </div>
            <div className="flex items-center justify-between p-2 sm:p-3 bg-[#2a2a2a] rounded-lg">
              <span className="text-gray-400 text-sm sm:text-base">Usuarios Referidos</span>
              <span className="text-white font-medium text-sm sm:text-base">{realMetrics.referredUsers}</span>
            </div>
            <div className="flex items-center justify-between p-2 sm:p-3 bg-[#2a2a2a] rounded-lg">
              <span className="text-gray-400 text-sm sm:text-base">Tasa de Conversión</span>
              <span className="text-green-400 font-medium text-sm sm:text-base">{realMetrics.referralConversionRate}%</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-3 sm:p-4 lg:p-6 border border-[#3a3a3a]">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-3 sm:mb-4">
            Estado del Sistema
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between p-2 sm:p-3 bg-[#2a2a2a] rounded-lg">
              <span className="text-gray-400 text-sm sm:text-base">Estado</span>
              <span className="text-green-400 font-medium text-sm sm:text-base flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {realMetrics.systemStatus}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 sm:p-3 bg-[#2a2a2a] rounded-lg">
              <span className="text-gray-400 text-sm sm:text-base">Última Actualización</span>
              <span className="text-white font-medium text-sm sm:text-base">{realMetrics.lastUpdate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-3 sm:p-4 lg:p-6 border border-[#3a3a3a]">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-3 sm:mb-4">
          Resumen del Sistema
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <div className="text-center p-3 sm:p-4 bg-[#2a2a2a] rounded-lg">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-1">
              {realMetrics.totalUsers}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Usuarios Totales</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-[#2a2a2a] rounded-lg">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-1">
              {realMetrics.activeUsers}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Usuarios Activos</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-[#2a2a2a] rounded-lg">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400 mb-1">
              {realMetrics.totalReferrals}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Total Referidos</div>
          </div>
        </div>
      </div>
    </div>
  );
}
