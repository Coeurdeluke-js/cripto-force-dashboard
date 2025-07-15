import { sidebarItems } from "./sidebarItems";
import Link from "next/link";
import React from "react";
import { Menu, X, ChevronRight, LogOut } from 'lucide-react';

interface MobileSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const MobileSidebar = ({ collapsed, onToggle }: MobileSidebarProps) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#121212] border-t border-gray-800/50 z-50 md:hidden backdrop-blur-sm">
      <ul className="flex justify-around items-center h-14 px-1">
        {sidebarItems.slice(0, 8).map((item, idx) => {
          const isLocked = idx > 3;
          const isAjustes = item.label.toLowerCase().includes('ajustes');
          return (
            <li key={item.label} className={isAjustes ? 'flex flex-col items-center justify-center h-full py-1 text-center' : 'flex-1 text-center'}>
              {!isLocked ? (
                <Link 
                  href={item.href} 
                  className={isAjustes ? 'group flex flex-col items-center justify-center text-[#fafafa] hover:text-[#ec4d58] transition-all duration-300 ease-in-out text-xs whitespace-nowrap py-1 px-0.5 hover:scale-105' : 'group flex flex-col items-center justify-center text-[#fafafa] hover:text-[#ec4d58] transition-all duration-300 ease-in-out text-xs whitespace-nowrap py-1 px-0.5 hover:scale-105'}
                >
                  <span className={isAjustes ? 'text-lg mb-0.5 mx-auto transition-all duration-300 ease-in-out text-[#fafafa] group-hover:text-[#ec4d58] group-hover:scale-110' : 'text-lg mb-0.5 transition-all duration-300 ease-in-out text-[#fafafa] group-hover:text-[#ec4d58] group-hover:scale-110'}>
                    {typeof item.icon === 'string' ? item.icon : React.createElement(item.icon as React.ComponentType<any>)}
                  </span>
                  <span className={isAjustes ? 'text-[8px] leading-tight font-medium transition-all duration-300 ease-in-out text-[#fafafa] group-hover:text-[#ec4d58] break-words whitespace-normal mx-auto' : 'text-[8px] leading-tight font-medium transition-all duration-300 ease-in-out text-[#fafafa] group-hover:text-[#ec4d58] break-words whitespace-normal'}>
                    {item.label.split(' ')[0]}
                  </span>
                </Link>
              ) : (
                <div className={isAjustes ? 'flex flex-col items-center justify-center text-gray-500 opacity-60 cursor-not-allowed text-xs py-1 px-0.5 select-none h-full text-center' : 'flex flex-col items-center justify-center text-gray-500 opacity-60 cursor-not-allowed text-xs py-1 px-0.5 select-none'}>
                  <span className={isAjustes ? 'text-lg mb-0.5 mx-auto' : 'text-lg mb-0.5'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </span>
                  <span className={isAjustes ? 'text-[8px] leading-tight font-medium break-words whitespace-normal mx-auto' : 'text-[8px] leading-tight font-medium break-words whitespace-normal'}>
                    {item.label.split(' ')[0]}
                  </span>
                </div>
              )}
              {/* Ícono de despliegue/contracción debajo de Ajustes básicos */}
              {collapsed && idx === 3 && (
                <button
                  onClick={onToggle}
                  className="flex flex-col items-center justify-center mx-auto mt-1 text-[#ec4d58] hover:text-white transition-all"
                  style={{ fontSize: 18 }}
                  aria-label="Expandir sidebar"
                >
                  <ChevronRight />
                  <span className="text-[8px]">Abrir</span>
                </button>
              )}
            </li>
          );
        })}
        {/* Botón Salir */}
        <li className="flex-1 text-center">
          <Link
            href="/logout"
            className="group flex flex-col items-center justify-center text-[#fafafa] hover:text-[#ec4d58] transition-all duration-300 ease-in-out text-xs whitespace-nowrap py-1 px-0.5 hover:scale-105"
          >
            <span className="text-lg mb-0.5 transition-all duration-300 ease-in-out text-[#fafafa] group-hover:text-[#ec4d58] group-hover:scale-110">
              <LogOut />
            </span>
            <span className="text-[8px] leading-tight font-medium transition-all duration-300 ease-in-out text-[#fafafa] group-hover:text-[#ec4d58] break-words whitespace-normal">
              Salir
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileSidebar;