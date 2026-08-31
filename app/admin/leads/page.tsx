"use client";

import React, { useState } from "react";
import {
  Users,
  Phone,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
  Sparkles,
  Download,
  Plus,
  Trash2
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  course: string;
  university: string;
  date: string;
  status: "Chờ gọi" | "Đã tư vấn" | "Đã đóng học phí" | "Hủy";
  note: string;
}

export default function AdminLeadsCRMPage() {
  const [leads, setLeads] = useState<Lead[]>([
    { id: "lead-1", name: "Nguyễn Văn Tuấn", phone: "0968123456", course: "Combo MOS 3 Môn", university: "Sinh viên Đại học", date: "24/08/2026", status: "Chờ gọi", note: "Cần thi gấp lấy chứng chỉ quốc tế xét tốt nghiệp" },
    { id: "lead-2", name: "Lê Thị Mai", phone: "0912345678", course: "Chứng chỉ IC3 GS6", university: "Học sinh THPT", date: "23/08/2026", status: "Đã tư vấn", note: "Đăng ký nhóm 3 bạn giảm 30% học phí" },
    { id: "lead-3", name: "Trần Minh Quang", phone: "0987654321", course: "MOS Excel 2019", university: "Chuyên viên Kế toán", date: "23/08/2026", status: "Đã đóng học phí", note: "Học lớp tối 2-4-6, đã gửi hóa đơn" },
    { id: "lead-4", name: "Hoàng Thảo My", phone: "0933456789", course: "Ứng dụng AI Văn Phòng", university: "Doanh nghiệp / Quản lý", date: "22/08/2026", status: "Đã tư vấn", note: "Đang phân vân học kèm 1:1" },
    { id: "lead-5", name: "Đặng Hữu Phúc", phone: "0977889900", course: "MOS Word & Excel", university: "ĐH Kinh Tế TP.HCM", date: "21/08/2026", status: "Chờ gọi", note: "Cần tư vấn thời gian ôn thi cấp tốc 1 tuần" }
  ]);

  const [leadFilter, setLeadFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredLeads = leads.filter((l) => {
    const matchesFilter = leadFilter === "all" || l.status === leadFilter;
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.university.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: Lead["status"]) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
  };

  const handleDeleteLead = (id: string) => {
    if (confirm("Xóa thông tin học viên này khỏi CRM?")) {
      setLeads(leads.filter((l) => l.id !== id));
    }
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
            Quản lý danh sách học viên đăng ký tư vấn từ biểu mẫu website và hotline.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert("Đang xuất danh sách học viên ra tệp Excel CSV...")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all border border-slate-700 cursor-pointer"
          >
            <Download size={14} />
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Status Pill Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: "all", label: "Tất cả", count: leads.length },
            { id: "Chờ gọi", label: "Chờ gọi", count: leads.filter(l => l.status === "Chờ gọi").length },
            { id: "Đã tư vấn", label: "Đã tư vấn", count: leads.filter(l => l.status === "Đã tư vấn").length },
            { id: "Đã đóng học phí", label: "Đã đóng học phí", count: leads.filter(l => l.status === "Đã đóng học phí").length }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setLeadFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                leadFilter === tab.id
                  ? "bg-blue-600 text-white shadow-sm font-black"
                  : "bg-slate-800/80 text-slate-400 hover:text-white"
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] px-1 rounded-full bg-slate-900/60 font-mono">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tên, số điện thoại..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-black text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Học Viên</th>
                <th className="py-3 px-4">Khóa Học Quan Tâm</th>
                <th className="py-3 px-4">Ghi Chú Nhu Cầu</th>
                <th className="py-3 px-4">Trạng Thái</th>
                <th className="py-3 px-4 text-right">Tác Vụ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white text-sm">{lead.name}</div>
                    <div className="text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                      <Phone size={11} className="text-blue-400" />
                      <a href={`tel:${lead.phone}`} className="hover:text-blue-400 transition-colors">
                        {lead.phone}
                      </a>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{lead.university} • {lead.date}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-blue-950/80 text-blue-300 border border-blue-800/60 text-xs font-bold">
                      {lead.course}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
                      {lead.note}
                    </p>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={lead.status}
                      onChange={(e) => handleUpdateStatus(lead.id, e.target.value as Lead["status"])}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                        lead.status === "Chờ gọi"
                          ? "bg-amber-950/80 text-amber-300 border-amber-800/70"
                          : lead.status === "Đã tư vấn"
                          ? "bg-blue-950/80 text-blue-300 border-blue-800/70"
                          : "bg-emerald-950/80 text-emerald-300 border-emerald-800/70"
                      }`}
                    >
                      <option value="Chờ gọi" className="bg-slate-900 text-white">Chờ gọi</option>
                      <option value="Đã tư vấn" className="bg-slate-900 text-white">Đã tư vấn</option>
                      <option value="Đã đóng học phí" className="bg-slate-900 text-white">Đã đóng học phí</option>
                      <option value="Hủy" className="bg-slate-900 text-white">Hủy</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
