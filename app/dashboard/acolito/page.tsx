'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AcolitoDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">ACÓLITO DASHBOARD</h1>
          <p className="text-yellow-200 text-lg">
            Nivel II - Servir y aprender, la primera forma ascendente
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
                  ? 'border-yellow-500 text-yellow-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Resumen
            </button>
            <button
              onClick={() => setActiveTab('learning')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'learning'
                  ? 'border-yellow-500 text-yellow-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Aprendizaje
            </button>
            <button
              onClick={() => setActiveTab('service')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'service'
                  ? 'border-yellow-500 text-yellow-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Servicio
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'community'
                  ? 'border-yellow-500 text-yellow-400'
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
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">Progreso de Aprendizaje</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Cursos Completados</span>
                  <span className="text-yellow-400 font-semibold">8/12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Puntuación Promedio</span>
                  <span className="text-yellow-400 font-semibold">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Tiempo de Estudio</span>
                  <span className="text-yellow-400 font-semibold">156h</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">Herramientas Disponibles</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-book mr-3 text-yellow-400"></i>
                  Cursos Teóricos
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-chart-line mr-3 text-yellow-400"></i>
                  Análisis Técnico
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-users mr-3 text-yellow-400"></i>
                  Comunidad Acólito
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-tasks mr-3 text-yellow-400"></i>
                  Puntos de Control
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">Próximas Actividades</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="text-sm text-gray-400">Hoy, 14:00</div>
                  <div className="text-white font-medium">Sesión de Estudio</div>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="text-sm text-gray-400">Mañana, 09:00</div>
                  <div className="text-white font-medium">Evaluación de Progreso</div>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="text-sm text-gray-400">Viernes, 16:00</div>
                  <div className="text-white font-medium">Reunión de Acólitos</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 text-yellow-400">Panel de Aprendizaje</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Cursos en Progreso</h4>
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Análisis Fundamental</span>
                      <span className="text-yellow-400 font-semibold">75%</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      Módulo 3 de 4 completado
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Gestión de Riesgo</span>
                      <span className="text-yellow-400 font-semibold">60%</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      Módulo 2 de 3 completado
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Evaluaciones</h4>
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Última Evaluación</span>
                      <span className="text-green-400 font-semibold">95%</span>
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Promedio General</span>
                      <span className="text-yellow-400 font-semibold">92%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'service' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 text-yellow-400">Servicio a la Orden</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Tareas de Servicio</h4>
                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <div className="text-white font-medium">Mentoría a Iniciados</div>
                    <div className="text-sm text-gray-300">2 sesiones completadas esta semana</div>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <div className="text-white font-medium">Análisis de Mercado</div>
                    <div className="text-sm text-gray-300">3 reportes entregados</div>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <div className="text-white font-medium">Apoyo a Comunidad</div>
                    <div className="text-sm text-gray-300">15 consultas respondidas</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Métricas de Servicio</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Horas de Servicio</span>
                    <span className="text-yellow-400">24h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Satisfacción</span>
                    <span className="text-yellow-400">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Impacto</span>
                    <span className="text-yellow-400">Alto</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 text-yellow-400">Comunidad Acólito</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Actividad Reciente</h4>
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded p-4">
                    <div className="text-sm text-gray-400">Hace 2 horas</div>
                    <div className="text-white">Nuevo acólito unido al grupo</div>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="text-sm text-gray-400">Hace 4 horas</div>
                    <div className="text-white">Sesión de estudio grupal</div>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="text-sm text-gray-400">Ayer</div>
                    <div className="text-white">Evaluación grupal completada</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Recursos Compartidos</h4>
                <div className="space-y-3">
                  <Link href="#" className="block bg-gray-700 rounded p-4 hover:bg-gray-600 transition-colors">
                    <div className="text-white font-medium">Guía de Análisis Técnico</div>
                    <div className="text-sm text-gray-300">PDF - 1.2MB</div>
                  </Link>
                  <Link href="#" className="block bg-gray-700 rounded p-4 hover:bg-gray-600 transition-colors">
                    <div className="text-white font-medium">Plantillas de Trading</div>
                    <div className="text-sm text-gray-300">Excel - 500KB</div>
                  </Link>
                  <Link href="#" className="block bg-gray-700 rounded p-4 hover:bg-gray-600 transition-colors">
                    <div className="text-white font-medium">Videos de Mentoría</div>
                    <div className="text-sm text-gray-300">5 videos</div>
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