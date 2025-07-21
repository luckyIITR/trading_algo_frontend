import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';
import { GetCurrentPositionResponse, PositionType } from '../utils/types';

async function fetchCurrentPosition() {
  const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DIRECTIONAL_OPTION_SELLING.GET_CURRENT_POSITION}`);
  if (!res.ok) throw new Error('Failed to fetch current position');
  const data: GetCurrentPositionResponse = await res.json();
  return data.current_position;
}

export function useCurrentPosition() {
  return useQuery<PositionType, Error>({
    queryKey: ['directional-option-selling-current-position'],
    queryFn: fetchCurrentPosition,
    refetchOnWindowFocus: true,
  });
} 