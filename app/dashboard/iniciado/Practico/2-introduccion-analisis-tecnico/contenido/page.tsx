import React from 'react';
import BackButton from '@/components/ui/BackButton';

export default function ModuloPractico2Contenido() {
  return (
    <div className="min-h-screen bg-[#121212] text-white px-2 sm:px-8 py-8 max-w-3xl mx-auto">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 pt-12 relative">
        {/* Botón Volver en la esquina superior izquierda */}
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-[#ec4d58] mb-2 text-center">Curso Práctico de Trading</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Módulo 2: Introducción al Análisis Técnico</h2>

        <section className="mb-8">
          <div className="space-y-8">
            {/* Sección A: La lógica del Análisis Técnico */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">A) La lógica del Análisis Técnico</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">¿Qué es el análisis técnico?</h4>
                  <p className="text-sm mb-3">El análisis técnico consiste en predecir el movimiento de los tipos de cambio basándose únicamente en las estadísticas y patrones de precio.</p>
                  <p className="text-sm mb-3">En términos sencillos, el análisis técnico es el análisis del mercado en función del comportamiento del precio. Mientras que el análisis fundamental evalúa los factores económicos y las condiciones geopolíticas (tales como los números de la economía, los flujos de capital, y los principales acontecimientos políticos) a fin de anticipar los tipos de cambio, el análisis técnico se basa en las estadísticas y patrones en el movimiento del precio para su predicción.</p>
                  <p className="text-sm mb-3">El análisis técnico ha ganado gran popularidad en los últimos años, especialmente debido a que las tendencias en la compraventa computarizada continúan desarrollándose y los operadores activos continúan mejorando sus estrategias para evaluar mejor lo que está sucediendo en el mercado en todo momento.</p>
                  <p className="text-sm">En el mercado de hoy en día, el análisis técnico se ha convertido en una herramienta esencial para cualquier operador con aspiraciones.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">¿Por qué funciona el Análisis Técnico?</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• Muy popular, y por ende ofrece conocimientos sobre lo que muchos operadores están haciendo</li>
                    <li>• Más claro y menos controversial que el análisis fundamental</li>
                    <li>• Una manera simple de tomar decisiones de compraventa</li>
                  </ul>
                  <p className="text-sm mb-3">Muchos operadores creen que el análisis técnico es una profecía destinada a cumplirse, en otras palabras, que funciona únicamente porque es popular y es utilizado por muchos operadores. Por ejemplo, muchos operadores técnicos colocan una línea de la media móvil de 20 días en los gráficos no porque la media móvil sea importante desde el punto de vista estadístico, sino más bien porque es un indicador muy común utilizado por operadores activos de todos los tamaños.</p>
                  <p className="text-sm mb-3">El razonamiento es simple: Si tantos operadores basan sus decisiones en medias móviles y otros indicadores, entonces se debe prestar mucha atención a tales indicadores, ya que éstos ofrecen conocimientos sobre lo que una vasta mayoría de operadores en el mercado está realizando.</p>
                  <p className="text-sm mb-3">En base a este razonamiento, los operadores deben prestar atención a los indicadores más populares en el mundo de la compraventa, y deben utilizarlos de la manera en que son más comúnmente utilizados. Esta es la mejor manera de entrar en la "psicología" del mercado, en otras palabras, es una manera simple pero altamente efectiva de comprender lo que otros operadores están haciendo y cómo el mercado puede moverse en función de esto.</p>
                  <p className="text-sm">A diferencia de lo que la mayoría de la gente cree, el análisis técnico NO es un estudio que requiere matemáticas o algoritmos de programación complejos. Por el contrario, es un estudio que requiere observar las mismas herramientas que otros operadores utilizan para entender qué está sucediendo en el mercado.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Indicadores más comunes</h4>
                  <p className="text-sm mb-3">A continuación, aparece una lista de los indicadores más comunes, los cuales serán analizados en las siguientes lecciones:</p>
                  <ul className="text-sm space-y-1 mb-3">
                    <li>• Principales patrones de gráficos de velas japonesas</li>
                    <li>• Retrocesos de Fibonacci</li>
                    <li>• Medias móviles</li>
                    <li>• Índice de Fuerza Relativa (RSI)</li>
                    <li>• Estocástico</li>
                    <li>• Convergencia-Divergencia de la Media Móvil (MACD)</li>
                    <li>• Bandas de Bollinger</li>
                  </ul>
                  <p className="text-sm mb-3">Si bien puede parecer intimidante, el análisis técnico es en realidad muy simple, en general más simple que el análisis fundamental. Simplemente requiere una gran presencia de las dos características más necesarias para ser un operador exitoso: disciplina y paciencia.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Diferentes lapsos de tiempo</h4>
                  <p className="text-sm mb-3">Las herramientas del análisis técnico serán válidas para todos los lapsos de tiempo, aunque recomendamos plenamente el uso de gráficos diarios para la mayor parte de su análisis. Las posiciones de mediano plazo basadas en gráficos diarios, utilizando gráficos por hora para obtener puntos de datos más precisos, tienen dos ventajas sobre las posiciones de corto plazo basadas en gráficos de 5 o 15 minutos.</p>
                  <p className="text-sm mb-3">Compre y venda teniendo en cuenta que un gráfico semanal o mensual sería probablemente más preciso desde un punto de vista técnico que según un gráfico diario, pero parámetros de tiempo más cortos también implican menos puntos de entrada precisos, y los stops más amplios necesarios para operar según un gráfico mensual están con frecuencia más allá de la capacidad para muchas cuentas.</p>
                  <p className="text-sm mb-3">Como regla general, recomendamos arriesgar no más del 2% del saldo de su cuenta en una única operación, lo que a veces es difícil con un gráfico mensual o semanal.</p>
                  <ul className="text-sm space-y-2">
                    <li>1) El margen (spread) es menos importante para una posición de largo plazo. 5 puntos (pips) de diferencia en un precio pretendido de 20 es un gran obstáculo a superar de operación en operación. 5 pips sobre un precio pretendido de 100 puntos es manejable.</li>
                    <li>2) Los gráficos de plazos más largos son estadísticamente mucho más confiables, ya que se basan en más datos. Los indicadores tienen un grado más alto de confiabilidad en función de un gráfico diario que un gráfico por horas o un gráfico de 15 minutos.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sección B: Teoría del análisis técnico */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">B) Teoría del análisis técnico: Mercados en Rangos vs. Mercados en Tendencia</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">El Soporte y la Resistencia</h4>
                  <p className="text-sm mb-3">El soporte y la resistencia conforman la base de la mayoría de los patrones de gráfico del análisis técnico. Identificar los niveles de soporte y resistencia claves es un ingrediente esencial para alcanzar un análisis técnico exitoso. Si bien a veces es difícil establecer niveles de soporte y resistencia exactos, conocer su existencia y ubicación puede mejorar ampliamente el análisis y las habilidades de predicción.</p>
                  <p className="text-sm mb-3">Si un par se acerca a un nivel de soporte importante, puede ser una alerta para estar muy atentos a los signos de mayor presión de compra y un posible cambio de tendencia. Si un par se acerca a un nivel de resistencia, puede actuar como una alerta para observar los signos de mayor presión de venta y un posible cambio de tendencia. Si se produce la ruptura de un nivel de soporte o resistencia, es señal de que la relación entre la oferta y la demanda ha cambiado.</p>
                  <p className="text-sm">La ruptura del nivel de resistencia es señal de que la demanda (alza) lleva las de ganar y la ruptura del nivel de soporte es señal de que la oferta (baja) ha ganado la batalla.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Soporte</h4>
                  <p className="text-sm mb-3">Los niveles de soporte y resistencia representan puntos de cambio clave en los que se encuentran la fuerza de los vendedores (oferta) y los compradores (demanda). En los mercados financieros, los precios son conducidos por la oferta (baja) y demanda (alza) excesiva. Oferta es sinónimo de bajista, baja y venta. Demanda es sinónimo de alcista, alza y compra.</p>
                  <p className="text-sm mb-3">El nivel de soporte consiste en el nivel de precio en el que se considera que la demanda es lo suficientemente fuerte como para evitar que el precio continúe bajando. La lógica indica que cuando el precio cae hacia el nivel de soporte y disminuye, los compradores se predisponen más para la compra y lo vendedores no se predisponen para la venta. Cuando el precio alcanza el nivel de soporte, se cree que la demanda superará la oferta e impedirá que el precio caiga por debajo del nivel de soporte.</p>
                  <p className="text-sm mb-3">En todos los mercados, la oferta excesiva disminuirá los precios mientras que la demanda aumentará los precios. Al aumentar la demanda, los precios aumentan y al aumentar la oferta, los precios disminuyen. Cuando la oferta y la demanda están iguales, los precios permanecen estables hasta que las alzas o bajas obtengan el control.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">El mercado tiene memoria</h4>
                  <p className="text-sm mb-3">Cuando el precio cae a un nuevo mínimo y luego repunta, los compradores que se perdieron esta caída estarán dispuestos a comprar si el precio vuelve a ese nivel. Por temor a perder una segunda oportunidad, pueden ingresar al mercado un gran número de compradores para comprarles a los vendedores. El resultado será una recuperación, reforzando las percepciones de que no es probable que el precio continúe bajando y creando así el nivel de soporte.</p>
                  <p className="text-sm mb-3">Una caída por debajo del nivel de soporte indica una nueva predisposición para vender y/o la falta de incentivo para comprar. La ruptura del soporte y la obtención de nuevos mínimos es señal de que los vendedores redujeron sus expectativas y están dispuestos a vender a precios aún más bajos. Asimismo, los compradores no podían tentarse a comprar hasta que los precios cayeran por debajo del soporte o por debajo del mínimo anterior. Una vez que se rompe el nivel de soporte, debe establecerse otro nivel de soporte a un nivel más inferior.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Resistencia</h4>
                  <p className="text-sm mb-3">El nivel de resistencia es el nivel de precio en el que se considera que la venta es lo suficientemente fuerte como para evitar que el precio aumente más y la lógica indica que cuando el precio se acerca al nivel de resistencia, los vendedores se predisponen más para la venta y los compradores están menos predispuestos para la compra. Cuando el precio alcanza el nivel de resistencia, se cree que la oferta superará a la demanda e impedirá que el precio aumente por encima del nivel de resistencia.</p>
                  <p className="text-sm mb-3">El mercado tiene memoria: cuando el precio alcanza un nuevo máximo y luego se produce un retroceso, los vendedores que perdieron el pico anterior estarán dispuestos a vender cuando el precio alcance ese nivel. Por temor a perder una segunda oportunidad, pueden entrar al mercado un número de vendedores suficiente como para abrumar a los compradores. La corrección resultante reforzará las percepciones del mercado de que no es probable que el precio aumente aún más y se establecerá un nivel de resistencia.</p>
                  <p className="text-sm mb-3">El nivel de resistencia no se mantiene siempre y la ruptura por encima del nivel de resistencia es señal de que las alzas le han ganado a las bajas. Una ruptura por encima del nivel de resistencia indica una nueva predisposición para la compra y/o la falta de incentivo para la venta. Cuando se rompe el nivel de resistencia y se alcanzan nuevos máximos indicaría que los compradores aumentaron sus expectativas y están dispuestos a comprar a precios aún más altos.</p>
                  <p className="text-sm mb-3">Asimismo, los vendedores no podían tentarse y vender hasta que los precios repuntaran por encima del nivel de resistencia o por encima de un máximo anterior. Una vez que se rompe el nivel de resistencia, se deberá establecer otro nivel de resistencia a un nivel superior.</p>
                  <p className="text-sm">Otro principio del análisis técnico establece que el soporte puede convertirse en el nivel de resistencia y viceversa. Una vez que el precio rompe por debajo del nivel de soporte, ese nivel de soporte puede convertirse en el nivel de resistencia. La ruptura del soporte indica que la fuerza de la oferta ha superado la fuerza de la demanda. Por lo tanto, si el precio vuelve a este nivel, es probable que se produzca un aumento en la oferta y por lo tanto, la resistencia.</p>
                  <p className="text-sm mb-3">La otra posibilidad es que el nivel de resistencia se convierta en el nivel de soporte. Cuando el precio supera el nivel de resistencia indica cambios en la oferta y la demanda. La ruptura por encima del nivel de resistencia es señal de que la fuerza de la demanda ha superado la fuerza de la oferta. Si el precio vuelve a este nivel, es probable que se produzca un aumento de la demanda y por lo tanto nos encontraremos con un nivel de soporte.</p>
                  <p className="text-sm">Por lo tanto, primero trazamos gráficos de largo plazo y comenzamos analizando los gráficos diarios y semanales remontándonos un par de años atrás. Esto nos brinda más visibilidad y una mejor perspectiva a largo plazo de un mercado. Una vez que se haya establecido el largo plazo, entonces revisamos los gráficos diarios e intradía. Una perspectiva del mercado a corto plazo generalmente puede ser engañosa.</p>
                  <p className="text-sm mb-3">Incluso si usted opera a muy corto plazo, obtendrá mejores resultados si opera en la misma dirección que las tendencias a un plazo intermedio y largo. Observe la perspectiva general del gráfico para determinar la dirección de la tendencia y sígala. Necesitamos intentar identificar los niveles de soporte y resistencia, el mejor momento para comprar en el mercado es cerca de los niveles de soporte y ese nivel de soporte generalmente es un mínimo anterior. El mejor lugar para vender en el mercado es cerca de los niveles de resistencia. El nivel de resistencia generalmente es un pico anterior.</p>
                                      <p className="text-sm mb-3">Una vez que se rompe un pico de resistencia, generalmente brindará soporte en retrocesos posteriores. En otras palabras, el antiguo "máximo" se convierte en un nuevo "mínimo". De la misma manera, cuando un nivel de soporte se rompe, generalmente producirá la venta en repuntes posteriores- el antiguo "mínimo" se puede convertir en un nuevo "máximo".</p>
                  <p className="text-sm">Es muy importante asegurarse de que operamos en la dirección de esa tendencia. "Compramos cuando los precios son bajos si la tendencia es alcista" y "vendemos cuando los precios son altos si la tendencia es bajista". Pero en cada caso, deje que el marco de tiempo mayor determine la tendencia, y luego utilice el período de tiempo más corto para decidir cuándo entrar al mercado.</p>
                                      <p className="text-sm mb-3">Identifique los niveles de soporte y resistencia; el mejor momento para comprar en un mercado es cerca del nivel de soporte, y el soporte generalmente es un mínimo anterior. El mejor momento para vender en el mercado es cerca de los niveles de resistencia. El nivel de resistencia generalmente es un pico anterior. Una vez que se rompe un pico de resistencia, generalmente brindará soporte en retrocesos posteriores. En otras palabras, el antiguo "máximo" se convierte en un nuevo "mínimo". De la misma manera, cuando un nivel de soporte se rompe, generalmente producirá la venta en repuntes posteriores, el antiguo "mínimo" se puede convertir en un nuevo "máximo".</p>
                                      <p className="text-sm">Las órdenes "stop" se colocan mejor después de que se identifican los niveles de soporte y resistencia en los gráficos y usted coloca los límites por encima/debajo de esos niveles, y en ese momento usted decidirá si la relación riesgo/recompensa de la operación es aceptable para usted.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Banda de Fluctuación de Precios</h4>
                  <p className="text-sm mb-3">Las bandas de fluctuación de precios pueden jugar un rol importante en la determinación del nivel de soporte y resistencia como puntos cruciales o como patrones de continuación. Una banda de fluctuación de precios es un período de tiempo en el que los precios se mueven dentro de una banda relativamente estrecha, entre el nivel de soporte y resistencia. Esto indica que la fuerza de la oferta y la demanda están equilibradas en partes iguales.</p>
                  <p className="text-sm mb-3">Cuando el precio rompe fuera de la banda de fluctuación de precios, ya sea por encima o por debajo, es señal de que ha surgido un ganador. Una ruptura por encima es una victoria de las alzas (demanda o compradores) y una ruptura por debajo es una victoria de las bajas (oferta o vendedores).</p>
                  <p className="text-sm mb-3">La forma más simple de utilizar el nivel de soporte y resistencia en la compraventa consiste simplemente en operar dentro de la banda: En otras palabras, los operadores pueden simplemente comprar en el nivel de soporte y vender en la resistencia. Una ventaja clave de esto es que aproximadamente el 80% del tiempo el mercado se mueve dentro de una banda, convirtiéndolo en una estrategia viable para la mayoría de las condiciones del mercado.</p>
                  <p className="text-sm mb-3">Cuando el precio alcanza un nuevo máximo y luego se retrae, los vendedores que se perdieron el pico anterior estarán inclinados a vender cuando el precio vuelva a ese nivel. Por temor a perder la segunda oportunidad, pueden ingresar al mercado un número de vendedores suficiente como para abrumar a los compradores. La corrección resultante reforzará las percepciones del mercado de que no es probable de que el precio aumente y se establecerá el nivel de resistencia.</p>
                  <p className="text-sm mb-3">Operar dentro de una banda conlleva dos riesgos:</p>
                  <ul className="text-sm space-y-1 mb-3">
                    <li>• Operar dentro de una banda generalmente no rinde ganancias sustanciales por operación.</li>
                    <li>• Cuando el mercado sale de la banda, generalmente se producirán importantes movimientos.</li>
                  </ul>
                  <p className="text-sm">Como resultado, los operadores que utilizan estrategias para operar dentro de una banda pueden sufrir una abrumadora cantidad de pérdidas cuando el mercado sale fuera de la banda.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Zonas de Soporte y Resistencia</h4>
                  <h5 className="font-semibold text-[#ec4d58] mb-2">Soporte y Resistencia en Mercados por Impulso</h5>
                  <p className="text-sm mb-3">Debido a que el análisis técnico no es una ciencia exacta, a veces es útil crear zonas de soporte y resistencia. Cada par tiene sus propias características y el análisis debería reflejar las complejidades del par. A veces es mejor considerar los niveles de soporte y resistencia y otras veces las zonas dan mejores resultados. Generalmente, cuanto más estrecha es la banda, más exacto es el nivel.</p>
                  <p className="text-sm mb-3">Si la banda de compraventa abarca menos de 2 meses y el rango de precio es relativamente estrecho, entonces los niveles de soporte y resistencia más exactos son más convenientes. Si una banda de fluctuación de precios abarca muchos meses y el rango de precio es relativamente amplio, entonces probablemente es mejor utilizar zonas de soporte y resistencia. Éstas son sólo pautas generales y cada banda de fluctuación de precio debería juzgarse individualmente.</p>
                  <p className="text-sm mb-3">Otra forma de utilizar los niveles de soporte y resistencia es operar fuera de las bandas; en otras palabras, anticipar una ruptura. Esto implica colocar órdenes de compra por encima del nivel de resistencia y órdenes de venta por debajo del nivel de soporte. El fundamento es que el mercado ganará impulso cuando se produzca una ruptura fuera de la banda, y así, al colocar órdenes justo por debajo/encima de los niveles de soporte/resistencia, los operadores podrán obtener importantes ganancias cuando el mercado se mueva fuera de la banda.</p>
                  <p className="text-sm">Las operaciones por impulso son un poco contra-intuitivas ya que implican comprar a un precio mayor y vender a un precio menor.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Relación Riesgo-Recompensa</h4>
                  <p className="text-sm mb-3">Consiste en la pérdida potencial estimada de una operación (riesgo) en relación a la ganancia potencial estimada (recompensa).</p>
                  <p className="text-sm mb-3">Antes de entrar a una operación, los operadores con experiencia primero consideran el riesgo que están dispuestos a correr en una operación en particular. Intentamos aplicar el riesgo/recompensa 1:3. Por ejemplo, si su ganancia promedio en una operación exitosa es $1000 y usted ha arriesgado sistemáticamente $300 por operación, entonces su relación riesgo/recompensa sería 1/3,3 (es decir, $300/$1000).</p>
                  <p className="text-sm">Como nadie puede ganar en todas las operaciones, entonces sus ganancias cubrirían sus pérdidas y, a fin de cuentas, usted será un ganador.</p>
                </div>
              </div>
            </div>

            {/* Sección C: Canales de precios */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">C) Canales de precios</h3>
              
              <div className="space-y-4">
                <p className="text-sm mb-3">El soporte y resistencia no tienen que ser líneas horizontales, y generalmente en un mercado que se mueve más alto o más bajo, las líneas de tendencia efectivamente conectan los máximos o mínimos para crear un canal de precios que actúa de manera similar a un parámetro horizontal. Los niveles de soporte y resistencia funcionan de la misma manera en un mercado con tendencia que en un mercado en rango.</p>
                <p className="text-sm mb-3">Sin embargo, la línea que sigue una tendencia (soporte en una tendencia alcista y resistencia en una tendencia bajista) debe ser considerada por lejos la más fuerte de las dos. Únicamente cuando es una operación con riesgo mínimo, deberá colocar una posición en base sólo a la línea de resistencia sobre el precio en una tendencia alcista.</p>
                <p className="text-sm mb-3">Se pueden graficar las mismas líneas de tendencia en un mercado bajista cuando el precio continuamente va bajando.</p>
                <p className="text-sm mb-3">No existe una fórmula exacta para trazar estas líneas. Algunos operadores prefieren unir únicamente los cuerpos de las velas y excluir los máximos y mínimos fuera del precio de apertura y cierre, aunque esto no es un requisito. Si la línea no le parece correcta, las posibilidades son que no sea importante, porque otros operadores están utilizando los mismos gráficos.</p>
              </div>
            </div>

            {/* Sección D: La pregunta del día */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">D) La pregunta del día</h3>
              
              <div className="space-y-4">
                <p className="text-sm mb-3">1. Ahora que ha leído acerca del soporte y la resistencia, ¿Dónde colocaría órdenes de compra y órdenes de venta con respecto a estos niveles al operar una estrategia de ruptura de niveles? Puede citar un gráfico específico si quiere proponer un nivel de soporte o resistencia específico y una orden que colocaría.</p>
                <p className="text-sm mb-3">2. ¿Dónde colocaría una orden "stop loss" una vez que coloca la posición (en relación al soporte y la resistencia)?</p>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <p className="text-sm text-gray-300"><strong>NOTA:</strong> La pregunta del día es una pregunta retórica, cuyo objetivo es ayudarle a revisar lo que acaba de aprender. NO es necesario enviarnos una respuesta, ya que estas preguntas no son evaluadas. Sin embargo, si tiene dudas, o si desea compartir sus ideas con nosotros, no dude en contactarnos.</p>
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

