import { useState, useCallback } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';
import { StrategyStatusResponse, StrategyActionResponse, StrategyErrorResponse } from '../utils/types';

export function useDirectionalOptionSelling() {
  const [status, setStatus] = useState<'running' | 'stopped' | 'unknown'>('unknown');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DIRECTIONAL_OPTION_SELLING.STATUS}`);
      const data: StrategyStatusResponse | StrategyErrorResponse = await res.json();
      if (!res.ok || 'detail' in data) throw new Error((data as StrategyErrorResponse).detail || 'Failed to get status');
      setStatus((data as StrategyStatusResponse).status);
    } catch (err: any) {
      setError(err.message || 'Failed to get status');
      setStatus('unknown');
    } finally {
      setLoading(false);
    }
  }, []);

  const start = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DIRECTIONAL_OPTION_SELLING.START}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      });
      const data: StrategyActionResponse | StrategyErrorResponse = await res.json();
      if (!res.ok || 'detail' in data) throw new Error((data as StrategyErrorResponse).detail || 'Failed to start strategy');
      await fetchStatus();
      return (data as StrategyActionResponse).message;
    } catch (err: any) {
      setError(err.message || 'Failed to start strategy');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchStatus]);

  const stop = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DIRECTIONAL_OPTION_SELLING.STOP}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      });
      const data: StrategyActionResponse | StrategyErrorResponse = await res.json();
      if (!res.ok || 'detail' in data) throw new Error((data as StrategyErrorResponse).detail || 'Failed to stop strategy');
      await fetchStatus();
      return (data as StrategyActionResponse).message;
    } catch (err: any) {
      setError(err.message || 'Failed to stop strategy');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchStatus]);

  return { status, loading, error, fetchStatus, start, stop };
} 