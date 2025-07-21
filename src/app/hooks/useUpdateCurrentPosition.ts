import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';
import { UpdateCurrentPositionRequest, UpdateCurrentPositionResponse } from '../utils/types';

async function updateCurrentPosition(new_position: 'BULL' | 'BEAR' | 'NONE') {
  const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DIRECTIONAL_OPTION_SELLING.UPDATE_CURRENT_POSITION}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ new_position }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.detail || data?.message || 'Failed to update current position');
  return data as UpdateCurrentPositionResponse;
}

export function useUpdateCurrentPosition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCurrentPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directional-option-selling-current-position'] });
    },
  });
} 