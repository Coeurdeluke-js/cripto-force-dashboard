"use client";
import React from 'react';
import ReferralCodeDisplay from '@/components/ReferralCodeDisplay';
import { useSafeAuth } from '@/context/AuthContext';

export default function ReferralCodePage() {
  const { userData } = useSafeAuth();
  
  // Usar el nivel real del usuario desde la base de datos
  const userLevel = userData?.user_level || 1;
  
  return <ReferralCodeDisplay userLevel={userLevel} />;
}
