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
  TrendingUp
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
}

const theoreticalModules: Module[] = [
  {
    id: 't1',
    title: 'Introducción a la Lógica Económica',
    type: 'theoretical',
    description: 'Fundamentos de la economía y lógica de mercado',
    duration: '45 min',
    checkpoints: 1,
    status: 'active',
    icon: BookOpen
  },
  {
    id: 't2',
    title: 'Fuerzas del Mercado',
    type: 'theoretical',
    description: 'Oferta, demanda y equilibrio de mercado',
    duration: '40 min',
    checkpoints: 1,
    status: 'active',
    icon: FileText
  },
  {
    id: 't3',
    title: 'Acción del Gobierno en los Mercados',
    type: 'theoretical',
    description: 'Intervención gubernamental y regulaciones',
    duration: '35 min',
    checkpoints: 0,
    status: 'active',
    icon: BarChart3
  },
  {
    id: 't4',
    title: 'Competencia Perfecta',
    type: 'theoretical',
    description: 'Modelos de competencia y estructura de mercado',
    duration: '40 min',
    checkpoints: 1,
    status: 'active',
    icon: Award
  },
  {
    id: 't5',
    title: 'Monopolio y Oligopolio',
    type: 'theoretical',
    description: 'Estructuras de mercado imperfectas',
    duration: '45 min',
    checkpoints: 1,
    status: 'active',
    icon: TrendingUp
  },
  {
    id: 't6',
    title: 'Tecnología Blockchain',
    type: 'theoretical',
    description: 'Fundamentos de blockchain y descentralización',
    duration: '50 min',
    checkpoints: 0,
    status: 'active',
    icon: BarChart3
  },
  {
    id: 't7',
    title: 'Criptomonedas',
    type: 'theoretical',
    description: 'Conceptos básicos de criptomonedas',
    duration: '45 min',
    checkpoints: 0,
    status: 'active',
    icon: Award
  },
  {
    id: 't8',
    title: 'Operaciones con Criptomonedas',
    type: 'theoretical',
    description: 'Trading y operaciones básicas',
    duration: '40 min',
    checkpoints: 0,
    status: 'active',
    icon: FileText
  }
];

const practicalModules: Module[] = [
  {
    id: 'p1',
    title: 'Introducción al Trading',
    type: 'practical',
    description: 'Conceptos básicos y plataformas de trading',
    duration: '30 min',
    checkpoints: 1,
    status: 'active',
    icon: Target
  },
  {
    id: 'p2',
    title: 'Introducción al Análisis Técnico',
    type: 'practical',
    description: 'Fundamentos del análisis técnico',
    duration: '35 min',
    checkpoints: 1,
    status: 'active',
    icon: Play
  },
  {
    id: 'p3',
    title: 'Patrones de Vela',
    type: 'practical',
    description: 'Análisis de patrones de velas japonesas',
    duration: '40 min',
    checkpoints: 1,
    status: 'active',
    icon: TrendingUp
  },
  {
    id: 'p4',
    title: 'Fibonacci y Medias Móviles',
    type: 'practical',
    description: 'Herramientas de análisis técnico',
    duration: '45 min',
    checkpoints: 1,
    status: 'active',
    icon: Award
  },
  {
    id: 'p5',
    title: 'Estocástico y Bandas de Bollinger',
    type: 'practical',
    description: 'Indicadores de volatilidad y momentum',
    duration: '40 min',
    checkpoints: 1,
    status: 'active',
    icon: BarChart3
  },
  {
    id: 'p6',
    title: 'Indicadores RSI y MACD',
    type: 'practical',
    description: 'Indicadores de momentum y tendencia',
    duration: '35 min',
    checkpoints: 0,
    status: 'active',
    icon: Target
  },
  {
    id: 'p7',
    title: 'Análisis Fundamental',
    type: 'practical',
    description: 'Evaluación fundamental de activos',
    duration: '50 min',
    checkpoints: 0,
    status: 'active',
    icon: BarChart3
  },
  {
    id: 'p8',
    title: 'Análisis Fundamental Avanzado',
    type: 'practical',
    description: 'Métodos avanzados de análisis fundamental',
    duration: '45 min',
    checkpoints: 0,
    status: 'active',
    icon: Award
  },
  {
    id: 'p9',
    title: 'Correlaciones entre Mercados',
    type: 'practical',
    description: 'Análisis de correlaciones y diversificación',
    duration: '40 min',
    checkpoints: 0,
    status: 'active',
    icon: TrendingUp
  },
  {
    id: 'p10',
    title: 'Gestión de Riesgo',
    type: 'practical',
    description: 'Estrategias de gestión de riesgo en trading',
    duration: '50 min',
    checkpoints: 0,
    status: 'active',
    icon: Target
  },
  {
    id: 'p11',
    title: 'Plan de Trading',
    type: 'practical',
    description: 'Desarrollo de un plan de trading completo',
    duration: '60 min',
    checkpoints: 0,
    status: 'active',
    icon: Award
  }
];

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState<'theoretical' | 'practical'>('theoretical');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900';
      case 'draft': return 'text-yellow-400 bg-yellow-900';
      case 'archived': return 'text-red-400 bg-red-900';
      default: return 'text-gray-400 bg-gray-900';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'theoretical' 
      ? 'text-blue-400 bg-blue-900' 
      : 'text-green-400 bg-green-900';
  };

  const currentModules = activeTab === 'theoretical' ? theoreticalModules : practicalModules;
  const totalCheckpoints = theoreticalModules.reduce((sum, m) => sum + m.checkpoints, 0) + 
                          practicalModules.reduce((sum, m) => sum + m.checkpoints, 0);

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#8A8A8A] mb-2">
              Gestión de Cursos
            </h1>
            <p className="text-gray-400">
              Administra el contenido educativo de la plataforma
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#8A8A8A] hover:bg-[#9A9A9A] text-white px-4 py-2 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            Nuevo Módulo
          </button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a]">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400 text-sm">Teóricos</span>
            </div>
            <div className="text-2xl font-bold text-white">{theoreticalModules.length}</div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a]">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Prácticos</span>
            </div>
            <div className="text-2xl font-bold text-white">{practicalModules.length}</div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a]">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-400">Puntos Control</span>
            </div>
            <div className="text-2xl font-bold text-white">{totalCheckpoints}</div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a]">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-[#8A8A8A]" />
              <span className="text-sm text-gray-400">Total Horas</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {Math.round((theoreticalModules.length * 0.75 + practicalModules.length * 0.75))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('theoretical')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'theoretical'
                ? 'bg-[#8A8A8A] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Módulos Teóricos ({theoreticalModules.length})
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'practical'
                ? 'bg-[#8A8A8A] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Módulos Prácticos ({practicalModules.length})
          </button>
        </div>
      </div>

      {/* Lista de módulos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl border border-[#3a3a3a] overflow-hidden">
            <div className="p-6 border-b border-[#3a3a3a]">
              <h3 className="text-xl font-semibold text-white">
                {activeTab === 'theoretical' ? 'Módulos Teóricos' : 'Módulos Prácticos'}
              </h3>
            </div>
            
            <div className="p-6 space-y-4">
              {currentModules.map((module) => {
                const IconComponent = module.icon;
                return (
                  <div 
                    key={module.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:border-[#8A8A8A] ${
                      selectedModule?.id === module.id 
                        ? 'border-[#8A8A8A] bg-[#2a2a2a]' 
                        : 'border-[#3a3a3a] bg-[#1a1a1a]'
                    }`}
                    onClick={() => setSelectedModule(module)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 ${getTypeColor(module.type)}/20 rounded-lg`}>
                        <IconComponent className={`w-6 h-6 ${module.type === 'theoretical' ? 'text-blue-400' : 'text-green-400'}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white">{module.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(module.type)}`}>
                            {module.type === 'theoretical' ? 'Teórico' : 'Práctico'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                            {module.status}
                          </span>
                        </div>
                        
                        <p className="text-gray-400 text-sm mb-3">{module.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {module.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            {module.checkpoints} puntos
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Panel de detalles */}
      {selectedModule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#3a3a3a] max-w-2xl w-full">
            <div className="p-6 border-b border-[#3a3a3a]">
              <div className="flex items-center gap-3 mb-4">
                <selectedModule.icon className="w-6 h-6 text-[#8A8A8A]" />
                <h3 className="text-xl font-semibold text-white">{selectedModule.title}</h3>
              </div>
              
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedModule.type)}`}>
                  {selectedModule.type === 'theoretical' ? 'Teórico' : 'Práctico'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedModule.status)}`}>
                  {selectedModule.status}
                </span>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Descripción</label>
                <p className="text-white">{selectedModule.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Duración</label>
                  <span className="text-white font-medium">{selectedModule.duration}</span>
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Puntos de Control</label>
                  <span className="text-white font-medium">{selectedModule.checkpoints}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-[#3a3a3a] flex justify-end">
              <button
                onClick={() => setSelectedModule(null)}
                className="px-4 py-2 bg-[#8A8A8A] text-white rounded-lg hover:bg-[#9A9A9A] transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
