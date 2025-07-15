'use client';
import React, { useState } from 'react';
import BackButton from '@/components/ui/BackButton';
import { Droplet, Gem, Hammer, TrendingUp, ChevronDown, ChevronUp, CheckCircle, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function CorrelacionesMercadosContenido() {
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
      title: "A) Petróleo Crudo",
      content: (
        <div className="space-y-6">
          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3 flex items-center gap-2">
              <Droplet className="w-5 h-5" />
              Impacto General del Petróleo
            </h4>
            <p className="text-gray-300 mb-3">
              El precio del petróleo crudo dulce ligero (Light Sweet Oil) puede tener un gran efecto sobre 
              el mercado de divisas, y afecta especialmente a divisas tales como el dólar canadiense (CAD), 
              el dólar estadounidense (USD) y el yen japonés (JPY) por diferentes razones.
            </p>
            <p className="text-gray-300">
              Debido a que el precio del petróleo ha variado de manera significativa (entre $130 - $50), 
              el impacto de los altos/bajos precios del petróleo continúa teniendo un efecto severo sobre 
              la economía global.
            </p>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">CAD - Dólar Canadiense</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>El petróleo representa alrededor del 8% de la economía de Canadá</li>
              <li>Por cada dólar que sube el precio del petróleo, la economía canadiense tiende a beneficiarse</li>
              <li>Canadá es el noveno productor de petróleo crudo más grande del mundo</li>
              <li>Entre 2004 y 2005, la correlación semanal estuvo cerca del 70%</li>
              <li>Si repuntaban los precios del petróleo, era altamente probable que el dólar canadiense subiera también</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">USD - Dólar Estadounidense</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Canadá es el principal proveedor de petróleo de los Estados Unidos</li>
              <li>Estados Unidos consume más petróleo proveniente de Canadá que del Medio Oriente</li>
              <li>Los altos precios del petróleo tienden a reducir la capacidad de los Estados Unidos de continuar siendo productivo</li>
              <li>Puede tener un efecto serio sobre industrias como el sector aerocomercial, químico, automotor y producción industrial</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">USD/CAD - Doble Reacción</h4>
            <p className="text-gray-300 mb-3">
              El par de divisas USD/CAD tiene una doble reacción ante el cambio en el precio del petróleo:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Si el petróleo sube, tiende a beneficiar al CAD a la vez que ejerce presión sobre el USD</li>
              <li>El par USD/CAD tiende a moverse con reacciones bruscas a medida que el precio del petróleo sube o baja</li>
              <li>Entre 2004-2005, cuando el petróleo se acercó a la barrera psicológica de los $50 dólares/barril, el par USD/CAD se negoció cerca de 1,2500</li>
              <li>Cuando el precio del petróleo superó los $50 dólares, el par USD/CAD cayó por debajo del nivel de 1,2500</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">JPY - Yen Japonés</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Japón importa el 99% del petróleo que consume</li>
              <li>Su economía tiende a beneficiarse cuando los precios del petróleo caen</li>
              <li>La economía está generalmente bajo tensión durante períodos de altos precios del petróleo</li>
              <li>La mayoría de las principales industrias depende del petróleo día a día</li>
              <li>Las industrias japonesas no son capaces de mantener el mismo nivel de crecimiento a largo plazo debido al aumento en el costo de producción</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">💡 Aplicación Práctica</h4>
            <p className="text-gray-300">
              Los operadores que se dan cuenta de esta correlación entre mercados pueden operar en el mercado 
              de divisas con una tendencia, dependiendo de su mercado de commodities respectivo. Es importante 
              destacar estas relaciones entre los mercados y cómo influyen en las tendencias a largo plazo.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "B) Oro",
      content: (
        <div className="space-y-6">
          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3 flex items-center gap-2">
              <Gem className="w-5 h-5" />
              Oro como Refugio Seguro
            </h4>
            <p className="text-gray-300 mb-3">
              El precio del oro tiende a tener una muy fuerte correlación o relación con divisas tales como 
              el CHF, y una correlación opuesta o inversa con el USD. Hasta hace poco tiempo, el CHF estaba 
              respaldado por el oro, de la misma manera en que lo estaba el USD un par de décadas atrás.
            </p>
            <p className="text-gray-300">
              El oro es considerado un "refugio seguro" para el capital durante épocas de malestar político y/o económico.
            </p>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Flujo de Capital</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>A medida que el capital se aleja del USD, el oro tiende a beneficiarse</li>
              <li>El capital se ve atraído por bienes tangibles, tales como los metales preciosos, principalmente el oro, en tiempos de incertidumbre</li>
              <li>Durante épocas de prosperidad, el capital abandonará la seguridad del oro</li>
              <li>El capital se trasladará a instrumentos financieros más especulativos, como los mercados de acciones</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">EUR como "Anti-Dólar"</h4>
            <p className="text-gray-300 mb-3">
              El EUR (EUR/USD) ha sido considerado el "anti-dólar" debido a que al alejarse el capital del USD, 
              los inversionistas constantemente buscan un instrumento financiero relativamente seguro, al menos en el corto plazo.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>El USD tiende a caer durante épocas de inestabilidad económica y/o política dentro de los Estados Unidos</li>
              <li>Cuando esto sucede, el capital es propenso a buscar instrumentos financieros que brindan beneficios como una "inversión alternativa" al USD</li>
              <li>Si la economía de los Estados Unidos está bajo presión, es probable que la economía de la Zona Euro sea la receptora del capital</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">USD/CHF & EUR/USD</h4>
            <p className="text-gray-300 mb-3">
              El precio del oro también tiende a tener un efecto doble sobre el par de divisas USD/CHF:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>A medida que aumenta el precio del oro, el USD tiende a disminuir en valor a la vez que el CHF tiende a beneficiarse</li>
              <li>Tanto el oro como el CHF son considerados instrumentos financieros seguros y conservadores</li>
              <li>Cualquier cambio en su valor tiende a tener un fuerte impacto sobre el otro</li>
              <li>A medida que aumenta el precio del oro, el capital tiende a salirse del USD, mientras que el CHF tiende a beneficiarse</li>
              <li>El par EUR/USD tiende a tener una fuerte correlación con el precio del oro</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">📊 Correlación Visual</h4>
            <p className="text-gray-300">
              En los gráficos diarios, el oro y el par de divisas USD/CHF son casi una imagen perfecta del otro, 
              mostrando el flujo de capital fuera del USD e invertido en oro o fuera del oro e invertido en USD.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "C) Cobre",
      content: (
        <div className="space-y-6">
          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3 flex items-center gap-2">
              <Hammer className="w-5 h-5" />
              Cobre y Australia
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Australia es la segunda productora más grande del mundo de cobre, con una producción de alrededor de 261 toneladas al año</li>
              <li>Sudáfrica es la primera con una producción de 345 toneladas</li>
              <li>Más de la mitad de las exportaciones de Australia son metales</li>
              <li>Esto resulta en una fuerte correlación entre los metales y el dólar australiano</li>
              <li>Principalmente el oro y el cobre tienen un gran efecto</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Sector de Viviendas</h4>
            <p className="text-gray-300 mb-3">
              El precio del cobre desempeña un papel importante no sólo en la economía australiana sino también en diferentes sectores:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>El sector de viviendas (los constructores) utiliza una gran cantidad de cobre para cañerías y otros artefactos</li>
              <li>La economía australiana se ha beneficiado con un muy fuerte mercado de viviendas durante los últimos años</li>
              <li>Todos estos elementos están relacionados en ciclos económicos a largo plazo</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Tasas de Interés y Mercado de Viviendas</h4>
            <p className="text-gray-300 mb-3">
              Debido a que la economía de los Estados Unidos y muchas otras economías en el mundo están cayendo 
              bajo presión, el FOMC (EE.UU.) y otros bancos centrales del mundo bajaron sus tasas de interés 
              a fin incentivar el crecimiento económico alrededor del mundo.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Las tasas de interés más bajas facilitaron al consumidor promedio la compra de hogares nuevos</li>
              <li>Esto ha generado un gran beneficio sobre el dólar australiano</li>
              <li>Los inversionistas buscaron otros instrumentos financieros y materias primas como el oro, la plata, y el cobre</li>
              <li>Las tasas de interés bajas reactivaron el mercado de viviendas</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Carry Trade y AUD</h4>
            <p className="text-gray-300 mb-3">
              Cuando subieron el cobre, el oro, y el mercado de viviendas de Australia, el Banco de Reserva 
              de Australia (Reserve Bank of Australia) subió las tasas de interés para combatir el riesgo de inflación.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Al subir rápidamente las tasas de interés de AUD, el capital del mundo se volcó al AUD</li>
              <li>El AUD daba un retorno significativamente superior al de otras divisas principales como USD, CHF, CAD, y JPY</li>
              <li>Una de las únicas divisas que actualmente tiene una tasa de interés más alta es el NZD</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Estrategia de Carry Trade</h4>
            <p className="text-gray-300 mb-3">
              La operación de financiación conocida como "carry trade" consiste en la compra de una divisa 
              a una tasa de interés más alta y la venta de otra a una tasa de interés más baja.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>No sólo deben estudiar las tasas de interés actuales sino también la anticipación de las tasas de interés futuras</li>
              <li>El mercado forex se mueve en anticipación a tasas de interés más altas o bajas</li>
              <li>El mercado de divisas es un "mecanismo anticipatorio"</li>
              <li>Si el Gobierno de Australia anuncia cifras que indican que el mercado de viviendas está más lento, 
                  los operadores pueden anticipar que la Reserva de Australia dejará de elevar las tasas de interés</li>
            </ul>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">💡 Consejo para Operadores</h4>
            <p className="text-gray-300">
              Los operadores que siguen el comportamiento del AUD deben además observar la acción del precio 
              del cobre al igual que los informes fundamentales emitidos desde Australia que estén relacionados 
              con sus mercados de viviendas.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "D) Prueba: Correlaciones",
      content: (
        <div className="space-y-6">
          <div className="bg-[#232323] p-4 rounded-lg text-center">
            <h4 className="font-semibold text-[#ec4d58] mb-3">Evaluación del Conocimiento</h4>
            <p className="text-gray-300 mb-4">
              Por favor evalúe su conocimiento sobre lo aprendido en esta lección sobre correlaciones entre mercados.
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
            <h4 className="font-semibold text-[#ec4d58] mb-3">📊 Resumen de Correlaciones Clave</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-semibold text-[#ec4d58] mb-2">🛢️ Petróleo</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• CAD: Correlación positiva ~70%</li>
                  <li>• USD: Presión bajista</li>
                  <li>• JPY: Beneficiado por caídas</li>
                </ul>
              </div>
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-semibold text-[#ec4d58] mb-2">🥇 Oro</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• CHF: Correlación positiva</li>
                  <li>• USD: Correlación negativa</li>
                  <li>• EUR: "Anti-dólar"</li>
                </ul>
              </div>
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-semibold text-[#ec4d58] mb-2">🔧 Cobre</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• AUD: Correlación fuerte</li>
                  <li>• Sector viviendas</li>
                  <li>• Carry trade</li>
                </ul>
              </div>
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-semibold text-[#ec4d58] mb-2">📈 Aplicación</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Anticipar movimientos</li>
                  <li>• Confirmar señales</li>
                  <li>• Gestión de riesgo</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#232323] p-4 rounded-lg">
            <h4 className="font-semibold text-[#ec4d58] mb-3">🎯 Puntos Clave para Recordar</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Las correlaciones pueden cambiar con el tiempo, mantente actualizado</li>
              <li>No todas las correlaciones son perfectas, usa múltiples confirmaciones</li>
              <li>Los commodities pueden anticipar movimientos en las divisas</li>
              <li>Considera el contexto económico al analizar correlaciones</li>
              <li>El carry trade requiere análisis de tasas de interés futuras</li>
              <li>Las correlaciones son herramientas complementarias, no sustitutas del análisis técnico</li>
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
              Lección 7: Correlaciones entre Mercados
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Análisis Fundamental
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <span>🛢️ Petróleo</span>
              <span>•</span>
              <span>🥇 Oro</span>
              <span>•</span>
              <span>🔧 Cobre</span>
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
                  <span className="text-2xl font-bold text-gray-400">{(index + 1).toString().padStart(2, '0')}</span>
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
            <h3 className="text-xl font-bold text-[#ec4d58] mb-4">🎯 Próximos Pasos</h3>
            <p className="text-gray-300 mb-4">
              Has completado el módulo de Correlaciones entre Mercados. Ahora entiendes cómo los commodities 
              influyen en las divisas. Continúa con el siguiente módulo para desarrollar estrategias de 
              gestión de riesgo avanzada.
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