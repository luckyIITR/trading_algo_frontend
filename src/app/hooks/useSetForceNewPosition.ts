import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';
import { SetForceNewPositionRequest, SetForceNewPositionResponse } from '../utils/types';

async function setForceNewPosition(flag: boolean) {
  const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DIRECTIONAL_OPTION_SELLING.SET_FORCE_NEW_POSITION}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ force_new_position: flag }),
  });
  const data: SetForceNewPositionResponse = await res.json();
  if (!res.ok) throw new Error(data?.message || 'Failed to set force_new_position');
  return data;
}

export function useSetForceNewPosition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setForceNewPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directional-option-selling-force-new-position'] });
    },
  });
} 