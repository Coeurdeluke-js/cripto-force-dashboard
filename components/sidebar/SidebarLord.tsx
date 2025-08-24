'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSafeAuth } from '@/context/AuthContext';
import { 
  HomeIcon, 
  ChartBarIcon, 
  UserGroupIcon, 
  BookOpenIcon, 
  ChartPieIcon, 
  CogIcon,
  CompassIcon
} from '@heroicons/react/24/outline';

interface SidebarLordProps {
  isCollapsed?: boolean;
}

export default function SidebarLord({ isCollapsed = false }: SidebarLordProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { userData, loading } = useSafeAuth();
  const [showCompass, setShowCompass] = useState(false);

  // Mostrar compass si el usuario es de nivel superior
  useEffect(() => {
    if (userData && !loading) {
      const userLevel = userData.user_level;
      const currentDashboardLevel = 4; // Lord = nivel 4
      
      // Mostrar compass si el usuario es Fundador (0) o de nivel superior (5-6)
      setShowCompass(userLevel === 0 || userLevel > currentDashboardLevel);
      
      console.log('🔍 Sidebar Lord - Debug:', {
        userLevel,
        currentDashboardLevel,
        showCompass: userLevel === 0 || userLevel > currentDashboardLevel
      });
    }
  }, [userData, loading]);

  const navigationItems = [
    { name: 'Panel General', href: '/dashboard/lord', icon: HomeIcon },
    { name: 'Análisis', href: '/dashboard/lord/analytics', icon: ChartBarIcon },
    { name: 'Estudiantes', href: '/dashboard/lord/students', icon: UserGroupIcon },
    { name: 'Cursos', href: '/dashboard/lord/courses', icon: BookOpenIcon },
    { name: 'Trading', href: '/dashboard/lord/trading', icon: ChartPieIcon },
    { name: 'Configuración', href: '/dashboard/lord/settings', icon: CogIcon },
  ];

  const handleCompassClick = () => {
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="bg-gray-900 text-white w-16 h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        {!isCollapsed && (
          <span className="text-xl font-bold text-blue-400">CF</span>
        )}
        {isCollapsed && (
          <span className="text-xl font-bold text-blue-400">L</span>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="mt-8">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {!isCollapsed && item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Compass Icon for Higher Level Users */}
      {showCompass && (
        <div className="mt-auto mb-8 px-4">
          <button
            onClick={handleCompassClick}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-white bg-transparent hover:bg-gray-700 rounded-md transition-colors group"
            title="Seleccionar Dashboard"
          >
            <CompassIcon className="h-5 w-5 mr-3 text-red-500 group-hover:text-red-400" />
            {!isCollapsed && (
              <span className="text-gray-300 group-hover:text-white">
                Cambiar Dashboard
              </span>
            )}
          </button>
        </div>
      )}

      {/* User Info */}
      <div className="mt-auto p-4 border-t border-gray-700">
        {!isCollapsed && userData && (
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {userData.nickname?.charAt(0) || 'U'}
              </span>
            </div>
            <p className="text-xs text-gray-300 truncate">
              {userData.nickname || 'Usuario'}
            </p>
            <p className="text-xs text-gray-500">
              Nivel {userData.user_level}
            </p>
          </div>
        )}
        {isCollapsed && userData && (
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {userData.nickname?.charAt(0) || 'U'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
