'use client';

import { useEffect, useState } from 'react';
import { AuthProvider } from '@/context/AuthContext';

interface ClientAuthProviderProps {
  children: React.ReactNode;
}

export default function ClientAuthProvider({ children }: ClientAuthProviderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return children without AuthProvider during SSR
    return <>{children}</>;
  }

  return <AuthProvider>{children}</AuthProvider>;
} 