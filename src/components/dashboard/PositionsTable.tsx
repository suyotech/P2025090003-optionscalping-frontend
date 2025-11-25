import React from "react";
import type{ PositionItem } from "../../types/index";

interface Props {
  positions: PositionItem[];
  refresh: () => void;
}

const PositionsTable: React.FC<Props> = ({ positions, refresh }) => {
  return (
    <div className="bg-[#15181d] mt-4 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-4 mb-3 text-xs">
          <button className="px-3 py-1 bg-[#20242b] rounded">POSITIONS</button>
          <button className="px-3 py-1 bg-[#20242b] rounded">ORDER BOOK</button>
          <button className="px-3 py-1 bg-[#20242b] rounded">TRADE BOOK</button>
          <button className="px-3 py-1 bg-[#20242b] rounded">FUNDS</button>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={refresh}
            className="px-3 py-2 bg-[#20242b] rounded text-xs"
          >
            REFRESH
          </button>
          <div className="text-xs text-gray-300">
            MTM: <span className="text-green-400">+₹2,500</span>
          </div>
        </div>
      </div>

      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-700 text-gray-400">
            <th className="p-2">SYMBOL</th>
            <th className="p-2">TARGET</th>
            <th className="p-2">SL</th>
            <th className="p-2">EXECUTED</th>
            <th className="p-2">LTP</th>
            <th className="p-2">MTM</th>
            <th className="p-2">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((p) => (
            <tr key={p.symbol} className="border-b border-gray-800">
              <td className="p-2">{p.symbol}</td>
              <td className="p-2">{p.target}</td>
              <td className="p-2">{p.sl}</td>
              <td className="p-2">{p.executed_price ?? "-"}</td>
              <td className="p-2">{p.live_ltp ?? "-"}</td>
              <td
                className={`p-2 ${
                  p.mtm && p.mtm > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {p.mtm ? (p.mtm > 0 ? `+${p.mtm}` : p.mtm) : "-"}
              </td>
              <td
                className={`p-2 ${
                  p.status === "ACTIVE" ? "text-green-400" : "text-gray-300"
                }`}
              >
                {p.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionsTable;
