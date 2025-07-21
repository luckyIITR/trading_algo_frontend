'use client';
import { useState, useEffect } from "react";
import Header from './components/Header';
import StrategiesSection from './components/StrategiesSection';
import LogDisplay from './components/LogDisplay';
import { Strategy } from './utils/types';
import { useInitializeBroker } from './hooks/useInitializeBroker';
import { useNotification } from './components/NotificationProvider';
import DirectionalOptionSellingStrategy from './components/DirectionalOptionSellingStrategy';

const mockStrategies: Strategy[] = [
  {
    name: "Momentum Strategy",
    positions: [
      { symbol: "AAPL", qty: 10, side: "Long" },
      { symbol: "TSLA", qty: 5, side: "Short" },
    ],
  },
  {
    name: "Mean Reversion",
    positions: [
      { symbol: "GOOG", qty: 2, side: "Long" },
    ],
  },
];

const mockLogs = [
  "[09:00] Connected to broker.",
  "[09:01] Placed order for AAPL.",
  "[09:02] Order filled for TSLA.",
];

export default function TradingDashboard() {
  const { isLoading, error, message } = useInitializeBroker();
  const [logs, setLogs] = useState(mockLogs);
  const { notify } = useNotification();

  useEffect(() => {
    if (message) {
      notify(message, 'success');
    }
  }, [message, notify]);

  const handleBroker1Login = () => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Attempting to login to Broker 1...`]);
  };

  const handleBroker2Login = () => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Attempting to login to Broker 2...`]);
  };

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
          onBroker1Login={handleBroker1Login}
          onBroker2Login={handleBroker2Login}
        />
        <DirectionalOptionSellingStrategy />
        <StrategiesSection strategies={mockStrategies} />
        <LogDisplay logs={logs} />
      </div>
    </main>
  );
}
