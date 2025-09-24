import { useZerodhaAuth } from '../hooks/useZerodhaAuth';
import { useUpstoxAuth } from '../hooks/useUpstoxAuth';
import { useZerodhaProfile } from '../hooks/useZerodhaProfile';
import { useUpstoxProfile } from '../hooks/useUpstoxProfile';
import Image from 'next/image';

interface HeaderProps {
  onBroker1Login: () => void;
  onBroker2Login: () => void;
}

function StatusBadge({ isAuthenticated, avatar, name, broker }: { isAuthenticated: boolean; avatar?: string; name?: string; broker: string }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200 shadow-sm">
      <span
        className={`inline-block w-2.5 h-2.5 rounded-full border border-white shadow ${
          isAuthenticated ? 'bg-green-500' : 'bg-gray-300'
        }`}
        title={isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      />
      {isAuthenticated && avatar && (
        <Image src={avatar} alt={name || 'User'} width={20} height={20} className="w-5 h-5 rounded-full border" />
      )}
      <span className="text-xs text-gray-700 font-medium">
        {isAuthenticated ? name : broker}
      </span>
    </div>
  );
}

export default function Header({ onBroker1Login, onBroker2Login }: HeaderProps) {
  const { getLoginUrl: getZerodhaLoginUrl, isLoading: isZerodhaLoading } = useZerodhaAuth();
  const { getLoginUrl: getUpstoxLoginUrl, isLoading: isUpstoxLoading } = useUpstoxAuth();
  const { profile: zerodhaProfile, isAuthenticated: isZerodhaAuthenticated } = useZerodhaProfile();
  const { profile: upstoxProfile, isAuthenticated: isUpstoxAuthenticated } = useUpstoxProfile();

  const handleZerodhaLogin = async () => {
    try {
      const loginUrl = await getZerodhaLoginUrl();
      onBroker1Login();
      window.location.href = loginUrl;
    } catch {}
  };

  const handleUpstoxLogin = async () => {
    try {
      const loginUrl = await getUpstoxLoginUrl();
      onBroker2Login();
      window.location.href = loginUrl;
    } catch {}
  };

  return (
    <div className="flex flex-row gap-4 items-center">
      <div className="flex flex-row gap-2 items-center">
        <StatusBadge
          isAuthenticated={isZerodhaAuthenticated}
          avatar={zerodhaProfile?.avatar_url}
          name={zerodhaProfile?.user_name}
          broker="Zerodha"
        />
        <button
          onClick={handleZerodhaLogin}
          disabled={isZerodhaLoading}
          className={`px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold shadow hover:bg-blue-700 transition ${
            isZerodhaLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isZerodhaLoading ? 'Connecting...' : 'Login Zerodha'}
        </button>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <StatusBadge
          isAuthenticated={isUpstoxAuthenticated}
          name={upstoxProfile?.user_name}
          broker="Upstox"
        />
        <button
          onClick={handleUpstoxLogin}
          disabled={isUpstoxLoading}
          className={`px-3 py-1 rounded bg-green-600 text-white text-xs font-semibold shadow hover:bg-green-700 transition ${
            isUpstoxLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isUpstoxLoading ? 'Connecting...' : 'Login Upstox'}
        </button>
      </div>
    </div>
  );
} 