import React from 'react';
import BackButton from '@/components/ui/BackButton';

export default function ModuloPractico4Contenido() {
  return (
    <div className="min-h-screen bg-[#121212] text-white px-2 sm:px-8 py-8 max-w-3xl mx-auto">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 pt-12 relative">
        {/* Boton Volver en la esquina superior izquierda */}
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-[#ec4d58] mb-2 text-center">Curso Practico de Trading</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Modulo 4: Fibonacci y Medias Moviles</h2>

        <section className="mb-8">
          <div className="space-y-8">
            {/* Seccion A: Retrocesos de Fibonacci */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">A) Retrocesos de Fibonacci</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Que son los retrocesos de Fibonacci?</h4>
                  <p className="text-sm mb-3">Los retrocesos de Fibonacci son niveles de soporte y resistencia que se basan en la secuencia de Fibonacci, una serie de numeros donde cada numero es la suma de los dos anteriores.</p>
                  <p className="text-sm mb-3">Los niveles mas importantes de retroceso de Fibonacci son: 23.6%, 38.2%, 50%, 61.8% y 78.6%.</p>
                  <p className="text-sm">Estos niveles se utilizan para identificar posibles puntos de entrada y salida en el mercado.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Como se utilizan</h4>
                  <p className="text-sm mb-3">Para utilizar los retrocesos de Fibonacci, se traza una linea desde el punto mas alto hasta el punto mas bajo de un movimiento de precio (o viceversa).</p>
                  <p className="text-sm mb-3">Los niveles de Fibonacci se dibujan automaticamente en el grafico, mostrando donde el precio podria encontrar soporte o resistencia.</p>
                </div>
              </div>
            </div>

            {/* Seccion B: Medias Moviles */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">B) Medias Moviles</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Que son las medias moviles?</h4>
                  <p className="text-sm mb-3">Las medias moviles son indicadores tecnicos que muestran el precio promedio de un activo durante un periodo de tiempo especifico.</p>
                  <p className="text-sm mb-3">Las medias moviles mas comunes son: 20 periodos, 50 periodos, 100 periodos y 200 periodos.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Tipos de medias moviles</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• Media Movil Simple (SMA): Promedio aritmetico de los precios</li>
                    <li>• Media Movil Exponencial (EMA): Da mas peso a los precios mas recientes</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Senales de trading</h4>
                  <p className="text-sm mb-3">• Cuando el precio cruza por encima de la media movil: Senal alcista</p>
                  <p className="text-sm mb-3">• Cuando el precio cruza por debajo de la media movil: Senal bajista</p>
                  <p className="text-sm">• El cruce de dos medias moviles tambien puede generar senales de entrada y salida.</p>
                </div>
              </div>
            </div>

            {/* Seccion C: Estrategias combinadas */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">C) Estrategias combinadas</h3>
              
              <div className="space-y-4">
                <p className="text-sm mb-3">La combinacion de retrocesos de Fibonacci con medias moviles puede proporcionar senales mas confiables.</p>
                <p className="text-sm mb-3">Por ejemplo, buscar entradas en niveles de Fibonacci que coincidan con el soporte de una media movil importante.</p>
                <p className="text-sm">Esto aumenta la probabilidad de que el nivel de soporte o resistencia sea efectivo.</p>
              </div>
            </div>

            {/* Seccion D: La pregunta del dia */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">D) La pregunta del dia</h3>
              
              <div className="space-y-4">
                <p className="text-sm mb-3">1. Como utilizaria los retrocesos de Fibonacci para identificar puntos de entrada en un mercado en tendencia?</p>
                <p className="text-sm mb-3">2. Que diferencia hay entre una media movil simple y una exponencial, y cuando preferiria usar cada una?</p>
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





