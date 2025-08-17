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
  user_level: string;
  referral_code?: string;
  referred_by?: string;
  total_referrals?: number;
  total_earnings?: number;
  created_at: string;
  uid?: string;
}

interface EditUserData {
  nombre: string;
  apellido: string;
  nickname: string;
  email: string;
  movil: string;
  exchange: string;
  user_level: string;
  referral_code: string;
  referred_by: string;
  total_referrals: number;
  total_earnings: number;
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/maestro/real-stats');
        if (response.ok) {
          const data = await response.json();
          console.log('Datos recibidos de la API:', data);
          setAllUsers(data.recentUsers || []);
          setFilteredUsers(data.recentUsers || []);
        } else {
          console.error('Error en la respuesta de la API:', response.status);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
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
    setEditingUser({
      nombre: user.nombre || '',
      apellido: user.apellido || '',
      nickname: user.nickname || '',
      email: user.email || '',
      movil: user.movil || '',
      exchange: user.exchange || '',
      user_level: user.user_level || 'iniciado',
      referral_code: user.referral_code || '',
      referred_by: user.referred_by || '',
      total_referrals: user.total_referrals || 0,
      total_earnings: user.total_earnings || 0
    });
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
    
    if (!token) {
      console.error('handleSaveUser: No token available');
      setError('Token de autenticación no disponible. Intenta refrescar la página o iniciar sesión nuevamente.');
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
        userId: selectedUser.id,
        updates: editingUser
      };
      
      console.log('handleSaveUser: Request body:', requestBody);
      console.log('handleSaveUser: Making API call to /api/maestro/update-user');

      const response = await fetch('/api/maestro/update-user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'maestro':
        return 'bg-[#8A8A8A] text-white';
      case 'acolito':
        return 'bg-purple-900 text-purple-200';
      case 'iniciado':
        return 'bg-yellow-900 text-yellow-200';
      default:
        return 'bg-gray-700 text-gray-200';
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
    <div className="min-h-screen bg-[#121212] text-white p-6 pb-24 md:pb-6 mobile-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#8A8A8A] mb-2">
          Gestión de Estudiantes
        </h1>
        <p className="text-gray-400">
          Administra usuarios del sistema con acceso completo de super admin
        </p>
      </div>

      {/* Estado de Autenticación */}
      <div className="mb-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#3a3a3a]">
        <h3 className="text-lg font-semibold text-[#8A8A8A] mb-3">Estado de Autenticación:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${token ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={token ? 'text-green-400' : 'text-red-400'}>
              {token ? 'Con Token' : 'Sin Token'}
            </span>
          </div>
          <div className="text-sm text-gray-400">
            Longitud del token: {token ? `${token.length} caracteres` : 'N/A'}
          </div>
          <div className="text-sm text-gray-400">
            Estado: {loading ? 'Cargando...' : 'Listo'}
          </div>
        </div>
        {error && (
          <div className="mt-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
            <div className="text-red-400 text-sm font-medium">Error de Autenticación:</div>
            <div className="text-red-300 text-sm">{error}</div>
          </div>
        )}
      </div>

      {/* Mensajes de estado */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 rounded-lg text-green-400">
          {success}
        </div>
      )}

      {/* Estado del token para debugging */}
      <div className="mb-6 p-4 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Estado de Autenticación:
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${token ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-white">
              {tokenLoading ? 'Cargando...' : token ? 'Token Disponible' : 'Sin Token'}
            </span>
          </div>
        </div>
        
        {token && (
          <div className="mt-2 text-xs text-gray-500">
            Token: {token.substring(0, 20)}...{token.substring(token.length - 10)}
          </div>
        )}
        
        {tokenError && (
          <div className="mt-2 p-2 bg-red-900/20 border border-red-500/30 rounded text-xs text-red-400">
            <div className="flex items-center justify-between">
              <span>Error: {tokenError}</span>
              <div className="flex gap-2">
                <button
                  onClick={refreshToken}
                  className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                >
                  Refresh
                </button>
                <button
                  onClick={createSessionFromCurrentUser}
                  className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                >
                  Magic Link
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Opciones de autenticación */}
        <div className="mt-3 pt-3 border-t border-[#3a3a3a]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Acciones:</span>
            <div className="flex gap-2">
              {token ? (
                <button
                  onClick={signOut}
                  className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <button
                  onClick={createSessionFromCurrentUser}
                  className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                >
                  Enviar Magic Link
                </button>
              )}
              <button
                onClick={refreshToken}
                className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
              >
                Refresh Token
              </button>
              <button
                onClick={handleDebugUser}
                className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
              >
                Debug User
              </button>
              <button
                onClick={handleCleanupDuplicates}
                className="px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700 transition-colors"
              >
                Limpiar Duplicados
              </button>
              <button
                onClick={handleCreateProfile}
                className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
              >
                Crear Perfil
              </button>
              <button
                onClick={handleAuthDebug}
                className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
              >
                Debug Auth
              </button>
              <button
                onClick={() => handleDiagnoseUser('', '')}
                className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
                title="Diagnosticar problemas generales del sistema"
              >
                Diagnóstico General
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Información de Debug */}
      {debugInfo && (
        <div className="mb-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
          <h4 className="text-sm font-medium text-purple-300 mb-3">Información de Debug del Usuario</h4>
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-purple-400">Auth User ID:</span>
                <span className="text-white ml-2">{debugInfo.authUser.id}</span>
              </div>
              <div>
                <span className="text-purple-400">Auth User Email:</span>
                <span className="text-white ml-2">{debugInfo.authUser.email}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-purple-400">Database User Level:</span>
                <span className="text-white ml-2">{debugInfo.userLevel.value} ({debugInfo.userLevel.type})</span>
              </div>
              <div>
                <span className="text-purple-400">Is Maestro:</span>
                <span className={`ml-2 ${debugInfo.userLevel.isMaestro ? 'text-green-400' : 'text-red-400'}`}>
                  {debugInfo.userLevel.isMaestro ? 'SÍ' : 'NO'}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-purple-400">Can Edit Users:</span>
                <span className={`ml-2 ${debugInfo.permissions.canEditUsers ? 'text-green-400' : 'text-red-400'}`}>
                  {debugInfo.permissions.canEditUsers ? 'SÍ' : 'NO'}
                </span>
              </div>
              <div>
                <span className="text-purple-400">Can Access Maestro Dashboard:</span>
                <span className={`ml-2 ${debugInfo.permissions.canAccessMaestroDashboard ? 'text-green-400' : 'text-red-400'}`}>
                  {debugInfo.permissions.canAccessMaestroDashboard ? 'SÍ' : 'NO'}
                </span>
              </div>
            </div>
            <div className="mt-3 p-2 bg-gray-800/50 rounded text-xs">
              <span className="text-purple-400">Perfil Completo:</span>
              <pre className="text-white mt-1 overflow-x-auto">
                {JSON.stringify(debugInfo.databaseProfile, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Información de Limpieza */}
      {cleanupInfo && (
        <div className="mb-6 p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
          <h4 className="text-sm font-medium text-orange-300 mb-3">Información de Limpieza de Duplicados</h4>
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-orange-400">Registros Eliminados:</span>
                <span className="text-white ml-2">{cleanupInfo.deletedCount || 0}</span>
              </div>
              <div>
                <span className="text-orange-400">Estado:</span>
                <span className="text-green-400 ml-2">Completado</span>
              </div>
            </div>
            {cleanupInfo.duplicates && cleanupInfo.duplicates.length > 0 && (
              <div className="mt-3 p-2 bg-gray-800/50 rounded text-xs">
                <span className="text-orange-400">Duplicados Encontrados:</span>
                <pre className="text-white mt-1 overflow-x-auto">
                  {JSON.stringify(cleanupInfo.duplicates, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Información de Creación de Perfil */}
      {profileCreationInfo && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <h4 className="text-sm font-medium text-green-300 mb-3">Información de Creación de Perfil</h4>
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-green-400">Estado:</span>
                <span className="text-green-400 ml-2">Completado</span>
              </div>
              <div>
                <span className="text-green-400">Mensaje:</span>
                <span className="text-white ml-2">{profileCreationInfo.message}</span>
              </div>
            </div>
            {profileCreationInfo.profile && (
              <div className="mt-3 p-2 bg-gray-800/50 rounded text-xs">
                <span className="text-green-400">Perfil Creado:</span>
                <pre className="text-white mt-1 overflow-x-auto">
                  {JSON.stringify(profileCreationInfo.profile, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Información de Debug de Autenticación */}
      {authDebugInfo && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
          <h4 className="text-sm font-medium text-red-300 mb-3">Información de Debug de Autenticación</h4>
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-red-400">User ID:</span>
                <span className="text-white ml-2">{authDebugInfo.user?.id || 'N/A'}</span>
              </div>
              <div>
                <span className="text-red-400">User Email:</span>
                <span className="text-white ml-2">{authDebugInfo.user?.email || 'N/A'}</span>
              </div>
              <div>
                <span className="text-red-400">Email Confirmed:</span>
                <span className="text-white ml-2">{authDebugInfo.user?.emailConfirmed ? 'Sí' : 'No'}</span>
              </div>
              <div>
                <span className="text-red-400">Profile Count:</span>
                <span className="text-white ml-2">{authDebugInfo.profileCount || 0}</span>
              </div>
            </div>
            {authDebugInfo.session && (
              <div className="mt-3 p-2 bg-red-800/30 rounded">
                <div className="text-red-300 font-medium mb-2">Información de Sesión:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-red-400">Access Token:</span>
                    <span className="text-white ml-2">{authDebugInfo.session.accessToken || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-red-400">Expires At:</span>
                    <span className="text-white ml-2">{authDebugInfo.session.expiresAt || 'N/A'}</span>
                  </div>
                </div>
              </div>
            )}
            {authDebugInfo.tokenInfo && (
              <div className="mt-3 p-2 bg-red-800/30 rounded">
                <div className="text-red-300 font-medium mb-2">Información del Token:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-red-400">Length:</span>
                    <span className="text-white ml-2">{authDebugInfo.tokenInfo.length || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-red-400">Starts With:</span>
                    <span className="text-white ml-2">{authDebugInfo.tokenInfo.startsWith || 'N/A'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a] mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, nickname o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8A8A8A] focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl border border-[#3a3a3a] overflow-hidden">
        <div className="p-6 border-b border-[#3a3a3a]">
          <h3 className="text-xl font-semibold text-white">
            Usuarios ({filteredUsers.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#2a2a2a]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Nivel
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Referidos
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3a3a3a]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#2a2a2a] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-[#8A8A8A] flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {user.nombre?.[0]?.toUpperCase() || user.nickname?.[0]?.toUpperCase() || 'U'}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {user.nombre} {user.apellido}
                        </div>
                        <div className="text-sm text-gray-400">
                          @{user.nickname}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(user.user_level)}`}>
                      {user.user_level || 'iniciado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">
                      {user.total_referrals || 0} referidos
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="text-[#8A8A8A] hover:text-white transition-colors p-1"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                        title="Editar usuario"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDiagnoseUser(user.id, user.email)}
                        className="text-purple-400 hover:text-purple-300 transition-colors p-1"
                        title="Diagnosticar usuario"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de detalles del usuario */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#3a3a3a] max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#3a3a3a] flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Detalles del Usuario</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#8A8A8A] flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {selectedUser.nombre?.[0]?.toUpperCase() || selectedUser.nickname?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {selectedUser.nombre} {selectedUser.apellido}
                  </h4>
                  <p className="text-gray-400">@{selectedUser.nickname}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <UserCheck className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{selectedUser.email}</span>
                </div>
                
                {selectedUser.movil && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Móvil:</span>
                    <span className="text-white">{selectedUser.movil}</span>
                  </div>
                )}
                
                {selectedUser.exchange && (
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Exchange:</span>
                    <span className="text-white">{selectedUser.exchange}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-sm">
                  <Crown className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Nivel:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(selectedUser.user_level)}`}>
                    {selectedUser.user_level || 'iniciado'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Referidos:</span>
                  <span className="text-white">{selectedUser.total_referrals || 0}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Registrado:</span>
                  <span className="text-white">
                    {new Date(selectedUser.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-[#3a3a3a] flex justify-between">
              <button
                onClick={() => {
                  setShowUserModal(false);
                  handleEditUser(selectedUser);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Editar
              </button>
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 bg-[#8A8A8A] text-white rounded-lg hover:bg-[#9A9A9A] transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición del usuario */}
      {showEditModal && selectedUser && editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#3a3a3a] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#3a3a3a] flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Editar Usuario</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Información personal */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white border-b border-[#3a3a3a] pb-2">
                    Información Personal
                  </h4>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Nombre</label>
                    <input
                      type="text"
                      value={editingUser.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Apellido</label>
                    <input
                      type="text"
                      value={editingUser.apellido}
                      onChange={(e) => handleInputChange('apellido', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Nickname</label>
                    <input
                      type="text"
                      value={editingUser.nickname}
                      onChange={(e) => handleInputChange('nickname', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Móvil</label>
                    <input
                      type="text"
                      value={editingUser.movil}
                      onChange={(e) => handleInputChange('movil', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Exchange</label>
                    <input
                      type="text"
                      value={editingUser.exchange}
                      onChange={(e) => handleInputChange('exchange', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A]"
                    />
                  </div>
                </div>
                
                {/* Información del sistema */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white border-b border-[#3a3a3a] pb-2">
                    Información del Sistema
                  </h4>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Nivel de Usuario</label>
                    <select
                      value={editingUser.user_level}
                      onChange={(e) => handleInputChange('user_level', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A]"
                    >
                      <option value="iniciado">Iniciado</option>
                      <option value="acolito">Acólito</option>
                      <option value="maestro">Maestro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Código de Referido</label>
                    <input
                      type="text"
                      value={editingUser.referral_code}
                      onChange={(e) => handleInputChange('referral_code', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Referido por</label>
                    <input
                      type="text"
                      value={editingUser.referred_by}
                      onChange={(e) => handleInputChange('referred_by', e.target.value)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Total de Referidos</label>
                    <input
                      type="number"
                      value={editingUser.total_referrals}
                      onChange={(e) => handleInputChange('total_referrals', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Ganancias Totales</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingUser.total_earnings}
                      onChange={(e) => handleInputChange('total_earnings', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A8A8A]"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-[#3a3a3a] flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                disabled={saving}
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveUser}
                disabled={saving}
                className="px-4 py-2 bg-[#8A8A8A] text-white rounded-lg hover:bg-[#9A9A9A] transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
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
