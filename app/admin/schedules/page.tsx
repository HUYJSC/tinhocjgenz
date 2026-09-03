"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  Plus,
  Edit2,
  Trash2,
  Clock,
  Video,
  Users,
  X,
  RefreshCw,
  Building,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { AdminClassBatch } from "@/lib/schedules-store";

interface BatchItemWithSlots extends AdminClassBatch {
  availableSlots: number;
}

export default function AdminSchedulesPage() {
  const [batches, setBatches] = useState<BatchItemWithSlots[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBatch, setEditingBatch] = useState<Partial<AdminClassBatch> | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchBatches = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/admin/schedules");
      const data = await res.json();
      if (data.success) {
        setBatches(data.data || []);
      } else {
        setErrorMessage(data.error || "Không thể tải danh sách lịch khai giảng.");
      }
    } catch {
      setErrorMessage("Lỗi mất kết nối máy chủ khi tải lịch học.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  const handleOpenAdd = () => {
    setEditingBatch({
      batchCode: `MOS-K${Date.now().toString().slice(-3)}`,
      courseName: "Luyện Thi MOS Excel 2019 Cấp Tốc",
      courseType: "MOS",
      startDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      startTime: "19:30",
      endTime: "21:30",
      deliveryMode: "ONLINE",
      roomOrMeetingUrl: "https://meet.google.com/tgz-live-class",
      capacity: 25,
      reservedCount: 5,
      enrolledCount: 10,
      status: "OPENING",
    });
    setShowModal(true);
  };

  const handleOpenEdit = (b: BatchItemWithSlots) => {
    setEditingBatch({ ...b });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBatch || !editingBatch.batchCode || !editingBatch.courseName || !editingBatch.startDate) {
      alert("Vui lòng nhập đầy đủ mã lớp, tên khóa học và ngày khai giảng.");
      return;
    }

    setSubmitting(true);
    try {
      const isUpdate = Boolean(editingBatch.id && batches.some((b) => b.id === editingBatch.id));
      const url = "/api/admin/schedules";
      const method = isUpdate ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBatch),
      });
      const data = await res.json();

      if (data.success) {
        setShowModal(false);
        setEditingBatch(null);
        await fetchBatches();
      } else {
        alert(data.error || "Lưu lớp học thất bại.");
      }
    } catch {
      alert("Lỗi kết nối máy chủ khi lưu lớp học.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn hủy/dừng ca học này?")) return;

    try {
      const res = await fetch(`/api/admin/schedules?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        await fetchBatches();
      } else {
        alert(data.error || "Hủy ca học thất bại.");
      }
    } catch {
      alert("Lỗi kết nối khi hủy ca học.");
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
            Kiểm soát sĩ số chuẩn: Tự động tính số chỗ còn lại = Quy mô - Giữ chỗ - Đã nhập học.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchBatches}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
            title="Làm mới lịch học"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Mở Lớp Khai Giảng Mới</span>
          </button>
        </div>
      </div>

      {/* Error state */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center justify-between">
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={fetchBatches}
            className="px-3 py-1 rounded-lg bg-rose-900 text-white font-bold hover:bg-rose-800 transition-colors cursor-pointer"
          >
            Thử Lại
          </button>
        </div>
      )}

      {/* Batches Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-indigo-500" />
          <p className="text-xs">Đang tải danh sách lịch khai giảng...</p>
        </div>
      ) : batches.length === 0 ? (
        <div className="py-16 text-center text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
          <Calendar size={32} className="mx-auto mb-2 text-slate-600" />
          <p className="text-sm font-bold text-slate-400">Chưa có lịch khai giảng nào trong hệ thống.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {batches.map((batch) => (
            <div
              key={batch.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800/60 text-[10px] font-mono font-black uppercase">
                    {batch.batchCode}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      batch.status === "OPENING"
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800/60"
                        : "bg-amber-950 text-amber-300 border border-amber-800/60"
                    }`}
                  >
                    {batch.status === "OPENING" ? "Đang Mở Tuyển Sinh" : batch.status}
                  </span>
                </div>

                <h3 className="text-base font-black text-white tracking-tight font-display">
                  {batch.courseName}
                </h3>

                <div className="space-y-2 mt-4 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400 shrink-0" />
                    <span>
                      Khai giảng: <strong className="text-white">{new Date(batch.startDate).toLocaleDateString("vi-VN")}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-slate-400 shrink-0" />
                    <span>
                      Thời gian: <strong className="text-white">{batch.startTime} - {batch.endTime}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {batch.deliveryMode === "ONLINE" ? (
                      <Video size={14} className="text-blue-400 shrink-0" />
                    ) : (
                      <Building size={14} className="text-amber-400 shrink-0" />
                    )}
                    <span>
                      Hình thức: <strong className="text-white">{batch.deliveryMode}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Users size={14} className="text-emerald-400 shrink-0" />
                    <span>
                      Chỗ trống tự tính:{" "}
                      <strong className="text-emerald-400 font-mono">
                        {batch.availableSlots} / {batch.capacity} slots
                      </strong>
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono pl-5">
                    (Đã học: {batch.enrolledCount}, Giữ chỗ: {batch.reservedCount})
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
      )}

      {/* Edit/Add Modal */}
      {showModal && editingBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Calendar size={18} className="text-indigo-400" />
                <span>{editingBatch.id ? "Chỉnh Sửa Ca Học" : "Mở Lớp Khai Giảng"}</span>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Mã Lớp (Batch Code):</label>
                  <input
                    type="text"
                    required
                    value={editingBatch.batchCode || ""}
                    onChange={(e) => setEditingBatch({ ...editingBatch, batchCode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono"
                    placeholder="MOS-E2019-K01"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Môn Thi:</label>
                  <select
                    value={editingBatch.courseType || "MOS"}
                    onChange={(e) => setEditingBatch({ ...editingBatch, courseType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  >
                    <option value="MOS">MOS</option>
                    <option value="IC3">IC3 GS6</option>
                    <option value="Excel">Excel Thực Chiến</option>
                    <option value="AI Office">AI Văn Phòng</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Tên Lớp Học:</label>
                <input
                  type="text"
                  required
                  value={editingBatch.courseName || ""}
                  onChange={(e) => setEditingBatch({ ...editingBatch, courseName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Ngày Khai Giảng:</label>
                  <input
                    type="date"
                    required
                    value={editingBatch.startDate || ""}
                    onChange={(e) => setEditingBatch({ ...editingBatch, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Giờ Bắt Đầu:</label>
                  <input
                    type="time"
                    required
                    value={editingBatch.startTime || "19:30"}
                    onChange={(e) => setEditingBatch({ ...editingBatch, startTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Giờ Kết Thúc:</label>
                  <input
                    type="time"
                    required
                    value={editingBatch.endTime || "21:30"}
                    onChange={(e) => setEditingBatch({ ...editingBatch, endTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Quy Mô Sĩ Số:</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={editingBatch.capacity || 25}
                    onChange={(e) =>
                      setEditingBatch({
                        ...editingBatch,
                        capacity: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Đã Nhập Học:</label>
                  <input
                    type="number"
                    min={0}
                    value={editingBatch.enrolledCount || 0}
                    onChange={(e) =>
                      setEditingBatch({
                        ...editingBatch,
                        enrolledCount: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Số Chỗ Giữ Chỗ:</label>
                  <input
                    type="number"
                    min={0}
                    value={editingBatch.reservedCount || 0}
                    onChange={(e) =>
                      setEditingBatch({
                        ...editingBatch,
                        reservedCount: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Hình Thức Đào Tạo:</label>
                <select
                  value={editingBatch.deliveryMode || "ONLINE"}
                  onChange={(e) =>
                    setEditingBatch({
                      ...editingBatch,
                      deliveryMode: e.target.value as AdminClassBatch["deliveryMode"],
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                >
                  <option value="ONLINE">Online qua Google Meet / Zoom</option>
                  <option value="OFFLINE">Offline tại cơ sở đào tạo</option>
                  <option value="HYBRID">Hybrid (Kết hợp Trực tiếp & Online)</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
                Chỗ trống tự động tính toán:{" "}
                <strong className="text-emerald-400 font-mono">
                  {Math.max(
                    0,
                    (editingBatch.capacity || 25) -
                      (editingBatch.reservedCount || 0) -
                      (editingBatch.enrolledCount || 0)
                  )}{" "}
                  học viên
                </strong>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-md shadow-indigo-600/30"
                >
                  {submitting ? "Đang lưu..." : "Lưu Ca Học"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
