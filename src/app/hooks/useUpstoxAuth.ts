import { useState } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';
import { ZerodhaLoginResponse, ApiError } from '../utils/types';

interface UseUpstoxAuthReturn {
  getLoginUrl: () => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

export function useUpstoxAuth(): UseUpstoxAuthReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLoginUrl = async (): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.UPSTOX_LOGIN}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new ApiError(errorData.error || 'Failed to get login URL', response.status);
      }

      const data: ZerodhaLoginResponse = await response.json();
      return data.login_url;
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to connect to authentication service';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getLoginUrl,
    isLoading,
    error,
  };
} 