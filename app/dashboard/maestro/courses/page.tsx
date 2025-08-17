'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus,
  Target,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  FileText,
  Video,
  Play,
  Award,
  TrendingUp,
  Crown,
  Shield,
  Sword,
  Star,
  Zap
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  type: 'theoretical' | 'practical';
  description: string;
  duration: string;
  checkpoints: number;
  status: 'active' | 'draft' | 'archived';
  icon: React.ComponentType<{ className?: string }>;
  level: string;
}

interface Level {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  modules: Module[];
  isUnlocked: boolean;
}

const levels: Level[] = [
  {
    id: 'iniciados',
    name: 'Iniciados',
    description: 'Fundamentos básicos de economía y trading',
    icon: Users,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    isUnlocked: true,
    modules: []
  },
  {
    id: 'acolitos',
    name: 'Acólitos',
    description: 'Conceptos intermedios y análisis técnico',
    icon: Shield,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    isUnlocked: true,
    modules: []
  },
  {
    id: 'warriors',
    name: 'Warriors',
    description: 'Estrategias avanzadas y gestión de riesgo',
    icon: Sword,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    isUnlocked: false,
    modules: []
  },
  {
    id: 'lord',
    name: 'Lord',
    description: 'Mastery en análisis fundamental',
    icon: Crown,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    isUnlocked: false,
    modules: []
  },
  {
    id: 'darth',
    name: 'Darth',
    description: 'Nivel máximo: Trading institucional',
    icon: Zap,
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    isUnlocked: false,
    modules: []
  }
];

// Módulos de Iniciados (8 teóricos + 11 prácticos + 10 puntos de control)
const iniciadosModules: Module[] = [
  // Módulos Teóricos (8)
  {
    id: 't1',
    title: 'Introducción a la Lógica Económica',
    type: 'theoretical',
    description: 'Fundamentos de la economía y lógica de mercado',
    duration: '45 min',
    checkpoints: 1,
    status: 'active',
    icon: BookOpen,
    level: 'iniciados'
  },
  {
    id: 't2',
    title: 'Fuerzas del Mercado',
    type: 'theoretical',
    description: 'Oferta, demanda y equilibrio de mercado',
    duration: '40 min',
    checkpoints: 1,
    status: 'active',
    icon: FileText,
    level: 'iniciados'
  },
  {
    id: 't3',
    title: 'Acción del Gobierno en los Mercados',
    type: 'theoretical',
    description: 'Intervención gubernamental y regulaciones',
    duration: '35 min',
    checkpoints: 0,
    status: 'active',
    icon: BarChart3,
    level: 'iniciados'
  },
  {
    id: 't4',
    title: 'Competencia Perfecta',
    type: 'theoretical',
    description: 'Modelos de competencia y estructura de mercado',
    duration: '40 min',
    checkpoints: 1,
    status: 'active',
    icon: Award,
    level: 'iniciados'
  },
  {
    id: 't5',
    title: 'Monopolio y Oligopolio',
    type: 'theoretical',
    description: 'Estructuras de mercado imperfectas',
    duration: '45 min',
    checkpoints: 1,
    status: 'active',
    icon: TrendingUp,
    level: 'iniciados'
  },
  {
    id: 't6',
    title: 'Tecnología Blockchain',
    type: 'theoretical',
    description: 'Fundamentos de blockchain y descentralización',
    duration: '50 min',
    checkpoints: 0,
    status: 'active',
    icon: BarChart3,
    level: 'iniciados'
  },
  {
    id: 't7',
    title: 'Criptomonedas',
    type: 'theoretical',
    description: 'Conceptos básicos de criptomonedas',
    duration: '45 min',
    checkpoints: 0,
    status: 'active',
    icon: Award,
    level: 'iniciados'
  },
  {
    id: 't8',
    title: 'Operaciones con Criptomonedas',
    type: 'theoretical',
    description: 'Trading y operaciones básicas',
    duration: '40 min',
    checkpoints: 0,
    status: 'active',
    icon: TrendingUp,
    level: 'iniciados'
  },
  // Módulos Prácticos (11)
  {
    id: 'p1',
    title: 'Introducción al Trading',
    type: 'practical',
    description: 'Primeros pasos en el mundo del trading',
    duration: '60 min',
    checkpoints: 1,
    status: 'active',
    icon: Target,
    level: 'iniciados'
  },
  {
    id: 'p2',
    title: 'Análisis Técnico Básico',
    type: 'practical',
    description: 'Gráficos y patrones básicos',
    duration: '75 min',
    checkpoints: 1,
    status: 'active',
    icon: BarChart3,
    level: 'iniciados'
  },
  {
    id: 'p3',
    title: 'Indicadores Técnicos',
    type: 'practical',
    description: 'RSI, MACD y otros indicadores',
    duration: '80 min',
    checkpoints: 1,
    status: 'active',
    icon: TrendingUp,
    level: 'iniciados'
  },
  {
    id: 'p4',
    title: 'Gestión de Riesgo',
    type: 'practical',
    description: 'Stop loss y position sizing',
    duration: '65 min',
    checkpoints: 1,
    status: 'active',
    icon: Shield,
    level: 'iniciados'
  },
  {
    id: 'p5',
    title: 'Psicología del Trading',
    type: 'practical',
    description: 'Control emocional y disciplina',
    duration: '55 min',
    checkpoints: 1,
    status: 'active',
    icon: Users,
    level: 'iniciados'
  },
  {
    id: 'p6',
    title: 'Análisis Fundamental 1',
    type: 'practical',
    description: 'Análisis de empresas y sectores',
    duration: '70 min',
    checkpoints: 1,
    status: 'active',
    icon: FileText,
    level: 'iniciados'
  },
  {
    id: 'p7',
    title: 'Análisis Fundamental 2',
    type: 'practical',
    description: 'Ratios financieros y valuación',
    duration: '75 min',
    checkpoints: 1,
    status: 'active',
    icon: FileText,
    level: 'iniciados'
  },
  {
    id: 'p8',
    title: 'Gestión de Riesgo Avanzada',
    type: 'practical',
    description: 'Hedging y diversificación',
    duration: '80 min',
    checkpoints: 1,
    status: 'active',
    icon: Shield,
    level: 'iniciados'
  },
  {
    id: 'p9',
    title: 'Plan de Trading',
    type: 'practical',
    description: 'Desarrollo de estrategias personalizadas',
    duration: '90 min',
    checkpoints: 1,
    status: 'active',
    icon: Target,
    level: 'iniciados'
  },
  {
    id: 'p10',
    title: 'Trading en Diferentes Mercados',
    type: 'practical',
    description: 'Forex, acciones, commodities',
    duration: '85 min',
    checkpoints: 1,
    status: 'active',
    icon: BarChart3,
    level: 'iniciados'
  },
  {
    id: 'p11',
    title: 'Automatización y Algoritmos',
    type: 'practical',
    description: 'Trading automatizado básico',
    duration: '95 min',
    checkpoints: 1,
    status: 'active',
    icon: Zap,
    level: 'iniciados'
  },
  // Puntos de Control (10)
  {
    id: 'pc1',
    title: 'Punto de Control 1: Fundamentos',
    type: 'theoretical',
    description: 'Evaluación de conceptos básicos',
    duration: '30 min',
    checkpoints: 1,
    status: 'active',
    icon: CheckCircle,
    level: 'iniciados'
  },
  {
    id: 'pc2',
    title: 'Punto de Control 2: Análisis Técnico',
    type: 'practical',
    description: 'Evaluación de habilidades técnicas',
    duration: '45 min',
    checkpoints: 1,
    status: 'active',
    icon: CheckCircle,
    level: 'iniciados'
  },
  {
    id: 'pc3',
    title: 'Punto de Control 3: Gestión de Riesgo',
    type: 'practical',
    description: 'Evaluación de gestión de riesgo',
    duration: '40 min',
    checkpoints: 1,
    status: 'active',
    icon: CheckCircle,
    level: 'iniciados'
  },
  {
    id: 'pc4',
    title: 'Punto de Control 4: Análisis Fundamental',
    type: 'practical',
    description: 'Evaluación de análisis fundamental',
    duration: '50 min',
    checkpoints: 1,
    status: 'active',
    icon: CheckCircle,
    level: 'iniciados'
  },
  {
    id: 'pc5',
    title: 'Punto de Control 5: Plan de Trading',
    type: 'practical',
    description: 'Evaluación de plan de trading',
    duration: '60 min',
    checkpoints: 1,
    status: 'active',
    icon: CheckCircle,
    level: 'iniciados'
  }
];

export default function CoursesPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('iniciados');
  const [activeTab, setActiveTab] = useState<'overview' | 'theoretical' | 'practical' | 'checkpoints'>('overview');

  // Asignar módulos de Iniciados al nivel correspondiente
  levels[0].modules = iniciadosModules;

  const currentLevel = levels.find(level => level.id === selectedLevel);
  const theoreticalModules = currentLevel?.modules.filter(m => m.type === 'theoretical') || [];
  const practicalModules = currentLevel?.modules.filter(m => m.type === 'practical') || [];
  const checkpointModules = currentLevel?.modules.filter(m => m.id.startsWith('pc')) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900';
      case 'draft': return 'text-yellow-400 bg-yellow-900';
      case 'archived': return 'text-gray-400 bg-gray-900';
      default: return 'text-gray-400 bg-gray-900';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'theoretical' 
      ? 'text-blue-400 bg-blue-900' 
      : 'text-green-400 bg-green-900';
  };

  return (
    <div className="w-full max-w-none">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#8A8A8A] mb-2">
          Gestión de Cursos
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Administra el contenido educativo por niveles de la plataforma
        </p>
      </div>

      {/* Selector de Niveles */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Seleccionar Nivel:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 ${
                selectedLevel === level.id
                  ? 'border-[#8A8A8A] bg-gradient-to-br from-[#2a2a2a] to-[#3a3a3a]'
                  : 'border-[#3a3a3a] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] hover:border-[#4a4a4a]'
              } ${!level.isUnlocked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
              disabled={!level.isUnlocked}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-lg ${level.bgColor} mb-3`}>
                  <level.icon className={`w-6 h-6 ${level.color}`} />
                </div>
                <h4 className="text-white font-medium text-sm sm:text-base mb-1">
                  {level.name}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {level.description}
                </p>
                {!level.isUnlocked && (
                  <div className="mt-2 text-xs text-gray-500">
                    🔒 Bloqueado
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Estadísticas del Nivel Seleccionado */}
      {currentLevel && (
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl border border-[#3a3a3a] p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-lg ${currentLevel.bgColor}`}>
              <currentLevel.icon className={`w-6 h-6 ${currentLevel.color}`} />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                {currentLevel.name}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                {currentLevel.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {theoreticalModules.length}
              </div>
              <div className="text-sm text-gray-400">Módulos Teóricos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {practicalModules.length}
              </div>
              <div className="text-sm text-gray-400">Módulos Prácticos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {checkpointModules.length}
              </div>
              <div className="text-sm text-gray-400">Puntos de Control</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {Math.round((theoreticalModules.length + practicalModules.length) * 0.75)}
              </div>
              <div className="text-sm text-gray-400">Total Horas</div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs de Contenido */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
            activeTab === 'overview'
              ? 'bg-[#8A8A8A] text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Vista General
        </button>
        <button
          onClick={() => setActiveTab('theoretical')}
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
            activeTab === 'theoretical'
              ? 'bg-[#8A8A8A] text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Teóricos ({theoreticalModules.length})
        </button>
        <button
          onClick={() => setActiveTab('practical')}
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
            activeTab === 'practical'
              ? 'bg-[#8A8A8A] text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Prácticos ({practicalModules.length})
        </button>
        <button
          onClick={() => setActiveTab('checkpoints')}
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
            activeTab === 'checkpoints'
              ? 'bg-[#8A8A8A] text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Puntos de Control ({checkpointModules.length})
        </button>
      </div>

      {/* Contenido según Tab */}
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl border border-[#3a3a3a] overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[#3a3a3a]">
          <h3 className="text-lg sm:text-xl font-semibold text-white">
            {activeTab === 'overview' && 'Vista General del Nivel'}
            {activeTab === 'theoretical' && 'Módulos Teóricos'}
            {activeTab === 'practical' && 'Módulos Prácticos'}
            {activeTab === 'checkpoints' && 'Puntos de Control'}
          </h3>
        </div>
        
        <div className="p-4 sm:p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-medium mb-3">Módulos Teóricos</h4>
                  <div className="space-y-2">
                    {theoreticalModules.slice(0, 4).map((module) => (
                      <div key={module.id} className="flex items-center gap-3 p-3 bg-[#2a2a2a] rounded-lg">
                        <module.icon className="w-5 h-5 text-blue-400" />
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">{module.title}</div>
                          <div className="text-gray-400 text-xs">{module.duration}</div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(module.status)}`}>
                          {module.status}
                        </span>
                      </div>
                    ))}
                    {theoreticalModules.length > 4 && (
                      <div className="text-center text-gray-400 text-sm py-2">
                        +{theoreticalModules.length - 4} módulos más
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-3">Módulos Prácticos</h4>
                  <div className="space-y-2">
                    {practicalModules.slice(0, 4).map((module) => (
                      <div key={module.id} className="flex items-center gap-3 p-3 bg-[#2a2a2a] rounded-lg">
                        <module.icon className="w-5 h-5 text-green-400" />
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">{module.title}</div>
                          <div className="text-gray-400 text-xs">{module.duration}</div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(module.status)}`}>
                          {module.status}
                        </span>
                      </div>
                    ))}
                    {practicalModules.length > 4 && (
                      <div className="text-center text-gray-400 text-sm py-2">
                        +{practicalModules.length - 4} módulos más
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'theoretical' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {theoreticalModules.map((module) => (
                <div key={module.id} className="p-4 bg-[#2a2a2a] rounded-lg border border-[#3a3a3a]">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <module.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-2">{module.title}</h4>
                      <p className="text-gray-400 text-sm mb-3">{module.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {module.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {module.checkpoints} puntos
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(module.status)}`}>
                      {module.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'practical' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {practicalModules.map((module) => (
                <div key={module.id} className="p-4 bg-[#2a2a2a] rounded-lg border border-[#3a3a3a]">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <module.icon className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-2">{module.title}</h4>
                      <p className="text-gray-400 text-sm mb-3">{module.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {module.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {module.checkpoints} puntos
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(module.status)}`}>
                      {module.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'checkpoints' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {checkpointModules.map((module) => (
                <div key={module.id} className="p-4 bg-[#2a2a2a] rounded-lg border border-[#3a3a3a]">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <module.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-2">{module.title}</h4>
                      <p className="text-gray-400 text-sm mb-3">{module.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {module.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {module.checkpoints} puntos
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(module.status)}`}>
                      {module.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
