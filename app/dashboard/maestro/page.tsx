'use client';

import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSafeAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { 
  Users, 
  Settings, 
  FileText, 
  BarChart3, 
  Shield, 
  Mail, 
  Gamepad2, 
  Eye, 
  Edit, 
  Trash2, 
  Crown,
  TrendingUp,
  Activity,
  Database,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserPlus,
  UserMinus,
  Lock,
  Unlock,
  Send,
  Bell,
  Zap,
  Target,
  Globe,
  Heart,
  Star,
  Award,
  Trophy,
  Plus,
  Calendar
} from 'lucide-react';

import { useRef, useLayoutEffect, useState } from 'react';
import { useBinanceKlines, INTERVALS } from '@/hooks/useBinanceKlines';

// Simple import without dynamic loading to avoid chunk issues
import SimpleChart from './SimpleChart';

// Lista de emails autorizados para acceder a la dashboard de Maestro
const MAESTRO_AUTHORIZED_EMAILS = [
  'infocriptoforce@gmail.com',
  'coeurdeluke.js@gmail.com'
];

// Lista de las 10 criptomonedas más populares por capitalización de mercado
const TOP_CRYPTOCURRENCIES = [
  { symbol: 'BTCUSDT', name: 'Bitcoin', short: 'BTC' },
  { symbol: 'ETHUSDT', name: 'Ethereum', short: 'ETH' },
  { symbol: 'BNBUSDT', name: 'BNB', short: 'BNB' },
  { symbol: 'SOLUSDT', name: 'Solana', short: 'SOL' },
  { symbol: 'ADAUSDT', name: 'Cardano', short: 'ADA' },
  { symbol: 'XRPUSDT', name: 'XRP', short: 'XRP' },
  { symbol: 'DOTUSDT', name: 'Polkadot', short: 'DOT' },
  { symbol: 'AVAXUSDT', name: 'Avalanche', short: 'AVAX' },
  { symbol: 'MATICUSDT', name: 'Polygon', short: 'MATIC' },
  { symbol: 'LTCUSDT', name: 'Litecoin', short: 'LTC' }
];

// Componente separado para el panel de mercados
function MarketsPanel({ interval, setInterval }: { interval: string; setInterval: (interval: string) => void }) {
    const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');
    const { candles, loading, error, refetch, lastUpdate } = useBinanceKlines(selectedSymbol, interval);
    const lastPrice = candles.length > 0 ? candles[candles.length - 1].close : null;
    const selectedCrypto = TOP_CRYPTOCURRENCIES.find(crypto => crypto.symbol === selectedSymbol);
    
    // Calcular cambio de precio (simulado para demo)
    const priceChange = candles.length > 1 ? 
      ((candles[candles.length - 1].close - candles[candles.length - 2].close) / candles[candles.length - 2].close * 100) : 0;

    return (
      <div className="space-y-6 w-full overflow-x-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-[#ec4d58]" />
            TradingView - {selectedCrypto?.short || 'BTC'}/USDT
            {lastPrice && (
              <span className="ml-4 px-3 py-1 rounded-full bg-[#232323] text-[#ec4d58] text-lg font-mono">
                ${lastPrice.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}
              </span>
            )}
            {priceChange !== 0 && (
              <span className={`ml-2 px-2 py-1 rounded text-sm font-medium ${
                priceChange > 0 ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
              }`}>
                {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)}%
              </span>
            )}
          </h3>
          
          {/* Indicador de tiempo real */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>En tiempo real</span>
            </div>
            {lastUpdate && (
              <span className="text-xs">
                Última actualización: {lastUpdate.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
        
        {/* Selector de Criptomonedas */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Seleccionar Criptomoneda:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {TOP_CRYPTOCURRENCIES.map((crypto) => (
              <button
                key={crypto.symbol}
                onClick={() => setSelectedSymbol(crypto.symbol)}
                className={`p-3 rounded-lg text-sm font-semibold border transition-all duration-200 ${
                  selectedSymbol === crypto.symbol
                    ? 'bg-[#ec4d58] text-white border-[#ec4d58] shadow-lg'
                    : 'bg-[#232323] text-gray-300 border-[#3a3a3a] hover:bg-[#ec4d58]/20 hover:border-[#ec4d58]/50 hover:text-white'
                }`}
              >
                <div className="text-center">
                  <div className="font-bold">{crypto.short}</div>
                  <div className="text-xs opacity-75">{crypto.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selector de Intervalos */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Intervalo de Tiempo:
          </label>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {INTERVALS.map((intv) => (
            <button
              key={intv}
              onClick={() => setInterval(intv)}
              className={`px-3 py-1 rounded text-xs font-semibold border transition-colors ${interval === intv ? 'bg-[#ec4d58] text-white border-[#ec4d58]' : 'bg-[#232323] text-gray-300 border-[#232323] hover:bg-[#ec4d58]/30 hover:text-white'}`}
            >
              {intv}
            </button>
          ))}
        </div>
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-2 md:p-4 w-full overflow-x-hidden">
          <SimpleChart
            candles={candles}
            loading={loading}
            error={error}
            onRefresh={refetch}
            symbol={selectedSymbol}
            interval={interval}
          />
        </div>
        <div className="text-gray-400 text-sm mt-2">
          Gráfico interactivo de ejemplo usando <span className="text-[#ec4d58] font-semibold">lightweight-charts</span>. Puedes expandir esta sección para mostrar más mercados, temporalidades, indicadores o herramientas de análisis.
        </div>
      </div>
    );
  }

export default function MaestroDashboard() {
  const [activeTab, setActiveTab] = useState('metrics');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estados para herramientas de debug
  const [debugResult, setDebugResult] = useState<string>('');
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<any>(null);
  const [showDebugModal, setShowDebugModal] = useState(false);
  
  // Estados para datos reales
  const [realMetrics, setRealMetrics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    registrationsToday: 0,
    referralConversions: 0,
    systemStatus: 'Operativo',
    lastUpdate: new Date().toLocaleString('es-ES')
  });

  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [systemLogs, setSystemLogs] = useState<any[]>([]);
  
  // Estados para el panel de mercados
  const [marketsInterval, setMarketsInterval] = useState('1h');
  
  const router = useRouter();
  const { userData, isReady } = useSafeAuth();

  // Verificación de permisos al cargar la página
  useEffect(() => {
    const checkPermissions = async () => {
      if (!isReady) return;
      
      try {
        // Verificación del lado del cliente
        if (!userData || !userData.email) {
          console.log('🚫 Acceso denegado: Usuario no autenticado');
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }

        const userEmail = userData.email.toLowerCase().trim();
        const clientAuthorized = MAESTRO_AUTHORIZED_EMAILS.includes(userEmail);

        if (!clientAuthorized) {
          console.log('🚫 Acceso denegado: Usuario no autorizado');
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }

        // Verificación adicional del lado del servidor
        const response = await fetch('/api/permissions/maestro', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.log('🚫 Acceso denegado: Error en verificación del servidor');
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }

        const { authorized } = await response.json();
        
        if (authorized) {
          console.log('✅ Acceso autorizado a dashboard Maestro');
          setIsAuthorized(true);
        } else {
          console.log('🚫 Acceso denegado: No autorizado por el servidor');
          setIsAuthorized(false);
        }
        
      } catch (error) {
        console.error('Error verificando permisos:', error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkPermissions();
  }, [userData, isReady, router]);

  // Cargar datos reales al autorizar acceso
  useEffect(() => {
    if (isAuthorized) {
      loadRealMetrics();
    }
  }, [isAuthorized]);

  // Redirigir si no está autorizado
  useEffect(() => {
    if (!isLoading && isAuthorized === false) {
      router.push('/login/dashboard-selection');
    }
  }, [isLoading, isAuthorized, router]);

  // Mostrar loading mientras se verifica
  if (isLoading || isAuthorized === null) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-400">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  // Mostrar acceso denegado si no está autorizado
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Acceso Denegado</h1>
          <p className="text-gray-400 mb-6">
            No tienes permisos para acceder a la Dashboard de Maestro.
          </p>
          <button
            onClick={() => router.push('/login/dashboard-selection')}
            className="bg-[#ec4d58] text-white px-6 py-2 rounded-lg hover:bg-[#d63447] transition-colors"
          >
            Volver al Panel de Control
          </button>
        </div>
      </div>
    );
  }

  const adminTabs = [
    { id: 'metrics', label: 'Métricas Globales', icon: BarChart3 },
    { id: 'users', label: 'Gestor de Usuarios', icon: Users },
    { id: 'debug', label: 'Herramientas Debug', icon: Database },
    { id: 'content', label: 'Editor de Contenido', icon: FileText },
    { id: 'settings', label: 'Configuraciones', icon: Settings },
    { id: 'logs', label: 'Logs y Auditoría', icon: Activity },
    { id: 'communications', label: 'Comunicaciones', icon: Mail },
    { id: 'events', label: 'Eventos y Juegos', icon: Gamepad2 },
    { id: 'markets', label: 'Mercados', icon: TrendingUp }
  ];

  // Helper para obtener el ancho del contenedor de forma responsiva
  function getContainerWidth(ref: React.RefObject<HTMLDivElement>) {
    if (!ref.current) return 320;
    return ref.current.offsetWidth || 320;
  }



  const renderMetricsPanel = () => (
    <div className="space-y-6">
      {/* Global Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#ec4d58] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Usuarios</p>
              <p className="text-3xl font-bold text-white">{realMetrics.totalUsers.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-[#ec4d58]/10 rounded-lg">
              <Users className="w-6 h-6 text-[#ec4d58]" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-400 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            +12% este mes
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#ec4d58] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Usuarios Activos</p>
              <p className="text-3xl font-bold text-white">{realMetrics.activeUsers}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Activity className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-400 text-sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            {((realMetrics.activeUsers / realMetrics.totalUsers) * 100).toFixed(1)}% activos
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#ec4d58] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Usuarios con Referidos</p>
              <p className="text-3xl font-bold text-white">{realMetrics.referralConversions}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Target className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-blue-400 text-sm">
            <Award className="w-4 h-4 mr-1" />
            Meta: 85%
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#ec4d58] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Estado del Sistema</p>
              <p className="text-xl font-bold text-green-400">{realMetrics.systemStatus}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Shield className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-400 text-sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            Todo operativo
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#ec4d58] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Registros Hoy</p>
              <p className="text-3xl font-bold text-white">{realMetrics.registrationsToday}</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Globe className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-purple-400 text-sm">
            <Zap className="w-4 h-4 mr-1" />
            En tiempo real
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#ec4d58] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Usuarios Activos</p>
              <p className="text-3xl font-bold text-white">{realMetrics.activeUsers}</p>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Trophy className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-orange-400 text-sm">
            <Star className="w-4 h-4 mr-1" />
            3 nuevos este mes
          </div>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a]">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-[#ec4d58]" />
          Actividad en Tiempo Real
        </h3>
        <div className="space-y-3">
          {recentUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`} />
                <span className="text-white font-medium">{user.name}</span>
                <span className="text-sm text-gray-400">({user.role})</span>
              </div>
              <span className="text-sm text-gray-400">{user.lastActive}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsersPanel = () => (
    <div className="space-y-6">
      {/* User Management Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Gestión de Usuarios</h3>
        <button className="bg-[#ec4d58] hover:bg-[#ec4d58]/90 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <UserPlus className="w-4 h-4 mr-2" />
          Nuevo Usuario
        </button>
      </div>

      {/* User Filters */}
      <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Buscar usuarios..."
            className="bg-[#2a2a2a] text-white px-3 py-2 rounded-lg border border-[#3a3a3a] focus:border-[#ec4d58] focus:outline-none"
          />
          <select className="bg-[#2a2a2a] text-white px-3 py-2 rounded-lg border border-[#3a3a3a] focus:border-[#ec4d58] focus:outline-none">
            <option value="">Todos los roles</option>
            <option value="iniciado">Iniciado</option>
            <option value="acolito">Acólito</option>
            <option value="warrior">Warrior</option>
            <option value="darth">Darth</option>
            <option value="lord">Lord</option>
            <option value="maestro">Maestro</option>
          </select>
          <select className="bg-[#2a2a2a] text-white px-3 py-2 rounded-lg border border-[#3a3a3a] focus:border-[#ec4d58] focus:outline-none">
            <option value="">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
            <option value="suspended">Suspendido</option>
          </select>
          <button className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white px-3 py-2 rounded-lg transition-colors">
            Filtrar
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#2a2a2a]">
              <tr>
                <th className="text-left p-4 text-white font-medium">Usuario</th>
                <th className="text-left p-4 text-white font-medium">Rol</th>
                <th className="text-left p-4 text-white font-medium">Estado</th>
                <th className="text-left p-4 text-white font-medium">Última Actividad</th>
                <th className="text-left p-4 text-white font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id} className="border-b border-[#2a2a2a] hover:bg-[#2a2a2a] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#ec4d58] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {(() => {
                            const fullName = `${user.nombre || ''} ${user.apellido || ''}`.trim();
                            const displayName = fullName || user.nickname || user.email || 'U';
                            return displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2);
                          })()}
                        </span>
                      </div>
                      <span className="text-white font-medium">
                        {(() => {
                          const fullName = `${user.nombre || ''} ${user.apellido || ''}`.trim();
                          return fullName || user.nickname || user.email || 'Usuario';
                        })()}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-[#ec4d58]/10 text-[#ec4d58] rounded-full text-sm">
                      {user.user_level === 0 ? 'Maestro' : user.user_level === 1 ? 'Iniciado' : `Nivel ${user.user_level}`}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded-full text-sm">
                      Activo
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString('es-ES') : 'N/A'}
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="p-2 hover:bg-[#3a3a3a] rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-blue-500" />
                      </button>
                      <button className="p-2 hover:bg-[#3a3a3a] rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-yellow-500" />
                      </button>
                      <button className="p-2 hover:bg-[#3a3a3a] rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Funciones para cargar datos reales
  const loadRealMetrics = async () => {
    try {
      // Cargar métricas reales desde la nueva API
      const metricsResponse = await fetch('/api/maestro/real-stats');
      const metricsResult = await metricsResponse.json();
      
      if (metricsResult.success) {
        setRealMetrics({
          totalUsers: metricsResult.metrics.totalUsers,
          activeUsers: metricsResult.metrics.totalUsers,
          registrationsToday: metricsResult.metrics.registrationsToday,
          referralConversions: metricsResult.metrics.usersWithReferrals,
          systemStatus: metricsResult.metrics.systemStatus,
          lastUpdate: new Date(metricsResult.metrics.lastUpdate).toLocaleString('es-ES')
        });

        setRecentUsers(metricsResult.recentUsers);
        
        // Agregar log real
        setSystemLogs(prev => [{
          id: Date.now(),
          type: 'info',
          message: `Métricas actualizadas: ${metricsResult.metrics.totalUsers} usuarios totales, ${metricsResult.metrics.registrationsToday} registros hoy`,
          timestamp: new Date().toLocaleString('es-ES')
        }, ...prev.slice(0, 4)]);

        setDebugResult('✅ Métricas reales cargadas desde Supabase');
      } else {
        throw new Error(metricsResult.error);
      }
    } catch (error) {
      setDebugResult('❌ Error cargando métricas reales: ' + error);
      console.error('Error:', error);
    }
  };

  // Funciones para herramientas de debug
  const loadAllUsers = async () => {
    try {
      const response = await fetch('/api/debug/users');
      const result = await response.json();
      setAllUsers(result.users || []);
      await loadRealMetrics(); // Actualizar métricas también
      setDebugResult('✅ Usuarios cargados exitosamente');
    } catch (error) {
      setDebugResult('❌ Error cargando usuarios: ' + error);
    }
  };

  const checkSupabaseConfig = async () => {
    try {
      const response = await fetch('/api/debug/supabase');
      const result = await response.json();
      setDebugResult('📊 Config Supabase:\n' + JSON.stringify(result, null, 2));
    } catch (error) {
      setDebugResult('❌ Error verificando config: ' + error);
    }
  };

  const checkUserAuth = async (email: string) => {
    try {
      const response = await fetch('/api/debug/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const result = await response.json();
      setDebugResult('🔍 Verificación Usuario:\n' + JSON.stringify(result, null, 2));
    } catch (error) {
      setDebugResult('❌ Error verificando usuario: ' + error);
    }
  };

  const recreateAuthUser = async (email: string, password: string) => {
    if (!confirm('¿Recrear usuario en Supabase Auth? Esta acción es irreversible.')) return;
    
    try {
      const response = await fetch('/api/debug/recreate-auth-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      setDebugResult('🔧 Recrear Usuario:\n' + JSON.stringify(result, null, 2));
    } catch (error) {
      setDebugResult('❌ Error recreando usuario: ' + error);
    }
  };

  const renderDebugPanel = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Herramientas de Debug y Administración</h3>
        <div className="flex gap-2">
          <button 
            onClick={loadAllUsers}
            className="bg-[#8A8A8A] hover:bg-[#8A8A8A]/80 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <Database className="w-4 h-4 mr-2" />
            Cargar Usuarios
          </button>
          <button 
            onClick={checkSupabaseConfig}
            className="bg-[#8A8A8A] hover:bg-[#8A8A8A]/80 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <Settings className="w-4 h-4 mr-2" />
            Verificar Config
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel de Usuarios */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#8A8A8A]/20">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-[#8A8A8A]" />
            Gestión de Usuarios ({allUsers.length})
          </h4>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {allUsers.map((user, index) => (
              <div key={user.id || index} className="bg-[#2a2a2a] rounded-lg p-3 border border-[#8A8A8A]/10">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-white font-medium">{user.nickname || 'Sin nickname'}</div>
                    <div className="text-[#8A8A8A] text-sm">{user.email}</div>
                    <div className="text-gray-400 text-xs">
                      {user.nombre} {user.apellido} | Nivel: {user.user_level || 0}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => checkUserAuth(user.email)}
                      className="bg-[#8A8A8A] hover:bg-[#8A8A8A]/80 text-white px-2 py-1 rounded text-xs transition-colors"
                      title="Verificar Auth"
                    >
                      🔍
                    </button>
                    <button
                      onClick={() => setSelectedUserForEdit(user)}
                      className="bg-[#8A8A8A] hover:bg-[#8A8A8A]/80 text-white px-2 py-1 rounded text-xs transition-colors"
                      title="Editar"
                    >
                      ✏️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel de Herramientas */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#8A8A8A]/20">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Database className="w-5 h-5 mr-2 text-[#8A8A8A]" />
            Herramientas de Debug
          </h4>
          
          <div className="space-y-4">
            {/* Recrear Usuario */}
            <div className="bg-[#2a2a2a] rounded-lg p-4 border border-red-500/20">
              <h5 className="text-white font-medium mb-2">🚨 Recrear Usuario en Auth</h5>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Email del usuario"
                  className="w-full bg-[#3a3a3a] border border-[#8A8A8A]/30 rounded px-3 py-2 text-white text-sm"
                  id="recreate-email"
                />
                <input
                  type="password"
                  placeholder="Nueva contraseña"
                  className="w-full bg-[#3a3a3a] border border-[#8A8A8A]/30 rounded px-3 py-2 text-white text-sm"
                  id="recreate-password"
                />
                <button
                  onClick={() => {
                    const email = (document.getElementById('recreate-email') as HTMLInputElement)?.value;
                    const password = (document.getElementById('recreate-password') as HTMLInputElement)?.value;
                    if (email && password) {
                      recreateAuthUser(email, password);
                    } else {
                      alert('Por favor completa email y contraseña');
                    }
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors"
                >
                  🔧 Recrear en Auth
                </button>
              </div>
            </div>

            {/* Verificación Rápida */}
            <div className="bg-[#2a2a2a] rounded-lg p-4 border border-[#8A8A8A]/20">
              <h5 className="text-white font-medium mb-2">🔍 Verificación Rápida</h5>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Email a verificar"
                  className="w-full bg-[#3a3a3a] border border-[#8A8A8A]/30 rounded px-3 py-2 text-white text-sm"
                  id="check-email"
                />
                <button
                  onClick={() => {
                    const email = (document.getElementById('check-email') as HTMLInputElement)?.value;
                    if (email) {
                      checkUserAuth(email);
                    } else {
                      alert('Por favor ingresa un email');
                    }
                  }}
                  className="w-full bg-[#8A8A8A] hover:bg-[#8A8A8A]/80 text-white px-3 py-2 rounded text-sm transition-colors"
                >
                  Verificar Usuario
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resultado de Debug */}
      {debugResult && (
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#8A8A8A]/20">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-lg font-semibold text-white flex items-center">
              <Eye className="w-5 h-5 mr-2 text-[#8A8A8A]" />
              Resultado
            </h4>
            <button
              onClick={() => setDebugResult('')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <pre className="bg-[#2a2a2a] rounded-lg p-4 text-sm text-green-400 overflow-auto max-h-64 border border-[#8A8A8A]/10">
            {debugResult}
          </pre>
        </div>
      )}
    </div>
  );

  const renderContentPanel = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Editor de Contenido</h3>
        <button className="bg-[#ec4d58] hover:bg-[#ec4d58]/90 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <FileText className="w-4 h-4 mr-2" />
          Nuevo Contenido
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Categories */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a]">
          <h4 className="text-lg font-semibold text-white mb-4">Categorías de Contenido</h4>
          <div className="space-y-3">
            {['Teórico', 'Práctico', 'Videos', 'Evaluaciones', 'Recursos'].map((category) => (
              <div key={category} className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors cursor-pointer">
                <span className="text-white">{category}</span>
                <span className="text-gray-400 text-sm">12 archivos</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a]">
          <h4 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h4>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors">
              <span className="text-white">Publicar Nuevo Módulo</span>
              <FileText className="w-4 h-4 text-[#ec4d58]" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors">
              <span className="text-white">Actualizar Contenido</span>
              <Edit className="w-4 h-4 text-[#ec4d58]" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors">
              <span className="text-white">Gestionar Evaluaciones</span>
              <Target className="w-4 h-4 text-[#ec4d58]" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors">
              <span className="text-white">Subir Recursos</span>
              <Database className="w-4 h-4 text-[#ec4d58]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsPanel = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Configuraciones Avanzadas</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Settings */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a]">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-[#ec4d58]" />
            Configuración del Sistema
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white">Mantenimiento</span>
              <button className="bg-[#ec4d58] hover:bg-[#ec4d58]/90 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                Activar
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Backup Automático</span>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Notificaciones</span>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a]">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-[#ec4d58]" />
            Seguridad
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white">Autenticación 2FA</span>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Firewall</span>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Encriptación SSL</span>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLogsPanel = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Logs y Auditoría del Sistema</h3>
      
      <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] overflow-hidden">
        <div className="p-4 border-b border-[#2a2a2a]">
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-[#ec4d58] text-white rounded-lg text-sm">Todos</button>
            <button className="px-3 py-1 bg-[#2a2a2a] text-white rounded-lg text-sm">Info</button>
            <button className="px-3 py-1 bg-[#2a2a2a] text-white rounded-lg text-sm">Warning</button>
            <button className="px-3 py-1 bg-[#2a2a2a] text-white rounded-lg text-sm">Error</button>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {systemLogs.map((log) => (
            <div key={log.id} className="p-4 border-b border-[#2a2a2a] hover:bg-[#2a2a2a] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    log.type === 'error' ? 'bg-red-500' :
                    log.type === 'warning' ? 'bg-yellow-500' :
                    log.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <span className="text-white">{log.message}</span>
                </div>
                <span className="text-gray-400 text-sm">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCommunicationsPanel = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Comunicaciones</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Campaigns */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a]">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2 text-[#ec4d58]" />
            Campañas de Email
          </h4>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors">
              <span className="text-white">Nuevo Email</span>
              <Send className="w-4 h-4 text-[#ec4d58]" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors">
              <span className="text-white">Plantillas</span>
              <FileText className="w-4 h-4 text-[#ec4d58]" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors">
              <span className="text-white">Historial</span>
              <Clock className="w-4 h-4 text-[#ec4d58]" />
            </button>
          </div>
        </div>

        {/* System Notifications */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a]">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-[#ec4d58]" />
            Notificaciones del Sistema
          </h4>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors">
              <span className="text-white">Nuevo Banner</span>
              <Zap className="w-4 h-4 text-[#ec4d58]" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors">
              <span className="text-white">Anuncio Global</span>
              <Globe className="w-4 h-4 text-[#ec4d58]" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors">
              <span className="text-white">Alertas</span>
              <AlertTriangle className="w-4 h-4 text-[#ec4d58]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEventsPanel = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Eventos y Minijuegos</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Management */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a]">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Gamepad2 className="w-5 h-5 mr-2 text-[#ec4d58]" />
            Gestión de Eventos
          </h4>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors">
              <span className="text-white">Crear Evento</span>
              <Plus className="w-4 h-4 text-[#ec4d58]" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors">
              <span className="text-white">Eventos Activos</span>
              <Activity className="w-4 h-4 text-[#ec4d58]" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors">
              <span className="text-white">Calendario</span>
              <Calendar className="w-4 h-4 text-[#ec4d58]" />
            </button>
          </div>
        </div>

        {/* Mini Games */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a]">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-[#ec4d58]" />
            Minijuegos
          </h4>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors">
              <span className="text-white">Activar Trading Game</span>
              <Zap className="w-4 h-4 text-[#ec4d58]" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors">
              <span className="text-white">Configurar Premios</span>
              <Award className="w-4 h-4 text-[#ec4d58]" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors">
              <span className="text-white">Estadísticas</span>
              <BarChart3 className="w-4 h-4 text-[#ec4d58]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPanel = () => {
    switch (activeTab) {
      case 'metrics':
        return renderMetricsPanel();
      case 'users':
        return renderUsersPanel();
      case 'debug':
        return renderDebugPanel();
      case 'content':
        return renderContentPanel();
      case 'settings':
        return renderSettingsPanel();
      case 'logs':
        return renderLogsPanel();
      case 'communications':
        return renderCommunicationsPanel();
      case 'events':
        return renderEventsPanel();
      case 'markets':
        return (
          <MarketsPanel 
            interval={marketsInterval} 
            setInterval={setMarketsInterval} 
          />
        );
      default:
        return renderMetricsPanel();
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-20 md:pt-20 w-full overflow-x-hidden">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-[#8A8A8A]/20 to-[#6A6A6A]/20 rounded-xl border border-[#8A8A8A]/30">
              <Crown className="w-8 h-8 text-[#8A8A8A]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#8A8A8A] bg-clip-text text-transparent">
                Panel de Maestro
              </h1>
              <p className="text-[#8A8A8A] font-medium">Gobernanza y Control Total del Ecosistema Crypto Force</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-white font-medium">Maestro del Sistema</p>
              <p className="text-gray-400 text-sm">Nivel Reservado</p>
            </div>
            <div className="w-10 h-10 bg-[#ec4d58] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-6">
        <div className="flex space-x-1 overflow-x-auto">
          {adminTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#8A8A8A] text-white shadow-lg border border-[#8A8A8A]/50'
                  : 'text-gray-400 hover:text-white hover:bg-[#8A8A8A]/20 border border-transparent'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {renderPanel()}
      </div>
    </div>
  );
}
