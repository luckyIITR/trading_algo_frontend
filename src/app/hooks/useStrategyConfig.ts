import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';
import { GetConfigResponse, StrategyConfig } from '../utils/types';

async function fetchConfig() {
  const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DIRECTIONAL_OPTION_SELLING.GET_CONFIG}`);
  if (!res.ok) throw new Error('Failed to fetch config');
  const data: GetConfigResponse = await res.json();
  return data.config;
}

export function useStrategyConfig() {
  return useQuery<StrategyConfig, Error>({
    queryKey: ['directional-option-selling-config'],
    queryFn: fetchConfig,
    refetchOnWindowFocus: true,
  });
} 