'use client';
import { useEffect } from 'react';
import { useDirectionalOptionSelling } from '../hooks/useDirectionalOptionSelling';
import { useNotification } from './NotificationProvider';

export default function DirectionalOptionSellingStrategy() {
  const { status, loading, error, fetchStatus, start, stop } = useDirectionalOptionSelling();
  const { notify } = useNotification();

  useEffect(() => {
    fetchStatus();
    // Optionally, poll status every N seconds
    // const interval = setInterval(fetchStatus, 10000);
    // return () => clearInterval(interval);
  }, [fetchStatus]);

  useEffect(() => {
    if (error) notify(error, 'error');
  }, [error, notify]);

  const handleStart = async () => {
    try {
      const msg = await start();
      notify(msg, 'success');
    } catch (err: any) {
      notify(err.message || 'Failed to start strategy', 'error');
    }
  };

  const handleStop = async () => {
    try {
      const msg = await stop();
      notify(msg, 'success');
    } catch (err: any) {
      notify(err.message || 'Failed to stop strategy', 'error');
    }
  };

  return (
    <div className="bg-white rounded shadow p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-gray-800">Directional Option Selling Strategy</span>
        <span className={`ml-2 w-3 h-3 rounded-full ${status === 'running' ? 'bg-green-500' : status === 'stopped' ? 'bg-gray-400' : 'bg-yellow-400'} border`} title={status} />
        <span className="text-xs text-gray-600">{status === 'running' ? 'Running' : status === 'stopped' ? 'Stopped' : 'Unknown'}</span>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleStart}
          disabled={loading || status === 'running'}
          className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition ${loading || status === 'running' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Start
        </button>
        <button
          onClick={handleStop}
          disabled={loading || status !== 'running'}
          className={`px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition ${loading || status !== 'running' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Stop
        </button>
      </div>
    </div>
  );
} 