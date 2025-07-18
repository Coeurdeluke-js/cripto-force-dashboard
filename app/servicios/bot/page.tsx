'use client';
import BackButton from '@/components/ui/BackButton';

export default function BotTradingPage() {
  const handleWhatsAppRedirect = () => {
    window.open('https://chat.whatsapp.com/JQJT3H0KE4u7WNiVc8QqxU', '_blank');
  };

  return (
    <div className="min-h-screen pt-20 px-4 md:px-8 bg-gradient-to-b from-[#212121] via-[#121212] to-[#121212] overflow-x-hidden">
      <div className="max-w-4xl mx-auto py-8">
        <section className="space-y-8">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Bot de Trading
          </h1>

          <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-md border border-[#ec4d58]/10 space-y-6">
            <h2 className="text-2xl font-semibold text-white">Trading Automático</h2>

            <p className="text-gray-300">
              Nuestro bot opera de forma automática las 24 horas del día, los 7 días de la semana,
              con una rentabilidad dinámica estimada entre el <strong>10% y el 20% mensual</strong>.
            </p>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Características principales:
              </h3>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>Funcionamiento continuo 24/7 sin intervención manual</li>
                <li>Rentabilidad dinámica: 10% a 20% mensual (aproximado)</li>
                <li>Monto mínimo requerido: 500 USDT</li>
                <li>Estrategias adaptativas según condiciones del mercado</li>
                <li>Panel de control para el seguimiento de operaciones</li>
                <li>Descuentos en comisiones según el nivel de fondeo</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Requisitos para Activar el Bot:
              </h3>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>Solicitar link de registro único de exchange (con afiliado)</li>
                <li>Fondear la cuenta en el exchange con al menos 500 USDT</li>
                <li>Crear API siguiendo el video instructivo</li>
                <li>Enviar claves API y contraseña para conectar al servidor del bot</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Proceso de Activación y Renovación
              </h3>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>
                  <strong>Activación Inicial:</strong> Válida por 60 días desde la puesta en marcha del bot
                </li>
                <li>
                  <strong>Renovación:</strong> Cada mes se comparte el 30% de las ganancias obtenidas en ese período
                </li>
                <li>El capital a operar debe estar en el apartado &quot;Trading&quot; del exchange</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Consideraciones Finales
              </h3>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>No debe realizarse trading manual en la cuenta donde opera el bot</li>
                <li>Para operar manualmente, se recomienda crear una <strong>subcuenta</strong> en el exchange</li>
                <li>Antes de aumentar capital, se debe informar al administrador</li>
                <li>Se permite participar en promociones o eventos de volumen</li>
              </ul>
            </div>

            <div className="flex items-center gap-4 justify-end mt-6">
              <BackButton />
              <button
                onClick={handleWhatsAppRedirect}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                Activar Bot
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
