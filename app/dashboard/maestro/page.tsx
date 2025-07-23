'use client';

import React from 'react';
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

import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { useBinanceKlines, INTERVALS } from '@/hooks/useBinanceKlines';

// Simple import without dynamic loading to avoid chunk issues
import TradingChart from '@/components/TradingChart';

export default function MaestroDashboard() {
  const [activeTab, setActiveTab] = useState('metrics');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // Mock data for demonstration
  const globalMetrics = {
    totalUsers: 1247,
    activeUsers: 892,
    totalCourses: 15,
    completionRate: 78.5,
    systemHealth: 99.2,
    activeSessions: 156
  };

  const recentUsers = [
    { id: 1, name: 'Alex Rivera', role: 'Iniciado', status: 'active', lastActive: '2h ago' },
    { id: 2, name: 'Maria Santos', role: 'Acólito', status: 'active', lastActive: '1h ago' },
    { id: 3, name: 'Carlos Vega', role: 'Warrior', status: 'inactive', lastActive: '1d ago' },
    { id: 4, name: 'Ana Torres', role: 'Darth', status: 'active', lastActive: '30m ago' }
  ];

  const systemLogs = [
    { id: 1, type: 'info', message: 'Sistema actualizado correctamente', timestamp: '2024-01-15 14:30' },
    { id: 2, type: 'warning', message: 'Alto tráfico detectado en módulo 7', timestamp: '2024-01-15 14:25' },
    { id: 3, type: 'error', message: 'Error en autenticación de usuario', timestamp: '2024-01-15 14:20' },
    { id: 4, type: 'success', message: 'Nuevo contenido publicado', timestamp: '2024-01-15 14:15' }
  ];

  const adminTabs = [
    { id: 'metrics', label: 'Métricas Globales', icon: BarChart3 },
    { id: 'users', label: 'Gestor de Usuarios', icon: Users },
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

  // Panel de Mercados con lightweight-charts y datos en tiempo real
  function MarketsPanel() {
    const [interval, setInterval] = useState('1h');
    const symbol = 'BTCUSDT';
    const { candles, loading, error, refetch } = useBinanceKlines(symbol, interval);
    const lastPrice = candles.length > 0 ? candles[candles.length - 1].close : null;

    return (
      <div className="space-y-6 w-full overflow-x-hidden">
        <h3 className="text-xl font-bold text-white flex items-center mb-4">
          <TrendingUp className="w-5 h-5 mr-2 text-[#ec4d58]" />
          TradingView - BTC/USDT Demo
          {lastPrice && (
            <span className="ml-4 px-3 py-1 rounded-full bg-[#232323] text-[#ec4d58] text-lg font-mono">{lastPrice.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})} USDT</span>
          )}
        </h3>
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
          <TradingChart
            candles={candles}
            loading={loading}
            error={error}
            onRefresh={refetch}
            symbol={symbol}
            interval={interval}
          />
        </div>
        <div className="text-gray-400 text-sm mt-2">
          Gráfico interactivo de ejemplo usando <span className="text-[#ec4d58] font-semibold">lightweight-charts</span>. Puedes expandir esta sección para mostrar más mercados, temporalidades, indicadores o herramientas de análisis.
        </div>
      </div>
    );
  }

  const renderMetricsPanel = () => (
    <div className="space-y-6">
      {/* Global Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#ec4d58] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Usuarios</p>
              <p className="text-3xl font-bold text-white">{globalMetrics.totalUsers.toLocaleString()}</p>
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
              <p className="text-3xl font-bold text-white">{globalMetrics.activeUsers}</p>
  </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Activity className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-400 text-sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            {((globalMetrics.activeUsers / globalMetrics.totalUsers) * 100).toFixed(1)}% activos
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#ec4d58] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Tasa de Completación</p>
              <p className="text-3xl font-bold text-white">{globalMetrics.completionRate}%</p>
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
              <p className="text-gray-400 text-sm">Salud del Sistema</p>
              <p className="text-3xl font-bold text-white">{globalMetrics.systemHealth}%</p>
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
              <p className="text-gray-400 text-sm">Sesiones Activas</p>
              <p className="text-3xl font-bold text-white">{globalMetrics.activeSessions}</p>
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
              <p className="text-gray-400 text-sm">Cursos Disponibles</p>
              <p className="text-3xl font-bold text-white">{globalMetrics.totalCourses}</p>
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
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-white font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-[#ec4d58]/10 text-[#ec4d58] rounded-full text-sm">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      user.status === 'active' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-gray-500/10 text-gray-500'
                    }`}>
                      {user.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{user.lastActive}</td>
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
        return <MarketsPanel />;
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
            <div className="p-3 bg-[#ec4d58]/10 rounded-lg">
              <Crown className="w-8 h-8 text-[#ec4d58]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Panel de Maestro</h1>
              <p className="text-gray-400">Gobernanza y ética del ecosistema Crypto Force</p>
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
                  ? 'bg-[#ec4d58] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#2a2a2a]'
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