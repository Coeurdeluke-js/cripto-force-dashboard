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
    // Temporalmente deshabilitado Supabase para evitar errores
    setLoading(false);
    setUser(null);
    
    // Comentado temporalmente
    /*
    // Only initialize Supabase on the client side
    if (typeof window !== 'undefined') {
      // Dynamic import to prevent server-side execution
      import('@/utils/supabase/client').then(({ createClient }) => {
        const client = createClient();
        setSupabase(client);

        // Get initial session
        const getSession = async () => {
          try {
            const { data: { session } } = await client.auth.getSession();
            setUser(session?.user ?? null);
          } catch (error) {
            console.error('Error getting session:', error);
          } finally {
            setLoading(false);
          }
        };

        getSession();

        // Listen for auth changes
        const { data: { subscription } } = client.auth.onAuthStateChange(
          async (event, session) => {
            setUser(session?.user ?? null);
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
    */
  }, []);

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    clearUserData();
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