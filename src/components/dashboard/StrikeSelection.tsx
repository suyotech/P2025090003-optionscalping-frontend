
// import React, { useState } from "react";
// import type { StrikeItem } from "../../types/index";

// interface StrikeSelectionProps {
//   strikes: StrikeItem[];
//   onChange?: (index: string, key: keyof StrikeItem, value: number) => void;
// }

// const StrikeSelection: React.FC<StrikeSelectionProps> = ({
//   strikes,
//   onChange,
// }) => {
//   // Track toggle state for each index: ON = LOT enabled, OFF = CAPITAL enabled
//   const [lotEnabled, setLotEnabled] = useState<Record<string, boolean>>(() =>
//     strikes.reduce((acc, item) => {
//       acc[item.index] = true; // default ON = LOT enabled
//       return acc;
//     }, {} as Record<string, boolean>)
//   );

//   const handleToggle = (index: string) => {
//     setLotEnabled((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   const handleStrikeChange = (index: string, value: number) => {
//     if (onChange) onChange(index, "strikePrice", value);
//   };

//   return (
//     <div className="bg-[#181a1f] p-4 rounded-xl shadow-lg border border-[#2b2e35]">
//       <h2 className="text-sm font-semibold text-gray-400 mb-3">
//         STRIKE SELECTION
//       </h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-white text-xs">
//           <thead className="text-gray-400 border-b border-gray-700/50">
//             <tr>
//               <th className="py-2 px-3 text-left">INDEX</th>
//               <th className="py-2 px-3 text-left">STRIKE</th>
//               <th className="py-2 px-3 text-center">CAPITAL LOTS</th>
//               <th className="py-2 px-3 text-center">TOGGLE</th>
//               <th className="py-2 px-3 text-center">LOTS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {strikes.map((item) => {
//               const isLotEnabled = lotEnabled[item.index];

//               return (
//                 <tr key={item.index} className="border-b border-gray-800">
//                   {/* INDEX */}
//                   <td className="py-2 px-3 font-bold text-left">
//                     {item.index}
//                   </td>

//                   {/* STRIKE PRICE - always editable */}
//                   <td className="py-2 px-3 text-left font-mono">
//                     <input
//                       type="number"
//                       value={item.strikePrice || 0}
//                       onChange={(e) =>
//                         handleStrikeChange(item.index, Number(e.target.value))
//                       }
//                       className="w-24 bg-[#252830] border border-[#3c414d] rounded-md p-1 text-yellow-500"
//                     />
//                   </td>

//                   {/* CAPITAL LOTS */}
//                   <td className="py-2 px-3 text-center text-gray-300">
//                     <span className={`${isLotEnabled ? "opacity-50" : ""}`}>
//                       {item.capitalLots}
//                     </span>
//                   </td>

//                   {/* TOGGLE IN MIDDLE */}
//                   <td className="py-2 px-3 text-center">
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={isLotEnabled}
//                         onChange={() => handleToggle(item.index)}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
//                       <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-all"></div>
//                     </label>
//                   </td>

//                   {/* LOTS */}
//                   <td className="py-2 px-3 text-center text-gray-300">
//                     <span className={`${isLotEnabled ? "" : "opacity-50"}`}>
//                       {item.lots}
//                     </span>
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

// export default StrikeSelection;
import React, { useState } from "react";
import type { StrikeItem } from "../../types/index";

interface StrikeSelectionProps {
  strikes: StrikeItem[];
  onChange?: (index: string, key: keyof StrikeItem, value: number) => void;
}

const StrikeSelection: React.FC<StrikeSelectionProps> = ({
  strikes,
  onChange,
}) => {
  // Track toggle state for each index: ON = LOT enabled, OFF = CAPITAL enabled
  const [lotEnabled, setLotEnabled] = useState<Record<string, boolean>>(() =>
    strikes.reduce((acc, item) => {
      acc[item.index] = true; // default ON = LOT enabled
      return acc;
    }, {} as Record<string, boolean>)
  );

  const [strikeValues, setStrikeValues] = useState<Record<string, number>>(() =>
    strikes.reduce((acc, item) => {
      acc[item.index] = 0; // default value 0
      return acc;
    }, {} as Record<string, number>)
  );

  const handleToggle = (index: string) => {
    setLotEnabled((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Step logic based on index
  const getStep = (index: string) => {
    switch (index.toUpperCase()) {
      case "NIFTY":
        return 50;
      case "BANKN":
      case "BANKNIFTY":
        return 100;
      case "SENSEX":
        return 100;
      default:
        return 50;
    }
  };

  const handleStrikeChange = (index: string, value: number) => {
    const step = getStep(index);
    const roundedValue = Math.round(value / step) * step;

    setStrikeValues((prev) => ({ ...prev, [index]: roundedValue }));

    if (onChange) onChange(index, "strikePrice", roundedValue);
  };

  return (
    <div className="bg-[#181a1f] p-4 rounded-xl shadow-lg border border-[#2b2e35]">
      <h2 className="text-sm font-semibold text-gray-400 mb-3">
        STRIKE SELECTION
      </h2>
      <div className="overflow-auto">
        <table className="min-w-full text-white text-xs">
          <thead className="text-gray-400 border-b border-gray-700/50">
            <tr>
              <th className="py-2 px-3 text-left">INDEX</th>
              <th className="py-2 px-3 text-left">STRIKE</th>
              <th className="py-2 px-3 text-center">CAPITAL LOTS</th>
              <th className="py-2 px-3 text-center">TOGGLE</th>
              <th className="py-2 px-3 text-center">LOTS</th>
            </tr>
          </thead>
          <tbody>
            {strikes.map((item) => {
              const isLotEnabled = lotEnabled[item.index];
              const strikeValue = strikeValues[item.index] || 0;

              return (
                <tr key={item.index} className="border-b border-gray-800">
                  {/* INDEX */}
                  <td className="py-2 px-3 font-bold text-left">
                    {item.index}
                  </td>

                  {/* STRIKE PRICE - editable with step */}
                  <td className="py-2 px-3 text-left font-mono">
                    <input
                      type="number"
                      placeholder="0"
                      value={strikeValue}
                      step={getStep(item.index)}
                      onChange={(e) =>
                        handleStrikeChange(item.index, Number(e.target.value))
                      }
                      className="w-24 bg-[#252830] border border-[#3c414d] rounded-md p-1 text-yellow-500"
                    />
                  </td>

                  {/* CAPITAL LOTS */}
                  <td className="py-2 px-3 text-center text-gray-300">
                    <span className={`${isLotEnabled ? "opacity-50" : ""}`}>
                      {item.capitalLots}
                    </span>
                  </td>

                  {/* TOGGLE */}
                  <td className="py-2 px-3 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isLotEnabled}
                        onChange={() => handleToggle(item.index)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-all"></div>
                    </label>
                  </td>

                  {/* LOTS */}
                  <td className="py-2 px-3 text-center text-gray-300">
                    <span className={`${isLotEnabled ? "" : "opacity-50"}`}>
                      {item.lots}
                    </span>
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

export default StrikeSelection;
