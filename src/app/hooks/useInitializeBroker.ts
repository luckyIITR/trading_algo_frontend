import { useEffect, useState } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';

export function useInitializeBroker() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function initialize() {
      setIsLoading(true);
      setError(null);
      setMessage(null);
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.INITIALIZE_BROKER}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Failed to initialize broker sessions');
        setMessage(data?.message || null);
      } catch (err: any) {
        setError(err.message || 'Failed to initialize broker sessions');
      } finally {
        setIsLoading(false);
      }
    }
    initialize();
  }, []);

  return { isLoading, error, message };
} 