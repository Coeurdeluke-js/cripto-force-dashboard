import React from 'react';
import BackButton from '@/components/ui/BackButton';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

export default function ModuloPractico8CorrelacionesContenido() {
  return (
    <div className="min-h-screen bg-[#121212] text-white px-2 sm:px-8 py-8 max-w-3xl mx-auto">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 pt-12 relative">
        {/* Boton Volver en la esquina superior izquierda */}
        <div className="absolute top-4 left-4">
          <BackButton />
          </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#ec4d58] mb-2 text-center">Curso Practico de Trading</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Modulo 8: Correlaciones entre Mercados</h2>

        <section className="mb-8">
          <div className="space-y-8">
            {/* Seccion A: Que son las Correlaciones */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">A) Que son las Correlaciones</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Definicion</h4>
                  <p className="text-sm mb-3">Las correlaciones miden la relacion estadistica entre dos o mas activos financieros.</p>
                  <p className="text-sm mb-3">Una correlacion puede ser positiva (los activos se mueven en la misma direccion) o negativa (se mueven en direcciones opuestas).</p>
                  <p className="text-sm">El valor de correlacion va de -1 a +1, donde 0 significa que no hay correlacion.</p>
          </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Tipos de Correlacion</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• Correlacion positiva (+1): Los activos se mueven perfectamente juntos</li>
                    <li>• Correlacion negativa (-1): Los activos se mueven en direcciones opuestas</li>
                    <li>• Sin correlacion (0): No hay relacion entre los movimientos</li>
            </ul>
          </div>
          </div>
          </div>

            {/* Seccion B: Correlaciones Principales */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">B) Correlaciones Principales en Forex</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Pares de Divisas</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• EUR/USD y GBP/USD: Alta correlacion positiva</li>
                    <li>• USD/JPY y USD/CHF: Correlacion positiva</li>
                    <li>• EUR/USD y USD/CHF: Correlacion negativa</li>
                    <li>• AUD/USD y NZD/USD: Alta correlacion positiva</li>
            </ul>
          </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Commodities y Divisas</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• USD y Oro: Generalmente correlacion negativa</li>
                    <li>• USD y Petroleo: Puede variar segun el contexto</li>
                    <li>• AUD/USD y Cobre: Correlacion positiva</li>
                    <li>• CAD/USD y Petroleo: Correlacion positiva</li>
                </ul>
              </div>
              </div>
            </div>

            {/* Seccion C: Como usar las Correlaciones */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">C) Como usar las Correlaciones en Trading</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Estrategias</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• Confirmacion de señales: Si dos pares correlacionados muestran la misma señal</li>
                    <li>• Diversificacion: Evitar posiciones en pares altamente correlacionados</li>
                    <li>• Oportunidades de arbitraje: Cuando las correlaciones se rompen temporalmente</li>
                    <li>• Gestion de riesgo: No sobre-exponerse a activos correlacionados</li>
            </ul>
          </div>

                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Riesgos</h4>
                  <p className="text-sm mb-3">• Las correlaciones pueden cambiar con el tiempo</p>
                  <p className="text-sm mb-3">• Eventos economicos pueden romper correlaciones establecidas</p>
                  <p className="text-sm">• No confiar exclusivamente en correlaciones para decisiones de trading</p>
            </div>
          </div>
        </div>

            {/* Seccion D: La pregunta del dia */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">D) La pregunta del dia</h3>
              
              <div className="space-y-4">
                <p className="text-sm mb-3">1. Como utilizaria las correlaciones para mejorar su gestion de riesgo?</p>
                <p className="text-sm mb-3">2. Que pares de divisas considera mas correlacionados y por que?</p>
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





