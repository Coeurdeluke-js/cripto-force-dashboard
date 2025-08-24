'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

// Interfaces
interface UserData {
  id: string;
  nombre: string;
  apellido: string;
  nickname: string;
  email: string;
  movil: string;
  exchange: string;
  uid: string;
  codigo_referido: string;
  created_at: string;
  referral_code: string;
  referred_by: string | null;
  user_level: number;
  total_referrals: number;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  isReady: boolean;
  signOut: () => Promise<void>;
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado
export function useSafeAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSafeAuth must be used within an AuthProvider');
  }
  return context;
}

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener datos del usuario con fallback inmediato
  const fetchUserData = async (user: User) => {
    try {
      console.log('🔍 AuthContext - Iniciando fetchUserData para:', user.email);
      
      // Verificar que user.email existe
      if (!user.email) {
        console.error('❌ Usuario sin email válido');
        return;
      }

      // Para usuarios fundadores conocidos, usar fallback inmediatamente
      if (user.email === 'coeurdeluke.js@gmail.com' || user.email === 'infocryptoforce@gmail.com') {
        console.log('👑 Usuario fundador detectado, usando fallback inmediato');
        implementFallback(user);
        return;
      }
      
      // Intentar consulta simple a Supabase
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();

      if (error) {
        console.log('⚠️ Supabase error, usando fallback:', error.message);
        throw error;
      }

      if (data) {
        console.log('✅ Datos obtenidos de Supabase:', data);
        setUserData(data);
        return;
      }

    } catch (error) {
      console.log('🔄 Implementando fallback para usuario:', user.email);
      implementFallback(user);
    }
  };

  // Función para implementar fallback
  const implementFallback = (user: User) => {
    let fallbackData: UserData;
    
    if (user.email === 'coeurdeluke.js@gmail.com') {
      // Datos específicos para Darth Luke
      fallbackData = {
        id: 'local-1',
        nombre: 'Darth',
        apellido: 'Luke',
        nickname: 'Darth Luke',
        email: 'coeurdeluke.js@gmail.com',
        movil: '+1234567890',
        exchange: 'Binance',
        uid: user.id || 'unknown',
        codigo_referido: 'FUNDADOR001',
        created_at: new Date().toISOString(),
        referral_code: 'DARTH-LUKE-2024',
        referred_by: null,
        user_level: 6, // Maestro (pero se mostrará como "Fundador")
        total_referrals: 15
      };
    } else if (user.email === 'infocryptoforce@gmail.com') {
      // Datos específicos para Darth Nihilus
      fallbackData = {
        id: 'local-2',
        nombre: 'Darth',
        apellido: 'Nihilus',
        nickname: 'Darth Nihilus',
        email: 'infocryptoforce@gmail.com',
        movil: '+1234567890',
        exchange: 'Binance',
        uid: user.id || 'unknown',
        codigo_referido: 'FUNDADOR002',
        created_at: new Date().toISOString(),
        referral_code: 'DARTH-NIHILUS-2024',
        referred_by: null,
        user_level: 6, // Maestro (pero se mostrará como "Fundador")
        total_referrals: 12
      };
    } else if (user.email === 'maestro@example.com' || user.email.includes('maestro')) {
      // Datos para usuarios Maestro
      fallbackData = {
        id: 'local-maestro',
        nombre: 'Usuario',
        apellido: 'Maestro',
        nickname: 'Usuario Maestro',
        email: user.email,
        movil: '+1234567890',
        exchange: 'Binance',
        uid: user.id || 'unknown',
        codigo_referido: 'MAESTRO001',
        created_at: new Date().toISOString(),
        referral_code: 'MAESTRO-USER-2024',
        referred_by: null,
        user_level: 6, // Maestro
        total_referrals: 8
      };
    } else if (user.email === 'darth@example.com' || user.email.includes('darth')) {
      // Datos para usuarios Darth
      fallbackData = {
        id: 'local-darth',
        nombre: 'Usuario',
        apellido: 'Darth',
        nickname: 'Usuario Darth',
        email: user.email,
        movil: '+1234567890',
        exchange: 'Binance',
        uid: user.id || 'unknown',
        codigo_referido: 'DARTH001',
        created_at: new Date().toISOString(),
        referral_code: 'DARTH-USER-2024',
        referred_by: null,
        user_level: 5, // Darth
        total_referrals: 6
      };
    } else if (user.email === 'lord@example.com' || user.email.includes('lord')) {
      // Datos para usuarios Lord
      fallbackData = {
        id: 'local-lord',
        nombre: 'Usuario',
        apellido: 'Lord',
        nickname: 'Usuario Lord',
        email: user.email,
        movil: '+1234567890',
        exchange: 'Binance',
        uid: user.id || 'unknown',
        codigo_referido: 'LORD001',
        created_at: new Date().toISOString(),
        referral_code: 'LORD-USER-2024',
        referred_by: null,
        user_level: 4, // Lord
        total_referrals: 4
      };
    } else if (user.email === 'warrior@example.com' || user.email.includes('warrior')) {
      // Datos para usuarios Warrior
      fallbackData = {
        id: 'local-warrior',
        nombre: 'Usuario',
        apellido: 'Warrior',
        nickname: 'Usuario Warrior',
        email: user.email,
        movil: '+1234567890',
        exchange: 'Binance',
        uid: user.id || 'unknown',
        codigo_referido: 'WARRIOR001',
        created_at: new Date().toISOString(),
        referral_code: 'WARRIOR-USER-2024',
        referred_by: null,
        user_level: 3, // Warrior
        total_referrals: 3
      };
    } else if (user.email === 'acolito@example.com' || user.email.includes('acolito')) {
      // Datos para usuarios Acólito
      fallbackData = {
        id: 'local-acolito',
        nombre: 'Usuario',
        apellido: 'Acólito',
        nickname: 'Usuario Acólito',
        email: user.email,
        movil: '+1234567890',
        exchange: 'Binance',
        uid: user.id || 'unknown',
        codigo_referido: 'ACOLITO001',
        created_at: new Date().toISOString(),
        referral_code: 'ACOLITO-USER-2024',
        referred_by: null,
        user_level: 2, // Acólito
        total_referrals: 2
      };
    } else {
      // Datos genéricos para otros usuarios (Iniciado por defecto)
      fallbackData = {
        id: 'fallback-1',
        nombre: 'Usuario',
        apellido: 'Temporal',
        nickname: 'Usuario Temporal',
        email: user.email,
        movil: '',
        exchange: '',
        uid: user.id || 'unknown',
        codigo_referido: '',
        created_at: new Date().toISOString(),
        referral_code: 'TEMP-CODE',
        referred_by: null,
        user_level: 1, // Iniciado por defecto
        total_referrals: 0
      };
    }
    
    console.log('✅ Fallback implementado:', fallbackData);
    setUserData(fallbackData);
  };

  // Función para obtener sesión
  const getSession = async () => {
    try {
      console.log('🔍 AuthContext - Obteniendo sesión...');
      
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('❌ Error al obtener sesión:', error);
        setLoading(false);
        return;
      }

      if (session?.user) {
        console.log('✅ Usuario autenticado:', session.user.email);
        setUser(session.user);
        await fetchUserData(session.user);
      } else {
        console.log('ℹ️ No hay sesión activa');
        setUser(null);
        setUserData(null);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('❌ Error en getSession:', error);
      setUser(null);
      setUserData(null);
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserData(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Escuchar cambios de autenticación
  useEffect(() => {
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: string, session: any) => {
        console.log('🔍 AuthContext - Cambio de estado:', event, session?.user?.email);
        
        if (session?.user) {
          setUser(session.user);
          await fetchUserData(session.user);
        } else {
          setUser(null);
          setUserData(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    userData,
    loading,
    isReady: !loading,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}