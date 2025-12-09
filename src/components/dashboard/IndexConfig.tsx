// import React from "react";
// import type { IndexConfigItem } from "../../types/index";
// import { Settings } from "lucide-react";

// interface Props {
//   items: IndexConfigItem[];
//   onChange: (name: string, key: keyof IndexConfigItem, value: number) => void;
// }

// const IndexConfig: React.FC<Props> = ({ items, onChange }) => {
//   return (
//     <div className="bg-[#15181d] p-4 rounded-lg shadow-md">
//       <h2 className="text- font-extrabold text-white tracking-widest border-b border-gray-700 pb-2 mb-4">
//         <Settings className="inline w-5 h-5 mr-2 text-blue-400" />
//         INDEX CONFIGURATION
//       </h2>
//       <div className="space-y-3">
//         {items.map((it) => (
//           <div
//             key={it.name}
//             className="grid grid-cols-7 gap-2 text-xs items-center"
//           >
//             <div className="col-span-1 font-semibold">{it.name}</div>

//             <select
//               value={it.tf}
//               onChange={(e) => onChange(it.name, "tf", Number(e.target.value))}
//               className="bg-[#20242b] p-2 rounded text-gray-200"
//             >
//               {[1, 5, 15].map((v) => (
//                 <option key={v} value={v}>
//                   {v}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={it.lots}
//               onChange={(e) =>
//                 onChange(it.name, "lots", Number(e.target.value))
//               }
//               className="bg-[#20242b] p-2 rounded text-gray-200"
//             >
//               {[1, 3, 5].map((v) => (
//                 <option key={v} value={v}>
//                   {v}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={it.legs}
//               onChange={(e) =>
//                 onChange(it.name, "legs", Number(e.target.value))
//               }
//               className="bg-[#20242b] p-2 rounded text-gray-200"
//             >
//               {[1, 2, 3].map((v) => (
//                 <option key={v} value={v}>
//                   {v}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={it.dynamic_candle}
//               onChange={(e) =>
//                 onChange(it.name, "dynamic_candle", Number(e.target.value))
//               }
//               className="bg-[#20242b] p-2 rounded text-gray-200"
//             >
//               {[60, 120, 300].map((v) => (
//                 <option key={v} value={v}>
//                   {v}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={it.fixed_candle}
//               onChange={(e) =>
//                 onChange(it.name, "fixed_candle", Number(e.target.value))
//               }
//               className="bg-[#20242b] p-2 rounded text-gray-200"
//             >
//               {[300, 600, 900].map((v) => (
//                 <option key={v} value={v}>
//                   {v}
//                 </option>
//               ))}
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default IndexConfig;

import React from "react";
import { Settings } from "lucide-react";

// Mock type definition for demonstration purposes (you should keep your original import)
type IndexConfigItem = {
  name: string;
  tf: number;
  lots: number;
  legs: number;
  dynamic_candle: number;
  fixed_candle: number;
};

interface Props {
  items: IndexConfigItem[];
  onChange: (name: string, key: keyof IndexConfigItem, value: number) => void;
}

const IndexConfig: React.FC<Props> = ({ items, onChange }) => {
  // ADDED: Guard clause to prevent 'map' errors if 'items' is undefined or null
  if (!items || !Array.isArray(items)) {
    return (
      <div className="bg-[#15181d] text-gray-100 p-4 rounded-xl shadow-2xl w-full border border-gray-700">
        <h2 className=" font-bold text-white tracking-widest border-b border-gray-700 pb-2 mb-4">
          <Settings className="inline w-5 h-5 mr-2 text-blue-400" />
          INDEX CONFIGURATION
        </h2>
        <div className="text-center py-8 text-gray-500">
          Configuration data is missing. Please check the parent component's
          state.
        </div>
      </div>
    );
  }

  // Array of column headers, mapping to the order in the grid
  const headers = [
    "INDEX",
    "TF",
    "LOTS",
    "LEGS",
    "DYNAMIC CANDLE",
    "FIXED CANDLE",
  ];

  return (
    // Applied consistent dark background, rounded corners, and shadow
    <div className="bg-[#15181d] text-gray-100 p-4 rounded-xl shadow-2xl w-full border border-gray-700">
      {/* Enhanced Header Styling */}
      <h2 className="text-lg font-extrabold text-white tracking-widest border-b border-gray-700 pb-2 mb-4">
        <Settings className="inline w-5 h-5 mr-2 text-blue-400" />
        INDEX CONFIGURATION
      </h2>

      {/* Column Headers for the Configuration Table */}
      <div className="grid grid-cols-6 gap-3 text-xs font-bold text-gray-400 uppercase pb-2 mb-2 border-b border-gray-600">
        {/* The first column is the index name, giving it slightly more width */}
        <div className="col-span-1">INDEX</div>
        {/* The remaining 5 headers are dynamically mapped */}
        <div className="col-span-5 grid grid-cols-5 gap-3">
          {headers.slice(1).map((header) => (
            <div key={header}>{header}</div>
          ))}
        </div>
      </div>

      {/* Configuration Rows */}
      <div className="space-y-3">
        {items.map((it) => (
          <div
            key={it.name}
            className="grid grid-cols-6 gap-3 text-xs items-center"
          >
            {/* Index Name Column */}
            <div className="col-span-1 font-semibold text-white bg-gray-700 p-2 rounded-md shadow-inner text-center">
              {it.name}
            </div>

            {/* Configuration Selectors Container */}
            <div className="col-span-5 grid grid-cols-5 gap-3">
              {/* TF */}
              <select
                value={it.tf}
                onChange={(e) =>
                  onChange(it.name, "tf", Number(e.target.value))
                }
                className="bg-gray-800 p-2 rounded-lg text-gray-200 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
                {[1, 5, 15].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>

              {/* LOTS */}
              <select
                value={it.lots}
                onChange={(e) =>
                  onChange(it.name, "lots", Number(e.target.value))
                }
                className="bg-gray-800 p-2 rounded-lg text-gray-200 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
                {[1, 3, 5].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>

              {/* LEGS */}
              <select
                value={it.legs}
                onChange={(e) =>
                  onChange(it.name, "legs", Number(e.target.value))
                }
                className="bg-gray-800 p-2 rounded-lg text-gray-200 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
                {[1, 2, 3].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>

              {/* DYNAMIC CANDLE */}
              <select
                value={it.dynamic_candle}
                onChange={(e) =>
                  onChange(it.name, "dynamic_candle", Number(e.target.value))
                }
                className="bg-gray-800 p-2 rounded-lg text-gray-200 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
                {[60, 120, 300].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>

              {/* FIXED CANDLE */}
              <select
                value={it.fixed_candle}
                onChange={(e) =>
                  onChange(it.name, "fixed_candle", Number(e.target.value))
                }
                className="bg-gray-800 p-2 rounded-lg text-gray-200 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              >
                {[300, 600, 900].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexConfig;
