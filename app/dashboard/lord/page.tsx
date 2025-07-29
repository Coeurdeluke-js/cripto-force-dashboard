'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LordDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">LORD DASHBOARD</h1>
          <p className="text-blue-200 text-lg">
            Nivel IV - Visión, mando y estrategia
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
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Resumen
            </button>
            <button
              onClick={() => setActiveTab('strategy')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'strategy'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Estrategia
            </button>
            <button
              onClick={() => setActiveTab('leadership')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'leadership'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Liderazgo
            </button>
            <button
              onClick={() => setActiveTab('network')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'network'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Red
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Métricas de Liderazgo</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Equipos Dirigidos</span>
                  <span className="text-blue-400 font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">ROI Promedio</span>
                  <span className="text-blue-400 font-semibold">+28.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Influencia</span>
                  <span className="text-blue-400 font-semibold">Alta</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Herramientas Exclusivas</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-chess mr-3 text-blue-400"></i>
                  Estrategias Institucionales
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-network-wired mr-3 text-blue-400"></i>
                  Red de Contactos
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-chart-bar mr-3 text-blue-400"></i>
                  Análisis de Mercado Profundo
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-crown mr-3 text-blue-400"></i>
                  Mentoría de Alto Nivel
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Agenda Estratégica</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="text-sm text-gray-400">Hoy, 16:00</div>
                  <div className="text-white font-medium">Reunión de Estrategia</div>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="text-sm text-gray-400">Mañana, 11:00</div>
                  <div className="text-white font-medium">Análisis de Mercado</div>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="text-sm text-gray-400">Viernes, 19:00</div>
                  <div className="text-white font-medium">Cena de Networking</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'strategy' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 text-blue-400">Panel Estratégico</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Posiciones Institucionales</h4>
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Portfolio A</span>
                      <span className="text-green-400 font-semibold">+$45,200</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      BTC, ETH, ADA | Riesgo: Bajo
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Portfolio B</span>
                      <span className="text-blue-400 font-semibold">+$23,500</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      Altcoins, DeFi | Riesgo: Medio
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Análisis de Mercado</h4>
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Sentimiento</span>
                      <span className="text-green-400 font-semibold">Alcista</span>
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Volatilidad</span>
                      <span className="text-yellow-400 font-semibold">Media</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leadership' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 text-blue-400">Gestión de Equipos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Equipos Activos</h4>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="text-white font-medium">Equipo Alpha</div>
                    <div className="text-sm text-gray-300">5 miembros | ROI: +18%</div>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="text-white font-medium">Equipo Beta</div>
                    <div className="text-sm text-gray-300">8 miembros | ROI: +22%</div>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="text-white font-medium">Equipo Gamma</div>
                    <div className="text-sm text-gray-300">3 miembros | ROI: +15%</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Métricas de Liderazgo</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Satisfacción</span>
                    <span className="text-blue-400">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Retención</span>
                    <span className="text-blue-400">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Productividad</span>
                    <span className="text-blue-400">+25%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 text-blue-400">Red de Contactos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Conexiones Recientes</h4>
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded p-4">
                    <div className="text-sm text-gray-400">Hace 1 día</div>
                    <div className="text-white">CEO de Crypto Exchange</div>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="text-sm text-gray-400">Hace 3 días</div>
                    <div className="text-white">Analista Senior de Mercado</div>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="text-sm text-gray-400">Hace 1 semana</div>
                    <div className="text-white">Inversor Institucional</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Eventos</h4>
                <div className="space-y-3">
                  <Link href="#" className="block bg-gray-700 rounded p-4 hover:bg-gray-600 transition-colors">
                    <div className="text-white font-medium">Crypto Summit 2024</div>
                    <div className="text-sm text-gray-300">15-17 Marzo</div>
                  </Link>
                  <Link href="#" className="block bg-gray-700 rounded p-4 hover:bg-gray-600 transition-colors">
                    <div className="text-white font-medium">Networking Dinner</div>
                    <div className="text-sm text-gray-300">22 Marzo</div>
                  </Link>
                  <Link href="#" className="block bg-gray-700 rounded p-4 hover:bg-gray-600 transition-colors">
                    <div className="text-white font-medium">Trading Conference</div>
                    <div className="text-sm text-gray-300">5 Abril</div>
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