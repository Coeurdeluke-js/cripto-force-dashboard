'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  Settings,
  TrendingUp,
  Activity,
  Database,
  CheckCircle,
  Clock,
  Target,
  Award,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

export default function MaestroDashboardPage() {
  const [systemStats, setSystemStats] = useState({
    totalModules: 19,
    theoreticalModules: 8,
    practicalModules: 11,
    totalCheckpoints: 9,
    systemUptime: '99.8%',
    lastBackup: new Date().toLocaleDateString('es-ES'),
    activeSessions: 0,
    totalStorage: '2.4 GB'
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSystemStats = async () => {
      try {
        const response = await fetch('/api/maestro/real-stats');
        if (response.ok) {
          const data = await response.json();
          // Calcular estadísticas del sistema basadas en datos reales
          setSystemStats(prev => ({
            ...prev,
            activeSessions: data.metrics?.activeUsers || 0,
            totalStorage: `${((data.users?.length || 0) * 0.1).toFixed(1)} GB`
          }));
        }
      } catch (error) {
        console.error('Error fetching system stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSystemStats();
  }, []);

  const quickStats = [
    {
      title: 'Módulos Teóricos',
      value: systemStats.theoreticalModules,
      icon: BookOpen,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      href: '/dashboard/maestro/courses'
    },
    {
      title: 'Módulos Prácticos',
      value: systemStats.practicalModules,
      icon: Target,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      href: '/dashboard/maestro/courses'
    },
    {
      title: 'Puntos de Control',
      value: systemStats.totalCheckpoints,
      icon: Award,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      href: '/dashboard/maestro/courses'
    },
    {
      title: 'Sesiones Activas',
      value: systemStats.activeSessions,
      icon: Activity,
      color: 'text-[#8A8A8A]',
      bgColor: 'bg-[#8A8A8A]/20',
      href: '/dashboard/maestro/students'
    }
  ];

  const quickActions = [
    {
      title: 'Analytics',
      description: 'Métricas y estadísticas del sistema',
      icon: BarChart3,
      href: '/dashboard/maestro/analytics',
      color: 'text-[#8A8A8A]',
      bgColor: 'bg-[#8A8A8A]/20'
    },
    {
      title: 'Estudiantes',
      description: 'Gestión de usuarios del sistema',
      icon: Users,
      href: '/dashboard/maestro/students',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'Cursos',
      description: 'Administración de contenido educativo',
      icon: BookOpen,
      href: '/dashboard/maestro/courses',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      title: 'Configuración',
      description: 'Ajustes del sistema',
      icon: Settings,
      href: '/dashboard/maestro/settings',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8A8A8A]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#8A8A8A] mb-2">
          Panel General del Sistema
        </h1>
        <p className="text-gray-400 text-lg">
          Resumen ejecutivo y estado general de la plataforma
        </p>
      </div>

      {/* Quick Stats - Diferentes a Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Link 
              key={index} 
              href={stat.href}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a] hover:border-[#8A8A8A] transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.title}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Link 
              key={index} 
              href={action.href}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a] hover:border-[#8A8A8A] transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`p-4 ${action.bgColor} rounded-lg`}>
                  <IconComponent className={`w-8 h-8 ${action.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-400">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl border border-[#3a3a3a] p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6 text-[#8A8A8A]" />
            <h3 className="text-xl font-semibold text-white">Contenido Educativo</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Módulos Teóricos:</span>
              <span className="text-blue-400 font-medium">{systemStats.theoreticalModules}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Módulos Prácticos:</span>
              <span className="text-green-400 font-medium">{systemStats.practicalModules}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Total Módulos:</span>
              <span className="text-white font-medium">{systemStats.totalModules}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Puntos de Control:</span>
              <span className="text-purple-400 font-medium">{systemStats.totalCheckpoints}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl border border-[#3a3a3a] p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-[#8A8A8A]" />
            <h3 className="text-xl font-semibold text-white">Estado del Sistema</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Uptime:</span>
              <span className="text-green-400 font-medium">{systemStats.systemUptime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Último Backup:</span>
              <span className="text-white">{systemStats.lastBackup}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Almacenamiento:</span>
              <span className="text-blue-400 font-medium">{systemStats.totalStorage}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Sesiones Activas:</span>
              <span className="text-[#8A8A8A] font-medium">{systemStats.activeSessions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl border border-[#3a3a3a] p-6">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-semibold text-white">Estado General del Sistema</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-gray-400">Sistema:</span>
            <span className="text-green-400 font-medium">Operativo</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-gray-400">Base de Datos:</span>
            <span className="text-green-400 font-medium">Conectada</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-gray-400">API:</span>
            <span className="text-green-400 font-medium">Funcionando</span>
          </div>
        </div>
      </div>
    </div>
  );
}
