'use client';

import React from 'react';
import { useSafeAuth } from '@/context/AuthContext';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { LineChart, RefreshCw, Lightbulb, TrendingUp, BarChart3, Target } from 'lucide-react';
import dynamic from 'next/dynamic';

// Importar el gráfico TradingView dinámicamente para evitar errores de SSR
const TradingViewChart = dynamic(() => import('@/components/TradingViewChart'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-[#0f0f0f] border border-[#232323] rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ec4d58] mx-auto mb-4"></div>
        <p className="text-[#fafafa]">Cargando TradingView...</p>
      </div>
    </div>
  )
});

export default function MaestroTradingViewPage() {
  const { userData } = useSafeAuth();
  const scrollRef = useScrollPosition();
  const [lastUpdate, setLastUpdate] = React.useState(new Date());
  const [showTips, setShowTips] = React.useState(false);

  const updateTimestamp = () => {
    setLastUpdate(new Date());
  };

  const advancedTradingTips = [
    "🎯 Como Maestro, enseña a tus estudiantes a usar stop-loss dinámicos",
    "📊 Analiza múltiples timeframes para confirmar tendencias",
    "💼 Gestiona el riesgo con posición sizing adecuado",
    "📈 Mantén un diario de trading detallado",
    "🔍 Usa indicadores técnicos como confirmación, no predicción",
    "⏰ El timing es crucial - espera confirmaciones claras",
    "📉 Las tendencias pueden continuar más tiempo del esperado",
    "🔄 Diversifica tu portafolio para reducir riesgos",
    "📚 Comparte tu conocimiento con la comunidad",
    "🎓 Guía a otros en su camino de aprendizaje"
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white" ref={scrollRef}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <LineChart className="w-8 h-8 text-[#8A8A8A]" />
              <h1 className="text-3xl font-bold text-[#fafafa]">TradingView</h1>
              <span className="px-3 py-1 bg-[#8A8A8A] text-[#0f0f0f] rounded-full text-sm font-semibold">
                MAESTRO
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={updateTimestamp}
                className="p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-lg transition-colors duration-200"
                title="Actualizar"
              >
                <RefreshCw className="w-5 h-5 text-[#fafafa]" />
              </button>
              <button
                onClick={() => setShowTips(!showTips)}
                className="px-4 py-2 bg-[#3ED598] hover:bg-[#2EC589] text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Mostrar Tips</span>
              </button>
            </div>
          </div>
          
          <p className="text-[#8A8A8A] text-lg mb-2">
            Análisis técnico profesional de criptomonedas con TradingView - Acceso Maestro
          </p>
          
          <p className="text-[#8A8A8A] text-sm">
            Última actualización: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>

        {/* Tips de Trading Avanzados */}
        {showTips && (
          <div className="mb-6 p-4 bg-[#1a1a1a] border border-[#232323] rounded-lg">
            <h3 className="text-lg font-semibold text-[#fafafa] mb-3 flex items-center">
              <Lightbulb className="w-5 h-5 text-[#3ED598] mr-2" />
              Tips Avanzados para Maestros
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {advancedTradingTips.map((tip, index) => (
                <div key={index} className="text-[#8A8A8A] text-sm">
                  {tip}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gráfico TradingView */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#fafafa] mb-4">
            Gráfico Profesional en Tiempo Real
          </h2>
          <TradingViewChart height={700} />
        </div>

        {/* Información adicional para Maestros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-[#1a1a1a] border border-[#232323] rounded-lg">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-5 h-5 text-[#8A8A8A] mr-2" />
              <h3 className="text-lg font-semibold text-[#fafafa]">Análisis Avanzado</h3>
            </div>
            <p className="text-[#8A8A8A] text-sm">
              Como Maestro, utiliza todas las herramientas profesionales de TradingView 
              para análisis técnico avanzado y enseñanza.
            </p>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] border border-[#232323] rounded-lg">
            <div className="flex items-center mb-2">
              <BarChart3 className="w-5 h-5 text-[#8A8A8A] mr-2" />
              <h3 className="text-lg font-semibold text-[#fafafa]">Indicadores Pro</h3>
            </div>
            <p className="text-[#8A8A8A] text-sm">
              Acceso completo a más de 100 indicadores técnicos, patrones armónicos, 
              y herramientas de análisis profesional.
            </p>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] border border-[#232323] rounded-lg">
            <div className="flex items-center mb-2">
              <Target className="w-5 h-5 text-[#8A8A8A] mr-2" />
              <h3 className="text-lg font-semibold text-[#fafafa]">Enseñanza</h3>
            </div>
            <p className="text-[#8A8A8A] text-sm">
              Comparte tu conocimiento con estudiantes, crea estrategias de trading 
              y guía a otros en su desarrollo profesional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
