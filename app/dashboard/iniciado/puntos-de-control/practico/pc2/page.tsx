'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import CheckpointResultMessage from '@/components/ui/CheckpointResultMessage';

const questions = [
  {
    id: 1,
    question: "¿Qué es el RSI?",
    options: [
      "Relative Strength Index - indicador de sobrecompra/sobreventa",
      "Real Stock Indicator",
      "Random Signal Index",
      "Rate of Speed Index"
    ],
    correct: 0
  },
  {
    id: 2,
    question: "¿Qué valores del RSI indican sobrecompra?",
    options: [
      "Por debajo de 30",
      "Por encima de 70",
      "Entre 40 y 60",
      "Por debajo de 20"
    ],
    correct: 1
  },
  {
    id: 3,
    question: "¿Qué es el MACD?",
    options: [
      "Moving Average Convergence Divergence",
      "Market Analysis and Chart Data",
      "Money and Currency Data",
      "Market Average Calculation"
    ],
    correct: 0
  },
  {
    id: 4,
    question: "¿Qué son las bandas de Bollinger?",
    options: [
      "Líneas de soporte y resistencia",
      "Bandas que muestran la volatilidad del precio",
      "Indicadores de volumen",
      "Medias móviles simples"
    ],
    correct: 1
  },
  {
    id: 5,
    question: "¿Qué es el análisis fundamental?",
    options: [
      "Solo analizar gráficos",
      "Evaluar factores económicos, financieros y cualitativos",
      "Usar solo indicadores técnicos",
      "Seguir las noticias del día"
    ],
    correct: 1
  },
  {
    id: 6,
    question: "¿Qué es la gestión de riesgo?",
    options: [
      "Arriesgar todo el capital",
      "Limitar las pérdidas potenciales",
      "Solo operar cuando hay ganancias seguras",
      "Ignorar las pérdidas"
    ],
    correct: 1
  },
  {
    id: 7,
    question: "¿Qué es el ratio riesgo/beneficio?",
    options: [
      "La relación entre pérdida potencial y ganancia potencial",
      "El porcentaje de ganancia",
      "El tiempo de la operación",
      "El volumen de operaciones"
    ],
    correct: 0
  },
  {
    id: 8,
    question: "¿Qué es la correlación entre mercados?",
    options: [
      "La relación entre diferentes activos financieros",
      "El precio de un activo",
      "El volumen de operaciones",
      "La volatilidad del mercado"
    ],
    correct: 0
  },
  {
    id: 9,
    question: "¿Qué es un plan de trading?",
    options: [
      "Un documento que define estrategias y reglas",
      "Una lista de activos a comprar",
      "Un horario de operaciones",
      "Un presupuesto mensual"
    ],
    correct: 0
  },
  {
    id: 10,
    question: "¿Qué debe incluir un plan de trading?",
    options: [
      "Solo las entradas",
      "Entradas, salidas, gestión de riesgo y reglas",
      "Solo las salidas",
      "Solo el capital inicial"
    ],
    correct: 1
  },
  {
    id: 11,
    question: "¿Qué es el estocástico?",
    options: [
      "Un indicador de momentum",
      "Un tipo de media móvil",
      "Un indicador de volumen",
      "Un patrón de velas"
    ],
    correct: 0
  },
  {
    id: 12,
    question: "¿Qué valores del estocástico indican sobreventa?",
    options: [
      "Por encima de 80",
      "Por debajo de 20",
      "Entre 40 y 60",
      "Por encima de 90"
    ],
    correct: 1
  }
];

export default function PuntoControlPractico2() {
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutos
  const router = useRouter();

  // Timer countdown
  useState(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  });

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].correct).length;
    const score = (correctAnswers / questions.length) * 100;
    
    // Guardar resultado
    localStorage.setItem('pc_practico_2_result', JSON.stringify({
      score,
      completed: true,
      timestamp: Date.now()
    }));

    // Simular delay antes de mostrar resultado
    setTimeout(() => {
      if (score >= 70) {
        alert(`¡Felicitaciones! Has aprobado con ${score.toFixed(1)}%`);
        router.push('/dashboard/iniciado');
      } else {
        alert(`Has obtenido ${score.toFixed(1)}%. Necesitas 70% para aprobar.`);
        router.push('/dashboard/iniciado');
      }
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const correctAnswers = answers.filter((answer, index) => answer === questions[index].correct).length;
  const score = (correctAnswers / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#212121] via-[#121212] to-[#121212] text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/dashboard/iniciado"
            className="flex items-center text-[#ec4d58] hover:text-[#d43d47] transition-colors"
          >
            <ArrowLeft className="mr-2" />
            Volver al Dashboard
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-yellow-400">
              <Clock />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
            <div className="text-sm text-gray-400">
              {answers.filter(a => a !== -1).length}/{questions.length} respondidas
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#ec4d58] mb-2">
            Punto de Control: Indicadores Avanzados y Gestión de Riesgo
          </h1>
          <p className="text-gray-400">
            Evalúa tu comprensión de los módulos 5, 6, 7, 8, 9 y 10 del área práctica. Necesitas 70% para aprobar.
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, qIndex) => (
            <div key={q.id} className="bg-[#1a1a1a] border border-[#232323] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">
                {qIndex + 1}. {q.question}
              </h3>
              
              <div className="space-y-3">
                {q.options.map((option, oIndex) => (
                  <label
                    key={oIndex}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                      answers[qIndex] === oIndex
                        ? submitted
                          ? oIndex === q.correct
                            ? 'bg-green-500/20 border-green-500 text-green-400'
                            : 'bg-red-500/20 border-red-500 text-red-400'
                          : 'bg-[#ec4d58]/20 border-[#ec4d58] text-[#ec4d58]'
                        : 'bg-[#2a2a2a] border-[#333] hover:bg-[#333]'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      checked={answers[qIndex] === oIndex}
                      onChange={() => handleAnswer(qIndex, oIndex)}
                      disabled={submitted}
                      className="sr-only"
                    />
                    <span className="mr-3 w-5 h-5 rounded-full border-2 flex items-center justify-center">
                      {answers[qIndex] === oIndex && (
                        <div className="w-3 h-3 rounded-full bg-current" />
                      )}
                    </span>
                    {option}
                    {submitted && oIndex === q.correct && (
                      <CheckCircle className="ml-auto text-green-400" />
                    )}
                    {submitted && answers[qIndex] === oIndex && oIndex !== q.correct && (
                      <XCircle className="ml-auto text-red-400" />
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        {!submitted && (
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              disabled={answers.includes(-1)}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                answers.includes(-1)
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-[#ec4d58] hover:bg-[#d43d47] text-white'
              }`}
            >
              Enviar Evaluación
            </button>
          </div>
        )}

        {/* Results */}
        {submitted && (
          <div className="mt-8">
            <CheckpointResultMessage 
              score={score} 
              isApproved={score >= 70} 
            />
          </div>
        )}
      </div>
    </div>
  );
} 