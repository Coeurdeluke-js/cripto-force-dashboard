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
      if (widgetRef.current) {
        widgetRef.current.remove();
      }
    };
  }, [symbol, interval, theme, height]);

  const createWidget = () => {
    if (!containerRef.current || !window.TradingView) return;

    // Limpiar el contenedor
    containerRef.current.innerHTML = '';

    // Crear el widget
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
      studies: [], // Sin indicadores por defecto
      disabled_features: [
        'use_localstorage_for_settings',
        'volume_force_overlay',
        'create_volume_indicator_by_default'
      ],
      enabled_features: [
        'study_templates',
        'side_toolbar_in_fullscreen_mode'
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
  };

  return (
    <div className="w-full">
      <div 
        ref={containerRef}
        id={`tradingview-widget-${Math.random().toString(36).substr(2, 9)}`}
        className="tradingview-widget-container"
      />
      
      {/* Controles personalizados */}
      <div className="flex items-center justify-between mt-4 p-3 bg-[#1a1a1a] rounded-lg border border-[#232323]">
        <div className="flex items-center space-x-4">
          <span className="text-[#fafafa] text-sm font-medium">
            Símbolo: {symbol}
          </span>
          <span className="text-[#8A8A8A] text-sm">
            Intervalo: {interval}
          </span>
        </div>
        
        <button
          onClick={() => {
            if (widgetRef.current) {
              widgetRef.current.fullscreen();
            }
          }}
          className="px-4 py-2 bg-[#ec4d58] hover:bg-[#d43d48] text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          <span>Pantalla Completa</span>
        </button>
      </div>
    </div>
  );
}
