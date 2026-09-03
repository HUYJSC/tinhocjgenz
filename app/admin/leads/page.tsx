"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Users,
  Phone,
  Search,
  Download,
  Trash2,
  RefreshCw,
  Clock,
  MessageSquare,
  ChevronRight,
  X,
  Send,
  ShieldCheck,
  Building,
  User
} from "lucide-react";
import { LeadRecord, LeadStatus } from "@/lib/leads-store";

const PIPELINE_STAGES: { id: LeadStatus | "ALL"; label: string; color: string }[] = [
  { id: "ALL", label: "Tất Cả", color: "bg-slate-800 text-slate-300" },
  { id: "NEW", label: "Mới Tiếp Nhận", color: "bg-blue-950 text-blue-300 border-blue-800/60" },
  { id: "CONTACTING", label: "Đang Liên Hệ", color: "bg-amber-950 text-amber-300 border-amber-800/60" },
  { id: "CONSULTED", label: "Đã Tư Vấn", color: "bg-purple-950 text-purple-300 border-purple-800/60" },
  { id: "RESERVED", label: "Đã Giữ Chỗ", color: "bg-teal-950 text-teal-300 border-teal-800/60" },
  { id: "PAID", label: "Đã Đóng Phí", color: "bg-emerald-950 text-emerald-300 border-emerald-800/60" },
  { id: "ENROLLED", label: "Đã Vào Lớp", color: "bg-indigo-950 text-indigo-300 border-indigo-800/60" },
  { id: "LOST", label: "Hủy / Mất Lead", color: "bg-rose-950 text-rose-300 border-rose-800/60" },
];

export default function AdminLeadsCRMPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [leadFilter, setLeadFilter] = useState<LeadStatus | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [canExport, setCanExport] = useState(false);
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [newActivityNote, setNewActivityNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setLeads(json.data);
          setCanExport(Boolean(json.canExport));
          if (selectedLead) {
            const fresh = json.data.find((l: LeadRecord) => l.id === selectedLead.id);
            if (fresh) setSelectedLead(fresh);
          }
        }
      }
    } catch (e) {
      console.warn("Lỗi tải leads:", e);
    } finally {
      setLoading(false);
    }
  }, [selectedLead]);

  useEffect(() => {
    loadLeads();
  }, []);

  const filteredLeads = leads.filter((l) => {
    const matchesFilter = leadFilter === "ALL" || l.status === leadFilter;
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.university && l.university.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleUpdateStatus = async (id: string, newStatus: LeadStatus) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    try {
      await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      await loadLeads();
    } catch {}
  };

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newActivityNote.trim()) return;

    setSavingNote(true);
    try {
      await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedLead.id,
          activityType: "NOTE",
          activityContent: newActivityNote.trim(),
        }),
      });
      setNewActivityNote("");
      await loadLeads();
    } catch {
      alert("Lỗi lưu ghi chú hoạt động.");
    } finally {
      setSavingNote(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (confirm("Xóa thông tin học viên này khỏi CRM?")) {
      setLeads(leads.filter((l) => l.id !== id));
      if (selectedLead?.id === id) setSelectedLead(null);
      try {
        await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
      } catch {}
    }
  };

  const handleExportCSV = () => {
    window.location.href = "/api/admin/leads/export";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-display">
            <Users className="text-emerald-400" />
            <span>CRM Tiếp Nhận & Tư Vấn Học Viên</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pipeline 7 bước chuẩn: Bảo vệ PII (che số điện thoại), lưu vết hoạt động không ghi đè, xuất dữ liệu có kiểm soát.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadLeads}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
            title="Làm mới dữ liệu"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
          {canExport && (
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all shadow-md shadow-emerald-600/30 cursor-pointer"
            >
              <Download size={14} />
              <span>Xuất CSV (Excel)</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Status Pipeline Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
          {PIPELINE_STAGES.map((tab) => {
            const count = tab.id === "ALL" ? leads.length : leads.filter((l) => l.status === tab.id).length;
            const active = leadFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setLeadFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? "bg-blue-600 text-white shadow-sm font-black"
                    : "bg-slate-800/80 text-slate-400 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] px-1 rounded-full bg-slate-900/60 font-mono">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tên, số điện thoại, trường..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table & Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads Table */}
        <div className={`bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden ${selectedLead ? "lg:col-span-2" : "lg:col-span-3"}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-black text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Học Viên</th>
                  <th className="py-3.5 px-4">Khóa Học</th>
                  <th className="py-3.5 px-4">Trạng Thái Pipeline</th>
                  <th className="py-3.5 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-500">
                      <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-blue-500" />
                      Đang tải danh sách học viên...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-500">
                      Không có học viên nào trong danh mục này.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className={`hover:bg-slate-800/40 transition-colors cursor-pointer ${
                        selectedLead?.id === lead.id ? "bg-slate-800/60 border-l-4 border-l-blue-500" : ""
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm flex items-center gap-1.5">
                          <span>{lead.name}</span>
                          {canExport && (
                            <span className="text-[10px] text-emerald-400 font-mono font-normal">
                              (Đầy đủ PII)
                            </span>
                          )}
                        </div>
                        <div className="text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                          <Phone size={11} className="text-blue-400" />
                          <span>{lead.phone}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[200px]">
                          {lead.university} • {lead.date}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-800/60 text-xs font-bold">
                          {lead.course}
                        </span>
                      </td>
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value as LeadStatus)}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-950 border border-slate-700 text-white focus:outline-none cursor-pointer"
                        >
                          <option value="NEW">Mới Tiếp Nhận (NEW)</option>
                          <option value="CONTACTING">Đang Liên Hệ (CONTACTING)</option>
                          <option value="CONSULTED">Đã Tư Vấn (CONSULTED)</option>
                          <option value="RESERVED">Đã Giữ Chỗ (RESERVED)</option>
                          <option value="PAID">Đã Đóng Phí (PAID)</option>
                          <option value="ENROLLED">Đã Vào Lớp (ENROLLED)</option>
                          <option value="LOST">Hủy / Mất Lead (LOST)</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-300 transition-colors cursor-pointer"
                          title="Xóa học viên"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timeline & Activities Drawer */}
        {selectedLead && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl animate-fade-in space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-blue-400" />
                  <h3 className="text-sm font-black text-white">{selectedLead.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="py-3 space-y-1.5 text-xs text-slate-300 border-b border-slate-800">
                <div>
                  Số điện thoại: <strong className="font-mono text-white">{selectedLead.phone}</strong>
                </div>
                <div>
                  Khóa học: <strong className="text-blue-400">{selectedLead.course}</strong>
                </div>
                <div>
                  Trường/Nơi làm việc: <span className="text-slate-400">{selectedLead.university}</span>
                </div>
                <div>
                  Nhu cầu ban đầu: <p className="text-slate-300 italic mt-0.5">"{selectedLead.note}"</p>
                </div>
              </div>

              {/* Timeline list */}
              <div className="mt-4">
                <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
                  <Clock size={13} className="text-purple-400" />
                  <span>Dòng Lịch Sử Hoạt Động (Timeline)</span>
                </h4>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {selectedLead.activities && selectedLead.activities.length > 0 ? (
                    selectedLead.activities.map((act) => (
                      <div key={act.id} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                          <span className="font-bold text-slate-400">{act.actor}</span>
                          <span className="font-mono">{new Date(act.timestamp).toLocaleString("vi-VN")}</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed">{act.content}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-slate-500 text-xs">
                      Chưa có ghi chú lịch sử nào.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Add note form */}
            <form onSubmit={handleAddActivity} className="pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newActivityNote}
                  onChange={(e) => setNewActivityNote(e.target.value)}
                  placeholder="Thêm ghi chú gọi điện, hẹn ngày học..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={savingNote || !newActivityNote.trim()}
                  className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white transition-colors cursor-pointer"
                  title="Lưu ghi chú"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
