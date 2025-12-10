import React from "react";
import type { PositionItem } from "../../types/index"; // Assuming this type is available

// Using a mock array for demonstration, replace with your 'positions' prop
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
  // Add more mock data if needed
];

// Define the structure for the Position component props
interface PositionsProps {
  positions: PositionItem[];
  // You might pass MTM and P/L data here too
}

const Positions: React.FC<PositionsProps> = ({ positions = mockPositions }) => {
  // Use a mock data if the positions prop is not passed (for demonstration)
  const data = positions.length > 0 ? positions : mockPositions;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-white text-[12px]">
        {/* Table Header */}
        <thead className="text-gray-400 border-b  border-[#2b2e35]">
          <tr>
            <th className="py-2 px-3 text-left">SYMBOL</th>
            <th className="py-2 px-3 text-center">TARGET</th>
            <th className="py-2 px-3 text-center">SL</th>
            <th className="py-2 px-3 text-center">HIGH</th>
            <th className="py-2 px-3 text-center">LOW</th>
            <th className="py-2 px-3 text-center">SL POSITION</th>
            <th className="py-2 px-3 text-center">EXECUTED PRICE</th>
            <th className="py-2 px-3 text-center">LIVE LTP</th>
            <th className="py-2 px-3 text-center">MTM</th>
            <th className="py-2 px-3 text-center">CAP REQ</th>
            <th className="py-2 px-3 text-center">STATUS</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((pos, index) => (
            <tr key={index} className="border-b border-[#2b2e35]">
              <td className="py-3 px-3 whitespace-nowrap">
                {pos.symbol}
              </td>
              <td className="py-3 px-3 text-center">
                <input
                  type="number"
                  value={pos.target}
                  readOnly
                  className="w-16 bg-[#1e2025] border border-[#2b2e35] rounded text-center py-1"
                />
              </td>
              <td className="py-3 px-3 text-center">
                <input
                  type="number"
                  value={pos.sl}
                  readOnly
                  className="w-16 bg-[#1e2025] border border-[#2b2e35] rounded text-center py-1"
                />
              </td>
              <td className="py-3 px-3 text-center">
                <input
                  type="number"
                  value={pos.high}
                  readOnly
                  className="w-16 bg-[#1e2025] border border-[#2b2e35] rounded text-center py-1"
                />
              </td>
              <td className="py-3 px-3 text-center">
                <input
                  type="number"
                  value={pos.low}
                  readOnly
                  className="w-16 bg-[#1e2025] border border-[#2b2e35] rounded text-center py-1"
                />
              </td>
              <td className="py-3 px-3 text-center">{pos.slPosition}</td>
              <td className="py-3 px-3 text-center">{pos.executedPrice}</td>
              <td className="py-3 px-3 text-center  text-blue-400">
                {pos.liveLTP}
              </td>
              <td className="py-3 px-3 text-center  text-green-400">
                {pos.mtm > 0 ? `+${pos.mtm}` : pos.mtm}
              </td>
              <td className="py-3 px-3 text-center">{pos.capReq}</td>
              <td className="py-3 px-3 text-center">
                <span
                  className={`px-3 py-1 rounded text-xs  ${
                    pos.status === "ACTIVE"
                      ? "bg-green-700 text-green-200"
                      : "bg-red-700 text-red-200"
                  }`}
                >
                  {pos.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Positions;
