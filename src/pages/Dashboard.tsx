
import React, { useEffect, useState } from "react";
import type { IndexConfigItem, StrikeItem, PositionItem } from "../types/index";
import { dashboardApi } from "../api/dashboardApi";
import IndexConfig from "../components/dashboard/IndexConfig";
import StrikeSelection from "../components/dashboard/StrikeSelection";
import Operations from "../components/dashboard/Operations";
import FooterLayout from "../components/FooterLayout";
import Loading from "../components/Loading";

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

  // --- FIXED handleConfigChange ---
  const handleConfigChange = (
    name: string,
    key: keyof IndexConfigItem,
    value: number | boolean | number[]
  ) => {
    setConfig((prev) =>
      prev.map((it) => (it.name === name ? { ...it, [key]: value } : it))
    );

    // Only call API if value is number or boolean
    if (typeof value === "number" || typeof value === "boolean") {
      dashboardApi.updateConfig(name, key, value).catch((err) => {
        console.error("Config persistence failed", err);
      });
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
    return <Loading />;
  }

  return (
    <div className="min-h-screen w-full bg-[#0d0f12] text-white p-4 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left / Middle */}
        <div className="lg:col-span-2 space-y-2">
          <IndexConfig items={config} onChange={handleConfigChange} />
          <StrikeSelection strikes={strikes} />
        </div>

        {/* Right */}
        <Operations onAction={handleAction} />
      </div>

      {/* Footer */}
      <FooterLayout positions={positions} />
    </div>
  );
};

export default DashboardPage;
