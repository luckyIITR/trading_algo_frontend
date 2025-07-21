export interface Position {
  symbol: string;
  qty: number;
  side: string;
}

export interface Strategy {
  name: string;
  positions: Position[];
}

// API Response Types
export interface ZerodhaLoginResponse {
  login_url: string;
}

export interface ApiError {
  error: string;
}

// Custom error type for API calls
export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

// Zerodha Profile
export interface ZerodhaProfile {
  user_id: string;
  user_type: string;
  email: string;
  user_name: string;
  user_shortname: string;
  broker: string;
  exchanges: string[];
  products: string[];
  order_types: string[];
  avatar_url: string;
  meta: Record<string, any>;
}

// Upstox Profile
export interface UpstoxProfile {
  status: string;
  data: {
    email: string;
    exchanges: string[];
    products: string[];
    broker: string;
    user_id: string;
    user_name: string;
    order_types: string[];
    user_type: string;
    poa: boolean;
    ddpi: boolean;
    is_active: boolean;
  };
}

// Directional Option Selling Strategy Types
export interface StrategyStatusResponse {
  message: string;
  status: 'running' | 'stopped';
}

export interface StrategyActionResponse {
  message: string;
}

export interface StrategyErrorResponse {
  detail: string;
} 