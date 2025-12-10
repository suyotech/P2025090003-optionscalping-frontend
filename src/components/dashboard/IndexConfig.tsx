// src/components/dashboard/IndexConfig.tsx

import React from "react";
import type { IndexConfigItem } from "../../types/index";

interface IndexConfigProps {
  items: IndexConfigItem[];
  onChange: (name: string, key: keyof IndexConfigItem, value: number) => void;
}

const IndexConfig: React.FC<IndexConfigProps> = ({ items, onChange }) => {
  const optionsTf = [1, 2, 3, 5];
  const optionsLotsLegs = [1, 2, 3, 4, 5];
  const optionsCandle = [60, 120, 180, 240, 300];

  return (
    <div className="bg-[#181a1f] p-4 rounded-xl shadow-lg border border-[#2b2e35]">
      <h2 className="text-sm font-semibold text-gray-400 mb-3">
        INDEX CONFIGURATION
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-white text-xs">
          <thead className="text-gray-400 border-b border-gray-700/50">
            <tr>
              <th className="py-2 px-3 text-left">INDEX</th>
              <th className="py-2 px-3 text-center">TF</th>
              <th className="py-2 px-3 text-center">LOTS</th>
              <th className="py-2 px-3 text-center">LEGS</th>
              <th className="py-2 px-3 text-center">DYNAMIC CANDLE</th>
              <th className="py-2 px-3 text-center">FIXED CANDLE</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.name} className="border-b border-gray-800">
                <td className="py-2 px-3 font-bold text-left">{item.name}</td>

                {/* TF */}
                <td className="py-2 px-3 text-center">
                  <select
                    value={item.tf}
                    onChange={(e) =>
                      onChange(item.name, "tf", Number(e.target.value))
                    }
                    className="w-16 bg-[#252830] border border-[#3c414d] rounded-md p-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {optionsTf.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>

                {/* LOTS */}
                <td className="py-2 px-3 text-center">
                  <select
                    value={item.lots}
                    onChange={(e) =>
                      onChange(item.name, "lots", Number(e.target.value))
                    }
                    className="w-16 bg-[#252830] border border-[#3c414d] rounded-md p-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {optionsLotsLegs.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>

                {/* LEGS */}
                <td className="py-2 px-3 text-center">
                  <select
                    value={item.legs}
                    onChange={(e) =>
                      onChange(item.name, "legs", Number(e.target.value))
                    }
                    className="w-16 bg-[#252830] border border-[#3c414d] rounded-md p-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {optionsLotsLegs.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>

                {/* DYNAMIC CANDLE */}
                <td className="py-2 px-3 text-center">
                  <select
                    value={item.dynamicCandle}
                    onChange={(e) =>
                      onChange(
                        item.name,
                        "dynamicCandle",
                        Number(e.target.value)
                      )
                    }
                    className="w-24 bg-[#252830] border border-[#3c414d] rounded-md p-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {optionsCandle.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>

                {/* FIXED CANDLE */}
                <td className="py-2 px-3 text-center">
                  <select
                    value={item.fixedCandle}
                    onChange={(e) =>
                      onChange(item.name, "fixedCandle", Number(e.target.value))
                    }
                    className="w-24 bg-[#252830] border border-[#3c414d] rounded-md p-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {optionsCandle.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IndexConfig;
