'use client';
import { useEffect, useState } from 'react';
import { useDirectionalOptionSelling } from '../hooks/useDirectionalOptionSelling';
import { useNotification } from './NotificationProvider';
import CurrentTrades from './CurrentTrades';
import { useForceNewPosition } from '../hooks/useForceNewPosition';
import { useSetForceNewPosition } from '../hooks/useSetForceNewPosition';
import StrategyConfigDialog from './StrategyConfigDialog';
import { useCurrentPosition } from '../hooks/useCurrentPosition';
import { useUpdateCurrentPosition } from '../hooks/useUpdateCurrentPosition';

const POSITION_OPTIONS = [
  { value: 'BULL', label: 'Bull' },
  { value: 'BEAR', label: 'Bear' },
  { value: 'NONE', label: 'None' },
];

export default function DirectionalOptionSellingStrategy() {
  const { status, loading, error, refetchStatus, start, stop } = useDirectionalOptionSelling();
  const { notify } = useNotification();
  const { data: forceNewPosition, isLoading: forceLoading, error: forceError } = useForceNewPosition();
  const { mutateAsync: setForceNewPosition, isPending: setForceLoading } = useSetForceNewPosition();
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const { data: currentPosition, isLoading: positionLoading, error: positionError } = useCurrentPosition();
  const { mutateAsync: updatePosition, isPending: updatePositionLoading } = useUpdateCurrentPosition();

  useEffect(() => {
    refetchStatus();
  }, [refetchStatus]);

  useEffect(() => {
    if (error) notify(typeof error === 'string' ? error : (error as Error).message, 'error');
    if (forceError) notify(typeof forceError === 'string' ? forceError : (forceError as Error).message, 'error');
    if (positionError) notify(typeof positionError === 'string' ? positionError : (positionError as Error).message, 'error');
  }, [error, forceError, positionError, notify]);

  const handleStart = async () => {
    try {
      const res = await start();
      notify(res.message, 'success');
    } catch (err: any) {
      notify(err.message || 'Failed to start strategy', 'error');
    }
  };

  const handleStop = async () => {
    try {
      const res = await stop();
      notify(res.message, 'success');
    } catch (err: any) {
      notify(err.message || 'Failed to stop strategy', 'error');
    }
  };

  const handleToggleForce = async () => {
    if (typeof forceNewPosition !== 'boolean') return;
    try {
      const res = await setForceNewPosition(!forceNewPosition);
      notify(res.message, 'success');
    } catch (err: any) {
      notify(err.message || 'Failed to set force new position', 'error');
    }
  };

  const handlePositionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPosition = e.target.value as 'BULL' | 'BEAR' | 'NONE';
    try {
      const res = await updatePosition(newPosition);
      notify(res.message, 'success');
    } catch (err: any) {
      notify(err.message || 'Failed to update position', 'error');
    }
  };

  return (
    <section className="bg-white rounded-xl shadow p-6 flex flex-col gap-6 border border-gray-100">
      <StrategyConfigDialog open={configDialogOpen} onClose={() => setConfigDialogOpen(false)} />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-blue-700 tracking-tight">Directional Option Selling</span>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${status === 'running' ? 'bg-green-100 text-green-700 border-green-200' : status === 'stopped' ? 'bg-gray-100 text-gray-500 border-gray-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>{status === 'running' ? 'Running' : status === 'stopped' ? 'Stopped' : 'Unknown'}</span>
        </div>
        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={() => setConfigDialogOpen(true)}
            className="px-3 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-semibold shadow-sm transition"
          >
            <span className="inline-block align-middle mr-1">⚙️</span> Edit Config
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex gap-3 items-center">
          <button
            onClick={handleStart}
            disabled={loading || status === 'running'}
            className={`px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition ${loading || status === 'running' ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            ▶ Start
          </button>
          <button
            onClick={handleStop}
            disabled={loading || status !== 'running'}
            className={`px-4 py-2 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition ${loading || status !== 'running' ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            ■ Stop
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              role="switch"
              aria-checked={!!forceNewPosition}
              onClick={handleToggleForce}
              disabled={forceLoading || setForceLoading}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!!forceNewPosition ? 'bg-blue-600' : 'bg-gray-300'} ${forceLoading || setForceLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              id="force-new-position-toggle"
            >
              <span
                className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${!!forceNewPosition ? 'translate-x-5' : ''}`}
              />
            </button>
            <label htmlFor="force-new-position-toggle" className="text-sm text-gray-700 select-none cursor-pointer">
              Force New Position
            </label>
            {(forceLoading || setForceLoading) && <span className="ml-2 text-xs text-gray-400">Saving...</span>}
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">Current Position:</label>
            <select
              value={currentPosition ?? 'NONE'}
              onChange={handlePositionChange}
              disabled={positionLoading || updatePositionLoading}
              className="rounded border px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 bg-white shadow-sm hover:border-blue-400 transition text-gray-700"
            >
              {POSITION_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {(positionLoading || updatePositionLoading) && <span className="ml-2 text-xs text-gray-400">Saving...</span>}
          </div>
        </div>
      </div>
      <CurrentTrades />
    </section>
  );
} 