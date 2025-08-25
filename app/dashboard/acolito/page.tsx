'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  BookOpen, 
  TrendingUp, 
  CheckCircle, 
  Cog, 
  Target, 
  Crown, 
  Network, 
  DollarSign, 
  Wrench, 
  Play, 
  Brain, 
  Shield, 
  BarChart3, 
  Lock, 
  Flag, 
  Medal, 
  User, 
  Clock, 
  Trophy, 
  ListChecks, 
  AlertTriangle, 
  Calendar, 
  LogOut, 
  Star,
  Bitcoin,
  Eye,
  Zap,
  Flame
} from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useSafeAuth } from '@/context/AuthContext';

interface Module {
  id: string;
  title: string;
  path: string;
  icon: React.JSX.Element;
  description: string;
  isCompleted?: boolean;
  isLocked: boolean;
  level: 'nivel2' | 'nivel3';
  type: 'content' | 'checkpoint';
  moduleNumber: number;
}

interface Objective {
  id: string;
  title: string;
  type: 'nivel2' | 'nivel3' | 'checkpoints' | 'progress';
  category: 'theoretical' | 'practical' | 'general' | 'all';
  completed: boolean;
}

// Módulos Teóricos del Acólito (Nivel 2)
const theoreticalModulesAcolito: Module[] = [
  {
    id: '1',
    title: 'Análisis Técnico Avanzado',
    path: '/dashboard/acolito/teorico/1-analisis-tecnico-avanzado',
    icon: <BarChart3 />,
    description: 'Técnicas avanzadas de análisis técnico y patrones complejos',
    isLocked: false,
    level: 'nivel2',
    type: 'content',
    moduleNumber: 1
  },
  {
    id: '2',
    title: 'Teoría de Ondas de Elliott',
    path: '/dashboard/acolito/teorico/2-ondas-elliott',
    icon: <TrendingUp />,
    description: 'Principios de las ondas de Elliott y su aplicación práctica',
    isLocked: false,
    level: 'nivel2',
    type: 'content',
    moduleNumber: 2
  },
  {
    id: '3',
    title: 'Análisis de Volumen',
    path: '/dashboard/acolito/teorico/3-analisis-volumen',
    icon: <BarChart3 />,
    description: 'Interpretación del volumen y confirmación de tendencias',
    isLocked: false,
    level: 'nivel2',
    type: 'content',
    moduleNumber: 3
  },
  {
    id: '4',
    title: 'Punto de Control Teórico',
    path: '/dashboard/acolito/teorico/4-punto-control',
    icon: <Target />,
    description: 'Evaluación de conocimientos teóricos del nivel 2',
    isLocked: false,
    level: 'nivel2',
    type: 'checkpoint',
    moduleNumber: 4
  }
];

// Módulos Prácticos del Acólito
const practicalModulesAcolito: Module[] = [
  {
    id: '1',
    title: 'Estrategias de Trading Avanzadas',
    path: '/dashboard/acolito/practico/1-estrategias-avanzadas',
    icon: <Play />,
    description: 'Estrategias complejas y gestión de posiciones',
    isLocked: false,
    level: 'nivel2',
    type: 'content',
    moduleNumber: 1
  },
  {
    id: '2',
    title: 'Análisis de Correlaciones',
    path: '/dashboard/acolito/practico/2-correlaciones',
    icon: <Network />,
    description: 'Análisis de correlaciones entre mercados y activos',
    isLocked: false,
    level: 'nivel2',
    type: 'content',
    moduleNumber: 2
  },
  {
    id: '3',
    title: 'Gestión de Riesgo Avanzada',
    path: '/dashboard/acolito/practico/3-gestion-riesgo',
    icon: <Shield />,
    description: 'Técnicas avanzadas de gestión de riesgo y money management',
    isLocked: false,
    level: 'nivel2',
    type: 'content',
    moduleNumber: 3
  },
  {
    id: '4',
    title: 'Análisis Fundamental Avanzado',
    path: '/dashboard/acolito/practico/4-analisis-fundamental',
    icon: <Brain />,
    description: 'Análisis fundamental profundo y valoración de activos',
    isLocked: false,
    level: 'nivel2',
    type: 'content',
    moduleNumber: 4
  },
  {
    id: '5',
    title: 'Punto de Control Práctico',
    path: '/dashboard/acolito/practico/5-punto-control',
    icon: <Target />,
    description: 'Evaluación práctica del nivel 2',
    isLocked: false,
    level: 'nivel2',
    type: 'checkpoint',
    moduleNumber: 5
  }
];

// Contenido del carrusel para el acólito
const carouselContent = [
  {
    id: 1,
    title: 'Bienvenido al Nivel del Acólito',
    description: 'Has despertado de la sombra interior. Ahora comienza tu verdadero viaje hacia el poder.',
    icon: <Eye className="w-12 h-12 text-[#FFD447]" />,
    color: 'from-[#FFD447]/20 to-[#FFD447]/30',
    borderColor: 'border-[#FFD447]/30'
  },
  {
    id: 2,
    title: 'Iluminación de Verdades Ocultas',
    description: 'Descubre las técnicas avanzadas que solo los acólitos pueden dominar.',
    icon: <Zap className="w-12 h-12 text-[#FFD447]" />,
    color: 'from-[#FFD447]/20 to-[#FFD447]/30',
    borderColor: 'border-[#FFD447]/30'
  },
  {
    id: 3,
    title: 'Curiosidad por el Poder',
    description: 'Tu sed de conocimiento te llevará a niveles que nunca imaginaste alcanzar.',
    icon: <Flame className="w-12 h-12 text-[#FFD447]" />,
    color: 'from-[#FFD447]/20 to-[#FFD447]/30',
    borderColor: 'border-[#FFD447]/30'
  }
];

export default function AcolitoDashboard() {
  const [activeTab, setActiveTab] = useState('theoretical');
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const { progress } = useProgress();
  const { userData } = useSafeAuth();
  const scrollPosition = useScrollPosition();
  const containerRef = useRef<HTMLDivElement>(null);

  // Objetivos específicos del acólito
  const objectives: Objective[] = [
    { id: 'obj1', title: 'Completar Nivel 2 Teórico', type: 'nivel2', category: 'theoretical', completed: false },
    { id: 'obj2', title: 'Completar Nivel 2 Práctico', type: 'nivel2', category: 'practical', completed: false },
    { id: 'obj3', title: 'Superar Puntos de Control', type: 'checkpoints', category: 'general', completed: false },
    { id: 'obj4', title: 'Alcanzar 75% del curso completo', type: 'progress', category: 'general', completed: false },
    { id: 'obj5', title: 'Dominar Análisis Técnico Avanzado', type: 'nivel2', category: 'theoretical', completed: false },
    { id: 'obj6', title: 'Implementar Estrategias Avanzadas', type: 'nivel2', category: 'practical', completed: false }
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const getModulesForTab = () => {
    return activeTab === 'theoretical' ? theoreticalModulesAcolito : practicalModulesAcolito;
  };

  const getTabIcon = () => {
    return activeTab === 'theoretical' ? <BookOpen className="w-5 h-5" /> : <Play className="w-5 h-5" />;
  };

  const getTabColor = () => {
    return activeTab === 'theoretical' ? 'text-[#FFD447]' : 'text-[#FFD447]';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] text-white">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-in-out;
        }
        
        .animate-slide-in-up {
          animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .objectives-grid > div {
          animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          animation-fill-mode: both;
        }
        
        .objectives-grid > div:nth-child(1) { animation-delay: 0.1s; }
        .objectives-grid > div:nth-child(2) { animation-delay: 0.2s; }
        .objectives-grid > div:nth-child(3) { animation-delay: 0.3s; }
        .objectives-grid > div:nth-child(4) { animation-delay: 0.4s; }
        .objectives-grid > div:nth-child(5) { animation-delay: 0.5s; }
        .objectives-grid > div:nth-child(6) { animation-delay: 0.6s; }
      `}</style>
      
      <div className="container mx-auto px-2 sm:px-4 py-4 md:py-8 pb-24 md:pb-8 transition-all duration-300">
        {/* Mensaje de Bienvenida */}
        <div className="w-full max-w-4xl mx-auto mb-6 md:mb-8 text-center px-4 md:px-0">
          <h2 className="text-xl md:text-2xl font-light text-gray-300 tracking-wide">
            Bienvenido al Nivel del Acólito{userData?.nickname ? (
              <>
                <span className="text-[#fafafa]">, </span>
                <span className="text-[#FFD447] font-medium">{userData.nickname}</span>
              </>
            ) : ''}
          </h2>
        </div>

        {/* Carrusel de Bienvenida */}
        <div className="w-full max-w-6xl mx-auto mb-8 px-2 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {carouselContent.map((item, index) => (
              <div
                key={item.id}
                className={`bg-gradient-to-br ${item.color} border ${item.borderColor} rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 animate-slide-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Video introductorio del acólito */}
        <div className="w-full flex justify-center mb-8 px-2 md:px-0">
          <div className="w-full max-w-4xl">
            <div className="bg-gradient-to-r from-[#FFD447]/10 to-[#FFD447]/20 border border-[#FFD447]/20 rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold text-[#FFD447] mb-4">Video de Bienvenida del Acólito</h3>
              <p className="text-gray-300 mb-4">
                Prepárate para descubrir las técnicas avanzadas que solo los acólitos pueden dominar.
              </p>
              <div className="bg-gray-800 rounded-lg p-8 border border-[#FFD447]/20">
                <Eye className="w-16 h-16 text-[#FFD447] mx-auto mb-4" />
                <p className="text-gray-400">Video introductorio del acólito</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación por Pestañas */}
        <div className="flex justify-center mb-8 px-2 md:px-0">
          <div className="bg-[#1a1a1a] border border-[#232323] rounded-2xl p-1 md:p-2 w-full max-w-md">
            <button
              onClick={() => handleTabChange('theoretical')}
              className={`px-3 md:px-6 py-2 md:py-3 rounded-xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 text-sm md:text-base w-1/2 ${
                activeTab === 'theoretical'
                  ? 'bg-[#FFD447] text-gray-900 shadow-lg'
                  : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a]'
              }`}
            >
              <BookOpen className="inline mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Teórico</span>
              <span className="sm:hidden">Teórico</span>
            </button>
            <button
              onClick={() => handleTabChange('practical')}
              className={`px-3 md:px-6 py-2 md:py-3 rounded-xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 text-sm md:text-base w-1/2 ${
                activeTab === 'practical'
                  ? 'bg-[#FFD447] text-gray-900 shadow-lg'
                  : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a]'
              }`}
            >
              <Play className="inline mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Práctico</span>
              <span className="sm:hidden">Práctico</span>
            </button>
          </div>
        </div>

        {/* Módulos del Acólito */}
        <div className="w-full max-w-6xl mx-auto mb-8 px-2 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getModulesForTab().map((module, index) => (
              <div
                key={module.id}
                className={`group relative overflow-hidden rounded-xl border transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  module.isLocked 
                    ? 'border-gray-700 bg-gray-800/50' 
                    : 'border-[#FFD447]/30 bg-[#1a1a1a] hover:border-[#FFD447]/50'
                }`}
                onMouseEnter={() => setHoveredModule(module.id)}
                onMouseLeave={() => setHoveredModule(null)}
                onClick={() => !module.isLocked && (window.location.href = module.path)}
              >
                {/* Fondo con gradiente amarillo */}
                <div 
                  className={`absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20 ${
                    module.isLocked ? 'bg-gray-600' : 'bg-gradient-to-br from-[#FFD447]/20 to-[#FFD447]/30'
                  }`}
                />
                
                {/* Contenido */}
                <div className="relative p-6">
                  {/* Header del módulo */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      module.isLocked ? 'bg-gray-600' : 'bg-[#FFD447]/20'
                    }`}>
                      <div className={`${module.isLocked ? 'text-gray-400' : 'text-[#FFD447]'}`}>
                        {module.icon}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {module.isLocked ? (
                        <Lock className="w-5 h-5 text-gray-500" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-[#FFD447]" />
                      )}
                    </div>
                  </div>

                  {/* Título y descripción */}
                  <h3 className={`text-lg font-semibold mb-2 ${
                    module.isLocked ? 'text-gray-400' : 'text-white'
                  }`}>
                    {module.title}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    module.isLocked ? 'text-gray-500' : 'text-gray-300'
                  }`}>
                    {module.description}
                  </p>

                  {/* Nivel del módulo */}
                  <div className="bg-[#2a2a2a]/50 rounded-lg p-3 border border-[#3a3a3a] mb-4">
                    <p className="text-[#FFD447] text-xs font-medium">
                      Nivel {module.level === 'nivel2' ? '2' : '3'} - {module.type === 'content' ? 'Contenido' : 'Punto de Control'}
                    </p>
                  </div>

                  {/* Botón de acceso */}
                  <button
                    className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
                      module.isLocked
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-[#FFD447]/20 text-[#FFD447] hover:bg-[#FFD447]/30 border border-[#FFD447]/30 hover:border-[#FFD447]/50'
                    }`}
                    disabled={module.isLocked}
                  >
                    {module.isLocked ? 'Bloqueado' : 'Acceder al Módulo'}
                  </button>
                </div>

                {/* Borde de color sutil */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 ${
                    module.isLocked ? 'bg-gray-600' : 'bg-[#FFD447]'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Objetivos del Acólito */}
        <div className="w-full max-w-6xl mx-auto mb-8 px-2 md:px-0">
          <h3 className="text-2xl font-bold text-center mb-6 text-[#FFD447]">
            Objetivos del Acólito
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 objectives-grid">
            {objectives.map((objective, index) => (
              <div
                key={objective.id}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  objective.completed
                    ? 'bg-[#FFD447]/20 border-[#FFD447]/30'
                    : 'bg-[#1a1a1a] border-[#2a2a2a]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    objective.completed ? 'bg-[#FFD447]' : 'bg-gray-600'
                  }`}>
                    {objective.completed ? (
                      <CheckCircle className="w-5 h-5 text-gray-900" />
                    ) : (
                      <Target className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h4 className={`font-medium ${
                      objective.completed ? 'text-[#FFD447]' : 'text-white'
                    }`}>
                      {objective.title}
                    </h4>
                    <p className={`text-sm ${
                      objective.completed ? 'text-[#FFD447]/80' : 'text-gray-400'
                    }`}>
                      {objective.category === 'theoretical' ? 'Teórico' : 
                       objective.category === 'practical' ? 'Práctico' : 
                       objective.category === 'general' ? 'General' : 'Otros'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estadísticas del Acólito */}
        <div className="w-full max-w-6xl mx-auto px-2 md:px-0">
          <h3 className="text-2xl font-bold text-center mb-6 text-[#FFD447]">
            Tu Progreso como Acólito
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1a1a1a] border border-[#FFD447]/30 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-[#FFD447]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-[#FFD447]" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Módulos Teóricos</h4>
              <p className="text-2xl font-bold text-[#FFD447]">4</p>
              <p className="text-gray-400 text-sm">Disponibles para el acólito</p>
            </div>
            
            <div className="bg-[#1a1a1a] border border-[#FFD447]/30 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-[#FFD447]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-[#FFD447]" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Módulos Prácticos</h4>
              <p className="text-2xl font-bold text-[#FFD447]">5</p>
              <p className="text-gray-400 text-sm">Para dominar las técnicas</p>
            </div>
            
            <div className="bg-[#1a1a1a] border border-[#FFD447]/30 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-[#FFD447]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-[#FFD447]" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Puntos de Control</h4>
              <p className="text-2xl font-bold text-[#FFD447]">2</p>
              <p className="text-gray-400 text-sm">Para evaluar tu progreso</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}