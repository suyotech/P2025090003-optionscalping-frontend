// src/types/index.ts

export interface User {
  id: string;
  email: string;
  role: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface IndexConfigItem {
  name: string;
  tf: number;
  lots: number;
  legs: number;
  dynamic_candle: number;
  fixed_candle: number;
}

export interface StrikeItem {
  index: string;
  strike: string;
  capital: number;
  lots: number;
}

export interface PositionItem {
  symbol: string;
  target: number;
  sl: number;
  executed_price?: number;
  live_ltp?: number;
  mtm?: number;
  cap_req?: number;
  status: string;
}
