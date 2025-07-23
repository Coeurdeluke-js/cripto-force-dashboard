'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';

const questions = [
  {
    id: 1,
    question: "¿Qué es la economía?",
    options: [
      "La ciencia que estudia cómo las sociedades utilizan recursos limitados para satisfacer necesidades ilimitadas",
      "El estudio de las empresas y sus ganancias",
      "La gestión del dinero personal",
      "El análisis de los precios de las acciones"
    ],
    correct: 0
  },
  {
    id: 2,
    question: "¿Cuál es la ley fundamental de la oferta?",
    options: [
      "A mayor precio, mayor cantidad ofrecida",
      "A menor precio, mayor cantidad ofrecida", 
      "El precio no afecta la oferta",
      "La oferta siempre es constante"
    ],
    correct: 0
  },
  {
    id: 3,
    question: "¿Qué representa la demanda en un mercado?",
    options: [
      "La cantidad de bienes que los productores quieren vender",
      "La cantidad de bienes que los consumidores están dispuestos a comprar",
      "El precio de equilibrio del mercado",
      "La competencia entre empresas"
    ],
    correct: 1
  },
  {
    id: 4,
    question: "¿Qué sucede cuando la oferta aumenta?",
    options: [
      "El precio sube y la cantidad vendida baja",
      "El precio baja y la cantidad vendida sube",
      "El precio y la cantidad se mantienen igual",
      "Solo el precio cambia"
    ],
    correct: 1
  },
  {
    id: 5,
    question: "¿Qué es el precio de equilibrio?",
    options: [
      "El precio más alto que puede cobrar un vendedor",
      "El precio más bajo que puede pagar un comprador",
      "El precio donde la oferta iguala la demanda",
      "El precio promedio del mercado"
    ],
    correct: 2
  },
  {
    id: 6,
    question: "¿Cómo afecta un aumento en la demanda al precio?",
    options: [
      "El precio sube",
      "El precio baja",
      "El precio no cambia",
      "El precio fluctúa sin patrón"
    ],
    correct: 0
  },
  {
    id: 7,
    question: "¿Qué son los bienes sustitutos?",
    options: [
      "Bienes que se consumen juntos",
      "Bienes que pueden reemplazarse entre sí",
      "Bienes de lujo",
      "Bienes básicos"
    ],
    correct: 1
  },
  {
    id: 8,
    question: "¿Qué representa la elasticidad de la demanda?",
    options: [
      "La velocidad de cambio del precio",
      "La sensibilidad de la cantidad demandada ante cambios en el precio",
      "La cantidad total de bienes disponibles",
      "El tiempo que tarda en ajustarse el mercado"
    ],
    correct: 1
  },
  {
    id: 9,
    question: "¿Qué es un mercado eficiente?",
    options: [
      "Un mercado con muchos vendedores",
      "Un mercado donde los precios reflejan toda la información disponible",
      "Un mercado con precios bajos",
      "Un mercado sin regulación"
    ],
    correct: 1
  },
  {
    id: 10,
    question: "¿Cómo se determina el valor de un bien?",
    options: [
      "Solo por su costo de producción",
      "Solo por la demanda del consumidor",
      "Por la interacción entre oferta y demanda",
      "Por el gobierno"
    ],
    correct: 2
  },
  {
    id: 11,
    question: "¿Qué es la escasez en economía?",
    options: [
      "La falta total de un recurso",
      "La situación donde los recursos son limitados en relación a las necesidades",
      "El alto precio de un bien",
      "La baja calidad de un producto"
    ],
    correct: 1
  },
  {
    id: 12,
    question: "¿Qué representa el excedente del consumidor?",
    options: [
      "La diferencia entre lo que el consumidor está dispuesto a pagar y lo que realmente paga",
      "El dinero que sobra después de comprar",
      "La ganancia del vendedor",
      "El impuesto sobre las ventas"
    ],
    correct: 0
  }
];

export default function PuntoControl1() {
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
    localStorage.setItem('pc1_result', JSON.stringify({
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
            Punto de Control: Introducción a la Lógica Económica y Fuerzas del Mercado
          </h1>
          <p className="text-gray-400">
            Evalúa tu comprensión de los módulos 1 y 2. Necesitas 70% para aprobar.
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
          <div className="mt-8 text-center">
            <div className="bg-[#1a1a1a] border border-[#232323] rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">
                {score >= 70 ? '¡Felicitaciones!' : 'Necesitas más práctica'}
              </h2>
              <p className="text-lg mb-4">
                Puntuación: <span className="font-bold text-[#ec4d58]">{score.toFixed(1)}%</span>
              </p>
              <p className="text-gray-400 mb-4">
                Respuestas correctas: {correctAnswers} de {questions.length}
              </p>
              {score >= 70 ? (
                <p className="text-green-400">¡Has aprobado el punto de control!</p>
              ) : (
                <p className="text-red-400">Necesitas al menos 70% para aprobar</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 