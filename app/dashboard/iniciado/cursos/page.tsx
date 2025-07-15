import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';

const icons = [
  // ... mismos SVGs que en el carrousel ...
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-1"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-2"><path d="M3 17l6-6 4 4 8-8" /><path d="M21 7l-5 5-4-4-6 6" /></svg>,
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-3"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-4"><path d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10l1.68 9.39a2 2 0 01-1.98 2.61H8.3a2 2 0 01-1.98-2.61L7 4z" /><path d="M9 9v6m6-6v6" /></svg>,
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-5"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-6"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-7"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-8"><path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>,
];

const modulosTeoricos = [
  { title: 'Introducción y lógica económica', path: 'Teorico/1-introduccion-logica-economica' },
  { title: 'Fuerzas del mercado', path: 'Teorico/2-fuerzas-del-mercado' },
  { title: 'Acción del gobierno en los mercados', path: 'Teorico/3-accion-gobierno-mercados' },
  { title: 'Competencia perfecta', path: 'Teorico/4-competencia-perfecta' },
  { title: 'Monopolio y oligopolio', path: 'Teorico/5-monopolio-oligopolio' },
  { title: 'Tecnología Blockchain', path: 'Teorico/6-tecnologia-blockchain' },
  { title: 'Criptomonedas', path: 'Teorico/7-criptomonedas' },
  { title: 'Operaciones con criptomonedas', path: 'Teorico/8-operaciones-criptomonedas' },
];

const modulosPracticos = [
  { title: 'Introducción al Trading', path: 'Practico/1-introduccion-trading' },
  { title: 'Introducción al Análisis Técnico', path: 'Practico/2-introduccion-analisis-tecnico' },
  { title: 'Patrones de vela', path: 'Practico/3-patrones-vela' },
  { title: 'Fibonacci y medias móviles', path: 'Practico/4-fibonacci-medias' },
  { title: 'Estocástico y Bollinger', path: 'Practico/5-estocastico-bollinger' },
  { title: 'Indicadores RSI y MACD', path: 'Practico/6-indicadores-rsi-macd' },
  { title: 'Análisis fundamental I', path: 'Practico/7-analisis-fundamental' },
  { title: 'Análisis fundamental II', path: 'Practico/8-analisis-fundamental-2' },
  { title: 'Gestión de riesgo', path: 'Practico/9-gestion-riesgo' },
  { title: 'Plan general trading', path: 'Practico/10-plan-general-trading' },
];

const iconsPractico = [
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
  // 8. Análisis fundamental II (nuevo icono: gráfico de barras)
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-p8"><path d="M3 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m4 0v-6a2 2 0 012-2h2a2 2 0 012 2v6" /></svg>,
  // 9. Gestión de riesgo
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-p9"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  // 10. Plan general trading (nuevo icono: lista de verificación)
  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" key="icon-p10"><path d="M9 11l3 3L22 4M2 20h20M2 16h20M2 12h7" /></svg>,
];

export default function CursosPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-[rgb(var(--foreground))] flex flex-col items-center py-10 px-2">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 pt-12 relative w-full max-w-6xl bg-[#121212]">
        {/* Botón Volver en la esquina superior izquierda */}
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center">Cursos</h1>
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Card Teórico */}
          <div className="flex-1 bg-[#121212] rounded-2xl shadow-lg p-4 sm:p-8 border border-[#232323]">
            <h2 className="flex items-center text-2xl font-bold text-[#ec4d58] mb-4 gap-2">
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              Curso Teórico
            </h2>
            <ul className="space-y-3">
              {modulosTeoricos.map((mod, idx) => {
                const isLocked = idx > 3;
                return (
                  <li key={mod.path} className="w-full">
                    {!isLocked ? (
                      <Link
                        href={`/dashboard/iniciado/${mod.path}`}
                        className="flex items-center gap-3 sm:gap-4 px-3 sm:px-6 py-3 rounded-lg bg-[#181818] hover:bg-[#232323] transition-all duration-200 text-base font-medium text-white border border-[#232323] hover:border-[#ec4d58] w-full max-w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ec4d58] focus:ring-offset-2 active:scale-[0.98] hover:scale-[1.03]"
                        style={{minWidth: 0}}
                      >
                        <span className="text-[#ec4d58] font-bold" style={{minWidth: 22, textAlign: 'right'}}>{idx + 1}</span>
                        <span className="text-[#ec4d58]">{icons[idx]}</span>
                        <span className="break-words whitespace-normal text-left flex-1">{mod.title}</span>
                      </Link>
                    ) : (
                      <div
                        className="flex items-center gap-3 sm:gap-4 px-3 sm:px-6 py-3 rounded-lg bg-[#181818] border border-[#232323] opacity-60 cursor-not-allowed w-full max-w-full select-none relative"
                        style={{minWidth: 0}}
                        title="Completa los módulos anteriores para desbloquear"
                      >
                        <span className="text-[#ec4d58] font-bold" style={{minWidth: 22, textAlign: 'right'}}>{idx + 1}</span>
                        <span className="text-[#ec4d58]">{icons[idx]}</span>
                        <span className="break-words whitespace-normal text-left flex-1">{mod.title}</span>
                        <span className="absolute right-4 text-gray-400 hidden sm:inline">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Card Práctico */}
          <div className="flex-1 bg-[#121212] rounded-2xl shadow-lg p-4 sm:p-8 border border-[#232323]">
            <h2 className="flex items-center text-2xl font-bold text-[#ec4d58] mb-4 gap-2">
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              Curso Práctico
            </h2>
            <ul className="space-y-3">
              {modulosPracticos.map((mod, idx) => {
                const isLocked = idx > 4;
                return (
                  <li key={mod.title} className="w-full">
                    {!isLocked ? (
                      <Link
                        href={`/dashboard/iniciado/${mod.path}`}
                        className="flex items-center gap-3 sm:gap-4 px-3 sm:px-6 py-3 rounded-lg bg-[#181818] hover:bg-[#232323] transition-all duration-200 text-base font-medium text-white border border-[#232323] hover:border-[#ec4d58] w-full max-w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ec4d58] focus:ring-offset-2 active:scale-[0.98] hover:scale-[1.03]"
                        style={{minWidth: 0}}
                      >
                        <span className="text-[#ec4d58] font-bold" style={{minWidth: 22, textAlign: 'right'}}>{idx + 1}</span>
                        <span className="text-[#ec4d58]">{iconsPractico[idx]}</span>
                        <span className="break-words whitespace-normal text-left flex-1">{mod.title}</span>
                      </Link>
                    ) : (
                      <div
                        className="flex items-center gap-3 sm:gap-4 px-3 sm:px-6 py-3 rounded-lg bg-[#181818] border border-[#232323] opacity-60 cursor-not-allowed w-full max-w-full select-none relative"
                        style={{minWidth: 0}}
                        title="Completa los módulos anteriores para desbloquear"
                      >
                        <span className="text-[#ec4d58] font-bold" style={{minWidth: 22, textAlign: 'right'}}>{idx + 1}</span>
                        <span className="text-[#ec4d58]">{iconsPractico[idx]}</span>
                        <span className="break-words whitespace-normal text-left flex-1">{mod.title}</span>
                        <span className="absolute right-4 text-gray-400 hidden sm:inline">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* Carrousels debajo de las cards */}
        <div className="mt-12 flex flex-col gap-8">
          {/* Eliminar renderizado de <ModuloCarrousel ... /> y <ModuloCarrouselPractico ... /> */}
        </div>
        <div className="w-full flex justify-center mt-8"><BackButton /></div>
      </div>
    </div>
  );
} 