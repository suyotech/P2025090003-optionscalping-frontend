import React, { useState, useMemo } from "react";
import Positions from "../pages/Footerlayout/Positions";
import Orderbook from "../pages/Footerlayout/Orderbook";
import Tradebook from "../pages/Footerlayout/Tradebook";
import Funds from "../pages/Footerlayout/Funds";
import { FaSyncAlt } from "react-icons/fa";
import type { PositionItem } from "../types/index";

// Define the props for FooterLayout
interface FooterLayoutProps {
  positions: PositionItem[];
  // You can pass other data here (e.g., orderbookData, tradebookData, mtm, loss)
}

// Define the tab keys
type TabKey = "POSITIONS" | "ORDER BOOK" | "TRADE BOOK" | "FUNDS";

// Mock data for MTM/Loss display (replace with actual props/state if available)
const MOCK_MTM = 2500;
const MOCK_TARGET = 15000;
const MOCK_LOSS = 1000;

const FooterLayout: React.FC<FooterLayoutProps> = ({ positions }) => {
  const [activeTab, setActiveTab] = useState<TabKey>("POSITIONS");

  // Renders the component based on the active tab
  const renderContent = useMemo(() => {
    switch (activeTab) {
      case "POSITIONS":
        return <Positions positions={positions} />;
      case "ORDER BOOK":
        return <Orderbook />;
      case "TRADE BOOK":
        return <Tradebook />;
      case "FUNDS":
        return <Funds />;
      default:
        return null;
    }
  }, [activeTab, positions]);

  // Tab button styling component
  const TabButton: React.FC<{ tab: TabKey }> = ({ tab }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-sm  transition-colors duration-200 ${
        activeTab === tab
          ? "bg-[#1e2025] text-white border-r border-gray-700" // Active tab style
          : "bg-transparent text-gray-400 hover:text-white hover:bg-[#1e2025]" // Inactive tab style
      }`}
    >
      {tab}
    </button>
  );

  return (
    <div className="mt-4 min-h-screen bg-[#0d0f12] rounded-xl overflow-hidden border border-[#2b2e35] shadow-lg">
      {/* Tab Navigation and Info Bar */}
      <div className="flex justify-between items-center bg-[#181a1f] border-b border-gray-700 p-1">
        {/* Tabs */}
        <div className="flex">
          <TabButton tab="POSITIONS" />
          <TabButton tab="ORDER BOOK" />
          <TabButton tab="TRADE BOOK" />
          <TabButton tab="FUNDS" />
        </div>

        {/* Action and Info Section */}
        <div className="flex items-center gap-4 pr-3">
          <button className="flex items-center gap-1 text-gray-400 hover:text-white text-sm p-1 rounded transition-colors duration-200">
            <FaSyncAlt className="w-4 h-4" />
            <span className="hidden sm:inline">REFRESH</span>
          </button>

          <div className="text-sm font-mono whitespace-nowrap">
            <span className="mr-2">MTM: </span>
            <span
              className={` ${
                MOCK_MTM >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {MOCK_MTM >= 0 ? `+₹${MOCK_MTM}` : `-₹${Math.abs(MOCK_MTM)}`}
            </span>
            <span className="mx-2 text-gray-600">|</span>
            <span className="mr-2">TARGET: </span>
            <span className="text-yellow-400">₹{MOCK_TARGET}</span>
            <span className="mx-2 text-gray-600">|</span>
            <span className="mr-2">LOSS: </span>
            <span className="text-red-400">₹{MOCK_LOSS}</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full">{renderContent}</div>
    </div>
  );
};

export default FooterLayout;
