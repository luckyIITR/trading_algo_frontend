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
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{name}</h3>
      
      {positions.length === 0 ? (
        <p className="text-gray-500 text-sm">No positions</p>
      ) : (
        <div className="space-y-3">
          {positions.map((position, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{position.symbol}</span>
                <span className="text-sm text-gray-600">Qty: {position.qty}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                position.side === 'BUY' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {position.side}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
