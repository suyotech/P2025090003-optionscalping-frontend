// import React from "react";
// import type { StrikeItem } from "../../types/index";

// interface Props {
//   strikes: StrikeItem[];
// }

// const StrikeSelection: React.FC<Props> = ({ strikes }) => {
//   return (
//     <div className="bg-[#15181d] p-4 rounded-lg shadow-md">
//       <h2 className="text-sm font-semibold mb-3">STRIKE SELECTION</h2>
//       <table className="w-full text-xs table-fixed">
//         <thead>
//           <tr className="text-left text-gray-400 border-b border-gray-700">
//             <th className="p-2 w-1/4">INDEX</th>
//             <th className="p-2 w-1/4">STRIKE</th>
//             <th className="p-2 w-1/4">CAPITAL LOTS</th>
//             <th className="p-2 w-1/4">LOTS</th>
//           </tr>
//         </thead>
//         <tbody>
//           {strikes.map((s) => (
//             <tr
//               key={`${s.index}-${s.strike}`}
//               className="border-b border-gray-800"
//             >
//               <td className="p-2">{s.index}</td>
//               <td className="p-2">{s.strike}</td>
//               <td className="p-2">{s.capital.toLocaleString()}</td>
//               <td className="p-2">{s.lots}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StrikeSelection;
// src/components/dashboard/StrikeSelection.tsx

import React from "react";
import type { StrikeItem } from "../../types/index";

interface StrikeSelectionProps {
  strikes: StrikeItem[];
}

const StrikeSelection: React.FC<StrikeSelectionProps> = ({ strikes }) => {
  return (
    <div className="bg-[#181a1f] p-4 rounded-xl shadow-lg border border-[#2b2e35]">
      <h2 className="text-sm font-semibold text-gray-400 mb-3">STRIKE SELECTION</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-white text-xs">
          <thead className="text-gray-400 border-b border-gray-700/50">
            <tr>
              <th className="py-2 px-3 text-left">INDEX</th>
              <th className="py-2 px-3 text-left">STRIKE</th>
              <th className="py-2 px-3 text-center">CAPITAL LOTS</th>
              <th className="py-2 px-3 text-center">LOTS</th>
            </tr>
          </thead>
          <tbody>
            {strikes.map((item) => (
              <tr key={item.index} className="border-b border-gray-800">
                <td className="py-2 px-3 font-bold text-left">{item.index}</td>
                <td className="py-2 px-3 text-left font-mono text-yellow-500">{item.strikePrice}</td>
                <td className="py-2 px-3 text-center text-gray-300">{item.capitalLots}</td>
                <td className="py-2 px-3 text-center text-gray-300">{item.lots}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StrikeSelection;