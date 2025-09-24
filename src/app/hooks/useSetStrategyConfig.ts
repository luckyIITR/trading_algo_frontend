import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';
import { StrategyConfig, SetConfigResponse, StrategyErrorResponse } from '../utils/types';

async function setConfig(config: StrategyConfig) {
  const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DIRECTIONAL_OPTION_SELLING.SET_CONFIG}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(config),
  });
  
  if (!res.ok) {
    const errorData: StrategyErrorResponse = await res.json();
    throw new Error(errorData?.detail || 'Failed to set config');
  }
  
  const data: SetConfigResponse = await res.json();
  return data;
}

export function useSetStrategyConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directional-option-selling-config'] });
    },
  });
} 