'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Crown,
  Shield,
  Sword,
  Eye,
  Flame,
  Star,
  Zap,
  Lock,
  Unlock
} from 'lucide-react';
import { useSafeAuth } from '@/context/AuthContext';

interface DashboardOption {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  path: string;
  level: number;
  emblem: string;
  philosophy: string;
  image: string;
  requirements: string;
  benefits: string[];
}

export default function DashboardSelectionPage() {
  const router = useRouter();
  const { userData, isReady } = useSafeAuth();
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  // Debug del router
  useEffect(() => {
    console.log('🔄 Router state:', {
      pathname: window.location.pathname,
      router: router
    });
  }, [router]);

  const dashboardOptions: DashboardOption[] = [
    {
      id: 'iniciado',
      title: 'INICIADO',
      color: '#FAFAFA',
      icon: <Shield className="w-8 h-8" />,
      path: '/dashboard/iniciado',
      level: 1,
      emblem: '⚪',
      description: 'El primer paso en el camino del poder',
      philosophy: 'Apertura al conocimiento y primeros pasos en el trading',
      image: '/images/insignias/1-iniciados.png',
      requirements: 'Acceso básico a la plataforma',
      benefits: [
        'Acceso al contenido fundamental',
        'Evaluaciones de progreso',
        'Comunidad de iniciados'
      ]
    },
    {
      id: 'acolito',
      title: 'ACÓLITO',
      color: '#FFD447',
      icon: <Eye className="w-8 h-8" />,
      path: '/dashboard/acolito',
      level: 2,
      emblem: '🟡',
      description: 'Despertar de la sombra interior',
      philosophy: 'Iluminación de verdades ocultas y curiosidad por el poder',
      image: '/images/insignias/2-acolitos.png',
      requirements: 'Completar 70% del contenido de Iniciado',
      benefits: [
        'Contenido avanzado',
        'Herramientas de análisis',
        'Acceso a mentorías'
      ]
    },
    {
      id: 'warrior',
      title: 'WARRIOR',
      color: '#3ED598',
      icon: <Sword className="w-8 h-8" />,
      path: '/dashboard/warrior',
      level: 3,
      emblem: '🟢',
      description: 'Integración de disciplina y pasión',
      philosophy: 'Energía controlada y crecimiento en habilidad y conciencia',
      image: '/images/insignias/3-warriors.png',
      requirements: 'Completar 80% del contenido de Acólito',
      benefits: [
        'Estrategias avanzadas',
        'Acceso a operaciones reales',
        'Comunidad exclusiva'
      ]
    },
    {
      id: 'lord',
      title: 'LORD',
      color: '#4671D5',
      icon: <Crown className="w-8 h-8" />,
      path: '/dashboard/lord',
      level: 4,
      emblem: '🔵',
      description: 'Visión estratégica y patrones elevados',
      philosophy: 'Autoridad, planificación y percepción elevada',
      image: '/images/insignias/4-lords.png',
      requirements: 'Completar 90% del contenido de Warrior',
      benefits: [
        'Liderazgo de equipos',
        'Estrategias maestras',
        'Acceso VIP completo'
      ]
    },
    {
      id: 'darth',
      title: 'DARTH',
      color: '#EC4D58',
      icon: <Flame className="w-8 h-8" />,
      path: '/dashboard/darth',
      level: 5,
      emblem: '🔴',
      description: 'Transmutación de la sombra en poder',
      philosophy: 'Dominio de la energía destructiva y creativa',
      image: '/images/insignias/5-darths.png',
      requirements: 'Completar 95% del contenido de Lord',
      benefits: [
        'Poder máximo',
        'Control total',
        'Maestría absoluta'
      ]
    },
    {
      id: 'maestro',
      title: 'MAESTRO',
      color: '#8A8A8A',
      icon: <Star className="w-8 h-8" />,
      path: '/dashboard/maestro',
      level: 6,
      emblem: '⚫',
      description: 'Integración plena del ser interior',
      philosophy: 'Equilibrio, control absoluto y presencia silenciosa',
      image: '/images/insignias/6-maestros.png',
      requirements: 'Acceso exclusivo para usuarios autorizados',
      benefits: [
        'Iluminación total',
        'Sabiduría infinita',
        'Transcendencia'
      ]
    }
  ];

  // Lista de emails autorizados para acceder a la dashboard de Maestro
  const MAESTRO_AUTHORIZED_EMAILS = [
    'infocryptoforce@gmail.com',
    'coeurdeluke.js@gmail.com'
  ];

  // Determinar el nivel del usuario basado en userData
  const getUserLevel = () => {
    if (!userData) return 1;
    
    // Para usuarios fundadores, asignar nivel 6 (Maestro) pero permitir acceso total
    if (userData.email && MAESTRO_AUTHORIZED_EMAILS.includes(userData.email.toLowerCase().trim())) {
      return 6; // Nivel de Maestro (pero se mostrará como "Fundador")
    }
    
    return userData.user_level || 1;
  };

  // Función para obtener el texto del rol a mostrar
  const getRoleDisplayText = () => {
    if (!userData) return 'Iniciado';
    
    // Para usuarios fundadores específicos, mostrar "Fundador"
    if (userData.email && MAESTRO_AUTHORIZED_EMAILS.includes(userData.email.toLowerCase().trim())) {
      return 'Fundador';
    }
    
    // Para otros usuarios, usar el nivel normal
    const level = userData.user_level || 1;
    const option = dashboardOptions.find(o => o.level === level);
    return option ? option.title : 'Iniciado';
  };

  const userLevel = getUserLevel();
  const roleDisplayText = getRoleDisplayText();

  // Debug: Mostrar información del usuario
  useEffect(() => {
    if (userData) {
      console.log('🔍 Dashboard Selection - Debug:', {
        userEmail: userData.email,
        userLevel: userData.user_level,
        calculatedLevel: userLevel,
        roleDisplayText: roleDisplayText,
        isFundador: MAESTRO_AUTHORIZED_EMAILS.includes(userData.email?.toLowerCase().trim() || ''),
        canAccessAll: userLevel === 6 && MAESTRO_AUTHORIZED_EMAILS.includes(userData.email?.toLowerCase().trim() || ''),
        totalOptions: dashboardOptions.length
      });
      
      // Debug adicional para verificar acceso a cada dashboard
      dashboardOptions.forEach(option => {
        const canAccess = canAccessRole(option.level);
        console.log(`🔓 Acceso a ${option.title} (nivel ${option.level}): ${canAccess ? '✅' : '❌'}`);
      });
      
      // Debug para verificar redirección
      console.log('📍 Estado de redirección:', {
        currentPath: window.location.pathname,
        targetPath: '/dashboard/maestro',
        userLevel,
        isFundador: MAESTRO_AUTHORIZED_EMAILS.includes(userData.email?.toLowerCase().trim() || '')
      });
    }
  }, [userData, userLevel, roleDisplayText]);

  // Verificar si el usuario puede acceder a cada rol
  const canAccessRole = (roleLevel: number) => {
    // Debug de la función
    console.log(`🔍 canAccessRole(${roleLevel}):`, {
      userLevel,
      userEmail: userData?.email,
      isFundador: MAESTRO_AUTHORIZED_EMAILS.includes(userData?.email?.toLowerCase().trim() || ''),
      shouldHaveAccess: userLevel === 6 && MAESTRO_AUTHORIZED_EMAILS.includes(userData?.email?.toLowerCase().trim() || ''),
      MAESTRO_AUTHORIZED_EMAILS
    });
    
    // Fundadores (nivel 6) tienen acceso a todos los dashboards
    if (userLevel === 6 && MAESTRO_AUTHORIZED_EMAILS.includes(userData?.email?.toLowerCase().trim() || '')) {
      console.log('👑 Usuario fundador detectado, acceso total permitido');
      return true;
    }
    
    // Otros usuarios solo pueden acceder a su nivel y niveles inferiores
    const hasAccess = roleLevel <= userLevel;
    console.log(`📊 Usuario normal: nivel ${userLevel}, acceso a nivel ${roleLevel}: ${hasAccess ? '✅' : '❌'}`);
    return hasAccess;
  };

  // Mostrar loading mientras no esté listo
  if (!isReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#ec4d58] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-white mt-4">Cargando tu perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f]">
      {/* Header */}
      <div className="relative z-10 pt-8 pb-6 px-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Selecciona tu <span className="text-[#ec4d58]">Camino de Poder</span>
            </h1>
            <p className="text-[#8a8a8a] text-lg max-w-3xl mx-auto">
              Cada rango representa una etapa en tu evolución como trader y como individuo. 
              Elige sabiamente tu próximo paso en el camino hacia la maestría.
            </p>
          </div>

          {/* Información del usuario */}
          {userData && (
            <div className="bg-[#1e1e1e]/50 backdrop-blur-sm rounded-xl p-6 border border-[#2a2a2a] mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src={dashboardOptions.find(o => o.level === userLevel)?.image || ''}
                    alt="Tu insignia actual"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-white text-xl font-semibold">{userData.nickname}</h3>
                  <p className="text-[#8a8a8a]">
                    Tu rol: <span className="text-[#FF8C42] font-semibold">{roleDisplayText}</span>
                  </p>
                </div>
              </div>
              <p className="text-[#a0a0a0] text-center text-sm">
                {dashboardOptions.find(o => o.level === userLevel)?.philosophy}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Grid de roles */}
      <div className="relative z-10 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Botón de prueba temporal */}
          <div className="text-center mt-8 mb-4">
            <button
              onClick={() => {
                console.log('🧪 Botón de prueba clickeado');
                console.log('📍 Intentando navegar a /dashboard/maestro');
                console.log('🧭 Router antes de navegar:', router);
                
                try {
                  router.push('/dashboard/maestro');
                  console.log('✅ Router.push ejecutado exitosamente para prueba');
                } catch (error) {
                  console.error('❌ Error en router.push de prueba:', error);
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              🧪 PRUEBA: Ir a Dashboard Maestro
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardOptions.map((option) => {
              const isAccessible = canAccessRole(option.level);
              const isCurrentLevel = option.level === userLevel;
              
              // Debug del renderizado de cada opción
              console.log(`🎨 Renderizando ${option.title}:`, {
                isAccessible,
                isCurrentLevel,
                level: option.level,
                path: option.path
              });
              
              return (
                <div
                  key={option.id}
                  className={`group relative overflow-hidden rounded-xl border transition-all duration-300 transform hover:scale-105 ${
                    isCurrentLevel
                      ? 'border-[#ec4d58] shadow-lg shadow-[#ec4d58]/20'
                      : isAccessible
                      ? 'border-[#2a2a2a] hover:border-[#3a3a3a]'
                      : 'border-[#1a1a1a] opacity-60'
                  } ${isAccessible ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  onClick={() => {
                    if (isAccessible) {
                      console.log(`🚀 Intentando acceder a ${option.title} (${option.path})`);
                      router.push(option.path);
                    } else {
                      console.log(`❌ Acceso denegado a ${option.title} (nivel ${option.level})`);
                    }
                  }}
                  onMouseEnter={() => setHoveredRole(option.id)}
                  onMouseLeave={() => setHoveredRole(null)}
                >
                  {/* Fondo con gradiente */}
                  <div 
                    className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                    style={{ background: `linear-gradient(135deg, ${option.color}20, ${option.color}10)` }}
                  />
                  
                  {/* Contenido */}
                  <div className="relative p-6">
                    {/* Header del emblema */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 relative">
                        <Image
                          src={option.image}
                          alt={`Insignia ${option.title}`}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                          onLoad={() => console.log(`✅ Imagen cargada exitosamente: ${option.image}`)}
                          onError={(e) => {
                            console.error(`❌ Error cargando imagen: ${option.image}`);
                            // Fallback a un emoji si la imagen falla
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        {/* Fallback emoji si la imagen falla */}
                        <div 
                          className="w-full h-full flex items-center justify-center text-2xl hidden"
                          style={{ display: 'none' }}
                        >
                          {option.emblem}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isCurrentLevel && (
                          <div className="bg-[#ec4d58] text-white text-xs px-2 py-1 rounded-full font-medium">
                            Actual
                          </div>
                        )}
                        {isAccessible ? (
                          <Unlock className="w-5 h-5 text-green-400" />
                        ) : (
                          <Lock className="w-5 h-5 text-[#6a6a6a]" />
                        )}
                      </div>
                    </div>

                    {/* Título y descripción */}
                    <h3 className="text-white text-xl font-semibold mb-2">{option.title}</h3>
                    <p className="text-[#8a8a8a] text-sm mb-4">{option.description}</p>

                    {/* Filosofía */}
                    <div className="bg-[#1a1a1a]/50 rounded-lg p-3 border border-[#2a2a2a] mb-4">
                      <p className="text-[#a0a0a0] text-xs leading-relaxed">
                        {option.philosophy}
                      </p>
                    </div>

                    {/* Requisitos */}
                    <div className="mb-4">
                      <h4 className="text-[#8a8a8a] text-xs font-semibold mb-2">REQUISITOS</h4>
                      <p className="text-[#a0a0a0] text-xs">{option.requirements}</p>
                    </div>

                    {/* Beneficios */}
                    <div className="mb-4">
                      <h4 className="text-[#8a8a8a] text-xs font-semibold mb-2">BENEFICIOS</h4>
                      <ul className="space-y-1">
                        {option.benefits.map((benefit, index) => (
                          <li key={index} className="text-[#a0a0a0] text-xs flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: option.color }}></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>



                    {/* Botón de acceso */}
                    {isAccessible ? (
                      <button
                        onClick={() => {
                          console.log(`🚀 Botón clickeado: ${option.title} -> ${option.path}`);
                          console.log('📍 Datos del botón:', {
                            title: option.title,
                            path: option.path,
                            level: option.level,
                            isAccessible,
                            isCurrentLevel
                          });
                          console.log('🧭 Router antes de navegar:', router);
                          console.log('🧭 Intentando navegar a:', option.path);
                          
                          // Debug adicional
                          console.log('🔍 URL actual antes de navegar:', window.location.href);
                          console.log('🔍 Pathname actual:', window.location.pathname);
                          
                          try {
                            router.push(option.path);
                            console.log('✅ Router.push ejecutado exitosamente');
                            
                            // Verificar si la URL cambió después de un breve delay
                            setTimeout(() => {
                              console.log('🔍 URL después de navegar:', window.location.href);
                              console.log('🔍 Pathname después de navegar:', window.location.pathname);
                            }, 100);
                            
                          } catch (error) {
                            console.error('❌ Error en router.push:', error);
                          }
                        }}
                        className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
                          isCurrentLevel
                            ? 'text-white'
                            : `text-white`
                        }`}
                        style={{
                          backgroundColor: isCurrentLevel ? option.color : option.color + '20',
                          border: isCurrentLevel ? undefined : `1px solid ${option.color}40`
                        }}
                      >
                        {isCurrentLevel ? 'Acceder a mi Dashboard' : 'Acceder al Dashboard'}
                      </button>
                    ) : (
                      <div className="w-full py-2 px-4 rounded-lg font-medium text-sm bg-[#1a1a1a] text-[#6a6a6a] text-center">
                        Bloqueado
                      </div>
                    )}
                  </div>

                  {/* Borde de color sutil */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300"
                    style={{ backgroundColor: option.color }}
                  />
                </div>
              );
            })}
          </div>

          {/* Mensaje para niveles superiores */}
          {userLevel < 6 && (
            <div className="text-center mt-8">
              <div className="bg-[#1e1a1a]/50 border border-[#2a2a2a] rounded-xl p-6 max-w-2xl mx-auto">
                <Zap className="w-8 h-8 text-[#ec4d58] mx-auto mb-3" />
                <h3 className="text-white text-lg font-semibold mb-2">El Camino Continúa</h3>
                <p className="text-[#8a8a8a] text-sm">
                  Cada nivel desbloquea nuevas capacidades y profundiza tu comprensión del trading. 
                  La disciplina y la práctica constante son las claves para ascender.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fondo con elementos sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 border border-[#2a2a2a] transform rotate-45 opacity-20"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-[#2a2a2a] transform -rotate-45 opacity-20"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-[#2a2a2a] transform rotate-12 opacity-20"></div>
        <div className="absolute bottom-40 right-1/4 w-28 h-28 border border-[#2a2a2a] transform -rotate-12 opacity-20"></div>
      </div>
    </div>
  );
}
