'use client';
import React from 'react';
import BackButton from '@/components/ui/BackButton';

export default function AnalisisFundamental2Contenido() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <BackButton />
          <div className="text-center mt-6">
            <h1 className="text-4xl md:text-5xl font-bold text-[#ec4d58] mb-4">
              Análisis Fundamental 2
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Contenido en desarrollo
            </p>
          </div>
        </div>
        
        <div className="bg-[#181818] rounded-2xl p-6 border border-[#232323]">
          <p className="text-gray-300">
            Este módulo está en desarrollo. Próximamente tendrás acceso al contenido completo.
          </p>
        </div>
      </div>
    </div>
  );
}
