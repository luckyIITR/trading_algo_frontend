export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

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
  },
} as const; 