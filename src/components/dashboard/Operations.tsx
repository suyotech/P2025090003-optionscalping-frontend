
// import React from "react";

// // Define the interface for the component props
// interface OperationsProps {
//   // onAction is a callback function that handles button clicks.
//   // It takes the button name and an optional index group (NIFTY, BANKN, etc.).
//   onAction: (button: string, index?: string) => Promise<void>;
// }

// // --- Operations Component ---
// const Operations: React.FC<OperationsProps> = ({ onAction }) => {
//   // Groups of indices for the row actions
//   const groups = ["NIFTY", "BANKN", "SENSEX"];

//   // Define all global action buttons, structured for the 2x3 layout
//   const globalActions = [
//     {
//       label: "EXIT CALL",
//       action: "EXIT_CALL",
//       color: "bg-red-600 hover:bg-red-700 scale-95",
//     },
//     {
//       label: "CLOSE ALL POSITIONS",
//       action: "CLOSE_ALL_POSITIONS",
//       color: "bg-red-600 hover:bg-red-700 scale-95",
//     },
//     {
//       label: "EXIT PUT",
//       action: "EXIT_PUT",
//       color: "bg-red-600 hover:bg-red-700",
//     },

//     {
//       label: "RSL CALL",
//       action: "RSL_CALL",
//       color: "bg-red-600 hover:bg-red-700",
//     },
//     {
//       label: "CANCEL ALL ORDERS",
//       action: "CANCEL_ALL_ORDERS",
//       color: "bg-red-600 hover:bg-red-700",
//     },
//     {
//       label: "RSL PUT",
//       action: "RSL_PUT",
//       color: "bg-red-600 hover:bg-red-700 ",
//     },
//   ];

//   // Define the index-specific buttons (NCP, NC, NP, BC, EXIT NC, EXIT NP)
//   const indexButtons = [
//     { label: "NCP", action: "NCP" },
//     { label: "NC", action: "NC" },
//     { label: "NP", action: "NP" },
//     { label: "BC", action: "BC" },
//     { label: "EXIT NC", action: "EXIT_NC" },
//     { label: "EXIT NP", action: "EXIT_NP" },
//   ];

//   // Helper to determine button color based on its function (Exit vs Entry/Carry)
//   const getButtonClass = (label: string) => {
//     // Apply red styling to buttons that include "EXIT"
//     if (label.includes("EXIT")) {
//       return "bg-red-600 hover:bg-red-700";
//     }
//     // Blue for all other actions (NCP, NC, NP, BC)
//     return "bg-blue-600 hover:bg-blue-700";
//   };

//   return (
//     // Styling matches the dark, rounded panel from the dashboard design
//     <div className="space-y-4 bg-[#15181d] text-gray-100 p-4 rounded-xl shadow-2xl w-full max-w-lg mx-auto border border-gray-700">
//       <h2 className="text-sm font-semibold text-gray-400 mb-3">OPERATIONS</h2>

//       {/* --- Index-Specific Operations (3 Rows of 6 buttons) --- */}
//       <div className="space-y-3">
//         {groups.map((g) => (
//           <div key={g} className="flex items-center gap-2">
//             {/* Index Label (NIFTY, BANKN, SENSEX) */}
//             <h3 className="text-sm font-semibold w-20 text-center flex-shrink-0 text-white p-2 bg-gray-700 rounded-md shadow-inner">
//               {g}
//             </h3>

//             {/* 6 Action Buttons Grid */}
//             <div className="grid grid-cols-6 flex-grow gap-2 text-xs font-medium">
//               {indexButtons.map((btn) => (
//                 <button
//                   key={btn.label}
//                   // Call the parent's onAction function with the specific action and index group
//                   onClick={() => onAction(btn.action, g)}
//                   className={`py-2 rounded-lg transition duration-200 shadow-md transform hover:scale-[1.02] ${getButtonClass(
//                     btn.label
//                   )}`}
//                 >
//                   {/* Replaces space with a newline for better visual fit on small buttons */}
//                   {btn.label.replace(" ", "\n")}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Separator line */}
//       <div className="h-px bg-gray-700 my-6"></div>

//       {/* --- Global Action Buttons (2 Rows of 3 buttons) --- */}
//       <div className="grid grid-cols-3 gap-2 text-xs font-bold uppercase">
//         {globalActions.map((item) => (
//           <button
//             key={item.action}
//             // Global actions do not require the index parameter
//             onClick={() => onAction(item.action)}
//             className={`py-1 rounded-lg transition duration-200 shadow-md ${item.color} transform hover:scale-[1.02]`}
//           >
//             {item.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Operations;
import React from "react";

// Define the interface for the component props
interface OperationsProps {
  onAction: (button: string, index?: string) => Promise<void>;
}

// --- Operations Component ---
const Operations: React.FC<OperationsProps> = ({ onAction }) => {
  const groups = ["NIFTY", "BANKN", "SENSEX"];

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

  const indexButtons = [
    { label: "NCP", action: "NCP" },
    { label: "NC", action: "NC" },
    { label: "NP", action: "NP" },
    { label: "BC", action: "BC" },
    { label: "EXIT NC", action: "EXIT_NC" },
    { label: "EXIT NP", action: "EXIT_NP" },
  ];

  const getButtonClass = (label: string) => {
    if (label.includes("EXIT")) return "bg-red-600 hover:bg-red-700 scale-95";
    return "bg-blue-600 hover:bg-blue-700 scale-95";
  };

  return (
    <div className="space-y-4 min-w-full bg-[#15181d] text-gray-100 p-4 rounded-xl shadow-2xl w-full max-w-lg mx-auto border border-gray-700">
      <h2 className="text-sm font-semibold text-gray-400 mb-3">OPERATIONS</h2>

      {/* Index-Specific Buttons */}
      <div className="space-y-3">
        {groups.map((g) => (
          <div key={g} className="flex items-center gap-2">
            <h3 className="text-sm font-semibold w-20 text-center flex-shrink-0 text-white p-2 bg-gray-700 rounded-md shadow-inner">
              {g}
            </h3>

            <div className="grid grid-cols-6 flex-grow gap-2 text-xs font-medium">
              {indexButtons.map((btn) => (
                <button
                  key={btn.label}
                  onClick={() => onAction(btn.action, g)}
                  className={`py-2 rounded-lg transition duration-200 shadow-md transform hover:scale-[1.02] ${getButtonClass(
                    btn.label
                  )}`}
                >
                  {btn.label.replace(" ", "\n")}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="h-px bg-gray-700 my-6"></div>

      {/* Global Buttons */}
      <div className="grid grid-cols-3 gap-2 text-xs font-bold uppercase">
        {globalActions.map((item) => (
          <button
            key={item.action}
            onClick={() => onAction(item.action)}
            className={`py-1 rounded-lg transition duration-200 shadow-md transform hover:scale-[1.02] scale-95 ${item.color}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Operations;
