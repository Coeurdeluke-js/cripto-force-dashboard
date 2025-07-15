'use client';
import React from 'react';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';
import { BookOpen, Users, TrendingUp, Shield, Target, Zap } from 'lucide-react';
import dynamic from 'next/dynamic';

const TradingViewChart = dynamic(() => import('./TradingViewChart'), { ssr: false });

export default function AnalisisFundamentalPage() {
  const learningObjectives = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Fundamentos del Análisis Fundamental",
      description: "Comprende qué es el análisis fundamental y cómo se diferencia del análisis técnico."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Participantes del Mercado",
      description: "Identifica quiénes son los actores principales que mueven los mercados financieros."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Estructura del Mercado FX",
      description: "Entiende cómo funciona el mercado de divisas y su estructura descentralizada."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Intervenciones Bancarias",
      description: "Analiza cómo los bancos centrales intervienen en los mercados y su impacto."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Análisis de Flujos",
      description: "Aprende a interpretar los flujos de capital y su influencia en las cotizaciones."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Aplicación Práctica",
      description: "Desarrolla estrategias basadas en el análisis fundamental para tus operaciones."
    }
  ];

  const keyTopics = [
    "¿Qué es el Análisis Fundamental?",
    "Estructura del Mercado de Divisas",
    "Participantes Claves del Mercado",
    "Bancos Centrales e Intervenciones",
    "Corporaciones y Fondos Globales",
    "Especuladores vs Bancos Centrales",
    "Análisis de Flujos de Capital",
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
              Módulo 7: Análisis Fundamental
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              ¿Quién y Qué Mueve el Mercado?
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <span>📊 Análisis Fundamental</span>
              <span>•</span>
              <span>🏦 Mercados FX</span>
              <span>•</span>
              <span>🎯 Participantes Claves</span>
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
                <BookOpen className="w-7 h-7" />
                Descripción del Módulo
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                El análisis fundamental es la piedra angular para entender qué realmente mueve los mercados. 
                En este módulo aprenderás a identificar los participantes clave del mercado de divisas, 
                comprender las intervenciones de los bancos centrales y desarrollar una visión macroeconómica 
                que te permitirá tomar decisiones de trading más informadas.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Descubrirás cómo los bancos comerciales, corporaciones, fondos globales y especuladores 
                interactúan para crear las tendencias que observamos en los gráficos, y aprenderás a 
                anticipar movimientos basándote en el análisis fundamental.
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
                Sumérgete en el mundo del análisis fundamental y descubre qué realmente mueve los mercados.
              </p>
              <div className="text-center">
                <Link 
                  href="/dashboard/iniciado/Practico/7-analisis-fundamental/contenido"
                  className="inline-flex items-center px-6 py-3 bg-[#ec4d58] hover:bg-[#d63d47] text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
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
                  <span className="text-white font-semibold">2-3 horas</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Lecciones:</span>
                  <span className="text-white font-semibold">8 secciones</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Ejercicios prácticos:</span>
                  <span className="text-white font-semibold">3 casos de estudio</span>
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
                  Módulo 1: Introducción al Trading
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Módulo 2: Introducción al Análisis Técnico
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Comprensión básica de economía
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-[#181818] rounded-2xl p-6 border border-[#232323]">
              <h3 className="text-xl font-bold text-[#ec4d58] mb-4">💡 Consejos Importantes</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <p>• El análisis fundamental complementa el análisis técnico, no lo reemplaza.</p>
                <p>• Mantente actualizado con las noticias económicas y políticas.</p>
                <p>• Las intervenciones de bancos centrales pueden crear oportunidades únicas.</p>
                <p>• Desarrolla una visión macroeconómica para entender las tendencias a largo plazo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
