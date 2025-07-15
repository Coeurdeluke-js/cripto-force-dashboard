"use client";
import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { Candle } from "../hooks/useBinanceKlines";

interface TradingChartProps {
  candles: Candle[];
  loading: boolean;
  error: string | null;
  onRefresh?: () => void;
  symbol?: string;
  interval?: string;
}

const TradingChart: React.FC<TradingChartProps> = ({ candles, loading, error, onRefresh, symbol = "BTCUSDT", interval = "1h" }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current || loading || error) return;
    chartContainerRef.current.innerHTML = "";
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.offsetWidth,
      height: 340,
      layout: {
        background: { color: "#121212" },
        textColor: "#fff",
      },
      grid: {
        vertLines: { color: "#232323" },
        horzLines: { color: "#232323" },
      },
      crosshair: { mode: 0 },
    });
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#16a34a",
      downColor: "#ec4d58",
      borderUpColor: "#16a34a",
      borderDownColor: "#ec4d58",
      wickUpColor: "#16a34a",
      wickDownColor: "#ec4d58",
    });
    candleSeries.setData(candles);
    chartInstance.current = chart;
    return () => {
      if (chartInstance.current && typeof chartInstance.current.remove === "function") {
        chartInstance.current.remove();
      }
      if (chartContainerRef.current) {
        chartContainerRef.current.innerHTML = "";
      }
    };
  }, [candles, loading, error]);

  return (
    <div className="relative w-full min-h-[320px] md:min-h-[400px] min-w-0 flex flex-col items-stretch justify-center">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#ec4d58]" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10">
          <span className="text-red-400 font-bold mb-2">{error}</span>
          {onRefresh && <button onClick={onRefresh} className="px-4 py-2 bg-[#ec4d58] text-white rounded">Reintentar</button>}
        </div>
      )}
      <div
        ref={chartContainerRef}
        className="w-full min-h-[320px] md:min-h-[400px] min-w-0 rounded-lg border border-[#232323] bg-[#181818]"
        style={{ minWidth: 0, minHeight: 320 }}
      />
      <div className="flex items-center justify-between mt-2 px-2">
        <span className="text-xs text-gray-400">{symbol} / {interval}</span>
        {onRefresh && <button onClick={onRefresh} className="text-xs px-2 py-1 bg-[#232323] text-[#ec4d58] rounded hover:bg-[#ec4d58] hover:text-white transition">Refrescar</button>}
      </div>
    </div>
  );
};

export default TradingChart; 