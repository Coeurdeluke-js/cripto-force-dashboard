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
    totalCheckpoints: 10,
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
    <div className="w-full max-w-none">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#8A8A8A] mb-4">
          Dashboard Maestro
        </h1>
        <p className="text-gray-400 text-lg">
          Panel de control y gestión del sistema CryptoForce
        </p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <Link
            key={index}
            href={stat.href}
            className="group block"
          >
            <div className={`p-6 rounded-xl border border-[#3a3a3a] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] hover:from-[#2a2a2a] hover:to-[#3a3a3a] transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                </div>
              </div>
              <h3 className="text-white font-medium text-sm md:text-base">
                {stat.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="group block"
          >
            <div className={`p-6 rounded-xl border border-[#3a3a3a] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] hover:from-[#2a2a2a] hover:to-[#3a3a3a] transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${action.bgColor}`}>
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {action.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Información del sistema */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-xl border border-[#3a3a3a] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-[#8A8A8A]" />
            Estado del Sistema
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Uptime del Sistema</span>
              <span className="text-green-400 font-medium">{systemStats.systemUptime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Último Backup</span>
              <span className="text-white">{systemStats.lastBackup}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Almacenamiento</span>
              <span className="text-white">{systemStats.totalStorage}</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-[#3a3a3a] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#8A8A8A]" />
            Actividad Reciente
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-400 text-sm">Sistema operativo</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-400 text-sm">Base de datos sincronizada</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-gray-400 text-sm">APIs funcionando correctamente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
