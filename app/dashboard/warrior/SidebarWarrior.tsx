'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSafeAuth } from '@/context/AuthContext';
import { 
  Home, 
  BarChart3, 
  Users, 
  BookOpen, 
  PieChart, 
  Settings,
  Compass
} from 'lucide-react';
import DashboardSelectorModal from '@/components/DashboardSelectorModal';

interface SidebarWarriorProps {
  isCollapsed?: boolean;
}

export default function SidebarWarrior({ isCollapsed = false }: SidebarWarriorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { userData, loading } = useSafeAuth();
  const [showCompass, setShowCompass] = useState(false);
  const [showDashboardSelector, setShowDashboardSelector] = useState(false);

  // Mostrar compass si el usuario es de nivel superior
  useEffect(() => {
    if (userData && !loading) {
      const userLevel = userData.user_level;
      const currentDashboardLevel = 3; // Warrior = nivel 3
      
      // Mostrar compass si el usuario es Fundador (0) o de nivel superior (4-6)
      setShowCompass(userLevel === 0 || userLevel > currentDashboardLevel);
      
      console.log('🔍 Sidebar Warrior - Debug:', {
        userLevel,
        currentDashboardLevel,
        showCompass: userLevel === 0 || userLevel > currentDashboardLevel
      });
    }
  }, [userData, loading]);

  const navigationItems = [
    { name: 'Panel General', href: '/dashboard/warrior', icon: Home },
    { name: 'Análisis', href: '/dashboard/warrior/analytics', icon: BarChart3 },
    { name: 'Estudiantes', href: '/dashboard/warrior/students', icon: Users },
    { name: 'Cursos', href: '/dashboard/warrior/courses', icon: BookOpen },
    { name: 'Trading', href: '/dashboard/warrior/trading', icon: PieChart },
    { name: 'Configuración', href: '/dashboard/warrior/settings', icon: Settings },
  ];

  const handleCompassClick = () => {
    setShowDashboardSelector(true);
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
          <span className="text-xl font-bold text-green-400">CF</span>
        )}
        {isCollapsed && (
          <span className="text-xl font-bold text-green-400">W</span>
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
                      ? 'bg-green-500 text-gray-900'
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
            <Compass className="h-5 w-5 mr-3 text-green-400 group-hover:text-green-300" />
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
            <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
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
            <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-900">
                {userData.nickname?.charAt(0) || 'U'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Modal de selección de dashboard */}
      <DashboardSelectorModal
        isOpen={showDashboardSelector}
        onClose={() => setShowDashboardSelector(false)}
        currentDashboardLevel={3}
      />
    </div>
  );
}
