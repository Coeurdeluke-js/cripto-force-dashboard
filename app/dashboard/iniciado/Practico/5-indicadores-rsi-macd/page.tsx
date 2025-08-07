import React from 'react';
import { ArrowLeft, BookOpen, CheckCircle, Clock, Target } from 'lucide-react';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';

export default function ModuloPractico5() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BackButton />
              <div>
                <h1 className="text-xl font-semibold">Módulo 5: Indicadores RSI y MACD</h1>
                <p className="text-gray-400 text-sm">Osciladores y confirmación de señales</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-400">Tiempo estimado: 60 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose prose-invert max-w-none">
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Lección 4: Osciladores (RSI y MACD)</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">A) Índice de Fuerza Relativa</h3>
                
                <h4 className="font-semibold mb-2">Índice de Fuerza Relativa (RSI)</h4>
                <h5 className="font-semibold mb-2">¿En qué consiste el RSI?</h5>
                
                <h5 className="font-semibold mb-2">¿Qué Hace el RSI?</h5>
                <p className="mb-4">
                  El RSI es un indicador dentro de la categoría de los osciladores y su uso es extremadamente sencillo. El RSI funciona bien en los mercados que están en rango, pero no es bueno para determinar tendencias y mercados en donde el operador compra o vende cuando la divisa rompe el nivel de soporte (breakout markets). El RSI fue creado por Welles Wilder, quien también creó el ATR, el SAR Parabólico y otros indicadores muy conocidos.
                </p>
                <p className="mb-4">
                  Al igual que otros osciladores, el RSI brinda indicios respecto de cuándo un par de divisas se encuentran en sobrecompra/sobreventa. El RSI calcula fundamentalmente la fuerza de todas las velas ascendentes (las verdes) en comparación con la fuerza de todas las velas descendentes (las rojas) en el curso de un determinado marco de tiempo.
                </p>

                <h5 className="font-semibold mb-2">El Concepto de los Osciladores</h5>
                <p className="mb-4">
                  El principio en el que se basan los osciladores es en el de la regresión a una media. En esencia, una gran parte de una muestra estadística debería encontrarse dentro de una cierta cantidad de desviaciones estándar a partir de la media de la muestra, y si el precio se aleja demasiado de este centro, es probable que regrese al resto de la muestra. En términos de compraventa, el precio no debería aumentar o bajar demasiado en un período de tiempo demasiado corto.
                </p>
                <p className="mb-4">
                  Los osciladores consisten en estudios de gráficos diseñados para mostrar la fuerza del precio actual con relación al precio reciente. Como tales, muestran el impulso del mercado a corto plazo, dando señales de que la dirección del mercado está cambiando antes de que este realmente lo haga. Es importante recordar que el RSI no ha sido diseñado para analizar mercados en tendencia.
                </p>
                <p className="mb-4">
                  Usualmente no se muestran los osciladores en el mismo gráfico del precio, sino que más frecuentemente se les ubica en la parte inferior del gráfico para mostrar que las fluctuaciones no ocurren en la misma escala que el movimiento de los precios.
                </p>

                <h5 className="font-semibold mb-2">Parámetros</h5>
                <p className="mb-4">
                  Cuando se indica el RSI en un gráfico, la aplicación de gráficos le solicitará que seleccione cuántos períodos desea incluir en su estudio. El número más corrientemente usado es el 14 y la mayoría de los operadores no modifican esta configuración predeterminada. Algunos operadores utilizan el RSI en un período de 9 o 25 en lugar del estándar de 14. Por supuesto, al aumentar la cantidad de entradas disminuye la cantidad de señales y aumenta la confiabilidad de dichas señales. Disminuir la cantidad de entradas tendría el efecto contrario.
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-2">¿Cómo utilizar el RSI en la compraventa?</h4>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Se le puede utilizar para determinar niveles de sobrecompra/sobreventa.</li>
                  <li>Se le puede utilizar para identificar divergencias que indican una potencial debilidad en las tendencias.</li>
                </ul>

                <h5 className="font-semibold mb-2">Sobrecompra/Sobreventa</h5>
                <p className="mb-4">
                  Si el RSI se encuentra por encima de 70, se considera que hay sobrecompra del par. Algunos operadores ingresan a corto en este momento pero ello puede ser peligroso dado que el precio puede continuar aumentando. Ingrese a corto cuando el RSI presente un cruce por debajo de 70 dado que ello puede indicar que ha cambiado la tendencia.
                </p>
                <p className="mb-4">
                  Si el RSI se encuentra por debajo de los 30, se considera que hay sobreventa del par; ingrese cuando el RSI hubiera presentado un cruce por encima de los 30. Al igual que la mayoría de los osciladores, el RSI funciona mejor cuando el mercado se mueve dentro de unos parámetros determinados; en otras palabras, cuando se espera que el mercado simplemente oscile entre un nivel superior e inferior.
                </p>

                <h5 className="font-semibold mb-2">Divergencia</h5>
                <p className="mb-4">
                  El RSI también puede utilizarse para indicar cuando una tendencia se está debilitando. Si un par de divisas presenta nuevos máximos en su precio pero el RSI no lo evidencia, lo que implica una divergencia entre el movimiento del precio y el RSI, es posible que exista la señal de que la tendencia no sea fuerte y que un movimiento inverso sea inminente. Si el patrón de velas lo confirma, el operador puede valerse de esta oportunidad para ingresar una posición.
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">B) RSI: Operaciones Históricas</h3>
                
                <h4 className="font-semibold mb-2">RSI: Operaciones Históricas</h4>
                <h5 className="font-semibold mb-2">Sobrecompra/Sobreventa</h5>
                <p className="mb-4">
                  El gráfico que aparece a continuación brinda un ejemplo de cómo se puede utilizar el RSI para determinar si un par de divisas se encuentra en sobrecompra/sobreventa. Las lecturas por encima de 70 indican la sobrecompra y las lecturas por debajo de 30 indican la sobreventa.
                </p>

                <h5 className="font-semibold mb-2">Divergencia</h5>
                <p className="mb-4">
                  El gráfico que aparece a continuación es un ejemplo de cómo se podría haber utilizado una divergencia en el RSI para operar.
                </p>
                <p className="mb-4">
                  Supongamos una posición de venta en descubierto cerca de 1,8900 con una salida en los 1,9150 hubiera alcanzado un límite cerca de 1,8400 antes de que el precio alcanzara la línea de apoyo. En términos reales éste hubiera sido un buen punto para cubrirse (salir de la operación).
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">C) Trabajo Práctico – Colocación de una Operación</h3>
                <div className="bg-blue-900 border border-blue-700 rounded p-3 mb-4">
                  <p className="font-semibold mb-2">TRABAJO PRÁCTICO:</p>
                  <p className="mb-2">
                    Utilizando los métodos descritos en esta lección, realice una operación en su cuenta demo en base al indicador RSI. Responda comentándonos su operación y por qué la realizó. Si lo desea, no dude en enviarnos una imagen del gráfico que usted está viendo como ayuda para transmitirnos por qué realizó esa operación. De ser posible, trate de concentrarse en un período de tiempo más prolongado, como un gráfico diario. Puede utilizar situaciones actuales o pasadas.
                  </p>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">D) La pregunta del Día</h3>
                <p className="mb-4">
                  El RSI utiliza niveles de 30 y 70 para indicar la posibilidad de que el mercado esté a punto de revertirse, aunque es un indicador impreciso. Si el RSI se encuentra por encima de 70, demuestra que el mercado está en sobrecompra y que podría haber una venta en baja; sin embargo, si usted vende cuando el RSI se encuentra por encima de 70, asume el riesgo de operar en contra de una tendencia fuerte. Los mercados siempre pueden volverse más fuertes o más débiles, a pesar del hecho de que nuestros indicadores expresen una sobrecompra o una sobreventa.
                </p>
                <p className="mb-4">
                  ¿Qué otros indicadores, que ya hemos tratado, podrían utilizarse junto con el RSI para ayudarnos a identificar el movimiento inverso de una tendencia fuerte?
                </p>
                <div className="bg-yellow-900 border border-yellow-700 rounded p-3">
                  <p className="text-sm">
                    <strong>NOTA:</strong> La pregunta del día es una pregunta retórica, cuyo objetivo es ayudarle a revisar lo que acaba de aprender. NO es necesario enviarnos una respuesta, ya que estas preguntas no son evaluadas. Sin embargo, si tiene dudas, o si desea compartir sus ideas con nosotros, no dude en contactarnos por email a Cursos@fxcmchile.cl
                  </p>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">E) Prueba RSI</h3>
                <p className="mb-4">
                  Por favor evalúe su conocimiento sobre lo aprendido en esta lección. Acceda la prueba haciendo clic sobre el siguiente enlace:
                </p>
                <a 
                  href="http://www.cursosforex.cl/viewtopic.php?f=5&t=8&sid=1aedce756ccba5161b2d838a22cd9d1b" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Acceder a la Prueba RSI
                </a>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">F) Operar con MACD</h3>
                
                <h4 className="font-semibold mb-2">Operar con MACD - Convergencia-Divergencia de la Media Móvil (a menudo se pronuncia Mac-D)</h4>
                
                <h5 className="font-semibold mb-2">¿En qué consiste el MACD?</h5>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>El MACD es un indicador técnico usado muy frecuentemente, deriva de las medias móviles exponenciales que pueden utilizarse tanto en mercados de impulsos como en aquellos que se mueven dentro de un límite de parámetros determinado.</li>
                  <li>Al igual que el RSI, es un oscilador trazado en la parte inferior del gráfico e indica el impulso del mercado con relación a su historia reciente.</li>
                </ul>

                <h5 className="font-semibold mb-2">¿Qué hace?</h5>
                <p className="mb-4">
                  Se puede utilizar como un oscilador, es decir indica que el activo regresará a su valuación media, o se lo puede utilizar como un indicador de impulso, indica que la tendencia es fuerte y que continuará siendo así.
                </p>

                <h5 className="font-semibold mb-2">Parámetros:</h5>
                <p className="mb-4">La línea MACD es la diferencia entre la EMA (Media Móvil Exponencial) de 12 y 26 días. La línea de la señal es la EMA de 9 días del MACD.</p>

                <p className="mb-4">
                  Visualmente, el MACD está compuesto de tres elementos:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li><strong>La línea MACD:</strong> simplemente es la diferencia entre la EMA de 12 y 26 días. Es una línea trazada en el gráfico.</li>
                  <li><strong>La línea de la señal:</strong> es la EMA de 9 días de la línea MACD. Al igual que el MACD, es una línea trazada en la parte inferior del gráfico.</li>
                  <li><strong>El histograma:</strong> es simplemente un gráfico de barras ubicado en la parte inferior del gráfico en el que se trazan las líneas MACD y de la señal. El histograma es simplemente una representación visual de la diferencia entre la línea MACD y la línea de la señal.</li>
                </ul>

                <p className="mb-4">
                  El punto "cero" del histograma, que significa el punto en el que las barras se cruzan por encima y por debajo, se denomina línea central.
                </p>

                <h5 className="font-semibold mb-2">¿Cómo se usa?</h5>
                
                <h6 className="font-semibold mb-2">Señal de toma de posiciones:</h6>
                <p className="mb-4">
                  Cuando la línea MACD atraviesa la línea de señal, se emite una señal de toma de posiciones. Los operadores pueden ingresar posiciones siguiendo la dirección de MACD.
                </p>

                <h6 className="font-semibold mb-2">Divergencia:</h6>
                <p className="mb-4">
                  Cuando el par presenta nuevos máximos/mínimos pero el MACD no lo manifiesta, ello sugiere una divergencia y que la tendencia de hecho puede estar debilitándose con un movimiento inverso interno.
                </p>

                <h6 className="font-semibold mb-2">Sobrecompra/Sobreventa:</h6>
                <p className="mb-4">
                  No se han indicado números específicos en cuanto a si existe sobrecompra o sobreventa, pero si se encuentra relativamente alejado de su media, en comparación con sus antecedentes históricos recientes, esto podría sugerir que se debe a un movimiento inverso.
                </p>
                <p className="mb-4">
                  Considere el gráfico que aparece a continuación, éste explica cómo se puede utilizar un indicador MACD.
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">G) MACD: Operaciones Históricas</h3>
                
                <h4 className="font-semibold mb-2">Utilizando un Cruce de MACD</h4>
                <p className="mb-4">
                  El cruce de MACD es un indicador directo de los tiempos precisos para los puntos de ingreso. La única desventaja que presenta es que a veces es demasiado lento para mostrar una señal. A veces, muestra el ingreso de distintas velas después de un punto de ingreso ideal. El precio se ha alejado ya tanto que la operación no presenta un riesgo favorable, es decir, una tasa favorable. Siempre considere el apoyo/resistencia al ingresar a una operación, más allá de los cruces.
                </p>
                <p className="mb-4">
                  El segundo gráfico muestra que si bien la divergencia MACD puede ser una señal efectiva, como los cruces, no se debe considerar en forma aislada. Esta divergencia en un gráfico diario tuvo un año de duración antes de que el par finalmente rompiera el nivel se soporte y cayera.
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">H) Trabajo Práctico- Colocación de una Operación</h3>
                <div className="bg-blue-900 border border-blue-700 rounded p-3 mb-4">
                  <p className="font-semibold mb-2">TRABAJO PRÁCTICO:</p>
                  <p className="mb-2">
                    Utilizando los cruces MACD, realice una operación basándose en el gráfico o determine un punto de ingreso posible en base a la divergencia en combinación con otros indicadores. Coméntenos por e-mail su operación y por qué la realizó. Si lo desea, no dude en enviarnos una imagen del gráfico que usted está viendo como ayuda para transmitirnos por qué realizó esa operación. De ser posible, trate de concentrarse en un período de tiempo más prolongado, como un gráfico diario. Puede utilizar situaciones actuales o pasadas.
                  </p>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">I) La pregunta del día</h3>
                <p className="mb-4">
                  El MACD ofrece una gran cantidad de señales en base a los cruces con la línea de la señal, el MACD y la línea horizontal. Describa según su criterio cuál sería la situación ideal para una señal MACD. De las distintas señales disponibles, cruces, divergencias, los cruces de MACD con la línea central, ¿cuál, según usted, es la señal ideal? Si usted ya tiene experiencia con el MACD, también se puede referir a ello.
                </p>
                <div className="bg-yellow-900 border border-yellow-700 rounded p-3">
                  <p className="text-sm">
                    <strong>NOTA:</strong> La pregunta del día es una pregunta retórica, cuyo objetivo es ayudarle a revisar lo que acaba de aprender. NO es necesario enviarnos una respuesta, ya que estas preguntas no son evaluadas. Sin embargo, si tiene dudas, o si desea compartir sus ideas con nosotros, no dude en contactarnos por email a Cursos@fxcmchile.cl
                  </p>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">J) Prueba MACD</h3>
                <p className="mb-4">
                  Por favor evalúe su conocimiento sobre lo aprendido en esta lección. Acceda la prueba haciendo clic sobre el siguiente enlace:
                </p>
                <a 
                  href="http://www.cursosforex.cl/viewtopic.php?f=5&t=8&sid=1aedce756ccba5161b2d838a22cd9d1b" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Acceder a la Prueba MACD
                </a>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-400">
              <p>www.fxcmchile.cl</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 