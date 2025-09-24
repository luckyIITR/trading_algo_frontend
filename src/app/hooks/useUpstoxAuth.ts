import { useMutation } from '@tanstack/react-query';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';
import { ZerodhaLoginResponse, ApiError, ApiErrorResponse } from '../utils/types';

export function useUpstoxAuth() {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.UPSTOX_LOGIN}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json();
        throw new ApiError(errorData.error || 'Failed to get login URL', response.status);
      }
      const data: ZerodhaLoginResponse = await response.json();
      return data.login_url;
    },
  });

  return {
    getLoginUrl: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error ? (mutation.error as Error).message : null,
  };
} 