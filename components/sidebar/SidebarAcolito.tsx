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
  MapIcon
} from '@heroicons/react/24/outline';
import DashboardSelectorModal from '@/components/DashboardSelectorModal';

interface SidebarAcolitoProps {
  isCollapsed?: boolean;
}

export default function SidebarAcolito({ isCollapsed = false }: SidebarAcolitoProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { userData, loading } = useSafeAuth();
  const [showCompass, setShowCompass] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mostrar compass si el usuario es de nivel superior
  useEffect(() => {
    if (userData && !loading) {
      const userLevel = userData.user_level;
      const currentDashboardLevel = 2; // Acólito = nivel 2
      
      // Mostrar compass si el usuario es Fundador (0) o de nivel superior (3-6)
      setShowCompass(userLevel === 0 || (userLevel !== undefined && userLevel > currentDashboardLevel));
      
      console.log('🔍 Sidebar Acólito - Debug:', {
        userLevel,
        currentDashboardLevel,
        showCompass: userLevel === 0 || (userLevel !== undefined && userLevel > currentDashboardLevel)
      });
    }
  }, [userData, loading]);

  const navigationItems = [
    { name: 'Panel General', href: '/dashboard/acolito', icon: HomeIcon },
    { name: 'Análisis', href: '/dashboard/acolito/analytics', icon: ChartBarIcon },
    { name: 'Estudiantes', href: '/dashboard/acolito/students', icon: UserGroupIcon },
    { name: 'Cursos', href: '/dashboard/acolito/courses', icon: BookOpenIcon },
    { name: 'Trading', href: '/dashboard/acolito/trading', icon: ChartPieIcon },
    { name: 'Configuración', href: '/dashboard/acolito/settings', icon: CogIcon },
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
    <>
      <div className={`bg-gray-900 text-white transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          {!isCollapsed && (
            <span className="text-xl font-bold text-yellow-400">CF</span>
          )}
          {isCollapsed && (
            <span className="text-xl font-bold text-yellow-400">A</span>
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
                        ? 'bg-yellow-500 text-gray-900'
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
              <MapIcon className="h-5 w-5 mr-3 text-red-500 group-hover:text-red-400" />
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
              <div className="w-8 h-8 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-900">
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
              <div className="w-8 h-8 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-900">
                  {userData.nickname?.charAt(0) || 'U'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dashboard Selector Modal */}
      <DashboardSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentDashboardLevel={2}
      />
    </>
  );
}
