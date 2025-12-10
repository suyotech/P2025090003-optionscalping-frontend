import { io, Socket } from "socket.io-client";
import type { PositionItem } from "./types/index";

export const socket: Socket = io("http://localhost:5000"); 

//  types for events
export type ServerToClientEvents = {
  updatePositions: (positions: PositionItem[]) => void;
};

export type ClientToServerEvents = {
  operation: { button: string; index?: string };
};
