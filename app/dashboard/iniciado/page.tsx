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
import Carousel from '@/components/Carousel';
import ProgressRuler from '@/components/ProgressRuler';

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
        isLocked: pcCount > 2,
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
  }, [progress.percentage, progress.nivel1Percentage, progress.nivel2Percentage, progress.completedCheckpoints, progress.totalCheckpoints, activeTab]);

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
                              <source src="/videos/intro.mp4" type="video/mp4" />
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
                  : 'bg-[#2a2a2a] text-gray-400 hover:text-white'
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
                  : 'bg-[#2a2a2a] text-gray-400 hover:text-white'
              }`}
            >
              <TrendingUp className="inline mr-2" />
              Práctico
            </button>
          </div>
        </div>

        {/* Barra de Progreso Componentizada */}
        <div className="w-full flex justify-center mb-8">
          <div className="w-full max-w-4xl">
            <ProgressRuler
              courseType={activeTab as 'theoretical' | 'practical'}
              progressData={{
                completedModules: progress.completedModules,
                totalModules: activeTab === 'theoretical' ? 8 : 10,
                completedCheckpoints: progress.completedCheckpoints,
                totalCheckpoints: activeTab === 'theoretical' ? 4 : 5,
                percentage: progress.percentage,
                level1Progress: progress.nivel1Percentage,
                level2Progress: progress.nivel2Percentage
              }}
              onProgressUpdate={(newProgress) => {
                // Aquí puedes manejar actualizaciones de progreso
                console.log('Progreso actualizado:', newProgress);
              }}
            />
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
              {activeTab === 'theoretical' ? 'Módulos Teóricos' : 'Módulos Prácticos'}
            </h2>
          </div>

          {/* Carrusel simplificado */}
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
              <div className="carousel-track p-2 flex gap-4 select-none" style={{ minWidth: '100%', width: 'max-content' }}>
                {allModules.map((module, index) => {
                  const isControlPoint = module.id.startsWith('PC');
                  const isLocked = module.isLocked || false;
                  const isCompleted = false; // Simplificado
                  
                  return (
                    <div 
                      key={`${activeTab}-${module.id}-${index}`} 
                      className="carousel-card flex-shrink-0 w-[calc(25%-12px)] min-w-[280px] max-w-[320px]"
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      {/* Card */}
                      <div className="relative p-6 rounded-xl border transition-all duration-300 group flex flex-col h-[320px] module-card bg-[#1a1a1a] border-[#232323] hover:bg-[#2a2a2a] hover:border-[#ec4d58]/30 select-none">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                          isCompleted ? 'bg-green-500 text-white' : 
                          isLocked ? 'bg-[#2a2a2a] text-gray-400' : 
                          'bg-[#ec4d58] text-white'
                        }`}>
                          {isLocked ? <Lock /> : isCompleted ? <CheckCircle /> : module.icon}
                        </div>
                        
                        <div className="absolute top-4 right-4">
                          <span 
                            className={`text-xs font-bold px-2 py-1 rounded-full ${
                              isCompleted ? 'bg-green-500 text-white' : 
                              isLocked ? 'bg-[#2a2a2a] text-gray-300' : 
                              'bg-[#ec4d58] text-white'
                            }`}
                            title={isControlPoint ? "Punto de Control" : ""}
                          >
                            {module.id}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold mb-2 line-clamp-2 select-none">{module.title}</h3>
                        <p className="text-sm text-gray-400 mb-4 line-clamp-3 flex-1 select-none">{module.description}</p>
                        
                        <div className="mt-auto">
                          <Link
                            href={isLocked ? '#' : module.path}
                            className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors w-full justify-center ${
                              isLocked ? 'bg-[#2a2a2a] text-gray-400 cursor-not-allowed' : 
                              isControlPoint ? 'bg-[#FFD447] hover:bg-[#e6c040] text-black' :
                              isCompleted ? 'bg-green-500 hover:bg-green-600 text-white' : 
                              'bg-[#ec4d58] hover:bg-[#d63d47] text-white'
                            }`}
                            onClick={e => isLocked && e.preventDefault()}
                          >
                            {isLocked ? (
                              <>
                                <Lock className="mr-2" />
                                Bloqueado
                              </>
                            ) : isControlPoint ? (
                              <>
                                <CheckCircle className="mr-2" />
                                Tomar autoevaluación
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
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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
              href="/dashboard/iniciado/cursos"
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