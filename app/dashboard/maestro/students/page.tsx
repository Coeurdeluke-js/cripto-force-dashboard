'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search,
  Eye,
  Crown,
  Star
} from 'lucide-react';

interface User {
  id: string;
  nombre: string;
  apellido: string;
  nickname: string;
  email: string;
  user_level: string;
  created_at: string;
}

export default function StudentsPage() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/maestro/real-stats');
        if (response.ok) {
          const data = await response.json();
          console.log('Datos recibidos de la API:', data); // Debug
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8A8A8A]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#8A8A8A] mb-2">
          Gestión de Estudiantes
        </h1>
        <p className="text-gray-400">
          Administra usuarios del sistema
        </p>
      </div>

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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.user_level === 'maestro' 
                        ? 'bg-[#8A8A8A] text-white'
                        : user.user_level === 'acolito'
                        ? 'bg-purple-900 text-purple-200'
                        : 'bg-yellow-900 text-yellow-200'
                    }`}>
                      {user.user_level || 'iniciado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewUser(user)}
                      className="text-[#8A8A8A] hover:text-white transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#3a3a3a] max-w-md w-full">
            <div className="p-6 border-b border-[#3a3a3a]">
              <h3 className="text-xl font-semibold text-white">Detalles del Usuario</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-400">Nombre Completo</label>
                <div className="text-white font-medium">
                  {selectedUser.nombre} {selectedUser.apellido}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Nickname</label>
                <div className="text-white font-medium">@{selectedUser.nickname}</div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <div className="text-white font-medium">{selectedUser.email}</div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Nivel</label>
                <div className="text-white font-medium capitalize">{selectedUser.user_level || 'iniciado'}</div>
              </div>
            </div>
            <div className="p-6 border-t border-[#3a3a3a] flex justify-end">
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
    </div>
  );
}
