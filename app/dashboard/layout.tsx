'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { SidebarProvider, useSidebar } from '@/components/sidebar/SidebarContext';
import { ControlPointProvider, useControlPoint } from '@/context/ControlPointContext';
import { ProgressProvider } from '@/context/ProgressContext';
import Sidebar from '@/components/sidebar/Sidebar';
import MobileSidebar from '@/components/sidebar/MobileSidebar';

function DashboardContent({ children }: { children: ReactNode }) {
  const { isExpanded, toggleSidebar } = useSidebar();
  const { state } = useControlPoint();
  const pathname = usePathname();

  // Si es la ruta de maestro, no aplicar sidebar ni layout
  if (pathname?.startsWith('/dashboard/maestro')) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] text-white">
      {/* Sidebar Desktop - SOLO en desktop */}
      <div className="hidden md:block transition-all duration-300 relative">
        <Sidebar />
      </div>
      
      {/* Sidebar Mobile - SOLO en móvil */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 transition-all duration-300">
        <MobileSidebar collapsed={!isExpanded} onToggle={toggleSidebar} />
      </div>
      
      {/* Main Content - Mejorado para responsividad */}
      <div className={`transition-all duration-500 ease-in-out flex flex-col min-h-screen ${
        isExpanded ? 'md:ml-64' : 'md:ml-16'
      }`}>
        <main className="flex-1 overflow-auto md:pl-6 md:pr-6 transition-all duration-500 ease-in-out">
            {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProgressProvider>
      <ControlPointProvider>
        <SidebarProvider>
          <DashboardContent>{children}</DashboardContent>
        </SidebarProvider>
      </ControlPointProvider>
    </ProgressProvider>
  );
}