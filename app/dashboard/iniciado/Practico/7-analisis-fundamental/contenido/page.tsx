'use client';
import React, { useState } from 'react';
import BackButton from '@/components/ui/BackButton';
import { BookOpen, Users, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

export default function AnalisisFundamentalContenido() {
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const sections = [
    {
      title: "A) ¿Qué es el Análisis Fundamental?",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            El análisis fundamental consiste en predecir las cotizaciones futuras de cierto instrumento financiero 
            basado en el estudio de factores económicos y políticos.
          </p>
          <p className="text-gray-300 leading-relaxed">
            En términos sencillos, el análisis fundamental es el análisis del mercado en función de la relación 
            entre factores económicos y/o políticos y su influencia en la cotización de cierta divisa. El análisis 
            fundamental evalúa los factores económicos y las condiciones geopolíticas (tales como los números de 
            la economía, los flujos de capital, y los principales acontecimientos políticos) a fin de anticipar 
            los tipos de cambio.
          </p>
        </div>
      )
    },
    {
      title: "B) Estructura del Mercado de Divisas",
      content: (
        <div className="space-y-4">
          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-2">Características Principales:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>El Mercado de divisas es un mercado extrabursátil (OTC, por sus siglas en inglés) que no está centralizado en ninguna bolsa.</li>
              <li>Los operadores pueden elegir entre las diferentes empresas que ofrecen el servicio de compensación de operaciones.</li>
            </ul>
          </div>
          <p className="text-gray-300 leading-relaxed">
            En el mercado de divisas hay muchos agentes cuyo negocio es unir a compradores y vendedores. 
            Cada agente tiene la habilidad y la autoridad de ejecutar las operaciones independientemente del resto. 
            Esta estructura es inherentemente competitiva ya que los operadores tienen la posibilidad de elegir 
            entre diferentes empresas que tienen la misma habilidad de ejecutar sus operaciones.
          </p>
          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-2">Ventajas del Mercado FX:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Estructura altamente descentralizada</li>
              <li>Competencia entre agentes</li>
              <li>Mejores precios y servicios</li>
              <li>Innovación constante</li>
            </ul>
          </div>
          <p className="text-gray-300 leading-relaxed">
            A diferencia de los principales mercados de futuros y acciones, la estructura del mercado FX es 
            altamente descentralizada. Esto significa que no hay un lugar central donde se realizan las operaciones. 
            La Bolsa de Nueva York (NYSE, por sus siglas en inglés), por ejemplo, es una bolsa totalmente centralizada.
          </p>
        </div>
      )
    },
    {
      title: "C) Participantes Claves del Mercado",
      content: (
        <div className="space-y-6">
          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Bancos Comerciales y de Inversión</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Conforman el mercado "Interbancario" y operan mediante sistemas de correaje electrónico (EBS)</li>
              <li>Operan entre ellos mediante fuertes relaciones de crédito</li>
              <li>Conforman la mayor parte de la compraventa de divisas</li>
              <li>Operan por cuenta propia y a través del flujo de clientes</li>
              <li>Estas operaciones ascienden a miles de millones de dólares por día</li>
            </ul>
          </div>
          
          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Ventajas de los Bancos:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Información importante sobre dirección y volumen del flujo de capitales</li>
              <li>Gran poder del capital para defender posiciones</li>
              <li>Grandes departamentos de investigación</li>
              <li>Análisis técnico y fundamental para sus operadores</li>
            </ul>
          </div>

          <p className="text-gray-300 leading-relaxed">
            El mercado interbancario está compuesto por los bancos comerciales y de inversión más grandes 
            del mundo y en él tiene lugar el mayor volumen de operaciones comerciales así como una gran 
            cantidad de compraventa intradía especulativa.
          </p>
        </div>
      )
    },
    {
      title: "D) Participantes Claves del Mercado (Cont.)",
      content: (
        <div className="space-y-6">
          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Corporaciones</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Utilizan principalmente las divisas para protegerse en caso de depreciación</li>
              <li>Compran y venden divisas para cumplir con la nómina de oficinas internacionales</li>
              <li>Realizan transacciones de bienes que requieren operaciones con divisas</li>
              <li>Protegen posiciones pendientes de pago contra depreciación de moneda</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Bancos Centrales</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Tienen acceso a grandes reservas de capitales</li>
              <li>Tienen objetivos económicos específicos</li>
              <li>Regulan la oferta de dinero y las tasas de interés</li>
              <li>Cambian el tipo de interés de un día a otro</li>
              <li>Compran y venden títulos públicos</li>
              <li>Compran y venden su moneda local en el mercado abierto</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Fondos Globales Administrados</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Invierten en instrumentos financieros en divisas</li>
              <li>Re-encuadran y ajustan capital internacional y carteras de renta fija</li>
              <li>Pueden causar grandes impactos en movimientos de cotizaciones</li>
              <li>Su participación total en el mercado oscila en un 20%</li>
              <li>Implementan estrategias de operaciones de cobertura de riesgo</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Particulares</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Acceso total al mercado cambiario de contado</li>
              <li>Operan con divisas tanto para fines especulativos como de cobertura</li>
              <li>La participación minorista está creciendo rápidamente</li>
              <li>Spreads más amplios pero ejecución inigualable</li>
              <li>Spreads fijos a diferencia de los fluctuantes del mercado interbancario</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "E) Intervención - El Banco de Japón",
      content: (
        <div className="space-y-6">
          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">¿Qué significa intervención?</h4>
            <p className="text-gray-300 mb-3">
              El intento de un banco central de mover intencionalmente el tipo de cambio. 
              Fundamentalmente, las intervenciones son intentos realizados por bancos centrales, 
              es decir, bancos que controlan el valor de sus respectivas monedas, de manipular el valor de la moneda.
            </p>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Caso del Banco de Japón:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>La economía de Japón depende de sus exportaciones</li>
              <li>Se beneficia con un yen más débil</li>
              <li>El Banco de Japón intervino muchas veces vendiendo billones de yenes</li>
              <li>En 2003 gastó más de 13 billones de yenes (o $115 mil millones)</li>
              <li>Intervino entre los niveles de 115 y 116</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Riesgos de las Operaciones Basadas en Intervención:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li><strong>Sustentabilidad:</strong> El banco central no puede sustentar la intervención indefinidamente</li>
              <li><strong>Timing:</strong> Nunca se conoce el momento exacto de la intervención</li>
              <li><strong>Riesgo de pérdidas:</strong> Posibles pérdidas flotantes grandes mientras se espera</li>
              <li><strong>Margin call:</strong> Riesgo de recibir solicitud de margen antes de la intervención</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "F) Intervención del Banco de Japón: ¿Cómo Reaccionaron los Operadores?",
      content: (
        <div className="space-y-6">
          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Caso de Estudio: 19 de mayo de 2004</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>El USD/JPY alcanzó un mínimo de 115,07</li>
              <li>El Banco de Japón sabía que había una formación de "cabeza y hombros"</li>
              <li>La línea de clavícula (neckline) estaba en 115</li>
              <li>Intervino para sostener el tipo de cambio</li>
              <li>115 era un nivel significativo técnico y fundamental</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Formación de Cabeza y Hombros:</h4>
            <p className="text-gray-300 mb-3">
              La formación de cabeza y hombros consiste en un patrón de gráfico que incluye un pico que vuelve 
              al soporte (el hombro), seguido de un pico más alto, que también vuelve al soporte (la cabeza). 
              El segundo hombro se produce cuando el tipo de cambio no alcanza el pico de la cabeza sino que 
              alcanza el pico aproximado del hombro izquierdo antes de caer nuevamente al soporte.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>La señal de compraventa es vender cuando el precio cae por debajo del neckline</li>
              <li>El neckline actúa como nivel común de soporte</li>
              <li>Una vez que el precio cae por debajo del neckline, es señal de vender</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "G) Participantes del Mercado en Acción: Los Especuladores vs el Banco",
      content: (
        <div className="space-y-6">
          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Caso Histórico: Banco de Inglaterra 1992</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>El Banco de Inglaterra no logró apoyar el GBP</li>
              <li>Utilizó sus reservas para apoyar la Libra Británica</li>
              <li>Se quedó sin fondos para oponerse a los especuladores</li>
              <li>George Soros fue el especulador más famoso contra el BOE</li>
              <li>Informó una ganancia de $1 mil millones de un día para otro</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Mecanismo de Tipos de Cambio Europeo (ERM):</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Introducido por la Comunidad Europea en 1979</li>
              <li>Parte importante del Sistema Monetario Europeo (EMS)</li>
              <li>Objetivo: reducir variabilidad del tipo de cambio</li>
              <li>Margen pequeño de sólo 2% para fluctuaciones</li>
              <li>Sistema inflexible que no permitía fluctuaciones fuera de márgenes</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Lecciones Aprendidas:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Un banco central no puede operar contra el resto del mercado indefinidamente</li>
              <li>Los principios básicos del mercado son más fuertes que las intervenciones</li>
              <li>Los especuladores pueden unirse para vencer a un banco central</li>
              <li>Este evento fue clave para que Reino Unido no adoptara el Euro</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "H) Prueba: ¿Quién y Qué Mueve el Mercado?",
      content: (
        <div className="space-y-6">
          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Puntos a Discutir:</h4>
            <p className="text-gray-300 mb-3">
              Antes de que se estableciera un tipo de cambio fijo entre las divisas en una fecha determinada, 
              tal como la EMS antes de la creación del Euro, ¿cuál sería el incentivo de un país para realizar 
              una intervención y hacer que su divisa sea más débil frente a otras? ¿Cuál sería el incentivo 
              para mantenerla fuerte frente a otras divisas?
            </p>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg text-center">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Evaluación del Conocimiento</h4>
            <p className="text-gray-300 mb-4">
              Por favor evalúe su conocimiento sobre lo aprendido en esta lección.
            </p>
            <a 
              href="http://www.cursosforex.cl/viewtopic.php?f=5&t=8&sid=1aedce756ccba5161b2d838a22cd9d1b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#ec4d58] hover:bg-[#d63d47] text-white font-semibold rounded-lg transition-colors duration-200"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Realizar Prueba
            </a>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Recursos Adicionales:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li><a href="http://www.dailyfx.com/espanol" target="_blank" rel="noopener noreferrer" className="text-[#ec4d58] hover:underline">DailyFX en Español</a></li>
              <li><a href="http://spanish.fxstreet.com" target="_blank" rel="noopener noreferrer" className="text-[#ec4d58] hover:underline">FXStreet en Español</a></li>
              <li><a href="http://www.fxcmespanol.com/guia-del-forex-1.jsp" target="_blank" rel="noopener noreferrer" className="text-[#ec4d58] hover:underline">Guía del Forex</a></li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <BackButton />
          <div className="text-center mt-6">
            <h1 className="text-4xl md:text-5xl font-bold text-[#ec4d58] mb-4">
              Lección 6: Análisis Fundamental
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              ¿Quién y Qué Mueve el Mercado?
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <span>?? Análisis Fundamental</span>
              <span>•</span>
              <span>?? Mercados FX</span>
              <span>•</span>
              <span>?? Participantes Claves</span>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={index} className="bg-[#181818] rounded-2xl border border-[#232323] overflow-hidden">
              <button
                onClick={() => toggleSection(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-[#232323] transition-colors"
              >
                <h2 className="text-xl font-bold text-[#ec4d58] flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-400">{(index + 1).toString().padStart(2, &apos;0&apos;)}</span>
                  {section.title}
                </h2>
                {expandedSections.includes(index) ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>
              
              {expandedSections.includes(index) && (
                <div className="px-6 pb-6">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="bg-[#181818] rounded-2xl p-6 border border-[#232323]">
            <h3 className="text-xl font-bold text-[#ec4d58] mb-4">?? Próximos Pasos</h3>
            <p className="text-gray-300 mb-4">
              Has completado el módulo de Análisis Fundamental. Ahora tienes una comprensión sólida de 
              quién y qué mueve los mercados. Continúa con el siguiente módulo para desarrollar tus 
              habilidades de gestión de riesgo.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-[#232323] hover:bg-[#2a2a2a] text-white font-semibold rounded-lg transition-colors">
                Módulo Anterior
              </button>
              <button className="px-6 py-3 bg-[#ec4d58] hover:bg-[#d63d47] text-white font-semibold rounded-lg transition-colors">
                Siguiente Módulo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

