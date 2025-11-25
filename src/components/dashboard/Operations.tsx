import React from "react";

interface Props {
  onAction: (button: string, index?: string) => Promise<void>;
}

const Operations: React.FC<Props> = ({ onAction }) => {
  const groups = ["NIFTY", "BANKN", "SENSEX"];
  return (
    <div className="space-y-4 bg-[#15181d] p-4 rounded-lg shadow-md">
      <h2 className="text-sm font-semibold mb-3">OPERATIONS</h2>

      {groups.map((g) => (
        <div key={g}>
          <h3 className="text-xs mb-1">{g}</h3>
          <div className="grid grid-cols-6 gap-2 text-xs">
            {["NC", "NCP", "NP", "BC", "BP", "EXIT"].map((btn) => (
              <button
                key={btn}
                onClick={() => onAction(btn, g)}
                className={`py-2 rounded ${
                  btn === "EXIT" ? "bg-red-600" : "bg-blue-600"
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
        <button
          onClick={() => onAction("EXIT_CALL")}
          className="bg-red-600 py-2 rounded"
        >
          EXIT CALL
        </button>
        <button
          onClick={() => onAction("CLOSE_ALL")}
          className="bg-red-600 py-2 rounded"
        >
          CLOSE ALL POSITIONS
        </button>
        <button
          onClick={() => onAction("CANCEL_ALL")}
          className="bg-red-600 py-2 rounded col-span-2"
        >
          CANCEL ALL ORDERS
        </button>
      </div>
    </div>
  );
};

export default Operations;
