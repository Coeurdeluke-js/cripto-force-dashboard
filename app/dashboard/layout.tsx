'use client';

import { ReactNode } from 'react';
import { SidebarProvider, useSidebar } from '@/components/sidebar/SidebarContext';
import { ControlPointProvider, useControlPoint } from '@/context/ControlPointContext';
import Sidebar from '@/components/sidebar/Sidebar';
import MobileSidebar from '@/components/sidebar/MobileSidebar';

function DashboardContent({ children }: { children: ReactNode }) {
  const { isExpanded, toggleSidebar } = useSidebar();
  const { state } = useControlPoint();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] text-white">
      {/* Sidebar Desktop */}
      <div className={`hidden md:block transition-all duration-300 relative ${
        state.isNavigationBlocked 
          ? 'blur-navigation opacity-50 pointer-events-none navigation-blocked blocked-tooltip' 
          : ''
      }`}>
        <Sidebar />
        {state.isNavigationBlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
            <div className="bg-[#1a1a1a] border border-[#ec4d58] rounded-lg p-3 shadow-lg">
              <p className="text-sm text-white text-center">
                🔒 Finaliza la evaluación antes de continuar
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Sidebar Mobile */}
      <div className={`md:hidden fixed bottom-0 left-0 w-full z-50 transition-all duration-300 relative ${
        state.isNavigationBlocked 
          ? 'blur-navigation opacity-50 pointer-events-none navigation-blocked blocked-tooltip' 
          : ''
      }`}>
        <MobileSidebar collapsed={!isExpanded} onToggle={toggleSidebar} />
        {state.isNavigationBlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
            <div className="bg-[#1a1a1a] border border-[#ec4d58] rounded-lg p-3 shadow-lg">
              <p className="text-sm text-white text-center">
                🔒 Finaliza la evaluación antes de continuar
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className={`transition-all duration-300 flex flex-col min-h-screen ${isExpanded ? 'md:ml-64' : 'md:ml-16'}`}>
        <main className="flex-1 overflow-auto">
            {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ControlPointProvider>
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
    </ControlPointProvider>
  );
}