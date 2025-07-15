"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { sidebarItems, sidebarItemsAcolito } from "./sidebarItems";
import SidebarToggle from "./SidebarToggle";
import { useSidebar } from "./SidebarContext";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
      className={`fixed top-0 left-0 h-full bg-[#121212] shadow-2xl z-40 flex flex-col border-r border-gray-800/50 transition-all duration-500 ease-in-out pt-12 ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      {/* Header con logo */}
      <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="flex-shrink-0 relative overflow-hidden border-b border-gray-800/30 bg-[#121212]">
        {isExpanded && (
          <Image 
            src="/logo-dark-theme.png" 
            alt="Logo" 
            width={112}
            height={112}
            className="h-28 w-auto transition-all duration-300"
            style={{ display: 'block', margin: '0 auto' }}
          />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 pt-6 pb-6 px-3">
        <ul className="space-y-2 items-center">
          {items.map((item, index) => {
            const isAfterAjustes = index === 3;
            return (
              <React.Fragment key={item.label}>
                <li className={`flex ${isExpanded ? 'justify-start' : 'justify-center'}`}>
                  {item.label === "Mensaje de bienvenida" ? (
                    <Link
                      href="/dashboard/mensaje"
                      className={`group relative flex items-center py-3 px-3 text-[#fafafa] hover:bg-[#232323] rounded-lg transition-all duration-300 ease-in-out hover:scale-105 w-full ${isExpanded ? 'justify-start text-left gap-x-3' : 'justify-center'} `}
                      title={!isExpanded ? item.label : undefined}
                    >
                      <span
                        className={`flex items-center justify-center text-xl w-6 h-6 transition-all duration-300 group-hover:text-[#ec4d58] ${isExpanded ? 'mr-3' : ''}`}
                      >
                        {typeof item.icon === 'string' ? item.icon : React.createElement(item.icon)}
                      </span>
                      <span 
                        className={`font-medium text-[#fafafa] group-hover:text-[#ec4d58] transition-all duration-500 ease-in-out whitespace-nowrap ${isExpanded ? 'opacity-100 max-w-xs w-auto' : 'opacity-0 max-w-0 w-0'}`}
                        style={{
                          transitionProperty: 'opacity',
                          transitionDuration: '300ms',
                          transitionTimingFunction: 'ease-in-out',
                          transitionDelay: isExpanded ? '200ms' : '0ms',
                          display: 'inline-block',
                          verticalAlign: 'middle',
                          overflow: isExpanded ? 'visible' : 'hidden',
                          textOverflow: isExpanded ? 'clip' : 'ellipsis',
                          wordBreak: 'normal',
                          maxWidth: isExpanded ? '160px' : undefined
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`font-medium whitespace-nowrap text-[#fafafa] group-hover:text-[#ec4d58] transition-all duration-500 ease-in-out overflow-hidden text-ellipsis ${isExpanded ? 'opacity-0 max-w-0 w-0' : 'opacity-100 max-w-xs w-auto'}`}
                        style={{
                          transitionProperty: 'max-width, width',
                          transitionDuration: '300ms',
                          transitionTimingFunction: 'ease-in-out',
                          transitionDelay: isExpanded ? '0ms' : '200ms',
                          display: 'inline-block',
                          verticalAlign: 'middle',
                          position: 'absolute',
                          pointerEvents: 'none',
                          visibility: 'hidden',
                        }}
                      >
                        {item.label}
                      </span>
                      {!isExpanded && (
                        <div 
                          className="absolute left-full ml-2 px-2 py-1 bg-[#232323] text-[#fafafa] text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 whitespace-nowrap"
                          style={{
                            transform: 'translateY(-50%)',
                            top: '50%'
                          }}
                        >
                          {item.label}
                        </div>
                      )}
                    </Link>
                  ) : (
              <Link
                href={item.href}
                      className={`group relative flex items-center py-3 px-3 text-[#fafafa] hover:bg-[#232323] rounded-lg transition-all duration-300 ease-in-out hover:scale-105 ${isExpanded ? 'justify-start text-left gap-x-3' : 'justify-center'} w-full`}
                title={!isExpanded ? item.label : undefined}
              >
                      <span 
                        className={`flex items-center justify-center text-xl w-6 h-6 transition-all duration-300 group-hover:text-[#ec4d58] ${isExpanded ? 'mr-3' : ''}`}
                      >
                        {typeof item.icon === 'string' ? item.icon : React.createElement(item.icon)}
                      </span>
                <span 
                        className={`font-medium whitespace-nowrap text-[#fafafa] group-hover:text-[#ec4d58] transition-all duration-500 ease-in-out overflow-hidden text-ellipsis ${isExpanded ? 'opacity-100 max-w-xs w-auto' : 'opacity-0 max-w-0 w-0'}`}
                        style={{
                          transitionProperty: 'opacity',
                          transitionDuration: '300ms',
                          transitionTimingFunction: 'ease-in-out',
                          transitionDelay: isExpanded ? '200ms' : '0ms',
                          display: 'inline-block',
                          verticalAlign: 'middle',
                        }}
                >
                        {item.label}
                </span>
                <span 
                        className={`font-medium whitespace-nowrap text-[#fafafa] group-hover:text-[#ec4d58] transition-all duration-500 ease-in-out overflow-hidden text-ellipsis ${isExpanded ? 'opacity-0 max-w-0 w-0' : 'opacity-100 max-w-xs w-auto'}`}
                        style={{
                          transitionProperty: 'max-width, width',
                          transitionDuration: '300ms',
                          transitionTimingFunction: 'ease-in-out',
                          transitionDelay: isExpanded ? '0ms' : '200ms',
                          display: 'inline-block',
                          verticalAlign: 'middle',
                          position: 'absolute',
                          pointerEvents: 'none',
                          visibility: 'hidden',
                        }}
                >
                  {item.label}
                </span>
                {!isExpanded && (
                  <div 
                    className="absolute left-full ml-2 px-2 py-1 bg-[#232323] text-[#fafafa] text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 whitespace-nowrap"
                    style={{
                      transform: 'translateY(-50%)',
                      top: '50%'
                    }}
                  >
                    {item.label}
                  </div>
                )}
              </Link>
                  )}
                </li>
                {isAfterAjustes && !isExpanded && (
                  <li className="w-full flex justify-center mt-2">
                    <SidebarToggle collapsed={true} onToggle={toggleSidebar} />
            </li>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </nav>

      {/* Footer con acciones del usuario, solo si no están en la lista principal */}
      {showFooter && (
        <div className="flex-shrink-0 p-3">
          {isAcolito && <hr className="border-t border-gray-700/50 mb-3" />}
          <hr className="border-t border-gray-700/30 mb-3" />
        <div className="space-y-2">
          <Link 
            href="/dashboard/perfil" 
            className="group relative flex items-center py-3 px-3 text-[#fafafa] hover:bg-[#232323] rounded-lg transition-all duration-300 ease-in-out hover:scale-105"
            title={!isExpanded ? "Perfil" : undefined}
          >
            <span 
              className={`text-xl w-6 text-center flex-shrink-0 transition-all duration-300 ease-in-out text-[#fafafa] group-hover:text-[#ec4d58] group-hover:scale-110 ${
                isExpanded ? 'mr-3' : 'mr-0'
              }`}
            >
              {isExpanded ? (
                <Image
                  src={userData.avatar}
                  alt="Perfil"
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <Image
                  src={userData.avatar}
                  alt="Perfil"
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
            </span>
            <span 
              className={`font-medium whitespace-nowrap transition-all duration-500 ease-in-out text-[#fafafa] group-hover:text-[#ec4d58] ${
                isExpanded 
                  ? 'opacity-100 translate-x-0 delay-100' 
                  : 'opacity-0 translate-x-2 w-0 overflow-hidden'
              }`}
            >
              Perfil
            </span>
            
            {!isExpanded && (
              <div 
                className="absolute left-full ml-2 px-2 py-1 bg-[#232323] text-[#fafafa] text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 whitespace-nowrap"
                style={{
                  transform: 'translateY(-50%)',
                  top: '50%'
                }}
              >
                Perfil
              </div>
            )}
          </Link>
          <Link 
            href="/logout" 
            className="group relative flex items-center py-3 px-3 text-[#fafafa] hover:bg-[#232323] rounded-lg transition-all duration-300 ease-in-out hover:scale-105"
            title={!isExpanded ? "Salir" : undefined}
          >
            <span 
              className={`text-xl w-6 text-center flex-shrink-0 transition-all duration-300 ease-in-out text-[#fafafa] group-hover:text-[#ec4d58] group-hover:scale-110 ${
                isExpanded ? 'mr-3' : 'mr-0'
              }`}
            >
                {React.createElement(ChevronRight)}
            </span>
            <span 
              className={`font-medium whitespace-nowrap transition-all duration-500 ease-in-out text-[#fafafa] group-hover:text-[#ec4d58] ${
                isExpanded 
                  ? 'opacity-100 translate-x-0 delay-100' 
                  : 'opacity-0 translate-x-2 w-0 overflow-hidden'
              }`}
            >
              Salir
            </span>
            
            {!isExpanded && (
              <div 
                className="absolute left-full ml-2 px-2 py-1 bg-[#232323] text-[#fafafa] text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 whitespace-nowrap"
                style={{
                  transform: 'translateY(-50%)',
                  top: '50%'
                }}
              >
                Salir
              </div>
            )}
          </Link>
        </div>
      </div>
      )}
      {isExpanded && (
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 z-50">
          <SidebarToggle collapsed={false} onToggle={toggleSidebar} />
        </div>
      )}
    </aside>
  );
}