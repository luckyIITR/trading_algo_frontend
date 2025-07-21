import { useMutation } from '@tanstack/react-query';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';

async function initializeBroker() {
  const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.INITIALIZE_BROKER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Failed to initialize broker sessions');
  return data;
}

export function useInitializeBroker() {
  const mutation = useMutation({
    mutationFn: initializeBroker,
  });

  return {
    isLoading: mutation.isPending,
    error: mutation.error ? (mutation.error as Error).message : null,
    message: mutation.data?.message ?? null,
    initialize: mutation.mutateAsync,
    isSuccess: mutation.isSuccess,
  };
} 