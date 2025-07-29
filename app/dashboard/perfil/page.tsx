'use client';
import React, { useState, useRef } from 'react';
import { Edit3, Save, Camera, Star, CheckCircle, Phone, Mail, User as UserIcon, Calendar, Globe, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const countries = [
  '', 'Argentina', 'México', 'España', 'Colombia', 'Chile', 'Perú', 'Uruguay', 'Venezuela', 'Ecuador', 'Otro'
];

export default function PerfilPage() {
  // Estado para datos personales
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [userData, setUserData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('simple_profile');
      if (saved) return JSON.parse(saved);
    }
    return {
      name: 'Tu Nombre',
      email: 'tucorreo@email.com',
      phone: '',
      avatar: '/images/default-avatar.png',
      joined: '2024-01-01',
      modulesCompleted: 0,
      achievements: 0,
      birthdate: '',
      country: '',
      bio: ''
    };
  });
  const [avatarPreview, setAvatarPreview] = useState(userData.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Guardar cambios en localStorage
  const saveProfile = (newData: typeof userData) => {
    setUserData(newData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('simple_profile', JSON.stringify(newData));
    }
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Manejar cambio de imagen
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        if (ev.target && typeof ev.target.result === 'string') {
          setAvatarPreview(ev.target.result);
          saveProfile({ ...userData, avatar: ev.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejar edición de datos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Modal de contacto
  const handleSendModal = () => {
    setShowModal(false);
    setModalMessage('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] text-white">
      {/* Contenido principal */}
      <main className="flex-1 flex flex-col items-center justify-start pt-24 pb-8 px-4 transition-all duration-300">
        {/* Modal de contacto */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-[#181818] rounded-2xl p-6 w-full max-w-md border border-[#ec4d58] shadow-2xl relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-[#ec4d58] text-xl" onClick={() => setShowModal(false)}>&times;</button>
              <h2 className="text-xl font-bold mb-2 text-[#ec4d58] flex items-center gap-2"><MessageCircle className="w-5 h-5" />¿Tienes dudas sobre tu información?</h2>
              <textarea
                className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2 text-white mb-3 focus:outline-none focus:ring-2 focus:ring-[#ec4d58] resize-none"
                rows={4}
                placeholder="Escribe tu mensaje o consulta aquí..."
                value={modalMessage}
                onChange={e => setModalMessage(e.target.value)}
              />
              <button
                className="w-full bg-[#ec4d58] hover:bg-[#ff6b6b] text-white font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                onClick={handleSendModal}
              >
                <Mail className="w-4 h-4" />Enviar mensaje
              </button>
            </div>
          </div>
        )}
        <div className="w-full max-w-md bg-[#181818] rounded-2xl shadow-lg p-8 border border-[#232323] flex flex-col items-center relative">
          {/* Mensaje de éxito */}
          {showSuccess && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-green-600/90 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out z-20">
              <CheckCircle className="w-5 h-5 text-white" />
              <span>¡Perfil actualizado!</span>
            </div>
          )}
          {/* Mensaje de opcionalidad */}
          <div className="w-full text-center mb-4">
            <span className="text-xs text-gray-400 bg-[#232323] rounded-full px-3 py-1">La integración de información personal es <span className="text-[#ec4d58] font-semibold">opcional</span> y solo sirve para mejorar tu experiencia.</span>
          </div>
          {/* Avatar y botón de cambio */}
          <div className="relative mb-4">
            <Image
              src={avatarPreview}
              alt="Tu foto de perfil"
              width={128}
              height={128}
              className="w-32 h-32 rounded-full object-cover border-4 border-[#ec4d58] shadow-lg"
            />
            <button
              className="absolute bottom-2 right-2 bg-[#ec4d58] p-2 rounded-full hover:bg-[#ff6b6b] transition-colors"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              aria-label="Cambiar foto de perfil"
            >
              <Camera className="w-5 h-5 text-white" />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
          </div>
          {/* Datos personales */}
          <div className="w-full text-center mb-6">
            {isEditing ? (
              <>
                <div className="relative mb-2 flex items-center">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    className="w-full bg-[#232323] border border-[#333] rounded-lg px-8 py-2 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-[#ec4d58] text-center"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="relative mb-2 flex items-center">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full bg-[#232323] border border-[#333] rounded-lg px-8 py-2 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-[#ec4d58] text-center"
                    placeholder="Tu correo"
                    type="email"
                  />
                </div>
                <div className="relative mb-2 flex items-center">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#232323] border border-[#333] rounded-lg px-8 py-2 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-[#ec4d58] text-center"
                    placeholder="Teléfono (opcional)"
                    type="tel"
                  />
                </div>
                <div className="relative mb-2 flex items-center">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    name="birthdate"
                    value={userData.birthdate}
                    onChange={handleChange}
                    className="w-full bg-[#232323] border border-[#333] rounded-lg px-8 py-2 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-[#ec4d58] text-center"
                    placeholder="Fecha de nacimiento"
                    type="date"
                  />
                </div>
                <div className="relative mb-2 flex items-center">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    name="country"
                    value={userData.country}
                    onChange={handleChange}
                    className="w-full bg-[#232323] border border-[#333] rounded-lg px-8 py-2 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-[#ec4d58] appearance-none text-center"
                    style={{ backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat' }}
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>{c ? c : 'Selecciona tu país'}</option>
                    ))}
                  </select>
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    ▼
                  </span>
                </div>
                <textarea
                  name="bio"
                  value={userData.bio}
                  onChange={handleChange}
                  className="w-full bg-[#232323] border border-[#333] rounded-lg px-4 py-2 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-[#ec4d58] text-center resize-none"
                  placeholder="Cuéntanos algo sobre ti, tus intereses o lo que esperas aprender..."
                  rows={2}
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-1">{userData.name}</h2>
                <p className="text-gray-400 text-sm mb-1">{userData.email}</p>
                {userData.phone && (
                  <p className="text-gray-400 text-xs mb-1">Teléfono: {userData.phone}</p>
                )}
                {userData.birthdate && (
                  <p className="text-gray-400 text-xs mb-1">Nacimiento: {userData.birthdate}</p>
                )}
                {userData.country && (
                  <p className="text-gray-400 text-xs mb-1">País: {userData.country}</p>
                )}
                {userData.bio && (
                  <p className="text-gray-300 text-xs mb-1 italic">{userData.bio}</p>
                )}
              </>
            )}
            <p className="text-gray-500 text-xs">Miembro desde {new Date(userData.joined).toLocaleDateString()}</p>
          </div>
          {/* Botón editar/guardar */}
          <button
            className="bg-[#ec4d58] hover:bg-[#ff6b6b] text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center mb-6 w-full"
            onClick={() => {
              if (isEditing) saveProfile(userData);
              else setIsEditing(true);
            }}
          >
            {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
            {isEditing ? 'Guardar' : 'Editar perfil'}
          </button>
          {/* Estadísticas simples */}
          <div className="w-full flex justify-around items-center mb-4">
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-[#ec4d58]">{userData.modulesCompleted}</span>
              <span className="text-xs text-gray-400">Módulos<br />completados</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-5 h-5 text-yellow-400 mb-1" />
              <span className="text-xs text-gray-400">Logros<br />desbloqueados</span>
              <span className="text-lg font-bold text-yellow-400">{userData.achievements}</span>
            </div>
          </div>
          {/* Ayuda para principiantes */}
          <div className="w-full bg-[#232323] rounded-lg p-4 text-sm text-gray-300 mt-2 mb-2">
            <p>¡Bienvenido/a! Aquí puedes personalizar tu perfil como en cualquier red social. Cambia tu foto, tu nombre y tu correo. A medida que completes módulos, verás tu progreso aquí.</p>
        </div>
          {/* Privacidad y gestión de datos */}
          <div className="w-full bg-[#181818] border border-[#333] rounded-lg p-4 text-xs text-gray-400 mt-2 text-center">
            <strong className="block text-[#ec4d58] mb-1">¿Cómo usamos tu información?</strong>
            <p className="mb-2">Tus datos personales son <span className="text-[#ec4d58] font-semibold">opcionales</span> y solo se usan para personalizar tu experiencia y ofrecerte un mejor servicio en Crypto Force.<br />
              <span className="text-[#ec4d58]">Nunca compartiremos tu información con terceros</span> ni la usaremos para fines comerciales externos.</p>
            <button
              className="inline-block bg-[#ec4d58] hover:bg-[#ff6b6b] text-white font-semibold px-4 py-1 rounded-lg transition-all duration-300 mt-1 mb-1"
              onClick={() => setShowModal(true)}
            >
              Haz click <span className="underline font-bold">AQUÍ</span> si tienes dudas o inquietudes
            </button>
        </div>
        </div>
      </main>
    </div>
  );
} 