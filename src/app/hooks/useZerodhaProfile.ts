import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';
import { ZerodhaProfile } from '../utils/types';

async function fetchProfile() {
  const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ZERODHA_PROFILE}`);
  if (!res.ok) throw new Error('Not authenticated');
  const data: ZerodhaProfile = await res.json();
  return data;
}

export function useZerodhaProfile() {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['zerodha-profile'],
    queryFn: fetchProfile,
    retry: false,
  });

  return { profile: profile ?? null, isLoading, error: error ? (error as Error).message : null, isAuthenticated: !!profile };
} 