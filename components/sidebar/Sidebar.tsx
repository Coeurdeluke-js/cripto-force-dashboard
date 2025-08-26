"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { sidebarItems, sidebarItemsAcolito } from "./sidebarItems";
import SidebarToggle from "./SidebarToggle";
import { useSidebar } from "./SidebarContext";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Menu, LogOut, Compass } from 'lucide-react';
import { useSafeAuth } from '@/context/AuthContext';

export default function Sidebar() {
  const { isExpanded, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const authContext = useSafeAuth();
  const authUserData = authContext?.userData;
  const loading = authContext?.loading;
  const [isClient, setIsClient] = useState(false);
  
  // Verificar si estamos en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);
  

  
  const isAcolito = pathname.startsWith("/dashboard/acolito");
  const items = isAcolito ? sidebarItemsAcolito : sidebarItems;
  const [userData, setUserData] = useState({ avatar: '/images/default-avatar.png' });
  
  // Verificar si el usuario puede navegar a dashboards inferiores (solo en el cliente)
  const canNavigateDashboards = isClient && authUserData && authUserData.user_level !== undefined;
  
  // Determinar el nivel del dashboard actual basado en la ruta
  const getCurrentDashboardLevel = () => {
    if (pathname?.startsWith('/dashboard/iniciado')) return 1;
    if (pathname?.startsWith('/dashboard/acolito')) return 2;
    if (pathname?.startsWith('/dashboard/warrior')) return 3;
    if (pathname?.startsWith('/dashboard/lord')) return 4;
    if (pathname?.startsWith('/dashboard/darth')) return 5;
    if (pathname?.startsWith('/dashboard/maestro')) return 6;
    return 1; // Por defecto
  };
  
  const currentDashboardLevel = getCurrentDashboardLevel();
  const userLevel = authUserData?.user_level || 1;
  
  // Mostrar ícono compass si el usuario tiene un rol superior al dashboard actual
  // Fundador (0) siempre puede navegar, Maestro (6) puede navegar a niveles inferiores
  const shouldShowCompass = userLevel === 0 || userLevel > currentDashboardLevel;
  
  // Debug: Log detallado para entender por qué no aparece el ícono
  console.log('🔍 Sidebar - Compass Logic Debug:', {
    pathname,
    currentDashboardLevel,
    userLevel,
    shouldShowCompass,
    isFundador: userLevel === 0,
    isMaestro: userLevel === 6,
    userEmail: authUserData?.email
  });
  
  // Debug logs
  useEffect(() => {
    if (isClient) {
      console.log('🔍 Sidebar - AuthContext completo:', authContext);
      console.log('🔍 Sidebar - UserData del contexto:', authUserData);
      console.log('🔍 Sidebar - ¿Es cliente?:', isClient);
      console.log('🔍 Sidebar - user_level específico:', authUserData?.user_level);
      console.log('🔍 Sidebar - ¿Puede navegar dashboards?:', canNavigateDashboards);
      console.log('🔍 Sidebar - Condición completa:', {
        isClient,
        hasUserData: !!authUserData,
        userLevel: authUserData?.user_level,
        canNavigate: canNavigateDashboards,
        currentDashboardLevel,
        shouldShowCompass
      });
    }
  }, [isClient, authContext, authUserData, canNavigateDashboards, currentDashboardLevel, userLevel, shouldShowCompass]);

  // Get user data from profile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('simple_profile');
      if (saved) {
        const profileData = JSON.parse(saved);
        setUserData(profileData);
      }
    }
  }, []);

  // Determinar si mostrar footer (solo si no están en la lista principal)
  const showFooter = !items.some(item => item.label === "Perfil" || item.label === "Salir");
  
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gradient-to-b from-[#121212] to-[#0a0a0a] shadow-2xl z-40 flex flex-col border-r border-gray-800/50 transition-all duration-300 ease-in-out rounded-r-xl ${
        isExpanded ? "w-72" : "w-20"
      }`}
    >
      <style jsx>{`
        .sidebar-text {
          transition: all 0.3s ease-in-out;
          opacity: 0;
          transform: translateX(-10px);
        }
        
        .sidebar-text.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .sidebar-text.delayed-1 {
          transition-delay: 0.05s;
        }
        
        .sidebar-text.delayed-2 {
          transition-delay: 0.1s;
        }
        
        .sidebar-text.delayed-3 {
          transition-delay: 0.15s;
        }
        
        .sidebar-text.delayed-4 {
          transition-delay: 0.2s;
        }
        
        .sidebar-text.delayed-5 {
          transition-delay: 0.25s;
        }
        
        .sidebar-text.delayed-6 {
          transition-delay: 0.3s;
        }
        
        .sidebar-text.delayed-footer-1 {
          transition-delay: 0.35s;
        }
        
        .sidebar-text.delayed-footer-2 {
          transition-delay: 0.4s;
        }
      `}</style>
      
      {/* Header con imagen circular */}
      <div className="flex-shrink-0 h-16 flex items-center justify-center border-b border-gray-800/30 bg-transparent px-4 rounded-t-xl">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={`/images/insignias/${currentDashboardLevel}-${
              currentDashboardLevel === 1 ? 'iniciados' :
              currentDashboardLevel === 2 ? 'acolitos' :
              currentDashboardLevel === 3 ? 'warriors' :
              currentDashboardLevel === 4 ? 'lords' :
              currentDashboardLevel === 5 ? 'darths' :
              currentDashboardLevel === 6 ? 'maestros' : 'iniciados'
            }.png`}
            alt={
              currentDashboardLevel === 1 ? 'Iniciado' :
              currentDashboardLevel === 2 ? 'Acólito' :
              currentDashboardLevel === 3 ? 'Warrior' :
              currentDashboardLevel === 4 ? 'Lord' :
              currentDashboardLevel === 5 ? 'Darth' :
              currentDashboardLevel === 6 ? 'Maestro' : 'Iniciado'
            }
            width={48}
            height={48}
            className="w-full h-full object-cover"
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
        </div>
      </div>

      {/* Toggle button separado arriba */}
      <div className="flex-shrink-0 p-3 border-b border-gray-800/30">
        <button
          onClick={toggleSidebar}
          className="group relative flex items-center py-3 px-3 text-gray-400 hover:bg-[#232323] rounded-lg transition-all duration-200 ease-in-out w-full justify-center"
          title={isExpanded ? "Contraer" : "Expandir"}
        >
          <span className={`flex items-center justify-center text-xl w-6 h-6 transition-all duration-200 text-gray-400 ${
            currentDashboardLevel === 2 ? 'group-hover:text-[#FFD447]' : 'group-hover:text-[#ec4d58]'
          }`}>
            <Menu size={20} />
          </span>
        </button>
      </div>

      {/* Navigation - estilo WhatsApp */}
      <nav className="flex-1 py-4 px-3">
        <ul className="space-y-1">

          
          {/* Enlace de selección de dashboard - visible para usuarios con roles superiores */}
                    {!loading && (shouldShowCompass || authUserData?.user_level === 0) && (
            <li>
              <Link
                href="/dashboard/maestro/dashboard-selection"
                className={`group relative flex items-center py-3 px-3 hover:bg-[#232323] rounded-lg transition-all duration-200 ease-out w-full border ${
                  currentDashboardLevel === 2 
                    ? 'text-[#FFD447] border-[#FFD447]/30 hover:border-[#FFD447]/60' 
                    : 'text-[#ec4d58] border-[#ec4d58]/30 hover:border-[#ec4d58]/60'
                }`}
                                      title={!isExpanded ? "Selección de Dashboard" : undefined}
              >
                                      <span
                        className={`flex items-center justify-center text-xl w-6 h-6 transition-all duration-200 ${
                          currentDashboardLevel === 2 
                            ? 'text-[#FFD447] group-hover:text-[#FFD447]' 
                            : 'text-[#ec4d58] group-hover:text-[#ec4d58]'
                        }`}
                      >
                        <Compass size={20} />
                      </span>
                
                {isExpanded && (
                                          <span
                          className={`font-medium whitespace-nowrap sidebar-text visible delayed-1 ${
                            currentDashboardLevel === 2 
                              ? 'text-[#FFD447] group-hover:text-[#FFD447]' 
                              : 'text-[#ec4d58] group-hover:text-[#ec4d58]'
                          }`}
                        >
                          Selección de Dashboard
                        </span>
                )}
              </Link>
            </li>
          )}
          

          

          
          {/* Resto de elementos de navegación */}
          {items.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`group relative flex items-center py-3 px-3 text-gray-300 hover:bg-[#232323] rounded-lg transition-all duration-200 ease-in-out w-full ${
                    isExpanded ? 'justify-start text-left gap-x-3' : 'justify-center'
                  } ${isActive ? (currentDashboardLevel === 2 ? 'bg-[#FFD447] text-gray-900' : 'bg-[#ec4d58] text-white') : ''}`}
                  title={!isExpanded ? item.label : undefined}
                >
                  {/* Active indicator - línea roja como antes */}
                  {isActive && (
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full ${
                      currentDashboardLevel === 2 ? 'bg-[#FFD447]' : 'bg-[#ec4d58]'
                    }`}></div>
                  )}
                  
                  <span
                    className={`flex items-center justify-center text-xl w-6 h-6 transition-all duration-200 ${
                      isActive 
                        ? 'text-gray-900' 
                        : `text-gray-400 group-hover:${currentDashboardLevel === 2 ? 'text-[#FFD447]' : 'text-[#ec4d58]'}`
                    } ${isExpanded ? 'mr-3' : ''}`}
                  >
                    {typeof item.icon === 'string' ? item.icon : React.createElement(item.icon)}
                  </span>
                  
                  {isExpanded && (
                    <span 
                      className={`font-medium whitespace-nowrap sidebar-text ${
                        isActive 
                          ? 'text-gray-900' 
                          : `text-gray-300 group-hover:${currentDashboardLevel === 2 ? 'text-[#FFD447]' : 'text-[#ec4d58]'}`
                      } ${isExpanded ? 'visible' : ''} delayed-${Math.min(index + 1, 6)}`}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}


        </ul>
      </nav>

      {/* Footer - estilo WhatsApp */}
      {showFooter && (
        <div className="flex-shrink-0 p-3 border-t border-gray-800/30 rounded-b-xl">
          <div className="space-y-1">
            <Link 
              href="/dashboard/perfil" 
              className="group relative flex items-center py-3 px-3 text-gray-300 hover:bg-[#232323] rounded-lg transition-all duration-200 ease-in-out w-full"
              title={!isExpanded ? "Perfil" : undefined}
            >
              <span className={`text-xl w-6 h-6 flex items-center justify-center transition-all duration-200 text-gray-400 ${
                currentDashboardLevel === 2 ? 'group-hover:text-[#FFD447]' : 'group-hover:text-[#ec4d58]'
              } ${isExpanded ? 'mr-3' : ''}`}>
                <Image
                  src={userData.avatar}
                  alt="Perfil"
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                />
              </span>
              {isExpanded && (
                <span 
                  className={`font-medium text-gray-300 ${
                    currentDashboardLevel === 2 ? 'group-hover:text-[#FFD447]' : 'group-hover:text-[#ec4d58]'
                  } sidebar-text ${isExpanded ? 'visible' : ''} delayed-footer-1`}
                >
                  Perfil
                </span>
              )}
            </Link>
            
            <Link 
              href="/logout" 
              className="group relative flex items-center py-3 px-3 text-gray-300 hover:bg-[#232323] rounded-lg transition-all duration-200 ease-in-out w-full"
              title={!isExpanded ? "Salir" : undefined}
            >
              <span className={`text-xl w-6 h-6 flex items-center justify-center transition-all duration-200 text-gray-400 ${
                currentDashboardLevel === 2 ? 'group-hover:text-[#FFD447]' : 'group-hover:text-[#ec4d58]'
              } ${isExpanded ? 'mr-3' : ''}`}>
                <LogOut size={20} />
              </span>
              {isExpanded && (
                <span 
                  className={`font-medium text-gray-300 ${
                    currentDashboardLevel === 2 ? 'group-hover:text-[#FFD447]' : 'group-hover:text-[#ec4d58]'
                  } sidebar-text ${isExpanded ? 'visible' : ''} delayed-footer-2`}
                >
                  Salir
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}