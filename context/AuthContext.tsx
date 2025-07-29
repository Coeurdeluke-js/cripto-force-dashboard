'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false); // Cambiado a false para evitar loading
  const [supabase, setSupabase] = useState<any>(null);

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
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
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