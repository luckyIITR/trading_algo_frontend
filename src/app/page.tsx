'use client';
import { useState, useEffect } from "react";
import Header from './components/Header';
import LogDisplay from './components/LogDisplay';
import { Strategy } from './utils/types';
import { useNotification } from './components/NotificationProvider';
import DirectionalOptionSellingStrategy from './components/DirectionalOptionSellingStrategy';
import { useInitializeBroker } from './hooks/useInitializeBroker';


const mockLogs = [
  "[09:00] Connected to broker.",
  "[09:01] Placed order for AAPL.",
  "[09:02] Order filled for TSLA.",
];

export default function TradingDashboard() {
  const { isLoading, error, message, initialize, isSuccess } = useInitializeBroker();
  const [logs, setLogs] = useState(mockLogs);
  const { notify } = useNotification();

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (message) {
      notify(message, 'success');
    }
  }, [message, notify]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-600 mt-2">Initializing broker sessions...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <Header 
          onBroker1Login={() => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Attempting to login to Broker 1...`])}
          onBroker2Login={() => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Attempting to login to Broker 2...`])}
        />
        <DirectionalOptionSellingStrategy />
        <LogDisplay logs={logs} />
      </div>
    </main>
  );
}
