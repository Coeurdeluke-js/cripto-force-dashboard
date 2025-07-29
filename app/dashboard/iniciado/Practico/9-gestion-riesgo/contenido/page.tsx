import React from 'react';
import BackButton from '@/components/ui/BackButton';

export default function ModuloPractico9GestionRiesgoContenido() {
  return (
    <div className="min-h-screen bg-[#121212] text-white px-2 sm:px-8 py-8 max-w-3xl mx-auto">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 pt-12 relative">
        {/* Boton Volver en la esquina superior izquierda */}
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#ec4d58] mb-2 text-center">Curso Practico de Trading</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Modulo 9: Gestion de Riesgo</h2>

        <section className="mb-8">
          <div className="space-y-8">
            {/* Seccion A: Que es la Gestion de Riesgo */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">A) Que es la Gestion de Riesgo</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Definicion</h4>
                  <p className="text-sm mb-3">La gestion de riesgo es el proceso de identificar, evaluar y controlar los riesgos financieros en el trading.</p>
                  <p className="text-sm mb-3">Es fundamental para la supervivencia y rentabilidad a largo plazo en los mercados financieros.</p>
                  <p className="text-sm">Sin una gestion de riesgo adecuada, incluso las mejores estrategias pueden llevar a perdidas significativas.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Objetivos</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• Proteger el capital de trading</li>
                    <li>• Limitar las perdidas maximas</li>
                    <li>• Mantener la consistencia en los resultados</li>
                    <li>• Permitir la recuperacion de perdidas</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Seccion B: Regla del 1-2% */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">B) Regla del 1-2%</h3>
              
            <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Explicacion</h4>
                  <p className="text-sm mb-3">La regla del 1-2% establece que nunca debe arriesgar mas del 1-2% de su capital total en una sola operacion.</p>
                  <p className="text-sm mb-3">Esto significa que si tiene $10,000 en su cuenta, no debe arriesgar mas de $100-$200 por operacion.</p>
                  <p className="text-sm">Esta regla ayuda a proteger el capital y permite recuperarse de una serie de perdidas.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Calculo del Tamaño de Posicion</h4>
                  <p className="text-sm mb-3">Tamaño de posicion = (Capital × Porcentaje de riesgo) ÷ Distancia al stop loss</p>
                  <p className="text-sm mb-3">Ejemplo: $10,000 × 0.02 ÷ 50 pips = 4 lotes micro</p>
                </div>
              </div>
            </div>

            {/* Seccion C: Stop Loss y Take Profit */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">C) Stop Loss y Take Profit</h3>
              
            <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Stop Loss</h4>
                  <p className="text-sm mb-3">El stop loss es una orden que cierra automaticamente la posicion cuando el precio alcanza un nivel predeterminado.</p>
                  <p className="text-sm mb-3">Debe colocarse en un nivel que invalide su analisis, no en un nivel arbitrario.</p>
                  <p className="text-sm">Nunca mueva un stop loss en direccion de la perdida.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Take Profit</h4>
                  <p className="text-sm mb-3">El take profit es una orden que cierra la posicion cuando se alcanza el objetivo de ganancia.</p>
                  <p className="text-sm mb-3">Debe basarse en niveles tecnicos importantes o en una relacion riesgo-beneficio favorable.</p>
                  <p className="text-sm">Una relacion riesgo-beneficio de 1:2 o mejor es recomendable.</p>
                </div>
              </div>
                </div>
                
            {/* Seccion D: La pregunta del dia */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">D) La pregunta del dia</h3>
              
            <div className="space-y-4">
                <p className="text-sm mb-3">1. Como calcularia el tamaño de posicion para una cuenta de $5,000 con riesgo del 1%?</p>
                <p className="text-sm mb-3">2. Donde colocaria el stop loss en una operacion de compra en EUR/USD?</p>
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





