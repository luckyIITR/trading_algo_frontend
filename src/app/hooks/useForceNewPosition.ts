import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';
import { ForceNewPositionResponse } from '../utils/types';

async function fetchForceNewPosition() {
  const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DIRECTIONAL_OPTION_SELLING.GET_FORCE_NEW_POSITION}`);
  if (!res.ok) throw new Error('Failed to fetch force_new_position');
  const data: ForceNewPositionResponse = await res.json();
  return data.force_new_position;
}

export function useForceNewPosition() {
  return useQuery({
    queryKey: ['directional-option-selling-force-new-position'],
    queryFn: fetchForceNewPosition,
    refetchOnWindowFocus: true,
  });
} 