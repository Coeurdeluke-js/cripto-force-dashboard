import React from 'react';
import BackButton from '@/components/ui/BackButton';

export default function ModuloPractico10PlanTradingContenido() {
  return (
    <div className="min-h-screen bg-[#121212] text-white px-2 sm:px-8 py-8 max-w-3xl mx-auto">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 pt-12 relative">
        {/* Boton Volver en la esquina superior izquierda */}
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#ec4d58] mb-2 text-center">Curso Practico de Trading</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Modulo 10: Plan de Trading</h2>

        <section className="mb-8">
          <div className="space-y-8">
            {/* Seccion A: Que es un Plan de Trading */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">A) Que es un Plan de Trading</h3>
              
              <div className="space-y-4">
              <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Definicion</h4>
                  <p className="text-sm mb-3">Un plan de trading es un documento escrito que detalla su estrategia, gestion de riesgo y reglas de trading.</p>
                  <p className="text-sm mb-3">Es esencial para mantener la disciplina y consistencia en el trading.</p>
                  <p className="text-sm">Sin un plan, el trading se convierte en apostar en lugar de invertir.</p>
              </div>

              <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Elementos Clave</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• Objetivos de trading claros</li>
                    <li>• Estrategias especificas</li>
                    <li>• Reglas de gestion de riesgo</li>
                    <li>• Criterios de entrada y salida</li>
                    <li>• Sistema de evaluacion de resultados</li>
                    </ul>
                </div>
              </div>
            </div>

            {/* Seccion B: Componentes del Plan */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">B) Componentes del Plan de Trading</h3>
              
                <div className="space-y-4">
              <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Analisis de Mercado</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• Pares de divisas que va a operar</li>
                    <li>• Marcos temporales que utilizara</li>
                    <li>• Indicadores tecnicos que aplicara</li>
                    <li>• Horarios de trading</li>
                  </ul>
                    </div>
                    
              <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Gestion de Riesgo</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• Porcentaje maximo de riesgo por operacion</li>
                    <li>• Tamaño maximo de posicion</li>
                    <li>• Numero maximo de operaciones simultaneas</li>
                    <li>• Stop loss y take profit estrategicos</li>
                  </ul>
                    </div>
                    
              <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Reglas de Trading</h4>
                  <ul className="text-sm space-y-2 mb-3">
                    <li>• Criterios especificos de entrada</li>
                    <li>• Condiciones de salida</li>
                    <li>• Reglas para ajustar posiciones</li>
                    <li>• Protocolos para eventos de mercado</li>
                  </ul>
                </div>
              </div>
                    </div>
                    
            {/* Seccion C: Implementacion */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">C) Implementacion del Plan</h3>
              
                <div className="space-y-4">
              <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Pasos para Implementar</h4>
                  <ol className="text-sm space-y-2 mb-3">
                    <li>1. Escriba su plan en detalle</li>
                    <li>2. Practique en una cuenta demo</li>
                    <li>3. Revise y ajuste el plan segun sea necesario</li>
                    <li>4. Implemente gradualmente en cuenta real</li>
                    <li>5. Mantenga un diario de trading</li>
                  </ol>
              </div>

              <div>
                  <h4 className="font-semibold text-[#ec4d58] mb-2">Mantenimiento</h4>
                  <p className="text-sm mb-3">• Revise su plan regularmente (semanal/mensual)</p>
                  <p className="text-sm mb-3">• Ajuste basado en resultados y cambios de mercado</p>
                  <p className="text-sm">• Mantenga la disciplina de seguir el plan</p>
                </div>
              </div>
                  </div>
                  
            {/* Seccion D: La pregunta del dia */}
            <div className="bg-[#181818] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#ec4d58] mb-4">D) La pregunta del dia</h3>
              
              <div className="space-y-4">
                <p className="text-sm mb-3">1. Que elementos considera mas importantes en su plan de trading personal?</p>
                <p className="text-sm mb-3">2. Como evaluaria la efectividad de su plan de trading?</p>
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


