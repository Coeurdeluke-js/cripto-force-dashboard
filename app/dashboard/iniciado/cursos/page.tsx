'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, TrendingUp, ArrowLeft, Play, CheckCircle, Lock, ExternalLink, BarChart3, DollarSign, Target, Users, Shield } from 'lucide-react';
import Sidebar from '@/components/sidebar/Sidebar';

interface Module {
  id: string;
  title: string;
  path: string;
  icon: React.JSX.Element;
  description: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  level: 'nivel1' | 'nivel2';
}

// Módulos teóricos de trading
const theoreticalModules: Module[] = [
  {
    id: 'T1',
    title: 'Fundamentos del Mercado Financiero',
    path: '/dashboard/iniciado/modulos/teorico/t1',
    icon: <BarChart3 />,
    description: 'Introducción a los mercados financieros, tipos de activos y funcionamiento básico',
    level: 'nivel1'
  },
  {
    id: 'T2',
    title: 'Análisis Técnico Básico',
    path: '/dashboard/iniciado/modulos/teorico/t2',
    icon: <TrendingUp />,
    description: 'Patrones de velas, soportes, resistencias y tendencias fundamentales',
    level: 'nivel1'
  },
  {
    id: 'PC1',
    title: 'Evaluación: Mercados y Análisis Técnico',
    path: '/dashboard/iniciado/puntos-de-control/teorico/pc1',
    icon: <CheckCircle />,
    description: 'Punto de control: Evalúa los módulos "Fundamentos del Mercado" y "Análisis Técnico Básico"',
    level: 'nivel1'
  },
  {
    id: 'T3',
    title: 'Gestión de Riesgo',
    path: '/dashboard/iniciado/modulos/teorico/t3',
    icon: <Shield />,
    description: 'Principios de gestión de capital, stop loss y position sizing',
    level: 'nivel1'
  },
  {
    id: 'T4',
    title: 'Psicología del Trading',
    path: '/dashboard/iniciado/modulos/teorico/t4',
    icon: <Users />,
    description: 'Control emocional, disciplina y mentalidad del trader exitoso',
    level: 'nivel1'
  },
  {
    id: 'PC2',
    title: 'Evaluación: Gestión de Riesgo y Psicología',
    path: '/dashboard/iniciado/puntos-de-control/teorico/pc2',
    icon: <CheckCircle />,
    description: 'Punto de control: Evalúa los módulos "Gestión de Riesgo" y "Psicología del Trading"',
    level: 'nivel1'
  },
  {
    id: 'T5',
    title: 'Análisis Fundamental',
    path: '/dashboard/iniciado/modulos/teorico/t5',
    icon: <DollarSign />,
    description: 'Análisis de estados financieros, indicadores económicos y valoración',
    level: 'nivel2'
  },
  {
    id: 'T6',
    title: 'Estrategias Avanzadas',
    path: '/dashboard/iniciado/modulos/teorico/t6',
    icon: <Target />,
    description: 'Estrategias de swing trading, scalping y trading algorítmico',
    level: 'nivel2'
  },
  {
    id: 'PC3',
    title: 'Evaluación: Análisis Fundamental y Estrategias',
    path: '/dashboard/iniciado/puntos-de-control/teorico/pc3',
    icon: <CheckCircle />,
    description: 'Punto de control: Evalúa los módulos "Análisis Fundamental" y "Estrategias Avanzadas"',
    level: 'nivel2'
  },
  {
    id: 'T7',
    title: 'Mercados Específicos',
    path: '/dashboard/iniciado/modulos/teorico/t7',
    icon: <BarChart3 />,
    description: 'Especialización en forex, criptomonedas, commodities y acciones',
    level: 'nivel2'
  },
  {
    id: 'T8',
    title: 'Tendencias y Futuro del Trading',
    path: '/dashboard/iniciado/modulos/teorico/t8',
    icon: <TrendingUp />,
    description: 'Nuevas tecnologías, IA en trading y evolución de los mercados',
    level: 'nivel2'
  },
  {
    id: 'PC4',
    title: 'Evaluación: Mercados Específicos y Tendencias',
    path: '/dashboard/iniciado/puntos-de-control/teorico/pc4',
    icon: <CheckCircle />,
    description: 'Punto de control: Evalúa los módulos "Mercados Específicos" y "Tendencias del Trading"',
    level: 'nivel2'
  }
];

// Módulos prácticos de trading
const practicalModules: Module[] = [
  {
    id: 'P1',
    title: 'Configuración de Plataforma',
    path: '/dashboard/iniciado/modulos/practico/p1',
    icon: <BarChart3 />,
    description: 'Configuración de MetaTrader, TradingView y otras plataformas',
    level: 'nivel1'
  },
  {
    id: 'P2',
    title: 'Primeras Operaciones',
    path: '/dashboard/iniciado/modulos/practico/p2',
    icon: <TrendingUp />,
    description: 'Ejecución de órdenes, tipos de órdenes y gestión básica',
    level: 'nivel1'
  },
  {
    id: 'PC1',
    title: 'Evaluación: Plataforma y Primeras Operaciones',
    path: '/dashboard/iniciado/puntos-de-control/practico/pc1',
    icon: <CheckCircle />,
    description: 'Punto de control: Evalúa los módulos "Configuración de Plataforma" y "Primeras Operaciones"',
    level: 'nivel1'
  },
  {
    id: 'P3',
    title: 'Análisis Técnico Práctico',
    path: '/dashboard/iniciado/modulos/practico/p3',
    icon: <Target />,
    description: 'Identificación de patrones, dibujo de líneas y análisis en tiempo real',
    level: 'nivel1'
  },
  {
    id: 'P4',
    title: 'Gestión de Posiciones',
    path: '/dashboard/iniciado/modulos/practico/p4',
    icon: <Shield />,
    description: 'Aplicación práctica de gestión de riesgo y money management',
    level: 'nivel1'
  },
  {
    id: 'PC2',
    title: 'Evaluación: Análisis Técnico y Gestión',
    path: '/dashboard/iniciado/puntos-de-control/practico/pc2',
    icon: <CheckCircle />,
    description: 'Punto de control: Evalúa los módulos "Análisis Técnico Práctico" y "Gestión de Posiciones"',
    level: 'nivel1'
  },
  {
    id: 'P5',
    title: 'Estrategias de Trading',
    path: '/dashboard/iniciado/modulos/practico/p5',
    icon: <TrendingUp />,
    description: 'Implementación de estrategias en diferentes timeframes',
    level: 'nivel2'
  },
  {
    id: 'P6',
    title: 'Análisis de Mercados',
    path: '/dashboard/iniciado/modulos/practico/p6',
    icon: <DollarSign />,
    description: 'Análisis fundamental práctico y correlaciones entre mercados',
    level: 'nivel2'
  },
  {
    id: 'PC3',
    title: 'Evaluación: Estrategias y Análisis',
    path: '/dashboard/iniciado/puntos-de-control/practico/pc3',
    icon: <CheckCircle />,
    description: 'Punto de control: Evalúa los módulos "Estrategias de Trading" y "Análisis de Mercados"',
    level: 'nivel2'
  },
  {
    id: 'P7',
    title: 'Trading Automatizado',
    path: '/dashboard/iniciado/modulos/practico/p7',
    icon: <BarChart3 />,
    description: 'Desarrollo de sistemas de trading automatizado y backtesting',
    level: 'nivel2'
  },
  {
    id: 'P8',
    title: 'Proyecto Final',
    path: '/dashboard/iniciado/modulos/practico/p8',
    icon: <Target />,
    description: 'Desarrollo de un sistema de trading completo y rentable',
    level: 'nivel2'
  },
  {
    id: 'PC4',
    title: 'Evaluación: Trading Automatizado y Proyecto Final',
    path: '/dashboard/iniciado/puntos-de-control/practico/pc4',
    icon: <CheckCircle />,
    description: 'Punto de control: Evalúa los módulos "Trading Automatizado" y "Proyecto Final"',
    level: 'nivel2'
  }
];

export default function CursosPage() {
  const [activeTab, setActiveTab] = useState<'theoretical' | 'practical'>('theoretical');

  const renderModuleCard = (module: Module) => {
    const isControlPoint = module.id.startsWith('PC');
    const isLocked = module.isLocked || false;
    const isCompleted = module.isCompleted || false;

    return (
      <div key={module.id} className="bg-[#1a1a1a] border border-[#232323] rounded-xl p-6 hover:bg-[#2a2a2a] hover:border-[#ec4d58]/30 transition-all duration-300 group">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
            isCompleted ? 'bg-green-500 text-white' : 
            isLocked ? 'bg-[#2a2a2a] text-gray-400' : 
            'bg-[#ec4d58] text-white group-hover:bg-[#d63d47]'
          }`}>
            {isLocked ? <Lock className="w-5 h-5" /> : isCompleted ? <CheckCircle className="w-5 h-5" /> : module.icon}
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full transition-colors ${
            isCompleted ? 'bg-green-500 text-white' : 
            isLocked ? 'bg-[#2a2a2a] text-gray-300' : 
            'bg-[#ec4d58] text-white'
          }`}>
            {module.id}
          </span>
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-white group-hover:text-[#ec4d58] transition-colors">{module.title}</h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{module.description}</p>
        
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full ${
            module.level === 'nivel1' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-purple-500/20 text-purple-400'
          }`}>
            {module.level === 'nivel1' ? 'Nivel 1' : 'Nivel 2'}
          </span>
          
          <Link
            href={isLocked ? '#' : module.path}
            className={`inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
              isLocked ? 'bg-[#2a2a2a] text-gray-400 cursor-not-allowed' : 
              isControlPoint ? 'bg-[#FFD447] hover:bg-[#e6c040] text-black shadow-lg hover:shadow-xl' :
              isCompleted ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl' : 
              'bg-[#ec4d58] hover:bg-[#d63d47] text-white shadow-lg hover:shadow-xl'
            }`}
            onClick={e => isLocked && e.preventDefault()}
          >
            {isLocked ? (
              <>
                <Lock className="mr-2 w-4 h-4" />
                Bloqueado
              </>
            ) : isControlPoint ? (
              <>
                <CheckCircle className="mr-2 w-4 h-4" />
                Tomar autoevaluación
              </>
            ) : isCompleted ? (
              <>
                <CheckCircle className="mr-2 w-4 h-4" />
                Completado
              </>
            ) : (
              <>
                <Play className="mr-2 w-4 h-4" />
                Comenzar
              </>
            )}
            {!isLocked && <ExternalLink className="ml-2 w-3 h-3" />}
          </Link>
        </div>
      </div>
    );
  };

  const currentModules = activeTab === 'theoretical' ? theoreticalModules : practicalModules;
  const nivel1Modules = currentModules.filter(m => m.level === 'nivel1');
  const nivel2Modules = currentModules.filter(m => m.level === 'nivel2');
  const controlPoints = currentModules.filter(m => m.id.startsWith('PC'));

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f]">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/dashboard/iniciado" 
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4 group"
            >
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:translate-x-[-2px] transition-transform" />
              Volver al Dashboard
            </Link>
            
            <h1 className="text-4xl font-light text-white tracking-wider mb-4">
              Catálogo de Cursos
            </h1>
            
            <p className="text-gray-400 max-w-4xl leading-relaxed text-lg">
              Explora todos los módulos disponibles en nuestro programa de formación en trading y economía. 
              Aquí encontrarás tanto el curso teórico, que te proporcionará los fundamentos conceptuales del mercado, 
              como el curso práctico, donde aplicarás tus conocimientos en operaciones reales. 
              Cada módulo está diseñado para construir progresivamente tu comprensión y habilidades como trader.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('theoretical')}
              className={`px-8 py-4 rounded-xl transition-all duration-300 flex items-center ${
                activeTab === 'theoretical'
                  ? 'bg-[#ec4d58] text-white shadow-lg shadow-[#ec4d58]/25'
                  : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a]'
              }`}
            >
              <BookOpen className="mr-3 w-5 h-5" />
              <span className="font-medium">Curso Teórico</span>
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-8 py-4 rounded-xl transition-all duration-300 flex items-center ${
                activeTab === 'practical'
                  ? 'bg-[#ec4d58] text-white shadow-lg shadow-[#ec4d58]/25'
                  : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a]'
              }`}
            >
              <TrendingUp className="mr-3 w-5 h-5" />
              <span className="font-medium">Curso Práctico</span>
            </button>
          </div>

          {/* Course Content */}
          <div className="space-y-8">
            {/* Nivel 1 Section */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-yellow-500/20 text-yellow-400 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                Nivel 1 - Fundamentos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nivel1Modules.map(renderModuleCard)}
              </div>
            </div>

            {/* Nivel 2 Section */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                Nivel 2 - Avanzado
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nivel2Modules.map(renderModuleCard)}
              </div>
            </div>
          </div>

          {/* Course Summary */}
          <div className="mt-12 p-8 bg-[#1a1a1a] border border-[#232323] rounded-2xl">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Resumen del {activeTab === 'theoretical' ? 'Curso Teórico' : 'Curso Práctico'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
              <div className="text-center p-4 bg-[#2a2a2a] rounded-xl">
                <div className="text-2xl font-bold text-[#ec4d58] mb-2">
                  {nivel1Modules.length + nivel2Modules.length}
                </div>
                <span className="text-gray-300 font-medium">Módulos Totales</span>
              </div>
              <div className="text-center p-4 bg-[#2a2a2a] rounded-xl">
                <div className="text-2xl font-bold text-yellow-400 mb-2">
                  {nivel1Modules.length}
                </div>
                <span className="text-gray-300 font-medium">Nivel 1</span>
              </div>
              <div className="text-center p-4 bg-[#2a2a2a] rounded-xl">
                <div className="text-2xl font-bold text-purple-400 mb-2">
                  {nivel2Modules.length}
                </div>
                <span className="text-gray-300 font-medium">Nivel 2</span>
              </div>
              <div className="text-center p-4 bg-[#2a2a2a] rounded-xl">
                <div className="text-2xl font-bold text-[#FFD447] mb-2">
                  {controlPoints.length}
                </div>
                <span className="text-gray-300 font-medium">Puntos de Control</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 