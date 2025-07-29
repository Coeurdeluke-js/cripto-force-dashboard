import { sidebarItems } from "./sidebarItems";
import Link from "next/link";
import React from "react";
import { LogOut } from 'lucide-react';

interface MobileSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const MobileSidebar = ({ collapsed, onToggle }: MobileSidebarProps) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#121212] border-t border-gray-800/50 z-50 md:hidden backdrop-blur-sm">
      <ul className="flex justify-around items-center h-14 px-1">
        {sidebarItems.slice(0, 4).map((item, idx) => {
          return (
            <li key={item.label} className="flex-1 text-center">
              <Link 
                href={item.href} 
                className="group flex flex-col items-center justify-center text-[#fafafa] hover:text-[#ec4d58] transition-all duration-300 ease-in-out text-xs whitespace-nowrap py-1 px-0.5 hover:scale-105"
              >
                <span className="text-lg mb-0.5 transition-all duration-300 ease-in-out text-[#fafafa] group-hover:text-[#ec4d58] group-hover:scale-110">
                  {typeof item.icon === 'string' ? item.icon : React.createElement(item.icon as React.ComponentType<any>)}
                </span>
                <span className="text-[8px] leading-tight font-medium transition-all duration-300 ease-in-out text-[#fafafa] group-hover:text-[#ec4d58] break-words whitespace-normal">
                  {item.label.split(' ')[0]}
                </span>
              </Link>
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