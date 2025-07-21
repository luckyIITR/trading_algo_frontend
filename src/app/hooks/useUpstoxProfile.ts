import { useEffect, useState } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';
import { UpstoxProfile } from '../utils/types';

export function useUpstoxProfile() {
  const [profile, setProfile] = useState<UpstoxProfile['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.UPSTOX_PROFILE}`);
        if (!res.ok) throw new Error('Not authenticated');
        const data: UpstoxProfile = await res.json();
        if (data.status === 'success' && data.data && data.data.is_active) {
          setProfile(data.data);
        } else {
          setProfile(null);
          setError('Not authenticated');
        }
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