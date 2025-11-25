import React from "react";
import type { StrikeItem } from "../../types/index";

interface Props {
  strikes: StrikeItem[];
}

const StrikeSelection: React.FC<Props> = ({ strikes }) => {
  return (
    <div className="bg-[#15181d] p-4 rounded-lg shadow-md">
      <h2 className="text-sm font-semibold mb-3">STRIKE SELECTION</h2>
      <table className="w-full text-xs table-fixed">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-700">
            <th className="p-2 w-1/4">INDEX</th>
            <th className="p-2 w-1/4">STRIKE</th>
            <th className="p-2 w-1/4">CAPITAL LOTS</th>
            <th className="p-2 w-1/4">LOTS</th>
          </tr>
        </thead>
        <tbody>
          {strikes.map((s) => (
            <tr
              key={`${s.index}-${s.strike}`}
              className="border-b border-gray-800"
            >
              <td className="p-2">{s.index}</td>
              <td className="p-2">{s.strike}</td>
              <td className="p-2">{s.capital.toLocaleString()}</td>
              <td className="p-2">{s.lots}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StrikeSelection;
