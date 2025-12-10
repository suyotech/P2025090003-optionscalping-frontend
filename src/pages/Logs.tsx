import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { MdDownload } from "react-icons/md";
import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";

interface Log {
  ts: string;
  level: string;
  message: string;
}

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size] = useState(100);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [logToDelete, setLogToDelete] = useState<string | null>(null);
  const [deleteAll, setDeleteAll] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    if (selectedDate) fetchLogs(selectedDate, page);
  }, [selectedDate, page]);

  const fetchLogs = async (date: string, pageNumber: number) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/dashboard/logs`, {
        params: { date, page: pageNumber, size },
      });

      setLogs(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch {
      toast.error("Failed to fetch logs");
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteConfirm = (id?: string) => {
    setLogToDelete(id || null);
    setDeleteAll(!id);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteLog = async () => {
    try {
      await axiosInstance.delete(`/dashboard/logs/${logToDelete}`);
      toast.success("Log deleted");
      setLogs(logs.filter((log) => log.ts !== logToDelete));
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteConfirmOpen(false);
      setLogToDelete(null);
    }
  };

  const confirmDeleteAll = async () => {
    try {
      await axiosInstance.delete(`/dashboard/logs?date=${selectedDate}`);
      toast.success("All logs cleared");
      setLogs([]);
    } catch {
      toast.error("Failed to clear logs");
    } finally {
      setDeleteConfirmOpen(false);
      setDeleteAll(false);
    }
  };

  const downloadAllLogsCSV = () => {
    if (logs.length === 0) return toast.error("No logs to download");

    const headers = ["Timestamp", "Level", "Message", "Arguments"];
    const csvRows = [
      headers.join(","),
      ...logs.map(
        (log) =>
          `"${log.ts}","${log.level}","${log.message.replace(/"/g, "")}"`
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `logs-${selectedDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("CSV Downloaded");
  };

  return (
    <div className="w-screen h-full flex flex-col  text-white text-xs">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-gray-800 border border-gray-700 shadow-xl rounded-lg p-3 mb-3">
        <h1 className="text-sm font-bold">📜 System Logs</h1>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {/* Date Input */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setPage(1);
            }}
            className="px-2 py-1 rounded-lg border border-gray-600 bg-gray-700 text-white text-xs"
          />

          {/* Delete Button With Tooltip */}
          <div className="relative group">
            <button
              onClick={() => openDeleteConfirm()}
              disabled={logs.length === 0}
              className="px-3 py-2 bg-red-600 cursor-pointer scale-95 hover:bg-red-700 rounded text-white text-xs flex items-center gap-1"
            >
              <FaTrash />
            </button>

            <span className="absolute left-3/4 top-full mt-1 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
              Delete All Logs
            </span>
          </div>

          {/* Download Button With Tooltip */}
          <div className="relative group">
            <button
              onClick={downloadAllLogsCSV}
              disabled={logs.length === 0}
              className="px-3 py-2 bg-blue-600 cursor-pointer scale-95 hover:bg-blue-700 rounded text-white text-xs flex items-center gap-1"
            >
              <MdDownload />
            </button>

            {/* Tooltip BELOW */}
            <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
              Download CSV
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto bg-gray-800 border border-gray-700 rounded-lg">
        <table className="min-w-full text-[12px]">
          <thead className="bg-gray-700 text-white sticky top-0 z-10">
            <tr>
              <th className="py-2 text-center w-24">Timestamp</th>
              <th className="py-2 text-center">Level</th>
              <th className="py-2 text-center">Message</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-2 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : logs.length > 0 ? (
              logs.map((log, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="py-1 text-center">{log.ts}</td>

                  <td className="py-1 text-center">
                    <span
                      className={`px-2 py-1 rounded text-[10px] ${
                        log.level === "INFO"
                          ? "bg-blue-800 text-blue-300"
                          : log.level === "ERROR"
                          ? "bg-red-800 text-red-300"
                          : log.level === "WARN"
                          ? "bg-yellow-800 text-yellow-300"
                          : "bg-gray-600 text-gray-300"
                      }`}
                    >
                      {log.level}
                    </span>
                  </td>

                  <td className="py-1 px-2">{log.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-2 text-gray-400">
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FIXED Pagination at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-3 flex justify-between items-center text-xs shadow-xl">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-40"
        >
          <FaChevronLeft />
        </button>

        <span className="text-white">
          Page <b>{page}</b> / <b>{totalPages}</b>
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-40"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 text-xs w-72">
            <h2 className="text-sm font-bold text-red-400 mb-2">
              Confirm Delete
            </h2>

            <p className="text-gray-300 mb-4">
              Delete <b>{deleteAll ? "ALL logs" : "this log"}</b> for{" "}
              <span className="text-white">{selectedDate}</span>?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-3 py-1 bg-gray-600 rounded"
              >
                Cancel
              </button>

              <button
                onClick={deleteAll ? confirmDeleteAll : confirmDeleteLog}
                className="px-3 py-1 bg-red-600 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logs;
