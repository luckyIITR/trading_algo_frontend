'use client';
import { useEffect, useState } from 'react';
import { useStrategyConfig } from '../hooks/useStrategyConfig';
import { useSetStrategyConfig } from '../hooks/useSetStrategyConfig';
import { useNotification } from './NotificationProvider';

interface StrategyConfigDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function StrategyConfigDialog({ open, onClose }: StrategyConfigDialogProps) {
  const { data: config, isLoading: configLoading, error: configError } = useStrategyConfig();
  const { mutateAsync: setConfig, isPending: setConfigLoading } = useSetStrategyConfig();
  const { notify } = useNotification();
  const [editConfig, setEditConfig] = useState<{ symbols: string; strategy_name: string; working_lot: number } | null>(null);

  useEffect(() => {
    if (config && open) {
      setEditConfig({
        symbols: config.symbols.join(','),
        strategy_name: config.strategy_name,
        working_lot: config.working_lot,
      });
    }
  }, [config, open]);

  useEffect(() => {
    if (configError && open) notify(typeof configError === 'string' ? configError : (configError as Error).message, 'error');
  }, [configError, notify, open]);

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editConfig) return;
    const { name, value } = e.target;
    setEditConfig(prev => prev ? { ...prev, [name]: name === 'working_lot' ? Number(value) : value } : prev);
  };

  const handleConfigSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editConfig) return;
    try {
      const payload = {
        symbols: editConfig.symbols.split(',').map(s => s.trim()).filter(Boolean),
        strategy_name: editConfig.strategy_name,
        working_lot: editConfig.working_lot,
      };
      const res = await setConfig(payload);
      notify(res.message, 'success');
      onClose();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save config';
      notify(errorMessage, 'error');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <form onSubmit={handleConfigSave} className="bg-white rounded-xl shadow-2xl border border-gray-200 p-8 w-full max-w-md flex flex-col gap-4">
        <div className="font-bold text-lg text-blue-700 mb-2">Edit Strategy Config</div>
        <div className="flex flex-col gap-3">
          <label className="text-sm text-gray-600 font-semibold">
            Symbols (comma separated):
            <input
              type="text"
              name="symbols"
              value={editConfig?.symbols ?? ''}
              onChange={handleConfigChange}
              disabled={configLoading || setConfigLoading}
              className="mt-1 w-full rounded border px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
          </label>
          <label className="text-sm text-gray-600 font-semibold">
            Strategy Name:
            <input
              type="text"
              name="strategy_name"
              value={editConfig?.strategy_name ?? ''}
              onChange={handleConfigChange}
              disabled={configLoading || setConfigLoading}
              className="mt-1 w-full rounded border px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
          </label>
          <label className="text-sm text-gray-600 font-semibold">
            Working Lot:
            <input
              type="number"
              name="working_lot"
              value={editConfig?.working_lot ?? ''}
              onChange={handleConfigChange}
              disabled={configLoading || setConfigLoading}
              className="mt-1 w-full rounded border px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
          </label>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={setConfigLoading}
            className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={configLoading || setConfigLoading}
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {setConfigLoading ? 'Saving...' : 'Save Config'}
          </button>
        </div>
      </form>
    </div>
  );
} 