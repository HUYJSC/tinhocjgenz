"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  Users,
  AlertTriangle,
  Award,
  Plus,
  Search,
  CheckCircle2,
  Download,
  Filter,
  Layers
} from "lucide-react";

export default function AcademicPortalPage() {
  const [activeTab, setActiveTab] = useState<"batches" | "warnings" | "certificates">("batches");
  const [search, setSearch] = useState("");

  const batches = [
    {
      id: "b-01",
      name: "MOS Excel 2019 Cấp Tốc - Tối 2-4-6",
      teacher: "Thầy Huy (MOS Master)",
      slots: "14 / 15",
      startDate: "02/09/2026",
      status: "Sắp khai giảng",
      room: "Phòng Zoom 01"
    },
    {
      id: "b-02",
      name: "IC3 Digital Literacy GS6 - Tối 3-5-7",
      teacher: "Cô Lan (IC3 Master)",
      slots: "12 / 15",
      startDate: "03/09/2026",
      status: "Đang mở đăng ký",
      room: "Phòng Meet 02"
    },
    {
      id: "b-03",
      name: "Excel Thực Chiến & Dashboard Doanh Nghiệp",
      teacher: "Thầy Huy (MOS Master)",
      slots: "15 / 15",
      startDate: "05/09/2026",
      status: "Đã đủ sĩ số",
      room: "Phòng Zoom 03"
    },
  ];

  const warnings = [
    {
      id: "w-01",
      studentName: "Lê Minh Trí",
      course: "MOS Excel",
      absentRate: "25% (Vắng 1/4 buổi)",
      riskLevel: "Nguy cơ trượt",
      suggestedAction: "Đã xếp dạy bù kèm 1:1"
    },
    {
      id: "w-02",
      studentName: "Nguyễn Văn Bảo",
      course: "IC3 GS6",
      absentRate: "30% (Vắng 2 buổi)",
      riskLevel: "Cảnh báo học vụ cấp 2",
      suggestedAction: "Cần liên hệ phụ huynh / gọi điện trực tiếp"
    }
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-400/30">
              <BookOpen size={13} />
              <span>CỔNG QUẢN LÝ ĐÀO TẠO & GIÁO VỤ PH DIGITAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Phòng Giáo Vụ & Khảo Thí 📋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Điều phối lớp học, quản lý phân công giảng viên, cảnh báo học vụ và phát hành chứng chỉ số.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 text-center min-w-[90px]">
              <div className="text-xl font-black text-amber-400">18</div>
              <div className="text-[10px] text-slate-400 font-bold">Lớp đang mở</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 text-center min-w-[90px]">
              <div className="text-xl font-black text-cyan-400">142</div>
              <div className="text-[10px] text-slate-400 font-bold">Học viên active</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 text-center min-w-[90px]">
              <div className="text-xl font-black text-emerald-400">99.4%</div>
              <div className="text-[10px] text-slate-400 font-bold">Tỷ lệ đỗ IIG</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("batches")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === "batches" ? "bg-amber-600 text-white shadow-md shadow-amber-600/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          <Layers size={14} />
          <span>Quản Lý Lớp & Xếp Lịch ({batches.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("warnings")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === "warnings" ? "bg-amber-600 text-white shadow-md shadow-amber-600/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          <AlertTriangle size={14} />
          <span>Bảng Cảnh Báo Học Vụ ({warnings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("certificates")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === "certificates" ? "bg-amber-600 text-white shadow-md shadow-amber-600/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          <Award size={14} />
          <span>Duyệt Cấp Chứng Nhận Tốt Nghiệp</span>
        </button>
      </div>

      {/* 3. Tab Contents */}
      {activeTab === "batches" && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-white">Danh Sách Lớp Đang Khai Giảng & Xếp Phòng</h3>
              <p className="text-xs text-slate-400">Theo dõi phân công giảng viên và tình trạng tuyển sinh</p>
            </div>
            <button
              type="button"
              onClick={() => alert("Mở form thêm lớp học mới...")}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <Plus size={14} />
              <span>Tạo Lớp Học Mới</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-black border-b border-slate-800">
                <tr>
                  <th className="p-3">Tên Lớp Học</th>
                  <th className="p-3">Giảng Viên</th>
                  <th className="p-3">Khai Giảng</th>
                  <th className="p-3">Sĩ Số</th>
                  <th className="p-3">Phòng Học</th>
                  <th className="p-3">Trạng Thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {batches.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-white">{b.name}</td>
                    <td className="p-3 text-cyan-400">{b.teacher}</td>
                    <td className="p-3">{b.startDate}</td>
                    <td className="p-3 font-mono">{b.slots}</td>
                    <td className="p-3 text-slate-400">{b.room}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "warnings" && (
        <div className="space-y-4">
          <h3 className="text-base font-black text-white">Cảnh Báo Học Vụ Tự Động ({warnings.length})</h3>
          <div className="space-y-3">
            {warnings.map((w) => (
              <div key={w.id} className="p-5 rounded-2xl bg-slate-900 border border-amber-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{w.studentName}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-red-950 text-red-300 border border-red-800">
                      {w.riskLevel}
                    </span>
                  </div>
                  <p className="text-xs text-amber-400 font-semibold">{w.course} • Tỷ lệ vắng: {w.absentRate}</p>
                  <p className="text-xs text-slate-400">Phương án xử lý: {w.suggestedAction}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => alert(`Đã kích hoạt hỗ trợ giáo vụ cho học viên: ${w.studentName}`)}
                    className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold cursor-pointer"
                  >
                    Gửi Thông Báo Học Vụ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "certificates" && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-white">Duyệt & Phát Hành Chứng Chỉ Tốt Nghiệp</h3>
              <p className="text-xs text-slate-400">Chứng nhận được ký hash SHA-256 chống làm giả</p>
            </div>
            <button
              type="button"
              onClick={() => alert("Đã duyệt phát hành 12 chứng chỉ mới thành công!")}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <CheckCircle2 size={14} />
              <span>Duyệt Phát Hành Toàn Bộ</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
            <p><strong>Khóa gần nhất:</strong> MOS Excel 2019 Associate — Lớp Tối 2-4-6</p>
            <p><strong>Số học viên đủ điều kiện:</strong> 14/14 học viên đạt điểm bài thi thử &gt; 850/1000.</p>
          </div>
        </div>
      )}
    </div>
  );
}
