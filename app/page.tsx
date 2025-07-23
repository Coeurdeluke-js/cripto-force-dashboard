'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Role {
  id: string;
  name: string;
  title: string;
  description: string;
  features: string[];
  color: string;
  gradient: string;
  image: string;
  path: string;
}

const roles: Role[] = [
  {
    id: 'iniciado',
    name: 'Iniciado',
    title: 'Nivel Básico',
    description: 'Perfecto para principiantes que quieren aprender los fundamentos del trading y análisis técnico.',
    features: [
      'Cursos teóricos y prácticos',
      'Puntos de control evaluativos',
      'Análisis técnico básico',
      'Gestión de riesgo inicial',
      'Plan de trading personalizado'
    ],
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-blue-600',
    image: '/images/default-avatar.png',
    path: '/dashboard/iniciado'
  },
  {
    id: 'warrior',
    name: 'Warrior',
    title: 'Nivel Intermedio',
    description: 'Para traders con experiencia básica que quieren profundizar en estrategias avanzadas.',
    features: [
      'Estrategias avanzadas',
      'Análisis fundamental',
      'Gestión de portafolio',
      'Señales de trading',
      'Comunidad exclusiva'
    ],
    color: 'bg-green-500',
    gradient: 'from-green-500 to-green-600',
    image: '/images/default-avatar.png',
    path: '/dashboard/warrior'
  },
  {
    id: 'acolito',
    name: 'Acólito',
    title: 'Nivel Avanzado',
    description: 'Traders experimentados que buscan técnicas especializadas y mentoría personalizada.',
    features: [
      'Mentoría personalizada',
      'Estrategias especializadas',
      'Análisis de mercado profundo',
      'Acceso a herramientas premium',
      'Soporte prioritario'
    ],
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-purple-600',
    image: '/images/default-avatar.png',
    path: '/dashboard/acolito'
  },
  {
    id: 'lord',
    name: 'Lord',
    title: 'Nivel Experto',
    description: 'Para traders expertos que dominan el mercado y buscan optimizar sus estrategias.',
    features: [
      'Estrategias de alto rendimiento',
      'Análisis institucional',
      'Herramientas de trading avanzadas',
      'Red de contactos exclusiva',
      'Consultoría personalizada'
    ],
    color: 'bg-red-500',
    gradient: 'from-red-500 to-red-600',
    image: '/images/default-avatar.png',
    path: '/dashboard/lord'
  },
  {
    id: 'darth',
    name: 'Darth',
    title: 'Nivel Maestro',
    description: 'El nivel más alto para traders que han dominado todos los aspectos del mercado.',
    features: [
      'Acceso completo a todas las herramientas',
      'Mentoría de nivel maestro',
      'Estrategias institucionales',
      'Red de traders elite',
      'Consultoría estratégica'
    ],
    color: 'bg-gray-800',
    gradient: 'from-gray-800 to-gray-900',
    image: '/images/default-avatar.png',
    path: '/dashboard/darth'
  },
  {
    id: 'maestro',
    name: 'Maestro',
    title: 'Nivel Legendario',
    description: 'Para los verdaderos maestros del trading que buscan perfeccionar su arte.',
    features: [
      'Todas las funcionalidades premium',
      'Mentoría de nivel legendario',
      'Estrategias exclusivas',
      'Red de maestros',
      'Consultoría estratégica avanzada'
    ],
    color: 'bg-yellow-500',
    gradient: 'from-yellow-500 to-yellow-600',
    image: '/images/default-avatar.png',
    path: '/dashboard/maestro'
  }
];

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Crypto Force
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Selecciona tu rango y accede a tu dashboard personalizado
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105`}
              onClick={() => setSelectedRole(role)}
            >
              <div className={`bg-gradient-to-br ${role.gradient} rounded-2xl p-6 shadow-2xl border border-gray-700 hover:border-white/20 transition-all duration-300`}>
                {/* Role Image */}
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
                    <Image
                      src={role.image}
                      alt={role.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  </div>
                </div>

                {/* Role Info */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{role.name}</h3>
                  <p className="text-sm text-white/80 mb-2">{role.title}</p>
                  <p className="text-sm text-white/70 mb-4">{role.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {role.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center text-xs text-white/80">
                        <div className="w-2 h-2 bg-white/60 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                    {role.features.length > 3 && (
                      <div className="text-xs text-white/60">
                        +{role.features.length - 3} características más
                      </div>
                    )}
                  </div>

                  {/* Access Button */}
                  <Link
                    href={role.path}
                    className={`inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40`}
                  >
                    Acceder al Dashboard
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm">
          <p>© 2024 Crypto Force. Todos los derechos reservados.</p>
        </div>
      </div>

      {/* Role Detail Modal */}
      {selectedRole && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{selectedRole.name}</h2>
                <p className="text-lg text-gray-300">{selectedRole.title}</p>
              </div>
              <button
                onClick={() => setSelectedRole(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <p className="text-gray-300 mb-6">{selectedRole.description}</p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Características incluidas:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedRole.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href={selectedRole.path}
                className={`flex-1 px-6 py-3 bg-gradient-to-r ${selectedRole.gradient} text-white font-semibold rounded-lg text-center hover:opacity-90 transition-opacity`}
              >
                Acceder Ahora
              </Link>
              <button
                onClick={() => setSelectedRole(null)}
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 