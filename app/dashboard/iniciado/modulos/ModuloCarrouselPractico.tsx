'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import ControlPointBadge from '@/components/ui/ControlPointBadge';

interface Module {
  title: string;
  path: string;
  description?: string;
}

interface ModuloCarrouselProps {
  modules: Module[];
}

const icons = [
  // 1. Introducción al Trading
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-p1"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  // 2. Introducción al Análisis Técnico
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-p2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  // 3. Patrones de vela
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-p3"><path d="M12 2v20m0-20l-4 4m4-4l4 4m-4 16l-4-4m4 4l4-4" /></svg>,
  // 4. Fibonacci y medias móviles
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-p4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M8 12h8m-4-4v8" /></svg>,
  // 5. Estocástico y Bollinger
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-p5"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /><path d="M9 12l2 2 4-4" /></svg>,
  // 6. Indicadores RSI y MACD
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-p6"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /><path d="M12 8v8m-4-4h8" /></svg>,
  // 7. Análisis fundamental I
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-p7"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  // 8. Análisis fundamental II
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-p8"><path d="M3 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m4 0v-6a2 2 0 012-2h2a2 2 0 012 2v6" /></svg>,
  // 9. Gestión de riesgo
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-p9"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  // 10. Plan general trading
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-p10"><path d="M9 11l3 3L22 4M2 20h20M2 16h20M2 12h7" /></svg>,
];

const descriptions = [
  'Aprende los conceptos básicos del trading y cómo funciona el mercado financiero.',
  'Descubre los fundamentos del análisis técnico y su importancia en el trading.',
  'Identifica y utiliza los patrones de velas japonesas para anticipar movimientos.',
  'Aplica Fibonacci y medias móviles para encontrar zonas clave de soporte y resistencia.',
  'Comprende los indicadores Estocástico y Bollinger para mejorar tus entradas y salidas.',
  'Domina los indicadores RSI y MACD para analizar la fuerza y tendencia del mercado.',
  'Iníciate en el análisis fundamental: noticias, economía y su impacto en los precios.',
  'Profundiza en el análisis fundamental con casos prácticos y ejemplos reales.',
  'Gestiona el riesgo de tus operaciones y protege tu capital como un profesional.'
];

export default function ModuloCarrouselPractico({ modules }: ModuloCarrouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => setIsDragging(false);

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-6 text-center">Módulos Prácticos de Trading</h2>
      <div
        ref={carouselRef}
        className="overflow-x-auto px-1 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        <div className="flex gap-4 p-2">
          {modules.map((mod, idx) => {
            const isLocked = idx > 4;
            const isControlPoint = (idx + 1) % 2 === 0;
            return (
              <div
                key={idx}
                className={`flex-none w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] xl:w-[calc(25%-12px)] p-0 relative`}
              >
                {/* Control Point Badge */}
                {isControlPoint && idx > 0 && (
                  <div className="absolute -top-4 -right-4 z-10">
                    <ControlPointBadge className="w-40" />
                  </div>
                )}
                <div
                  className={`p-6 rounded-2xl shadow-md h-[260px] bg-[#18181b] flex flex-col text-center group border border-[#232323] transition-all duration-300 relative ${
                    isLocked ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-xl hover:scale-[1.02] cursor-default'
                  }`}
                  style={{height:'100%', minHeight:'260px', display:'flex', flexDirection:'column', justifyContent:'space-between'}}
                >
                  {/* Ícono grande y número */}
                  <div className="flex flex-col items-center justify-center gap-1 mb-2">
                    <span className="text-[#ec4d58] group-hover:text-[#d63d47] transition-colors" style={{fontSize:'2.5rem', display:'flex', alignItems:'center', justifyContent:'center'}}>
                      {icons[idx]}
                    </span>
                    <span className="text-xs text-[#ec4d58] font-semibold mt-1">{idx + 1}</span>
                  </div>
                  {/* Candado si está bloqueado */}
                  {isLocked && (
                    <div className="absolute top-3 left-3 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                  )}
                  {/* Contenido */}
                  <div className="flex-1 flex flex-col justify-start">
                    <h3 className="font-semibold mb-2 text-base leading-tight flex items-center gap-2 justify-center">
                      <span className="text-gray-100 dark:text-gray-200">{mod.title}</span>
                    </h3>
                    <p className="text-xs text-gray-400 leading-tight px-1 mt-1" style={{maxHeight:'3.6em', overflow:'hidden'}}>
                      {mod.description || descriptions[idx]}
                    </p>
                  </div>
                  <div className="w-full flex items-end justify-center mt-4" style={{marginTop:'auto'}}>
                    {!isLocked ? (
                      <Link
                        href={`/dashboard/iniciado/${mod.path}`}
                        className="text-xs text-[#ec4d58] font-semibold group-hover:text-[#d63d47] transition-colors px-4 py-2 rounded bg-[#232323] hover:bg-[#ec4d58]/10 focus:outline-none focus:ring-2 focus:ring-[#ec4d58] focus:ring-offset-2 border border-[#ec4d58]/30"
                        style={{minWidth:'90px'}}>
                        Explorar
                      </Link>
                    ) : (
                      <button
                        className="text-xs text-gray-400 font-medium px-4 py-2 rounded bg-gray-700/20 cursor-not-allowed border border-gray-700/40"
                        disabled
                        title="Completa los módulos anteriores para desbloquear"
                        style={{minWidth:'90px'}}>
                        Bloqueado
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Desliza horizontalmente para ver todos los módulos
      </div>
    </div>
  );
} 