'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Hash, 
  ArrowLeft,
  Edit,
  Save,
  X,
  Shield,
  Crown
} from 'lucide-react';
import ReferralCode from '@/components/ui/ReferralCode';

interface UserProfile {
  nombre: string;
  apellido: string;
  nickname: string;
  email: string;
  numeroMovil: string;
  exchange: string;
  uid: string;
  role: string;
  referralCode: string;
  referrals: number;
  earnings: number;
  joinDate: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    nombre: 'Juan',
    apellido: 'Pérez',
    nickname: 'TraderPro',
    email: 'juan.perez@email.com',
    numeroMovil: '+1 (555) 123-4567',
    exchange: 'Budget',
    uid: 'BUD123456',
    role: 'iniciado',
    referralCode: 'JUAN123',
    referrals: 5,
    earnings: 150,
    joinDate: '2024-01-15'
  });

  const [editData, setEditData] = useState<UserProfile>(profile);

  const handleEdit = () => {
    setEditData(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getRoleInfo = (role: string) => {
    const roles = {
      iniciado: { name: 'INICIADO', color: '#FAFAFA', icon: Shield },
      acolito: { name: 'ACÓLITO', color: '#FFD447', icon: Shield },
      warrior: { name: 'WARRIOR', color: '#3ED598', icon: Crown },
      lord: { name: 'LORD', color: '#4671D5', icon: Crown },
      darth: { name: 'DARTH', color: '#8B5CF6', icon: Crown },
      maestro: { name: 'MAESTRO', color: '#EC4D58', icon: Crown }
    };
    return roles[role as keyof typeof roles] || roles.iniciado;
  };

  const roleInfo = getRoleInfo(profile.role);
  const RoleIcon = roleInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] p-4">
      {/* Fondo con triángulos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/10 transform rotate-45"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-white/10 transform -rotate-45"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-white/10 transform rotate-12"></div>
          <div className="absolute bottom-40 right-1/4 w-28 h-28 border border-white/10 transform -rotate-12"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/dashboard/iniciado" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Volver al dashboard
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#1e2028]/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
              <RoleIcon size={20} style={{ color: roleInfo.color }} />
              <span className="text-white font-medium">{roleInfo.name}</span>
            </div>
            
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-[#FFD447] text-black rounded-lg hover:bg-[#FFB800] transition-colors font-medium"
              >
                <Edit size={16} />
                Editar perfil
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  <Save size={16} />
                  Guardar
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  <X size={16} />
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información del perfil */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información Personal */}
            <div className="bg-[#1e2028]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <User size={20} className="text-[#FFD447]" />
                Información Personal
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Nombre
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                      className="w-full px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD447] focus:border-[#FFD447] transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg text-white">
                      {profile.nombre}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Apellido
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.apellido}
                      onChange={(e) => handleInputChange('apellido', e.target.value)}
                      className="w-full px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD447] focus:border-[#FFD447] transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg text-white">
                      {profile.apellido}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Nickname
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.nickname}
                      onChange={(e) => handleInputChange('nickname', e.target.value)}
                      className="w-full px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD447] focus:border-[#FFD447] transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg text-white">
                      {profile.nickname}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Fecha de registro
                  </label>
                  <div className="px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg text-white">
                    {new Date(profile.joinDate).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="bg-[#1e2028]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Mail size={20} className="text-[#FFD447]" />
                Información de Contacto
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD447] focus:border-[#FFD447] transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg text-white">
                      {profile.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Número Móvil
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.numeroMovil}
                      onChange={(e) => handleInputChange('numeroMovil', e.target.value)}
                      className="w-full px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD447] focus:border-[#FFD447] transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg text-white">
                      {profile.numeroMovil}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Información de Trading */}
            <div className="bg-[#1e2028]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Building size={20} className="text-[#FFD447]" />
                Información de Trading
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Exchange
                  </label>
                  {isEditing ? (
                    <select
                      value={editData.exchange}
                      onChange={(e) => handleInputChange('exchange', e.target.value)}
                      className="w-full px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD447] focus:border-[#FFD447] transition-all"
                    >
                      <option value="">Selecciona un exchange</option>
                      <option value="Budget">Budget</option>
                      <option value="ZoomEx">ZoomEx</option>
                    </select>
                  ) : (
                    <div className="px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg text-white">
                      {profile.exchange || 'No especificado'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    UID
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.uid}
                      onChange={(e) => handleInputChange('uid', e.target.value)}
                      className="w-full px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD447] focus:border-[#FFD447] transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-[#2a2d36] border border-white/20 rounded-lg text-white">
                      {profile.uid || 'No especificado'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar con código de referido */}
          <div className="space-y-6">
            <ReferralCode 
              code={profile.referralCode}
              referrals={profile.referrals}
              earnings={profile.earnings}
            />

            {/* Estadísticas rápidas */}
            <div className="bg-[#1e2028]/80 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Rol actual</span>
                  <span className="text-white font-medium">{roleInfo.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Referidos</span>
                  <span className="text-[#FFD447] font-bold">{profile.referrals}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Ganancias</span>
                  <span className="text-[#FFD447] font-bold">${profile.earnings}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Miembro desde</span>
                  <span className="text-white/80 text-sm">
                    {new Date(profile.joinDate).toLocaleDateString('es-ES', {
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
