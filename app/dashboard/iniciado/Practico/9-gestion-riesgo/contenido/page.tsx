'use client';

import { useState } from 'react';
import { FaShieldAlt, FaExclamationTriangle, FaChartLine, FaBrain, FaClipboardCheck, FaChevronDown, FaChevronUp, FaQuestionCircle, FaLightbulb } from 'react-icons/fa';

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
        {isOpen ? <FaChevronUp className="text-white" /> : <FaChevronDown className="text-white" />}
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

export default function GestionRiesgoContenidoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-6">
            <FaShieldAlt className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Lección 8: Gestión de Riesgo
          </h1>
          <p className="text-lg text-gray-300">
            Técnicas fundamentales para proteger tu capital y mantener la disciplina emocional
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Sección A */}
          <CollapsibleSection
            title="A) ¿Por qué la mayoría de los operadores pierden dinero?"
            icon={<FaExclamationTriangle />}
            color="text-red-400"
          >
            <div className="space-y-4">
              <p>
                El hecho es que la mayoría de los operadores, más allá de cuan inteligentes y entendidos sean en los mercados, 
                pierden dinero. ¿Cuál puede ser la causa de ello? ¿Los mercados son realmente tan enigmáticos que pocos se 
                benefician o existe una serie de errores comunes que cometen muchos operadores?
              </p>
              
              <p>
                La respuesta es ésta última y la buena noticia es que el problema, mientras que plantea un desafío emocional 
                y psicológico, puede resolverse utilizando sólidas técnicas de administración del dinero.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">El Problema Principal:</h4>
                <p>
                  La mayoría de los operadores pierden dinero simplemente porque no comprenden o se adhieren a las buenas 
                  prácticas de la administración del dinero. Sin conocimiento sobre la administración del dinero, la mayoría 
                  de los operadores se mantienen en posiciones de pérdida durante demasiado tiempo y obtienen ganancias en 
                  las posiciones favorables en forma prematura.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Relación Riesgo-Recompensa</h4>
                  <p className="text-sm">
                    Los operadores deberían establecer una relación riesgo-recompensa para cada operación que quieren realizar. 
                    En general, la relación riesgo-recompensa debería ser de 1:2, si no más. Esto significa que el riesgo 
                    debería equivaler a no más que la mitad de la potencial recompensa.
                  </p>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Órdenes Stop-Loss</h4>
                  <p className="text-sm">
                    Los operadores deberían también utilizar las órdenes "stop-loss" como una manera de especificar la 
                    pérdida máxima que están dispuestos a aceptar. Esto evita el escenario corriente donde una única 
                    pérdida lo suficientemente grande elimina cualquier rastro de rentabilidad.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Sección B */}
          <CollapsibleSection
            title="B) El uso de Órdenes 'Stop-Loss' para Administrar el Riesgo"
            icon={<FaShieldAlt />}
            color="text-blue-400"
          >
            <div className="space-y-4">
              <p>
                Debido a la importancia de la administración del dinero para lograr una operación exitosa a largo plazo, 
                el uso de las órdenes "stop-loss" es imperativo para cualquier operador que desee tener éxito en el mercado 
                de divisas.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">¿Qué son las órdenes Stop-Loss?</h4>
                <p>
                  Las órdenes "stop-loss" les permiten a los operadores especificar la pérdida máxima que están dispuestos 
                  a aceptar en una operación determinada. Si el mercado alcanza el índice que el operador hubiera especificado 
                  en su orden "stop-loss", la operación se cerrará inmediatamente.
                </p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Dos Pasos para el Éxito:</h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Establecer la salida o "stop" en un nivel razonable</li>
                  <li>Hacer un seguimiento de la salida, trasladándola hacia adelante en dirección a la rentabilidad</li>
                </ol>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Mínimo de Dos Días</h4>
                  <p className="text-sm">
                    Esta técnica implica colocar su orden "stop-loss" aproximadamente 10 pips por debajo de un mínimo de 
                    2 días del par. La idea es que si el precio se quiebra ante nuevos mínimos, el operador no quiere 
                    mantener la posición.
                  </p>
                </div>
                
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Indicador Parabólico (SAR)</h4>
                  <p className="text-sm">
                    Un tipo de salida en base a la volatilidad es la del SAR, un indicador que se encuentra en muchas 
                    aplicaciones para realizar gráficos sobre la compraventa de divisas. El SAR es un indicador en base 
                    a la volatilidad que muestra gráficamente dónde establecer la salida.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Sección C */}
          <CollapsibleSection
            title="C) Distintos Estilos para Operar"
            icon={<FaChartLine />}
            color="text-green-400"
          >
            <div className="space-y-4">
              <p>
                No hay una definición precisa, sin embargo, se considera que los siguientes son los estilos de 
                compraventa más corrientes:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Operadores Intradía</h4>
                  <p className="text-sm">
                    Generalmente toman posiciones que duran entre algunos minutos a algunas horas, a menudo no mantienen 
                    sus posturas de un día al otro. Usualmente también utilizarán gráficos de muy corto plazo, como 
                    gráficos de 15 minutos.
                  </p>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Operadores de Corto Plazo (Swing Trader)</h4>
                  <p className="text-sm">
                    Toman una postura por algunas horas que puede durar algunos días, incluso una semana o dos. 
                    Pueden utilizar gráficos de 1 hora o más para hacerlo.
                  </p>
                </div>
                
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Operadores de Posición</h4>
                  <p className="text-sm">
                    En general mantienen sus posiciones para un período incluso más largo que el de los operadores 
                    de corto plazo y ello puede durar algunas semanas o algunos meses.
                  </p>
                </div>
                
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Carry Trade</h4>
                  <p className="text-sm">
                    Es una operación que se basa en la diferencia entre las tasas de interés (poner al descubierto 
                    las divisas de menor rentabilidad para obtener retornos en una moneda de mayor rentabilidad) 
                    y puede durar algunos años o más.
                  </p>
                </div>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Regla General de Timeframes</h4>
                <p>
                  Cuanto más largo sea el período que considera el operador, más largo serán los períodos de tiempo 
                  utilizados en los gráficos. En general, son populares los gráficos diarios, semanales e incluso mensuales.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          {/* Sección D */}
          <CollapsibleSection
            title="D) Claves Útiles para Operar"
            icon={<FaLightbulb />}
            color="text-yellow-400"
          >
            <div className="space-y-4">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">¿Cuándo aumentar/disminuir el tamaño de una posición?</h4>
                <p>
                  Cada vez que un operador atraviesa un período difícil, la primera reacción debería ser la de disminuir 
                  el tamaño de la operación. Por ejemplo, cambiar una operación de 5 lotes a la vez por una de 2 lotes a la vez.
                </p>
                <p className="mt-2">
                  El momento para elevar el tamaño es cuando todo está resultando bien; ese es el mejor momento para 
                  que un operador sea agresivo.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">¿Cómo quitar la emoción de sus operaciones?</h4>
                <p>
                  La mejor manera para quitar la emoción de sus operaciones es planear por anticipado tanto la operación 
                  como antes de ingresar. Muchos operadores se concentran en lo que sucede después de que ellos ingresan 
                  a la operación, pero los movimientos del precio no son de su control.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Control Emocional</h4>
                <p>
                  Como norma general, cualquier momento en el que usted sienta que sus emociones le están demandando 
                  demasiado de sí mismo, es la oportunidad para dar un paso al costado de la operación, para evitar 
                  tomar decisiones apresuradas.
                </p>
                <p className="mt-2">
                  Si existe una emoción por encima del resto que puede dañar rápidamente al operador, ella es la ambición. 
                  Tan pronto como ingresa la ambición en la ecuación, se va a encontrar a usted mismo tomando decisiones 
                  de compraventa deficientes.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          {/* Sección E */}
          <CollapsibleSection
            title="E) Trabajo Práctico – Colocación de una Operación"
            icon={<FaClipboardCheck />}
            color="text-green-400"
          >
            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">TRABAJO PRÁCTICO</h4>
                <p>
                  Utilizando la cuenta demo, realice una operación que incluya una orden "stop-loss", aplicando las 
                  tácticas discutidas en la presente lección. Coméntenos por e-mail su operación y por qué la realizó. 
                  Si lo desea, no dude en enviarnos una imagen del gráfico que usted está viendo como ayuda para 
                  transmitirnos por qué realizó esa operación.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          {/* Sección F */}
          <CollapsibleSection
            title="F) La pregunta del Día"
            icon={<FaQuestionCircle />}
            color="text-purple-400"
          >
            <div className="space-y-4">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Pregunta de Reflexión</h4>
                <p>
                  Además del mínimo de dos días y el SAR y las técnicas stop-loss, según su criterio ¿cuáles otros 
                  métodos para determinar los niveles stop-loss resultan razonables?
                </p>
                <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm text-yellow-200">
                    <strong>NOTA:</strong> La pregunta del día es una pregunta retórica, cuyo objetivo es ayudarle a 
                    revisar lo que acaba de aprender. NO es necesario enviarnos una respuesta, ya que estas preguntas 
                    no son evaluadas. Sin embargo, si tiene dudas, o si desea compartir sus ideas con nosotros, 
                    no dude en contactarnos por email a Cursos@fxcmchile.cl
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Sección G */}
          <CollapsibleSection
            title="G) La Psicología del Buen Operador"
            icon={<FaBrain />}
            color="text-pink-400"
          >
            <div className="space-y-4">
              <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Ser un buen operador</h4>
                <p>
                  Ser un buen operador implica más que sólo contar con la capacidad de analizar el mercado técnica 
                  y/o fundamentalmente. Uno de los elementos más importantes pero que se pasa por alto respecto de 
                  las operaciones exitosas es el de mantener una perspectiva psicológica saludable.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Desapego Emocional</h4>
                  <p className="text-sm">
                    Uno de los atributos principales del buen operador es el contar con desapego emocional: mientras 
                    que son dedicados y se encuentran plenamente involucrados en sus operaciones, no se casan 
                    emocionalmente con ellas; aceptan perder y toman sus decisiones de inversiones a nivel mental.
                  </p>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Sepa Cuando Tomarse un Descanso</h4>
                  <p className="text-sm">
                    Si estuviera atravesando una mala racha, considere la posibilidad de retirarse momentáneamente 
                    de las operaciones para evitar que el temor y la ambición dominen su estrategia.
                  </p>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Aceptar las Pérdidas</h4>
                <p>
                  Perder es una parte inevitable de operar. No todas las operaciones pueden ser exitosas. Como resultado, 
                  los operadores deben ser capaces de aceptar psicológicamente las pérdidas. La clave para ser un operador 
                  exitoso es ser capaz de reponerse a una seguidilla de pérdidas sin preocuparse ni desalentarse.
                </p>
              </div>
            </div>
          </CollapsibleSection>

          {/* Sección H */}
          <CollapsibleSection
            title="H) Prueba"
            icon={<FaClipboardCheck />}
            color="text-orange-400"
          >
            <div className="space-y-4">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Evaluación del Conocimiento</h4>
                <p>
                  Por favor evalúe su conocimiento sobre lo aprendido en esta lección. Acceda la prueba haciendo clic 
                  sobre el siguiente enlace:
                </p>
                <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <a 
                    href="http://www.cursosforex.cl/viewtopic.php?f=5&t=8&sid=1aedce756ccba5161b2d838a22cd9d1b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 underline"
                  >
                    http://www.cursosforex.cl/viewtopic.php?f=5&t=8&sid=1aedce756ccba5161b2d838a22cd9d1b
                  </a>
                </div>
              </div>
            </div>
          </CollapsibleSection>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3">
            <span className="text-gray-300 text-sm">Fuente:</span>
            <span className="text-white font-semibold">www.fxcmchile.cl</span>
          </div>
        </div>
      </div>
    </div>
  );
} 