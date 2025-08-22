'use client';

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    TradingView: any;
  }
}

interface TradingViewChartProps {
  symbol?: string;
  interval?: string;
  theme?: 'dark' | 'light';
  height?: number;
}

export default function TradingViewChart({ 
  symbol = 'BTCUSD', 
  interval = '1D', 
  theme = 'dark',
  height = 400 
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);
  const containerId = useRef(`tradingview-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    // Cargar el script de TradingView si no está disponible
    if (!window.TradingView) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = createWidget;
      document.head.appendChild(script);
    } else {
      createWidget();
    }

    return () => {
      // Cleanup seguro del widget
      if (widgetRef.current && typeof widgetRef.current.remove === 'function') {
        try {
          widgetRef.current.remove();
        } catch (error) {
          console.warn('Error al eliminar widget TradingView:', error);
        }
        widgetRef.current = null;
      }
    };
  }, [symbol, interval, theme, height]);

  const createWidget = () => {
    if (!containerRef.current || !window.TradingView) return;

    try {
      // Limpiar el contenedor de forma segura
      if (containerRef.current && containerRef.current.innerHTML !== '') {
        containerRef.current.innerHTML = '';
      }

      // Verificar que el contenedor sigue siendo válido
      if (!containerRef.current || !document.contains(containerRef.current)) {
        console.warn('Contenedor TradingView no válido');
        return;
      }

      // Crear el widget con todas las funcionalidades habilitadas
      widgetRef.current = new window.TradingView.widget({
        symbol: symbol,
        interval: interval,
        timezone: 'America/New_York',
        theme: theme,
        style: '1',
        locale: 'es',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: containerRef.current.id,
        width: '100%',
        height: height,
        studies: [], // Sin indicadores por defecto, pero permitir agregarlos
        disabled_features: [
          'use_localstorage_for_settings'
        ],
        enabled_features: [
          'study_templates',
          'side_toolbar_in_fullscreen_mode',
          'header_symbol_search',
          'header_compare',
          'header_settings',
          'header_indicators',
          'header_fullscreen_button',
          'timeframes_toolbar',
          'edit_buttons_in_legend',
          'context_menus',
          'border_around_the_chart',
          'header_saveload',
          'control_bar',
          'countdown',
          'display_market_status',
          'chart_property_page',
          'go_to_date',
          'symbol_info',
          'chart_crosshair_menu',
          'high_density_bars',
          'left_toolbar',
          'legend_widget',
          'overlay_price_scale',
          'pane_legend',
          'popup_hints',
          'scale_series_only',
          'scrolling_on_touch',
          'show_chart_property_page',
          'show_interval_dialog_on_key_press',
          'show_logo_on_all_charts',
          'show_symbol_logo',
          'support_multicharts',
          'timeframes_toolbar',
          'use_localstorage_for_chart_properties',
          'volume_force_overlay',
          'create_volume_indicator_by_default'
        ],
        overrides: {
          'mainSeriesProperties.candleStyle.upColor': '#3ED598',
          'mainSeriesProperties.candleStyle.downColor': '#ec4d58',
          'mainSeriesProperties.candleStyle.wickUpColor': '#3ED598',
          'mainSeriesProperties.candleStyle.wickDownColor': '#ec4d58',
          'mainSeriesProperties.candleStyle.borderUpColor': '#3ED598',
          'mainSeriesProperties.candleStyle.borderDownColor': '#ec4d58'
        },
        loading_screen: {
          backgroundColor: '#0f0f0f',
          foregroundColor: '#ec4d58'
        }
      });
    } catch (error) {
      console.error('Error al crear widget TradingView:', error);
      widgetRef.current = null;
    }
  };

  return (
    <div className="w-full">
      <div 
        ref={containerRef}
        id={containerId.current}
        className="tradingview-widget-container"
      />
      
      {/* Controles personalizados */}
      <div className="flex items-center justify-between mt-4 p-3 bg-[#1a1a1a] rounded-lg border border-[#232323]">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-[#fafafa] text-sm font-medium">Símbolo:</span>
            <select 
              value={symbol}
              onChange={(e) => {
                // Cambiar símbolo dinámicamente
                const newSymbol = e.target.value;
                if (widgetRef.current && typeof widgetRef.current.setSymbol === 'function') {
                  try {
                    widgetRef.current.setSymbol(newSymbol);
                  } catch (error) {
                    console.warn('Error al cambiar símbolo:', error);
                  }
                }
              }}
              className="bg-[#2a2a2a] text-[#fafafa] border border-[#232323] rounded px-2 py-1 text-sm"
            >
              <option value="BTCUSD">BTCUSD</option>
              <option value="ETHUSD">ETHUSD</option>
              <option value="ADAUSD">ADAUSD</option>
              <option value="DOTUSD">DOTUSD</option>
              <option value="LINKUSD">LINKUSD</option>
              <option value="LTCUSD">LTCUSD</option>
              <option value="BCHUSD">BCHUSD</option>
              <option value="XRPUSD">XRPUSD</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-[#8A8A8A] text-sm">Intervalo:</span>
            <select 
              value={interval}
              onChange={(e) => {
                // Cambiar intervalo dinámicamente
                const newInterval = e.target.value;
                if (widgetRef.current && typeof widgetRef.current.setResolution === 'function') {
                  try {
                    widgetRef.current.setResolution(newInterval);
                  } catch (error) {
                    console.warn('Error al cambiar intervalo:', error);
                  }
                }
              }}
              className="bg-[#2a2a2a] text-[#fafafa] border border-[#232323] rounded px-2 py-1 text-sm"
            >
              <option value="1">1 min</option>
              <option value="5">5 min</option>
              <option value="15">15 min</option>
              <option value="30">30 min</option>
              <option value="60">1 hora</option>
              <option value="240">4 horas</option>
              <option value="1D">1 día</option>
              <option value="1W">1 semana</option>
              <option value="1M">1 mes</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              if (widgetRef.current && typeof widgetRef.current.fullscreen === 'function') {
                try {
                  widgetRef.current.fullscreen();
                } catch (error) {
                  console.warn('Error al activar pantalla completa:', error);
                }
              }
            }}
            className="px-3 py-2 bg-[#ec4d58] hover:bg-[#d43d48] text-white rounded-lg transition-colors duration-200 flex items-center space-x-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>Pantalla Completa</span>
          </button>
          
          <button
            onClick={() => {
              if (widgetRef.current && typeof widgetRef.current.resetData === 'function') {
                try {
                  widgetRef.current.resetData();
                } catch (error) {
                  console.warn('Error al resetear datos:', error);
                }
              }
            }}
            className="px-3 py-2 bg-[#3ED598] hover:bg-[#2EC589] text-white rounded-lg transition-colors duration-200 flex items-center space-x-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Resetear</span>
          </button>
        </div>
      </div>
    </div>
  );
}
