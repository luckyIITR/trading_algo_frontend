import { useEffect, useState } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';
import { ZerodhaProfile } from '../utils/types';

export function useZerodhaProfile() {
  const [profile, setProfile] = useState<ZerodhaProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ZERODHA_PROFILE}`);
        if (!res.ok) throw new Error('Not authenticated');
        const data: ZerodhaProfile = await res.json();
        setProfile(data);
      } catch (err: any) {
        setProfile(null);
        setError(err.message || 'Failed to fetch profile');
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  return { profile, isLoading, error, isAuthenticated: !!profile };
} 