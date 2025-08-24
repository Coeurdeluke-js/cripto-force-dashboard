'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSafeAuth } from '@/context/AuthContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface DashboardSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDashboardLevel: number;
}

interface DashboardOption {
  id: number;
  name: string;
  description: string;
  color: string;
  href: string;
}

export default function DashboardSelectorModal({ 
  isOpen, 
  onClose, 
  currentDashboardLevel 
}: DashboardSelectorModalProps) {
  const router = useRouter();
  const { userData } = useSafeAuth();

  if (!isOpen) return null;

  const dashboardOptions: DashboardOption[] = [
    {
      id: 0,
      name: 'Fundador',
      description: 'Dashboard exclusivo para fundadores del sistema',
      color: '#FF8C42',
      href: '/dashboard/fundador'
    },
    {
      id: 1,
      name: 'Iniciado',
      description: 'Dashboard para usuarios nuevos en el sistema',
      color: '#fafafa',
      href: '/dashboard/iniciado'
    },
    {
      id: 2,
      name: 'Acólito',
      description: 'Dashboard para usuarios con experiencia básica',
      color: '#FFD447',
      href: '/dashboard/acolito'
    },
    {
      id: 3,
      name: 'Warrior',
      description: 'Dashboard para usuarios intermedios',
      color: '#3ED598',
      href: '/dashboard/warrior'
    },
    {
      id: 4,
      name: 'Lord',
      description: 'Dashboard para usuarios avanzados',
      color: '#4671D5',
      href: '/dashboard/lord'
    },
    {
      id: 5,
      name: 'Darth',
      description: 'Dashboard para usuarios expertos',
      color: '#ec4d58',
      href: '/dashboard/darth'
    },
    {
      id: 6,
      name: 'Maestro',
      description: 'Dashboard para maestros del sistema',
      color: '#8a8a8a',
      href: '/dashboard/maestro'
    }
  ];

  const getUserAccessibleDashboards = () => {
    if (!userData || userData.user_level === undefined) {
      return dashboardOptions.filter(option => option.id === 1); // Solo Iniciado por defecto
    }

    const userLevel = userData.user_level;
    
    // Fundador (0) puede acceder a todas las dashboards
    if (userLevel === 0) {
      return dashboardOptions;
    }
    
    // Otros usuarios pueden acceder a su nivel y niveles inferiores
    return dashboardOptions.filter(option => option.id <= userLevel);
  };

  const accessibleDashboards = getUserAccessibleDashboards();

  const handleDashboardSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  const getLevelDisplay = (level: number) => {
    const option = dashboardOptions.find(opt => opt.id === level);
    return option ? option.name : 'Desconocido';
  };

  const getLevelColor = (level: number) => {
    const option = dashboardOptions.find(opt => opt.id === level);
    return option ? option.color : '#6b7280';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Seleccionar Dashboard
            </h2>
            <p className="text-gray-600 mt-1">
              Actualmente en: <span 
                className="font-semibold" 
                style={{ color: getLevelColor(currentDashboardLevel) }}
              >
                {getLevelDisplay(currentDashboardLevel)}
              </span>
            </p>
            {userData && (
              <p className="text-sm text-gray-500 mt-1">
                Tu nivel: <span 
                  className="font-semibold" 
                  style={{ color: getLevelColor(userData.user_level || 1) }}
                >
                  {getLevelDisplay(userData.user_level || 1)}
                </span>
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Dashboard Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accessibleDashboards.map((option) => {
            const isCurrent = option.id === currentDashboardLevel;
            const isAccessible = option.id <= (userData?.user_level || 1);
            
            return (
              <div
                key={option.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-50'
                    : isAccessible
                    ? 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                }`}
                onClick={() => isAccessible && handleDashboardSelect(option.href)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: option.color }}
                  ></div>
                  {isCurrent && (
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                      Actual
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {option.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {option.description}
                </p>
                {!isAccessible && (
                  <p className="text-xs text-red-500 mt-2">
                    Nivel insuficiente para acceder
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
