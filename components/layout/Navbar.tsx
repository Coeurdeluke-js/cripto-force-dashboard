'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';
import clsx from 'clsx';
import RoleSelector from './RoleSelector';

const mainLinks = [
  { href: '/', label: 'Home', icon: 'fas fa-home' },
  { href: '/intro', label: 'Introducción', icon: 'fas fa-info-circle' },
  { href: '/quienessomos', label: 'Quiénes Somos', icon: 'fas fa-users' },
  { href: '/servicios', label: 'Servicios', icon: 'fas fa-cogs' },
  { href: '/contacto', label: 'Contacto', icon: 'fas fa-envelope' },
];

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
  // const { user, logout } = useAuth();

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
            {/* LOGO ELIMINADO */}
            <div className="flex items-center space-x-2 z-10">
              {/* Logo removido según solicitud */}
            </div>

            {/* NAV DESKTOP */}
            <div className="hidden md:flex space-x-8 items-center z-10">
              {mainLinks.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-white hover:text-[#ec4d58] transition-colors flex items-center gap-2 font-semibold"
                >
                  <i className={`${icon}`}></i> {label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {/* {user ? ( */}
                <>
                  <RoleSelector />
                  {/* <button
                    onClick={logout}
                    className="text-white hover:text-[#ec4d58] transition-colors"
                  >
                    Cerrar Sesión
                  </button> */}
                </>
              {/* ) : ( */}
                {/* <RoleSelector /> */}
              {/* )} */}
            </div>

            {/* BOTONES EXTRA DESKTOP */}
            <div className="hidden md:flex items-center space-x-6 z-10">
              <Link
                href="/game"
                className="relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-tr from-[#ec4d58] via-[#c6373e] to-[#ec4d58] px-5 py-2 shadow-lg text-white font-semibold text-sm transition-all hover:brightness-110 border border-[#ec4d58]"
              >
                <i className="fas fa-bolt"></i> The Siths Clash
              </Link>
              {/* {user && ( */}
                <>
                  {/* Eliminar esta duplicación del botón logout */}
                </>
              {/* )} */}
            </div>

            {/* NAV COLAPSADA MÓVIL - Logo eliminado */}
            <div className={clsx("md:hidden flex items-center justify-between w-full z-10 transition-opacity duration-300", {
              'opacity-0 pointer-events-none': isMobileMenuOpen,
              'opacity-100': !isMobileMenuOpen,
            })}>
              {/* Logo móvil eliminado */}
              <div className="flex gap-3 items-center flex-1 justify-center overflow-x-auto flex-nowrap scrollbar-hide">
                {mainLinks.map(({ href, icon, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-white hover:text-[#ec4d58] text-lg relative group p-2 flex-shrink-0"
                    title={label}
                  >
                    <i className={icon}></i>
                  </Link>
                ))}
                <Link 
                  href="/game" 
                  className="text-[#ec4d58] hover:text-white text-lg p-2 flex-shrink-0" 
                  title="The Siths Clash"
                >
                  <i className="fas fa-bolt"></i>
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
            {mainLinks.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                className="text-white hover:text-[#ec4d58] transition-colors flex items-center gap-3 text-lg font-semibold py-3 px-4 rounded-lg hover:bg-[#ec4d58]/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className={`${icon} w-6`}></i> {label}
              </Link>
            ))}
            {/* The Siths Clash */}
            <Link
              href="/game"
              className="bg-gradient-to-tr from-[#ec4d58] via-[#c6373e] to-[#ec4d58] text-white px-4 py-3 rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-bolt"></i> The Siths Clash
            </Link>
            {/* Opciones de usuario */}
            {/* {user && ( */}
              <>
                {/* Eliminar esta duplicación del botón logout */}
              </>
            {/* )} */}
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
