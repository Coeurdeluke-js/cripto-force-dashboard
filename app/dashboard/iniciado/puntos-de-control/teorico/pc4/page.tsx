'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';

const questions = [
  {
    id: 1,
    question: "¿Qué es una criptomoneda?",
    options: [
      "Una moneda digital descentralizada",
      "Una moneda física tradicional",
      "Un billete digital del banco",
      "Un cupón de descuento"
    ],
    correct: 0
  },
  {
    id: 2,
    question: "¿Qué es el análisis fundamental en criptomonedas?",
    options: [
      "Analizar solo los gráficos de precios",
      "Evaluar la tecnología, equipo, adopción y casos de uso",
      "Seguir las noticias del día",
      "Usar solo indicadores técnicos"
    ],
    correct: 1
  },
  {
    id: 3,
    question: "¿Qué es la capitalización de mercado?",
    options: [
      "El precio de una criptomoneda",
      "El número total de monedas multiplicado por el precio actual",
      "La cantidad de dinero invertido",
      "El volumen de operaciones"
    ],
    correct: 1
  },
  {
    id: 4,
    question: "¿Qué es el volumen de operaciones?",
    options: [
      "El precio de la criptomoneda",
      "La cantidad total de monedas en circulación",
      "La cantidad de monedas intercambiadas en un período",
      "La capitalización de mercado"
    ],
    correct: 2
  },
  {
    id: 5,
    question: "¿Qué es un exchange de criptomonedas?",
    options: [
      "Un banco tradicional",
      "Una plataforma para comprar y vender criptomonedas",
      "Una criptomoneda específica",
      "Un tipo de wallet"
    ],
    correct: 1
  },
  {
    id: 6,
    question: "¿Qué es una wallet de criptomonedas?",
    options: [
      "Una billetera física",
      "Un software o dispositivo para almacenar claves privadas",
      "Un banco digital",
      "Un exchange"
    ],
    correct: 1
  },
  {
    id: 7,
    question: "¿Qué es el trading de criptomonedas?",
    options: [
      "Solo comprar y mantener",
      "Comprar y vender criptomonedas para obtener ganancias",
      "Solo minar criptomonedas",
      "Solo usar criptomonedas para pagos"
    ],
    correct: 1
  },
  {
    id: 8,
    question: "¿Qué es el leverage en trading?",
    options: [
      "Usar dinero prestado para operar",
      "Solo usar capital propio",
      "Un tipo de criptomoneda",
      "Un indicador técnico"
    ],
    correct: 0
  },
  {
    id: 9,
    question: "¿Qué es un stop loss?",
    options: [
      "Una orden para vender automáticamente a un precio específico",
      "Una orden para comprar automáticamente",
      "Un tipo de análisis",
      "Un indicador técnico"
    ],
    correct: 0
  },
  {
    id: 10,
    question: "¿Qué es el análisis de sentimiento?",
    options: [
      "Analizar solo los gráficos",
      "Evaluar las emociones y opiniones del mercado",
      "Usar solo indicadores técnicos",
      "Seguir solo las noticias oficiales"
    ],
    correct: 1
  },
  {
    id: 11,
    question: "¿Qué es la volatilidad en criptomonedas?",
    options: [
      "La estabilidad del precio",
      "La variabilidad del precio en el tiempo",
      "El volumen de operaciones",
      "La capitalización de mercado"
    ],
    correct: 1
  },
  {
    id: 12,
    question: "¿Qué es el arbitraje en criptomonedas?",
    options: [
      "Comprar y vender en el mismo exchange",
      "Comprar en un exchange y vender en otro con diferencia de precio",
      "Solo comprar y mantener",
      "Usar solo un exchange"
    ],
    correct: 1
  }
];

export default function PuntoControl4() {
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
    localStorage.setItem('pc4_result', JSON.stringify({
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
            Punto de Control: Criptomonedas y Operaciones con Criptomonedas
          </h1>
          <p className="text-gray-400">
            Evalúa tu comprensión de los módulos 7 y 8. Necesitas 70% para aprobar.
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