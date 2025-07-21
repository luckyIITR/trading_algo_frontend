'use client';
import { useState } from 'react';
import { useCurrentTrades } from '../hooks/useCurrentTrades';
import { useDeleteTrade } from '../hooks/useDeleteTrade';
import { useExitTrade } from '../hooks/useExitTrade';
import { useNotification } from './NotificationProvider';
import ConfirmDialog from './ConfirmDialog';

export default function CurrentTrades() {
  const { data: trades, isLoading, error, refetch, isFetching } = useCurrentTrades();
  const { mutateAsync: deleteTrade, isPending: isDeleting } = useDeleteTrade();
  const { mutateAsync: exitTrade, isPending: isExiting } = useExitTrade();
  const { notify } = useNotification();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [exitConfirmOpen, setExitConfirmOpen] = useState(false);
  const [pendingExitId, setPendingExitId] = useState<string | null>(null);

  const handleDeleteClick = (tradeId: string) => {
    setPendingDeleteId(tradeId);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      const res = await deleteTrade(pendingDeleteId);
      notify(res.message, 'success');
    } catch (err: any) {
      notify(err.message || 'Failed to delete trade', 'error');
    } finally {
      setConfirmOpen(false);
      setPendingDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  const handleExitClick = (tradeId: string) => {
    setPendingExitId(tradeId);
    setExitConfirmOpen(true);
  };

  const handleConfirmExit = async () => {
    if (!pendingExitId) return;
    try {
      const res = await exitTrade(pendingExitId);
      notify(res.message, 'success');
    } catch (err: any) {
      notify(err.message || 'Failed to exit trade', 'error');
    } finally {
      setExitConfirmOpen(false);
      setPendingExitId(null);
    }
  };

  const handleCancelExit = () => {
    setExitConfirmOpen(false);
    setPendingExitId(null);
  };

  if (isLoading) {
    return <div className="text-gray-500">Loading current trades...</div>;
  }
  if (error) {
    return <div className="text-red-600">Failed to load trades: {(error as Error).message}</div>;
  }
  if (!trades || trades.length === 0) {
    return <div className="text-gray-500">No current trades.</div>;
  }

  const isButtonLoading = isLoading || isFetching;

  return (
    <div className="bg-white rounded shadow p-6 mt-4">
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Trade?"
        description="Are you sure you want to delete this trade? This action cannot be undone."
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <ConfirmDialog
        open={exitConfirmOpen}
        title="Exit Trade?"
        description="Are you sure you want to exit this trade? This action cannot be undone."
        confirmText={isExiting ? 'Exiting...' : 'Exit'}
        onConfirm={handleConfirmExit}
        onCancel={handleCancelExit}
      />
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Current Trades</h2>
        <button
          onClick={() => refetch()}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition flex items-center gap-2"
          disabled={isButtonLoading}
        >
          {isButtonLoading && (
            <svg className="animate-spin h-4 w-4 text-blue-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          )}
          {isButtonLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      <div className="space-y-6">
        {trades.map(trade => (
          <div key={trade.trade_id} className="border rounded p-4 text-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div>
                <span className="font-semibold">Strategy:</span> {trade.strategy_name} <span className="ml-2 font-semibold">Direction:</span> {trade.direction}
                <span className="ml-4 text-xs text-gray-400 select-all">Trade ID: <span className="font-mono">{trade.trade_id}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-block w-2 h-2 rounded-full mr-1 ${trade.status === 'active' ? 'bg-green-500' : trade.status === 'created' ? 'bg-yellow-500' : 'bg-gray-400'}`}></span>
                <span className="text-xs text-gray-600">{trade.status}</span>
                <button
                  title="Exit trade"
                  onClick={() => handleExitClick(trade.trade_id)}
                  disabled={isExiting}
                  className="ml-2 p-1 rounded hover:bg-yellow-100 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  title="Delete trade"
                  onClick={() => handleDeleteClick(trade.trade_id)}
                  disabled={isDeleting}
                  className="ml-2 p-1 rounded hover:bg-red-100 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-1">Leg</th>
                    <th className="px-2 py-1">Symbol</th>
                    <th className="px-2 py-1">Side</th>
                    <th className="px-2 py-1">Qty</th>
                    <th className="px-2 py-1">Entry Price</th>
                    <th className="px-2 py-1">Exit Price</th>
                    <th className="px-2 py-1">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trade.legs.map(leg => (
                    <tr key={leg.leg_id}>
                      <td className="px-2 py-1">{leg.leg_id.slice(0, 6)}...</td>
                      <td className="px-2 py-1">{leg.symbol}</td>
                      <td className="px-2 py-1">{leg.side}</td>
                      <td className="px-2 py-1">{leg.quantity}</td>
                      <td className="px-2 py-1">{leg.entry_price}</td>
                      <td className="px-2 py-1">{leg.exit_price ?? '-'}</td>
                      <td className="px-2 py-1">{leg.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {trade.notes && (
              <div className="mt-2 text-xs text-gray-500">Notes: {trade.notes}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 