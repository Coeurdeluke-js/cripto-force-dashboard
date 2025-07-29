'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProgressContextType {
  completedCheckpoints: Set<string>;
  markCheckpointCompleted: (checkpointId: string) => void;
  isCheckpointCompleted: (checkpointId: string) => boolean;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedCheckpoints, setCompletedCheckpoints] = useState<Set<string>>(new Set());

  // Cargar progreso desde localStorage al inicializar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('completed_checkpoints');
      if (saved) {
        setCompletedCheckpoints(new Set(JSON.parse(saved)));
      }
    }
  }, []);

  // Guardar progreso en localStorage cuando cambie
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('completed_checkpoints', JSON.stringify([...completedCheckpoints]));
    }
  }, [completedCheckpoints]);

  const markCheckpointCompleted = (checkpointId: string) => {
    setCompletedCheckpoints(prev => new Set([...prev, checkpointId]));
  };

  const isCheckpointCompleted = (checkpointId: string): boolean => {
    return completedCheckpoints.has(checkpointId);
  };

  const resetProgress = () => {
    setCompletedCheckpoints(new Set());
    if (typeof window !== 'undefined') {
      localStorage.removeItem('completed_checkpoints');
    }
  };

  return (
    <ProgressContext.Provider value={{
      completedCheckpoints,
      markCheckpointCompleted,
      isCheckpointCompleted,
      resetProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
} 