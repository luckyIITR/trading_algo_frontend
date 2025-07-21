import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';
import { UpstoxProfile } from '../utils/types';

async function fetchProfile() {
  const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.UPSTOX_PROFILE}`);
  if (!res.ok) throw new Error('Not authenticated');
  const data: UpstoxProfile = await res.json();
  if (data.status === 'success' && data.data && data.data.is_active) {
    return data.data;
  } else {
    throw new Error('Not authenticated');
  }
}

export function useUpstoxProfile() {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['upstox-profile'],
    queryFn: fetchProfile,
    retry: false,
  });

  return { profile: profile ?? null, isLoading, error: error ? (error as Error).message : null, isAuthenticated: !!profile };
} 