
// import React, { useEffect, useState } from "react";
// import type { IndexConfigItem, StrikeItem, PositionItem } from "../types/index"; 
// import { dashboardApi } from "../api/dashboardApi"; 
// import IndexConfig from "../components/dashboard/IndexConfig"; 
// import StrikeSelection from "../components/dashboard/StrikeSelection"; 
// import Operations from "../components/dashboard/Operations";
// import { socket } from "../socket"; 
// import FooterLayout from "../components/FooterLayout"; 
// import { FaSpinner } from "react-icons/fa";

// const DashboardPage: React.FC = () => {
//   const [config, setConfig] = useState<IndexConfigItem[]>([]);
//   const [strikes, setStrikes] = useState<StrikeItem[]>([]);
//   const [positions, setPositions] = useState<PositionItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadAll();

//     // Listen for real-time updates (Actual socket logic)
//     socket.on("updatePositions", (data: PositionItem[]) => {
//       setPositions(data);
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.off("updatePositions");
//     };
//   }, []);

//   const loadAll = async () => {
//     setLoading(true);
//     try {
//       const [cfg, s, p] = await Promise.all([
//         dashboardApi.fetchConfig(),
//         dashboardApi.fetchStrikes(),
//         dashboardApi.fetchPositions(),
//       ]);
//       setConfig(cfg);
//       setStrikes(s);
//       setPositions(p);
//     } catch (err) {
//       console.error("Dashboard load failed", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleConfigChange = async (
//     name: string,
//     key: keyof IndexConfigItem,
//     value: number
//   ) => {
//     // Optimistic Update
//     setConfig((prev) =>
//       prev.map((it) => (it.name === name ? { ...it, [key]: value } : it))
//     );

//     // Persist to backend
//     try {
//       await dashboardApi.updateConfig(name, key, value);
//     } catch (err) {
//       console.error("Config persistence failed", err);
//       // Revert data if persistence fails (or show error toast)
//       // loadAll();
//     }
//   };

//   const handleAction = async (button: string, index?: string) => {
//     try {
//       await dashboardApi.postOperation({ button, index });
//       // Emit operation to server
//       socket.emit("operation", { button, index });
//     } catch (err) {
//       console.error("operation failed", err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0d0f12] text-white flex  justify-center mt-10 ml-120  ">
//         <FaSpinner className="animate-spin flex  mr-2" /> Loading Dashboard Data...
//       </div>
//     );
//   }

//   return (
//     <div className="max-h-full bg-[#0d0f12] text-white p-4">
//       {/* <h1 className="text-xl font-bold mb-1">Trading Terminal</h1> */}

//       {/* Top Half: Configuration, Strikes, Operations */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         {/* Left/Middle Column (Config and Strikes) */}
//         <div className="lg:col-span-2 space-y-2 ">
//           <IndexConfig items={config} onChange={handleConfigChange} />
//           <StrikeSelection strikes={strikes} />
//         </div>

//         {/* Right Column (Operations) */}
//         <Operations onAction={handleAction} />
//       </div>

//       {/* Bottom Half: FooterLayout with Tabs (Positions, Order Book, etc.) */}
//       <FooterLayout positions={positions} />
//     </div>
//   );
// };

// export default DashboardPage;

import React, { useEffect, useState } from "react";
import type { IndexConfigItem, StrikeItem, PositionItem } from "../types/index";
import { dashboardApi } from "../api/dashboardApi";
import IndexConfig from "../components/dashboard/IndexConfig";
import StrikeSelection from "../components/dashboard/StrikeSelection";
import Operations from "../components/dashboard/Operations";
import FooterLayout from "../components/FooterLayout";
import { FaSpinner } from "react-icons/fa";

const DashboardPage: React.FC = () => {
  const [config, setConfig] = useState<IndexConfigItem[]>([]);
  const [strikes, setStrikes] = useState<StrikeItem[]>([]);
  const [positions, setPositions] = useState<PositionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [cfg, s, p] = await Promise.all([
        dashboardApi.fetchConfig(),
        dashboardApi.fetchStrikes(),
        dashboardApi.fetchPositions(),
      ]);
      setConfig(cfg);
      setStrikes(s);
      setPositions(p);
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfigChange = async (
    name: string,
    key: keyof IndexConfigItem,
    value: number
  ) => {
    // Optimistic Update
    setConfig((prev) =>
      prev.map((it) => (it.name === name ? { ...it, [key]: value } : it))
    );

    try {
      await dashboardApi.updateConfig(name, key, value);
    } catch (err) {
      console.error("Config persistence failed", err);
    }
  };

  const handleAction = async (button: string, index?: string) => {
    try {
      await dashboardApi.postOperation({ button, index });
    } catch (err) {
      console.error("Operation failed", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0f12] mt-10  text-white flex">
        <FaSpinner className="animate-spin mr-2" /> Loading Dashboard Data...
      </div>
    );
  }

  return (
    <div className="h-screen  bg-[#0d0f12] text-white p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left/Middle Column */}
        <div className="lg:col-span-2 space-y-2">
          <IndexConfig items={config} onChange={handleConfigChange} />
          <StrikeSelection strikes={strikes} />
        </div>

        {/* Right Column */}
        <Operations onAction={handleAction} />
      </div>

      {/* Footer with Positions */}
      <FooterLayout positions={positions} />
    </div>
  );
};

export default DashboardPage;
