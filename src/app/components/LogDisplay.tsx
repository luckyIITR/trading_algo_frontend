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
  const { data: logs, isLoading, error } = useStrategyLogs();
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
      <input
        type="text"
        placeholder="Search logs..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-2 w-full rounded border px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 bg-black text-green-200 placeholder:text-green-400"
      />
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