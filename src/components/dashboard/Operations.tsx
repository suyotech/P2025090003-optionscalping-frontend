// import React from "react";

// interface Props {
//   onAction: (button: string, index?: string) => Promise<void>;
// }

// const Operations: React.FC<Props> = ({ onAction }) => {
//   const groups = ["NIFTY", "BANKN", "SENSEX"];
//   return (
//     <div className="space-y-4 bg-[#15181d] p-4 rounded-lg shadow-md">
//       <h2 className="text-sm font-semibold mb-3">OPERATIONS</h2>

//       {groups.map((g) => (
//         <div key={g}>
//           <h3 className="text-xs mb-1">{g}</h3>
//           <div className="grid grid-cols-6 gap-2 text-xs">
//             {["NCP", "NC", "NP", "BC", "EXIT NC", "EXIT NP"].map((btn) => (
//               <button
//                 key={btn}
//                 onClick={() => onAction(btn, g)}
//                 className={`py-2 rounded ${
//                   btn === "EXIT" ? "bg-red-600" : "bg-blue-600"
//                 }`}
//               >
//                 {btn}
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}

//       <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
//         <button
//           onClick={() => onAction("EXIT_CALL")}
//           className="bg-red-600 py-2 rounded"
//         >
//           EXIT CALL
//         </button>
//         <button
//           onClick={() => onAction("CLOSE_ALL")}
//           className="bg-red-600 py-2 rounded"
//         >
//           CLOSE ALL POSITIONS
//         </button>
//         <button
//           onClick={() => onAction("CANCEL_ALL")}
//           className="bg-red-600 py-2 rounded col-span-2"
//         >
//           CANCEL ALL ORDERS
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Operations;


import React from "react";
import { Zap } from "lucide-react";

// Define the interface for the component props
interface OperationsProps {
  // onAction is a callback function that handles button clicks.
  // It takes the button name and an optional index group (NIFTY, BANKN, etc.).
  onAction: (button: string, index?: string) => Promise<void>;
}

// --- Operations Component ---
const Operations: React.FC<OperationsProps> = ({ onAction }) => {
  // Groups of indices for the row actions
  const groups = ["NIFTY", "BANKN", "SENSEX"];

  // Define all global action buttons, structured for the 2x3 layout
  const globalActions = [
    {
      label: "EXIT CALL",
      action: "EXIT_CALL",
      color: "bg-red-600 hover:bg-red-700",
    },
    {
      label: "CLOSE ALL POSITIONS",
      action: "CLOSE_ALL_POSITIONS",
      color: "bg-red-600 hover:bg-red-700",
    },
    {
      label: "EXIT PUT",
      action: "EXIT_PUT",
      color: "bg-red-600 hover:bg-red-700",
    },

    {
      label: "RSL CALL",
      action: "RSL_CALL",
      color: "bg-red-600 hover:bg-red-700",
    },
    {
      label: "CANCEL ALL ORDERS",
      action: "CANCEL_ALL_ORDERS",
      color: "bg-red-600 hover:bg-red-700",
    },
    {
      label: "RSL PUT",
      action: "RSL_PUT",
      color: "bg-red-600 hover:bg-red-700",
    },
  ];

  // Define the index-specific buttons (NCP, NC, NP, BC, EXIT NC, EXIT NP)
  const indexButtons = [
    { label: "NCP", action: "NCP" },
    { label: "NC", action: "NC" },
    { label: "NP", action: "NP" },
    { label: "BC", action: "BC" },
    { label: "EXIT NC", action: "EXIT_NC" },
    { label: "EXIT NP", action: "EXIT_NP" },
  ];

  // Helper to determine button color based on its function (Exit vs Entry/Carry)
  const getButtonClass = (label: string) => {
    // Apply red styling to buttons that include "EXIT"
    if (label.includes("EXIT")) {
      return "bg-red-600 hover:bg-red-700";
    }
    // Blue for all other actions (NCP, NC, NP, BC)
    return "bg-blue-600 hover:bg-blue-700";
  };

  return (
    // Styling matches the dark, rounded panel from the dashboard design
    <div className="space-y-4 bg-[#15181d] text-gray-100 p-4 rounded-xl shadow-2xl w-full max-w-lg mx-auto border border-gray-700">
      <h2 className="text-lg font-bold text-white tracking-widest border-b border-gray-700 pb-2 mb-4">
        <Zap className="inline w-5 h-5 mr-2 text-yellow-400" />
        OPERATIONS
      </h2>

      {/* --- Index-Specific Operations (3 Rows of 6 buttons) --- */}
      <div className="space-y-5">
        {groups.map((g) => (
          <div key={g} className="flex items-center gap-4">
            {/* Index Label (NIFTY, BANKN, SENSEX) */}
            <h3 className="text-sm font-semibold w-20 text-center flex-shrink-0 text-white p-2 bg-gray-700 rounded-md shadow-inner">
              {g}
            </h3>

            {/* 6 Action Buttons Grid */}
            <div className="grid grid-cols-6 flex-grow gap-2 text-xs font-medium">
              {indexButtons.map((btn) => (
                <button
                  key={btn.label}
                  // Call the parent's onAction function with the specific action and index group
                  onClick={() => onAction(btn.action, g)}
                  className={`py-2 rounded-lg transition duration-200 shadow-md transform hover:scale-[1.02] ${getButtonClass(
                    btn.label
                  )}`}
                >
                  {/* Replaces space with a newline for better visual fit on small buttons */}
                  {btn.label.replace(" ", "\n")}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Separator line */}
      <div className="h-px bg-gray-700 my-6"></div>

      {/* --- Global Action Buttons (2 Rows of 3 buttons) --- */}
      <div className="grid grid-cols-3 gap-2 text-xs font-bold uppercase">
        {globalActions.map((item) => (
          <button
            key={item.action}
            // Global actions do not require the index parameter
            onClick={() => onAction(item.action)}
            className={`py-3 rounded-lg transition duration-200 shadow-md ${item.color} transform hover:scale-[1.02]`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Operations;