"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Search,
  Check,
  X,
  Sparkles,
  Award,
  Clock,
  Tag
} from "lucide-react";
import { coursesData as initialCourses, Course } from "@/data/mockData";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [courseSearch, setCourseSearch] = useState("");
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.description.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.categoryName?.toLowerCase().includes(courseSearch.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingCourse({
      id: `course-${Date.now()}`,
      title: "",
      category: "mos-ic3",
      categoryName: "Chứng Chỉ Quốc Tế MOS & IC3",
      tagline: "",
      price: "",
      duration: "3 - 5 buổi",
      badge: "Mới 2026",
      examCode: "Certiport",
      description: "",
      features: ["Cam kết bao đỗ 100%", "Tài khoản thi thử bản quyền", "Kèm 1:1 sát đề thi"],
      popular: false
    });
    setShowModal(true);
  };

  const handleOpenEdit = (c: Course) => {
    setEditingCourse({ ...c });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse || !editingCourse.title || !editingCourse.price) return;

    const exists = courses.some((c) => c.id === editingCourse.id);
    if (exists) {
      setCourses(courses.map((c) => (c.id === editingCourse.id ? editingCourse : c)));
    } else {
      setCourses([editingCourse, ...courses]);
    }
    setShowModal(false);
    setEditingCourse(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa khóa học này khỏi hệ thống đào tạo?")) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-display">
            <BookOpen className="text-blue-500" />
            <span>Quản Lý Danh Mục Khóa Học</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Thiết lập chương trình đào tạo MOS, IC3, CNTT Cơ Bản, Excel thực chiến & AI Văn phòng.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Thêm Khóa Học Mới</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
        <Search size={18} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={courseSearch}
          onChange={(e) => setCourseSearch(e.target.value)}
          placeholder="Tìm theo tên khóa học, mã môn thi, phân loại..."
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

      {/* Course Cards / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all relative overflow-hidden group"
          >
            {c.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-slate-950 text-[9px] font-black px-2.5 py-0.5 rounded-bl-xl uppercase tracking-wider">
                Bán Chạy Nhất
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-1.5">
                <Tag size={12} />
                <span>{c.categoryName}</span>
              </div>
              <h3 className="text-base font-black text-white tracking-tight line-clamp-2 font-display">
                {c.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {c.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Học Phí</span>
                  <span className="text-sm font-black text-emerald-400 font-display">
                    {c.price}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Thời Lượng</span>
                  <span className="text-xs font-bold text-slate-300">
                    {c.duration}
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
                title="Xóa khóa học"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Modal */}
      {showModal && editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <BookOpen size={18} className="text-blue-400" />
                <span>{editingCourse.title ? "Chỉnh Sửa Khóa Học" : "Thêm Khóa Học Mới"}</span>
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
                <label className="block text-xs font-bold text-slate-300 mb-1">Tên Khóa Học:</label>
                <input
                  type="text"
                  required
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  placeholder="Ví dụ: Luyện Thi MOS 2019 / 365..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Học Phí (VNĐ):</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.price}
                    onChange={(e) => setEditingCourse({ ...editingCourse, price: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                    placeholder="Ví dụ: 699.000đ"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Thời Lượng:</label>
                  <input
                    type="text"
                    value={editingCourse.duration}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                    placeholder="Ví dụ: 3 - 5 buổi"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Phân Loại Môn:</label>
                <select
                  value={editingCourse.categoryName}
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
                  value={editingCourse.description}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  placeholder="Mô tả tóm tắt nội dung và cam kết chất lượng..."
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="popularCheck"
                  checked={editingCourse.popular}
                  onChange={(e) => setEditingCourse({ ...editingCourse, popular: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-700 text-blue-600"
                />
                <label htmlFor="popularCheck" className="text-xs font-bold text-slate-300 cursor-pointer">
                  Đánh dấu là Khóa học Nổi bật / Bán chạy nhất
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-md shadow-blue-600/30"
                >
                  Lưu Khóa Học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
