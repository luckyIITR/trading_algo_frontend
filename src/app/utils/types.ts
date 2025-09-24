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

export interface ApiErrorResponse {
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
  meta: Record<string, unknown>;
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

export interface TradeLeg {
  leg_id: string;
  symbol: string;
  exchange: string;
  side: string;
  quantity: number;
  entry_price: number;
  product_type: string;
  order_type: string;
  exit_price: number | null;
  status: string;
  order_id_entry: string | null;
  order_id_exit: string | null;
  entry_time: string | null;
  exit_time: string | null;
  stop_loss: number | null;
  target: number | null;
}

export interface Trade {
  trade_id: string;
  strategy_name: string;
  direction: string;
  legs: TradeLeg[];
  entry_time: string;
  exit_time: string | null;
  status: string;
  notes: string | null;
  tags: string[];
}

export interface CurrentTradesResponse {
  current_trades: Trade[];
}

export interface ForceNewPositionResponse {
  force_new_position: boolean;
}

export interface SetForceNewPositionRequest {
  force_new_position: boolean;
}

export interface SetForceNewPositionResponse {
  message: string;
}

export interface StrategyConfig {
  symbols: string[];
  strategy_name: string;
  working_lot: number;
}

export interface GetConfigResponse {
  config: StrategyConfig;
}

export interface SetConfigResponse {
  message: string;
}

export type PositionType = 'BULL' | 'BEAR' | 'NONE' | null;

export interface GetCurrentPositionResponse {
  current_position: PositionType;
}

export interface UpdateCurrentPositionRequest {
  new_position: 'BULL' | 'BEAR' | 'NONE';
}

export interface UpdateCurrentPositionResponse {
  message: string;
} 