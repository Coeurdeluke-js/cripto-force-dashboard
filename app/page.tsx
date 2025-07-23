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
    bgColor: 'bg-white',
    textColor: 'text-white',
    hoverColor: 'hover:bg-white/10',
    path: '/dashboard/iniciado',
    philosophy: 'El Iniciado representa el origen. No es la ausencia, sino el vacío fértil, el espacio que está listo para ser moldeado.',
    quote: 'La forma más pura es la que aún no ha sido definida.',
    description: 'Es el que ha sido llamado, pero aún no ha respondido. No actúa, observa. No emite, recibe.',
    image: '/images/insignias/iniciado.svg'
  },
  {
    id: 'acolito',
    name: 'ACÓLITO',
    level: 'II',
    color: '#FFD447',
    bgColor: 'bg-yellow-400',
    textColor: 'text-yellow-400',
    hoverColor: 'hover:bg-yellow-400/10',
    path: '/dashboard/acolito',
    philosophy: 'El Acólito ha tomado una decisión: servir y aprender. Es la primera vez que la energía toma forma ascendente.',
    quote: 'La obediencia es el comienzo de la libertad interior.',
    description: 'El triángulo representa tanto una pirámide como una flecha: estructura y dirección.',
    image: '/images/insignias/acolito.svg'
  },
  {
    id: 'warrior',
    name: 'WARRIOR',
    level: 'III',
    color: '#3ED598',
    bgColor: 'bg-green-400',
    textColor: 'text-green-400',
    hoverColor: 'hover:bg-green-400/10',
    path: '/dashboard/warrior',
    philosophy: 'El Guerrero es acción disciplinada. No lucha por rabia, sino por estructura. Ha interiorizado la causa.',
    quote: 'El poder sin orden es destrucción. El orden con poder es victoria.',
    description: 'Ahora es una extensión de la voluntad de la Orden.',
    image: '/images/insignias/warrior.svg'
  },
  {
    id: 'lord',
    name: 'LORD',
    level: 'IV',
    color: '#4671D5',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-400',
    hoverColor: 'hover:bg-blue-500/10',
    path: '/dashboard/lord',
    philosophy: 'El Señor es visión, mando y estrategia. No lucha, hace que otros luchen.',
    quote: 'Quien ve todo, no necesita moverse para vencer.',
    description: 'El azul profundo representa su dominio intelectual, capacidad de anticipación y madurez táctica.',
    image: '/images/insignias/lord.svg'
  },
  {
    id: 'darth',
    name: 'DARTH',
    level: 'V',
    color: '#EC4D58',
    bgColor: 'bg-red-500',
    textColor: 'text-red-500',
    hoverColor: 'hover:bg-red-500/10',
    path: '/dashboard/darth',
    philosophy: 'El Darth es destrucción canalizada. No se descontrola: absorbe y redirige.',
    quote: 'El caos, en manos disciplinadas, se vuelve destino.',
    description: 'Representa la integración total de la oscuridad como fuerza creadora y destructora.',
    image: '/images/insignias/darth.svg'
  },
  {
    id: 'maestro',
    name: 'MAESTRO',
    level: 'VI',
    color: '#8A8A8A',
    bgColor: 'bg-gray-500',
    textColor: 'text-gray-400',
    hoverColor: 'hover:bg-gray-500/10',
    path: '/dashboard/maestro',
    philosophy: 'El Maestro ya no actúa: existe. Es una presencia, un eje. Representa el fin del ego.',
    quote: 'El mayor poder es aquel que no necesita mostrarse.',
    description: 'Es la disolución del individuo en el orden. No impone, atrae por su vacío.',
    image: '/images/insignias/maestro.svg'
  }
];

export default function HomePage() {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1a1a1a] to-[#121212]"></div>
        <div className="relative z-10 px-6 py-16 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            CRYPTO FORCE
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Un sistema de progresión donde cada nivel contiene todo lo anterior.<br />
            <span className="text-[#EC4D58] font-semibold">El camino del conocimiento es infinito.</span>
          </p>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`relative group cursor-pointer transition-all duration-500 transform hover:scale-105`}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
              >
                {/* Card Background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 transition-all duration-500 ${hoveredRole === role.id ? 'border-opacity-100' : 'border-opacity-50'}`}></div>
                
                {/* Card Content */}
                <div className="relative p-8 h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
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

                  {/* Insignia */}
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20">
                      <Image
                        src={role.image}
                        alt={`Insignia ${role.name}`}
                        width={80}
                        height={80}
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Philosophy */}
                  <div className="mb-6">
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {role.philosophy}
                    </p>
                    <blockquote className={`border-l-4 ${role.bgColor} pl-4 italic text-sm ${role.textColor}`}>
                      "{role.quote}"
                    </blockquote>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {role.description}
                  </p>

                  {/* Access Button */}
                  <Link
                    href={role.path}
                    className={`inline-flex items-center justify-center w-full py-3 px-6 rounded-lg bg-gradient-to-r ${role.bgColor} text-black font-semibold transition-all duration-300 hover:brightness-110 transform hover:scale-105`}
                  >
                    <i className="fas fa-arrow-right mr-2"></i>
                    Acceder al Dashboard
                  </Link>
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
            El Camino de la Progresión
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Cada rol contiene todo lo del nivel anterior. El conocimiento se acumula,<br />
            la sabiduría se profundiza, y el poder se canaliza de manera más refinada.
          </p>
        </div>
      </div>
    </div>
  );
} 