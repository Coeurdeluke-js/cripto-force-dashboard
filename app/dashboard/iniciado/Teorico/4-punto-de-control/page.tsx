'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import CheckpointResultMessage from '@/components/ui/CheckpointResultMessage';
import ControlPointModal from '@/components/ui/ControlPointModal';

const preguntas = [
  {
    pregunta: "¿Qué es la intervención gubernamental en los mercados?",
    opciones: [
      "La participación del gobierno en la economía para corregir fallas del mercado",
      "La nacionalización de todas las empresas",
      "La eliminación de la competencia",
      "La privatización de servicios públicos"
    ],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Qué son los controles de precios?",
    opciones: [
      "Límites establecidos por el gobierno sobre los precios de bienes y servicios",
      "La fijación de precios por las empresas",
      "Los precios de mercado libre",
      "Los precios internacionales"
    ],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Qué es un precio máximo?",
    opciones: [
      "El precio más alto que puede cobrar un vendedor",
      "El precio más bajo que puede pagar un comprador",
      "Un límite superior establecido por el gobierno",
      "El precio de equilibrio del mercado"
    ],
    respuestaCorrecta: 2
  },
  {
    pregunta: "¿Qué es un precio mínimo?",
    opciones: [
      "El precio más alto que puede cobrar un vendedor",
      "Un límite inferior establecido por el gobierno",
      "El precio más bajo del mercado",
      "El precio de equilibrio"
    ],
    respuestaCorrecta: 1
  },
  {
    pregunta: "¿Qué son los impuestos?",
    opciones: [
      "Transferencias del gobierno a los ciudadanos",
      "Pagos obligatorios al gobierno para financiar servicios públicos",
      "Subsidios a las empresas",
      "Préstamos del gobierno"
    ],
    respuestaCorrecta: 1
  },
  {
    pregunta: "¿Qué son los subsidios?",
    opciones: [
      "Pagos del gobierno a productores o consumidores",
      "Impuestos adicionales",
      "Multas por incumplimiento",
      "Préstamos con intereses"
    ],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Qué caracteriza a la competencia perfecta?",
    opciones: [
      "Pocos vendedores con productos diferenciados",
      "Muchos vendedores con productos idénticos",
      "Un solo vendedor dominante",
      "Productos únicos y exclusivos"
    ],
    respuestaCorrecta: 1
  },
  {
    pregunta: "¿Qué es un precio tomador en competencia perfecta?",
    opciones: [
      "Una empresa que puede fijar sus propios precios",
      "Una empresa que acepta el precio del mercado",
      "Una empresa monopolística",
      "Una empresa oligopólica"
    ],
    respuestaCorrecta: 1
  },
  {
    pregunta: "¿Qué es la libertad de entrada y salida en competencia perfecta?",
    opciones: [
      "Las empresas pueden entrar y salir del mercado sin restricciones",
      "Solo las grandes empresas pueden entrar",
      "Las empresas están obligadas a permanecer",
      "Solo el gobierno puede autorizar entradas"
    ],
    respuestaCorrecta: 0
  },
  {
    pregunta: "¿Qué es la información perfecta en competencia perfecta?",
    opciones: [
      "Solo los vendedores conocen los precios",
      "Todos los participantes conocen todos los precios y productos",
      "Solo los compradores conocen los precios",
      "La información está oculta"
    ],
    respuestaCorrecta: 1
  },
  {
    pregunta: "¿Qué es la eficiencia en competencia perfecta?",
    opciones: [
      "Las empresas maximizan sus ganancias a costa de la sociedad",
      "Los recursos se asignan de manera óptima para maximizar el bienestar social",
      "Solo las grandes empresas son eficientes",
      "La eficiencia no importa en competencia perfecta"
    ],
    respuestaCorrecta: 1
  },
  {
    pregunta: "¿Por qué la competencia perfecta es un modelo teórico?",
    opciones: [
      "Porque no existe en la realidad",
      "Porque es un modelo ideal que sirve como referencia",
      "Porque solo existe en mercados pequeños",
      "Porque es un modelo obsoleto"
    ],
    respuestaCorrecta: 1
  }
];

export default function PuntoDeControl4() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState<number[]>(new Array(12).fill(null));
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const totalPreguntas = preguntas.length;

  const handleRespuesta = (respuesta: number) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[preguntaActual] = respuesta;
    setRespuestas(nuevasRespuestas);
    
    const esCorrecta = respuesta === preguntas[preguntaActual].respuestaCorrecta;
    if (esCorrecta) {
      setRespuestasCorrectas(prev => prev + 1);
    }
  };

  const siguientePregunta = () => {
    if (preguntaActual < totalPreguntas - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      setMostrarResultados(true);
    }
  };

  const preguntaAnterior = () => {
    if (preguntaActual > 0) {
      setPreguntaActual(preguntaActual - 1);
    }
  };

  const reiniciar = () => {
    setPreguntaActual(0);
    setRespuestas(new Array(12).fill(null));
    setMostrarResultados(false);
    setRespuestasCorrectas(0);
  };

  const handleStartCheckpoint = () => {
    setShowModal(false);
  };

  const porcentajeAprobacion = (respuestasCorrectas / totalPreguntas) * 100;
  const aprobado = porcentajeAprobacion >= 70;

  // Si no puede tomar el checkpoint, mostrar modal con timer
  if (!state.isActive && !canTakeCheckpoint(checkpointId)) {
    return (
      <ControlPointModal
        isOpen={showModal}
        onClose={() => router.push('/dashboard/iniciado')}
        onStart={handleStartCheckpoint}
        checkpointTitle="Punto de Control 2"
        modulesToEvaluate={[
          "Acción del Gobierno en los Mercados",
          "Competencia Perfecta"
        ]}
        timeUntilNextAttempt={getTimeUntilNextAttempt(checkpointId)}
        formatTime={formatTime}
      />
    );
  }

  if (mostrarResultados) {
    return (
      <div className="min-h-screen bg-[#121212] text-white pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Punto de Control 2</h1>
              <p className="text-xl text-gray-300">
                Evaluación: Módulos 3 y 4 - Intervención y Competencia
              </p>
            </div>

            <div className="mb-8">
              <CheckpointResultMessage 
                score={porcentajeAprobacion} 
                isApproved={aprobado} 
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#232323] p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Módulo 3: Acción del Gobierno en los Mercados</h3>
                <div className="space-y-2">
                  {preguntas.slice(0, 6).map((pregunta, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-full ${
                        respuestas[index] === pregunta.respuestaCorrecta 
                          ? 'bg-green-500' 
                          : 'bg-red-500'
                      }`} />
                      <span className="text-sm">Pregunta {index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#232323] p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Módulo 4: Competencia Perfecta</h3>
                <div className="space-y-2">
                  {preguntas.slice(6, 12).map((pregunta, index) => (
                    <div key={index + 6} className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-full ${
                        respuestas[index + 6] === pregunta.respuestaCorrecta 
                          ? 'bg-green-500' 
                          : 'bg-red-500'
                      }`} />
                      <span className="text-sm">Pregunta {index + 7}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={reiniciar}
                className="px-6 py-3 bg-[#ec4d58] hover:bg-[#d63d47] text-white rounded-lg transition-colors"
              >
                Intentar de Nuevo
              </button>
              <button
                onClick={() => router.push('/dashboard/iniciado')}
                className="px-6 py-3 bg-[#232323] hover:bg-[#2a2a2a] text-white rounded-lg transition-colors"
              >
                Volver al Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const pregunta = preguntas[preguntaActual];
  const modulo = preguntaActual < 6 ? 3 : 4;

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Punto de Control 2</h1>
            <p className="text-xl text-gray-300">
              Evaluación: Módulos 3 y 4 - Intervención y Competencia
            </p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#232323] rounded-2xl p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-400">
                  Pregunta {preguntaActual + 1} de {totalPreguntas}
                </span>
                <span className="text-sm text-gray-400">
                  Módulo {modulo}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-6 leading-relaxed">
                {pregunta.pregunta}
              </h3>
            </div>

            <div className="space-y-3">
              {pregunta.opciones.map((opcion, index) => {
                const isSelected = respuestas[preguntaActual] === index;
                
                return (
                  <label
                    key={index}
                    className={`block p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                      isSelected 
                        ? 'bg-[#ec4d58] border-[#ec4d58] text-white' 
                        : 'bg-[#232323] border-[#2a2a2a] text-gray-300 hover:bg-[#2a2a2a] hover:border-[#ec4d58]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`pregunta-${preguntaActual}`}
                      value={index}
                      checked={isSelected}
                      onChange={() => handleRespuesta(index)}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        isSelected 
                          ? 'border-white bg-white' 
                          : 'border-gray-500'
                      }`}>
                        {isSelected && (
                          <div className="w-2 h-2 bg-[#ec4d58] rounded-full"></div>
                        )}
                      </div>
                      <span className="flex-1">{opcion}</span>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                onClick={preguntaAnterior}
                disabled={preguntaActual === 0}
                className="px-6 py-3 bg-[#232323] hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Anterior
              </button>

              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">
                  Progreso: {preguntaActual + 1} de {totalPreguntas}
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: totalPreguntas }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i === preguntaActual
                          ? 'bg-[#ec4d58]'
                          : respuestas[i] !== null
                          ? 'bg-green-500'
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={siguientePregunta}
                disabled={respuestas[preguntaActual] === null}
                className="px-6 py-3 bg-[#ec4d58] hover:bg-[#d63d47] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                {preguntaActual === totalPreguntas - 1 ? 'Ver Resultados' : 'Siguiente'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}