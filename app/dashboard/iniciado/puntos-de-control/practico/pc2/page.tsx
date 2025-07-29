'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import CheckpointResultModal from '@/components/ui/CheckpointResultModal';
import SingleQuestionView from '@/components/ui/SingleQuestionView';
import { shuffleQuestions } from '@/utils/questionShuffler';

const questions = [
  {
    id: 1,
    question: "¿Qué es el RSI (Relative Strength Index)?",
    options: [
      "Un indicador de momentum que mide la velocidad y magnitud de los cambios de precio",
      "Un tipo de media móvil",
      "Un patrón de velas japonesas",
      "Un indicador de volumen"
    ],
    correct: 0
  },
  {
    id: 2,
    question: "¿Qué valores del RSI indican sobreventa?",
    options: [
      "Por encima de 70",
      "Por debajo de 30",
      "Entre 40 y 60",
      "Por encima de 80"
    ],
    correct: 1
  },
  {
    id: 3,
    question: "¿Qué valores del RSI indican sobrecompra?",
    options: [
      "Por encima de 70",
      "Por debajo de 30",
      "Entre 40 y 60",
      "Por debajo de 20"
    ],
    correct: 0
  },
  {
    id: 4,
    question: "¿Qué es el MACD?",
    options: [
      "Un indicador de tendencia que combina dos medias móviles",
      "Un patrón de velas",
      "Un indicador de volumen",
      "Un nivel de soporte"
    ],
    correct: 0
  },
  {
    id: 5,
    question: "¿Qué componentes tiene el MACD?",
    options: [
      "Línea MACD, línea de señal e histograma",
      "Solo la línea MACD",
      "Solo el histograma",
      "Línea de tendencia y volumen"
    ],
    correct: 0
  },
  {
    id: 6,
    question: "¿Qué indica cuando el MACD cruza por encima de su línea de señal?",
    options: [
      "Señal de venta",
      "Señal de compra",
      "No indica nada",
      "El mercado está en equilibrio"
    ],
    correct: 1
  },
  {
    id: 7,
    question: "¿Qué es el análisis fundamental?",
    options: [
      "Analizar patrones de precios en gráficos",
      "Evaluar factores económicos, políticos y sociales que afectan el precio",
      "Solo estudiar indicadores técnicos",
      "Analizar el volumen de operaciones"
    ],
    correct: 1
  },
  {
    id: 8,
    question: "¿Qué tipo de noticias pueden afectar el precio de un activo?",
    options: [
      "Solo noticias económicas",
      "Noticias económicas, políticas, sociales y empresariales",
      "Solo noticias políticas",
      "Solo noticias empresariales"
    ],
    correct: 1
  },
  {
    id: 9,
    question: "¿Qué son las correlaciones entre mercados?",
    options: [
      "Relaciones entre diferentes activos financieros",
      "Solo relaciones entre acciones",
      "Solo relaciones entre divisas",
      "Relaciones entre empresas del mismo sector"
    ],
    correct: 0
  },
  {
    id: 10,
    question: "¿Qué es una correlación positiva?",
    options: [
      "Cuando dos activos se mueven en direcciones opuestas",
      "Cuando dos activos se mueven en la misma dirección",
      "Cuando no hay relación entre los activos",
      "Cuando un activo no se mueve"
    ],
    correct: 1
  },
  {
    id: 11,
    question: "¿Qué es una correlación negativa?",
    options: [
      "Cuando dos activos se mueven en direcciones opuestas",
      "Cuando dos activos se mueven en la misma dirección",
      "Cuando no hay relación entre los activos",
      "Cuando un activo no se mueve"
    ],
    correct: 0
  },
  {
    id: 12,
    question: "¿Por qué es importante entender las correlaciones?",
    options: [
      "Para diversificar el riesgo y mejorar las estrategias de trading",
      "Solo para operar en un mercado",
      "Para ignorar otros mercados",
      "Para concentrar el riesgo"
    ],
    correct: 0
  }
];

export default function PuntoControlPractico2() {
  const [shuffledQuestions, setShuffledQuestions] = useState(questions);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutos
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    const correctAnswers = answers.filter((answer, index) => answer === shuffledQuestions[index].correct).length;
    const score = (correctAnswers / shuffledQuestions.length) * 100;
    
    // Guardar resultado
    localStorage.setItem('pc2_practico_result', JSON.stringify({
      score,
      completed: true,
      timestamp: Date.now()
    }));

    // Mostrar modal de resultados
    setShowResultModal(true);
  }, [answers, shuffledQuestions]);

  // Mezclar preguntas al cargar el componente
  useEffect(() => {
    setShuffledQuestions(shuffleQuestions(questions));
  }, []);

  // Timer countdown
  useEffect(() => {
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
  }, [handleSubmit]);

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleRestart = () => {
    setShuffledQuestions(shuffleQuestions(questions));
    setAnswers(new Array(questions.length).fill(-1));
    setSubmitted(false);
    setCurrentQuestion(0);
    setShowReview(false);
    setShowResultModal(false);
    setTimeLeft(20 * 60);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    // Función vacía ya que no usamos navegación por botones
  };

  const handleQuestionSelect = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const correctAnswers = answers.filter((answer, index) => answer === shuffledQuestions[index].correct).length;
  const score = (correctAnswers / shuffledQuestions.length) * 100;

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
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#ec4d58] mb-2">
            Punto de Control: Indicadores Técnicos y Análisis Fundamental
          </h1>
          <p className="text-gray-400">
            Evalúa tu comprensión de los módulos 5, 6, 7 y 8. Necesitas 70% para aprobar.
          </p>
        </div>

        {/* Single Question View */}
        {!submitted && (
          <SingleQuestionView
            questions={shuffledQuestions}
            answers={answers}
            onAnswer={handleAnswer}
            onFinish={handleSubmit}
            currentQuestion={currentQuestion}
            onNavigate={handleNavigate}
            showReview={showReview}
            onToggleReview={() => setShowReview(!showReview)}
            isFinished={submitted}
            onQuestionSelect={handleQuestionSelect}
          />
        )}

        {/* Result Modal */}
        <CheckpointResultModal
          isOpen={showResultModal}
          onClose={() => router.push('/dashboard/iniciado')}
          onRestart={handleRestart}
          score={score}
          isApproved={score >= 70}
          totalQuestions={shuffledQuestions.length}
          correctAnswers={correctAnswers}
          checkpointTitle="Punto de Control 2: Indicadores Técnicos y Análisis Fundamental"
        />
      </div>
    </div>
  );
} 