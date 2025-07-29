'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';



const roles = [
  {
    id: 'iniciado',
    name: 'INICIADO',
    level: 'I',
    color: '#FAFAFA',
    bgColor: 'bg-[#FAFAFA]',
    textColor: 'text-[#FAFAFA]',
    cardBg: 'bg-gray-900',
    hoverColor: 'hover:bg-[#FAFAFA]/10',
    path: '/dashboard/iniciado',
    philosophy: 'El Iniciado representa el origen. No es la ausencia, sino el vacío fértil, el espacio que está listo para ser moldeado.',
    quote: 'La forma más pura es la que aún no ha sido definida.',
    description: 'Es el que ha sido llamado, pero aún no ha respondido. No actúa, observa. No emite, recibe.',
    image: '/images/insignias/1-iniciados.png',
    progress: 85,
    members: 156,
    activeProjects: 12,
    accessible: true
  },
  {
    id: 'acolito',
    name: 'ACÓLITO',
    level: 'II',
    color: '#FFD447',
    bgColor: 'bg-[#FFD447]',
    textColor: 'text-[#FFD447]',
    cardBg: 'bg-gray-900',
    hoverColor: 'hover:bg-[#FFD447]/10',
    path: '/dashboard/acolito',
    philosophy: 'El Acólito ha tomado una decisión: servir y aprender. Es la primera vez que la energía toma forma ascendente.',
    quote: 'La obediencia es el comienzo de la libertad interior.',
    description: 'El triángulo representa tanto una pirámide como una flecha: estructura y dirección.',
    image: '/images/insignias/2-acolitos.png',
    progress: 72,
    members: 89,
    activeProjects: 8,
    accessible: false
  },
  {
    id: 'warrior',
    name: 'WARRIOR',
    level: 'III',
    color: '#3ED598',
    bgColor: 'bg-[#3ED598]',
    textColor: 'text-[#3ED598]',
    cardBg: 'bg-gray-900',
    hoverColor: 'hover:bg-[#3ED598]/10',
    path: '/dashboard/warrior',
    philosophy: 'El Guerrero es acción disciplinada. No lucha por rabia, sino por estructura. Ha interiorizado la causa.',
    quote: 'El poder sin orden es destrucción. El orden con poder es victoria.',
    description: 'Ahora es una extensión de la voluntad de la Orden.',
    image: '/images/insignias/3-warriors.png',
    progress: 94,
    members: 45,
    activeProjects: 15,
    accessible: false
  },
  {
    id: 'lord',
    name: 'LORD',
    level: 'IV',
    color: '#4671D5',
    bgColor: 'bg-[#4671D5]',
    textColor: 'text-[#4671D5]',
    cardBg: 'bg-gray-900',
    hoverColor: 'hover:bg-[#4671D5]/10',
    path: '/dashboard/lord',
    philosophy: 'El Señor es visión, mando y estrategia. No lucha, hace que otros luchen.',
    quote: 'Quien ve todo, no necesita moverse para vencer.',
    description: 'El azul profundo representa su dominio intelectual, capacidad de anticipación y madurez táctica.',
    image: '/images/insignias/4-lords.png',
    progress: 88,
    members: 23,
    activeProjects: 6,
    accessible: false
  },
  {
    id: 'darth',
    name: 'DARTH',
    level: 'V',
    color: '#EC4D58',
    bgColor: 'bg-[#EC4D58]',
    textColor: 'text-[#EC4D58]',
    cardBg: 'bg-gray-900',
    hoverColor: 'hover:bg-[#EC4D58]/10',
    path: '/dashboard/darth',
    philosophy: 'El Darth es destrucción canalizada. No se descontrola: absorbe y redirige.',
    quote: 'El caos, en manos disciplinadas, se vuelve destino.',
    description: 'Representa la integración total de la oscuridad como fuerza creadora y destructora.',
    image: '/images/insignias/5-darths.png',
    progress: 96,
    members: 12,
    activeProjects: 4,
    accessible: false
  },
  {
    id: 'maestro',
    name: 'MAESTRO',
    level: 'VI',
    color: '#8A8A8A',
    bgColor: 'bg-[#8A8A8A]',
    textColor: 'text-[#8A8A8A]',
    cardBg: 'bg-gray-900',
    hoverColor: 'hover:bg-[#8A8A8A]/10',
    path: '/dashboard/maestro',
    philosophy: 'El Maestro ya no actúa: existe. Es una presencia, un eje. Representa el fin del ego.',
    quote: 'El mayor poder es aquel que no necesita mostrarse.',
    description: 'Es la disolución del individuo en el orden. No impone, atrae por su vacío.',
    image: '/images/insignias/6-maestros.png',
    progress: 100,
    members: 5,
    activeProjects: 2,
    accessible: true
  }
];

export default function HomePage() {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#121212] text-white font-inter">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1a1a1a] to-[#121212]"></div>
        <div className="relative z-10 px-6 py-2 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-2 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            PANEL DE CONTROL
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-1 max-w-4xl mx-auto">
            Sistema de Monitoreo para <span className="text-[#EC4D58] font-semibold">La Cúpula</span>
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-0">
            Supervisión integral del progreso y desarrollo de todos los niveles de la Orden.<br />
            Cada rol representa una evolución en el camino del conocimiento y poder.
          </p>
        </div>
      </div>



      {/* Roles Grid */}
      <div className="px-6 py-0">
        <div className="max-w-7xl mx-auto">
          {/* Logo above title - Minimal spacing */}
          <div className="flex justify-center mb-0">
              <Image
                src="/logo.png"
              alt="Crypto Force"
              width={120}
              height={120}
              className="w-30 h-30"
              />
            </div>

          <h2 className="text-3xl font-bold mb-6 text-center text-gray-200">
            Jerarquía de la Orden
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`relative group transition-all duration-500 transform hover:scale-105 ${role.cardBg} rounded-2xl border border-gray-700 overflow-hidden`}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-full ${role.bgColor} flex items-center justify-center text-black font-bold text-lg`}>
                        {role.level}
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold ${role.textColor}`}>{role.name}</h3>
                        <p className="text-gray-400 text-sm">Nivel {role.level}</p>
                      </div>
                    </div>
                  </div>

                  {/* Insignia Circular */}
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 relative">
                      <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-600 shadow-lg">
                        <Image
                          src={role.image}
                          alt={`Insignia ${role.name}`}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Philosophy */}
                  <div className="mb-6">
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {role.philosophy}
                    </p>
                    <blockquote className="border-l-4 border-gray-600 pl-4 italic text-sm text-gray-200 bg-gray-800 py-2 rounded-r">
                      "{role.quote}"
                    </blockquote>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className={`text-lg font-bold ${role.textColor}`}>{role.progress}%</div>
                      <div className="text-xs text-gray-400">Progreso</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${role.textColor}`}>{role.members}</div>
                      <div className="text-xs text-gray-400">Miembros</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${role.textColor}`}>{role.activeProjects}</div>
                      <div className="text-xs text-gray-400">Proyectos</div>
                    </div>
                  </div>

                  {/* Access Button */}
                  {role.accessible ? (
                    <button
                      className="accessible-button"
                      style={{
                        background: `linear-gradient(to right, ${role.color})`,
                        color: '#000000',
                        border: 'none',
                        outline: 'none'
                      }}
                      onClick={() => {
                        window.location.href = role.path;
                      }}
                    >
                      <i className="fas fa-eye mr-2 transition-transform duration-200 group-hover:rotate-12"></i>
                      Supervisar Dashboard
                    </button>
                  ) : (
                    <button
                      className={`role-button ${hoveredButton === role.id ? 'hovered' : ''}`}
                      style={{
                        background: `linear-gradient(to right, ${role.color})`
                      }}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        setHoveredButton(role.id);
                      }}
                      onMouseLeave={(e) => {
                        e.stopPropagation();
                        setHoveredButton(null);
                      }}
                    >
                      <i className={`fas fa-eye eye-icon`}></i>
                      <i className={`fas fa-tools tools-icon`}></i>
                      <span className="default-text">Supervisar Dashboard</span>
                      <span className="hover-text">En desarrollo</span>
                    </button>
                  )}
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-${role.id === 'iniciado' ? 'white' : role.id === 'acolito' ? 'yellow' : role.id === 'warrior' ? 'green' : role.id === 'lord' ? 'blue' : role.id === 'darth' ? 'red' : 'gray'}-500/10 to-transparent opacity-0 transition-opacity duration-500 ${hoveredRole === role.id ? 'opacity-100' : ''}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-200">
            Sistema de Progresión Integral
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Cada nivel contiene y supera todo lo del nivel anterior. El conocimiento se acumula,<br />
            la sabiduría se profundiza, y el poder se canaliza de manera más refinada.<br />
            <span className="text-[#EC4D58] font-semibold">La Cúpula</span> mantiene supervisión total sobre el desarrollo de la Orden.
          </p>
        </div>
      </div>
    </div>
  );
}