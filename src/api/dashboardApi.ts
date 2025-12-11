// // src/dashboardApi.ts
// import axiosInstance from "./axiosInstance";
// import type { IndexConfigItem, StrikeItem, PositionItem } from "../types/index"; 

// export const dashboardApi = {
//   async fetchConfig(): Promise<IndexConfigItem[]> {
//     const res = await axiosInstance.get("/dashboard/config");
//     return res.data.indexes;
//   },
//   async fetchStrikes(): Promise<StrikeItem[]> {
//     const res = await axiosInstance.get("/dashboard/strike-selection");
//     return res.data.strikes;
//   },
//   async fetchPositions(): Promise<PositionItem[]> {
//     const res = await axiosInstance.get("/dashboard/positions");
//     return res.data.positions;
//   },
//   async postOperation(payload: { button: string; index?: string }) {
//     const res = await axiosInstance.post("/dashboard/operation", payload);
//     return res.data;
//   },
// };

// src/api/dashboardApi.ts (MOCK)

import type { IndexConfigItem, StrikeItem, PositionItem } from "../types/index";

// --- MOCK DATA ---
const mockConfig: IndexConfigItem[] = [
  {
    name: "NIFTY",
    tf: 1,
    lots: 3,
    legs: 3,
    dynamicCandle: 180,
    fixedCandle: 120,
    fixedCandleEnabled: true,
    dynamicEnabled: false, 
    customCandleOptions: true, 
  },
  {
    name: "BANKN",
    tf: 1,
    lots: 3,
    legs: 3,
    dynamicCandle: 120,
    fixedCandle: 300,
    fixedCandleEnabled: false,
    dynamicEnabled: true,
    customCandleOptions: true, 
  },
  {
    name: "SENSEX",
    tf: 1,
    lots: 3,
    legs: 3,
    dynamicCandle: 120,
    fixedCandle: 300,
    fixedCandleEnabled: true,
    dynamicEnabled: true, 
    customCandleOptions: true, 
  },
];


const mockStrikes: StrikeItem[] = [
  { index: "NIFTY", strikePrice: "₹200+", capitalLots: 50000, lots: 3 },
  { index: "BANKN", strikePrice: "₹500+", capitalLots: 50000, lots: 3 },
  { index: "SENSEX", strikePrice: "₹300+", capitalLots: 50000, lots: 3 },
];

const mockPositions: PositionItem[] = [
  {
    symbol: "NIFTY 24500 CE",
    target: 150,
    sl: 120,
    high: 160,
    low: 115,
    slPosition: 123,
    executedPrice: 135,
    liveLTP: 142,
    mtm: 700,
    capReq: 25000,
    status: "ACTIVE",
  },
  {
    symbol: "BANKN 54000 PE",
    target: 200,
    sl: 180,
    high: 220,
    low: 175,
    slPosition: 182,
    executedPrice: 190,
    liveLTP: 178,
    mtm: -1200,
    capReq: 40000,
    status: "ACTIVE",
  },
];
// --- END MOCK DATA ---

export const dashboardApi = {
  fetchConfig: (): Promise<IndexConfigItem[]> =>
    new Promise((resolve) => setTimeout(() => resolve(mockConfig), 500)),

  fetchStrikes: (): Promise<StrikeItem[]> =>
    new Promise((resolve) => setTimeout(() => resolve(mockStrikes), 500)),

  fetchPositions: (): Promise<PositionItem[]> =>
    new Promise((resolve) => setTimeout(() => resolve(mockPositions), 500)),

  postOperation: (data: { button: string; index?: string }): Promise<void> =>
    new Promise((resolve) => {
      console.log("Posting operation:", data);
      setTimeout(() => resolve(), 300);
    }),

  updateConfig: (
    name: string,
    key: keyof IndexConfigItem,
    value: number | boolean
  ): Promise<void> =>
    new Promise((resolve) => {
      console.log(`Updating config: ${name}.${key} to ${value}`);
      setTimeout(() => resolve(), 300);
    }),
};

// // src/socket.ts (MOCK)
// export const socket = {
//     on: (event: string, callback: (data: any) => void) => {
//         // Mocking socket behavior for demo purposes
//         console.log(`Socket listening for: ${event}`);
//     },
//     off: (event: string) => {
//         console.log(`Socket unsubscribed from: ${event}`);
//     },
//     emit: (event: string, data: any) => {
//         console.log(`Socket emitted: ${event}`, data);
//     }
// }