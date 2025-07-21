import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';

async function exitTrade(tradeId: string) {
  const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DIRECTIONAL_OPTION_SELLING.EXIT_TRADE(tradeId)}`, {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.detail || `Failed to exit trade ${tradeId}`);
  return data;
}

export function useExitTrade() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: exitTrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directional-option-selling-current-trades'] });
    },
  });
} 