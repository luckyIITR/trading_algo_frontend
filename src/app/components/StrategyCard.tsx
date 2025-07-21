interface Position {
  symbol: string;
  qty: number;
  side: string;
}

interface StrategyCardProps {
  name: string;
  positions: Position[];
}

export default function StrategyCard({ name, positions }: StrategyCardProps) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-xl font-bold mb-2 text-blue-700">{name}</h3>
      <table className="w-full text-left text-sm text-gray-700">
        <thead>
          <tr>
            <th className="py-1">Symbol</th>
            <th className="py-1">Qty</th>
            <th className="py-1">Side</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos, idx) => (
            <tr key={idx} className="border-t">
              <td className="py-1">{pos.symbol}</td>
              <td className="py-1">{pos.qty}</td>
              <td className="py-1">{pos.side}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 