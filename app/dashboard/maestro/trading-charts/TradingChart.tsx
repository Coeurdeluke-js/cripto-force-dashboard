'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData, Time } from 'lightweight-charts';
import { BarChart3 } from 'lucide-react';

interface TradingChartProps {
  symbol?: string;
  timeframe?: string;
}

const TradingChart: React.FC<TradingChartProps> = ({ 
  symbol = "BTCUSDT", 
  timeframe = "1h"
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const isDestroyedRef = useRef(false);
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [candles, setCandles] = useState<Array<{
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showIndicatorsMenu, setShowIndicatorsMenu] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<string>('');

  // Función para limpiar el gráfico de forma segura
  const cleanupChart = useCallback(() => {
    if (chartRef.current && !isDestroyedRef.current) {
      try {
        chartRef.current.remove();
        chartRef.current = null;
        candlestickSeriesRef.current = null;
      } catch (error) {
        console.warn('Error during chart cleanup:', error);
      }
    }
  }, []);

  // Función para obtener datos reales de Binance
  const fetchBinanceData = useCallback(async () => {
    if (isDestroyedRef.current) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching real data from Binance for:', symbol, timeframe);
      
      // Convertir timeframe a formato de Binance
      const intervalMap: { [key: string]: string } = {
        '1m': '1m',
        '5m': '5m',
        '15m': '15m',
        '1h': '1h',
        '4h': '4h',
        '1d': '1d'
      };
      
      const interval = intervalMap[timeframe] || '1h';
      const limit = 200; // Más datos para un gráfico más completo
      
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Convertir datos de Binance al formato requerido
      const formattedCandles = data.map((candle: any) => ({
        time: Math.floor(new Date(candle[0]).getTime() / 1000),
        open: parseFloat(candle[1]),
        high: parseFloat(candle[2]),
        low: parseFloat(candle[3]),
        close: parseFloat(candle[4])
      }));
      
      // Obtener precio actual
      const currentPriceResponse = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
      );
      
      if (currentPriceResponse.ok) {
        const priceData = await currentPriceResponse.json();
        setCurrentPrice(parseFloat(priceData.price).toFixed(2));
      }
      
      console.log('Fetched', formattedCandles.length, 'real candles from Binance');
      console.log('Current price:', currentPrice);
      
      if (!isDestroyedRef.current) {
        setCandles(formattedCandles);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching Binance data:', error);
      if (!isDestroyedRef.current) {
        setError('Error al obtener datos de Binance. Usando datos de ejemplo actualizados.');
        // Fallback a datos de ejemplo con precios actualizados
        generateUpdatedMockData();
      }
    }
  }, [symbol, timeframe]);

  // Generar datos de ejemplo con precios actualizados (solo como fallback)
  const generateUpdatedMockData = useCallback(() => {
    if (isDestroyedRef.current) return;
    
    console.log('Generating updated mock data for:', symbol, timeframe);
    
    const mockCandles = [];
    const now = Date.now();
    const intervalMs = timeframe === '1m' ? 60000 : 
                      timeframe === '5m' ? 300000 : 
                      timeframe === '15m' ? 900000 : 
                      timeframe === '1h' ? 3600000 : 
                      timeframe === '4h' ? 14400000 : 86400000;
    
    // Precios actualizados y realistas (2024)
    let basePrice = 116000; // Bitcoin actual ~$116k
    if (symbol === 'ETHUSDT') basePrice = 3200;      // Ethereum ~$3.2k
    else if (symbol === 'BNBUSDT') basePrice = 580;  // BNB ~$580
    else if (symbol === 'ADAUSDT') basePrice = 0.45; // Cardano ~$0.45
    else if (symbol === 'SOLUSDT') basePrice = 140;  // Solana ~$140
    else if (symbol === 'DOTUSDT') basePrice = 6.80; // Polkadot ~$6.80
    else if (symbol === 'MATICUSDT') basePrice = 0.75; // Polygon ~$0.75
    else if (symbol === 'LINKUSDT') basePrice = 14.50; // Chainlink ~$14.50
    else if (symbol === 'UNIUSDT') basePrice = 7.20;  // Uniswap ~$7.20
    else if (symbol === 'AVAXUSDT') basePrice = 35.80; // Avalanche ~$35.80

    for (let i = 200; i >= 0; i--) {
      const time = now - (i * intervalMs);
      const volatility = 0.015; // 1.5% de volatilidad (más realista)
      const change = (Math.random() - 0.5) * volatility;
      const open = basePrice * (1 + change);
      const high = open * (1 + Math.random() * 0.008);
      const low = open * (1 - Math.random() * 0.008);
      const close = open * (1 + (Math.random() - 0.5) * 0.004);
      
      mockCandles.push({
        time: Math.floor(time / 1000),
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2))
      });
      
      basePrice = close;
    }
    
    console.log('Generated', mockCandles.length, 'updated mock candles');
    
    if (!isDestroyedRef.current) {
      setCandles(mockCandles);
      setLoading(false);
    }
  }, [symbol, timeframe]);

  // Cargar datos cuando cambie el símbolo o timeframe
  useEffect(() => {
    console.log('useEffect triggered for symbol/timeframe change');
    if (!isDestroyedRef.current) {
      fetchBinanceData();
    }
  }, [fetchBinanceData]);

  // Configurar actualización automática
  useEffect(() => {
    if (isDestroyedRef.current) return;

    // Limpiar intervalo anterior
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
    }

    // Configurar nuevo intervalo de actualización
    const intervalMs = timeframe === '1m' ? 30000 : 
                      timeframe === '5m' ? 60000 : 
                      timeframe === '15m' ? 300000 : 
                      timeframe === '1h' ? 600000 : 
                      timeframe === '4h' ? 2400000 : 86400000;

    updateIntervalRef.current = setInterval(() => {
      if (!isDestroyedRef.current) {
        fetchBinanceData();
      }
    }, intervalMs);

    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
        updateIntervalRef.current = null;
      }
    };
  }, [fetchBinanceData, timeframe]);

  // Crear y configurar el gráfico
  useEffect(() => {
    console.log('Chart useEffect triggered. Candles length:', candles.length);
    console.log('Chart container ref:', chartContainerRef.current);
    console.log('Is destroyed:', isDestroyedRef.current);
    
    if (!chartContainerRef.current) {
      console.log('Chart container not ready');
      return;
    }
    
    if (candles.length === 0) {
      console.log('No candles data available');
      return;
    }
    
    if (isDestroyedRef.current) {
      console.log('Component is destroyed');
      return;
    }

    try {
      console.log('Creating chart with', candles.length, 'candles');
      
      // Limpiar gráfico anterior
      cleanupChart();

      // Crear nuevo gráfico
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        layout: {
          background: { color: '#121212' },
          textColor: '#d1d4dc',
        },
        grid: {
          vertLines: { color: '#2a2a2a' },
          horzLines: { color: '#2a2a2a' },
        },
        crosshair: {
          mode: 1,
        },
        rightPriceScale: {
          borderColor: '#2a2a2a',
        },
        timeScale: {
          borderColor: '#2a2a2a',
          timeVisible: true,
          secondsVisible: false,
        },
        handleScroll: {
          mouseWheel: true,
          pressedMouseMove: true,
          horzTouchDrag: true,
          vertTouchDrag: true,
        },
        handleScale: {
          axisPressedMouseMove: {
            time: true,
            price: true,
          },
          mouseWheel: true,
          pinch: true,
        },
        kineticScroll: {
          touch: true,
          mouse: false,
        },
      });

      console.log('Chart created successfully');

      // Crear serie de velas
      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#3ED598',
        downColor: '#EC4D58',
        borderDownColor: '#EC4D58',
        borderUpColor: '#3ED598',
        wickDownColor: '#EC4D58',
        wickUpColor: '#3ED598',
      });

      console.log('Candlestick series created');

      // Configurar datos
      const candlestickData = candles.map(c => ({
        time: c.time as Time,
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close
      }));
      
      console.log('Setting chart data:', candlestickData.length);
      candlestickSeries.setData(candlestickData);

      // Guardar referencias
      chartRef.current = chart;
      candlestickSeriesRef.current = candlestickSeries;

      console.log('Chart setup completed successfully');

      // Responsive
      const handleResize = () => {
        if (chartContainerRef.current && chartRef.current && !isDestroyedRef.current) {
          try {
            chartRef.current.applyOptions({
              width: chartContainerRef.current.clientWidth,
              height: chartContainerRef.current.clientHeight,
            });
          } catch (error) {
            console.warn('Error during chart resize:', error);
          }
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error('Error creating chart:', error);
      if (!isDestroyedRef.current) {
        setError('Error al crear el gráfico: ' + error);
      }
    }
  }, [candles, cleanupChart]);

  // Cleanup al desmontar el componente
  useEffect(() => {
    return () => {
      console.log('Component unmounting, cleaning up');
      isDestroyedRef.current = true;
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
      cleanupChart();
    };
  }, [cleanupChart]);

  if (loading) {
    console.log('Rendering loading state');
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8A8A8A] mb-4"></div>
          <div className="text-gray-400">Cargando datos reales del mercado...</div>
        </div>
      </div>
    );
  }

  if (error) {
    console.log('Rendering error state:', error);
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-2">Error</div>
          <div className="text-gray-400">{error}</div>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              fetchBinanceData();
            }}
            className="mt-4 px-4 py-2 bg-[#8A8A8A] text-white rounded-lg hover:bg-[#9A9A9A] transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  console.log('Rendering chart container with', candles.length, 'candles');

  return (
    <div className="w-full relative">
      {/* Controles del gráfico */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        {/* Menú de indicadores */}
        <div className="relative">
          <button
            onClick={() => setShowIndicatorsMenu(!showIndicatorsMenu)}
            className="p-2 bg-[#2a2a2a] rounded-lg text-gray-400 hover:text-white transition-colors"
            title="Indicadores Técnicos"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
          
          {showIndicatorsMenu && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg shadow-lg z-20">
              <div className="p-4">
                <h4 className="text-white font-medium mb-3">Indicadores Técnicos</h4>
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Próximamente...</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botón de refresh */}
        <button
          onClick={() => {
            setLoading(true);
            fetchBinanceData();
          }}
          className="p-2 bg-[#2a2a2a] rounded-lg text-gray-400 hover:text-white transition-colors"
          title="Actualizar datos"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Información del precio actual */}
      {currentPrice && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-[#2a2a2a] rounded-lg px-3 py-2 border border-[#3a3a3a]">
            <div className="text-sm text-gray-400">Precio Actual</div>
            <div className="text-lg font-bold text-white">${currentPrice}</div>
          </div>
        </div>
      )}

      {/* Contenedor del gráfico */}
      <div
        ref={chartContainerRef}
        className="w-full h-96 md:h-[500px] lg:h-[600px]"
        style={{
          backgroundColor: '#121212',
          border: '1px solid #333333',
          borderRadius: '12px',
          cursor: 'crosshair',
          userSelect: 'none',
          touchAction: 'pan-x pan-y',
          overflow: 'hidden'
        }}
        onMouseDown={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default TradingChart;
