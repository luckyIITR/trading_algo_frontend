import StrategyCard from './StrategyCard';

interface Position {
  symbol: string;
  qty: number;
  side: string;
}

interface Strategy {
  name: string;
  positions: Position[];
}

interface StrategiesSectionProps {
  strategies: Strategy[];
}

export default function StrategiesSection({ strategies }: StrategiesSectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Strategies</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {strategies.map((strategy, idx) => (
          <StrategyCard
            key={idx}
            name={strategy.name}
            positions={strategy.positions}
          />
        ))}
      </div>
    </section>
  );
} 