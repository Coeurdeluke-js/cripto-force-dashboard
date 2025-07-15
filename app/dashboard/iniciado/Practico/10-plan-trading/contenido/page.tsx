'use client';

import { useState } from 'react';
import { ListChecks, TrendingUp, Shield, Brain, CheckCircle, BookOpen, AlertTriangle, GraduationCap, List, ChevronUp, ChevronDown } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  color: string;
}

function CollapsibleSection({ title, children, icon, color }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors ${color}`}
      >
        <div className="flex items-center">
          <div className="mr-4 text-2xl">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <div className="text-gray-300 leading-relaxed space-y-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PlanTradingContenidoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6">
            <List className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Plan de Trading - Plantilla Completa
          </h1>
          <p className="text-lg text-gray-300">
            Crea tu plan de trading profesional paso a paso
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {/* Introducción */}
          <div className="bg-blue-500/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/30">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <BookOpen className="mr-3 text-blue-400" />
              Introducción
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Hacia el final de 2004, un hilo titulado "¡Uno debe tener un plan de Trading!" se inició en el foro 
                'Trading for a Living' de www.trade2win.com, en T2W. El objetivo del hilo era producir una plantilla 
                en la que todos los operadores, independientemente de la experiencia, los instrumentos negociados, 
                TF, brókers, etc, pudieran crear un plan de trading profesional.
              </p>
              <p>
                Este documento es el resultado de ese hilo. Se compone de dos secciones principales con un tercer 
                apartado que en el tiempo, es de esperar, contenga ejemplos de los planes reales creados utilizando la plantilla.
              </p>
            </div>
          </div>

          {/* PLAN GENERAL DE TRADING */}
          <CollapsibleSection
            title="PLAN GENERAL DE TRADING"
            icon={<BookOpen />}
            color="text-blue-400"
          >
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-white mb-3">1. ¿Qué es un Plan de Trading?</h4>
                <div className="space-y-3">
                  <p>
                    Un plan de trading es un conjunto completo de normas que abarca todos los aspectos de su vida comercial. 
                    Muchos expertos se refieren a la necesidad de tener una "ventaja" para inclinar la balanza de probabilidades 
                    de éxito en su favor.
                  </p>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-sm">
                      <strong>Importante:</strong> En sí mismo, un plan no es una ventaja, pero, con el tiempo, al trader con 
                      un plan le va mucho mejor que al trader que no tiene uno.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">2. ¿Quién necesita un plan de Trading?</h4>
                <p>
                  A menos que haya sido un operador constantemente rentable durante un período de tiempo suficiente para 
                  abarcar una serie de condiciones diferentes del mercado, entonces ¡USTED necesita un plan de trading!
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">3. ¿Qué hará un Plan de Trading?</h4>
                <div className="space-y-3">
                  <p>
                    Un plan de trading hará el acto de operar más simple de lo que sería si se opera sin un plan. 
                    Limitará su probabilidad de hacer operaciones malas y le evitará muchos problemas psicológicos desde la raíz.
                  </p>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">Beneficios Principales:</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• Operar relajado, libre de estrés</li>
                      <li>• Capacidad para controlar su evolución</li>
                      <li>• Prevenir problemas psicológicos desde la raíz</li>
                      <li>• Reducir el número de operaciones malas</li>
                      <li>• Evitar decisiones irracionales en el calor del momento</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* PLANTILLA PLAN DE TRADING */}
          <CollapsibleSection
            title="PLANTILLA PLAN DE TRADING"
            icon={<List />}
            color="text-green-400"
          >
            <div className="space-y-6">
              {/* Sección 5 */}
              <div>
                <h4 className="font-semibold text-white mb-3">5. Conózcase a usted mismo. Conozca sus Objetivos</h4>
                <div className="space-y-4">
                  <p>
                    Casi cualquier operador profesional le dirá que la clave del éxito en los mercados radica en la 
                    comprensión de su propia psique. Muchos operadores inexpertos no están preparados para el asalto 
                    violento a sus pensamientos y emociones al comienzo de sus carreras.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">¿Por qué quiere ser un Trader?</h5>
                      <p className="text-sm">
                        Pregúntese sus verdaderas motivaciones. Examine si sus talentos se adaptan mejor a otro negocio. 
                        ¿Está seguro de que el trading es el negocio correcto para usted?
                      </p>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">¿Qué clase de Trader es Usted?</h5>
                      <p className="text-sm">
                        ¿Es usted un trader discrecional o mecánico? ¿Se propone operar en el largo plazo, mediano plazo 
                        o en el corto plazo?
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">¿Cuáles son sus Fortalezas y Debilidades?</h5>
                    <p className="text-sm">
                      Haga una lista de cada uno de sus puntos fuertes y débiles con respecto al trading y especifique 
                      cómo va a maximizar el beneficio de los primeros y minimizar los daños causados por este último.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sección 6 */}
              <div>
                <h4 className="font-semibold text-white mb-3">6. Objetivos de Trading</h4>
                <div className="space-y-4">
                  <p>
                    Fijar metas es una parte esencial de su plan de trading, ya que proporcionan con un faro para trabajar 
                    en pro de, la capacidad de seguimiento de su progreso y la motivación, necesarias para realizar el trabajo.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">Metas Anuales</h5>
                      <p className="text-sm">
                        Piense en términos de las habilidades y conocimientos que desea adquirir de aquí hasta el próximo año.
                      </p>
                    </div>
                    
                    <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">Metas Mensuales</h5>
                      <p className="text-sm">
                        Defina sus objetivos de trading mensuales. Los objetivos financieros deben evitarse tanto como sea posible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 7 */}
              <div>
                <h4 className="font-semibold text-white mb-3">7. Mercados, Instrumentos y Time Frame</h4>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">¿Qué mercados va a Operar?</h5>
                      <p className="text-sm">
                        Decida qué mercado desea operar y las razones de su elección. Los operadores profesionales 
                        tienden a limitar su enfoque.
                      </p>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">¿Qué instrumentos va a Operar?</h5>
                      <p className="text-sm">
                        ¿Se limitará usted a una cesta de acciones o negociará usted de todo? Defina claramente su universo de instrumentos.
                      </p>
                    </div>
                    
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">¿En qué Time Frame Operará?</h5>
                      <p className="text-sm">
                        Tenga muy claro en su mente el número de TF que utiliza y por qué utilizarlos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 8 */}
              <div>
                <h4 className="font-semibold text-white mb-3">8. Las Herramientas del Trading</h4>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">¿Qué Vehículo Financiero utilizaré?</h5>
                      <p className="text-sm">
                        Sea cual sea el vehículo que utilizará para negociar; acciones, "spread betting", 
                        Contratos por Diferencias (CFDs.), etc debe comprender plenamente las ventajas y desventajas.
                      </p>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">¿Qué Bróker y Plataforma utilizaré?</h5>
                      <p className="text-sm">
                        El Bróker y la Plataforma de Trading son esenciales para su desempeño, así como son fundamentales 
                        las raquetas de tenis para Roger Federer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 9 */}
              <div>
                <h4 className="font-semibold text-white mb-3">9. Antes de que el mercado abra...</h4>
                <div className="space-y-4">
                  <p>
                    Comenzar a operar sin hacer su tarea de antemano es un poco como emprender un viaje sin controlar 
                    los niveles de aceite y combustible antes de salir.
                  </p>
                  
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">Rutina Diaria Pre-mercado</h5>
                    <p className="text-sm">
                      Es esencial someterse a una rutina pre-diario del mercado para asegurarse de que está plenamente 
                      preparado para el día de negociación que tiene por delante.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sección 10 - Gestión de Riesgo */}
              <div>
                <h4 className="font-semibold text-white mb-3">10. Riesgo y Gerencia del Dinero</h4>
                <div className="space-y-4">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-sm">
                      <strong>IMPORTANTE:</strong> Este es el meollo de todo el documento. El fracaso en la aplicación 
                      rigurosa del control al riesgo y los principios de gestión del dinero, casi con seguridad, lo llevará 
                      a la ruina financiera.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">Gestión del Riesgo</h5>
                      <p className="text-sm">
                        Se centra en las medidas necesarias para minimizar las pérdidas mediante la evaluación de las 
                        condiciones del mercado, el ratio riesgo/recompensa, y el uso de órdenes stop-loss.
                      </p>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">Gestión del Dinero</h5>
                      <p className="text-sm">
                        Se centra en las medidas necesarias para maximizar los beneficios mediante el uso de "trailing stops" 
                        y ajustes en el tamaño de la posición.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 11 */}
              <div>
                <h4 className="font-semibold text-white mb-3">11. Estrategia de Salida</h4>
                <div className="space-y-4">
                  <p>
                    En las estrategias de salida es más difícil de acertar que en las estrategias de entrada. 
                    Lamentablemente, ellas son mucho más importantes porque, claramente, ellas controlan las pérdidas y las ganancias.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">Trades Perdedores</h5>
                      <p className="text-sm">
                        ¿Saldrá antes de que se active su Stop Loss? ¿Qué señales usará para salir temprano?
                      </p>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">Trades Ganadores</h5>
                      <p className="text-sm">
                        ¿Qué señales usará para salir de todo? ¿Para cerrar la mitad? ¿Para cerrar el resto?
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 12 */}
              <div>
                <h4 className="font-semibold text-white mb-3">12. Estrategias de Trading, Configuraciones y Entradas</h4>
                <div className="space-y-4">
                  <p>
                    Las estrategias varían según las condiciones del mercado, la hora del día y el calendario en el que cotizan. 
                    Prácticamente todas las estrategias caen en uno de estos tres grupos genéricos: rupturas (breakouts), 
                    retrocesos (retracements) y reversiones (reversals).
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">¿Cuáles Estrategias Negociará?</h5>
                      <p className="text-sm">
                        Muchos traders profesionales recomiendan tener al menos dos estrategias comerciales diferentes, 
                        una para un mercado en tendencia y una para un mercado sin tendencia.
                      </p>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">¿Cuáles son sus Configuraciones (Set-up)?</h5>
                      <p className="text-sm">
                        Una configuración es el conjunto de características que le permite identificar una alta probabilidad 
                        de trading antes de entrar al mercado.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 13 */}
              <div>
                <h4 className="font-semibold text-white mb-3">13. Después del cierre del mercado</h4>
                <div className="space-y-4">
                  <p>
                    Una vez que haya terminado el día de trading, es tentador para acabar, abrir una botella ya sea 
                    ¡para celebrar o para ahogar tus penas! Su plan de trading puede o no puede permitir estas actividades.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">¿Ha Registrado los trades de hoy?</h5>
                      <p className="text-sm">
                        La grabación de todas sus operaciones es una necesidad y es algo que todos los operadores 
                        profesionales hacen de forma rutinaria y exhaustiva.
                      </p>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">¿Ejecuta sus operaciones según su Plan?</h5>
                      <p className="text-sm">
                        Si usted no está ejecutando sistemáticamente las operaciones de conformidad con el plan, 
                        significa que puede tener un problema serio con la auto-disciplina.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 14 */}
              <div>
                <h4 className="font-semibold text-white mb-3">14. ¡Disciplina!</h4>
                <div className="space-y-4">
                  <p>
                    Tener un plan de trading global con criterios de entrada y de salida, con un excelente control del riesgo, 
                    y procedimientos de gestión del dinero, no cuentan para nada si falta la disciplina necesaria para ponerlos en práctica.
                  </p>
                  
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">¿Qué promesas se hizo a sí mismo?</h5>
                    <p className="text-sm">
                      Estas son promesas que se han diseñado para hacer cumplir la autodisciplina. ¿Qué sanciones se imponen 
                      a sí mismo si rompe una de sus reglas de trading?
                    </p>
                  </div>
                </div>
              </div>

              {/* Sección 15 - Reglas de Oro */}
              <div>
                <h4 className="font-semibold text-white mb-3">15. Reglas de Oro del Trading</h4>
                <div className="space-y-4">
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">¿Cuáles son sus Diez reglas de oro del Trading?</h5>
                    <p className="text-sm">
                      Sus reglas deben ser las que son pertinentes y significativos para usted. Aquí hay una lista para hacerle pensar.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <h6 className="font-semibold text-white text-sm">#1. ¡PROTEGER Y CONSERVAR SU CAPITAL!</h6>
                        <p className="text-xs">Los operadores inexpertos entran en los mercados centrados en el dinero que pueden hacer. Los profesionales se centran en la cantidad que pueden perder.</p>
                      </div>
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <h6 className="font-semibold text-white text-sm">#2. SIEMPRE PONGA UN STOP LOSS. ¡SIEMPRE!</h6>
                        <p className="text-xs">Nunca confíe en un stop loss mental. Este es del dominio exclusivo de una rara raza de traders muy experimentados.</p>
                      </div>
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <h6 className="font-semibold text-white text-sm">#3. REDUCIR LAS PÉRDIDAS RAPIDAMENTE</h6>
                        <p className="text-xs">¡Cortar las pérdidas rápido, se consigue siempre con un stop-loss! Dejar correr los beneficios se reduce a la gestión de dinero.</p>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                        <h6 className="font-semibold text-white text-sm">#4. OPERE LO QUE VEA - ¡NO LO QUE USTED PIENSE!</h6>
                        <p className="text-xs">Los egos y el trading no se mezclan. Concéntrese en sus gráficos, sus indicadores y la acción de los precios.</p>
                      </div>
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <h6 className="font-semibold text-white text-sm">#5. NUNCA PERSIGA SUS PÉRDIDAS. ¡JAMÁS!</h6>
                        <p className="text-xs">Después de un trade perdedor, es imperativo que las emociones sean mantenidas a raya.</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <h6 className="font-semibold text-white text-sm">#6. NUNCA PROMEDIE A LA BAJA. ¡JAMÁS!</h6>
                        <p className="text-xs">Promediar a la baja es una táctica a largo plazo para inversiones y nunca debe ser practicada por los traders.</p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                        <h6 className="font-semibold text-white text-sm">#7. ¡LLEVAR UN EXCELENTE REGISTRO!</h6>
                        <p className="text-xs">Estratégicamente, es esencial mantener registros de todas sus operaciones.</p>
                      </div>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                        <h6 className="font-semibold text-white text-sm">#8. ¡MANTENER LA DISCIPLINA!</h6>
                        <p className="text-xs">Si no se aborda las cuestiones de la auto-disciplina, casi seguramente, se reflejará en sus resultados.</p>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                        <h6 className="font-semibold text-white text-sm">#9. MANTENGALO SIMPLE!</h6>
                        <p className="text-xs">Muchos profesionales acertados hacen uso de estrategias encantadoramente sencillas que se ejecutan con el mínimo de indicadores.</p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                        <h6 className="font-semibold text-white text-sm">#10. PLANIFIQUE SU TRADING – OPERE SU PLAN!</h6>
                        <p className="text-xs">El trading no es juego, es un negocio. Sin un plan bien concebido, no es mejor que apostar con los ojos vendados.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* EJEMPLOS DE PLAN DE OPERACIONES */}
          <CollapsibleSection
            title="EJEMPLOS DE PLAN DE OPERACIONES"
            icon={<List />}
            color="text-purple-400"
          >
            <div className="space-y-4">
              <p>
                Actualmente, esta sección contiene ejemplos de operaciones del plan. Lo ideal sería que contuviera al menos 
                tres planes de trading completos: uno para los operadores de futuros, uno para los operadores del Forex y 
                uno para los operadores de acciones.
              </p>
              
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h5 className="font-semibold text-white mb-2">La guinda del pastel</h5>
                <p className="text-sm">
                  Sería si también abarcara los tres principales Time Frame: Operador Intradía, Swing Trader y Operador de Posición.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          {/* Conclusión */}
          <div className="bg-green-500/10 backdrop-blur-lg rounded-2xl p-8 border border-green-500/30">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Conclusión</h2>
            <div className="text-gray-300 text-center">
              <p className="mb-4">
                Si usted ha llegado hasta este punto y respondió a todas las preguntas - ¡Felicidades! 
                Ahora está entre una minoría de traders que tienen un plan detallado y probado.
              </p>
              <p>
                Su futuro éxito como operador no es garantizado, pero al completar esta plantilla y crear 
                su propio plan de trading, las posibilidades han cambiado de manera significativa a su favor.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3">
            <span className="text-gray-300 text-sm">Fuente:</span>
            <span className="text-white font-semibold">Tim Wilcox 2005 - Traducción g8-FX</span>
          </div>
        </div>
      </div>
    </div>
  );
} 