"use client";

import React, { useState } from "react";
import {
  Calendar,
  Plus,
  Edit2,
  Trash2,
  Clock,
  Video,
  Users,
  CheckCircle2,
  AlertCircle,
  X
} from "lucide-react";
import { upcomingBatchesData as initialBatches, BatchSchedule } from "@/data/mockData";

export default function AdminSchedulesPage() {
  const [batches, setBatches] = useState<BatchSchedule[]>(initialBatches);
  const [editingBatch, setEditingBatch] = useState<BatchSchedule | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenAdd = () => {
    setEditingBatch({
      id: `batch-${Date.now()}`,
      courseName: "Lớp MOS Cấp Tốc Khai Giảng Mới",
      courseType: "MOS",
      startDate: "Thứ 2 tuần tới",
      scheduleTime: "Tối 2 - 4 - 6 (19:30 - 21:30)",
      mode: "Online qua Zoom / Google Meet",
      slotsRemaining: 5,
      status: "Đang mở đăng ký"
    });
    setShowModal(true);
  };

  const handleOpenEdit = (b: BatchSchedule) => {
    setEditingBatch({ ...b });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBatch) return;

    const exists = batches.some((b) => b.id === editingBatch.id);
    if (exists) {
      setBatches(batches.map((b) => (b.id === editingBatch.id ? editingBatch : b)));
    } else {
      setBatches([...batches, editingBatch]);
    }
    setShowModal(false);
    setEditingBatch(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa ca học này?")) {
      setBatches(batches.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-display">
            <Calendar className="text-indigo-400" />
            <span>Quản Lý Lịch Khai Giảng & Lớp Học</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Lập lịch ca học Online/Offline, kiểm soát sĩ số và quản lý đường truyền Zoom/Meet.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Mở Lớp Khai Giảng Mới</span>
        </button>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {batches.map((batch) => (
          <div
            key={batch.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-800/60 text-[10px] font-black uppercase">
                  {batch.courseType}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    batch.status === "Đang mở đăng ký"
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800/60"
                      : "bg-red-950 text-red-300 border border-red-800/60"
                  }`}
                >
                  {batch.status}
                </span>
              </div>

              <h3 className="text-base font-black text-white tracking-tight font-display">
                {batch.courseName}
              </h3>

              <div className="space-y-2 mt-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-slate-400 shrink-0" />
                  <span>Khai giảng: <strong className="text-white">{batch.startDate}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-slate-400 shrink-0" />
                  <span>Lịch học: <strong className="text-white">{batch.scheduleTime}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Video size={14} className="text-slate-400 shrink-0" />
                  <span>Hình thức: <strong className="text-white">{batch.mode}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-amber-400 shrink-0" />
                  <span>Chỗ trống còn lại: <strong className="text-amber-400">{batch.slotsRemaining} học viên</strong></span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleOpenEdit(batch)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Sửa thông tin ca học"
              >
                <Edit2 size={14} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(batch.id)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-300 transition-colors cursor-pointer"
                title="Hủy ca học"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Modal */}
      {showModal && editingBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Calendar size={18} className="text-indigo-400" />
                <span>{editingBatch.courseName ? "Chỉnh Sửa Ca Học" : "Mở Lớp Khai Giảng"}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Tên Lớp Học:</label>
                <input
                  type="text"
                  required
                  value={editingBatch.courseName}
                  onChange={(e) => setEditingBatch({ ...editingBatch, courseName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Môn Thi:</label>
                  <select
                    value={editingBatch.courseType}
                    onChange={(e) => setEditingBatch({ ...editingBatch, courseType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  >
                    <option value="MOS">MOS</option>
                    <option value="IC3">IC3 GS6</option>
                    <option value="CNTT">CNTT Cơ Bản</option>
                    <option value="AI">AI Văn Phòng</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Số Chỗ Còn Lại:</label>
                  <input
                    type="number"
                    min={0}
                    value={editingBatch.slotsRemaining}
                    onChange={(e) => setEditingBatch({ ...editingBatch, slotsRemaining: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Ngày Khai Giảng:</label>
                <input
                  type="text"
                  value={editingBatch.startDate}
                  onChange={(e) => setEditingBatch({ ...editingBatch, startDate: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  placeholder="Ví dụ: 15/09/2026 hoặc Thứ 2 tuần tới"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Khung Giờ Học:</label>
                <input
                  type="text"
                  value={editingBatch.scheduleTime}
                  onChange={(e) => setEditingBatch({ ...editingBatch, scheduleTime: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  placeholder="Ví dụ: Tối 2 - 4 - 6 (19:30 - 21:30)"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-md shadow-indigo-600/30"
                >
                  Lưu Ca Học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
