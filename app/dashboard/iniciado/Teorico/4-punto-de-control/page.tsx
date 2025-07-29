'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useControlPoint } from '@/context/ControlPointContext';
import PreguntaCard from './components/PreguntaCard';
import ControlPointModal from '@/components/ui/ControlPointModal';
import { preguntas } from './components/preguntas';
import { Clock, AlertTriangle } from 'lucide-react';
import CheckpointResultMessage from '@/components/ui/CheckpointResultMessage';

export default function PuntoDeControl4() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState<(number | null)[]>(new Array(12).fill(null));
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const {
    state,
    startCheckpoint,
    finishCheckpoint,
    canTakeCheckpoint,
    getTimeUntilNextAttempt,
    getTimeRemaining,
    formatTime
  } = useControlPoint();

  const totalPreguntas = 12;
  const checkpointId = 'PC2';

  // Verificar si puede tomar el checkpoint al cargar
  useEffect(() => {
    if (!state.isActive && !canTakeCheckpoint(checkpointId)) {
      setShowModal(true);
    }
  }, [state.isActive, canTakeCheckpoint, checkpointId]);

  // Iniciar checkpoint si no está activo
  useEffect(() => {
    if (!state.isActive && canTakeCheckpoint(checkpointId)) {
      startCheckpoint(checkpointId);
    }
  }, [state.isActive, canTakeCheckpoint, checkpointId, startCheckpoint]);

  const handleRespuesta = (respuesta: number) => {
    if (respuestas[preguntaActual] !== null) return;

    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[preguntaActual] = respuesta;
    setRespuestas(nuevasRespuestas);

    // Verificar si es correcta
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
      finishCheckpoint();
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
    startCheckpoint(checkpointId);
  };

  const handleStartCheckpoint = () => {
    setShowModal(false);
    startCheckpoint(checkpointId);
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
            
            {/* Timer */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <Clock className="text-yellow-500" />
              <span className="text-lg font-mono text-yellow-500">
                {formatTime(getTimeRemaining())}
              </span>
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#232323] rounded-2xl p-8">
            <PreguntaCard
              pregunta={pregunta.pregunta}
              opciones={pregunta.opciones}
              respuestaCorrecta={pregunta.respuestaCorrecta}
              respuestaSeleccionada={respuestas[preguntaActual]}
              respuestaCorrectaEstado={respuestas[preguntaActual] === pregunta.respuestaCorrecta}
              onSeleccion={handleRespuesta}
              modulo={modulo}
              preguntaActual={preguntaActual}
              totalPreguntas={totalPreguntas}
              respuestasCorrectas={respuestasCorrectas}
            />

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