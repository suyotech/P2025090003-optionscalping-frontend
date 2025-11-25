import React from "react";
import type { IndexConfigItem } from "../../types/index";

interface Props {
  items: IndexConfigItem[];
  onChange: (name: string, key: keyof IndexConfigItem, value: number) => void;
}

const IndexConfig: React.FC<Props> = ({ items, onChange }) => {
  return (
    <div className="bg-[#15181d] p-4 rounded-lg shadow-md">
      <h2 className="text-sm font-semibold mb-3">INDEX CONFIGURATION</h2>
      <div className="space-y-3">
        {items.map((it) => (
          <div
            key={it.name}
            className="grid grid-cols-7 gap-2 text-xs items-center"
          >
            <div className="col-span-1 font-semibold">{it.name}</div>

            <select
              value={it.tf}
              onChange={(e) => onChange(it.name, "tf", Number(e.target.value))}
              className="bg-[#20242b] p-2 rounded text-gray-200"
            >
              {[1, 5, 15].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

            <select
              value={it.lots}
              onChange={(e) =>
                onChange(it.name, "lots", Number(e.target.value))
              }
              className="bg-[#20242b] p-2 rounded text-gray-200"
            >
              {[1, 3, 5].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

            <select
              value={it.legs}
              onChange={(e) =>
                onChange(it.name, "legs", Number(e.target.value))
              }
              className="bg-[#20242b] p-2 rounded text-gray-200"
            >
              {[1, 2, 3].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

            <select
              value={it.dynamic_candle}
              onChange={(e) =>
                onChange(it.name, "dynamic_candle", Number(e.target.value))
              }
              className="bg-[#20242b] p-2 rounded text-gray-200"
            >
              {[60, 120, 300].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

            <select
              value={it.fixed_candle}
              onChange={(e) =>
                onChange(it.name, "fixed_candle", Number(e.target.value))
              }
              className="bg-[#20242b] p-2 rounded text-gray-200"
            >
              {[300, 600, 900].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexConfig;
