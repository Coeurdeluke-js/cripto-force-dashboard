import React from "react";
import { useState, useCallback } from 'react';

export type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

const INTERVALS = ['1m','5m','15m','1h','4h','1d'];

export function useBinanceKlines(symbol: string, interval: string) {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const fetchKlines = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=100`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Error al obtener datos de Binance');
      const data = await res.json();
      const parsed: Candle[] = data.map((k: any[]) => ({
        time: Math.floor(k[0] / 1000),
        open: parseFloat(k[1]),
        high: parseFloat(k[2]),
        low: parseFloat(k[3]),
        close: parseFloat(k[4]),
      }));
      setCandles(parsed);
    } catch (e: any) {
      setError(e.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [symbol, interval]);

  // Refetch on symbol/interval change
  React.useEffect(() => {
    fetchKlines();
  }, [fetchKlines]);

  return { candles, loading, error, refetch: fetchKlines };
}

export { INTERVALS }; 