'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WarriorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">WARRIOR DASHBOARD</h1>
          <p className="text-green-200 text-lg">
            Nivel III - Acción disciplinada y estructura
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-green-500 text-green-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Resumen
            </button>
            <button
              onClick={() => setActiveTab('trading')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'trading'
                  ? 'border-green-500 text-green-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Trading
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'analysis'
                  ? 'border-green-500 text-green-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Análisis
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'community'
                  ? 'border-green-500 text-green-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Comunidad
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Trades Ganadores</span>
                  <span className="text-green-400 font-semibold">78%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">ROI Promedio</span>
                  <span className="text-green-400 font-semibold">+15.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Trades Totales</span>
                  <span className="text-green-400 font-semibold">156</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Herramientas Disponibles</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-chart-line mr-3 text-green-400"></i>
                  Análisis Técnico Avanzado
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-signal mr-3 text-green-400"></i>
                  Señales de Trading
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-users mr-3 text-green-400"></i>
                  Comunidad Warrior
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-graduation-cap mr-3 text-green-400"></i>
                  Cursos Avanzados
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Próximos Eventos</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="text-sm text-gray-400">Hoy, 15:00</div>
                  <div className="text-white font-medium">Sesión de Trading en Vivo</div>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="text-sm text-gray-400">Mañana, 10:00</div>
                  <div className="text-white font-medium">Análisis de Mercado</div>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="text-sm text-gray-400">Viernes, 18:00</div>
                  <div className="text-white font-medium">Meetup Warrior</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trading' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 text-green-400">Panel de Trading</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Señales Activas</h4>
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">BTC/USDT</span>
                      <span className="text-green-400 font-semibold">COMPRAR</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      Entrada: $45,200 | Objetivo: $47,500 | Stop: $44,000
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">ETH/USDT</span>
                      <span className="text-red-400 font-semibold">VENDER</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      Entrada: $3,200 | Objetivo: $3,000 | Stop: $3,350
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Portafolio</h4>
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Balance Total</span>
                      <span className="text-green-400 font-semibold">$12,450</span>
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Ganancia del Mes</span>
                      <span className="text-green-400 font-semibold">+$1,850</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 text-green-400">Análisis de Mercado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Tendencias Principales</h4>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="text-white font-medium">Bitcoin</div>
                    <div className="text-sm text-gray-300">Tendencia alcista confirmada</div>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <div className="text-white font-medium">Ethereum</div>
                    <div className="text-sm text-gray-300">Corrección técnica en curso</div>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <div className="text-white font-medium">Altcoins</div>
                    <div className="text-sm text-gray-300">Consolidación lateral</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Indicadores Técnicos</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">RSI BTC</span>
                    <span className="text-green-400">65</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">MACD</span>
                    <span className="text-green-400">Positivo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Volatilidad</span>
                    <span className="text-yellow-400">Media</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 text-green-400">Comunidad Warrior</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Actividad Reciente</h4>
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded p-4">
                    <div className="text-sm text-gray-400">Hace 2 horas</div>
                    <div className="text-white">Nuevo análisis de BTC publicado</div>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="text-sm text-gray-400">Hace 4 horas</div>
                    <div className="text-white">Sesión de preguntas y respuestas</div>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="text-sm text-gray-400">Ayer</div>
                    <div className="text-white">Nuevo miembro Warrior unido</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Recursos</h4>
                <div className="space-y-3">
                  <Link href="#" className="block bg-gray-700 rounded p-4 hover:bg-gray-600 transition-colors">
                    <div className="text-white font-medium">Guía de Estrategias Avanzadas</div>
                    <div className="text-sm text-gray-300">PDF - 2.5MB</div>
                  </Link>
                  <Link href="#" className="block bg-gray-700 rounded p-4 hover:bg-gray-600 transition-colors">
                    <div className="text-white font-medium">Indicadores Personalizados</div>
                    <div className="text-sm text-gray-300">TradingView Scripts</div>
                  </Link>
                  <Link href="#" className="block bg-gray-700 rounded p-4 hover:bg-gray-600 transition-colors">
                    <div className="text-white font-medium">Plantillas de Trading</div>
                    <div className="text-sm text-gray-300">Excel Templates</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}