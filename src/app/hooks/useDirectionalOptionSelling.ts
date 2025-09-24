import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';
import { StrategyStatusResponse, StrategyActionResponse, StrategyErrorResponse } from '../utils/types';

async function fetchStatus() {
  const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DIRECTIONAL_OPTION_SELLING.STATUS}`);
  const data: StrategyStatusResponse | StrategyErrorResponse = await res.json();
  if (!res.ok || 'detail' in data) throw new Error((data as StrategyErrorResponse).detail || 'Failed to get status');
  return data as StrategyStatusResponse;
}

async function startStrategy() {
  const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DIRECTIONAL_OPTION_SELLING.START}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  });
  const data: StrategyActionResponse | StrategyErrorResponse = await res.json();
  if (!res.ok || 'detail' in data) throw new Error((data as StrategyErrorResponse).detail || 'Failed to start strategy');
  return data as StrategyActionResponse;
}

async function stopStrategy() {
  const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DIRECTIONAL_OPTION_SELLING.STOP}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  });
  const data: StrategyActionResponse | StrategyErrorResponse = await res.json();
  if (!res.ok || 'detail' in data) throw new Error((data as StrategyErrorResponse).detail || 'Failed to stop strategy');
  return data as StrategyActionResponse;
}

export function useDirectionalOptionSelling() {
  const queryClient = useQueryClient();

  const {
    data: statusData,
    isLoading: statusLoading,
    error: statusError,
    refetch: refetchStatus,
  } = useQuery({
    queryKey: ['directional-option-selling-status'],
    queryFn: fetchStatus,
    refetchOnWindowFocus: true,
  });

  const startMutation = useMutation({
    mutationFn: startStrategy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directional-option-selling-status'] });
    },
  });

  const stopMutation = useMutation({
    mutationFn: stopStrategy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directional-option-selling-status'] });
    },
  });

  return {
    status: statusData?.status ?? 'unknown',
    loading: statusLoading || startMutation.isPending || stopMutation.isPending,
    error: statusError?.message || startMutation.error?.message || stopMutation.error?.message || null,
    refetchStatus,
    start: startMutation.mutateAsync,
    stop: stopMutation.mutateAsync,
  };
} 