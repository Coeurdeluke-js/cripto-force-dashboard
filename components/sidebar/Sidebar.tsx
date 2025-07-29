"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { sidebarItems, sidebarItemsAcolito } from "./sidebarItems";
import SidebarToggle from "./SidebarToggle";
import { useSidebar } from "./SidebarContext";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Menu, LogOut } from 'lucide-react';

export default function Sidebar() {
  const { isExpanded, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const isAcolito = pathname.startsWith("/dashboard/acolito");
  const items = isAcolito ? sidebarItemsAcolito : sidebarItems;
  const [userData, setUserData] = useState({ avatar: '/images/default-avatar.png' });

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
              {/* Header con imagen circular */}
        <div className="flex-shrink-0 h-16 flex items-center justify-center border-b border-gray-800/30 bg-transparent px-4 rounded-t-xl">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src="/images/insignias/1-iniciados.png"
              alt="Iniciado"
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
          <span className="flex items-center justify-center text-xl w-6 h-6 transition-all duration-200 text-gray-400 group-hover:text-[#ec4d58]">
            <Menu size={20} />
          </span>
        </button>
      </div>

      {/* Navigation - estilo WhatsApp */}
      <nav className="flex-1 py-4 px-3">
        <ul className="space-y-1">
          {/* Resto de elementos de navegación */}
          {items.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`group relative flex items-center py-3 px-3 text-gray-300 hover:bg-[#232323] rounded-lg transition-all duration-200 ease-in-out w-full ${
                    isExpanded ? 'justify-start text-left gap-x-3' : 'justify-center'
                  } ${isActive ? 'bg-[#ec4d58] text-white' : ''}`}
                  title={!isExpanded ? item.label : undefined}
                >
                  {/* Active indicator - línea roja como antes */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#ec4d58] rounded-r-full"></div>
                  )}
                  
                  <span
                    className={`flex items-center justify-center text-xl w-6 h-6 transition-all duration-200 ${
                      isActive 
                        ? 'text-white' 
                        : 'text-gray-400 group-hover:text-[#ec4d58]'
                    } ${isExpanded ? 'mr-3' : ''}`}
                  >
                    {typeof item.icon === 'string' ? item.icon : React.createElement(item.icon)}
                  </span>
                  
                  {isExpanded && (
                    <span 
                      className={`font-medium transition-all duration-200 whitespace-nowrap ${
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-300 group-hover:text-[#ec4d58]'
                      }`}
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
              <span className={`text-xl w-6 h-6 flex items-center justify-center transition-all duration-200 text-gray-400 group-hover:text-[#ec4d58] ${isExpanded ? 'mr-3' : ''}`}>
                <Image
                  src={userData.avatar}
                  alt="Perfil"
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                />
              </span>
              {isExpanded && (
                <span className="font-medium text-gray-300 group-hover:text-[#ec4d58] transition-all duration-200">
                  Perfil
                </span>
              )}
            </Link>
            
            <Link 
              href="/logout" 
              className="group relative flex items-center py-3 px-3 text-gray-300 hover:bg-[#232323] rounded-lg transition-all duration-200 ease-in-out w-full"
              title={!isExpanded ? "Salir" : undefined}
            >
              <span className={`text-xl w-6 h-6 flex items-center justify-center transition-all duration-200 text-gray-400 group-hover:text-[#ec4d58] ${isExpanded ? 'mr-3' : ''}`}>
                <LogOut size={20} />
              </span>
              {isExpanded && (
                <span className="font-medium text-gray-300 group-hover:text-[#ec4d58] transition-all duration-200">
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