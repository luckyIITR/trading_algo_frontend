import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';

async function fetchLogs() {
  const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DIRECTIONAL_OPTION_SELLING.LOGS}`);
  let text = await res.text();
  try {
    const data = JSON.parse(text);
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.logs)) return data.logs;
    return [];
  } catch {
    // Not JSON, treat as plain text
    return text.split('\n').filter(Boolean);
  }
}

export function useStrategyLogs() {
  return useQuery<string[], Error>({
    queryKey: ['directional-option-selling-logs'],
    queryFn: fetchLogs,
    refetchOnWindowFocus: true,
  });
} 