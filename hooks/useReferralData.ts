import { useState, useEffect } from 'react';
import { useSafeAuth } from '@/context/AuthContext';

interface ReferralStats {
  referralCode: string;
  totalReferrals: number;
  totalEarnings: number;
  userLevel: number;
  recentReferrals: Array<{
    email: string;
    date: string;
    commission: number;
  }>;
}

interface UseReferralDataReturn {
  stats: ReferralStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useReferralData(): UseReferralDataReturn {
  const { userData, isReady } = useSafeAuth();
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReferralStats = async () => {
    if (!userData?.email || !isReady) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/referrals/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userData.email })
      });

      const result = await response.json();

      if (result.success) {
        setStats(result.stats);
      } else {
        setError(result.error || 'Error cargando estadísticas');
      }
    } catch (error) {
      console.error('Error fetching referral stats:', error);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.email && isReady) {
      fetchReferralStats();
    }
  }, [userData?.email, isReady]);

  return {
    stats,
    loading,
    error,
    refetch: fetchReferralStats
  };
}

// Hook para validar código de referido
export function useReferralValidation() {
  const [validationState, setValidationState] = useState<{
    isValidating: boolean;
    isValid: boolean | null;
    referrerNickname: string | null;
    error: string | null;
  }>({
    isValidating: false,
    isValid: null,
    referrerNickname: null,
    error: null
  });

  const validateCode = async (code: string) => {
    if (!code.trim()) {
      setValidationState({
        isValidating: false,
        isValid: null,
        referrerNickname: null,
        error: null
      });
      return;
    }

    try {
      setValidationState(prev => ({ ...prev, isValidating: true, error: null }));

      const response = await fetch('/api/referrals/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() })
      });

      const result = await response.json();

      if (result.success && result.valid) {
        setValidationState({
          isValidating: false,
          isValid: true,
          referrerNickname: result.referrer.nickname,
          error: null
        });
      } else {
        setValidationState({
          isValidating: false,
          isValid: false,
          referrerNickname: null,
          error: 'Código de referido no válido'
        });
      }
    } catch (error) {
      console.error('Error validating referral code:', error);
      setValidationState({
        isValidating: false,
        isValid: false,
        referrerNickname: null,
        error: 'Error de conexión'
      });
    }
  };

  return {
    ...validationState,
    validateCode
  };
}
