'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
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
  // Módulo 1: Introducción y lógica económica - Libro/Educación
  <svg className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-1">
    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>,
  // Módulo 2: Fuerzas del mercado - Gráfico de tendencias
  <svg className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-2">
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M21 7l-5 5-4-4-6 6" />
  </svg>,
  // Módulo 3: Acción del gobierno - Edificio gubernamental
  <svg className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-3">
    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
  // Módulo 4: Competencia perfecta - Balanza/Equilibrio
  <svg className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-4">
    <path d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10l1.68 9.39a2 2 0 01-1.98 2.61H8.3a2 2 0 01-1.98-2.61L7 4z" />
    <path d="M9 9v6m6-6v6" />
  </svg>,
  // Módulo 5: Monopolio y oligopolio - Candado/Control
  <svg className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-5">
    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>,
  // Módulo 6: Tecnología Blockchain - Cadena de bloques
  <svg className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-6">
    <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>,
  // Módulo 7: Criptomonedas - Moneda digital
  <svg className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-7">
    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Módulo 8: Operaciones con criptomonedas - Intercambio/Trading
  <svg className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-8">
    <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
  </svg>,
];

export default function ModuloCarrousel({ modules }: ModuloCarrouselProps) {
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

  // Actualizar descripciones para terminar con punto y ser coherentes
  const descriptions = [
    'Comprende los principios básicos de la economía y cómo pensamos los humanos en términos de recursos escasos.',
    'Explora la oferta, la demanda y cómo se forman los precios en los mercados libres.',
    'Descubre cómo los gobiernos intervienen en los mercados y qué consecuencias generan estas acciones.',
    'Estudia el modelo ideal de competencia perfecta y sus implicancias en la eficiencia económica.',
    'Conoce los mercados dominados por pocos actores y cómo impactan en la economía global.',
    'Entiende qué es la blockchain, cómo funciona y por qué es una tecnología revolucionaria.',
    'Adéntrate en el mundo de las criptomonedas: historia, tipos, funciones y casos de uso.',
    'Aprende cómo operar con criptomonedas en exchanges y billeteras de forma segura y rentable.'
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-6 text-center">Módulos Teórico de Trading</h2>
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
            const isLocked = idx > 3;
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
                    {/* Descripción: sin elipsis, solo corte abrupto si es necesario */}
                    <p className="text-xs text-gray-400 leading-tight px-1 mt-1" style={{maxHeight:'3.6em', overflow:'hidden'}}>
                      {mod.description || descriptions[idx]}
                    </p>
                  </div>
                  {/* Call to action alineado perfectamente abajo */}
                  <div className="w-full flex items-end justify-center mt-4" style={{marginTop:'auto'}}>
                    {!isLocked ? (
                      <Link
                        href={`/dashboard/iniciado/${mod.path}`}
                        className="text-xs text-[#ec4d58] font-semibold group-hover:text-[#d63d47] transition-colors px-4 py-2 rounded bg-[#232323] hover:bg-[#ec4d58]/10 focus:outline-none focus:ring-2 focus:ring-[#ec4d58] focus:ring-offset-2 border border-[#ec4d58]/30"
                        style={{minWidth:'90px'}}
                      >
                        Explorar
                      </Link>
                    ) : (
                      <button
                        className="text-xs text-gray-400 font-medium px-4 py-2 rounded bg-gray-700/20 cursor-not-allowed border border-gray-700/40"
                        disabled
                        title="Completa los módulos anteriores para desbloquear"
                        style={{minWidth:'90px'}}
                      >
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
