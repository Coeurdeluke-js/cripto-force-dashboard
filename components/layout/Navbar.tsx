'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import RoleSelector from './RoleSelector';

const roles = [
  { id: 'iniciado', name: 'Iniciado', level: 'I', color: 'text-white', path: '/dashboard/iniciado' },
  { id: 'acolito', name: 'Acólito', level: 'II', color: 'text-yellow-400', path: '/dashboard/acolito' },
  { id: 'warrior', name: 'Warrior', level: 'III', color: 'text-green-400', path: '/dashboard/warrior' },
  { id: 'lord', name: 'Lord', level: 'IV', color: 'text-blue-400', path: '/dashboard/lord' },
  { id: 'darth', name: 'Darth', level: 'V', color: 'text-red-500', path: '/dashboard/darth' },
  { id: 'maestro', name: 'Maestro', level: 'VI', color: 'text-gray-900', path: '/dashboard/maestro' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Fondo oscuro + blur */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md z-40 animate-fadeIn"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* NAVBAR SUPERIOR */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-[#ec4d58]/20 rounded-b-2xl overflow-hidden">
        <div className="absolute inset-0 animate-light-wave z-0" />

        <nav className="relative w-full bg-[#121212]/90 backdrop-blur-md flex justify-between items-center px-4 sm:px-6 py-3 max-w-full z-50">
          <div className="flex justify-between items-center max-w-7xl w-full mx-auto">
            {/* LOGO */}
            <div className="flex items-center space-x-2 z-10">
              <Link href="/" className="text-2xl font-bold text-white">
                Crypto Force
              </Link>
            </div>

            {/* NAV DESKTOP */}
            <div className="hidden md:flex space-x-8 items-center z-10">
              <Link
                href="/"
                className="text-white hover:text-[#ec4d58] transition-colors flex items-center gap-2 font-semibold"
              >
                <i className="fas fa-home"></i> Inicio
              </Link>
              <RoleSelector />
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/dashboard/iniciado"
                className="relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-tr from-[#ec4d58] via-[#c6373e] to-[#ec4d58] px-5 py-2 shadow-lg text-white font-semibold text-sm transition-all hover:brightness-110 border border-[#ec4d58]"
              >
                <i className="fas fa-user"></i> Mi Dashboard
              </Link>
            </div>

            {/* NAV COLAPSADA MÓVIL */}
            <div className={clsx("md:hidden flex items-center justify-between w-full z-10 transition-opacity duration-300", {
              'opacity-0 pointer-events-none': isMobileMenuOpen,
              'opacity-100': !isMobileMenuOpen,
            })}>
              <div className="flex gap-3 items-center flex-1 justify-center overflow-x-auto flex-nowrap scrollbar-hide">
                <Link
                  href="/"
                  className="text-white hover:text-[#ec4d58] text-lg relative group p-2 flex-shrink-0"
                  title="Inicio"
                >
                  <i className="fas fa-home"></i>
                </Link>
                <Link 
                  href="/dashboard/iniciado" 
                  className="text-[#ec4d58] hover:text-white text-lg p-2 flex-shrink-0" 
                  title="Mi Dashboard"
                >
                  <i className="fas fa-user"></i>
                </Link>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-[#ec4d58] p-2"
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* NAVBAR MÓVIL DESPLEGADA */}
      {isMobileMenuOpen && (
        <>
          {/* Menú: 2/3 superior */}
          <div
            className={clsx(
              'fixed top-0 left-0 z-[60] bg-[#1a1a1a]/95 backdrop-blur-md border-t border-[#ec4d58]/30 shadow-2xl animate-slideFadeInDown',
              'flex flex-col justify-start gap-2 px-6 pt-8 w-full h-[60vh] max-h-[80vh]'
            )}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-[#ec4d58] text-2xl focus:outline-none"
              aria-label="Cerrar menú"
            >
              <i className="fas fa-times"></i>
            </button>
            
            {/* Enlaces principales */}
            <Link
              href="/"
              className="text-white hover:text-[#ec4d58] transition-colors flex items-center gap-3 text-lg font-semibold py-3 px-4 rounded-lg hover:bg-[#ec4d58]/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-home w-6"></i> Inicio
            </Link>
            
            {/* Roles */}
            <div className="py-3 px-4">
              <h3 className="text-white/80 text-sm font-semibold mb-3">Acceso a Dashboards:</h3>
              <div className="space-y-2">
                {roles.map((role) => (
                  <Link
                    key={role.id}
                    href={role.path}
                    className={`${role.color} hover:text-[#ec4d58] transition-colors flex items-center gap-3 text-lg font-semibold py-2 px-4 rounded-lg hover:bg-[#ec4d58]/10`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className="fas fa-user w-6"></i> {role.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* Overlay: 1/3 inferior */}
          <div
            className="fixed bottom-0 left-0 w-full h-1/3 z-[59] bg-black/5 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </>
      )}
    </>
  );
}
