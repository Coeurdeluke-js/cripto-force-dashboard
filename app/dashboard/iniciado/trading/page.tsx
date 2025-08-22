'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  RefreshCw,
  Info,
  Globe,
  Bitcoin,
  DollarSign,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Target,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

// Extender Window interface para TradingView
declare global {
  interface Window {
    TradingView: any;
  }
}

// Componente de TradingView Chart - Versión simplificada y robusta
const TradingViewChart = ({ symbol, interval = '1D', theme = 'dark' }: {
  symbol: string;
  interval?: string;
  theme?: string;
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    // Función para cargar el script de TradingView
    const loadTradingViewScript = (): Promise<void> => {
      return new Promise((resolve) => {
        if (window.TradingView) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    // Función para crear el widget
    const createWidget = async () => {
      try {
        await loadTradingViewScript();
        
        // Verificar que el contenedor existe
        if (!chartRef.current) return;

        // Limpiar contenedor
        chartRef.current.innerHTML = '';

        // Crear nuevo widget con configuración básica y pantalla completa integrada
        widgetRef.current = new window.TradingView.widget({
          width: '100%',
          height: '100%',
          symbol: symbol,
          interval: interval,
          timezone: 'America/New_York',
          theme: theme,
          style: '1',
          locale: 'es',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: chartRef.current.id,
          // Sin indicadores por defecto - gráfico completamente limpio
          studies: [],
          // Ocultar volumen y otros elementos por defecto
          hide_volume: true,
          // Configuración para pantalla completa integrada
          fullscreen: false,
          // Deshabilitar popup de pantalla completa
          show_popup_button: false,
          // Configuraciones para mejor experiencia integrada
          hide_top_toolbar: false,
          hide_side_toolbar: false,
          // Configuraciones de datos
          realtime: true,
          autosize: true,
          // Configuraciones de UI
          toolbar_bg: '#1a1a1a',
          // Configuraciones para ocultar elementos por defecto
          overrides: {
            'paneProperties.background': '#1a1a1a',
            'paneProperties.vertGridProperties.color': '#2a2a2a',
            'paneProperties.horzGridProperties.color': '#2a2a2a',
            // Ocultar volumen completamente
            'volumePaneSize': 'tiny',
            'scalesProperties.showVolume': false,
            // Ocultar otros indicadores por defecto
            'mainSeriesProperties.candleStyle.drawWick': true,
            'mainSeriesProperties.candleStyle.drawBorder': true,
            'mainSeriesProperties.candleStyle.borderColor': '#ec4d58',
            'mainSeriesProperties.candleStyle.wickColor': '#666666',
            'mainSeriesProperties.candleStyle.borderUpColor': '#3ED598',
            'mainSeriesProperties.candleStyle.borderDownColor': '#ec4d58',
            'mainSeriesProperties.candleStyle.upColor': '#3ED598',
            'mainSeriesProperties.candleStyle.downColor': '#ec4d58'
          },
          // Configuraciones adicionales para gráfico limpio
          disabled_features: [
            'volume_force_overlay',
            'create_volume_indicator_by_default',
            'header_symbol_search',
            'header_compare',
            'header_settings',
            'header_indicators',
            'header_fullscreen_button',
            'header_screenshot',
            'header_chart_type',
            'header_undo_redo',
            'header_interval_dialog_button',
            'show_interval_dialog_on_key_press',
            'header_resolutions',
            'header_share',
            'timeframes_toolbar',
            'edit_buttons_in_legend',
            'context_menus',
            'border_around_the_chart',
            'header_saveload',
            'control_bar',
            'countdown',
            'display_market_status',
            'chart_property_page_background',
            'compare_symbol',
            'high_density_bars',
            'chart_property_page_scales',
            'chart_property_page_style',
            'chart_property_page_timezone_sessions',
            'chart_property_page_trading',
            'side_toolbar_in_fullscreen_mode',
            'left_toolbar',
            'show_logo_on_all_charts',
            'caption_buttons_text_if_possible',
            'dom_widget',
            'trading_notifications',
            'header_undo_redo',
            'header_fullscreen_button',
            'header_screenshot',
            'header_chart_type',
            'header_indicators',
            'header_compare',
            'header_symbol_search',
            'header_settings',
            'header_resolutions',
            'header_share',
            'timeframes_toolbar',
            'edit_buttons_in_legend',
            'context_menus',
            'border_around_the_chart',
            'header_saveload',
            'control_bar',
            'countdown',
            'display_market_status',
            'chart_property_page_background',
            'compare_symbol',
            'high_density_bars',
            'chart_property_page_scales',
            'chart_property_page_style',
            'chart_property_page_timezone_sessions',
            'chart_property_page_trading',
            'side_toolbar_in_fullscreen_mode',
            'left_toolbar',
            'show_logo_on_all_charts',
            'caption_buttons_text_if_possible',
            'dom_widget',
            'trading_notifications'
          ],
          // Habilitar solo funcionalidades esenciales
          enabled_features: [
            'study_templates',
            'use_localstorage_for_settings',
            'save_chart_properties_to_local_storage'
          ]
        });

        console.log('TradingView widget creado para', symbol);

      } catch (error) {
        console.error('Error creando widget TradingView:', error);
      }
    };

    // Crear widget
    createWidget();

    // Cleanup function
    return () => {
      if (widgetRef.current) {
        try {
          widgetRef.current.remove();
        } catch (error) {
          console.warn('Error limpiando widget:', error);
        }
        widgetRef.current = null;
      }
    };
  }, [symbol, interval, theme]);

  return (
    <div 
      ref={chartRef}
      id={`tradingview_${symbol.replace(/[^a-zA-Z0-9]/g, '')}`}
      className="w-full h-full rounded-lg overflow-hidden"
    />
  );
};

export default function TradingPage() {
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSD');
  const [selectedInterval, setSelectedInterval] = useState('1D');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
  const [currentTipPage, setCurrentTipPage] = useState(1);

  // Función para forzar actualización del gráfico
  const forceRefresh = () => {
    setLastUpdate(new Date());
  };

  // Actualizar timestamp cada minuto para mantener datos frescos
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000); // Cada minuto

    return () => clearInterval(interval);
  }, []);

  // Tips básicos para usuarios nuevos
  const basicTips = [
    {
      icon: Target,
      title: "¿Qué estás viendo?",
      description: "Este es un gráfico de precios de criptomonedas en tiempo real. La línea muestra cómo ha cambiado el precio a lo largo del tiempo."
    },
    {
      icon: TrendingUp,
      title: "Tendencias básicas",
      description: "Línea que sube = precio subiendo (tendencia alcista). Línea que baja = precio bajando (tendencia bajista)."
    },
    {
      icon: BarChart3,
      title: "Timeframes",
      description: "1D = 1 día, 1H = 1 hora, 15M = 15 minutos. Usa el selector en la parte superior del gráfico para cambiar."
    },
    {
      icon: AlertTriangle,
      title: "Importante recordar",
      description: "Los gráficos muestran el pasado, no predicen el futuro. Siempre investiga antes de tomar decisiones de inversión."
    },
    {
      icon: Lightbulb,
      title: "Primeros pasos",
      description: "Observa el gráfico por unos días para entender cómo se mueve la criptomoneda. No te apresures a invertir."
    },
    {
      icon: BookOpen,
      title: "Recursos de aprendizaje",
      description: "Visita la sección 'Explora la Academia' en el menú lateral para cursos básicos de trading."
    },
    {
      icon: Bitcoin,
      title: "Diversidad de activos",
      description: "No solo Bitcoin: puedes analizar Ethereum, Cardano, Solana, Polkadot y cientos de criptomonedas más."
    },
    {
      icon: TrendingUp,
      title: "Volatilidad del mercado",
      description: "Las criptomonedas son muy volátiles. Un activo puede subir 20% en un día y bajar 30% al siguiente."
    },
    {
      icon: BarChart3,
      title: "Análisis de volumen",
      description: "El volumen indica cuánto se está negociando. Alto volumen = mayor interés del mercado."
    },
    {
      icon: Target,
      title: "Establecer objetivos",
      description: "Define claramente cuándo quieres comprar y vender. No dejes que las emociones controlen tus decisiones."
    },
    {
      icon: AlertTriangle,
      title: "Gestión de riesgo",
      description: "Nunca pongas todo tu dinero en una sola criptomoneda. Diversifica tu portafolio."
    },
    {
      icon: Lightbulb,
      title: "Horarios del mercado",
      description: "Las criptomonedas se negocian 24/7, pero la actividad suele ser mayor durante el horario de EE.UU. y Asia."
    },
    {
      icon: BookOpen,
      title: "Noticias y eventos",
      description: "Las noticias pueden afectar los precios drásticamente. Mantente informado sobre regulaciones y adopción."
    },
    {
      icon: TrendingUp,
      title: "Patrones de precio",
      description: "Aprende a identificar patrones básicos como soportes (precios que no bajan) y resistencias (precios que no suben)."
    },
    {
      icon: BarChart3,
      title: "Comparar activos",
      description: "Usa el gráfico para comparar el rendimiento de diferentes criptomonedas en el mismo período."
    },
    {
      icon: Target,
      title: "Estrategia de DCA",
      description: "Dollar Cost Averaging: invierte pequeñas cantidades regularmente en lugar de todo de una vez."
    },
    {
      icon: AlertTriangle,
      title: "Evitar FOMO",
      description: "No compres solo porque 'todos están comprando'. Analiza si el precio tiene fundamentos sólidos."
    },
    {
      icon: Lightbulb,
      title: "Tecnología blockchain",
      description: "Entiende qué problema resuelve cada criptomoneda. No todas son solo para especulación."
    },
    {
      icon: BookOpen,
      title: "Wallets y seguridad",
      description: "Aprende sobre wallets fríos y calientes. La seguridad de tus claves privadas es fundamental."
    },
    {
      icon: TrendingUp,
      title: "Staking y recompensas",
      description: "Algunas criptomonedas te permiten ganar recompensas por mantenerlas en tu wallet."
    },
    {
      icon: BarChart3,
      title: "Análisis fundamental",
      description: "Estudia el equipo, la tecnología y la adopción real de cada proyecto, no solo el precio."
    },
    {
      icon: Target,
      title: "Plazos de inversión",
      description: "Define si quieres trading a corto plazo o inversión a largo plazo. Cada estrategia requiere diferentes enfoques."
    },
    {
      icon: AlertTriangle,
      title: "Impuestos y regulaciones",
      description: "Las ganancias de criptomonedas suelen estar sujetas a impuestos. Consulta con un contador especializado."
    },
    {
      icon: Lightbulb,
      title: "Comunidad y redes",
      description: "Únete a comunidades de Discord y Telegram para aprender de traders más experimentados."
    },
    {
      icon: BookOpen,
      title: "Herramientas de análisis",
      description: "Familiarízate con indicadores básicos como RSI, MACD y medias móviles cuando estés listo."
    }
  ];

  // Configuración de paginación
  const tipsPerPage = 6;
  const totalPages = Math.ceil(basicTips.length / tipsPerPage);
  const startIndex = (currentTipPage - 1) * tipsPerPage;
  const endIndex = startIndex + tipsPerPage;
  const currentTips = basicTips.slice(startIndex, endIndex);

  // Función para cambiar de página
  const goToPage = (page: number) => {
    setCurrentTipPage(page);
  };

  // Función para cerrar menú y resetear página
  const closeHelpMenu = () => {
    setIsHelpMenuOpen(false);
    setCurrentTipPage(1);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header Minimalista */}
      <div className="flex-shrink-0 p-4 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-b border-[#3a3a3a]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#8A8A8A]">
              Gráficos de Trading
            </h1>
            <p className="text-sm text-gray-400">
              Análisis técnico profesional de criptomonedas con TradingView
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Botón de refresh manual */}
            <button
              onClick={forceRefresh}
              className="flex items-center gap-2 px-3 py-2 bg-[#8A8A8A] hover:bg-[#7A7A7A] rounded-lg transition-colors"
              title="Actualizar gráfico"
            >
              <RefreshCw className="w-4 h-4 text-white" />
            </button>
            
            {/* Botón para abrir/cerrar menú de ayuda - Visible en todas las versiones */}
            <button
              onClick={isHelpMenuOpen ? closeHelpMenu : () => setIsHelpMenuOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-[#8A8A8A] hover:bg-[#7A7A7A] rounded-lg transition-colors text-white font-medium"
            >
              <BookOpen className="w-4 h-4" />
              {isHelpMenuOpen ? 'Ocultar Tips' : 'Mostrar Tips'}
              {isHelpMenuOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        {/* Indicador de última actualización */}
        <div className="mt-2 text-xs text-gray-500">
          Última actualización: {lastUpdate.toLocaleTimeString('es-ES')}
        </div>
      </div>

      {/* Gráfico TradingView - Altura completa fija */}
      <div className="flex-1 bg-[#1a1a1a] p-4">
        <div className="w-full h-full bg-[#2a2a2a] rounded-lg border border-[#3a3a3a] overflow-hidden">
          <TradingViewChart 
            key={`${selectedSymbol}_${selectedInterval}_${lastUpdate.getTime()}`}
            symbol={selectedSymbol} 
            interval={selectedInterval}
            theme="dark"
          />
        </div>
      </div>

      {/* Panel de Tips - Responsivo para móvil y desktop */}
      {isHelpMenuOpen && (
        <>
          {/* Panel flotante para desktop (md y superior) */}
          <div className="hidden md:block fixed bottom-20 right-4 w-80 max-h-96 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg shadow-2xl z-50 overflow-hidden">
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#8A8A8A] text-center">
                  💡 Tips Básicos para Iniciados
                </h3>
              </div>
              
              <div className="grid grid-cols-1 gap-3 mb-4">
                {currentTips.map((tip, index) => (
                  <div key={startIndex + index} className="bg-[#1a1a1a] p-3 rounded-lg border border-[#3a3a3a]">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <tip.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-sm mb-1">
                          {tip.title}
                        </h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controles de paginación - Estilo minimalista */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => goToPage(currentTipPage - 1)}
                    disabled={currentTipPage === 1}
                    className="px-2 py-1 text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-[#3a3a3a] rounded"
                  >
                    ← Anterior
                  </button>
                  <span className="text-gray-500 text-xs font-medium">
                    {currentTipPage} de {totalPages}
                  </span>
                  <button
                    onClick={() => goToPage(currentTipPage + 1)}
                    disabled={currentTipPage === totalPages}
                    className="px-2 py-1 text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-[#3a3a3a] rounded"
                  >
                    Siguiente →
                  </button>
                </div>

                {/* Indicadores de página - Estilo minimalista */}
                <div className="flex gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => goToPage(i + 1)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                        currentTipPage === i + 1 
                          ? 'bg-[#8A8A8A] scale-125' 
                          : 'bg-gray-600 hover:bg-gray-500 hover:scale-110'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Mensaje adicional de seguridad */}
              <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-200 text-xs font-medium">
                    🚨 Recuerda: Nunca inviertas más dinero del que puedas permitirte perder. 
                    El trading de criptomonedas conlleva riesgos significativos y alta volatilidad.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel integrado para móvil (inferior a md) */}
          <div className="md:hidden flex-shrink-0 bg-[#2a2a2a] border-t border-[#3a3a3a]">
            <div className="p-4 max-h-80 overflow-y-auto">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#8A8A8A] text-center">
                  💡 Tips Básicos para Iniciados
                </h3>
              </div>
              
              <div className="grid grid-cols-1 gap-3 mb-4">
                {currentTips.map((tip, index) => (
                  <div key={startIndex + index} className="bg-[#1a1a1a] p-3 rounded-lg border border-[#3a3a3a]">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <tip.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-sm mb-1">
                          {tip.title}
                        </h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controles de paginación móvil - Estilo minimalista */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => goToPage(currentTipPage - 1)}
                    disabled={currentTipPage === 1}
                    className="px-3 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-[#3a3a3a] rounded"
                  >
                    ← Anterior
                  </button>
                  <span className="text-gray-500 text-sm font-medium">
                    {currentTipPage} de {totalPages}
                  </span>
                  <button
                    onClick={() => goToPage(currentTipPage + 1)}
                    disabled={currentTipPage === totalPages}
                    className="px-3 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-[#3a3a3a] rounded"
                  >
                    Siguiente →
                  </button>
                </div>

                {/* Indicadores de página móvil */}
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => goToPage(i + 1)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        currentTipPage === i + 1 
                          ? 'bg-[#8A8A8A] scale-125' 
                          : 'bg-gray-600 hover:bg-gray-500 hover:scale-110'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Mensaje adicional de seguridad móvil */}
              <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-200 text-xs font-medium">
                    🚨 Recuerda: Nunca inviertas más dinero del que puedas permitirte perder. 
                    El trading de criptomonedas conlleva riesgos significativos y alta volatilidad.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer eliminado - El botón de tips ahora está en el header */}
    </div>
  );
}
