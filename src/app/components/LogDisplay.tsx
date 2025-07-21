'use client';
import { useRef, useEffect, useState } from 'react';
import { useStrategyLogs } from '../hooks/useStrategyLogs';

function getLogLevelColor(line: string) {
  if (line.includes('[ERROR]')) return 'text-red-400';
  if (line.includes('[INFO]')) return 'text-blue-300';
  if (line.includes('[DEBUG]')) return 'text-yellow-300';
  if (line.includes('[WARN]')) return 'text-orange-300';
  return 'text-green-400';
}

export default function LogDisplay() {
  const { data: logs, isLoading, error, refetch, isFetching } = useStrategyLogs();
  const [search, setSearch] = useState('');
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const filteredLogs = logs?.filter(line => line.toLowerCase().includes(search.toLowerCase()));

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Logs</h2>
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded border px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 bg-black text-green-200 placeholder:text-green-400"
        />
        <button
          onClick={() => refetch()}
          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition flex items-center gap-2"
          disabled={isFetching}
        >
          {isFetching && (
            <svg className="animate-spin h-4 w-4 text-blue-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          )}
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      <div className="bg-black text-green-400 font-mono rounded p-4 h-60 overflow-y-auto shadow-inner text-xs">
        {isLoading && <div className="text-gray-400">Loading logs...</div>}
        {error && <div className="text-red-400">Failed to load logs: {error.message}</div>}
        {filteredLogs && filteredLogs.length === 0 && <div className="text-gray-400">No logs found.</div>}
        {filteredLogs && filteredLogs.map((log, idx) => (
          <div key={idx} className={getLogLevelColor(log)}>{log}</div>
        ))}
        <div ref={logEndRef} />
      </div>
    </section>
  );
} 