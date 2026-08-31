"use client";

import React, { useState } from "react";
import {
  Users,
  CheckCircle2,
  XCircle,
  Calendar,
  Clock,
  FileCheck,
  AlertTriangle,
  Award,
  Download,
  Send,
  MessageSquare,
  Search,
  Check
} from "lucide-react";

export default function TeacherPortalPage() {
  const [activeTab, setActiveTab] = useState<"classes" | "attendance" | "grading" | "warnings">("classes");
  const [selectedClassId, setSelectedClassId] = useState<string>("c1");
  const [feedbackSentId, setFeedbackSentId] = useState<string | null>(null);

  const teacherInfo = {
    name: "Thầy Huy (MOS Master Trainer)",
    department: "Bộ Môn Khảo Thí & Tin Học Quốc Tế",
    activeClasses: 3,
    totalStudents: 38,
    pendingSubmissions: 4,
  };

  const teachingClasses = [
    {
      id: "c1",
      name: "MOS Excel 2019 Cấp Tốc - Lớp Tối 2-4-6",
      schedule: "19h30 - 21h30 (Thứ 2, 4, 6)",
      studentsCount: 14,
      sessionProgress: "Buổi 3 / 5",
      roomLink: "https://meet.google.com/ph-excel-t246",
    },
    {
      id: "c2",
      name: "IC3 Digital Literacy GS6 - Lớp Tối 3-5-7",
      schedule: "19h30 - 21h30 (Thứ 3, 5, 7)",
      studentsCount: 12,
      sessionProgress: "Buổi 2 / 5",
      roomLink: "https://meet.google.com/ph-ic3-gs6",
    },
    {
      id: "c3",
      name: "Kèm 1:1 Cấp Tốc MOS Word - Nguyễn Hoàng Nam",
      schedule: "14h00 - 16h00 (Thứ 7, CN)",
      studentsCount: 1,
      sessionProgress: "Buổi 3 / 3",
      roomLink: "https://meet.google.com/ph-word-vip1",
    },
  ];

  const studentsAttendance = [
    { id: "s1", name: "Nguyễn Hoàng Nam", phone: "0901234567", present: true, notes: "Làm bài tốt" },
    { id: "s2", name: "Trần Thị Thu Thảo", phone: "0912345678", present: true, notes: "Nắm vững XLOOKUP" },
    { id: "s3", name: "Lê Minh Trí", phone: "0923456789", present: false, notes: "Xin phép đi công tác" },
    { id: "s4", name: "Phạm Thúy Hằng", phone: "0934567890", present: true, notes: "" },
    { id: "s5", name: "Vũ Hải Đăng", phone: "0945678901", present: true, notes: "" },
  ];

  const gradingQueue = [
    {
      id: "sub-1",
      studentName: "Nguyễn Hoàng Nam",
      lessonTitle: "Buổi 3: XLOOKUP Chuyên Sâu",
      fileName: "Bai_Tap_Excel_XLOOKUP_HoangNam.xlsx",
      submittedAt: "Hôm nay 10:30",
      status: "Chờ chấm",
      suggestedScore: 95,
    },
    {
      id: "sub-2",
      studentName: "Trần Thị Thu Thảo",
      lessonTitle: "Buổi 2: Trộn Thư Mail Merge",
      fileName: "De_Luyen_MailMerge_ThuThao.docx",
      submittedAt: "Hôm nay 09:15",
      status: "Chờ chấm",
      suggestedScore: 100,
    },
    {
      id: "sub-3",
      studentName: "Lê Minh Trí",
      lessonTitle: "Buổi 2: Trộn Thư Mail Merge",
      fileName: "De_Luyen_MailMerge_MinhTri.docx",
      submittedAt: "Hôm qua 22:00",
      status: "Chờ chấm",
      suggestedScore: 85,
    },
  ];

  const handleSendFeedback = (id: string) => {
    setFeedbackSentId(id);
    setTimeout(() => {
      setFeedbackSentId(null);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <Users size={13} />
              <span>CỔNG GIẢNG VIÊN & ĐÀO TẠO PH DIGITAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {teacherInfo.name} 🎓
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Đơn vị: <strong className="text-white">{teacherInfo.department}</strong>
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 text-center min-w-[90px]">
              <div className="text-xl font-black text-emerald-400">{teacherInfo.activeClasses}</div>
              <div className="text-[10px] text-slate-400 font-bold">Lớp đang dạy</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 text-center min-w-[90px]">
              <div className="text-xl font-black text-cyan-400">{teacherInfo.totalStudents}</div>
              <div className="text-[10px] text-slate-400 font-bold">Tổng học viên</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 text-center min-w-[90px]">
              <div className="text-xl font-black text-amber-400">{teacherInfo.pendingSubmissions}</div>
              <div className="text-[10px] text-slate-400 font-bold">Bài chờ chấm</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("classes")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === "classes" ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          <Calendar size={14} />
          <span>Lớp Học Phụ Trách ({teachingClasses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("attendance")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === "attendance" ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          <CheckCircle2 size={14} />
          <span>Điểm Danh Học Viên</span>
        </button>

        <button
          onClick={() => setActiveTab("grading")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === "grading" ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          <FileCheck size={14} />
          <span>Chấm Điểm & Phản Hồi Bài Nộp ({gradingQueue.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("warnings")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === "warnings" ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          <AlertTriangle size={14} className="text-amber-400" />
          <span>Cảnh Báo Học Vụ & Kèm 1:1</span>
        </button>
      </div>

      {/* 3. Tab Contents */}
      {activeTab === "classes" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teachingClasses.map((c) => (
            <div key={c.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {c.sessionProgress}
                </span>
                <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                  <Users size={12} /> {c.studentsCount} học viên
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white leading-snug">{c.name}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <Clock size={12} /> {c.schedule}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                <a
                  href={c.roomLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <span>Vào Phòng Học Ảo</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedClassId(c.id);
                    setActiveTab("attendance");
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
                >
                  Điểm danh
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "attendance" && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-white">Điểm Danh: MOS Excel 2019 Cấp Tốc - Buổi 3</h3>
              <p className="text-xs text-slate-400">Tự động đồng bộ với hệ thống cảnh báo học vụ khi vắng quá 20%</p>
            </div>
            <button
              type="button"
              onClick={() => alert("Đã lưu bảng điểm danh thành công!")}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <Check size={14} />
              <span>Lưu Bảng Điểm Danh</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-black border-b border-slate-800">
                <tr>
                  <th className="p-3">Học viên</th>
                  <th className="p-3">SĐT / Zalo</th>
                  <th className="p-3 text-center">Trạng Thái</th>
                  <th className="p-3">Ghi chú của GV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {studentsAttendance.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-white">{st.name}</td>
                    <td className="p-3 font-mono">{st.phone}</td>
                    <td className="p-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        st.present
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-red-950 text-red-300 border border-red-800"
                      }`}>
                        {st.present ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                        {st.present ? "Có mặt" : "Vắng"}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400 italic">{st.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "grading" && (
        <div className="space-y-4">
          <h3 className="text-base font-black text-white">Hàng Đợi Chấm Bài Tập Thực Hành ({gradingQueue.length})</h3>
          <div className="space-y-3">
            {gradingQueue.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{item.studentName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">• {item.submittedAt}</span>
                  </div>
                  <p className="text-xs text-cyan-400 font-semibold">{item.lessonTitle}</p>
                  <p className="text-xs text-slate-400 font-mono">Tệp bài làm: {item.fileName}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Điểm chấm:</span>
                    <div className="text-sm font-black text-emerald-400">{item.suggestedScore} / 100</div>
                  </div>

                  {feedbackSentId === item.id ? (
                    <span className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={14} /> Đã gửi phản hồi!
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSendFeedback(item.id)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Send size={13} />
                      <span>Duyệt Điểm & Gửi Phản Hồi</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "warnings" && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle size={18} />
            <h3 className="text-base font-black text-white">Danh Sách Học Viên Cần Kèm 1:1 Cấp Tốc</h3>
          </div>
          <p className="text-xs text-slate-400">
            Hệ thống phát hiện học viên có nguy cơ trượt dựa trên tỷ lệ vắng hoặc điểm bài thi thử &lt; 700/1000.
          </p>

          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/60 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-white">Lê Minh Trí — Khóa MOS Excel</p>
              <p className="text-[11px] text-amber-300">Vắng 1 buổi + Điểm thi thử 650/1000 (Chưa đạt chuẩn đầu ra đại học)</p>
            </div>
            <button
              type="button"
              onClick={() => alert("Đã xếp lịch kèm 1:1 cấp tốc cho học viên Lê Minh Trí vào 14h00 Chủ Nhật!")}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer shrink-0"
            >
              Xếp Lịch Kèm 1:1
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
