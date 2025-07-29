import React from 'react';
import BackButton from '@/components/ui/BackButton';
import Link from 'next/link';

export default function ModuloPractico1Index() {
  return (
    <div className="min-h-screen bg-[#121212] text-white px-2 sm:px-8 py-8 max-w-3xl mx-auto">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 pt-12 relative">
        {/* Botón Volver en la esquina superior izquierda */}
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-[#ec4d58] mb-2 text-center">Curso Práctico de Trading</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Módulo 1: Introducción al Trading</h2>

        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4">Resumen del Módulo</h3>
          <p className="mb-6">En este módulo introductorio aprenderás los conceptos fundamentales del trading, desde qué es realmente el trading hasta cómo desarrollar la mentalidad correcta para operar en los mercados financieros.</p>
          
          <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6">
            <h4 className="text-md font-semibold mb-3 text-[#ec4d58]">Temas principales:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Fundamentos del trading y proceso del trader</li>
              <li>Análisis de gráficos y velas japonesas</li>
              <li>Comprensión del movimiento del precio</li>
              <li>Psicología del trading y gestión de riesgo</li>
              <li>Plan de trading y operativa completa</li>
            </ul>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6">
            <h4 className="text-md font-semibold mb-3 text-[#ec4d58]">Objetivos de aprendizaje:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Comprender qué es realmente el trading</li>
              <li>Desarrollar la mentalidad correcta para el trading</li>
              <li>Aprender gestión de riesgo y capital</li>
              <li>Crear un plan de trading sólido</li>
            </ul>
          </div>

          {/* Información del Curso Gratuito - Versión resumida */}
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-lg p-6 mb-6 border border-[#ec4d58]/20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-[#ec4d58]">🎯 CURSO GRATIS - INTRODUCCIÓN AL TRADING</h4>
              <a 
                href="https://www.instagram.com/cripto_educacion" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-[#ec4d58] hover:text-[#d63d47] transition-colors"
              >
                @cripto_educacion
              </a>
            </div>
            <p className="text-sm text-gray-300 mb-4">Conceptos indispensables que debes retener para comenzar tu camino en el trading.</p>
            <p className="text-xs text-gray-400">Incluye: Fundamentos del trading, análisis técnico, psicología, gestión de riesgo y plan de trading completo.</p>
          </div>

          <div className="text-center">
            <Link 
                              href="/dashboard/iniciado/Practico/1-introduccion-trading/contenido"
              className="inline-flex items-center px-6 py-3 bg-[#ec4d58] hover:bg-[#d63d47] text-white font-semibold rounded-lg transition-colors duration-200"
            >
              <span>Ver Contenido Completo</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Botón Volver al final del texto, del lado izquierdo */}
        <div className="mt-8">
          <BackButton />
        </div>
      </div>
    </div>
  );
} 
