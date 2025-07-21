interface LogDisplayProps {
  logs: string[];
}

export default function LogDisplay({ logs }: LogDisplayProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Logs</h2>
      <div className="bg-black text-green-400 font-mono rounded p-4 h-48 overflow-y-auto shadow-inner">
        {logs.map((log, idx) => (
          <div key={idx}>{log}</div>
        ))}
      </div>
    </section>
  );
} 