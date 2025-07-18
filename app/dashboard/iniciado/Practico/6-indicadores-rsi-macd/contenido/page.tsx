import React from 'react';
import BackButton from '@/components/ui/BackButton';

export default function ModuloPractico6Contenido() {
  return (
    <div className="min-h-screen bg-[#121212] text-white px-2 sm:px-8 py-8 max-w-3xl mx-auto">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 pt-12 relative">
        {/* Boton Volver en la esquina superior izquierda */}
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-[#ec4d58] mb-2 text-center">Curso Practico de Trading</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Modulo 6: Indicadores RSI y MACD</h2>

        <section className="mb-8">
          <div className="space-y-8">
            {/* Seccion A: RSI (Indice de Fuerza Relativa) */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">A) RSI (Indice de Fuerza Relativa)</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Que es el RSI?</h4>
                  <p className="text-sm mb-3">El RSI es un oscilador de momentum que mide la velocidad y magnitud de los cambios de precio.</p>
                  <p className="text-sm mb-3">Oscila entre 0 y 100, donde valores por encima de 70 indican sobrecompra y valores por debajo de 30 indican sobreventa.</p>
                  <p className="text-sm">El RSI se calcula comparando las ganancias promedio con las pérdidas promedio durante un periodo de tiempo especifico.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Como interpretar el RSI</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• RSI &gt; 70: Mercado sobrecomprado, posible reversión bajista</li>
                    <li>• RSI &lt; 30: Mercado sobrevendido, posible reversión alcista</li>
                    <li>• Divergencias: Cuando el precio y el RSI se mueven en direcciones opuestas</li>
                    <li>• Niveles de 50: Línea central que separa momentum alcista y bajista</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Estrategias con RSI</h4>
                  <p className="text-sm mb-3">• Entrada en sobreventa: Comprar cuando el RSI sale de la zona de sobreventa</p>
                  <p className="text-sm mb-3">• Entrada en sobrecompra: Vender cuando el RSI sale de la zona de sobrecompra</p>
                  <p className="text-sm">• Confirmación: Usar junto con otros indicadores y patrones de velas</p>
                </div>
              </div>
            </div>

            {/* Seccion B: MACD */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">B) MACD (Convergencia-Divergencia de Medias Moviles)</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Que es el MACD?</h4>
                  <p className="text-sm mb-3">El MACD es un indicador de momentum que muestra la relación entre dos medias moviles exponenciales.</p>
                  <p className="text-sm mb-3">Se compone de tres elementos: la línea MACD, la línea de señal y el histograma.</p>
                  <p className="text-sm">El MACD se calcula restando la EMA de 26 periodos de la EMA de 12 periodos.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Componentes del MACD</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• Línea MACD: Diferencia entre EMA 12 y EMA 26</li>
                    <li>• Línea de Señal: EMA de 9 periodos de la línea MACD</li>
                    <li>• Histograma: Diferencia entre la línea MACD y la línea de señal</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Señales del MACD</h4>
                  <p className="text-sm mb-3">• Cruce alcista: La línea MACD cruza por encima de la línea de señal</p>
                  <p className="text-sm mb-3">• Cruce bajista: La línea MACD cruza por debajo de la línea de señal</p>
                  <p className="text-sm mb-3">• Divergencias: Cuando el precio y el MACD se mueven en direcciones opuestas</p>
                  <p className="text-sm">• Histograma: Muestra la fuerza del momentum</p>
                </div>
              </div>
            </div>

            {/* Seccion C: Estrategias combinadas */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">C) Estrategias combinadas</h3>
              
              <div className="space-y-4">
                <p className="text-sm mb-3">La combinación del RSI y MACD puede proporcionar señales más confiables:</p>
                <ul className="text-sm space-y-2 mb-3">
                  <li>• Confirmación de tendencia: RSI y MACD en la misma dirección</li>
                  <li>• Entrada alcista: RSI en sobreventa + cruce alcista del MACD</li>
                  <li>• Entrada bajista: RSI en sobrecompra + cruce bajista del MACD</li>
                  <li>• Divergencias múltiples: Cuando ambos indicadores muestran divergencias</li>
                </ul>
                <p className="text-sm">Esto reduce las señales falsas y aumenta la probabilidad de éxito.</p>
              </div>
            </div>

            {/* Seccion D: La pregunta del dia */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">D) La pregunta del dia</h3>
              
              <div className="space-y-4">
                <p className="text-sm mb-3">1. Como utilizaria el RSI para identificar divergencias en una tendencia fuerte?</p>
                <p className="text-sm mb-3">2. Que diferencia hay entre un cruce del MACD y una divergencia del MACD?</p>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <p className="text-sm text-gray-300"><strong>NOTA:</strong> La pregunta del dia es una pregunta retorica, cuyo objetivo es ayudarle a revisar lo que acaba de aprender. NO es necesario enviarnos una respuesta, ya que estas preguntas no son evaluadas.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Boton Volver al final del texto, del lado izquierdo */}
        <div className="mt-8">
          <BackButton />
        </div>
      </div>
    </div>
  );
} 
