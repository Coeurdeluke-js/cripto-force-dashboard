'use client';

import React, { useState } from 'react';
import { 
  LineChart, 
  BarChart3,
  TrendingUp,
  Activity,
  Settings,
  Info
} from 'lucide-react';
import TradingChart from './TradingChart';

export default function TradingChartsPage() {
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');
  const [timeframe, setTimeframe] = useState('1h');

  const topCryptos = [
    { symbol: 'BTCUSDT', name: 'Bitcoin', price: 'Datos en tiempo real', change: 'Actualizando...' },
    { symbol: 'ETHUSDT', name: 'Ethereum', price: 'Datos en tiempo real', change: 'Actualizando...' },
    { symbol: 'BNBUSDT', name: 'BNB', price: 'Datos en tiempo real', change: 'Actualizando...' },
    { symbol: 'ADAUSDT', name: 'Cardano', price: 'Datos en tiempo real', change: 'Actualizando...' },
    { symbol: 'SOLUSDT', name: 'Solana', price: 'Datos en tiempo real', change: 'Actualizando...' },
    { symbol: 'DOTUSDT', name: 'Polkadot', price: 'Datos en tiempo real', change: 'Actualizando...' },
    { symbol: 'MATICUSDT', name: 'Polygon', price: 'Datos en tiempo real', change: 'Actualizando...' },
    { symbol: 'LINKUSDT', name: 'Chainlink', price: 'Datos en tiempo real', change: 'Actualizando...' },
    { symbol: 'UNIUSDT', name: 'Uniswap', price: 'Datos en tiempo real', change: 'Actualizando...' },
    { symbol: 'AVAXUSDT', name: 'Avalanche', price: 'Datos en tiempo real', change: 'Actualizando...' }
  ];

  const timeframes = [
    { value: '1m', label: '1m' },
    { value: '5m', label: '5m' },
    { value: '15m', label: '15m' },
    { value: '1h', label: '1h' },
    { value: '4h', label: '4h' },
    { value: '1d', label: '1d' }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 mobile-container">
      <div className="mb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#8A8A8A] mb-2">
            Trading Charts
          </h1>
          <p className="text-gray-400">
            Gráficos en tiempo real de las principales criptomonedas
          </p>
        </div>

        {/* Controles del gráfico */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl border border-[#3a3a3a] p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-4 md:gap-6">
            {/* Selector de criptomoneda */}
            <div className="w-full md:w-auto">
              <label className="text-sm text-gray-400 block mb-2">Criptomoneda</label>
              <select
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="w-full md:w-auto bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A]"
              >
                {topCryptos.map((crypto) => (
                  <option key={crypto.symbol} value={crypto.symbol}>
                    {crypto.name} ({crypto.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Selector de timeframe */}
            <div className="w-full md:w-auto">
              <label className="text-sm text-gray-400 block mb-2">Timeframe</label>
              <div className="flex flex-wrap gap-2">
                {timeframes.map((tf) => (
                  <button
                    key={tf.value}
                    onClick={() => setTimeframe(tf.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      timeframe === tf.value
                        ? 'bg-[#8A8A8A] text-white'
                        : 'bg-[#2a2a2a] text-gray-400 hover:text-white'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Información del precio */}
            <div className="w-full md:w-auto md:ml-auto">
              {(() => {
                const crypto = topCryptos.find(c => c.symbol === selectedSymbol);
                return crypto ? (
                  <div className="text-left md:text-right">
                    <div className="text-sm text-[#8A8A8A] mb-1">{crypto.price}</div>
                    <div className="text-xs text-gray-500">
                      {crypto.change}
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico principal */}
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl border border-[#3a3a3a] p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">
            {selectedSymbol} - {timeframe}
          </h3>
        </div>
        
        <TradingChart 
          symbol={selectedSymbol} 
          timeframe={timeframe}
        />
      </div>
    </div>
  );
}
