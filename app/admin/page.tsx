"use client";

import { useState, useEffect } from "react";
import { 
  Lock, KeyRound, LayoutDashboard, BookOpen, Calendar, 
  FileText, Users, Plus, Edit2, Trash2, Save, Download, 
  CheckCircle2, AlertCircle, Sparkles, ExternalLink, LogOut, ArrowRight, ShieldCheck 
} from "lucide-react";
import { coursesData as initialCourses, upcomingBatchesData as initialBatches, Course, BatchSchedule } from "@/data/mockData";

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"dashboard" | "courses" | "schedules" | "resources" | "leads">("dashboard");

  // Editable State
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [batches, setBatches] = useState<BatchSchedule[]>(initialBatches);

  // Modal / Form state for course adding
  const [showAddCourseModal, setShowAddCourseModal] = useState<boolean>(false);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    id: "",
    title: "",
    category: "mos-ic3",
    categoryName: "Chứng Chỉ Quốc Tế MOS & IC3",
    tagline: "",
    price: "",
    duration: "",
    badge: "Mới 2026",
    examCode: "",
    description: "",
    features: ["Cam kết bao đỗ 100%", "Tài khoản máy ảo thi thử", "Kèm 1:1"],
    popular: false
  });

  // Mock Student Leads CRM
  const [leads, setLeads] = useState([
    { id: "lead-1", name: "Nguyễn Văn Tuấn", phone: "0968123456", course: "Combo MOS 3 Môn", university: "ĐH Công nghệ Đồng Nai (DNTU)", date: "23/08/2026", status: "Chờ gọi" },
    { id: "lead-2", name: "Lê Thị Mai", phone: "0912345678", course: "Chứng chỉ IC3 GS6", university: "ĐH Lạc Hồng", date: "23/08/2026", status: "Đã tư vấn" },
    { id: "lead-3", name: "Trần Minh Quang", phone: "0987654321", course: "MOS Excel 2019", university: "ĐH Kinh Tế TP.HCM (UEH)", date: "22/08/2026", status: "Đã đóng học phí" },
  ]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "ph2026" || pinInput === "admin" || pinInput === "123456") {
      setIsAuthenticated(true);
      setLoginError(null);
    } else {
      setLoginError("Mã PIN quản trị không chính xác! (Gợi ý mã mặc định: ph2026)");
    }
  };

  // Add Course
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.price) return;
    
    const courseId = newCourse.id || `course-${Date.now()}`;
    const completeCourse: Course = {
      id: courseId,
      title: newCourse.title || "",
      category: newCourse.category || "mos-ic3",
      categoryName: newCourse.categoryName || "Khóa Học Tin Học",
      tagline: newCourse.tagline || "Lộ trình tinh gọn bao đỗ",
      price: newCourse.price || "1.500.000đ",
      duration: newCourse.duration || "5 buổi",
      badge: newCourse.badge || "Mới",
      examCode: newCourse.examCode || "Certiport",
      description: newCourse.description || "Khóa học chất lượng cao tại PH Digital Education.",
      popular: newCourse.popular || false,
      features: newCourse.features || ["Cam kết đầu ra 100%"]
    };

    setCourses([completeCourse, ...courses]);
    setShowAddCourseModal(false);
    alert("Đã thêm khóa học mới thành công!");
  };

  // Delete Course
  const handleDeleteCourse = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  // Export CSV for Leads
  const handleExportCSV = () => {
    const header = "Họ và tên,Số điện thoại,Khóa học đăng ký,Trường ĐH,Ngày đăng ký,Trạng thái\n";
    const rows = leads.map(l => `"${l.name}","${l.phone}","${l.course}","${l.university}","${l.date}","${l.status}"`).join("\n");
    const blob = new Blob(["\uFEFF" + header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Danh_sach_hoc_vien_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Login Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-900 tech-grid-pattern">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl space-y-6 text-white text-center">
          
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto text-cyan-400">
            <Lock size={32} />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full">
              HỆ THỐNG QUẢN TRỊ NỘI DUNG (CMS)
            </span>
            <h1 className="text-2xl font-black tracking-tight text-white">
              PH Digital Admin Portal
            </h1>
            <p className="text-slate-400 text-xs leading-relaxed">
              Trang dành riêng cho Quản trị viên để đăng tải khóa học, lịch thi và tài liệu mà không cần đợi lập trình viên.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-300">Nhập mã PIN Quản trị</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Nhập mã PIN (Mặc định: ph2026)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-mono tracking-widest"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-xs text-rose-400 font-bold bg-rose-950/50 border border-rose-800/60 p-2.5 rounded-xl">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
            >
              Đăng Nhập Vào Trang Quản Trị
            </button>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Admin Top Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 py-3.5 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src="/logo-icon.png" alt="Logo" className="h-8 w-auto object-contain" />
          <div>
            <h2 className="text-sm font-black text-white leading-none font-display">PH DIGITAL EDUCATION</h2>
            <span className="text-[10px] font-mono text-cyan-400 font-bold">ADMIN CMS v2.0 • LIVE MANAGER</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <span>Xem Website Live</span>
            <ExternalLink size={12} />
          </a>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3.5 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut size={12} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
          {[
            { id: "dashboard", label: "Tổng Quan", icon: <LayoutDashboard size={15} /> },
            { id: "courses", label: `Quản Lý Khóa Học (${courses.length})`, icon: <BookOpen size={15} /> },
            { id: "schedules", label: `Lịch Thi & Khai Giảng (${batches.length})`, icon: <Calendar size={15} /> },
            { id: "leads", label: `Học Viên Đăng Ký (${leads.length})`, icon: <Users size={15} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* --- TAB 1: DASHBOARD OVERVIEW --- */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400">Tổng Số Khóa Học</span>
                <div className="text-3xl font-black text-cyan-400">{courses.length} Khóa</div>
                <p className="text-[11px] text-slate-500">Đang hiển thị trên website</p>
              </div>

              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400">Ca Khai Giảng Trong Tháng</span>
                <div className="text-3xl font-black text-blue-400">{batches.length} Lớp</div>
                <p className="text-[11px] text-slate-500">Bao gồm ca tối & cuối tuần</p>
              </div>

              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400">Lead Đăng Ký Mới</span>
                <div className="text-3xl font-black text-amber-400">{leads.length} Học Viên</div>
                <p className="text-[11px] text-slate-500">Cần liên hệ tư vấn hôm nay</p>
              </div>

              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400">Tỷ Lệ Đỗ Chuẩn Đầu Ra</span>
                <div className="text-3xl font-black text-emerald-400">99.4%</div>
                <p className="text-[11px] text-slate-500">Dữ liệu khảo thí Certiport</p>
              </div>
            </div>

            {/* Quick Action Guide Box */}
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 p-6 sm:p-8 rounded-3xl border border-blue-900/60 space-y-4">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <Sparkles size={16} />
                <span>Hướng Dẫn Quản Trị Nhanh Cho Admin:</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-medium">
                <li>• <strong>Thêm / Sửa Khóa học:</strong> Vào tab <em>"Quản Lý Khóa Học"</em> để thêm học phí mới hoặc cập nhật số buổi đào tạo.</li>
                <li>• <strong>Cập nhật Lịch thi:</strong> Đổi trạng thái <em>"Còn 2 suất"</em>, <em>"Sắp đầy chỗ"</em> để tạo động lực học viên đăng ký sớm.</li>
                <li>• <strong>Xuất danh sách học viên:</strong> Vào tab <em>"Học Viên Đăng Ký"</em> để tải file Excel/CSV số điện thoại sinh viên cần tư vấn.</li>
              </ul>
            </div>
          </div>
        )}

        {/* --- TAB 2: COURSE MANAGEMENT --- */}
        {activeTab === "courses" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white">Danh Sách Khóa Học & Học Phí</h3>
                <p className="text-slate-400 text-xs">Bạn có thể thêm mới hoặc điều chỉnh nội dung trực tiếp tại đây.</p>
              </div>
              <button
                onClick={() => setShowAddCourseModal(true)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer w-fit"
              >
                <Plus size={15} />
                <span>Thêm Khóa Học Mới</span>
              </button>
            </div>

            {/* Courses Table */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-black tracking-wider border-b border-slate-800 text-[10px]">
                    <tr>
                      <th className="py-4 px-5">Tên Khóa Học</th>
                      <th className="py-4 px-4">Học Phí</th>
                      <th className="py-4 px-4">Thời Lượng</th>
                      <th className="py-4 px-4">Mã Thi</th>
                      <th className="py-4 px-4 text-center">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {courses.map((course) => (
                      <tr key={course.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="py-4 px-5">
                          <div className="font-bold text-white text-sm">{course.title}</div>
                          <span className="text-[10px] text-slate-400">{course.categoryName}</span>
                        </td>
                        <td className="py-4 px-4 font-black text-cyan-400 text-sm">
                          {course.price}
                        </td>
                        <td className="py-4 px-4 text-slate-300 font-medium">
                          {course.duration}
                        </td>
                        <td className="py-4 px-4 font-mono text-[11px] text-amber-300">
                          {course.examCode || "Certiport"}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <a
                              href={`/khoa-hoc/${course.id}`}
                              target="_blank"
                              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300"
                              title="Xem chi tiết"
                            >
                              <ExternalLink size={13} />
                            </a>
                            <button
                              onClick={() => handleDeleteCourse(course.id)}
                              className="p-2 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-400 cursor-pointer"
                              title="Xóa khóa học"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 3: SCHEDULE MANAGEMENT --- */}
        {activeTab === "schedules" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-black text-white">Quản Lý Lịch Khai Giảng & Suất Thi</h3>
              <p className="text-slate-400 text-xs">Cập nhật ngày khai giảng và số suất còn lại để thúc đẩy đăng ký.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {batches.map((batch) => (
                <div key={batch.id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{batch.name}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-950 text-red-400 border border-red-800">
                      {batch.status}
                    </span>
                  </div>
                  <p className="text-xs text-cyan-400 font-bold">{batch.time}</p>
                  <p className="text-xs text-slate-400">Khai giảng: <strong className="text-white">{batch.startDate}</strong></p>
                  <p className="text-[11px] text-slate-500">Môn học: {batch.subjects}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 4: LEADS CRM & EXCEL EXPORT --- */}
        {activeTab === "leads" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white">Danh Sách Học Viên Đăng Ký Tư Vấn</h3>
                <p className="text-slate-400 text-xs">Danh sách học viên gửi biểu mẫu hoặc làm bài thi thử online.</p>
              </div>
              <button
                onClick={handleExportCSV}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer w-fit"
              >
                <Download size={15} />
                <span>Xuất File Excel (.CSV)</span>
              </button>
            </div>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-black tracking-wider border-b border-slate-800 text-[10px]">
                    <tr>
                      <th className="py-4 px-5">Họ Tên</th>
                      <th className="py-4 px-4">Số Điện Thoại / Zalo</th>
                      <th className="py-4 px-4">Khóa Học Quan Tâm</th>
                      <th className="py-4 px-4">Trường ĐH</th>
                      <th className="py-4 px-4">Ngày Đăng Ký</th>
                      <th className="py-4 px-4 text-center">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="py-4 px-5 font-bold text-white">{lead.name}</td>
                        <td className="py-4 px-4 font-mono font-bold text-cyan-400">
                          <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                        </td>
                        <td className="py-4 px-4 text-slate-300 font-semibold">{lead.course}</td>
                        <td className="py-4 px-4 text-slate-400">{lead.university}</td>
                        <td className="py-4 px-4 text-slate-400">{lead.date}</td>
                        <td className="py-4 px-4 text-center">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-950 text-blue-300 border border-blue-800">
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Modal Add Course */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowAddCourseModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white font-black text-lg cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-lg font-black text-white">Thêm Khóa Học Mới Lên Website</h3>

            <form onSubmit={handleAddCourse} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Tên Khóa Học *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Luyện Thi MOS Excel Cấp Tốc 2026"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Học Phí *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: 1.200.000đ"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Thời Lượng *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: 3 buổi + Luyện đề"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Mô Tả Ngắn</label>
                <textarea
                  rows={2}
                  placeholder="Mô tả tóm tắt nội dung khóa học..."
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-wider text-xs shadow-lg transition-all cursor-pointer mt-2"
              >
                Lưu & Đăng Tải Khóa Học
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
