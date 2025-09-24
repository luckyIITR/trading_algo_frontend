'use client';
import { useEffect } from "react";
import Header from './components/Header';
import { useNotification } from './components/NotificationProvider';
import DirectionalOptionSellingStrategy from './components/DirectionalOptionSellingStrategy';
import { useInitializeBroker } from './hooks/useInitializeBroker';

export default function TradingDashboard() {
  const { isLoading, message, initialize } = useInitializeBroker();
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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-600 mt-2">Initializing broker sessions...</span>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-2xl font-bold tracking-tight text-blue-700">Trading Algo Dashboard</span>
          <Header 
            onBroker1Login={() => {}}
            onBroker2Login={() => {}}
          />
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-2 sm:px-4 py-4 sm:py-8 flex flex-col gap-6 sm:gap-8 w-full">
        <div className="w-full">
          <DirectionalOptionSellingStrategy />
        </div>
      </main>
    </div>
  );
}
