import { useZerodhaAuth } from '../hooks/useZerodhaAuth';
import { useUpstoxAuth } from '../hooks/useUpstoxAuth';
import { useZerodhaProfile } from '../hooks/useZerodhaProfile';
import { useUpstoxProfile } from '../hooks/useUpstoxProfile';

interface HeaderProps {
  onBroker1Login: () => void;
  onBroker2Login: () => void;
}

function StatusIndicator({ isAuthenticated, avatar, name }: { isAuthenticated: boolean; avatar?: string; name?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-block w-3 h-3 rounded-full border border-white shadow ${
          isAuthenticated ? 'bg-green-500' : 'bg-gray-400'
        }`}
        title={isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      />
      {isAuthenticated && avatar && (
        <img src={avatar} alt={name} className="w-6 h-6 rounded-full border" />
      )}
      {isAuthenticated && name && (
        <span className="text-xs text-gray-700 font-medium">{name}</span>
      )}
    </div>
  );
}

export default function Header({ onBroker1Login, onBroker2Login }: HeaderProps) {
  const { getLoginUrl: getZerodhaLoginUrl, isLoading: isZerodhaLoading, error: zerodhaError } = useZerodhaAuth();
  const { getLoginUrl: getUpstoxLoginUrl, isLoading: isUpstoxLoading, error: upstoxError } = useUpstoxAuth();
  const { profile: zerodhaProfile, isAuthenticated: isZerodhaAuthenticated } = useZerodhaProfile();
  const { profile: upstoxProfile, isAuthenticated: isUpstoxAuthenticated } = useUpstoxProfile();

  const handleZerodhaLogin = async () => {
    try {
      const loginUrl = await getZerodhaLoginUrl();
      onBroker1Login(); // Log the attempt
      window.location.href = loginUrl;
    } catch (err) {
      console.error('Failed to initiate Zerodha login:', err);
    }
  };

  const handleUpstoxLogin = async () => {
    try {
      const loginUrl = await getUpstoxLoginUrl();
      onBroker2Login(); // Log the attempt
      window.location.href = loginUrl;
    } catch (err) {
      console.error('Failed to initiate Upstox login:', err);
    }
  };

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 className="text-3xl font-bold text-gray-800">Trading Dashboard</h1>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-center">
            <StatusIndicator
              isAuthenticated={isZerodhaAuthenticated}
              avatar={zerodhaProfile?.avatar_url}
              name={zerodhaProfile?.user_name}
            />
            <button
              onClick={handleZerodhaLogin}
              disabled={isZerodhaLoading}
              className={`mt-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
                isZerodhaLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isZerodhaLoading ? 'Connecting...' : 'Login Zerodha'}
            </button>
          </div>
          <div className="flex flex-col items-center">
            <StatusIndicator
              isAuthenticated={isUpstoxAuthenticated}
              name={upstoxProfile?.user_name}
            />
            <button
              onClick={handleUpstoxLogin}
              disabled={isUpstoxLoading}
              className={`mt-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition ${
                isUpstoxLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isUpstoxLoading ? 'Connecting...' : 'Login Upstox'}
            </button>
          </div>
        </div>
        {(zerodhaError || upstoxError) && (
          <div className="text-red-600 text-sm">
            {zerodhaError && <div>Zerodha: {zerodhaError}</div>}
            {upstoxError && <div>Upstox: {upstoxError}</div>}
          </div>
        )}
      </div>
    </header>
  );
} 