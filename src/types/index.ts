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
  dynamicCandle: number;
  fixedCandle: number;
  fixedCandleEnabled: boolean; 
}


export interface StrikeItem {
  index: "NIFTY" | "BANKN" | "SENSEX";
  strikePrice: string; // e.g., "₹200+"
  capitalLots: number;
  lots: number;
}

export interface PositionItem {
  symbol: string;
  target: number;
  sl: number; // Stop Loss
  high: number;
  low: number;
  slPosition: number;
  executedPrice: number;
  liveLTP: number;
  mtm: number;
  capReq: number; // Capital Required
  status: "ACTIVE" | "EXITED";
}
