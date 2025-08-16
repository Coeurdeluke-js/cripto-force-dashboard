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
    referralConversions: 0,
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
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#8A8A8A] mb-2">
          Analytics del Sistema
        </h1>
        <p className="text-gray-400">
          Métricas en tiempo real
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#8A8A8A]/20 rounded-lg">
              <Users className="w-6 h-6 text-[#8A8A8A]" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">{realMetrics.totalUsers}</p>
            <p className="text-sm text-gray-400">Total Usuarios</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-green-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">{realMetrics.activeUsers}</p>
            <p className="text-sm text-gray-400">Usuarios Activos</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">{realMetrics.registrationsToday}</p>
            <p className="text-sm text-gray-400">Registros Hoy</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Database className="w-6 h-6 text-purple-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">{realMetrics.referralConversions}</p>
            <p className="text-sm text-gray-400">Referidos</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a]">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-semibold text-white">Estado del Sistema</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Estado:</span>
            <span className="text-green-400 font-medium">{realMetrics.systemStatus}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Última Actualización:</span>
            <span className="text-white">{realMetrics.lastUpdate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
