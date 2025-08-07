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
  Star
} from 'lucide-react';
import Carousel from './components/Carousel';
import ProgressRuler from './components/ProgressRuler';
import { useProgress } from '@/context/ProgressContext';

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

// Módulos Teóricos Base
const theoreticalModulesBase: Module[] = [
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
    title: 'Indicadores RSI y MACD',
    path: '/dashboard/iniciado/Practico/5-indicadores-rsi-macd',
    icon: <Wrench />,
    description: 'Osciladores y confirmación de señales',
    isLocked: true,
    level: 'nivel1'
  },
  {
    id: '6',
    title: 'Estocástico y Bandas de Bollinger',
    path: '/dashboard/iniciado/Practico/6-estocastico-bollinger',
    icon: <Cog />,
    description: 'Indicadores de sobrecompra y sobreventa',
    isLocked: true,
    level: 'nivel1'
  },
  {
    id: '7',
    title: 'Análisis Fundamental 1',
    path: '/dashboard/iniciado/Practico/7-analisis-fundamental-1',
    icon: <Brain />,
    description: 'Análisis fundamental y factores que mueven el mercado',
    isLocked: true,
    level: 'nivel2'
  },
  {
    id: '8',
    title: 'Análisis Fundamental 2',
    path: '/dashboard/iniciado/Practico/8-analisis-fundamental-2',
    icon: <Network />,
    description: 'Análisis fundamental avanzado',
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

// Generar puntos de control prácticos según el orden correcto
function buildPracticalModulesWithCheckpoints() {
  const result: Module[] = [];
  let pcCount = 1;
  
  // 1. Introducción al Trading
  result.push(practicalModulesBase[0]);
  
  // 2. Lección 1 - Introducción al Análisis Técnico
  result.push(practicalModulesBase[1]);
  
  // 3. Punto de Control 1
  result.push({
    id: `PC${pcCount}`,
    title: `Evaluación: ${practicalModulesBase[0].title} y ${practicalModulesBase[1].title}`,
    path: `/dashboard/iniciado/puntos-de-control/practico/pc${pcCount}`,
    icon: <CheckCircle />,
    description: `Punto de control: Evalúa los módulos "${practicalModulesBase[0].title}" y "${practicalModulesBase[1].title}"`,
    isLocked: false,
    level: 'nivel1'
  });
  pcCount++;
  
  // 4. Lección 2 - Patrones de Vela
  result.push(practicalModulesBase[2]);
  
  // 5. Lección 3 - Fibonacci y medias móviles
  result.push(practicalModulesBase[3]);
  
  // 6. Punto de Control 2
  result.push({
    id: `PC${pcCount}`,
    title: `Evaluación: ${practicalModulesBase[2].title} y ${practicalModulesBase[3].title}`,
    path: `/dashboard/iniciado/puntos-de-control/practico/pc${pcCount}`,
    icon: <CheckCircle />,
    description: `Punto de control: Evalúa los módulos "${practicalModulesBase[2].title}" y "${practicalModulesBase[3].title}"`,
    isLocked: true,
    level: 'nivel1'
  });
  pcCount++;
  
  // 7. Lección 4 - Indicadores RSI y MACD
  result.push(practicalModulesBase[4]);
  
  // 8. Lección 5 - Estocástico y Bandas de Bollinger
  result.push(practicalModulesBase[5]);
  
  // 9. Punto de Control 3
  result.push({
    id: `PC${pcCount}`,
    title: `Evaluación: ${practicalModulesBase[4].title} y ${practicalModulesBase[5].title}`,
    path: `/dashboard/iniciado/puntos-de-control/practico/pc${pcCount}`,
    icon: <CheckCircle />,
    description: `Punto de control: Evalúa los módulos "${practicalModulesBase[4].title}" y "${practicalModulesBase[5].title}"`,
    isLocked: true,
    level: 'nivel1'
  });
  pcCount++;
  
  // 10. Lección 6 - Análisis Fundamental 1
  result.push(practicalModulesBase[6]);
  
  // 11. Lección 7 - Análisis Fundamental 2
  result.push(practicalModulesBase[7]);
  
  // 12. Punto de Control 4
  result.push({
    id: `PC${pcCount}`,
    title: `Evaluación: ${practicalModulesBase[6].title} y ${practicalModulesBase[7].title}`,
    path: `/dashboard/iniciado/puntos-de-control/practico/pc${pcCount}`,
    icon: <CheckCircle />,
    description: `Punto de control: Evalúa los módulos "${practicalModulesBase[6].title}" y "${practicalModulesBase[7].title}"`,
    isLocked: true,
    level: 'nivel2'
  });
  pcCount++;
  
  // 13. Lección 8 - Gestión de Riesgo
  result.push(practicalModulesBase[8]);
  
  // 14. Lección 9 - Plan de Trading
  result.push(practicalModulesBase[9]);
  
  // 15. Punto de Control 5
  result.push({
    id: `PC${pcCount}`,
    title: `Evaluación: ${practicalModulesBase[8].title} y ${practicalModulesBase[9].title}`,
    path: `/dashboard/iniciado/puntos-de-control/practico/pc${pcCount}`,
    icon: <CheckCircle />,
    description: `Punto de control: Evalúa los módulos "${practicalModulesBase[8].title}" y "${practicalModulesBase[9].title}"`,
    isLocked: true,
    level: 'nivel2'
  });
  
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

// Función para calcular módulos desbloqueados basado en el progreso
function calculateUnlockedModules(modules: Module[], progress: any, courseType: 'theoretical' | 'practical') {
  // Función auxiliar para verificar si un checkpoint está completado
  const isCheckpointCompleted = (checkpointId: string, level: 'nivel1' | 'nivel2') => {
    const result = progress[courseType][level].checkpoints[checkpointId] || false;
    console.log(`DEBUG: isCheckpointCompleted(${courseType}, ${level}, ${checkpointId}) = ${result}`);
    return result;
  };

  // Separar módulos por nivel para facilitar el cálculo
  const nivel1Modules = modules.filter(m => m.level === 'nivel1' && !m.id.startsWith('PC'));
  const nivel1Checkpoints = modules.filter(m => m.level === 'nivel1' && m.id.startsWith('PC'));
  const nivel2Modules = modules.filter(m => m.level === 'nivel2' && !m.id.startsWith('PC'));
  const nivel2Checkpoints = modules.filter(m => m.level === 'nivel2' && m.id.startsWith('PC'));

  return modules.map((module) => {
    let isLocked = false;
    
    // Si es un módulo del nivel 1
    if (module.level === 'nivel1' && !module.id.startsWith('PC')) {
      const moduleIndex = parseInt(module.id);
      
      if (moduleIndex <= 2) {
        // Los primeros dos módulos siempre están desbloqueados
        isLocked = false;
      } else if (moduleIndex === 3 || moduleIndex === 4) {
        // Módulos 3 y 4 se desbloquean cuando PC1 está completado
        isLocked = !isCheckpointCompleted('PC1', 'nivel1');
        console.log(`Módulo ${moduleIndex} - PC1 completado: ${isCheckpointCompleted('PC1', 'nivel1')}, isLocked: ${isLocked}`);
      } else if (moduleIndex === 5 || moduleIndex === 6) {
        // Módulos 5 y 6 se desbloquean cuando PC2 está completado
        isLocked = !isCheckpointCompleted('PC2', 'nivel1');
        console.log(`Módulo ${moduleIndex} - PC2 completado: ${isCheckpointCompleted('PC2', 'nivel1')}, isLocked: ${isLocked}`);
      }
    }
    
    // Si es un punto de control del nivel 1
    if (module.level === 'nivel1' && module.id.startsWith('PC')) {
      const checkpointNumber = parseInt(module.id.replace('PC', ''));
      
      if (checkpointNumber === 1) {
        // PC1 siempre está desbloqueado
        isLocked = false;
      } else if (checkpointNumber === 2) {
        // PC2 se desbloquea cuando PC1 está completado
        isLocked = !isCheckpointCompleted('PC1', 'nivel1');
        console.log(`PC2 - PC1 completado: ${isCheckpointCompleted('PC1', 'nivel1')}, isLocked: ${isLocked}`);
      } else if (checkpointNumber === 3) {
        // PC3 se desbloquea cuando PC1 Y PC2 están completados
        const pc1Completed = isCheckpointCompleted('PC1', 'nivel1');
        const pc2Completed = isCheckpointCompleted('PC2', 'nivel1');
        isLocked = !(pc1Completed && pc2Completed);
        console.log(`=== PC3 NIVEL1 PRÁCTICO DEBUG ===`);
        console.log(`PC1 completado: ${pc1Completed}`);
        console.log(`PC2 completado: ${pc2Completed}`);
        console.log(`PC1 && PC2: ${pc1Completed && pc2Completed}`);
        console.log(`isLocked: ${isLocked}`);
        console.log(`Progress state:`, progress.practical.nivel1.checkpoints);
        console.log(`========================`);
      }
    }
    
    // Si es un módulo del nivel 2
    if (module.level === 'nivel2' && !module.id.startsWith('PC')) {
      const moduleIndex = parseInt(module.id);
      
      if (moduleIndex === 7 || moduleIndex === 8) {
        // Módulos 7 y 8 se desbloquean cuando PC3 está completado
        isLocked = !isCheckpointCompleted('PC3', 'nivel1');
        console.log(`Módulo ${moduleIndex} - PC3 completado: ${isCheckpointCompleted('PC3', 'nivel1')}, isLocked: ${isLocked}`);
      } else if (moduleIndex === 9 || moduleIndex === 10) {
        // Módulos 9 y 10 se desbloquean cuando PC4 está completado
        isLocked = !isCheckpointCompleted('PC4', 'nivel2');
        console.log(`Módulo ${moduleIndex} - PC4 completado: ${isCheckpointCompleted('PC4', 'nivel2')}, isLocked: ${isLocked}`);
      }
    }
    
    // Si es un punto de control del nivel 2
    if (module.level === 'nivel2' && module.id.startsWith('PC')) {
      const checkpointNumber = parseInt(module.id.replace('PC', ''));
      
      if (courseType === 'practical') {
        // Para contenido práctico, lógica específica
        if (checkpointNumber === 4) {
          // PC4 se desbloquea cuando PC3 está completado
          isLocked = !isCheckpointCompleted('PC3', 'nivel1');
          console.log(`PC4 Práctico - PC3 completado: ${isCheckpointCompleted('PC3', 'nivel1')}, isLocked: ${isLocked}`);
        } else if (checkpointNumber === 5) {
          // PC5 se desbloquea cuando PC4 está completado
          isLocked = !isCheckpointCompleted('PC4', 'nivel2');
          console.log(`PC5 Práctico - PC4 completado: ${isCheckpointCompleted('PC4', 'nivel2')}, isLocked: ${isLocked}`);
        }
      } else {
        // Para contenido teórico, mantener lógica original
        // Verificar si todos los checkpoints del nivel 1 están completados
        const allNivel1Completed = nivel1Checkpoints.every(checkpoint => 
          isCheckpointCompleted(checkpoint.id, 'nivel1')
        );
        
        if (!allNivel1Completed) {
          // Si no están todos los checkpoints del nivel 1 completados, bloquear
          isLocked = true;
          console.log(`PC${checkpointNumber} Teórico - Nivel 1 no completado, isLocked: ${isLocked}`);
        } else {
          if (checkpointNumber === 3) {
            // PC3 se desbloquea cuando PC2 está completado
            isLocked = !isCheckpointCompleted('PC2', 'nivel1');
            console.log(`PC3 Teórico - PC2 completado: ${isCheckpointCompleted('PC2', 'nivel1')}, isLocked: ${isLocked}`);
          } else if (checkpointNumber === 4) {
            // PC4 se desbloquea cuando PC3 está completado
            isLocked = !isCheckpointCompleted('PC3', 'nivel2');
            console.log(`PC4 Teórico - PC3 completado: ${isCheckpointCompleted('PC3', 'nivel2')}, isLocked: ${isLocked}`);
          } else if (checkpointNumber === 5) {
            // PC5 se desbloquea cuando PC4 está completado
            isLocked = !isCheckpointCompleted('PC4', 'nivel2');
            console.log(`PC5 Teórico - PC4 completado: ${isCheckpointCompleted('PC4', 'nivel2')}, isLocked: ${isLocked}`);
          }
        }
      }
    }
    
    return {
      ...module,
      isLocked
    };
  });
}

export default function IniciadoDashboard() {
  const [activeTab, setActiveTab] = useState<'theoretical' | 'practical'>('theoretical');
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { progress } = useProgress();

  // Función para calcular el estado de los objetivos basado en el progreso real
  const calculateObjectivesStatus = () => {
    const objectivesWithStatus = objectives.map(objective => {
      let completed = false;
      
      switch (objective.type) {
        case 'nivel1':
          if (objective.category === 'theoretical') {
            const nivel1Checkpoints = Object.values(progress.theoretical.nivel1.checkpoints).filter(Boolean).length;
            const totalNivel1Checkpoints = Object.keys(progress.theoretical.nivel1.checkpoints).length;
            completed = nivel1Checkpoints === totalNivel1Checkpoints && totalNivel1Checkpoints > 0;
            console.log('Objetivo Nivel 1 Teórico:', { nivel1Checkpoints, totalNivel1Checkpoints, completed });
          } else if (objective.category === 'practical') {
            const nivel1Checkpoints = Object.values(progress.practical.nivel1.checkpoints).filter(Boolean).length;
            const totalNivel1Checkpoints = Object.keys(progress.practical.nivel1.checkpoints).length;
            completed = nivel1Checkpoints === totalNivel1Checkpoints && totalNivel1Checkpoints > 0;
            console.log('Objetivo Nivel 1 Práctico:', { nivel1Checkpoints, totalNivel1Checkpoints, completed });
          }
          break;
          
        case 'nivel2':
          if (objective.category === 'theoretical') {
            const nivel2Checkpoints = Object.values(progress.theoretical.nivel2.checkpoints).filter(Boolean).length;
            const totalNivel2Checkpoints = Object.keys(progress.theoretical.nivel2.checkpoints).length;
            completed = nivel2Checkpoints === totalNivel2Checkpoints && totalNivel2Checkpoints > 0;
            console.log('Objetivo Nivel 2 Teórico:', { nivel2Checkpoints, totalNivel2Checkpoints, completed });
          } else if (objective.category === 'practical') {
            const nivel2Checkpoints = Object.values(progress.practical.nivel2.checkpoints).filter(Boolean).length;
            const totalNivel2Checkpoints = Object.keys(progress.practical.nivel2.checkpoints).length;
            completed = nivel2Checkpoints === totalNivel2Checkpoints && totalNivel2Checkpoints > 0;
            console.log('Objetivo Nivel 2 Práctico:', { nivel2Checkpoints, totalNivel2Checkpoints, completed });
          }
          break;
          
        case 'checkpoints':
          if (objective.category === 'theoretical') {
            const theoreticalCheckpoints = Object.values(progress.theoretical.nivel1.checkpoints).filter(Boolean).length + 
                                         Object.values(progress.theoretical.nivel2.checkpoints).filter(Boolean).length;
            completed = theoreticalCheckpoints >= 2;
            console.log('Objetivo 2 Checkpoints Teóricos:', { theoreticalCheckpoints, completed });
          } else if (objective.category === 'practical') {
            const practicalCheckpoints = Object.values(progress.practical.nivel1.checkpoints).filter(Boolean).length + 
                                       Object.values(progress.practical.nivel2.checkpoints).filter(Boolean).length;
            completed = practicalCheckpoints >= 2;
            console.log('Objetivo 2 Checkpoints Prácticos:', { practicalCheckpoints, completed });
          } else if (objective.category === 'all') {
            const allCheckpoints = Object.values(progress.theoretical.nivel1.checkpoints).filter(Boolean).length + 
                                 Object.values(progress.theoretical.nivel2.checkpoints).filter(Boolean).length +
                                 Object.values(progress.practical.nivel1.checkpoints).filter(Boolean).length + 
                                 Object.values(progress.practical.nivel2.checkpoints).filter(Boolean).length;
            const totalCheckpoints = Object.keys(progress.theoretical.nivel1.checkpoints).length + 
                                   Object.keys(progress.theoretical.nivel2.checkpoints).length +
                                   Object.keys(progress.practical.nivel1.checkpoints).length + 
                                   Object.keys(progress.practical.nivel2.checkpoints).length;
            completed = allCheckpoints === totalCheckpoints && totalCheckpoints > 0;
            console.log('Objetivo Todos los Checkpoints:', { allCheckpoints, totalCheckpoints, completed });
          }
          break;
          
        case 'progress':
          if (objective.category === 'general') {
            const theoreticalProgress = Object.values(progress.theoretical.nivel1.checkpoints).filter(Boolean).length + 
                                      Object.values(progress.theoretical.nivel2.checkpoints).filter(Boolean).length;
            const practicalProgress = Object.values(progress.practical.nivel1.checkpoints).filter(Boolean).length + 
                                    Object.values(progress.practical.nivel2.checkpoints).filter(Boolean).length;
            const totalCheckpoints = Object.keys(progress.theoretical.nivel1.checkpoints).length + 
                                   Object.keys(progress.theoretical.nivel2.checkpoints).length +
                                   Object.keys(progress.practical.nivel1.checkpoints).length + 
                                   Object.keys(progress.practical.nivel2.checkpoints).length;
            const totalProgress = theoreticalProgress + practicalProgress;
            const percentage = (totalProgress / totalCheckpoints) * 100;
            completed = percentage >= 50;
            console.log('Objetivo 50% del curso:', { totalProgress, totalCheckpoints, percentage, completed });
          }
          break;
      }
      
      return {
        ...objective,
        completed
      };
    });
    
    console.log('Estado final de objetivos:', objectivesWithStatus);
    return objectivesWithStatus;
  };

  // Función para marcar un módulo como completado
  const markModuleAsCompleted = (moduleId: string) => {
    const moduleProgress = {
      isCompleted: true,
      progress: 100,
      timestamp: Date.now()
    };
    localStorage.setItem(`module_${moduleId}_progress`, JSON.stringify(moduleProgress));
  };

  // Función para verificar si un módulo está completado
  const isModuleCompleted = (moduleId: string) => {
    const saved = localStorage.getItem(`module_${moduleId}_progress`);
    if (saved) {
      const moduleProgress = JSON.parse(saved);
      return moduleProgress.isCompleted || moduleProgress.progress >= 100;
    }
    return false;
  };

  // Marcar automáticamente los módulos como completados cuando se visitan
  useEffect(() => {
    const currentPath = window.location.pathname;
    const moduleMatch = currentPath.match(/\/(\d+)-/);
    
    if (moduleMatch) {
      const moduleId = moduleMatch[1];
      if (!isModuleCompleted(moduleId)) {
        markModuleAsCompleted(moduleId);
        console.log(`Módulo ${moduleId} marcado como completado`);
      }
    }
  }, []);

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
      const allTheoreticalModules = [...theoreticalModulesBase, ...theoreticalModulesNivel2];
      return calculateUnlockedModules(allTheoreticalModules, progress, 'theoretical');
    } else if (activeTab === 'practical') {
      return calculateUnlockedModules(practicalModules, progress, 'practical');
    }
    return [];
  };

  const allModules = getAllModules();


  // Get user data from profile
  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
      if (saved) {
      const profileData = JSON.parse(saved);
      // setUserData(profileData); // This line was removed from the new_code, so it's removed here.
    }
  }, []);

  // Actualizar objetivos basado en el progreso


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
    <div className="min-h-screen bg-[#0f0f0f] text-white">
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
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
        
        .carousel-container {
          scroll-behavior: smooth;
        }
        
        .carousel-track {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .carousel-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateZ(0);
          animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          animation-fill-mode: both;
        }
        
        .carousel-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(236, 77, 88, 0.15);
        }
        
        .module-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .module-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(35, 35, 35, 0.3);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(236, 77, 88, 0.5);
          border-radius: 4px;
          transition: background 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(236, 77, 88, 0.8);
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .carousel-container {
            margin: 0 -16px;
            padding: 0 16px;
          }
          
          .carousel-track {
            gap: 12px;
          }
          
          .module-card {
            min-height: 260px;
          }
          
          .custom-scrollbar::-webkit-scrollbar {
            height: 4px;
          }
        }
        
        /* Hide scrollbar on mobile for cleaner look */
        @media (max-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            display: none;
          }
        }
        
        .carousel-card:nth-child(1) { animation-delay: 0.1s; }
        .carousel-card:nth-child(2) { animation-delay: 0.2s; }
        .carousel-card:nth-child(3) { animation-delay: 0.3s; }
        .carousel-card:nth-child(4) { animation-delay: 0.4s; }
        .carousel-card:nth-child(5) { animation-delay: 0.5s; }
        .carousel-card:nth-child(6) { animation-delay: 0.6s; }
        .carousel-card:nth-child(7) { animation-delay: 0.7s; }
        .carousel-card:nth-child(8) { animation-delay: 0.8s; }
      `}</style>
      <div className="container mx-auto px-2 sm:px-4 py-4 md:py-8 pb-24 md:pb-8 transition-all duration-300">
        {/* Welcome Message */}
        <div className="w-full max-w-4xl mx-auto mb-6 md:mb-8 text-center px-4 md:px-0">
          <h2 className="text-xl md:text-2xl font-light text-gray-300 tracking-wide">
            Te damos la bienvenida
          </h2>
        </div>

        {/* Carousel Component */}
        <Carousel content={carouselContent} />

        {/* Video introductorio */}
        <div className="w-full flex justify-center mb-8 px-2 md:px-0">
          <div className="w-full max-w-4xl">
            <video className="rounded-xl shadow-lg w-full h-64 md:h-80 object-cover" controls>
                              <source src="/videos/intro.mp4" type="video/mp4" />
              Tu navegador no soporta el video.
            </video>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 px-2 md:px-0">
          <div className="bg-[#1a1a1a] border border-[#232323] rounded-2xl p-1 md:p-2 w-full max-w-md">
            <button
              onClick={() => setActiveTab('theoretical')}
              className={`px-3 md:px-6 py-2 md:py-3 rounded-xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 text-sm md:text-base w-1/2 ${
                activeTab === 'theoretical'
                  ? 'bg-[#ec4d58] text-white shadow-lg'
                  : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a]'
              }`}
            >
              <BookOpen className="inline mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Teórico</span>
              <span className="sm:hidden">Teórico</span>
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-3 md:px-6 py-2 md:py-3 rounded-xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 text-sm md:text-base w-1/2 ${
                activeTab === 'practical'
                  ? 'bg-[#ec4d58] text-white shadow-lg'
                  : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a]'
              }`}
            >
              <TrendingUp className="inline mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Práctico</span>
              <span className="sm:hidden">Práctico</span>
            </button>
          </div>
        </div>

        {/* Progress Ruler - Barra de Progreso General */}
        <div className="w-full max-w-4xl mx-auto mb-8 px-2 md:px-0">
          <ProgressRuler courseType={activeTab as 'theoretical' | 'practical'} />
        </div>

        {/* Mini-lista de objetivos */}
        <div className="w-full flex justify-center mb-8 px-2 md:px-0">
          <div className="w-full max-w-4xl">
            <div className="bg-[#1a1a1a] border border-[#232323] rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4 flex items-center">
                <Target className="mr-2" />
                Objetivos a Lograr
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 objectives-grid">
                {calculateObjectivesStatus().slice(0, 6).map((objective, index) => (
                  <div 
                    key={objective.id} 
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg bg-[#232323] transition-all duration-300 ease-out transform hover:scale-[1.02] hover:bg-[#2a2a2a]"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      objective.completed ? 'bg-[#ec4d58] shadow-md' : 'bg-gray-600'
                    }`}>
                      {objective.completed ? (
                        <CheckCircle className="text-white text-sm" />
                      ) : (
                        <Flag className="text-gray-400 text-sm" />
                      )}
                    </div>
                    <span className={`text-sm transition-all duration-300 ${objective.completed ? 'text-[#ec4d58] line-through' : 'text-gray-300'}`}>
                      {objective.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course Carousel */}
        <div className="mb-8 md:mb-12 px-2 md:px-0">
          <div className="flex items-center justify-between mb-4 md:mb-6 px-4 md:px-0">
            <h2 className="text-xl md:text-2xl font-bold">
              {activeTab === 'theoretical' ? 'Módulos Teóricos' : 'Módulos Prácticos'}
            </h2>
          </div>

          {/* Carrusel mejorado con transiciones suaves */}
          <div className="relative carousel-container px-2 md:px-0">
            <div
              ref={carouselRef}
              className="w-full overflow-x-auto cursor-grab active:cursor-grabbing scroll-smooth custom-scrollbar"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={e => {
                // Remover preventDefault para evitar el error
                setIsDragging(true);
                setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
                setScrollLeft(carouselRef.current?.scrollLeft || 0);
              }}
              onTouchMove={e => {
                if (!isDragging) return;
                // Remover preventDefault para evitar el error
                const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
                const walk = (x - startX) * 1.5;
                if (carouselRef.current) {
                  carouselRef.current.scrollLeft = scrollLeft - walk;
                }
              }}
              onTouchEnd={handleMouseUpOrLeave}
              style={{ 
                scrollSnapType: 'x mandatory',
                scrollPadding: '0 16px',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth'
              }}
            >
              <div className="carousel-track p-2 flex gap-3 md:gap-4 select-none" style={{ minWidth: '100%', width: 'max-content' }}>
                {allModules.map((module, index) => {
                  const isControlPoint = module.id.startsWith('PC');
                  const isLocked = module.isLocked || false;
                  const isCompleted = isModuleCompleted(module.id);
                  
                  return (
                    <div 
                      key={`${activeTab}-${module.id}-${index}`} 
                      className="carousel-card flex-shrink-0 w-[calc(85vw-32px)] sm:w-[calc(50vw-32px)] md:w-[calc(33.333%-24px)] lg:w-[calc(25%-24px)] xl:w-[280px]"
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      {/* Card */}
                      <div className="relative p-4 md:p-6 rounded-xl border transition-all duration-300 group flex flex-col h-[280px] md:h-[320px] module-card bg-[#1a1a1a] border-[#232323] hover:bg-[#2a2a2a] hover:border-[#ec4d58]/30 select-none">
                        {/* Tooltip para módulos bloqueados */}
                        {isLocked && (
                          <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <div className="bg-[#1a1a1a] border border-[#ec4d58] rounded-lg p-4 max-w-[200px] text-center">
                              <div className="text-[#ec4d58] mb-2">
                                <Lock className="w-6 h-6 mx-auto" />
                              </div>
                              <p className="text-sm text-gray-300">
                                Completa el módulo anterior para desbloquear este contenido
                              </p>
                            </div>
                          </div>
                        )}
                        
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ease-out transform hover:scale-110 ${
                          isCompleted ? 'bg-green-500 text-white shadow-lg' : 
                          isLocked ? 'bg-[#2a2a2a] text-gray-400' : 
                          'bg-[#ec4d58] text-white shadow-lg hover:shadow-xl'
                        }`}>
                          {isLocked ? <Lock /> : isCompleted ? <CheckCircle /> : module.icon}
                        </div>
                        
                        <div className="absolute top-4 right-4">
                          <span 
                            className={`text-xs font-bold px-2 py-1 rounded-full transition-all duration-300 ease-out transform hover:scale-105 ${
                              isCompleted ? 'bg-green-500 text-white shadow-md' : 
                              isLocked ? 'bg-[#2a2a2a] text-gray-300' : 
                              'bg-[#ec4d58] text-white shadow-md hover:shadow-lg'
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
                            className={`inline-flex items-center px-3 py-2 rounded-lg transition-all duration-300 font-medium w-full justify-center text-xs whitespace-nowrap ${
                              isLocked ? 'bg-[#2a2a2a] text-gray-400 cursor-not-allowed' :
                              isControlPoint ? 'bg-[#FFD447] hover:bg-[#e6c040] text-black shadow-lg hover:shadow-xl' :
                              isCompleted ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl' :
                              'bg-[#ec4d58] hover:bg-[#d63d47] text-white shadow-lg hover:shadow-xl'
                            }`}
                            onClick={e => isLocked && e.preventDefault()}
                          >
                            {isLocked ? (
                              <>
                                <Lock className="mr-1 w-3 h-3" />
                                Bloqueado
                              </>
                            ) : isControlPoint ? (
                              <>
                                <CheckCircle className="mr-1 w-3 h-3" />
                                Tomar Evaluación
                              </>
                            ) : isCompleted ? (
                              <>
                                <CheckCircle className="mr-1 w-3 h-3" />
                                Completado
                              </>
                            ) : (
                              <>
                                <Play className="mr-1 w-3 h-3" />
                                Acceder al Módulo
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
        <div className="grid md:grid-cols-2 gap-6 mb-8 md:mb-12">
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