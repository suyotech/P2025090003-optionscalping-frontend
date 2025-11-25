import React, { useEffect, useState } from "react";
import type {
  IndexConfigItem,
  StrikeItem,
  PositionItem,
} from "../../types/index";
import { dashboardApi } from "../../api/dashboardApi";
import IndexConfig from "../../components/dashboard/IndexConfig";
import StrikeSelection from "../../components/dashboard/StrikeSelection";
import PositionsTable from "../../components/dashboard/PositionsTable";
import Operations from "../../components/dashboard/Operations";

const DashboardPage: React.FC = () => {
  const [config, setConfig] = useState<IndexConfigItem[]>([]);
  const [strikes, setStrikes] = useState<StrikeItem[]>([]);
  const [positions, setPositions] = useState<PositionItem[]>([]);
  const [loading, setLoading] = useState(false);

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

  const handleConfigChange = (
    name: string,
    key: keyof IndexConfigItem,
    value: number
  ) => {
    setConfig((prev) =>
      prev.map((it) => (it.name === name ? { ...it, [key]: value } : it))
    );
  };

  const handleAction = async (button: string, index?: string) => {
    try {
      await dashboardApi.postOperation({ button, index });
      await loadAll();
    } catch (err) {
      console.error("operation failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f12] text-white p-4">
      <h1 className="text-xl font-bold mb-4">Trading Terminal</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <IndexConfig items={config} onChange={handleConfigChange} />
          <StrikeSelection strikes={strikes} />
        </div>
        <Operations onAction={handleAction} />
      </div>
      <PositionsTable positions={positions} refresh={loadAll} />
    </div>
  );
};

export default DashboardPage;
