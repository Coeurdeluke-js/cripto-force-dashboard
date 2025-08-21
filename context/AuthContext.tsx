'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

// Hook para detectar hidratación
function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient;
}

interface UserData {
  id?: string;
  nombre: string;
  apellido: string;
  nickname: string;
  email: string;
  movil?: string;
  exchange?: string;
  uid?: string;
  codigo_referido?: string;
  joinDate?: string;
  // Campos del sistema de referidos
  referral_code?: string;
  referred_by?: string;
  user_level?: number;
  total_referrals?: number;
  total_earnings?: number;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signOut: () => Promise<void>;
  setUserData: (data: UserData) => void;
  updateUserData: (updates: Partial<UserData>) => void;
  clearUserData: () => void;
  isReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [supabase, setSupabase] = useState<any>(null);

  // Funciones para manejar userData
  const setUserData = (data: UserData) => {
    setUserDataState(data);
    // Guardar en localStorage para persistencia
    if (typeof window !== 'undefined') {
      localStorage.setItem('cryptoforce_userdata', JSON.stringify(data));
    }
  };

  const clearUserData = () => {
    setUserDataState(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cryptoforce_userdata');
    }
  };

  const updateUserData = (updates: Partial<UserData>) => {
    if (userData) {
      const updatedData = { ...userData, ...updates };
      setUserData(updatedData);
    }
  };

  // Cargar datos del usuario desde localStorage al inicializar
  useEffect(() => {
    if (isClient) {
      const savedUserData = localStorage.getItem('cryptoforce_userdata');
      if (savedUserData) {
        try {
          setUserDataState(JSON.parse(savedUserData));
        } catch (error) {
          console.error('Error parsing saved user data:', error);
        }
      }
      // Marcar como listo después de cargar los datos
      setIsReady(true);
    }
  }, [isClient]);

  useEffect(() => {
    // Only initialize Supabase on the client side
    if (typeof window !== 'undefined') {
              // Dynamic import to prevent server-side execution
        import('@/utils/supabase/client').then(({ createClient }) => {
          const supabase = createClient();
        setSupabase(supabase);

        // Get initial session
        const getSession = async () => {
          try {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            
            // Si hay usuario autenticado, obtener sus datos
            if (session?.user) {
              await fetchUserData(supabase, session.user);
            }
          } catch (error) {
            console.error('Error getting session:', error);
          } finally {
            setLoading(false);
          }
        };

        getSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setUser(session?.user ?? null);
            
            if (event === 'SIGNED_IN' && session?.user) {
              await fetchUserData(supabase, session.user);
            } else if (event === 'SIGNED_OUT') {
              clearUserData();
            }
            
            setLoading(false);
          }
        );

        return () => subscription.unsubscribe();
      }).catch((error) => {
        console.error('Error loading Supabase client:', error);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  // Función para obtener datos del usuario desde la base de datos
  const fetchUserData = async (supabase: any, user: User) => {
    try {
      console.log('🔍 fetchUserData PRODUCCIÓN - Iniciando para usuario:', user.email);
      console.log('🔍 fetchUserData PRODUCCIÓN - Cliente Supabase:', supabase);
      console.log('🔍 fetchUserData PRODUCCIÓN - URL de Supabase:', supabase?.supabaseUrl);
      
      // Agregar timeout más largo para evitar que se cuelgue
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout en consulta SQL')), 15000);
      });
      
      const queryPromise = supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();
      
      console.log('🔍 fetchUserData PRODUCCIÓN - Ejecutando consulta SQL...');
      
      const { data: profile, error } = await Promise.race([queryPromise, timeoutPromise]);
      
      console.log('🔍 fetchUserData PRODUCCIÓN - Resultado de la consulta:', { profile, error });
      
      if (error) {
        console.error('❌ Error fetching user data:', error);
        console.error('❌ Código de error:', error.code);
        console.error('❌ Mensaje de error:', error.message);
        return;
      }
      
      if (profile) {
        console.log('✅ Perfil encontrado en PRODUCCIÓN:', profile);
        console.log('🔍 Campo user_level en profile:', profile.user_level);
        console.log('🔍 Tipo de user_level:', typeof profile.user_level);
        
        const userData: UserData = {
          id: profile.id,
          nombre: profile.nombre || '',
          apellido: profile.apellido || '',
          nickname: profile.nickname || '',
          email: profile.email,
          movil: profile.movil,
          exchange: profile.exchange,
          uid: profile.uid,
          codigo_referido: profile.codigo_referido,
          joinDate: profile.created_at,
          referral_code: profile.referral_code,
          referred_by: profile.referred_by,
          user_level: profile.user_level,
          total_referrals: profile.total_referrals,
          total_earnings: profile.total_earnings
        };
        
        console.log('📊 UserData preparado en PRODUCCIÓN:', userData);
        setUserData(userData);
      } else {
        console.log('❌ No se encontró perfil para el usuario en PRODUCCIÓN');
      }
    } catch (error) {
      console.error('❌ Error en fetchUserData PRODUCCIÓN:', error);
    }
  };

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    clearUserData();
    
    // Redirigir a thecryptoforce.com después del logout
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.location.href = 'https://thecryptoforce.com';
      }, 500);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, signOut, setUserData, updateUserData, clearUserData, isReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook seguro que maneja la hidratación
export function useSafeAuth() {
  const isClient = useIsClient();
  const context = useContext(AuthContext);
  
  if (!isClient) {
    return {
      user: null,
      userData: null,
      loading: true,
      signOut: async () => {},
      setUserData: () => {},
      updateUserData: () => {},
      clearUserData: () => {},
      isReady: false
    };
  }
  
  if (context === undefined) {
    throw new Error('useSafeAuth must be used within an AuthProvider');
  }
  
  return {
    ...context,
    isReady: true
  };
}