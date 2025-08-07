import React from 'react';
import BackButton from '@/components/ui/BackButton';
import Image from 'next/image';

export default function ModuloPractico7Contenido() {
  return (
    <div className="min-h-screen bg-[#121212] text-white px-2 sm:px-8 py-8 max-w-3xl mx-auto">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 pt-12 relative">
        {/* Botón Volver en la esquina superior izquierda */}
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-[#ec4d58] mb-2 text-center">Lección 6: Análisis Fundamental</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">¿Quién y Qué Mueve el Mercado?</h2>

        <section className="mb-8">
          <div className="space-y-8">
            {/* Sección A: ¿Qué es el Análisis Fundamental? */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">A) ¿Qué es el Análisis Fundamental?</h3>
              
              <div className="space-y-4">
                <p className="text-sm mb-3">
                  El análisis fundamental consiste en predecir las cotizaciones futuras de cierto instrumento financiero basado en el estudio de factores económicos y políticos.
                </p>
                <p className="text-sm mb-3">
                  En términos sencillos, el análisis fundamental es el análisis del mercado en función de la relación entre factores económicos y/o políticos y su influencia en la cotización de cierta divisa. El análisis fundamental evalúa los factores económicos y las condiciones geopolíticas (tales como los números de la economía, los flujos de capital, y los principales acontecimientos políticos) a fin de anticipar los tipos de cambio.
                </p>
              </div>
            </div>

            {/* Sección B: Estructura del Mercado de Divisas */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">B) Estructura del Mercado de Divisas</h3>
              
              <div className="space-y-4">
                <ul className="text-sm space-y-2 mb-3">
                  <li>• El Mercado de divisas es un mercado extrabursátil (OTC, por sus siglas en inglés) que no está centralizado en ninguna bolsa.</li>
                  <li>• Los operadores pueden elegir entre las diferentes empresas que ofrecen el servicio de compensación de operaciones.</li>
                </ul>
                
                <p className="text-sm mb-3">
                  En el mercado de divisas hay muchos agentes cuyo negocio es unir a compradores y vendedores. Cada agente tiene la habilidad y la autoridad de ejecutar las operaciones independientemente del resto. Esta estructura es inherentemente competitiva ya que los operadores tienen la posibilidad de elegir entre diferentes empresas que tienen la misma habilidad de ejecutar sus operaciones.
                </p>
                
                <p className="text-sm mb-3">
                  A diferencia de los principales mercados de futuros y acciones, la estructura del mercado FX es altamente descentralizada. Esto significa que no hay un lugar central donde se realizan las operaciones. La Bolsa de Nueva York (NYSE, por sus siglas en inglés), por ejemplo, es una bolsa totalmente centralizada.
                </p>
                
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <p className="text-sm text-gray-300">
                    <strong>PARA DISCUTIR:</strong> El mercado FX tiene claras ventajas respecto al mercado accionario en relación a las eficiencias originadas por la descentralización y la competencia. ¿Cómo afecta la naturaleza de esta estructura de mercado a la ganancia de un operador?
                  </p>
                </div>
              </div>
            </div>

            {/* Sección C: Participantes Claves del Mercado */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">C) Participantes Claves del Mercado</h3>
              
              <div className="space-y-4">
                <p className="text-sm mb-3">
                  Si bien el mercado de divisas era tradicional y totalmente excluyente para todos excepto para un grupo seleccionado de grandes bancos, los avances de la tecnología y la reducción de las barreras del flujo de capital han incorporado una gran variedad de nuevos participantes.
                </p>
                
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Bancos Comerciales y de Inversión</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• Conforman el mercado "Interbancario" y operan mediante sistemas de correaje electrónico (EBS, por sus siglas en inglés).</li>
                    <li>• Estos bancos operan entre ellos mediante fuertes relaciones de crédito, y conforman la mayor parte de la compraventa de divisas.</li>
                    <li>• Estos bancos operan por cuenta propia (operan ellos mismos) y a través del flujo de clientes llenan las órdenes de los clientes que están fuera del mercado interbancario.</li>
                  </ul>
                </div>
                
                <p className="text-sm mb-3">
                  El mercado interbancario está compuesto por los bancos comerciales y de inversión más grandes del mundo y en él tiene lugar el mayor volumen de operaciones comerciales así como una gran cantidad de compraventa intradía especulativa.
                </p>
              </div>
            </div>

            {/* Sección D: Participantes Claves del Mercado (Cont.) */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">D) Participantes Claves del Mercado (Cont.)</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Corporaciones</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• Utilizan principalmente las divisas para protegerse en caso de depreciación de la divisa.</li>
                    <li>• Compran y venden divisas a fin de cumplir con la nómina de las oficinas internacionales.</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Bancos Centrales</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• Tienen acceso a grandes reservas de capitales.</li>
                    <li>• Tienen objetivos económicos específicos.</li>
                    <li>• Regulan la oferta de dinero y las tasas de interés.</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Fondos Globales Administrados</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• Muchos fondos gestionados que buscan obtener ganancias invierten en instrumentos financieros en divisas.</li>
                    <li>• Cuando compran y venden estos instrumentos, siempre se necesita una conversión de divisas.</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Particulares</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• Con la llegada de la compraventa de divisas en línea, los inversionistas minoristas ahora tienen acceso total al mercado cambiario de contado.</li>
                    <li>• Los clientes minoristas operan con divisas tanto para fines especulativos como de cobertura.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sección E: Intervención- El Banco de Japón */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">E) Intervención- El Banco de Japón</h3>
              
              <div className="space-y-4">
                <p className="text-sm mb-3">
                  El ejemplo más prolífico de intervenciones puede observarse en las acciones del Banco de Japón. La economía de Japón depende de sus exportaciones, esto significa que la economía se basa en la venta de productos a nivel internacional.
                </p>
                
                <p className="text-sm mb-3">
                  Como la economía japonesa se beneficia con un yen más débil, el banco central se ocupa de asegurarse de que el valor del yen permanezca bajo. Como resultado, el Banco de Japón intervino muchas ocasiones en el mercado de divisas, vendiendo, literalmente hablando, billones de yenes para bajar el tipo de cambio.
                </p>
                
                <p className="text-sm mb-3">
                  Por lo tanto, muchos operadores compraron USD/JPY alrededor de ese nivel de 115, y cosecharon ganancias al hacerlo.
                </p>
                
                {/* Imagen 1 después de la frase sobre operadores comprando USD/JPY */}
                <div className="my-4 flex justify-center">
                  <Image
                    src="/contenido%20modulo%20practico%20%237/1.png"
                    alt="Operadores comprando USD/JPY en nivel 115"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                
                <p className="text-sm mb-3">
                  El Banco de Japón dibujó una "línea en la arena" justo por encima de 105,00, e intervino en gran escala.
                </p>
                
                {/* Imagen 2 después de la frase sobre línea en la arena */}
                <div className="my-4 flex justify-center">
                  <Image
                    src="/contenido%20modulo%20practico%20%237/2.png"
                    alt="Línea en la arena del Banco de Japón"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Sección F: Intervención del Banco de Japón: ¿Cómo Reaccionaron los Operadores? */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">F) Intervención del Banco de Japón: ¿Cómo Reaccionaron los Operadores?</h3>
              
              <div className="space-y-4">
                <p className="text-sm mb-3">
                  El 19 de mayo de 2004, el USD/JPY alcanzó un mínimo de 115,07. El Banco de Japón, sabiendo que había una formación de "cabeza y hombros" con una línea de clavícula (neckline) en 115, intervino para sostener el tipo de cambio.
                </p>
                
                <p className="text-sm mb-3">
                  Si los operadores hubiesen utilizado el conocimiento fundamental y los niveles técnicos, podrían haber logrado una operación muy rentable.
                </p>
                
                {/* Imagen 3 después de la frase sobre combinación de análisis */}
                <div className="my-4 flex justify-center">
                  <Image
                    src="/contenido%20modulo%20practico%20%237/3.png"
                    alt="Combinación de análisis fundamental y técnico"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                
                <p className="text-sm mb-3">
                  Una vez que el precio cae por debajo del neckline en el lado derecho del segundo hombro, es señal de que hay que vender.
                </p>
                
                {/* Imagen 4 después de la frase sobre neckline */}
                <div className="my-4 flex justify-center">
                  <Image
                    src="/contenido%20modulo%20practico%20%237/4.png"
                    alt="Patrón de reversión con neckline"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Sección G: Participantes del Mercado en Acción */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">G) Participantes del Mercado en Acción: La Forma por Medio de la que los Especuladores Vencieron al Banco</h3>
              
              <div className="space-y-4">
                <p className="text-sm mb-3">
                  1992: El Banco de Inglaterra no logra apoyar el GBP. El objetivo de este artículo es mostrar uno de los más famosos ejemplos de intervención de un banco central con el fin de mantener el tipo de cambio a un nivel fijo, y el posterior fracaso en lograrlo.
                </p>
                
                <p className="text-sm mb-3">
                  El Mecanismo de Tipos de Cambio (ERM, por sus siglas en inglés) europeo lo introdujo la Comunidad Europea a principios del año 1979. Consistía en una parte importante del Sistema Monetario Europeo (EMS, por sus siglas en inglés), cuyo objetivo era reducir la variabilidad del tipo de cambio y alcanzar la estabilidad monetaria en Europa antes de introducir el Euro como una moneda común única.
                </p>
                
                <p className="text-sm mb-3">
                  Si un país quería permanecer en el ERM y seguir en rumbo de convertirse parte de la moneda común europea, su moneda local debía permanecer dentro de los umbrales inflexibles designados por el ERM.
                </p>
                
                {/* Imagen 5 después de la frase sobre ERM */}
                <div className="my-4 flex justify-center">
                  <Image
                    src="/contenido%20modulo%20practico%20%237/5.png"
                    alt="Sistema Monetario Europeo ERM"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                
                <p className="text-sm mb-3">
                  Dentro de los especuladores, el especulador más famoso contra al Banco de Inglaterra fue George Soros, quien pidió en préstamo grandes cantidades de libras británicas a fin de convertirlas en marcos alemán. Cuando el tipo de cambio colapsó, simplemente compró nuevamente libras y canceló el préstamo obteniendo una enorme ganancia.
                </p>
              </div>
            </div>

            {/* Sección H: Prueba */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">H) Prueba: ¿Quién y Qué Mueve el Mercado?</h3>
              
              <div className="space-y-4">
                <p className="text-sm mb-3">
                  Por favor evalúe su conocimiento sobre lo aprendido en esta lección. Acceda la prueba haciendo clic sobre el siguiente enlace:
                </p>
                
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <p className="text-sm text-gray-300">
                    <strong>ENLACE A LA PRUEBA:</strong> http://www.cursosforex.cl/viewtopic.php?f=5&t=8&sid=1aedce756ccba5161b2d838a22cd9d1b
                  </p>
                </div>
                
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <p className="text-sm text-gray-300">
                    <strong>NOTA:</strong> La pregunta del día es una pregunta retórica, cuyo objetivo es ayudarle a revisar lo que acaba de aprender. NO es necesario enviarnos una respuesta, ya que estas preguntas no son evaluadas. Sin embargo, si tiene dudas, o si desea compartir sus ideas con nosotros, no dude en contactarnos por email a Cursos@fxcmchile.cl
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Botón Volver al final del texto, del lado izquierdo */}
        <div className="mt-8">
          <BackButton />
        </div>
      </div>
    </div>
  );
} 





