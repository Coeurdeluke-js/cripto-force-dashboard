'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Unlock, Crown, Shield, Sword, Star, Zap, Target } from 'lucide-react';

// Simulación del rol del usuario actual (esto vendría de un sistema de autenticación)
const getUserRole = () => {
  // Por ahora simulamos que el usuario es "iniciado"
  // En un sistema real, esto vendría del contexto de autenticación
  return 'iniciado'; // Puede ser: 'iniciado', 'acolito', 'warrior', 'lord', 'darth', 'maestro'
};

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
    description: 'Es quien ha sido llamado, pero aún no ha respondido. No actúa, observa. No emite, recibe.',
    image: '/images/insignias/1-iniciados.png',
    progress: 85,
    members: 156,
    activeProjects: 12,
    icon: Shield,
    requirements: 'Acceso básico a la plataforma',
    benefits: [
      'Acceso al contenido fundamental',
      'Evaluaciones de progreso',
      'Comunidad de iniciados'
    ]
  },
  {
    id: 'acolito',
    name: 'ACÓLITO',
    level: 'II',
    color: '#EC4D58',
    bgColor: 'bg-[#EC4D58]',
    textColor: 'text-[#EC4D58]',
    cardBg: 'bg-gray-900',
    hoverColor: 'hover:bg-[#EC4D58]/10',
    path: '/dashboard/acolito',
    philosophy: 'El Acólito ha tomado una decisión: servir y aprender. Es la primera vez que la energía toma forma ascendente.',
    quote: 'La obediencia es el comienzo de la libertad interior.',
    description: 'El triángulo representa tanto una pirámide como una flecha: estructura y dirección.',
    image: '/images/insignias/2-acolitos.png',
    progress: 72,
    members: 89,
    activeProjects: 8,
    icon: Sword,
    requirements: 'Completar 70% del contenido de Iniciado',
    benefits: [
      'Contenido avanzado',
      'Herramientas de análisis',
      'Acceso a mentorías'
    ]
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
    icon: Target,
    requirements: 'Completar 80% del contenido de Acólito',
    benefits: [
      'Estrategias avanzadas',
      'Acceso a operaciones reales',
      'Comunidad exclusiva'
    ]
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
    icon: Crown,
    requirements: 'Completar 90% del contenido de Warrior',
    benefits: [
      'Liderazgo de equipos',
      'Estrategias maestras',
      'Acceso VIP completo'
    ]
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
    icon: Zap,
    requirements: 'Completar 95% del contenido de Lord',
    benefits: [
      'Poder máximo',
      'Control total',
      'Maestría absoluta'
    ]
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
    icon: Star,
    requirements: 'Completar 100% de todos los niveles anteriores',
    benefits: [
      'Iluminación total',
      'Sabiduría infinita',
      'Transcendencia'
    ]
  }
];

export default function DashboardSelectionPage() {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>('iniciado');
  const router = useRouter();

  useEffect(() => {
    setUserRole(getUserRole());
  }, []);

  const isRoleAccessible = (roleId: string) => {
    const roleLevels = ['iniciado', 'acolito', 'warrior', 'lord', 'darth', 'maestro'];
    const userLevelIndex = roleLevels.indexOf(userRole);
    const roleLevelIndex = roleLevels.indexOf(roleId);
    return roleLevelIndex <= userLevelIndex;
  };

  const getRoleStatus = (roleId: string) => {
    if (roleId === userRole) {
      return 'current';
    } else if (isRoleAccessible(roleId)) {
      return 'accessible';
    } else {
      return 'locked';
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-inter">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#1a1a1a] to-[#121212]"></div>
        <div className="relative z-10 px-6 py-8 text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Crypto Force"
              width={120}
              height={120}
              className="w-30 h-30"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Panel de Control
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-2 max-w-4xl mx-auto">
            Selecciona tu <span className="text-[#EC4D58] font-semibold">Dashboard</span> o explora otros niveles
          </p>
          <p className="text-base text-gray-400 max-w-3xl mx-auto mb-6">
            Tu rol actual: <span className={`font-bold ${roles.find(r => r.id === userRole)?.textColor}`}>
              {roles.find(r => r.id === userRole)?.name}
            </span>
          </p>
          <div className="bg-gray-800 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-gray-300">
              <span className="text-[#EC4D58] font-semibold">Sistema de Progresión:</span> Cada nivel te permite acceder a tu dashboard y a todos los niveles anteriores. 
              Completa el contenido de tu nivel actual para desbloquear el siguiente.
            </p>
          </div>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-200">
            Jerarquía de Acceso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map((role) => {
              const status = getRoleStatus(role.id);
              const IconComponent = role.icon;
              
              return (
                <div
                  key={role.id}
                  className={`relative group transition-all duration-500 transform hover:scale-105 ${role.cardBg} rounded-2xl border ${
                    status === 'current' ? 'border-[#EC4D58]' : 
                    status === 'accessible' ? 'border-gray-600' : 
                    'border-gray-700'
                  } overflow-hidden`}
                  onMouseEnter={() => setHoveredRole(role.id)}
                  onMouseLeave={() => setHoveredRole(null)}
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    {status === 'current' && (
                      <div className="bg-[#EC4D58] text-white px-3 py-1 rounded-full text-xs font-bold">
                        TU ROL
                      </div>
                    )}
                    {status === 'accessible' && (
                      <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        ACCESIBLE
                      </div>
                    )}
                    {status === 'locked' && (
                      <div className="bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        BLOQUEADO
                      </div>
                    )}
                  </div>

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
                        <div className={`w-full h-full rounded-full overflow-hidden border-2 shadow-lg ${
                          status === 'current' ? 'border-[#EC4D58]' : 
                          status === 'accessible' ? 'border-gray-500' : 
                          'border-gray-600'
                        }`}>
                          <Image
                            src={role.image}
                            alt={`Insignia ${role.name}`}
                            width={96}
                            height={96}
                            className={`w-full h-full object-cover ${
                              status === 'locked' ? 'grayscale opacity-50' : ''
                            }`}
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

                    {/* Requirements */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-semibold text-gray-400">REQUISITOS</span>
                      </div>
                      <p className="text-xs text-gray-300">{role.requirements}</p>
                    </div>

                    {/* Benefits */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-semibold text-gray-400">BENEFICIOS</span>
                      </div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        {role.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Access Button */}
                    {status === 'current' ? (
                      <button
                        onClick={() => {
                          console.log('Navigating to:', role.path);
                          window.location.href = role.path;
                        }}
                        className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                          role.bgColor
                        } text-black hover:scale-105 transform relative z-10 cursor-pointer`}
                        style={{ position: 'relative', zIndex: 10 }}
                      >
                        <Unlock className="w-4 h-4 mr-2" />
                        Acceder a mi Dashboard
                      </button>
                    ) : status === 'accessible' ? (
                      <button
                        onClick={() => {
                          console.log('Navigating to:', role.path);
                          window.location.href = role.path;
                        }}
                        className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-300 bg-gray-700 text-white hover:bg-gray-600 hover:scale-105 transform relative z-10 cursor-pointer`}
                        style={{ position: 'relative', zIndex: 10 }}
                      >
                        <Unlock className="w-4 h-4 mr-2" />
                        Acceder al Dashboard
                      </button>
                    ) : (
                      <div className="w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium bg-gray-800 text-gray-500 cursor-not-allowed relative z-10">
                        <Lock className="w-4 h-4 mr-2" />
                        Bloqueado
                      </div>
                    )}
                  </div>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-${role.id === 'iniciado' ? 'white' : role.id === 'acolito' ? 'red' : role.id === 'warrior' ? 'green' : role.id === 'lord' ? 'blue' : role.id === 'darth' ? 'red' : 'gray'}-500/10 to-transparent opacity-0 transition-opacity duration-500 ${hoveredRole === role.id ? 'opacity-100' : ''} pointer-events-none`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-200">
            Sistema de Progresión Integral
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Cada nivel contiene y supera todo lo del nivel anterior. El conocimiento se acumula,<br />
            la sabiduría se profundiza, y el poder se canaliza de manera más refinada.<br />
            <span className="text-[#EC4D58] font-semibold">Crypto Force</span> te guía en tu camino hacia la maestría.
          </p>
        </div>
      </div>

      {/* Footer Estético */}
      <footer className="bg-[#1a1a1a] border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Image
                src="/logo.png"
                alt="Crypto Force"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <div>
                <h3 className="text-lg font-bold text-white">Crypto Force</h3>
                <p className="text-sm text-gray-400">Trading Team</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                Criptomonedas e Inversiones
              </p>
              <p className="text-xs text-gray-500 mt-1">
                © 2024 Crypto Force. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .accessible-button {
          width: 100%;
          padding: 12px 16px;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .accessible-button:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .role-button {
          width: 100%;
          padding: 12px 16px;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .role-button .eye-icon {
          transition: all 0.3s ease;
        }

        .role-button .tools-icon {
          position: absolute;
          opacity: 0;
          transform: translateX(20px);
          transition: all 0.3s ease;
        }

        .role-button .default-text {
          transition: all 0.3s ease;
        }

        .role-button .hover-text {
          position: absolute;
          opacity: 0;
          transform: translateX(20px);
          transition: all 0.3s ease;
        }

        .role-button.hovered .eye-icon {
          opacity: 0;
          transform: translateX(-20px);
        }

        .role-button.hovered .tools-icon {
          opacity: 1;
          transform: translateX(0);
        }

        .role-button.hovered .default-text {
          opacity: 0;
          transform: translateX(-20px);
        }

        .role-button.hovered .hover-text {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </div>
  );
}
