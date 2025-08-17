'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BarChart3, 
  Users, 
  BookOpen, 
  Settings, 
  TrendingUp,
  LogOut 
} from 'lucide-react';

export default function MaestroDownbar() {
  const pathname = usePathname();

  const navigationItems = [
    {
      name: 'Panel General',
      href: '/dashboard/maestro',
      icon: Home,
      description: 'Dashboard principal'
    },
    {
      name: 'Análisis',
      href: '/dashboard/maestro/analytics',
      icon: BarChart3,
      description: 'Estadísticas y métricas'
    },
    {
      name: 'Estudiantes',
      href: '/dashboard/maestro/students',
      icon: Users,
      description: 'Gestión de usuarios'
    },
    {
      name: 'Cursos',
      href: '/dashboard/maestro/courses',
      icon: BookOpen,
      description: 'Contenido educativo'
    },
    {
      name: 'Trading',
      href: '/dashboard/maestro/trading-charts',
      icon: TrendingUp,
      description: 'Gráficos de trading'
    },
    {
      name: 'Configuración',
      href: '/dashboard/maestro/settings',
      icon: Settings,
      description: 'Ajustes del sistema'
    }
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard/maestro') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-[#3a3a3a] z-50 md:hidden shadow-2xl overflow-hidden">
      {/* Indicador de estado */}
      <div className="bg-[#8A8A8A] h-1 w-full"></div>
      
      <div className="flex justify-around items-center py-3 px-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center px-1 py-2 rounded-lg transition-all duration-200 flex-1 max-w-[80px] ${
                active
                  ? 'text-[#8A8A8A] bg-[#2a2a2a] shadow-lg'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-[#2a2a2a]/50'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium text-center leading-tight truncate w-full">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
