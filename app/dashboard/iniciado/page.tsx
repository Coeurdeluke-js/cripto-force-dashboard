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
  ArrowRight, 
  Calendar, 
  LogOut, 
  Star
} from 'lucide-react';
import { useControlPoint } from '@/context/ControlPointContext';
import ControlPointBadge from '@/components/ui/ControlPointBadge';
import Carousel from '@/components/Carousel';

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

// Módulos Teóricos Nivel 1 (50% del contenido)
const theoreticalModulesNivel1: Module[] = [
  {
    id: '1',
    title: 'Introducción a la Lógica Económica',
    path: '/dashboard/iniciado/Teorico/1-introduccion-logica-economica',
    icon: <BookOpen />,
    description: 'Fundamentos de la economía y su aplicación en los mercados',
    isLocked: false,
    level: 'nivel1'
  },
  {
    id: '2',
    title: 'Fuerzas del Mercado',
    path: '/dashboard/iniciado/Teorico/2-fuerzas-del-mercado',
    icon: <TrendingUp />,
    description: 'Oferta, demanda y las fuerzas que mueven los mercados',
    isLocked: false,
    level: 'nivel1'
  },
  {
    id: 'PC1',
    title: 'Evaluación: Introducción a la Lógica Económica y Fuerzas del Mercado',
    path: '/dashboard/iniciado/puntos-de-control/teorico/pc1',
    icon: <CheckCircle />,
    description: 'Punto de control: Evalúa los módulos "Introducción a la Lógica Económica" y "Fuerzas del Mercado"',
    isLocked: false,
    level: 'nivel1'
  },
  {
    id: '3',
    title: 'Acción del Gobierno en los Mercados',
    path: '/dashboard/iniciado/Teorico/3-accion-gobierno-mercados',
    icon: <Cog />,
    description: 'Cómo las políticas gubernamentales afectan los mercados',
    isLocked: false,
    level: 'nivel1'
  },
  {
    id: '4',
    title: 'Competencia Perfecta',
    path: '/dashboard/iniciado/Teorico/4-competencia-perfecta',
    icon: <Target />,
    description: 'Análisis de mercados en competencia perfecta',
    isLocked: false,
    level: 'nivel1'
  },
  {
    id: 'PC2',
    title: 'Evaluación: Acción del Gobierno en los Mercados y Competencia Perfecta',
    path: '/dashboard/iniciado/puntos-de-control/teorico/pc2',
    icon: <CheckCircle />,
    description: 'Punto de control: Evalúa los módulos "Acción del Gobierno en los Mercados" y "Competencia Perfecta"',
    isLocked: false,
    level: 'nivel1'
  }
];

// Módulos Teóricos Nivel 2 (50% del contenido)
const theoreticalModulesNivel2: Module[] = [
  {
    id: '5',
    title: 'Monopolio y Oligopolio',
    path: '/dashboard/iniciado/Teorico/5-monopolio-oligopolio',
    icon: <Crown />,
    description: 'Análisis de mercados con poder de mercado concentrado',
    isLocked: true,
    level: 'nivel2'
  },
  {
    id: '6',
    title: 'Tecnología Blockchain',
    path: '/dashboard/iniciado/Teorico/6-tecnologia-blockchain',
    icon: <Network />,
    description: 'Fundamentos de la tecnología blockchain y criptomonedas',
    isLocked: true,
    level: 'nivel2'
  },
  {
    id: 'PC3',
    title: 'Evaluación: Monopolio y Oligopolio y Tecnología Blockchain',
    path: '/dashboard/iniciado/puntos-de-control/teorico/pc3',
    icon: <CheckCircle />,
    description: 'Punto de control: Evalúa los módulos "Monopolio y Oligopolio" y "Tecnología Blockchain"',
    isLocked: true,
    level: 'nivel2'
  },
  {
    id: '7',
    title: 'Criptomonedas',
    path: '/dashboard/iniciado/Teorico/7-criptomonedas',
    icon: <DollarSign />,
    description: 'Análisis fundamental de criptomonedas y tokens',
    isLocked: true,
    level: 'nivel2'
  },
  {
    id: '8',
    title: 'Operaciones con Criptomonedas',
    path: '/dashboard/iniciado/Teorico/8-operaciones-criptomonedas',
    icon: <Wrench />,
    description: 'Técnicas avanzadas de trading en criptomonedas',
    isLocked: true,
    level: 'nivel2'
  },
  {
    id: 'PC4',
    title: 'Evaluación: Criptomonedas y Operaciones con Criptomonedas',
    path: '/dashboard/iniciado/puntos-de-control/teorico/pc4',
    icon: <CheckCircle />,
    description: 'Punto de control: Evalúa los módulos "Criptomonedas" y "Operaciones con Criptomonedas"',
    isLocked: true,
    level: 'nivel2'
  }
];

// Módulos Prácticos Base
const practicalModulesBase: Module[] = [
  {
    id: '1',
    title: 'Introducción al Trading',
    path: '/dashboard/iniciado/Practico/1-introduccion-trading',
    icon: <Play />,
    description: 'Fundamentos del trading y mentalidad correcta',
    isLocked: false,
    level: 'nivel1'
  },
  {
    id: '2',
    title: 'Introducción al Análisis Técnico',
    path: '/dashboard/iniciado/Practico/2-introduccion-analisis-tecnico',
    icon: <TrendingUp />,
    description: 'Herramientas básicas del análisis técnico',
    isLocked: false,
    level: 'nivel1'
  },
  {
    id: '3',
    title: 'Patrones de Vela',
    path: '/dashboard/iniciado/Practico/3-patrones-vela',
    icon: <BookOpen />,
    description: 'Patrones de velas japonesas y su interpretación',
    isLocked: false,
    level: 'nivel1'
  },
  {
    id: '4',
    title: 'Fibonacci y Medias Móviles',
    path: '/dashboard/iniciado/Practico/4-fibonacci-medias',
    icon: <Target />,
    description: 'Niveles de Fibonacci y medias móviles',
    isLocked: false,
    level: 'nivel1'
  },
  {
    id: '5',
    title: 'Estocástico y Bandas de Bollinger',
    path: '/dashboard/iniciado/Practico/5-estocastico-bollinger',
    icon: <Cog />,
    description: 'Indicadores de sobrecompra y sobreventa',
    isLocked: false,
    level: 'nivel1'
  },
  {
    id: '6',
    title: 'Indicadores RSI y MACD',
    path: '/dashboard/iniciado/Practico/6-indicadores-rsi-macd',
    icon: <Wrench />,
    description: 'Osciladores y confirmación de señales',
    isLocked: true,
    level: 'nivel2'
  },
  {
    id: '7',
    title: 'Análisis Fundamental',
    path: '/dashboard/iniciado/Practico/7-analisis-fundamental',
    icon: <Brain />,
    description: 'Análisis fundamental y factores que mueven el mercado',
    isLocked: true,
    level: 'nivel2'
  },
  {
    id: '8',
    title: 'Correlaciones entre Mercados',
    path: '/dashboard/iniciado/Practico/8-correlaciones-mercados',
    icon: <Network />,
    description: 'Relaciones entre diferentes mercados financieros',
    isLocked: true,
    level: 'nivel2'
  },
  {
    id: '9',
    title: 'Gestión de Riesgo',
    path: '/dashboard/iniciado/Practico/9-gestion-riesgo',
    icon: <Shield />,
    description: 'Estrategias de gestión de riesgo y protección de capital',
    isLocked: true,
    level: 'nivel2'
  },
  {
    id: '10',
    title: 'Plan de Trading',
    path: '/dashboard/iniciado/Practico/10-plan-trading',
    icon: <BarChart3 />,
    description: 'Desarrollo de un plan de trading personalizado',
    isLocked: true,
    level: 'nivel2'
  }
];

// Generar puntos de control prácticos cada 2 módulos
function buildPracticalModulesWithCheckpoints() {
  const result: Module[] = [];
  let pcCount = 1;
  
  // Nivel 1 (primeros 5 módulos)
  for (let i = 0; i < 5; i += 2) {
    result.push(practicalModulesBase[i]);
    if (practicalModulesBase[i + 1]) result.push(practicalModulesBase[i + 1]);
    // Insertar punto de control después de cada par
    if (practicalModulesBase[i + 1]) {
      const mod1 = practicalModulesBase[i].title;
      const mod2 = practicalModulesBase[i + 1].title;
      result.push({
        id: `PC${pcCount}`,
        title: `Evaluación: ${mod1} y ${mod2}`,
        path: `/dashboard/iniciado/puntos-de-control/practico/pc${pcCount}`,
        icon: <CheckCircle />,
        description: `Punto de control: Evalúa los módulos "${mod1}" y "${mod2}"`,
        isLocked: true,
        level: 'nivel1'
      });
      pcCount++;
    }
  }
  
  // Nivel 2 (últimos 5 módulos)
  for (let i = 5; i < practicalModulesBase.length; i += 2) {
    result.push(practicalModulesBase[i]);
    if (practicalModulesBase[i + 1]) result.push(practicalModulesBase[i + 1]);
    // Insertar punto de control después de cada par
    if (practicalModulesBase[i + 1]) {
      const mod1 = practicalModulesBase[i].title;
      const mod2 = practicalModulesBase[i + 1].title;
      result.push({
        id: `PC${pcCount}`,
        title: `Evaluación: ${mod1} y ${mod2}`,
        path: `/dashboard/iniciado/puntos-de-control/practico/pc${pcCount}`,
        icon: <CheckCircle />,
        description: `Punto de control: Evalúa los módulos "${mod1}" y "${mod2}"`,
        isLocked: true,
        level: 'nivel2'
      });
      pcCount++;
    }
  }
  
  return result;
}

const practicalModules = buildPracticalModulesWithCheckpoints();

// Función para calcular progreso unificado
function calculateUnifiedProgress(theoreticalModules: Module[], practicalModules: Module[]) {
  const allModules = [...theoreticalModules, ...practicalModules];
  const totalModules = allModules.length;
  
  // Simular progreso real basado en localStorage o estado del usuario
  const getModuleProgress = (moduleId: string) => {
    const saved = localStorage.getItem(`module_${moduleId}_progress`);
    return saved ? JSON.parse(saved) : { isCompleted: false, progress: 0 };
  };
  
  // Calcular módulos completados basado en progreso real
  const completedModules = allModules.filter(m => {
    const progress = getModuleProgress(m.id);
    return progress.isCompleted || progress.progress >= 100;
  }).length;
  
  const totalCheckpoints = allModules.filter(m => m.id.startsWith('PC')).length;
  const completedCheckpoints = allModules.filter(m => {
    if (!m.id.startsWith('PC')) return false;
    const progress = getModuleProgress(m.id);
    return progress.isCompleted || progress.progress >= 100;
  }).length;
  
  // Calcular progreso por nivel
  const nivel1Modules = allModules.filter(m => m.level === 'nivel1');
  const nivel2Modules = allModules.filter(m => m.level === 'nivel2');
  
  const nivel1Completed = nivel1Modules.filter(m => {
    const progress = getModuleProgress(m.id);
    return progress.isCompleted || progress.progress >= 100;
  }).length;
  const nivel1Total = nivel1Modules.length;
  const nivel1Percentage = nivel1Total > 0 ? Math.round((nivel1Completed / nivel1Total) * 100) : 0;
  
  const nivel2Completed = nivel2Modules.filter(m => {
    const progress = getModuleProgress(m.id);
    return progress.isCompleted || progress.progress >= 100;
  }).length;
  const nivel2Total = nivel2Modules.length;
  const nivel2Percentage = nivel2Total > 0 ? Math.round((nivel2Completed / nivel2Total) * 100) : 0;
  
  // Verificar si puede acceder al nivel 2 (50% del nivel 1 completado)
  const canAccessNivel2 = nivel1Percentage >= 50;
  
  return {
    totalModules,
    completedModules,
    totalCheckpoints,
    completedCheckpoints,
    percentage: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0,
    nivel1Percentage,
    nivel2Percentage,
    canAccessNivel2,
    nivel1Completed,
    nivel1Total,
    nivel2Completed,
    nivel2Total
  };
}

// Objetivos a lograr
const objectives = [
  { id: 'obj1', title: 'Completar Nivel 1 Teórico', type: 'nivel1', category: 'theoretical', completed: false },
  { id: 'obj2', title: 'Completar Nivel 1 Práctico', type: 'nivel1', category: 'practical', completed: false },
  { id: 'obj3', title: 'Superar 2 Puntos de Control Teóricos', type: 'checkpoints', category: 'theoretical', completed: false },
  { id: 'obj4', title: 'Superar 2 Puntos de Control Prácticos', type: 'checkpoints', category: 'practical', completed: false },
  { id: 'obj5', title: 'Alcanzar 50% del curso completo', type: 'progress', category: 'general', completed: false },
  { id: 'obj6', title: 'Completar Nivel 2 Teórico', type: 'nivel2', category: 'theoretical', completed: false },
  { id: 'obj7', title: 'Completar Nivel 2 Práctico', type: 'nivel2', category: 'practical', completed: false },
  { id: 'obj8', title: 'Superar todos los Puntos de Control', type: 'checkpoints', category: 'all', completed: false }
];

export default function IniciadoDashboard() {
  const [activeTab, setActiveTab] = useState('theoretical');
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [userData, setUserData] = useState({ name: 'Usuario', profileImage: null });
  const [currentObjectives, setCurrentObjectives] = useState(objectives);
  const [progressAnimation, setProgressAnimation] = useState(false);
  const { canTakeCheckpoint, getTimeUntilNextAttempt, formatTime } = useControlPoint();

  // Carousel content
  const carouselContent = [
    {
      type: 'image' as const,
      content: '/images/insignias/1-iniciados.png',
      duration: 2500
    },
    {
      type: 'title' as const,
      content: 'INICIADO',
      duration: 2500
    },
    {
      type: 'subtitle' as const,
      content: 'Has dado el primer paso hacia el dominio.',
      duration: 2500
    },
    {
      type: 'description' as const,
      content: 'Este espacio es tu punto de partida. Aquí accederás a las enseñanzas fundamentales, tu bitácora de evolución, misiones introductorias, mentorías y recursos esenciales para templar tu mente. Todo está dispuesto para quien observa con atención y actúa con propósito.',
      duration: 11000 // Aumentado de 8s a 11s
    },
    {
      type: 'quote' as const,
      content: 'En cada sombra hay un principio. En cada decisión, una transformación.',
      duration: 3000
    },
    {
      type: 'philosophy' as const,
      content: 'Iniciado no es un título, sino una oportunidad. Una etapa donde se forja la voluntad, se entrena la percepción y se aprende a dominar el caos interior. Aquí no buscamos obediencia ciega, sino claridad interior. El poder no se recibe: se construye. Y si estás dispuesto, este será solo el primero de muchos umbrales que cruzarás.',
      duration: 13000 // Aumentado de 10s a 13s
    }
  ];

  // Obtener todos los módulos según el tab activo
  const getAllModules = () => {
    if (activeTab === 'theoretical') {
      return [...theoreticalModulesNivel1, ...theoreticalModulesNivel2];
    } else if (activeTab === 'practical') {
      return practicalModules;
    }
    return [];
  };

  const allModules = getAllModules();
  const progress = calculateUnifiedProgress(
    activeTab === 'theoretical' ? [...theoreticalModulesNivel1, ...theoreticalModulesNivel2] : [],
    activeTab === 'practical' ? practicalModules : []
  );

  // Get user data from profile
  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
      if (saved) {
      const profileData = JSON.parse(saved);
      setUserData(profileData);
    }
  }, []);

  // Actualizar objetivos basado en el progreso
  useEffect(() => {
    const updatedObjectives = objectives.map(obj => {
      let completed = false;
      
      switch (obj.type) {
        case 'nivel1':
          if (obj.category === 'theoretical') {
            completed = progress.nivel1Percentage >= 100 && activeTab === 'theoretical';
          } else if (obj.category === 'practical') {
            const practicalNivel1 = practicalModules.filter(m => m.level === 'nivel1');
            const completedNivel1 = practicalNivel1.filter(m => m.isCompleted).length;
            completed = completedNivel1 >= practicalNivel1.length && activeTab === 'practical';
          }
          break;
        case 'nivel2':
          if (obj.category === 'theoretical') {
            completed = progress.nivel2Percentage >= 100 && activeTab === 'theoretical';
          } else if (obj.category === 'practical') {
            const practicalNivel2 = practicalModules.filter(m => m.level === 'nivel2');
            const completedNivel2 = practicalNivel2.filter(m => m.isCompleted).length;
            completed = completedNivel2 >= practicalNivel2.length && activeTab === 'practical';
          }
          break;
        case 'checkpoints':
          if (obj.category === 'theoretical') {
            completed = progress.completedCheckpoints >= 2 && activeTab === 'theoretical';
          } else if (obj.category === 'practical') {
            const practicalCheckpoints = practicalModules.filter(m => m.id.startsWith('PC'));
            const completedPracticalCheckpoints = practicalCheckpoints.filter(m => m.isCompleted).length;
            completed = completedPracticalCheckpoints >= 2 && activeTab === 'practical';
          } else if (obj.category === 'all') {
            completed = progress.completedCheckpoints >= progress.totalCheckpoints;
          }
          break;
        case 'progress':
          completed = progress.percentage >= 50;
          break;
      }
      
      return { ...obj, completed };
    });
    
    setCurrentObjectives(updatedObjectives);
  }, [progress, activeTab]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUpOrLeave = () => setIsDragging(false);

  // Función para simular avance de progreso (para demostración)
  const simulateProgress = (moduleId: string) => {
    const currentProgress = localStorage.getItem(`module_${moduleId}_progress`);
    const progress = currentProgress ? JSON.parse(currentProgress) : { isCompleted: false, progress: 0 };
    
    if (!progress.isCompleted) {
      const newProgress = Math.min(progress.progress + 25, 100);
      const isCompleted = newProgress >= 100;
      
      localStorage.setItem(`module_${moduleId}_progress`, JSON.stringify({
        isCompleted,
        progress: newProgress
      }));
      
      // Activar animación
      setProgressAnimation(true);
      setTimeout(() => setProgressAnimation(false), 2000);
      
      // Forzar re-render
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] text-white pt-20">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-in-out;
        }
      `}</style>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="w-full max-w-4xl mx-auto mb-8 text-center">
          <h2 className="text-2xl font-light text-gray-300 tracking-wide">
            Te damos la bienvenida
          </h2>
        </div>

        {/* Carousel Component */}
        <Carousel content={carouselContent} />

        {/* Video introductorio */}
        <div className="w-full flex justify-center mb-8">
          <div className="w-full max-w-4xl">
            <video className="rounded-xl shadow-lg w-full h-64 md:h-80 object-cover" controls>
              <source src="/images/intro.mp4" type="video/mp4" />
              Tu navegador no soporta el video.
            </video>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#1a1a1a] border border-[#232323] rounded-2xl p-2">
            <button
              onClick={() => setActiveTab('theoretical')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                activeTab === 'theoretical'
                  ? 'bg-[#ec4d58] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen className="inline mr-2" />
              Teórico
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                activeTab === 'practical'
                  ? 'bg-[#ec4d58] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <TrendingUp className="inline mr-2" />
              Práctico
            </button>
          </div>
        </div>

        {/* Barra de progreso unificada */}
        <div className="w-full flex justify-center mb-8">
          <div className="w-full max-w-4xl">
            <div className="bg-[#1a1a1a] border border-[#232323] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#ec4d58]">
                  Progreso General {activeTab === 'theoretical' ? 'Teórico' : 'Práctico'}
                </h3>
                <span className={`text-sm transition-all duration-500 ${progressAnimation ? 'text-[#ec4d58] scale-110 font-bold' : 'text-gray-400'}`}>
                  {progress.completedModules}/{progress.totalModules} módulos
                </span>
              </div>
              
              {/* Barra principal */}
              <div className="progress-bar h-4 bg-gray-800 rounded-full overflow-hidden mb-3">
                <div 
                  className="progress-fill bg-[#ec4d58] h-4 rounded-full transition-all duration-500" 
                  style={{ width: `${progress.percentage}%` }}
                ></div>
              </div>
              
              {/* Progreso por niveles */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Medal className="text-yellow-500 mr-2" />
                    <span className="text-sm font-semibold">Nivel 1</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {progress.nivel1Completed}/{progress.nivel1Total} módulos
                  </div>
                  <div className={`text-lg font-bold transition-all duration-500 ${progressAnimation ? 'text-[#ec4d58] scale-110' : 'text-yellow-500'}`}>
                    {progress.nivel1Percentage}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Crown className={`mr-2 ${progress.canAccessNivel2 ? 'text-yellow-500' : 'text-gray-500'}`} />
                    <span className={`text-sm font-semibold ${progress.canAccessNivel2 ? 'text-white' : 'text-gray-500'}`}>
                      Nivel 2
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {progress.nivel2Completed}/{progress.nivel2Total} módulos
                  </div>
                  <div className={`text-lg font-bold transition-all duration-500 ${progressAnimation ? 'text-[#ec4d58] scale-110' : progress.canAccessNivel2 ? 'text-yellow-500' : 'text-gray-500'}`}>
                    {progress.canAccessNivel2 ? `${progress.nivel2Percentage}%` : 'Bloqueado'}
                  </div>
                </div>
              </div>

              {/* Mini checkmarks para checkpoints */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{progress.percentage}% completado</span>
                <div className="flex items-center gap-2">
                  <span>Checkpoints:</span>
                  <div className="flex gap-1">
                    {Array.from({ length: progress.totalCheckpoints }, (_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full border ${
                          i < progress.completedCheckpoints
                            ? 'bg-green-500 border-green-500'
                            : 'bg-gray-600 border-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mini-lista de objetivos */}
        <div className="w-full flex justify-center mb-8">
          <div className="w-full max-w-4xl">
            <div className="bg-[#1a1a1a] border border-[#232323] rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4 flex items-center">
                <Target className="mr-2" />
                Objetivos a Lograr
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentObjectives.slice(0, 6).map((objective) => (
                  <div key={objective.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#232323]">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      objective.completed ? 'bg-green-500' : 'bg-gray-600'
                    }`}>
                      {objective.completed ? (
                        <CheckCircle className="text-white text-sm" />
                      ) : (
                        <Flag className="text-gray-400 text-sm" />
                      )}
                    </div>
                    <span className={`text-sm ${objective.completed ? 'text-green-400 line-through' : 'text-gray-300'}`}>
                      {objective.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course Carousel */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {activeTab === 'theoretical' ? 'Módulos Teóricos' : 'Módulos Prácticos'} - Nivel 1 & 2
            </h2>
          </div>

          {/* Carrusel con scrollbar estilizada */}
          <div className="relative carousel-container">
            <div
              ref={carouselRef}
              className="w-full overflow-x-auto cursor-grab active:cursor-grabbing scroll-smooth custom-scrollbar"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={e => {
                setIsDragging(true);
                setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
                setScrollLeft(carouselRef.current?.scrollLeft || 0);
              }}
              onTouchMove={e => {
                if (!isDragging) return;
                const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
                const walk = (x - startX) * 2;
                if (carouselRef.current) {
                  carouselRef.current.scrollLeft = scrollLeft - walk;
                }
              }}
              onTouchEnd={handleMouseUpOrLeave}
              style={{ 
                scrollSnapType: 'x mandatory'
              }}
            >
              <div className="carousel-track p-2 flex gap-4" style={{ minWidth: '100%', width: 'max-content' }}>
                {allModules.map((module, index) => {
                  // Obtener progreso real del módulo
                  const getModuleProgress = (moduleId: string) => {
                    const saved = localStorage.getItem(`module_${moduleId}_progress`);
                    return saved ? JSON.parse(saved) : { isCompleted: false, progress: 0 };
                  };
                  
                  const moduleProgress = getModuleProgress(module.id);
                  const isLocked = module.isLocked || false;
                  const isCompleted = moduleProgress.isCompleted || moduleProgress.progress >= 100;
                  const isControlPoint = module.id.startsWith('PC');
                  const canTake = isControlPoint ? canTakeCheckpoint(module.id) : true;
                  const timeUntilNext = isControlPoint ? getTimeUntilNextAttempt(module.id) : 0;
                  
                  // Verificar si el módulo del nivel 2 está bloqueado
                  const isNivel2Locked = module.level === 'nivel2' && !progress.canAccessNivel2;
                  
                  return (
                    <div 
                      key={module.id} 
                      className="carousel-card flex-shrink-0 w-[calc(25%-12px)] min-w-[280px] max-w-[320px]"
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      {/* Badge de nivel */}
                      <div className="absolute top-2 left-2 z-10">
                        <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                          module.level === 'nivel1' 
                            ? 'bg-yellow-500 text-black' 
                            : 'bg-purple-500 text-white'
                        }`}>
                          {module.level === 'nivel1' ? 'N1' : 'N2'}
                        </div>
                      </div>

                      {/* Badge solo ícono para puntos de control */}
                      {isControlPoint && (
                        <div className="absolute top-2 right-2 z-10">
                          <ControlPointBadge />
                        </div>
                      )}
                      
                      {/* Card */}
                      <div className={`relative p-6 rounded-xl border transition-all duration-300 group flex flex-col h-[320px] module-card bg-[#1a1a1a] border-[#232323] hover:bg-[#2a2a2a] hover:border-[#ec4d58]/30 ${
                        isNivel2Locked ? 'opacity-50' : ''
                      }`}>
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                          isCompleted ? 'bg-green-500 text-white' : 
                          isLocked || isNivel2Locked ? 'bg-[#2a2a2a] text-gray-400' : 
                          'bg-[#ec4d58] text-white'
                        }`}>
                          {isLocked || isNivel2Locked ? <Lock /> : isCompleted ? <CheckCircle /> : module.icon}
                        </div>
                        
                        <div className="absolute top-4 right-4">
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            isCompleted ? 'bg-green-500 text-white' : 
                            isLocked || isNivel2Locked ? 'bg-[#2a2a2a] text-gray-300' : 
                            'bg-[#ec4d58] text-white'
                          }`}>
                            {module.id}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold mb-2 line-clamp-2">{module.title}</h3>
                        <p className="text-sm text-gray-400 mb-4 line-clamp-3 flex-1">{module.description}</p>
                        
                        {isNivel2Locked && (
                          <div className="mt-auto mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                            <div className="flex items-center justify-center gap-2 text-yellow-400">
                              <Lock className="text-sm" />
                              <span className="text-xs">Completa 50% del Nivel 1</span>
                            </div>
                          </div>
                        )}
                        
                        {isControlPoint && !canTake && timeUntilNext > 0 && !isNivel2Locked && (
                          <div className="mt-auto cooldown-timer rounded-lg p-2 mb-4">
                            <div className="flex items-center justify-center gap-2 text-red-400">
                              <Clock className="text-sm" />
                              <span className="text-xs font-mono">{formatTime(timeUntilNext)}</span>
                            </div>
                            <p className="text-xs text-red-300 text-center mt-1">Próximo intento disponible</p>
                          </div>
                        )}
                        
                        <div className="mt-auto">
                          {isControlPoint ? (
                            <Link
                              href={isNivel2Locked ? '#' : module.path}
                              className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors w-full justify-center ${
                                canTake && !isNivel2Locked ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                              }`}
                              onClick={e => isNivel2Locked && e.preventDefault()}
                            >
                              <CheckCircle className="mr-2" />
                              {isNivel2Locked ? 'Bloqueado' : canTake ? 'Tomar Evaluación' : 'Bloqueado'}
                            </Link>
                          ) : (
                            <div className="flex gap-2">
                              <Link
                                href={isNivel2Locked ? '#' : module.path}
                                className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors flex-1 justify-center ${
                                  isLocked || isNivel2Locked ? 'bg-[#2a2a2a] text-gray-400 cursor-not-allowed' : 
                                  isCompleted ? 'bg-green-500 hover:bg-green-600 text-white' : 
                                  'bg-[#ec4d58] hover:bg-[#d63d47] text-white'
                                }`}
                                onClick={e => isNivel2Locked && e.preventDefault()}
                              >
                                {isLocked || isNivel2Locked ? (
                                  <>
                                    <Lock className="mr-2" />
                                    Bloqueado
                                  </>
                                ) : isCompleted ? (
                                  <>
                                    <CheckCircle className="mr-2" />
                                    Completado
                                  </>
                                ) : (
                                  <>
                                    <Play className="mr-2" />
                                    Comenzar
                                  </>
                                )}
                              </Link>
                              {!isCompleted && !isLocked && !isNivel2Locked && (
                                <button
                                  onClick={() => simulateProgress(module.id)}
                                  className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                                  title="Simular avance (demo)"
                                >
                                  +25%
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Carousel Instructions */}
          <div className="mt-4 text-center text-sm text-gray-500">
            Desliza horizontalmente para navegar entre los módulos
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1a1a1a] border border-[#232323] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#ec4d58] mb-4 flex items-center">
              <TrendingUp className="mr-3" />
              Próximos Pasos
            </h3>
            <p className="text-gray-300 mb-4">
              Continúa tu aprendizaje con los módulos disponibles. Cada módulo te acerca más a convertirte en un trader profesional.
            </p>
            <Link
              href={activeTab === 'theoretical' ? '/dashboard/iniciado/Teorico' : '/dashboard/iniciado/Practico'}
              className="inline-flex items-center px-4 py-2 bg-[#ec4d58] hover:bg-[#d63d47] text-white rounded-lg transition-colors"
            >
              Ver Todos los Módulos
              <ArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="bg-[#1a1a1a] border border-[#232323] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#ec4d58] mb-4 flex items-center">
              <AlertTriangle className="mr-3" />
              Puntos de Control
            </h3>
            <p className="text-gray-300 mb-4">
              Cada 2 módulos encontrarás un punto de control para evaluar tu progreso y consolidar tu aprendizaje.
            </p>
            <div className="text-yellow-400 text-sm space-y-1">
              <div>⏰ Duración: 20 minutos máximo</div>
              <div>🔄 Cooldown: 6 horas entre intentos</div>
              <div>📝 Formato: 12 preguntas de opción múltiple</div>
              <div>✅ Aprobación: 70% mínimo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}