import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { FaEdit, FaSave, FaBan, FaKey, FaSpinner } from "react-icons/fa";

interface BrokerData {
  brokerId: string;
  mpin: string;
  apiKey: string;
  totpkey: string;
  sessionId?: string;
}

const Broker: React.FC = () => {
  const [data, setData] = useState<BrokerData>({
    brokerId: "",
    mpin: "",
    apiKey: "",
    totpkey: "",
    sessionId: "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true); // Start as true for initial load
  const [sessionLoading, setSessionLoading] = useState(false);

  useEffect(() => {
    fetchBroker();
  }, []);

  const fetchBroker = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/dashboard/broker");
      const apiData = res.data.data;

      setData({
        brokerId: apiData.brokerid || "",
        mpin: apiData.mpin || "",
        apiKey: apiData.apikey || "",
        totpkey: apiData.totpkey || "",
        sessionId: "",
      });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch broker");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof BrokerData, value: string) => {
    setData({ ...data, [field]: value });
  };

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    fetchBroker();
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      const payload = {
        brokerid: data.brokerId,
        mpin: data.mpin,
        apikey: data.apiKey,
        totpkey: data.totpkey,
      };

      await axiosInstance.put("/dashboard/broker", payload);
      toast.success("Broker updated");
      setEditing(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleGenerateSession = async () => {
    try {
      setSessionLoading(true);
      const res = await axiosInstance.get("/dashboard/broker/generate-session");
      setData({ ...data, sessionId: res.data.sessionId });
      toast.success("Session generated");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed");
    } finally {
      setSessionLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4 bg-gray-900 text-white p-4 rounded-lg shadow border border-gray-800 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-sm font-bold text-blue-400 flex items-center gap-1.5">
          <FaKey className="text-blue-500 text-sm" /> Broker Credentials
        </h1>

        <button
          onClick={handleGenerateSession}
          disabled={sessionLoading || loading}
          className={`px-3 py-1.5 text-xs rounded-md cursor-pointer scale-95 font-semibold shadow 
            ${
              sessionLoading
                ? "bg-green-700"
                : "bg-green-600 hover:bg-green-500"
            }`}
        >
          {sessionLoading ? (
            <span className="flex items-center gap-1">
              <FaSpinner className="animate-spin" /> Loading
            </span>
          ) : (
            " Generate Session"
          )}
        </button>
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-3 relative">
        {["brokerId", "mpin", "apiKey", "totpkey"].map((field) => {
          const labels: any = {
            brokerId: "Broker ID",
            mpin: "MPIN",
            apiKey: "API Key",
            totpkey: "TOTP Key",
          };

          return (
            <div key={field} className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">{labels[field]}</label>
              <input
                type={
                  field === "mpin" || field === "totpkey" ? "password" : "text"
                }
                disabled={!editing || loading}
                className={`w-full px-2 py-1.5 text-xs rounded-md bg-gray-800 text-gray-200 
                  ${
                    editing
                      ? "border border-blue-500"
                      : "border border-gray-700"
                  }`}
                value={data[field as keyof BrokerData]}
                onChange={(e) =>
                  handleChange(field as keyof BrokerData, e.target.value)
                }
              />
            </div>
          );
        })}

        {data.sessionId && (
          <div className="bg-gray-800 p-3 rounded-md border border-blue-500/30 text-xs">
            <span className="text-blue-400 font-semibold">Session ID:</span>
            <p className="mt-1 text-gray-300 break-all">{data.sessionId}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 mt-2 justify-end">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="w-20 px-3 py-1.5 text-xs cursor-pointer scale-95 bg-blue-600 rounded-md hover:bg-blue-700"
              >
                <FaSave className="inline-block mr-1" /> Save
              </button>

              <button
                onClick={handleCancel}
                className="px-3 py-1.5 w-20 text-xs cursor-pointer scale-95 bg-gray-700 rounded-md hover:bg-gray-600"
              >
                <FaBan className="inline-block mr-1" /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="w-20 items-end justify-end cursor-pointer scale-95 px-3 py-1.5 text-xs bg-yellow-600 rounded-md hover:bg-yellow-500 text-black font-semibold"
            >
              <FaEdit className="inline-block mr-1" /> Edit
            </button>
          )}
        </div>

        {/* Loading overlay */}
        {/* {loading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
            <FaSpinner className="animate-spin text-white text-2xl" />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Broker;
