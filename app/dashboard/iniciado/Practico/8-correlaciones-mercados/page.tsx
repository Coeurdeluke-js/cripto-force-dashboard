'use client';
import React from 'react';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';
import { TrendingUp, Oil, Gold, Copper, Target, Zap, BarChart3 } from 'lucide-react';

export default function CorrelacionesMercadosPage() {
  const learningObjectives = [
    {
      icon: <Oil className="w-6 h-6" />,
      title: "Petróleo Crudo y Divisas",
      description: "Comprende la correlación entre el petróleo y divisas como CAD, USD y JPY."
    },
    {
      icon: <Gold className="w-6 h-6" />,
      title: "Oro como Refugio Seguro",
      description: "Analiza la relación entre el oro y divisas como CHF y USD."
    },
    {
      icon: <Copper className="w-6 h-6" />,
      title: "Cobre y Economías",
      description: "Explora la correlación entre el cobre y el dólar australiano."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Análisis de Correlaciones",
      description: "Aprende a identificar y utilizar correlaciones entre mercados."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Estrategias de Trading",
      description: "Desarrolla estrategias basadas en correlaciones de commodities."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Aplicación Práctica",
      description: "Implementa análisis de correlaciones en tu operativa diaria."
    }
  ];

  const keyTopics = [
    "Petróleo Crudo y su Impacto en Divisas",
    "Correlación USD/CAD con Petróleo",
    "Oro como Refugio Seguro",
    "Relación USD/CHF y EUR/USD con Oro",
    "Cobre y el Dólar Australiano",
    "Análisis de Correlaciones",
    "Estrategias de Carry Trade",
    "Aplicación Práctica en Trading"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <BackButton />
          <div className="text-center mt-6">
            <h1 className="text-4xl md:text-5xl font-bold text-[#ec4d58] mb-4">
              Módulo 8: Correlaciones entre Mercados
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Lección 7: Análisis Fundamental
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <span>📊 Correlaciones</span>
              <span>•</span>
              <span>🛢️ Commodities</span>
              <span>•</span>
              <span>💱 Divisas</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Module Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Module Overview */}
            <div className="bg-[#181818] rounded-2xl p-6 border border-[#232323]">
              <h2 className="text-2xl font-bold text-[#ec4d58] mb-4 flex items-center gap-3">
                <TrendingUp className="w-7 h-7" />
                Descripción del Módulo
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Las correlaciones entre mercados son fundamentales para entender cómo los commodities 
                como el petróleo, oro y cobre influyen en las divisas. En este módulo aprenderás a 
                identificar estas relaciones y utilizarlas para mejorar tus decisiones de trading.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Descubrirás cómo el petróleo afecta al CAD, USD y JPY, cómo el oro se relaciona con 
                CHF y USD, y cómo el cobre influye en el dólar australiano. Estas correlaciones te 
                permitirán anticipar movimientos en las divisas basándote en el comportamiento de los commodities.
              </p>
            </div>

            {/* Learning Objectives */}
            <div className="bg-[#181818] rounded-2xl p-6 border border-[#232323]">
              <h2 className="text-2xl font-bold text-[#ec4d58] mb-6">🎯 Objetivos de Aprendizaje</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningObjectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-[#232323] rounded-lg">
                    <div className="text-[#ec4d58] flex-shrink-0 mt-1">
                      {objective.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{objective.title}</h3>
                      <p className="text-sm text-gray-400">{objective.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Topics */}
            <div className="bg-[#181818] rounded-2xl p-6 border border-[#232323]">
              <h2 className="text-2xl font-bold text-[#ec4d58] mb-6">📚 Temas Principales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {keyTopics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-[#232323] rounded-lg">
                    <span className="text-[#ec4d58] font-bold text-sm">{(index + 1).toString().padStart(2, '0')}</span>
                    <span className="text-gray-300">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Navigation & Resources */}
          <div className="space-y-6">
            {/* Start Module Button */}
            <div className="bg-[#181818] rounded-2xl p-6 border border-[#232323] text-center">
              <h3 className="text-xl font-bold text-[#ec4d58] mb-4">🚀 ¿Listo para Empezar?</h3>
              <p className="text-gray-300 mb-6">
                Descubre cómo los commodities mueven las divisas y desarrolla estrategias basadas en correlaciones.
              </p>
              <div className="text-center">
                <Link 
                  href="/dashboard/iniciado/Practico/8-correlaciones-mercados/contenido"
                  className="inline-flex items-center px-6 py-3 bg-[#ec4d58] hover:bg-[#d63d47] text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Comenzar Módulo
                </Link>
              </div>
            </div>

            {/* Module Stats */}
            <div className="bg-[#181818] rounded-2xl p-6 border border-[#232323]">
              <h3 className="text-xl font-bold text-[#ec4d58] mb-4">📊 Estadísticas del Módulo</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Duración estimada:</span>
                  <span className="text-white font-semibold">1-2 horas</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Lecciones:</span>
                  <span className="text-white font-semibold">4 secciones</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Commodities analizados:</span>
                  <span className="text-white font-semibold">3 principales</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Nivel:</span>
                  <span className="text-white font-semibold">Intermedio</span>
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            <div className="bg-[#181818] rounded-2xl p-6 border border-[#232323]">
              <h3 className="text-xl font-bold text-[#ec4d58] mb-4">📋 Prerrequisitos</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Módulo 7: Análisis Fundamental
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Comprensión básica de commodities
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Conocimiento de pares de divisas
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-[#181818] rounded-2xl p-6 border border-[#232323]">
              <h3 className="text-xl font-bold text-[#ec4d58] mb-4">💡 Consejos Importantes</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <p>• Las correlaciones pueden cambiar con el tiempo, mantente actualizado.</p>
                <p>• No todas las correlaciones son perfectas, usa múltiples confirmaciones.</p>
                <p>• Los commodities pueden anticipar movimientos en las divisas.</p>
                <p>• Considera el contexto económico al analizar correlaciones.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 