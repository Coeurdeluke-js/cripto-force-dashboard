import React from 'react';
import BackButton from '@/components/ui/BackButton';

export default function ModuloPractico7Contenido() {
  return (
    <div className="min-h-screen bg-[#121212] text-white px-2 sm:px-8 py-8 max-w-3xl mx-auto">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 pt-12 relative">
        {/* Boton Volver en la esquina superior izquierda */}
        <div className="absolute top-4 left-4">
          <BackButton />
          </div>
          
        <h1 className="text-3xl sm:text-4xl font-bold text-[#ec4d58] mb-2 text-center">Curso Practico de Trading</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Modulo 7: Analisis Fundamental</h2>

        <section className="mb-8">
          <div className="space-y-8">
            {/* Seccion A: Que es el Analisis Fundamental */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">A) Que es el Analisis Fundamental</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Definicion</h4>
                  <p className="text-sm mb-3">El analisis fundamental es el estudio de los factores economicos, politicos y sociales que afectan el valor de una moneda.</p>
                  <p className="text-sm mb-3">A diferencia del analisis tecnico, que se enfoca en patrones de precio, el analisis fundamental examina las causas subyacentes de los movimientos del mercado.</p>
                  <p className="text-sm">El objetivo es determinar si una moneda esta sobrevalorada o infravalorada en relacion a su valor real.</p>
          </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Factores principales</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• Indicadores economicos (PIB, inflacion, desempleo)</li>
                    <li>• Politica monetaria de los bancos centrales</li>
                    <li>• Eventos politicos y geopoliticos</li>
                    <li>• Balanza comercial y flujos de capital</li>
                    <li>• Sentimiento del mercado y noticias</li>
            </ul>
          </div>
        </div>
          </div>

            {/* Seccion B: Indicadores Economicos Clave */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">B) Indicadores Economicos Clave</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">PIB (Producto Interno Bruto)</h4>
                  <p className="text-sm mb-3">El PIB mide el valor total de todos los bienes y servicios producidos en una economia.</p>
                  <p className="text-sm mb-3">Un PIB fuerte generalmente fortalece la moneda, mientras que un PIB debil la debilita.</p>
                  <p className="text-sm">Los traders monitorean las revisiones del PIB y las expectativas del mercado.</p>
          </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Inflacion</h4>
                  <p className="text-sm mb-3">La inflacion mide el aumento general de precios en una economia.</p>
                  <p className="text-sm mb-3">Inflacion moderada puede ser positiva, pero inflacion alta puede debilitar una moneda.</p>
                  <p className="text-sm">Los bancos centrales ajustan las tasas de interes en respuesta a la inflacion.</p>
          </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Tasa de Desempleo</h4>
                  <p className="text-sm mb-3">Indica la salud del mercado laboral y la economia en general.</p>
                  <p className="text-sm mb-3">Tasas de desempleo bajas generalmente fortalecen la moneda.</p>
                  <p className="text-sm">Los traders prestan atencion a las revisiones de datos de empleo.</p>
          </div>
        </div>
          </div>

            {/* Seccion C: Bancos Centrales */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">C) Bancos Centrales y Politica Monetaria</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Tasas de Interes</h4>
                  <p className="text-sm mb-3">Las tasas de interes son uno de los factores mas importantes que afectan el valor de una moneda.</p>
                  <p className="text-sm mb-3">Tasas mas altas atraen inversion extranjera y fortalecen la moneda.</p>
                  <p className="text-sm">Los traders monitorean las decisiones de tasas de interes y las declaraciones de los bancos centrales.</p>
          </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Bancos Centrales Principales</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• Federal Reserve (Fed) - Estados Unidos</li>
                    <li>• European Central Bank (ECB) - Eurozona</li>
                    <li>• Bank of England (BoE) - Reino Unido</li>
                    <li>• Bank of Japan (BoJ) - Japon</li>
                    <li>• Reserve Bank of Australia (RBA) - Australia</li>
            </ul>
            </div>
          </div>
        </div>

            {/* Seccion D: La pregunta del dia */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">D) La pregunta del dia</h3>
              
              <div className="space-y-4">
                <p className="text-sm mb-3">1. Como afectaria un aumento en las tasas de interes al valor de una moneda?</p>
                <p className="text-sm mb-3">2. Que indicadores economicos considera mas importantes para el trading de divisas?</p>
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





