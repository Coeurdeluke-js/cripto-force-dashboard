'use client';

import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData, Time } from 'lightweight-charts';

interface TradingChartProps {
  candles: Array<{
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }>;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  symbol?: string;
  interval?: string;
}

const TradingChart: React.FC<TradingChartProps> = ({ 
  candles, 
  loading, 
  error, 
  onRefresh, 
  symbol = "BTCUSDT", 
  interval = "1h" 
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Cleanup previous chart
    if (chartRef.current) {
      chartRef.current.remove();
    }

    // Create new chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: '#1a1a1a' },
        textColor: '#ffffff',
      },
      grid: {
        vertLines: { color: '#2a2a2a' },
        horzLines: { color: '#2a2a2a' },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: '#ec4d58',
          width: 1,
          style: 3,
        },
        horzLine: {
          color: '#ec4d58',
          width: 1,
          style: 3,
        },
      },
      rightPriceScale: {
        borderColor: '#2a2a2a',
        textColor: '#ffffff',
      },
      timeScale: {
        borderColor: '#2a2a2a',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderDownColor: '#ef5350',
      borderUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      wickUpColor: '#26a69a',
    });

    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (candlestickSeriesRef.current && candles.length > 0) {
      const formattedData: CandlestickData<Time>[] = candles.map(candle => ({
        time: candle.time as Time,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
      }));

      candlestickSeriesRef.current.setData(formattedData);
    }
  }, [candles]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-[#1a1a1a] rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ec4d58] mx-auto mb-2"></div>
          <p className="text-gray-400">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 bg-[#1a1a1a] rounded-lg">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-[#ec4d58] text-white rounded-lg hover:bg-[#d63d47] transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div ref={chartContainerRef} className="w-full h-96" />
    </div>
  );
};

export default TradingChart; 