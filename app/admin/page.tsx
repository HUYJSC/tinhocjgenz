"use client";

import { useState, useRef } from "react";
import { 
  Lock, KeyRound, LayoutDashboard, BookOpen, Calendar, 
  FileText, Users, Plus, Edit2, Trash2, Save, Download, 
  CheckCircle2, AlertCircle, Sparkles, ExternalLink, LogOut, 
  ArrowRight, ShieldCheck, Upload, Video, Image, FileSpreadsheet, 
  Copy, Eye, X, Check, Search, Filter, PlayCircle
} from "lucide-react";
import { coursesData as initialCourses, upcomingBatchesData as initialBatches, Course, BatchSchedule } from "@/data/mockData";

interface MediaFile {
  id: string;
  name: string;
  type: "document" | "video" | "image" | "spreadsheet" | "presentation" | "archive";
  format: string;
  size: string;
  uploadDate: string;
  url: string;
  category: string;
}

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"dashboard" | "courses" | "schedules" | "media" | "leads">("dashboard");

  // Editable State: Courses
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showCourseModal, setShowCourseModal] = useState<boolean>(false);

  // Editable State: Schedules
  const [batches, setBatches] = useState<BatchSchedule[]>(initialBatches);
  const [editingBatch, setEditingBatch] = useState<BatchSchedule | null>(null);
  const [showBatchModal, setShowBatchModal] = useState<boolean>(false);

  // Media & Video Files Manager
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: "file-1",
      name: "De_Thi_Thu_MOS_Excel_2026_Project_1_7.pdf",
      type: "document",
      format: "PDF",
      size: "4.2 MB",
      uploadDate: "23/08/2026",
      url: "/tai-lieu",
      category: "Đề thi MOS"
    },
    {
      id: "file-2",
      name: "Video_Huong_Dan_Giai_Bay_IC3_GS6_FullHD.mp4",
      type: "video",
      format: "MP4",
      size: "185 MB",
      uploadDate: "22/08/2026",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      category: "Video bài giảng"
    },
    {
      id: "file-3",
      name: "Template_Excel_Dashboard_Doanh_So_Dynamic.xlsx",
      type: "spreadsheet",
      format: "XLSX",
      size: "1.8 MB",
      uploadDate: "21/08/2026",
      url: "/tai-lieu",
      category: "Biểu mẫu Excel"
    },
    {
      id: "file-4",
      name: "Chung_Chi_Certiport_DNTU_Diem_Tuyet_Doi_1000.png",
      type: "image",
      format: "PNG",
      size: "2.4 MB",
      uploadDate: "20/08/2026",
      url: "/logo.png",
      category: "Bằng khen & Chứng chỉ"
    }
  ]);
  const [selectedMediaForPreview, setSelectedMediaForPreview] = useState<MediaFile | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Leads CRM
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

  // --- COURSE CRUD ---
  const handleOpenAddCourse = () => {
    setEditingCourse({
      id: `course-${Date.now()}`,
      title: "",
      category: "mos-ic3",
      categoryName: "Chứng Chỉ Quốc Tế MOS & IC3",
      tagline: "",
      price: "",
      duration: "5 buổi",
      badge: "Mới 2026",
      examCode: "Certiport",
      description: "",
      features: ["Cam kết bao đỗ 100%", "Tài khoản máy ảo thi thử", "Kèm 1:1 sát sao"],
      popular: false
    });
    setShowCourseModal(true);
  };

  const handleOpenEditCourse = (course: Course) => {
    setEditingCourse({ ...course });
    setShowCourseModal(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse || !editingCourse.title || !editingCourse.price) return;

    const exists = courses.some(c => c.id === editingCourse.id);
    if (exists) {
      setCourses(courses.map(c => c.id === editingCourse.id ? editingCourse : c));
      alert("Đã cập nhật thông tin khóa học thành công!");
    } else {
      setCourses([editingCourse, ...courses]);
      alert("Đã thêm khóa học mới thành công!");
    }
    setShowCourseModal(false);
    setEditingCourse(null);
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa khóa học này khỏi website?")) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  // --- BATCH SCHEDULE CRUD ---
  const handleOpenAddBatch = () => {
    setEditingBatch({
      id: `batch-${Date.now()}`,
      name: "Khóa Mới",
      time: "Tối 2 - 4 - 6 (19:30 - 21:30)",
      startDate: "Đầu tuần tới",
      subjects: "MOS Word / Excel 2019",
      targetExam: "Đợt thi Certiport gần nhất",
      slotsRemaining: 3,
      status: "Chỉ còn 3 suất"
    });
    setShowBatchModal(true);
  };

  const handleOpenEditBatch = (batch: BatchSchedule) => {
    setEditingBatch({ ...batch });
    setShowBatchModal(true);
  };

  const handleSaveBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBatch) return;

    const exists = batches.some(b => b.id === editingBatch.id);
    if (exists) {
      setBatches(batches.map(b => b.id === editingBatch.id ? editingBatch : b));
      alert("Đã cập nhật lịch khai giảng thành công!");
    } else {
      setBatches([...batches, editingBatch]);
      alert("Đã thêm ca khai giảng mới thành công!");
    }
    setShowBatchModal(false);
    setEditingBatch(null);
  };

  const handleDeleteBatch = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa ca học này?")) {
      setBatches(batches.filter(b => b.id !== id));
    }
  };

  // --- FILE & VIDEO UPLOAD ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const ext = file.name.split(".").pop()?.toUpperCase() || "FILE";
      let fileType: MediaFile["type"] = "document";

      if (["MP4", "WEBM", "MKV", "MOV"].includes(ext)) {
        fileType = "video";
      } else if (["PNG", "JPG", "JPEG", "WEBP", "SVG", "GIF"].includes(ext)) {
        fileType = "image";
      } else if (["XLSX", "XLS", "CSV"].includes(ext)) {
        fileType = "spreadsheet";
      } else if (["PPT", "PPTX"].includes(ext)) {
        fileType = "presentation";
      } else if (["ZIP", "RAR", "7Z"].includes(ext)) {
        fileType = "archive";
      }

      const sizeInMb = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      const blobUrl = URL.createObjectURL(file);

      const newMedia: MediaFile = {
        id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: file.name,
        type: fileType,
        format: ext,
        size: sizeInMb,
        uploadDate: new Date().toLocaleDateString("vi-VN"),
        url: blobUrl,
        category: "Tài liệu tải lên"
      };

      setMediaFiles(prev => [newMedia, ...prev]);
    });

    alert(`Đã tải lên thành công ${files.length} tệp tin / video!`);
  };

  const handleDeleteMedia = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa tệp tin này?")) {
      setMediaFiles(mediaFiles.filter(m => m.id !== id));
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // --- LEADS CRM CRUD ---
  const handleUpdateLeadStatus = (id: string, newStatus: string) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const handleDeleteLead = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa học viên này?")) {
      setLeads(leads.filter(l => l.id !== id));
    }
  };

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
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-900 tech-grid-pattern">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl space-y-6 text-white text-center">
          
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto text-cyan-400">
            <Lock size={32} />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full">
              HỆ THỐNG QUẢN TRỊ NỘI DUNG (CMS)
            </span>
            <h1 className="text-2xl font-black tracking-tight text-white font-display">
              PH Digital Admin Portal
            </h1>
            <p className="text-slate-400 text-xs leading-relaxed">
              Trang dành riêng cho Quản trị viên để thêm, xóa, sửa khóa học, lịch thi, đăng tải hình ảnh, tài liệu và video mà không cần can thiệp code.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-300">Nhập mã PIN Quản trị</label>
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
            <span className="text-[10px] font-mono text-cyan-400 font-bold">ADMIN CMS v2.5 • FILE & VIDEO MANAGER</span>
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
            { id: "media", label: `Quản Lý File & Video (${mediaFiles.length})`, icon: <Video size={15} /> },
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
                <p className="text-[11px] text-slate-500">Đầy đủ tính năng sửa & xóa</p>
              </div>

              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400">Ca Khai Giảng Trong Tháng</span>
                <div className="text-3xl font-black text-blue-400">{batches.length} Lớp</div>
                <p className="text-[11px] text-slate-500">Cập nhật số suất tức thì</p>
              </div>

              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400">Tệp Tin & Video Đã Tải Lên</span>
                <div className="text-3xl font-black text-purple-400">{mediaFiles.length} Tệp</div>
                <p className="text-[11px] text-slate-500">PDF, Video MP4, Excel, Ảnh</p>
              </div>

              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400">Học Viên Cần Tư Vấn</span>
                <div className="text-3xl font-black text-emerald-400">{leads.length} Học Viên</div>
                <p className="text-[11px] text-slate-500">Xuất file Excel chỉ 1 click</p>
              </div>
            </div>

            {/* Quick Action Guide Box */}
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 p-6 sm:p-8 rounded-3xl border border-blue-900/60 space-y-4">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <Sparkles size={16} />
                <span>Hướng Dẫn Quản Trị Toàn Diện:</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-medium">
                <li>• <strong>Xóa & Sửa Khóa học:</strong> Vào tab <em>"Quản Lý Khóa Học"</em>, bấm biểu tượng cây bút để sửa hoặc thùng rác để xóa.</li>
                <li>• <strong>Tải lên File & Video:</strong> Vào tab <em>"Quản Lý File & Video"</em> để đăng tải file PDF đề thi, video bài giảng MP4, tài liệu Excel hoặc hình ảnh chứng chỉ.</li>
                <li>• <strong>Đổi trạng thái Lịch thi:</strong> Chỉnh sửa ca học, số suất còn lại để tạo động lực đăng ký cho sinh viên.</li>
              </ul>
            </div>
          </div>
        )}

        {/* --- TAB 2: COURSE MANAGEMENT (FULL CRUD) --- */}
        {activeTab === "courses" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white">Quản Lý Khóa Học (Thêm - Sửa - Xóa)</h3>
                <p className="text-slate-400 text-xs">Mọi thay đổi sẽ được cập nhật trực tiếp trên trang chi tiết và trang chủ.</p>
              </div>
              <button
                onClick={handleOpenAddCourse}
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
                              title="Xem chi tiết trên Web"
                            >
                              <ExternalLink size={13} />
                            </a>
                            <button
                              onClick={() => handleOpenEditCourse(course)}
                              className="p-2 rounded-lg bg-blue-950 hover:bg-blue-900 text-blue-300 cursor-pointer"
                              title="Chỉnh sửa khóa học"
                            >
                              <Edit2 size={13} />
                            </button>
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

        {/* --- TAB 3: SCHEDULE MANAGEMENT (FULL CRUD) --- */}
        {activeTab === "schedules" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white">Quản Lý Lịch Thi & Khai Giảng</h3>
                <p className="text-slate-400 text-xs">Thêm, sửa và điều chỉnh trạng thái slot thi Certiport hàng tháng.</p>
              </div>
              <button
                onClick={handleOpenAddBatch}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer w-fit"
              >
                <Plus size={15} />
                <span>Thêm Ca Học Mới</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {batches.map((batch) => (
                <div key={batch.id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 relative flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{batch.name}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-950 text-red-400 border border-red-800">
                        {batch.status}
                      </span>
                    </div>
                    <p className="text-xs text-cyan-400 font-bold">{batch.time}</p>
                    <p className="text-xs text-slate-300">Khai giảng: <strong className="text-white">{batch.startDate}</strong></p>
                    <p className="text-[11px] text-slate-400">Môn học: {batch.subjects}</p>
                    <p className="text-[10px] text-slate-500 font-mono">Đợt thi: {batch.targetExam}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditBatch(batch)}
                      className="px-3 py-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-blue-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 size={12} />
                      <span>Sửa</span>
                    </button>
                    <button
                      onClick={() => handleDeleteBatch(batch.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={12} />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 4: FILE & VIDEO MANAGER (UPLOAD & DOWNLOAD SUPPORT) --- */}
        {activeTab === "media" && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Top action header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white">Quản Lý Tệp Tin, Tài Liệu & Video</h3>
                <p className="text-slate-400 text-xs">Hỗ trợ tải lên và quản lý mọi định dạng: PDF, MP4 Video, Word, Excel, PowerPoint, ZIP, Hình ảnh.</p>
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp4,.webm,.zip,.rar,.png,.jpg,.jpeg,.webp"
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer w-fit"
              >
                <Upload size={16} />
                <span>Tải Tệp / Video Lên Hệ Thống</span>
              </button>
            </div>

            {/* Drag and Drop Zone Helper */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 bg-slate-900/50 hover:bg-slate-900 rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/60 flex items-center justify-center mx-auto">
                <Upload size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">Bấm vào đây để chọn tệp hoặc kéo thả tệp vào khung này</p>
                <p className="text-xs text-slate-500">Hỗ trợ: PDF, Video MP4, Excel XLSX, Word DOCX, PowerPoint PPTX, ZIP, Hình ảnh PNG/JPG</p>
              </div>
            </div>

            {/* Media Files Table */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-black tracking-wider border-b border-slate-800 text-[10px]">
                    <tr>
                      <th className="py-4 px-5">Tên Tệp Tin / Video</th>
                      <th className="py-4 px-4">Định Dạng</th>
                      <th className="py-4 px-4">Dung Lượng</th>
                      <th className="py-4 px-4">Danh Mục</th>
                      <th className="py-4 px-4">Ngày Đăng</th>
                      <th className="py-4 px-4 text-center">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {mediaFiles.map((media) => (
                      <tr key={media.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                              {media.type === "video" ? <Video size={16} /> :
                               media.type === "image" ? <Image size={16} /> :
                               media.type === "spreadsheet" ? <FileSpreadsheet size={16} /> :
                               <FileText size={16} />}
                            </div>
                            <span className="font-bold text-white max-w-xs truncate">{media.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-800 text-cyan-300">
                            {media.format}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-300 font-mono text-[11px]">
                          {media.size}
                        </td>
                        <td className="py-4 px-4 text-slate-400">
                          {media.category}
                        </td>
                        <td className="py-4 px-4 text-slate-400 text-[11px]">
                          {media.uploadDate}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* Preview Button */}
                            <button
                              onClick={() => setSelectedMediaForPreview(media)}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 cursor-pointer"
                              title="Xem trước tệp / video"
                            >
                              <Eye size={13} />
                            </button>
                            {/* Copy Link Button */}
                            <button
                              onClick={() => handleCopyUrl(media.id, media.url)}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                              title="Sao chép liên kết"
                            >
                              {copiedId === media.id ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                            </button>
                            {/* Download Button */}
                            <a
                              href={media.url}
                              download={media.name}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400"
                              title="Tải về máy"
                            >
                              <Download size={13} />
                            </a>
                            {/* Delete Button */}
                            <button
                              onClick={() => handleDeleteMedia(media.id)}
                              className="p-2 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-400 cursor-pointer"
                              title="Xóa tệp"
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

        {/* --- TAB 5: LEADS CRM (FULL MANAGEMENT) --- */}
        {activeTab === "leads" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white">Quản Lý Danh Sách Học Viên Đăng Ký</h3>
                <p className="text-slate-400 text-xs">Cập nhật trạng thái gọi tư vấn hoặc xóa các lead rác.</p>
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
                      <th className="py-4 px-4">Khóa Học</th>
                      <th className="py-4 px-4">Trường ĐH</th>
                      <th className="py-4 px-4">Ngày Đăng Ký</th>
                      <th className="py-4 px-4">Trạng Thái</th>
                      <th className="py-4 px-4 text-center">Thao Tác</th>
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
                        <td className="py-4 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                            className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-[11px] font-bold text-cyan-300 focus:outline-none focus:border-cyan-400"
                          >
                            <option value="Chờ gọi">Chờ gọi</option>
                            <option value="Đã tư vấn">Đã tư vấn</option>
                            <option value="Đã đóng học phí">Đã đóng học phí</option>
                            <option value="Đã thi đỗ">Đã thi đỗ</option>
                            <option value="Hủy">Hủy</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-2 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-400 cursor-pointer"
                            title="Xóa lead"
                          >
                            <Trash2 size={13} />
                          </button>
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

      {/* --- MODAL 1: ADD / EDIT COURSE --- */}
      {showCourseModal && editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCourseModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white font-black text-lg cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-lg font-black text-white">
              {courses.some(c => c.id === editingCourse.id) ? "Chỉnh Sửa Khóa Học" : "Thêm Khóa Học Mới"}
            </h3>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Tên Khóa Học *</label>
                <input
                  type="text"
                  required
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Học Phí *</label>
                  <input
                    type="text"
                    required
                    value={String(editingCourse.price)}
                    onChange={(e) => setEditingCourse({ ...editingCourse, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Thời Lượng *</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.duration}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Mã Thi (Certiport)</label>
                  <input
                    type="text"
                    value={editingCourse.examCode || ""}
                    onChange={(e) => setEditingCourse({ ...editingCourse, examCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Huy Hiệu (Badge)</label>
                  <input
                    type="text"
                    value={editingCourse.badge || ""}
                    onChange={(e) => setEditingCourse({ ...editingCourse, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Mô Tả Khóa Học</label>
                <textarea
                  rows={3}
                  value={editingCourse.description}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-wider text-xs shadow-lg transition-all cursor-pointer mt-2"
              >
                Lưu Thay Đổi
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: ADD / EDIT BATCH SCHEDULE --- */}
      {showBatchModal && editingBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowBatchModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white font-black text-lg cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-lg font-black text-white">
              {batches.some(b => b.id === editingBatch.id) ? "Chỉnh Sửa Ca Khai Giảng" : "Thêm Ca Khai Giảng Mới"}
            </h3>

            <form onSubmit={handleSaveBatch} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Tên Lớp Học *</label>
                <input
                  type="text"
                  required
                  value={editingBatch.name}
                  onChange={(e) => setEditingBatch({ ...editingBatch, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Thời Gian Học *</label>
                  <input
                    type="text"
                    required
                    value={editingBatch.time}
                    onChange={(e) => setEditingBatch({ ...editingBatch, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Ngày Khai Giảng *</label>
                  <input
                    type="text"
                    required
                    value={editingBatch.startDate}
                    onChange={(e) => setEditingBatch({ ...editingBatch, startDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Trạng Thái Slot</label>
                  <input
                    type="text"
                    value={editingBatch.status}
                    onChange={(e) => setEditingBatch({ ...editingBatch, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Đợt Thi Dự Kiến</label>
                  <input
                    type="text"
                    value={editingBatch.targetExam}
                    onChange={(e) => setEditingBatch({ ...editingBatch, targetExam: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-wider text-xs shadow-lg transition-all cursor-pointer mt-2"
              >
                Lưu Ca Học
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 3: MEDIA PREVIEW --- */}
      {selectedMediaForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-white space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedMediaForPreview(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white font-black text-lg cursor-pointer"
            >
              ✕
            </button>

            <div>
              <span className="text-[10px] font-mono uppercase bg-slate-800 text-cyan-400 px-2.5 py-1 rounded">
                {selectedMediaForPreview.format} • {selectedMediaForPreview.size}
              </span>
              <h3 className="text-base font-black text-white mt-2 truncate">
                {selectedMediaForPreview.name}
              </h3>
            </div>

            {/* Video Preview */}
            {selectedMediaForPreview.type === "video" ? (
              <div className="rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center border border-slate-800">
                <video
                  controls
                  className="w-full h-full object-contain"
                  src={selectedMediaForPreview.url}
                >
                  Trình duyệt của bạn không hỗ trợ phát video này.
                </video>
              </div>
            ) : selectedMediaForPreview.type === "image" ? (
              <div className="rounded-2xl overflow-hidden bg-slate-950 p-4 border border-slate-800 flex items-center justify-center max-h-80">
                <img src={selectedMediaForPreview.url} alt="Preview" className="max-h-72 object-contain" />
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
                <FileText size={48} className="text-cyan-400 mx-auto" />
                <p className="text-xs text-slate-400">Tệp tài liệu dạng {selectedMediaForPreview.format}</p>
                <a
                  href={selectedMediaForPreview.url}
                  download={selectedMediaForPreview.name}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                >
                  <Download size={14} />
                  <span>Tải Về Xem Nội Dung</span>
                </a>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
              <span className="text-slate-400">Liên kết: <code className="text-cyan-300 font-mono text-[10px]">{selectedMediaForPreview.url}</code></span>
              <button
                onClick={() => handleCopyUrl(selectedMediaForPreview.id, selectedMediaForPreview.url)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <Copy size={12} />
                <span>Sao chép Link</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
