'use client';
import LogDisplay from '../components/LogDisplay';

export default function LogsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
      <section className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Logs</h1>
        <LogDisplay />
      </section>
    </main>
  );
} 