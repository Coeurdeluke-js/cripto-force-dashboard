'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import CheckpointResultMessage from '@/app/dashboard/iniciado/components/CheckpointResultMessage';
import CheckpointResultModal from '@/app/dashboard/iniciado/components/CheckpointResultModal';
import SingleQuestionView from '@/app/dashboard/iniciado/components/SingleQuestionView';
import BackButton from '@/components/ui/BackButton';
import { shuffleQuestions } from '@/utils/questionShuffler';
import { useProgress } from '@/context/ProgressContext';

const questions = [
  {
    id: 1,
    question: "¿Qué es el análisis fundamental en trading?",
    options: [
      "Solo analizar gráficos de precios",
      "Evaluar factores económicos, políticos y sociales que afectan el precio",
      "Solo usar indicadores técnicos",
      "Solo analizar el volumen"
    ],
    correct: 1
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
    question: "¿Por qué es importante entender las correlaciones?",
    options: [
      "Para diversificar el riesgo y mejorar las estrategias de trading",
      "Solo para operar en un mercado",
      "Para ignorar otros mercados",
      "Para concentrar el riesgo"
    ],
    correct: 0
  },
  {
    id: 7,
    question: "¿Qué es la gestión de riesgo en trading?",
    options: [
      "Arriesgar todo el capital en una operación",
      "Limitar las pérdidas potenciales por operación",
      "Solo operar cuando hay ganancias seguras",
      "Ignorar las pérdidas"
    ],
    correct: 1
  },
  {
    id: 8,
    question: "¿Cuál es el porcentaje máximo recomendado de riesgo por operación?",
    options: [
      "1-2% del capital",
      "10-20% del capital",
      "50% del capital",
      "100% del capital"
    ],
    correct: 0
  },
  {
    id: 9,
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
    id: 10,
    question: "¿Cuál es un ratio riesgo/beneficio mínimo recomendado?",
    options: [
      "1:1",
      "1:2",
      "1:0.5",
      "1:0.1"
    ],
    correct: 1
  },
  {
    id: 11,
    question: "¿Qué es el stop loss?",
    options: [
      "Un nivel de precio donde se cierra la operación para limitar pérdidas",
      "Un nivel de precio donde se toma ganancia",
      "El precio de entrada de la operación",
      "El volumen de la operación"
    ],
    correct: 0
  },
  {
    id: 12,
    question: "¿Qué es el take profit?",
    options: [
      "Un nivel de precio donde se cierra la operación para tomar ganancias",
      "Un nivel de precio donde se limita la pérdida",
      "El precio de entrada de la operación",
      "El volumen de la operación"
    ],
    correct: 0
  }
];

export default function PuntoControlPractico4() {
  const [shuffledQuestions, setShuffledQuestions] = useState(questions);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutos
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [startTime] = useState(Date.now());
  const router = useRouter();
  const { completeCheckpoint } = useProgress();

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    const correctAnswers = answers.filter((answer, index) => answer === shuffledQuestions[index].correct).length;
    const score = (correctAnswers / shuffledQuestions.length) * 100;
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    // Crear resultado detallado
    const result = {
      score,
      completed: true,
      timestamp: Date.now(),
      timeSpent,
      correctAnswers,
      totalQuestions: shuffledQuestions.length
    };
    
    // Guardar resultado en localStorage
    localStorage.setItem('practico_pc4_result', JSON.stringify(result));
    
    // Completar checkpoint en el sistema de progreso
    if (score >= 70) {
      completeCheckpoint('practical', 'nivel2', 'PC4', result);
    }

    // Mostrar modal de resultados
    setShowResultModal(true);
  }, [answers, shuffledQuestions, startTime, completeCheckpoint]);

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
          <BackButton />
          
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
            Punto de Control: Análisis Fundamental y Correlaciones
          </h1>
          <p className="text-gray-400">
            Evalúa tu comprensión de los módulos 7 y 8. Necesitas 70% para aprobar.
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
          checkpointTitle="Punto de Control 4: Análisis Fundamental y Correlaciones"
        />
      </div>
    </div>
  );
} 