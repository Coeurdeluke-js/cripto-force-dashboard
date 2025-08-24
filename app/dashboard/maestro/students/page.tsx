'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search,
  Eye,
  Edit,
  Save,
  X,
  Crown,
  Star,
  Phone,
  Building,
  Calendar,
  UserCheck
} from 'lucide-react';
import { useAuthToken } from '@/hooks/useAuthToken';

interface User {
  id: string;
  nombre: string;
  apellido: string;
  nickname: string;
  email: string;
  movil?: string;
  exchange?: string;
  user_level: number;
  referral_code?: string;
  referred_by?: string;
  total_referrals?: number;
  created_at: string;
  updated_at?: string;
  uid?: string;
}

interface EditUserData {
  nombre: string;
  apellido: string;
  nickname: string;
  email: string;
  movil: string;
  exchange: string;
  user_level: number;
  referral_code: string;
  referred_by: string;
  total_referrals: number;
}

export default function StudentsPage() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<EditUserData | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [cleanupInfo, setCleanupInfo] = useState<any>(null);
  const [profileCreationInfo, setProfileCreationInfo] = useState<any>(null);
  const [authDebugInfo, setAuthDebugInfo] = useState<any>(null);
  
  const { token, loading: tokenLoading, error: tokenError, refreshToken, createSessionFromCurrentUser, signOut } = useAuthToken();

  // Funciones de manejo de acciones
  const handleSendMagicLink = async () => {
    try {
      await createSessionFromCurrentUser();
      setSuccess('Magic Link enviado correctamente');
    } catch (error) {
      setError('Error al enviar Magic Link');
    }
  };

  const handleRefreshToken = async () => {
    try {
      await refreshToken();
      setSuccess('Token refrescado correctamente');
    } catch (error) {
      setError('Error al refrescar token');
    }
  };

  const handleDebugAuth = async () => {
    try {
      const response = await fetch('/api/maestro/debug-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAuthDebugInfo(data.diagnosis);
        setSuccess('Debug de autenticación completado');
      } else {
        setError('Error en debug de autenticación');
      }
    } catch (error) {
      setError('Error al realizar debug de autenticación');
    }
  };

  const handleFixFounderPermissions = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const response = await fetch('/api/maestro/fix-founder-permissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSuccess('Permisos de fundador corregidos correctamente');
        console.log('Founder permissions fixed:', data);
        
        // Recargar usuarios para mostrar cambios
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(`Error corrigiendo permisos: ${errorData.error}`);
      }
    } catch (error) {
      setError('Error al corregir permisos de fundador');
      console.error('Error in handleFixFounderPermissions:', error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/maestro/students');
        if (response.ok) {
          const data = await response.json();
          console.log('Datos recibidos de la API de estudiantes:', data);
          if (data.success && data.users) {
            setAllUsers(data.users);
            setFilteredUsers(data.users);
          } else {
            console.error('Error en la respuesta de la API:', data.error);
            setError(data.error || 'Error obteniendo usuarios');
          }
        } else {
          let errorData;
          try {
            errorData = await response.json();
          } catch (e) {
            errorData = { error: 'No se pudo leer la respuesta del servidor' };
          }
          console.error('Error en la respuesta de la API:', response.status, errorData);
          setError(errorData.error || `Error ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error de conexión al obtener usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = allUsers.filter(user => 
        user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(allUsers);
    }
  }, [searchTerm, allUsers]);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleEditUser = (user: User) => {
    console.log('handleEditUser: User data received:', user);
    console.log('handleEditUser: user.user_level:', user.user_level, 'Type:', typeof user.user_level);
    
    const editData = {
      nombre: user.nombre || '',
      apellido: user.apellido || '',
      nickname: user.nickname || '',
      email: user.email || '',
      movil: user.movil || '',
      exchange: user.exchange || '',
      user_level: user.user_level !== undefined ? user.user_level : 1,
      referral_code: user.referral_code || '',
      referred_by: user.referred_by || '',
      total_referrals: user.total_referrals || 0
    };
    
    console.log('handleEditUser: Setting editingUser to:', editData);
    setEditingUser(editData);
    setSelectedUser(user);
    setShowEditModal(true);
    setError(null);
    setSuccess(null);
  };

  const handleSaveUser = async () => {
    if (!editingUser || !selectedUser) {
      console.error('handleSaveUser: No editingUser or selectedUser');
      setError('Datos de usuario no disponibles');
      return;
    }

    console.log('handleSaveUser: Starting update process');
    console.log('handleSaveUser: User ID:', selectedUser.id);
    console.log('handleSaveUser: Updates to apply:', editingUser);
    console.log('handleSaveUser: Token available:', !!token);
    console.log('handleSaveUser: Token length:', token?.length);

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const requestBody = {
        action: 'update_user',
        userId: selectedUser.id,
        userData: editingUser
      };
      
      console.log('handleSaveUser: Request body:', requestBody);
      console.log('handleSaveUser: Making API call to /api/maestro/students');

      const response = await fetch('/api/maestro/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('handleSaveUser: Response status:', response.status);
      console.log('handleSaveUser: Response headers:', Object.fromEntries(response.headers.entries()));

      const data = await response.json();
      console.log('handleSaveUser: Response data:', data);

      if (response.ok) {
        setSuccess('Usuario actualizado correctamente');
        console.log('handleSaveUser: Update successful, updating local state');
        
        // Actualizar la lista de usuarios
        const updatedUsers = allUsers.map(user => 
          user.id === selectedUser.id 
            ? { ...user, ...editingUser }
            : user
        );
        setAllUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        
        console.log('handleSaveUser: Local state updated, closing modal in 2 seconds');
        
        // Cerrar modal después de un delay
        setTimeout(() => {
          setShowEditModal(false);
          setSuccess(null);
        }, 2000);
      } else {
        console.error('handleSaveUser: API error:', data.error);
        if (response.status === 401) {
          setError('Sesión expirada. Por favor, refresca la página o inicia sesión nuevamente.');
        } else if (response.status === 404) {
          setError('Usuario no encontrado. Verifica que el usuario exista en la base de datos.');
        } else {
          setError(data.error || `Error al actualizar usuario (${response.status})`);
        }
      }
    } catch (error) {
      console.error('handleSaveUser: Network or other error:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setError('Error de conexión. Verifica tu conexión a internet y que el servidor esté funcionando.');
      } else {
        setError(`Error inesperado: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      }
    } finally {
      setSaving(false);
      console.log('handleSaveUser: Update process completed');
    }
  };

  const handleInputChange = (field: keyof EditUserData, value: string | number) => {
    if (editingUser) {
      setEditingUser({
        ...editingUser,
        [field]: value
      });
    }
  };

  // Función para diagnosticar problemas de usuario
  const handleDiagnoseUser = async (userId: string, userEmail: string) => {
    if (!token) {
      setError('Token de autenticación no disponible');
      return;
    }

    try {
      console.log('handleDiagnoseUser: Starting diagnosis for user:', { userId, userEmail });
      
      const response = await fetch('/api/maestro/diagnose-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          targetUserId: userId,
          targetUserEmail: userEmail
        })
      });

      const data = await response.json();
      console.log('handleDiagnoseUser: Diagnosis response:', data);

      if (response.ok) {
        const diagnosis = data.diagnosis;
        
        // Mostrar diagnóstico en un modal o alerta
        const diagnosisMessage = `
🔍 DIAGNÓSTICO COMPLETADO

👤 USUARIO AUTENTICADO:
- ID: ${diagnosis.authenticatedUser.id}
- Email: ${diagnosis.authenticatedUser.email}
- Perfiles: ${diagnosis.authenticatedUser.profileCount}
- Es Maestro: ${diagnosis.authenticatedUser.isMaestro ? 'SÍ' : 'NO'}

🎯 USUARIO OBJETIVO:
- ID Solicitado: ${diagnosis.targetUser.requestedId}
- Email Solicitado: ${diagnosis.targetUser.requestedEmail}
- Encontrado: ${diagnosis.targetUser.found ? 'SÍ' : 'NO'}
- Error: ${diagnosis.targetUser.error || 'Ninguno'}

📊 ESTADO DE LA BASE DE DATOS:
- Total Usuarios: ${diagnosis.databaseStatus.totalUsers}
- Tiene Duplicados: ${diagnosis.databaseStatus.hasDuplicates ? 'SÍ' : 'NO'}

💡 RECOMENDACIONES:
${diagnosis.recommendations.map((rec: string) => `• ${rec}`).join('\n')}
        `;
        
        alert(diagnosisMessage);
        console.log('Diagnóstico completo:', diagnosis);
      } else {
        setError(`Error en diagnóstico: ${data.error}`);
      }
    } catch (error) {
      console.error('handleDiagnoseUser: Error:', error);
      setError(`Error al diagnosticar: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  const handleDebugUser = async () => {
    if (!token) {
      setError('Token de autenticación no disponible');
      return;
    }

    try {
      console.log('handleDebugUser: Starting debug request');
      const response = await fetch('/api/maestro/debug-user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('handleDebugUser: Debug response:', data);

      if (response.ok) {
        setDebugInfo(data.debug);
        setSuccess('Información de debug obtenida correctamente');
      } else {
        setError(data.error || 'Error al obtener información de debug');
      }
    } catch (error) {
      console.error('handleDebugUser: Network error:', error);
      setError('Error de conexión al obtener debug');
    }
  };

  const handleCleanupDuplicates = async () => {
    if (!token) {
      setError('Token de autenticación no disponible');
      return;
    }

    try {
      console.log('handleCleanupDuplicates: Starting cleanup request');
      const response = await fetch('/api/maestro/cleanup-duplicates', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('handleCleanupDuplicates: Cleanup response:', data);

      if (response.ok) {
        setCleanupInfo(data);
        setSuccess(data.message || 'Limpieza completada correctamente');
      } else {
        setError(data.error || 'Error al limpiar duplicados');
      }
    } catch (error) {
      console.error('handleCleanupDuplicates: Network error:', error);
      setError('Error de conexión al limpiar duplicados');
    }
  };

  const handleCreateProfile = async () => {
    if (!token) {
      setError('Token de autenticación no disponible');
      return;
    }

    try {
      console.log('handleCreateProfile: Starting profile creation request');
      const response = await fetch('/api/maestro/create-profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('handleCreateProfile: Profile creation response:', data);

      if (response.ok) {
        setProfileCreationInfo(data);
        setSuccess(data.message || 'Perfil creado correctamente');
        
        // Refrescar la información de debug después de crear el perfil
        setTimeout(() => {
          handleDebugUser();
        }, 1000);
      } else {
        setError(data.error || 'Error al crear perfil');
      }
    } catch (error) {
      console.error('handleCreateProfile: Network error:', error);
      setError('Error de conexión al crear perfil');
    }
  };

  const handleAuthDebug = async () => {
    if (!token) {
      setError('Token de autenticación no disponible');
      return;
    }

    try {
      console.log('handleAuthDebug: Starting auth debug request');
      const response = await fetch('/api/maestro/debug-auth', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('handleAuthDebug: Auth debug response:', data);

      if (response.ok) {
        setAuthDebugInfo(data);
        setSuccess('Información de debug de autenticación obtenida');
      } else {
        setError(data.error || 'Error al obtener debug de autenticación');
      }
    } catch (error) {
      console.error('handleAuthDebug: Network error:', error);
      setError('Error de conexión al obtener debug de autenticación');
    }
  };

  // Función para mapear niveles numéricos a strings legibles
  const getLevelDisplay = (level: string | number) => {
    const numLevel = typeof level === 'string' ? parseInt(level) : level;
    switch (numLevel) {
      case 0:
        return '🎯 Fundador';
      case 1:
        return '👤 Iniciado';
      case 2:
        return '🔮 Acólito';
      case 3:
        return '⚔️ Warrior';
      case 4:
        return '👑 Lord';
      case 5:
        return '💀 Darth';
      case 6:
        return '👨‍🏫 Maestro';
      default:
        return '👤 Iniciado';
    }
  };

  const getLevelColor = (level: string | number) => {
    const numLevel = typeof level === 'string' ? parseInt(level) : level;
    switch (numLevel) {
      case 0:
        return 'bg-[#8A8A8A] text-white'; // Fundador - Gris
      case 1:
        return 'bg-yellow-900 text-yellow-200'; // Iniciado - Amarillo
      case 2:
        return 'bg-purple-900 text-purple-200'; // Acólito - Púrpura
      case 3:
        return 'bg-blue-900 text-blue-200'; // Warrior - Azul
      case 4:
        return 'bg-green-900 text-green-200'; // Lord - Verde
      case 5:
        return 'bg-red-900 text-red-200'; // Darth - Rojo
      case 6:
        return 'bg-indigo-900 text-indigo-200'; // Maestro - Índigo
      default:
        return 'bg-yellow-900 text-yellow-200'; // Por defecto Iniciado
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8A8A8A]"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none min-w-0">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#8A8A8A] mb-2">
          Gestión de Estudiantes
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Administra y gestiona todos los usuarios del sistema
        </p>
      </div>

      {/* Barra de acciones */}
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl border border-[#3a3a3a] p-3 sm:p-4 mb-4 sm:mb-6">
        <h3 className="text-white font-semibold mb-3 sm:mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#8A8A8A]" />
          <span className="text-sm sm:text-base">Acciones:</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
          <button
            onClick={handleSendMagicLink}
            className="px-2 sm:px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2"
          >
            <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Enviar Magic Link</span>
            <span className="sm:hidden">Magic Link</span>
          </button>
          <button
            onClick={handleRefreshToken}
            className="px-2 sm:px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2"
          >
            <UserCheck className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Refresh Token</span>
            <span className="sm:hidden">Refresh</span>
          </button>
          <button
            onClick={handleDebugUser}
            className="px-2 sm:px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Debug User</span>
            <span className="sm:hidden">Debug</span>
          </button>
          <button
            onClick={handleCleanupDuplicates}
            className="px-2 sm:px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2"
          >
            <Building className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Limpiar Duplicados</span>
            <span className="sm:hidden">Limpiar</span>
          </button>
          <button
            onClick={handleCreateProfile}
            className="px-2 sm:px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2"
          >
            <Save className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Crear Perfil</span>
            <span className="sm:hidden">Perfil</span>
          </button>
          <button
            onClick={handleDebugAuth}
            className="px-2 sm:px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2"
          >
            <UserCheck className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Debug Auth</span>
            <span className="sm:hidden">Auth</span>
          </button>
          <button
            onClick={handleFixFounderPermissions}
            className="px-2 sm:px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2"
          >
            <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Corregir Permisos Fundador</span>
            <span className="sm:hidden">Corregir</span>
          </button>
          <button
            onClick={() => handleDiagnoseUser('', '')}
            className="px-2 sm:px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Diagnóstico</span>
            <span className="sm:hidden">Diag</span>
          </button>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl border border-[#3a3a3a] p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre, nickname o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8A8A8A] text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Lista de usuarios */}
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl border border-[#3a3a3a] p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-white font-semibold text-base sm:text-lg">
            Usuarios ({filteredUsers.length})
          </h3>
        </div>

        {loading ? (
          <div className="text-center py-6 sm:py-8">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-[#8A8A8A] mx-auto mb-3 sm:mb-4"></div>
            <p className="text-gray-400 text-sm sm:text-base">Cargando usuarios...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="border-b border-[#3a3a3a]">
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm">USUARIO</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm hidden sm:table-cell">EMAIL</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm hidden lg:table-cell">INFO ADICIONAL</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm">NIVEL</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm hidden sm:table-cell">REFERIDOS</th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-[#2a2a2a] hover:bg-[#2a2a2a]/50">
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#3a3a3a] rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                          {user.nombre?.charAt(0) || user.nickname?.charAt(0) || 'U'}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-white font-medium text-sm sm:text-base truncate">
                            {user.nombre && user.apellido ? `${user.nombre} ${user.apellido}` : user.nickname || 'Usuario'}
                          </div>
                          <div className="text-gray-400 text-xs sm:text-sm truncate">
                            @{user.nickname || 'sin_nickname'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm hidden sm:table-cell">
                      <div className="truncate max-w-[200px]" title={user.email}>
                        {user.email}
                      </div>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm hidden lg:table-cell">
                      <div className="flex flex-col gap-1">
                        {user.movil ? (
                          <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <Phone className="w-3 h-3" />
                            <span className="truncate max-w-[120px]" title={user.movil}>{user.movil}</span>
                          </div>
                        ) : (
                          <div className="text-gray-600 text-xs">Sin móvil</div>
                        )}
                        {user.exchange ? (
                          <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <Building className="w-3 h-3" />
                            <span className="truncate max-w-[120px]" title={user.exchange}>{user.exchange}</span>
                          </div>
                        ) : (
                          <div className="text-gray-600 text-xs">Sin exchange</div>
                        )}
                      </div>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(user.user_level)}`}>
                        {getLevelDisplay(user.user_level)}
                      </span>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-300 text-xs sm:text-sm hidden sm:table-cell">
                      {user.total_referrals || 0}
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors"
                        title="Ver detalles"
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mensajes de estado */}
      {error && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 text-sm sm:text-base">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-900/20 border border-green-500/50 rounded-lg text-green-400 text-sm sm:text-base">
          {success}
        </div>
      )}

      {/* Información de Debug */}
      {debugInfo && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
          <h4 className="text-sm font-medium text-purple-300 mb-2 sm:mb-3">Información de Debug del Usuario</h4>
          <div className="space-y-2 text-xs">
            <pre className="text-white overflow-x-auto text-xs sm:text-sm">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Información de Limpieza */}
      {cleanupInfo && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
          <h4 className="text-sm font-medium text-orange-300 mb-2 sm:mb-3">Información de Limpieza de Duplicados</h4>
          <div className="space-y-2 text-xs">
            <pre className="text-white overflow-x-auto text-xs sm:text-sm">
              {JSON.stringify(cleanupInfo, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Información de Creación de Perfil */}
      {profileCreationInfo && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <h4 className="text-sm font-medium text-green-300 mb-2 sm:mb-3">Información de Creación de Perfil</h4>
          <div className="space-y-2 text-xs">
            <pre className="text-white overflow-x-auto text-xs sm:text-sm">
              {JSON.stringify(profileCreationInfo, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Información de Debug de Autenticación */}
      {authDebugInfo && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
          <h4 className="text-sm font-medium text-red-300 mb-2 sm:mb-3">Información de Debug de Autenticación</h4>
          <div className="space-y-2 text-xs">
            <pre className="text-white overflow-x-auto text-xs sm:text-sm">
              {JSON.stringify(authDebugInfo, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Información de Debug de la API */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <h4 className="text-sm font-medium text-blue-300 mb-2 sm:mb-3">Debug de Datos de la API</h4>
        <div className="space-y-2 text-xs">
          <div className="text-blue-200">
            <strong>Total de usuarios cargados:</strong> {allUsers.length}
          </div>
          <div className="text-blue-200">
            <strong>Usuarios filtrados:</strong> {filteredUsers.length}
          </div>
          {allUsers.length > 0 && (
            <div className="text-blue-200">
              <strong>Primer usuario (ejemplo):</strong>
              <pre className="text-white overflow-x-auto text-xs mt-1 bg-black/20 p-2 rounded">
                {JSON.stringify(allUsers[0], null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalles del usuario */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#3a3a3a] w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-[#3a3a3a] flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-semibold text-white">Detalles del Usuario</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#8A8A8A] flex items-center justify-center">
                  <span className="text-lg sm:text-xl font-bold text-white">
                    {selectedUser.nombre?.[0]?.toUpperCase() || selectedUser.nickname?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-base sm:text-lg font-semibold text-white truncate">
                    {selectedUser.nombre} {selectedUser.apellido}
                  </h4>
                  <p className="text-gray-400 text-sm truncate">@{selectedUser.nickname}</p>
                </div>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <UserCheck className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white truncate">{selectedUser.email}</span>
                </div>
                
                {selectedUser.movil && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-400">Móvil:</span>
                    <span className="text-white truncate">{selectedUser.movil}</span>
                  </div>
                )}
                
                {selectedUser.exchange && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Building className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-400">Exchange:</span>
                    <span className="text-white truncate">{selectedUser.exchange}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-400">Nivel:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(selectedUser.user_level)}`}>
                    {getLevelDisplay(selectedUser.user_level)}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-400">Referidos:</span>
                  <span className="text-white">{selectedUser.total_referrals || 0}</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-400">Registrado:</span>
                  <span className="text-white">
                    {new Date(selectedUser.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-[#3a3a3a] flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setShowUserModal(false);
                  handleEditUser(selectedUser);
                }}
                className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                Editar
              </button>
              <button
                onClick={() => setShowUserModal(false)}
                className="px-3 sm:px-4 py-2 bg-[#8A8A8A] text-white rounded-lg hover:bg-[#9A9A9A] transition-colors text-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición del usuario */}
      {showEditModal && selectedUser && editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#3a3a3a] w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-[#3a3a3a] flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-semibold text-white">Editar Usuario</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Información personal */}
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-base sm:text-lg font-medium text-white border-b border-[#3a3a3a] pb-2">
                    Información Personal
                  </h4>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1 sm:mb-2">Nombre</label>
                    <input
                      type="text"
                      value={editingUser.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A] text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1 sm:mb-2">Apellido</label>
                    <input
                      type="text"
                      value={editingUser.apellido}
                      onChange={(e) => handleInputChange('apellido', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A] text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1 sm:mb-2">Nickname</label>
                    <input
                      type="text"
                      value={editingUser.nickname}
                      onChange={(e) => handleInputChange('nickname', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A] text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1 sm:mb-2">Email</label>
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A] text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1 sm:mb-2">Móvil</label>
                    <input
                      type="text"
                      value={editingUser.movil}
                      onChange={(e) => handleInputChange('movil', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A] text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1 sm:mb-2">Exchange</label>
                    <input
                      type="text"
                      value={editingUser.exchange}
                      onChange={(e) => handleInputChange('exchange', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A] text-sm"
                    />
                  </div>
                </div>
                
                {/* Información del sistema */}
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-base sm:text-lg font-medium text-white border-b border-[#3a3a3a] pb-2">
                    Información del Sistema
                  </h4>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1 sm:mb-2">Nivel de Usuario</label>
                    {editingUser && (
                      <div className="text-xs text-gray-500 mb-1">
                        Debug: user_level = {editingUser.user_level} (Type: {typeof editingUser.user_level})
                      </div>
                    )}
                    <select
                      value={editingUser?.user_level ?? 1}
                      onChange={(e) => handleInputChange('user_level', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A] text-sm"
                    >
                      <option value={0}>🎯 Fundador</option>
                      <option value={1}>👤 Iniciado</option>
                      <option value={2}>🔮 Acólito</option>
                      <option value={3}>⚔️ Warrior</option>
                      <option value={4}>👑 Lord</option>
                      <option value={5}>💀 Darth</option>
                      <option value={6}>👨‍🏫 Maestro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1 sm:mb-2">Código de Referido</label>
                    <input
                      type="text"
                      value={editingUser.referral_code}
                      onChange={(e) => handleInputChange('referral_code', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A] text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1 sm:mb-2">Referido por</label>
                    <input
                      type="text"
                      value={editingUser.referred_by}
                      onChange={(e) => handleInputChange('referred_by', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A] text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1 sm:mb-2">Total de Referidos</label>
                    <input
                      type="number"
                      value={editingUser.total_referrals}
                      onChange={(e) => handleInputChange('total_referrals', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A] text-sm"
                    />
                  </div>
                  

                </div>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 border-t border-[#3a3a3a] flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                disabled={saving}
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveUser}
                disabled={saving}
                className="px-3 sm:px-4 py-2 bg-[#8A8A8A] text-white rounded-lg hover:bg-[#9A9A9A] transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-3 h-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
