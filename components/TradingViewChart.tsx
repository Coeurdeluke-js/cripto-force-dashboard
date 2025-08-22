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

      // Crear el widget con configuración limpia - solo precio, sin indicadores
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
          'create_volume_indicator_by_default', // Deshabilitar volumen por defecto
          'volume_force_overlay', // Deshabilitar overlay de volumen
          'show_volume_scale' // Ocultar escala de volumen
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
          'use_localstorage_for_chart_properties'
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
    </div>
  );
}
