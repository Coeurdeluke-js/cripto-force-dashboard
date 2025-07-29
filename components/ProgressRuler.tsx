'use client';

import { useState, useEffect } from 'react';

interface ProgressData {
  completedModules: number;
  totalModules: number;
  completedCheckpoints: number;
  totalCheckpoints: number;
  percentage: number;
  level1Progress: number;
  level2Progress: number;
}

interface ProgressRulerProps {
  courseType: 'theoretical' | 'practical';
  progressData: ProgressData;
  onProgressUpdate?: (newProgress: ProgressData) => void;
}

export default function ProgressRuler({ 
  courseType, 
  progressData, 
  onProgressUpdate 
}: ProgressRulerProps) {
  // Configuración según el tipo de curso
  const courseConfig = {
    theoretical: {
      totalModules: 8,
      totalCheckpoints: 4,
      majorMarks: 5, // 0, 2, 4, 6, 8
      minorMarks: 9, // cada módulo
      markSpacing: 25, // 25% cada 2 módulos
      minorSpacing: 12.5 // 12.5% cada módulo
    },
    practical: {
      totalModules: 10,
      totalCheckpoints: 5,
      majorMarks: 6, // 0, 2, 4, 6, 8, 10
      minorMarks: 11, // cada módulo
      markSpacing: 20, // 20% cada 2 módulos
      minorSpacing: 10 // 10% cada módulo
    }
  };

  const config = courseConfig[courseType];

  return (
    <div className="w-full bg-[#121212] border border-[#232323] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[#ec4d58]">
          Progreso General {courseType === 'theoretical' ? 'Teórico' : 'Práctico'}
        </h3>
                 <div className="flex items-center gap-4">
           <span className="text-sm text-gray-400">
             {progressData.completedModules}/{config.totalModules} módulos
           </span>
         </div>
      </div>
      
      {/* Regla Principal */}
      <div className="relative bg-[#1a1a1a] rounded-lg p-4 border border-[#232323] mb-4">
        {/* Marcas de la regla */}
        <div className="relative h-8 bg-[#0a0a0a] rounded border border-[#232323]">
          {/* Marcas principales */}
          {Array.from({ length: config.majorMarks }, (_, i) => (
            <div
              key={`major-${i}`}
              className="absolute top-0 h-8 w-px bg-[#232323]"
              style={{ left: `${i * config.markSpacing}%` }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 font-mono">
                {i * 2}
              </div>
            </div>
          ))}
          
          {/* Marcas menores */}
          {Array.from({ length: config.minorMarks }, (_, i) => (
            <div
              key={`minor-${i}`}
              className={`absolute top-0 h-4 w-px ${i % 2 === 0 ? 'bg-[#232323]' : 'bg-[#1a1a1a]'}`}
              style={{ left: `${i * config.minorSpacing}%` }}
            />
          ))}
          
                     {/* Puntero de progreso */}
           <div
             className="absolute top-0 h-8 w-1 bg-[#EC4D58] rounded-full shadow-lg z-10 transition-all duration-1000 ease-out"
             style={{ left: `${progressData.percentage}%` }}
           >
             <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#EC4D58] text-white text-xs px-2 py-1 rounded font-bold">
               {Math.round(progressData.percentage)}%
             </div>
           </div>
        </div>
        
        {/* Etiquetas de niveles */}
        <div className="flex justify-between mt-4 text-sm">
          <div className="text-gray-300 font-semibold">
            <div className="text-white">Iniciado</div>
            <div className="text-gray-400 text-xs">Nivel 1</div>
          </div>
          <div className="text-gray-300 font-semibold text-center" style={{ left: '50%', transform: 'translateX(-50%)', position: 'absolute' }}>
            <div className="text-white">Iniciado</div>
            <div className="text-gray-400 text-xs">Nivel 2</div>
          </div>
          <div className="text-gray-300 font-semibold text-right">
            <div className="text-white">Acólito</div>
            <div className="text-gray-400 text-xs">Completado</div>
          </div>
        </div>
      </div>
      
             {/* Información de progreso detallada */}
       <div className="grid grid-cols-2 gap-4 mb-4">
         <div className="text-center p-3 bg-[#1a1a1a] rounded border border-[#232323]">
           <div className="text-sm text-gray-400 mb-1">Nivel 1</div>
           <div className="text-lg font-bold text-white">{progressData.level1Progress}%</div>
           <div className="text-xs text-gray-500">
             {Math.floor((progressData.level1Progress / 100) * (config.totalModules / 2))}/{config.totalModules / 2} módulos
           </div>
         </div>
         <div className="text-center p-3 bg-[#1a1a1a] rounded border border-[#232323]">
           <div className="text-sm text-gray-400 mb-1">Nivel 2</div>
           <div className="text-lg font-bold text-white">{progressData.level2Progress}%</div>
           <div className="text-xs text-gray-500">
             {Math.floor((progressData.level2Progress / 100) * (config.totalModules / 2))}/{config.totalModules / 2} módulos
           </div>
         </div>
       </div>
       
       {/* Checkpoints y progreso general */}
       <div className="flex items-center justify-between text-xs text-gray-400">
         <span>{progressData.percentage}% completado</span>
         <div className="flex items-center gap-2">
           <span>Checkpoints:</span>
           <div className="flex gap-1">
             {Array.from({ length: config.totalCheckpoints }, (_, i) => (
               <div
                 key={i}
                 className={`w-3 h-3 rounded-full border ${
                   i < progressData.completedCheckpoints
                     ? 'bg-[#ec4d58] border-[#ec4d58]'
                     : 'bg-[#1a1a1a] border-[#232323]'
                 }`}
               />
             ))}
           </div>
         </div>
       </div>
    </div>
  );
} 