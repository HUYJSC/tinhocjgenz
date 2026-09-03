"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  Tag,
  RefreshCw,
  Eye,
  CheckCircle2,
  Archive,
  Layers
} from "lucide-react";
import { AdminCourseItem } from "@/lib/courses-store";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<AdminCourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [courseSearch, setCourseSearch] = useState("");
  const [editingCourse, setEditingCourse] = useState<Partial<AdminCourseItem> | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/admin/courses");
      const data = await res.json();
      if (data.success) {
        setCourses(data.data || []);
      } else {
        setErrorMessage(data.error || "Không thể tải danh sách khóa học.");
      }
    } catch {
      setErrorMessage("Mất kết nối mạng khi tải dữ liệu khóa học.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.description.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.categoryName?.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.code?.toLowerCase().includes(courseSearch.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingCourse({
      code: `CRS-${Date.now().toString().slice(-4)}`,
      title: "",
      category: "mos-ic3",
      categoryName: "Chứng Chỉ Quốc Tế MOS & IC3",
      tagline: "Đạt chuẩn đầu ra & chứng chỉ quốc tế",
      priceAmount: 699000,
      originalPriceAmount: 950000,
      duration: "3 - 5 buổi",
      totalSessions: 5,
      badge: "Mới 2026",
      examCode: "Certiport",
      description: "",
      features: ["Cam kết bao đỗ 100%", "Tài khoản thi thử bản quyền", "Kèm 1:1 sát đề thi"],
      popular: false,
      status: "PUBLISHED",
    });
    setShowModal(true);
  };

  const handleOpenEdit = (c: AdminCourseItem) => {
    setEditingCourse({ ...c });
    setShowModal(true);
  };

  const handleSave = async (status: "DRAFT" | "PUBLISHED") => {
    if (!editingCourse || !editingCourse.title || !editingCourse.priceAmount) {
      alert("Vui lòng nhập đầy đủ tên khóa học và học phí.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...editingCourse,
        status,
      };

      const isUpdate = Boolean(editingCourse.id && courses.some((c) => c.id === editingCourse.id));
      const url = "/api/admin/courses";
      const method = isUpdate ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setShowModal(false);
        setEditingCourse(null);
        await fetchCourses();
      } else {
        alert(data.error || "Không thể lưu khóa học.");
      }
    } catch {
      alert("Lỗi kết nối máy chủ khi lưu khóa học.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn chuyển khóa học này vào thùng rác (soft delete)?")) return;

    try {
      const res = await fetch(`/api/admin/courses?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        await fetchCourses();
      } else {
        alert(data.error || "Xóa khóa học thất bại.");
      }
    } catch {
      alert("Lỗi kết nối máy chủ khi xóa.");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-display">
            <BookOpen className="text-blue-500" />
            <span>Quản Lý Danh Mục Khóa Học & Học Phí</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Dữ liệu có cấu trúc: Học phí dạng số thực tế, phân tách Lưu nháp / Xuất bản, hỗ trợ Soft-delete an toàn.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchCourses}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
            title="Tải lại danh sách"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Thêm Khóa Học Mới</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
        <Search size={18} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={courseSearch}
          onChange={(e) => setCourseSearch(e.target.value)}
          placeholder="Tìm theo tên khóa học, mã môn thi, danh mục..."
          className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
        />
        {courseSearch && (
          <button
            type="button"
            onClick={() => setCourseSearch("")}
            className="text-xs text-slate-400 hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Error state */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center justify-between">
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={fetchCourses}
            className="px-3 py-1 rounded-lg bg-rose-900 text-white font-bold hover:bg-rose-800 transition-colors cursor-pointer"
          >
            Thử Lại
          </button>
        </div>
      )}

      {/* Course Cards */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-blue-500" />
          <p className="text-xs">Đang tải danh mục khóa học...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="py-16 text-center text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
          <BookOpen size={32} className="mx-auto mb-2 text-slate-600" />
          <p className="text-sm font-bold text-slate-400">Không tìm thấy khóa học nào phù hợp.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all relative overflow-hidden group shadow-lg"
            >
              {c.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-slate-950 text-[9px] font-black px-2.5 py-0.5 rounded-bl-xl uppercase tracking-wider">
                  Nổi Bật
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-bold text-blue-400 mb-1.5">
                  <div className="flex items-center gap-1.5 truncate">
                    <Tag size={12} />
                    <span className="truncate">{c.categoryName}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      c.status === "PUBLISHED"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <h3 className="text-base font-black text-white tracking-tight line-clamp-2 font-display">
                  {c.title}
                </h3>
                <div className="text-[11px] font-mono text-slate-500 mt-1">
                  Mã: {c.code || c.id}
                </div>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {c.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Học Phí</span>
                    <span className="text-sm font-black text-emerald-400 font-display">
                      {new Intl.NumberFormat("vi-VN").format(c.priceAmount)} VNĐ
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Thời Lượng</span>
                    <span className="text-xs font-bold text-slate-300">
                      {c.duration} ({c.totalSessions} buổi)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(c)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Chỉnh sửa khóa học"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(c.id)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-300 transition-colors cursor-pointer"
                  title="Chuyển vào thùng rác"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Add Modal */}
      {showModal && editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <BookOpen size={18} className="text-blue-400" />
                <span>{editingCourse.id ? "Chỉnh Sửa Khóa Học" : "Thêm Khóa Học Mới"}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tên Khóa Học:</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.title || ""}
                    onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                    placeholder="Ví dụ: Luyện Thi MOS Excel 2019 / 365..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Mã Khóa:</label>
                  <input
                    type="text"
                    value={editingCourse.code || ""}
                    onChange={(e) => setEditingCourse({ ...editingCourse, code: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono"
                    placeholder="MOS-EX2019"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Học Phí Thực Tế (VNĐ):</label>
                  <input
                    type="number"
                    min={0}
                    step={10000}
                    required
                    value={editingCourse.priceAmount || 0}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        priceAmount: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Giá Gốc Niêm Yết:</label>
                  <input
                    type="number"
                    min={0}
                    step={10000}
                    value={editingCourse.originalPriceAmount || 0}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        originalPriceAmount: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Số Buổi Học:</label>
                  <input
                    type="number"
                    min={1}
                    value={editingCourse.totalSessions || 5}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        totalSessions: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Phân Loại Môn:</label>
                <select
                  value={editingCourse.categoryName || "Chứng Chỉ Quốc Tế MOS & IC3"}
                  onChange={(e) => setEditingCourse({ ...editingCourse, categoryName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                >
                  <option value="Chứng Chỉ Quốc Tế MOS & IC3">Chứng Chỉ Quốc Tế MOS & IC3</option>
                  <option value="Tin Học Văn Phòng Thực Chiến">Tin Học Văn Phòng Thực Chiến</option>
                  <option value="Ứng Dụng CNTT Cơ Bản (TT03)">Ứng Dụng CNTT Cơ Bản (TT03)</option>
                  <option value="Trí Tuệ Nhân Tạo AI Văn Phòng">Trí Tuệ Nhân Tạo AI Văn Phòng</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Mô Tả Khóa Học:</label>
                <textarea
                  rows={3}
                  value={editingCourse.description || ""}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  placeholder="Mô tả tóm tắt nội dung và cam kết chất lượng..."
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="popularCheck"
                  checked={Boolean(editingCourse.popular)}
                  onChange={(e) => setEditingCourse({ ...editingCourse, popular: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-700 text-blue-600"
                />
                <label htmlFor="popularCheck" className="text-xs font-bold text-slate-300 cursor-pointer">
                  Đánh dấu là Khóa học Nổi Bật / Bán Chạy Nhất
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleSave("DRAFT")}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 text-xs font-bold transition-colors"
                >
                  Lưu Nháp (Draft)
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleSave("PUBLISHED")}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-md shadow-blue-600/30"
                >
                  {submitting ? "Đang lưu..." : "Xuất Bản (Publish)"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
