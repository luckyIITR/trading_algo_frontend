export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://iamlucky.co.in';

export const API_ENDPOINTS = {
  ZERODHA_LOGIN: '/auth/login-zerodha',
  UPSTOX_LOGIN: '/auth/login-upstox',
  ZERODHA_PROFILE: '/auth/profile-zerodha',
  UPSTOX_PROFILE: '/auth/profile-upstox',
  INITIALIZE_BROKER: '/initialize-broker',
  DIRECTIONAL_OPTION_SELLING: {
    START: '/directional-option-selling/start',
    STATUS: '/directional-option-selling/status',
    STOP: '/directional-option-selling/stop',
    CURRENT_TRADES: '/directional-option-selling/current-trades',
    DELETE_TRADE: (tradeId: string) => `/directional-option-selling/delete-trade/${tradeId}`,
    EXIT_TRADE: (tradeId: string) => `/directional-option-selling/exit-trade/${tradeId}`,
    GET_FORCE_NEW_POSITION: '/directional-option-selling/get-force-new-position',
    SET_FORCE_NEW_POSITION: '/directional-option-selling/set_force_new_position',
    GET_CONFIG: '/directional-option-selling/config',
    SET_CONFIG: '/directional-option-selling/config',
    GET_CURRENT_POSITION: '/directional-option-selling/get-current-position',
    UPDATE_CURRENT_POSITION: '/directional-option-selling/update-current-position',
    LOGS: '/directional-option-selling/logs',
  },
} as const; 