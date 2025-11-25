// src/dashboardApi.ts
import axiosInstance from "./axiosInstance";
import type { IndexConfigItem, StrikeItem, PositionItem } from "../types/index"; 

export const dashboardApi = {
  async fetchConfig(): Promise<IndexConfigItem[]> {
    const res = await axiosInstance.get("/dashboard/config");
    return res.data.indexes;
  },
  async fetchStrikes(): Promise<StrikeItem[]> {
    const res = await axiosInstance.get("/dashboard/strike-selection");
    return res.data.strikes;
  },
  async fetchPositions(): Promise<PositionItem[]> {
    const res = await axiosInstance.get("/dashboard/positions");
    return res.data.positions;
  },
  async postOperation(payload: { button: string; index?: string }) {
    const res = await axiosInstance.post("/dashboard/operation", payload);
    return res.data;
  },
};
