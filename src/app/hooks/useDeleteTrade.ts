import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';

async function deleteTrade(tradeId: string) {
  const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DIRECTIONAL_OPTION_SELLING.DELETE_TRADE(tradeId)}`, {
    method: 'DELETE',
    headers: { 'Accept': 'application/json' },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.detail || `Failed to delete trade ${tradeId}`);
  return data;
}

export function useDeleteTrade() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directional-option-selling-current-trades'] });
    },
  });
} 