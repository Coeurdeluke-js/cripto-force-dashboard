'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DarthDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">DARTH DASHBOARD</h1>
          <p className="text-red-200 text-lg">
            Nivel V - Destrucción canalizada y poder absoluto
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
                  ? 'border-red-500 text-red-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Resumen
            </button>
            <button
              onClick={() => setActiveTab('power')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'power'
                  ? 'border-red-500 text-red-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Poder
            </button>
            <button
              onClick={() => setActiveTab('execution')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'execution'
                  ? 'border-red-500 text-red-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Ejecución
            </button>
            <button
              onClick={() => setActiveTab('legacy')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'legacy'
                  ? 'border-red-500 text-red-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Legado
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-red-400">Métricas de Poder</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Influencia Total</span>
                  <span className="text-red-400 font-semibold">99.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">ROI Promedio</span>
                  <span className="text-red-400 font-semibold">+156.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Dominio</span>
                  <span className="text-red-400 font-semibold">Absoluto</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-red-400">Herramientas de Poder</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-fire mr-3 text-red-400"></i>
                  Destrucción Canalizada
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-eye mr-3 text-red-400"></i>
                  Visión del Lado Oscuro
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-sword mr-3 text-red-400"></i>
                  Ejecución Perfecta
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-crown mr-3 text-red-400"></i>
                  Dominio Absoluto
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-red-400">Agenda de Poder</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="text-sm text-gray-400">Hoy, 20:00</div>
                  <div className="text-white font-medium">Ritual de Poder</div>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="text-sm text-gray-400">Mañana, 00:00</div>
                  <div className="text-white font-medium">Ejecución Masiva</div>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="text-sm text-gray-400">Viernes, 18:00</div>
                  <div className="text-white font-medium">Consejo de Darth</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'power' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 text-red-400">Panel de Poder</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Operaciones de Poder</h4>
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Operación Alpha</span>
                      <span className="text-red-400 font-semibold">+$2.5M</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      Destrucción de competencia | Estado: Completado
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Operación Beta</span>
                      <span className="text-red-400 font-semibold">+$1.8M</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      Dominio de mercado | Estado: En progreso
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Métricas de Dominio</h4>
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Control de Mercado</span>
                      <span className="text-red-400 font-semibold">85%</span>
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Influencia</span>
                      <span className="text-red-400 font-semibold">Absoluta</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'execution' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 text-red-400">Ejecución Perfecta</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Misiones Activas</h4>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <div className="text-white font-medium">Misión Omega</div>
                    <div className="text-sm text-gray-300">Dominio total del mercado | 95% completado</div>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <div className="text-white font-medium">Misión Delta</div>
                    <div className="text-sm text-gray-300">Eliminación de competencia | 78% completado</div>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <div className="text-white font-medium">Misión Gamma</div>
                    <div className="text-sm text-gray-300">Control de liquidez | 100% completado</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Estadísticas de Ejecución</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tasa de Éxito</span>
                    <span className="text-red-400">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Precisión</span>
                    <span className="text-red-400">Perfecta</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Eficiencia</span>
                    <span className="text-red-400">Máxima</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'legacy' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 text-red-400">Legado del Darth</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Logros Legendarios</h4>
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded p-4">
                    <div className="text-sm text-gray-400">2023</div>
                    <div className="text-white">Dominio del 90% del mercado crypto</div>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="text-sm text-gray-400">2022</div>
                    <div className="text-white">Eliminación de 50+ competidores</div>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="text-sm text-gray-400">2021</div>
                    <div className="text-white">Creación del imperio Darth</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Legado</h4>
                <div className="space-y-3">
                  <Link href="#" className="block bg-gray-700 rounded p-4 hover:bg-gray-600 transition-colors">
                    <div className="text-white font-medium">Doctrina del Lado Oscuro</div>
                    <div className="text-sm text-gray-300">Manual completo</div>
                  </Link>
                  <Link href="#" className="block bg-gray-700 rounded p-4 hover:bg-gray-600 transition-colors">
                    <div className="text-white font-medium">Estrategias de Dominio</div>
                    <div className="text-sm text-gray-300">Técnicas avanzadas</div>
                  </Link>
                  <Link href="#" className="block bg-gray-700 rounded p-4 hover:bg-gray-600 transition-colors">
                    <div className="text-white font-medium">Legado Eterno</div>
                    <div className="text-sm text-gray-300">Transmisión de poder</div>
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