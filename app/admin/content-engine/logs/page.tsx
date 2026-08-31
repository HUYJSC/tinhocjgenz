"use client";

import { useState, useEffect } from "react";
import { History, RefreshCw, Filter, ShieldCheck, Clock, User, ArrowRight } from "lucide-react";
import { AuditLog } from "@/lib/content-engine/types";

export default function ContentEngineLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterAction, setFilterAction] = useState<string>("ALL");

  const loadLogs = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/content/logs");
      const data = await res.json();
      if (data.success) {
        setLogs(data.data);
      }
    } catch (err) {
      console.error("Lỗi nạp logs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (filterAction === "ALL") return true;
    return log.action === filterAction;
  });

  const getActionBadge = (action: AuditLog["action"]) => {
    switch (action) {
      case "publish":
        return <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-emerald-100 text-emerald-800">PUBLISH</span>;
      case "approve":
        return <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-blue-100 text-blue-800">APPROVE</span>;
      case "reject":
        return <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-rose-100 text-rose-800">REJECT</span>;
      case "ai_rewrite":
      case "ai_generate":
        return <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-purple-100 text-purple-800">AI ACTION</span>;
      case "source_fetch":
        return <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-cyan-100 text-cyan-800">CRAWLER</span>;
      case "source_add":
      case "source_edit":
      case "source_delete":
        return <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-amber-100 text-amber-800">SOURCE</span>;
      default:
        return <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-slate-100 text-slate-800">{action}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">Nhật Ký Hoạt Động & Kiểm Toán (Audit Logs)</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Theo dõi chi tiết toàn bộ lịch sử quét tin, AI chấm điểm, thao tác duyệt và xuất bản bài viết.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 font-semibold focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Tất cả hành động</option>
            <option value="publish">Xuất bản (Publish)</option>
            <option value="approve">Duyệt bài (Approve)</option>
            <option value="reject">Từ chối (Reject)</option>
            <option value="ai_rewrite">AI Viết lại</option>
            <option value="source_fetch">Quét tin (Crawler)</option>
            <option value="source_add">Thêm nguồn</option>
          </select>

          <button
            onClick={loadLogs}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
            <span>Làm Mới</span>
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200/80 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Thời Gian</th>
                <th className="px-4 py-3.5">Hành Động</th>
                <th className="px-4 py-3.5">Người Thực Hiện</th>
                <th className="px-4 py-3.5">Chi Tiết Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-slate-400">
                    <RefreshCw size={20} className="animate-spin text-blue-600 mx-auto mb-2" />
                    Đang tải nhật ký...
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-slate-400">
                    Chưa có nhật ký hoạt động nào.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                      {new Date(log.timestamp).toLocaleString("vi-VN")}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {getActionBadge(log.action)}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="font-bold text-slate-700">{log.user}</span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-800">
                      {log.details}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
