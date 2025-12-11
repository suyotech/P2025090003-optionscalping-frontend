
// import React from "react";
// import type { IndexConfigItem } from "../../types/index";

// interface IndexConfigProps {
//   items: IndexConfigItem[];
//   onChange: (
//     name: string,
//     key: keyof IndexConfigItem,
//     value: number | boolean | number[]
//   ) => void;
// }

// const IndexConfig: React.FC<IndexConfigProps> = ({ items, onChange }) => {
//   const defaultCandle = [60, 120, 180, 240, 300];
//   const optionsTf = [1, 2, 3, 5];
//   const optionsLotsLegs = [1, 2, 3, 4, 5];

//   const handleToggle = (name: string, fixedOn: boolean) => {
//     onChange(name, "fixedCandleEnabled", fixedOn);
//     onChange(name, "dynamicEnabled", !fixedOn);
//   };

//   const handleDynamicInput = (
//     name: string,
//     value: number,
//     item: IndexConfigItem
//   ) => {
//     if (!value) return;

//     onChange(name, "dynamicCandle", value);

//     const customList = item.customCandleOptions || [];
//     const merged = [...defaultCandle, ...customList];

//     if (!merged.includes(value)) {
//       onChange(name, "customCandleOptions", [...customList, value]);
//     }
//   };

//   return (
//     <div className="bg-[#181a1f] p-4 rounded-xl shadow-lg border border-[#2b2e35]">
//       <h2 className="text-sm font-semibold text-gray-400 mb-3">
//         INDEX CONFIGURATION
//       </h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full text-white text-xs">
//           <thead className="text-gray-400 border-b border-gray-700/50">
//             <tr>
//               <th className="py-2 px-3 text-left">INDEX</th>
//               <th className="py-2 px-3 text-center">TF</th>
//               <th className="py-2 px-3 text-center">LOTS</th>
//               <th className="py-2 px-3 text-center">LEGS</th>
//               <th className="py-2 px-3 text-center">DYNAMIC</th>
//               <th className="py-2 px-3 text-center">TOGGLE</th>
//               <th className="py-2 px-3 text-center">FIXED</th>
//             </tr>
//           </thead>

//           <tbody>
//             {items.map((item) => {
//               const customList = item.customCandleOptions || [];

//               // merge default + custom options
//               const finalOptions = [...defaultCandle, ...customList]
//                 .filter((v, i, arr) => arr.indexOf(v) === i)
//                 .sort((a, b) => a - b);

//               return (
//                 <tr key={item.name} className="border-b border-gray-800">
//                   <td className="py-2 px-3 font-bold text-left">{item.name}</td>

//                   {/* TF */}
//                   <td className="py-2 px-3 text-center">
//                     <select
//                       value={item.tf}
//                       onChange={(e) =>
//                         onChange(item.name, "tf", Number(e.target.value))
//                       }
//                       className="w-16 bg-[#252830] border border-[#3c414d] rounded-md p-1"
//                     >
//                       {optionsTf.map((opt) => (
//                         <option key={opt} value={opt}>
//                           {opt}
//                         </option>
//                       ))}
//                     </select>
//                   </td>

//                   {/* LOTS */}
//                   <td className="py-2 px-3 text-center">
//                     <select
//                       value={item.lots}
//                       onChange={(e) =>
//                         onChange(item.name, "lots", Number(e.target.value))
//                       }
//                       className="w-16 bg-[#252830] border border-[#3c414d] rounded-md p-1"
//                     >
//                       {optionsLotsLegs.map((opt) => (
//                         <option key={opt} value={opt}>
//                           {opt}
//                         </option>
//                       ))}
//                     </select>
//                   </td>

//                   {/* LEGS */}
//                   <td className="py-2 px-3 text-center">
//                     <select
//                       value={item.legs}
//                       onChange={(e) =>
//                         onChange(item.name, "legs", Number(e.target.value))
//                       }
//                       className="w-16 bg-[#252830] border border-[#3c414d] rounded-md p-1"
//                     >
//                       {optionsLotsLegs.map((opt) => (
//                         <option key={opt} value={opt}>
//                           {opt}
//                         </option>
//                       ))}
//                     </select>
//                   </td>

//                   {/* 🔥 DYNAMIC CANDLE (single input + dropdown using datalist) */}
//                   <td className="py-2 px-3 text-center">
//                     <input
//                       type="number"
//                       list={`dynamic-options-${item.name}`}
//                       value={item.dynamicCandle}
//                       disabled={!item.dynamicEnabled}
//                       onChange={(e) =>
//                         handleDynamicInput(
//                           item.name,
//                           Number(e.target.value),
//                           item
//                         )
//                       }
//                       className="w-32 bg-[#252830] border border-[#3c414d] rounded-md p-1 disabled:opacity-50"
//                     />
//                     <datalist id={`dynamic-options-${item.name}`}>
//                       {finalOptions.map((opt) => (
//                         <option key={opt} value={opt} />
//                       ))}
//                     </datalist>
//                   </td>

//                   {/* TOGGLE */}
//                   <td className="py-2 px-3 text-center">
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={item.fixedCandleEnabled}
//                         onChange={(e) =>
//                           handleToggle(item.name, e.target.checked)
//                         }
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
//                       <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-all"></div>
//                     </label>
//                   </td>

//                   {/* FIXED CANDLE */}
//                   <td className="py-2 px-3 text-center">
//                     <select
//                       value={item.fixedCandle}
//                       disabled={!item.fixedCandleEnabled}
//                       onChange={(e) =>
//                         onChange(
//                           item.name,
//                           "fixedCandle",
//                           Number(e.target.value)
//                         )
//                       }
//                       className="w-24 bg-[#252830] border border-[#3c414d] rounded-md p-1 disabled:opacity-50"
//                     >
//                       {defaultCandle.map((opt) => (
//                         <option key={opt} value={opt}>
//                           {opt}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default IndexConfig;

import React from "react";
import type { IndexConfigItem } from "../../types/index";

interface IndexConfigProps {
  items: IndexConfigItem[];
  onChange: (
    name: string,
    key: keyof IndexConfigItem,
    value: number | boolean | number[]
  ) => void;
}

const IndexConfig: React.FC<IndexConfigProps> = ({ items, onChange }) => {
  const defaultCandle = [60, 120, 180, 240, 300];
  const optionsTf = [1, 2, 3, 5];
  const optionsLotsLegs = [1, 2, 3, 4, 5];

  const handleToggle = (name: string, fixedOn: boolean) => {
    onChange(name, "fixedCandleEnabled", fixedOn);
    onChange(name, "dynamicEnabled", !fixedOn);
  };

  const handleDynamicInput = (
    name: string,
    value: number,
    item: IndexConfigItem
  ) => {
    if (!value) return;

    onChange(name, "dynamicCandle", value);

    // ensure customCandleOptions is always an array
    const customList: number[] = Array.isArray(item.customCandleOptions)
      ? item.customCandleOptions
      : [];

    const merged = [...defaultCandle, ...customList];

    if (!merged.includes(value)) {
      onChange(name, "customCandleOptions", [...customList, value]);
    }
  };

  return (
    <div className="bg-[#181a1f] p-4 rounded-xl shadow-lg border border-[#2b2e35]">
      <h2 className="text-sm font-semibold text-gray-400 mb-3">
        INDEX CONFIGURATION
      </h2>

      <div className="overflow-auto">
        <table className="min-w-full text-white text-xs">
          <thead className="text-gray-400 border-b border-gray-700/50">
            <tr>
              <th className="py-2 px-3 text-left">INDEX</th>
              <th className="py-2 px-3 text-center">TF</th>
              <th className="py-2 px-3 text-center">LOTS</th>
              <th className="py-2 px-3 text-center">LEGS</th>
              <th className="py-2 px-3 text-center">DYNAMIC</th>
              <th className="py-2 px-3 text-center">TOGGLE</th>
              <th className="py-2 px-3 text-center">FIXED</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => {
              const customList: number[] = Array.isArray(
                item.customCandleOptions
              )
                ? item.customCandleOptions
                : [];

              const finalOptions = [...defaultCandle, ...customList]
                .filter((v, i, arr) => arr.indexOf(v) === i)
                .sort((a, b) => a - b);

              return (
                <tr key={item.name} className="border-b border-gray-800">
                  <td className="py-2 px-3 font-bold text-left">{item.name}</td>

                  {/* TF */}
                  <td className="py-2 px-3 text-center">
                    <select
                      value={item.tf}
                      onChange={(e) =>
                        onChange(item.name, "tf", Number(e.target.value))
                      }
                      className="w-16 bg-[#252830] border border-[#3c414d] rounded-md p-1"
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
                      className="w-16 bg-[#252830] border border-[#3c414d] rounded-md p-1"
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
                      className="w-16 bg-[#252830] border border-[#3c414d] rounded-md p-1"
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
                    <input
                      type="number"
                      list={`dynamic-options-${item.name}`}
                      value={item.dynamicCandle}
                      disabled={!item.dynamicEnabled}
                      onChange={(e) =>
                        handleDynamicInput(
                          item.name,
                          Number(e.target.value),
                          item
                        )
                      }
                      className="w-32 bg-[#252830] border border-[#3c414d] rounded-md p-1 disabled:opacity-50"
                    />
                    <datalist id={`dynamic-options-${item.name}`}>
                      {finalOptions.map((opt) => (
                        <option key={opt} value={opt} />
                      ))}
                    </datalist>
                  </td>

                  {/* TOGGLE */}
                  <td className="py-2 px-3 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.fixedCandleEnabled}
                        onChange={(e) =>
                          handleToggle(item.name, e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-all"></div>
                    </label>
                  </td>

                  {/* FIXED CANDLE */}
                  <td className="py-2 px-3 text-center">
                    <select
                      value={item.fixedCandle}
                      disabled={!item.fixedCandleEnabled}
                      onChange={(e) =>
                        onChange(
                          item.name,
                          "fixedCandle",
                          Number(e.target.value)
                        )
                      }
                      className="w-24 bg-[#252830] border border-[#3c414d] rounded-md p-1 disabled:opacity-50"
                    >
                      {defaultCandle.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IndexConfig;
