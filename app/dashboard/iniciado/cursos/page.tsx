'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Target, 
  Users, 
  Building2, 
  TrendingUp, 
  CheckCircle, 
  Play, 
  ArrowRight, 
  ArrowLeft,
  Lock,
  Brain,
  Network,
  Shield,
  BarChart3
} from 'lucide-react';
import Sidebar from '@/components/sidebar/Sidebar';
import { useSidebar } from '@/components/sidebar/SidebarContext';
import { useProgress } from '@/context/ProgressContext';
import ModuleCard from '../components/ModuleCard';

// Estilos CSS personalizados para line-clamp
const lineClampStyles = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

interface Module {
  id: string;
  title: string;
  path: string;
  icon: React.JSX.Element;
  description: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  level: 'nivel1' | 'nivel2';
  requiredCheckpoint?: string; // ID del punto de control requerido
}

// Módulos teóricos de trading (basados en ModuloCarrousel.tsx)
const theoreticalModules: Module[] = [
  {
    id: 'T1',
    title: 'Introducción a la Lógica Económica',
    path: '/dashboard/iniciado/Teorico/1-introduccion-logica-economica',
    icon: <BookOpen />,
    description: 'Comprende los principios básicos de la economía y cómo pensamos los humanos en términos de recursos escasos.',
    level: 'nivel1'
  },
  {
    id: 'T2',
    title: 'Fuerzas del Mercado',
    path: '/dashboard/iniciado/Teorico/2-fuerzas-del-mercado',
    icon: <TrendingUp />,
    description: 'Explora la oferta, la demanda y cómo se forman los precios en los mercados libres.',
    level: 'nivel1'
  },
  {
    id: 'PC1',
    title: 'Punto de Control 1',
    path: '/dashboard/iniciado/Teorico/2-punto-de-control',
    icon: <CheckCircle />,
    description: 'Evaluación: Módulos 1 y 2 - Fundamentos Económicos',
    level: 'nivel1'
  },
  {
    id: 'T3',
    title: 'Acción del Gobierno en los Mercados',
    path: '/dashboard/iniciado/Teorico/3-accion-gobierno-mercados',
    icon: <Users />,
    description: 'Descubre cómo los gobiernos intervienen en los mercados y qué consecuencias generan estas acciones.',
    level: 'nivel1'
  },
  {
    id: 'T4',
    title: 'Competencia Perfecta',
    path: '/dashboard/iniciado/Teorico/4-competencia-perfecta',
    icon: <Target />,
    description: 'Estudia el modelo ideal de competencia perfecta y sus implicancias en la eficiencia económica.',
    level: 'nivel1'
  },
  {
    id: 'PC2',
    title: 'Punto de Control 2',
    path: '/dashboard/iniciado/Teorico/4-punto-de-control',
    icon: <CheckCircle />,
    description: 'Evaluación: Módulos 3 y 4 - Intervención y Competencia',
    level: 'nivel1'
  },
  {
    id: 'T5',
    title: 'Monopolio y Oligopolio',
    path: '/dashboard/iniciado/Teorico/5-monopolio-oligopolio',
    icon: <Shield />,
    description: 'Conoce los mercados dominados por pocos actores y cómo impactan en la economía global.',
    level: 'nivel2',
    requiredCheckpoint: 'PC2'
  },
  {
    id: 'T6',
    title: 'Tecnología Blockchain',
    path: '/dashboard/iniciado/Teorico/6-tecnologia-blockchain',
    icon: <Building2 />,
    description: 'Entiende qué es la blockchain, cómo funciona y por qué es una tecnología revolucionaria.',
    level: 'nivel2',
    requiredCheckpoint: 'PC2'
  },
  {
    id: 'PC3',
    title: 'Punto de Control 3',
    path: '/dashboard/iniciado/puntos-de-control/teorico/pc3',
    icon: <CheckCircle />,
    description: 'Evaluación: Módulos 5 y 6 - Estructuras de Mercado y Blockchain',
    level: 'nivel2',
    requiredCheckpoint: 'PC2'
  },
  {
    id: 'T7',
    title: 'Criptomonedas',
    path: '/dashboard/iniciado/Teorico/7-criptomonedas',
    icon: <BarChart3 />,
    description: 'Explora el mundo de las criptomonedas, su funcionamiento y su impacto en la economía moderna.',
    level: 'nivel2',
    requiredCheckpoint: 'PC2'
  },
  {
    id: 'T8',
    title: 'Operaciones con Criptomonedas',
    path: '/dashboard/iniciado/Teorico/8-operaciones-criptomonedas',
    icon: <TrendingUp />,
    description: 'Aprende las técnicas y estrategias para operar eficazmente en el mercado de criptomonedas.',
    level: 'nivel2',
    requiredCheckpoint: 'PC2'
  },
  {
    id: 'PC4',
    title: 'Punto de Control 4',
    path: '/dashboard/iniciado/puntos-de-control/teorico/pc4',
    icon: <CheckCircle />,
    description: 'Evaluación: Módulos 7 y 8 - Criptomonedas y Operaciones',
    level: 'nivel2',
    requiredCheckpoint: 'PC2'
  }
];

// Módulos prácticos de trading
const practicalModules: Module[] = [
  {
    id: 'P1',
    title: 'Introducción al Trading',
    path: '/dashboard/iniciado/Practico/1-introduccion-trading',
    icon: <Play />,
    description: 'Fundamentos del trading y mentalidad correcta para operar en mercados financieros.',
    level: 'nivel1'
  },
  {
    id: 'P2',
    title: 'Introducción al Análisis Técnico',
    path: '/dashboard/iniciado/Practico/2-introduccion-analisis-tecnico',
    icon: <TrendingUp />,
    description: 'Herramientas básicas del análisis técnico y su aplicación en el trading.',
    level: 'nivel1'
  },
  {
    id: 'PC1',
    title: 'Punto de Control 1',
    path: '/dashboard/iniciado/puntos-de-control/practico/pc1',
    icon: <CheckCircle />,
    description: 'Evaluación: Módulos 1 y 2 - Fundamentos del Trading',
    level: 'nivel1'
  },
  {
    id: 'P3',
    title: 'Patrones de Vela',
    path: '/dashboard/iniciado/Practico/3-patrones-vela',
    icon: <BookOpen />,
    description: 'Patrones de velas japonesas y su interpretación para identificar oportunidades.',
    level: 'nivel1'
  },
  {
    id: 'P4',
    title: 'Fibonacci y Medias Móviles',
    path: '/dashboard/iniciado/Practico/4-fibonacci-medias',
    icon: <Target />,
    description: 'Niveles de Fibonacci y medias móviles como herramientas de análisis técnico.',
    level: 'nivel1'
  },
  {
    id: 'PC2',
    title: 'Punto de Control 2',
    path: '/dashboard/iniciado/puntos-de-control/practico/pc2',
    icon: <CheckCircle />,
    description: 'Evaluación: Módulos 3 y 4 - Análisis Técnico Avanzado',
    level: 'nivel1'
  },
  {
    id: 'P5',
    title: 'Estocástico y Bandas de Bollinger',
    path: '/dashboard/iniciado/Practico/5-estocastico-bollinger',
    icon: <BarChart3 />,
    description: 'Indicadores de sobrecompra y sobreventa para identificar puntos de entrada y salida.',
    level: 'nivel1'
  },
  {
    id: 'P6',
    title: 'Indicadores RSI y MACD',
    path: '/dashboard/iniciado/Practico/6-indicadores-rsi-macd',
    icon: <Brain />,
    description: 'Osciladores y confirmación de señales para mejorar la precisión del trading.',
    level: 'nivel2',
    requiredCheckpoint: 'PC2'
  },
  {
    id: 'PC3',
    title: 'Punto de Control 3',
    path: '/dashboard/iniciado/puntos-de-control/practico/pc3',
    icon: <CheckCircle />,
    description: 'Evaluación: Módulos 5 y 6 - Indicadores Técnicos',
    level: 'nivel2',
    requiredCheckpoint: 'PC2'
  },
  {
    id: 'P7',
    title: 'Análisis Fundamental',
    path: '/dashboard/iniciado/Practico/7-analisis-fundamental',
    icon: <Brain />,
    description: 'Análisis fundamental y factores que mueven el mercado más allá de los gráficos.',
    level: 'nivel2',
    requiredCheckpoint: 'PC2'
  },
  {
    id: 'P8',
    title: 'Correlaciones entre Mercados',
    path: '/dashboard/iniciado/Practico/8-correlaciones-mercados',
    icon: <Network />,
    description: 'Relaciones entre diferentes mercados financieros y cómo aprovecharlas.',
    level: 'nivel2',
    requiredCheckpoint: 'PC2'
  },
  {
    id: 'PC4',
    title: 'Punto de Control 4',
    path: '/dashboard/iniciado/puntos-de-control/practico/pc4',
    icon: <CheckCircle />,
    description: 'Evaluación: Módulos 7 y 8 - Análisis Fundamental y Correlaciones',
    level: 'nivel2',
    requiredCheckpoint: 'PC2'
  },
  {
    id: 'P9',
    title: 'Gestión de Riesgo',
    path: '/dashboard/iniciado/Practico/9-gestion-riesgo',
    icon: <Shield />,
    description: 'Estrategias de gestión de riesgo y protección de capital en operaciones.',
    level: 'nivel2',
    requiredCheckpoint: 'PC2'
  },
  {
    id: 'P10',
    title: 'Plan de Trading',
    path: '/dashboard/iniciado/Practico/10-plan-trading',
    icon: <BarChart3 />,
    description: 'Desarrollo de un plan de trading personalizado y sistemático.',
    level: 'nivel2',
    requiredCheckpoint: 'PC2'
  },
  {
    id: 'PC5',
    title: 'Punto de Control 5',
    path: '/dashboard/iniciado/puntos-de-control/practico/pc5',
    icon: <CheckCircle />,
    description: 'Evaluación: Módulos 9 y 10 - Gestión de Riesgo y Plan de Trading',
    level: 'nivel2',
    requiredCheckpoint: 'PC2'
  }
];

export default function CursosPage() {
  const [activeTab, setActiveTab] = useState<'theoretical' | 'practical'>('theoretical');
  const { isExpanded } = useSidebar();
  const { completedCheckpoints, isCheckpointCompleted } = useProgress();

  // Función para verificar si un módulo está bloqueado
  const isModuleLocked = (module: Module): boolean => {
    // Los módulos de nivel 1 nunca están bloqueados
    if (module.level === 'nivel1') return false;
    
    // Si no tiene checkpoint requerido, no está bloqueado
    if (!module.requiredCheckpoint) return false;
    
    // Verificar si el checkpoint requerido está completado
    return !isCheckpointCompleted(module.requiredCheckpoint);
  };

  // Función para obtener el mensaje de bloqueo
  const getLockMessage = (module: Module): string => {
    if (!module.requiredCheckpoint) return '';
    
    const requiredCheckpoint = [...theoreticalModules, ...practicalModules]
      .find(m => m.id === module.requiredCheckpoint);
    
    if (requiredCheckpoint) {
      return `Completa "${requiredCheckpoint.title}" para desbloquear`;
    }
    
    return 'Completa el punto de control anterior para desbloquear';
  };

  const renderModuleCard = (module: Module) => {
    const isControlPoint = module.id.startsWith('PC');
    const isLocked = isModuleLocked(module);
    const isCompleted = module.isCompleted || isCheckpointCompleted(module.id);
    const lockMessage = getLockMessage(module);

    return (
      <ModuleCard
        key={module.id}
        module={module}
        isControlPoint={isControlPoint}
        isLocked={isLocked}
        isCompleted={isCompleted}
        lockMessage={lockMessage}
      />
    );
  };

  const currentModules = activeTab === 'theoretical' ? theoreticalModules : practicalModules;
  const nivel1Modules = currentModules.filter(m => m.level === 'nivel1');
  const nivel2Modules = currentModules.filter(m => m.level === 'nivel2');

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f]">
      {/* Estilos CSS personalizados */}
      <style jsx>{lineClampStyles}</style>
      
      {/* Sidebar - SOLO en desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Main Content - MUCHO MÁS CERCA DE LA SIDEBAR */}
      <div 
        className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
          isExpanded ? 'md:ml-20' : 'md:ml-16'
        }`}
      >
        <div className="container mx-auto px-4 py-6 pb-20 md:pb-8">
          {/* Header */}
          <div className="mb-6">
            <Link 
              href="/dashboard/iniciado" 
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-3 group"
            >
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:translate-x-[-2px] transition-transform" />
              Volver al Dashboard
            </Link>
            
            <h1 className="text-3xl font-light text-white tracking-wider mb-3">
              Explora la Academia
            </h1>
            
            <p className="text-gray-400 max-w-4xl leading-relaxed text-base">
              Explora todo el contenido disponible en nuestro programa integral de formación en trading y economía. 
              Navega por los módulos teóricos para construir una base sólida de conocimientos, o sumérgete en el contenido 
              práctico para desarrollar habilidades operativas reales. Cada módulo está diseñado para tu progreso continuo.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setActiveTab('theoretical')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center ${
                activeTab === 'theoretical'
                  ? 'bg-[#ec4d58] text-white shadow-lg shadow-[#ec4d58]/25'
                  : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a]'
              }`}
            >
              <BookOpen className="mr-2 w-4 h-4" />
              <span className="font-medium text-sm">Contenido Teórico</span>
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center ${
                activeTab === 'practical'
                  ? 'bg-[#ec4d58] text-white shadow-lg shadow-[#ec4d58]/25'
                  : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a]'
              }`}
            >
              <TrendingUp className="mr-2 w-4 h-4" />
              <span className="font-medium text-sm">Contenido Práctico</span>
            </button>
          </div>

          {/* Content Sections */}
          <div className="space-y-6">
            {/* Nivel 1 Section */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold mr-2">1</span>
                Nivel 1 - Fundamentos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {nivel1Modules.map(renderModuleCard)}
              </div>
            </div>

            {/* Nivel 2 Section */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-6 h-6 bg-[#FFD447] text-black rounded-full flex items-center justify-center text-xs font-bold mr-2">2</span>
                Nivel 2 - Avanzado
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {nivel2Modules.map(renderModuleCard)}
              </div>
            </div>
          </div>

          {/* Content Summary */}
          <div className="mt-8 p-6 bg-[#1a1a1a] border border-[#232323] rounded-2xl">
            <h3 className="text-xl font-semibold text-white mb-4">
              Resumen del {activeTab === 'theoretical' ? 'Contenido Teórico' : 'Contenido Práctico'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-[#2a2a2a] rounded-xl">
                <div className="text-xl font-bold text-yellow-400 mb-1">
                  {nivel1Modules.length}
                </div>
                <span className="text-gray-300 font-medium text-xs">Módulos Nivel 1</span>
              </div>
              <div className="text-center p-3 bg-[#2a2a2a] rounded-xl">
                <div className="text-xl font-bold text-purple-400 mb-1">
                  {nivel2Modules.length}
                </div>
                <span className="text-gray-300 font-medium text-xs">Módulos Nivel 2</span>
              </div>
              <div className="text-center p-3 bg-[#2a2a2a] rounded-xl">
                <div className="text-xl font-bold text-[#FFD447] mb-1">
                  {currentModules.filter(m => m.id.startsWith('PC')).length}
                </div>
                <span className="text-gray-300 font-medium text-xs">Puntos de Control</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 