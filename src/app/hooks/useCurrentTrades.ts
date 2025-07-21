import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';
import { CurrentTradesResponse } from '../utils/types';

async function fetchCurrentTrades() {
  const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DIRECTIONAL_OPTION_SELLING.CURRENT_TRADES}`);
  if (!res.ok) throw new Error('Failed to fetch current trades');
  const data: CurrentTradesResponse = await res.json();
  return data.current_trades;
}

export function useCurrentTrades() {
  return useQuery({
    queryKey: ['directional-option-selling-current-trades'],
    queryFn: fetchCurrentTrades,
    refetchOnWindowFocus: true,
  });
} 