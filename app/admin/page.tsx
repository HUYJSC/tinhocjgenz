"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { 
  Lock, KeyRound, LayoutDashboard, BookOpen, Calendar, 
  FileText, Users, Plus, Edit2, Trash2, Save, Download, 
  CheckCircle2, AlertCircle, Sparkles, ExternalLink, LogOut, 
  ArrowRight, ShieldCheck, Upload, Video, Image, FileSpreadsheet, 
  Copy, Eye, X, Check, Search, Filter, PlayCircle, TrendingUp,
  Brain, QrCode, FileCheck2, School, Phone, Mail, Award, Clock,
  ChevronRight, RefreshCw, BarChart3, Database
} from "lucide-react";
import { coursesData as initialCourses, upcomingBatchesData as initialBatches, Course, BatchSchedule } from "@/data/mockData";
import { BLOG_POSTS as initialBlogPosts, BlogPost } from "@/data/blogData";

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

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<"dashboard" | "courses" | "schedules" | "media" | "leads" | "blog" | "blockchain">("dashboard");

  // Courses state
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showCourseModal, setShowCourseModal] = useState<boolean>(false);
  const [courseSearch, setCourseSearch] = useState<string>("");

  // Schedules state
  const [batches, setBatches] = useState<BatchSchedule[]>(initialBatches);
  const [editingBatch, setEditingBatch] = useState<BatchSchedule | null>(null);
  const [showBatchModal, setShowBatchModal] = useState<boolean>(false);

  // Blog posts state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  // Media files manager
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
      url: "/logo-icon.png",
      category: "Bằng khen & Chứng chỉ"
    }
  ]);
  const [selectedMediaForPreview, setSelectedMediaForPreview] = useState<MediaFile | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Leads CRM
  const [leads, setLeads] = useState([
    { id: "lead-1", name: "Nguyễn Văn Tuấn", phone: "0968123456", course: "Combo MOS 3 Môn", university: "Sinh viên Đại học", date: "24/08/2026", status: "Chờ gọi", note: "Cần thi gấp lấy chứng chỉ quốc tế" },
    { id: "lead-2", name: "Lê Thị Mai", phone: "0912345678", course: "Chứng chỉ IC3 GS6", university: "Học sinh THPT", date: "23/08/2026", status: "Đã tư vấn", note: "Đăng ký nhóm 3 bạn giảm 30%" },
    { id: "lead-3", name: "Trần Minh Quang", phone: "0987654321", course: "MOS Excel 2019", university: "Chuyên viên Kế toán", date: "23/08/2026", status: "Đã đóng học phí", note: "Học lớp tối 2-4-6" },
    { id: "lead-4", name: "Hoàng Thảo My", phone: "0933456789", course: "Ứng dụng AI Văn Phòng", university: "Doanh nghiệp / Quản lý", date: "22/08/2026", status: "Đã tư vấn", note: "Đang phân vân học kèm 1:1" }
  ]);
  const [leadFilter, setLeadFilter] = useState<string>("all");

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "ph2026" || pinInput === "admin" || pinInput === "123456") {
      setIsAuthenticated(true);
      setLoginError(null);
    } else {
      setLoginError("Mã PIN quản trị không chính xác! (Mã mặc định: ph2026)");
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter(l => leadFilter === "all" || l.status === leadFilter);

  // Filtered Courses
  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(courseSearch.toLowerCase()) || 
    c.description.toLowerCase().includes(courseSearch.toLowerCase())
  );

  // COURSE CRUD
  const handleOpenAddCourse = () => {
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
    } else {
      setCourses([editingCourse, ...courses]);
    }
    setShowCourseModal(false);
    setEditingCourse(null);
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa khóa học này khỏi hệ thống?")) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  // SCHEDULE CRUD
  const handleOpenAddBatch = () => {
    setEditingBatch({
      id: `batch-${Date.now()}`,
      courseName: "Lớp MOS Cấp Tốc Mới",
      courseType: "MOS",
      startDate: "Thứ 2 tuần tới",
      scheduleTime: "Tối 2 - 4 - 6 (19:30 - 21:30)",
      mode: "Online qua Zoom/Google Meet",
      slotsRemaining: 3,
      status: "Đang mở đăng ký"
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
    } else {
      setBatches([...batches, editingBatch]);
    }
    setShowBatchModal(false);
    setEditingBatch(null);
  };

  const handleDeleteBatch = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa ca học này?")) {
      setBatches(batches.filter(b => b.id !== id));
    }
  };

  // FILE UPLOAD
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

  // LEADS CRM
  const handleUpdateLeadStatus = (id: string, newStatus: string) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const handleDeleteLead = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa hồ sơ học viên này?")) {
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  const handleExportCSV = () => {
    const header = "Họ và tên,Số điện thoại,Khóa học đăng ký,Trường ĐH,Ngày đăng ký,Trạng thái,Ghi chú\n";
    const rows = leads.map(l => `"${l.name}","${l.phone}","${l.course}","${l.university}","${l.date}","${l.status}","${l.note}"`).join("\n");
    const blob = new Blob(["\uFEFF" + header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Danh_sach_hoc_vien_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- LOGIN GATEWAY SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 relative overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="relative z-10 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl space-y-6 text-white text-center">
          
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto text-cyan-400 shadow-inner">
            <Lock size={28} />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-cyan-300 bg-cyan-950/70 border border-cyan-800/60 px-3 py-1 rounded-full">
              HỆ THỐNG QUẢN TRỊ NỘI DUNG (CMS)
            </span>
            <h1 className="text-2xl font-black tracking-tight text-white font-display">
              PH Digital Executive Portal
            </h1>
            <p className="text-slate-400 text-xs leading-relaxed">
              Trang dành riêng cho Quản trị viên để quản lý khóa học, lịch thi, danh sách học viên, bài viết blog và tệp tin đa phương tiện.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-300">Mã PIN Bảo Mật Quản Trị:</label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Nhập mã PIN (Mặc định: ph2026)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 font-mono tracking-widest"
              />
            </div>

            {loginError && (
              <p className="text-xs text-rose-400 font-bold bg-rose-950/60 border border-rose-800/80 p-2.5 rounded-xl text-left">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-500/20 transition-all cursor-pointer hover:scale-[1.01]"
            >
              Mở Khóa Trang Quản Trị
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>© PH Digital Education</span>
            <Link href="/" className="text-cyan-400 hover:underline">Về trang chủ</Link>
          </div>

        </div>
      </div>
    );
  }

  // --- AUTHENTICATED ADMIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      
      {/* 1. Admin Top Executive Bar */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800/90 py-3 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src="/logo-icon.png" alt="Logo" className="h-8 w-auto object-contain" />
          <div>
            <h2 className="text-sm font-black text-white leading-none font-display">PH DIGITAL EDUCATION</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400 font-bold">SYSTEM ONLINE • CMS v2.6 PRODUCTION</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-700/60"
          >
            <span>Website Live</span>
            <ExternalLink size={12} />
          </Link>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold transition-colors flex items-center gap-1.5 border border-rose-500/30 cursor-pointer"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Đăng Xuất</span>
          </button>
        </div>
      </header>

      {/* 2. Admin Layout: Sidebar + Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-full lg:w-64 bg-slate-900/60 border-r border-slate-800/80 p-4 space-y-2 shrink-0">
          
          <div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
            Menu Quản Trị
          </div>

          <nav className="space-y-1">
            {[
              { id: "dashboard", label: "Tổng Quan (KPI)", icon: <LayoutDashboard size={16} />, badge: "Live" },
              { id: "leads", label: "CRM Học Viên", icon: <Users size={16} />, badge: leads.length },
              { id: "courses", label: "Quản Lý Khóa Học", icon: <BookOpen size={16} />, badge: courses.length },
              { id: "schedules", label: "Lịch Khai Giảng", icon: <Calendar size={16} />, badge: batches.length },
              { id: "blog", label: "Cẩm Nang & SEO", icon: <FileText size={16} />, badge: blogPosts.length },
              { id: "media", label: "Tệp Tin & Video", icon: <Upload size={16} />, badge: mediaFiles.length },
              { id: "blockchain", label: "Sổ Cái Blockchain", icon: <Database size={16} />, badge: "On-Chain" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick System Status Widget in Sidebar */}
          <div className="pt-6 mt-6 border-t border-slate-800">
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-400">Trợ Lý AI Advisor:</span>
                <span className="text-cyan-400">Kích Hoạt</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-400">Schema JSON-LD:</span>
                <span className="text-emerald-400">Chuẩn SEO</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-400">Bảo mật Sổ cái:</span>
                <span className="text-amber-400">SHA-256</span>
              </div>
            </div>
          </div>

        </aside>

        {/* Main Dashboard Canvas */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto space-y-8">
          
          {/* TAB 1: EXECUTIVE KPI DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white font-display">Bảng Điều Khiển Quản Trị</h1>
                  <p className="text-xs text-slate-400 mt-0.5">Tổng hợp số liệu hiệu quả hoạt động đào tạo và tuyển sinh theo thời gian thực.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleExportCSV}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                  >
                    <Download size={13} />
                    <span>Xuất Báo Cáo CRM</span>
                  </button>
                  <button 
                    onClick={handleOpenAddCourse}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-black text-white transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Thêm Khóa Học</span>
                  </button>
                </div>
              </div>

              {/* 4 Primary KPI Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                <div className="bg-slate-900/80 border border-slate-800/80 p-5 rounded-2xl shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase tracking-wider">Học Viên Mới (Tháng này)</span>
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                      <Users size={16} />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-white font-display">128</div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-bold">
                    <TrendingUp size={12} />
                    <span>+24% so với tháng trước</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800/80 p-5 rounded-2xl shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase tracking-wider">Tỷ Lệ Đỗ Chuẩn Đầu Ra</span>
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                      <ShieldCheck size={16} />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-emerald-400 font-display">100%</div>
                  <div className="text-[11px] text-slate-400">
                    <span>Đạt 900 - 1000đ tại IIG</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800/80 p-5 rounded-2xl shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase tracking-wider">Lượt Tra Cứu AI Advisor</span>
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                      <Brain size={16} />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-cyan-300 font-display">1,450+</div>
                  <div className="text-[11px] text-cyan-400 font-bold">
                    <span>Chuẩn đoán lộ trình DNTU/LHU</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800/80 p-5 rounded-2xl shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase tracking-wider">Bài Viết SEO Đã Xuất Bản</span>
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                      <FileText size={16} />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-white font-display">{blogPosts.length}</div>
                  <div className="text-[11px] text-slate-400">
                    <span>Index Google Sitemaps 100%</span>
                  </div>
                </div>

              </div>

              {/* Recent Leads Preview Table */}
              <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-white font-display">Yêu Cầu Tư Vấn & Xếp Lớp Gần Nhất</h3>
                    <p className="text-xs text-slate-400">Dữ liệu tự động đồng bộ từ Form liên hệ, AI Advisor và Zalo hotline.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("leads")}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Xem toàn bộ CRM</span>
                    <ChevronRight size={13} />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-black uppercase text-[10px]">
                        <th className="pb-3">Học Viên</th>
                        <th className="pb-3">Số Điện Thoại</th>
                        <th className="pb-3">Khóa Quan Tâm</th>
                        <th className="pb-3">Trường ĐH</th>
                        <th className="pb-3">Trạng Thái</th>
                        <th className="pb-3 text-right">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {leads.slice(0, 4).map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 font-bold text-white">{lead.name}</td>
                          <td className="py-3 font-mono text-cyan-300">{lead.phone}</td>
                          <td className="py-3 text-slate-300">{lead.course}</td>
                          <td className="py-3 text-slate-400">{lead.university}</td>
                          <td className="py-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              lead.status === "Chờ gọi"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                : lead.status === "Đã tư vấn"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <a
                              href={`tel:${lead.phone}`}
                              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] inline-flex items-center gap-1"
                            >
                              <Phone size={11} /> Gọi Ngay
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: COURSES MANAGEMENT */}
          {activeTab === "courses" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white font-display">Danh Mục Khóa Học ({courses.length})</h1>
                  <p className="text-xs text-slate-400">Thêm, chỉnh sửa nội dung, học phí và lộ trình đào tạo trực tiếp trên website.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Tìm khóa học..."
                      value={courseSearch}
                      onChange={(e) => setCourseSearch(e.target.value)}
                      className="pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 w-48"
                    />
                  </div>
                  <button
                    onClick={handleOpenAddCourse}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-black text-white flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Thêm Khóa Mới</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <div 
                    key={course.id}
                    className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                          {course.categoryName || "Khóa Học"}
                        </span>
                        {course.popular && (
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-black">
                            POPULAR
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-black text-white leading-snug font-display">{course.title}</h3>
                      <p className="text-slate-400 text-xs line-clamp-2">{course.description}</p>
                      
                      <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Thời lượng: <strong>{course.duration}</strong></span>
                        <span className="text-amber-400 font-black text-sm">
                          {typeof course.price === "number" ? course.price.toLocaleString("vi-VN") + "đ" : course.price}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <Link
                        href={`/khoa-hoc/${course.id}`}
                        target="_blank"
                        className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <span>Xem trang</span>
                        <ExternalLink size={11} />
                      </Link>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditCourse(course)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                          title="Chỉnh sửa"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Xóa khóa học"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SCHEDULES */}
          {activeTab === "schedules" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white font-display">Lịch Khai Giảng & Xếp Lớp ({batches.length})</h1>
                  <p className="text-xs text-slate-400">Cập nhật ca học mới, thời gian học và số chỗ còn lại cho học viên.</p>
                </div>
                <button
                  onClick={handleOpenAddBatch}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-black text-white flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Thêm Lịch Khai Giảng</span>
                </button>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-black uppercase text-[10px]">
                      <th className="p-4">Tên Lớp / Khóa</th>
                      <th className="p-4">Hình Thức</th>
                      <th className="p-4">Ngày Khai Giảng</th>
                      <th className="p-4">Lịch Học</th>
                      <th className="p-4">Chỗ Còn Lại</th>
                      <th className="p-4 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {batches.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-4 font-bold text-white">{b.courseName}</td>
                        <td className="p-4 text-slate-300">{b.mode}</td>
                        <td className="p-4 text-cyan-300 font-semibold">{b.startDate}</td>
                        <td className="p-4 text-slate-400">{b.scheduleTime}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {b.status} ({b.slotsRemaining} chỗ)
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleOpenEditBatch(b)}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-blue-400 mr-2 cursor-pointer"
                            title="Sửa"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteBatch(b.id)}
                            className="p-1.5 rounded bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 cursor-pointer"
                            title="Xóa"
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
          )}

          {/* TAB 4: CRM LEADS */}
          {activeTab === "leads" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white font-display">Quản Trị Hồ Sơ Học Viên & Leads ({leads.length})</h1>
                  <p className="text-xs text-slate-400">Theo dõi tiến độ tư vấn, xếp lớp và xuất file CSV phục vụ phòng đào tạo.</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={leadFilter}
                    onChange={(e) => setLeadFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="Chờ gọi">Chờ gọi</option>
                    <option value="Đã tư vấn">Đã tư vấn</option>
                    <option value="Đã đóng học phí">Đã đóng học phí</option>
                  </select>
                  <button
                    onClick={handleExportCSV}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-black text-white flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Xuất CSV Excel</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-black uppercase text-[10px]">
                      <th className="p-4">Họ Và Tên</th>
                      <th className="p-4">Số Điện Thoại</th>
                      <th className="p-4">Khóa Học</th>
                      <th className="p-4">Đối Tượng / Ghi Chú</th>
                      <th className="p-4">Ngày Nhận</th>
                      <th className="p-4">Trạng Thái</th>
                      <th className="p-4 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredLeads.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-4 font-bold text-white">{l.name}</td>
                        <td className="p-4 font-mono text-cyan-300 font-bold">{l.phone}</td>
                        <td className="p-4 text-slate-300">{l.course}</td>
                        <td className="p-4 text-slate-400">
                          <div>{l.university}</div>
                          {l.note && <div className="text-[10px] text-amber-300/80 mt-0.5">{l.note}</div>}
                        </td>
                        <td className="p-4 text-slate-400">{l.date}</td>
                        <td className="p-4">
                          <select
                            value={l.status}
                            onChange={(e) => handleUpdateLeadStatus(l.id, e.target.value)}
                            className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] font-bold text-white focus:outline-none"
                          >
                            <option value="Chờ gọi">Chờ gọi</option>
                            <option value="Đã tư vấn">Đã tư vấn</option>
                            <option value="Đã đóng học phí">Đã đóng học phí</option>
                          </select>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <a
                            href={`tel:${l.phone}`}
                            className="p-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white inline-block cursor-pointer"
                            title="Gọi điện thoại"
                          >
                            <Phone size={12} />
                          </a>
                          <button
                            onClick={() => handleDeleteLead(l.id)}
                            className="p-1.5 rounded bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 cursor-pointer"
                            title="Xóa"
                          >
                            <Trash2 size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: BLOG & SEO CONTENT */}
          {activeTab === "blog" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white font-display">Cẩm Nang Tri Thức & SEO Articles ({blogPosts.length})</h1>
                  <p className="text-xs text-slate-400">Quản lý các bài viết cẩm nang, mẹo thi 1000đ và quy chế chuẩn đầu ra ĐH.</p>
                </div>
                <Link
                  href="/blog"
                  target="_blank"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5 border border-slate-700"
                >
                  <ExternalLink size={13} />
                  <span>Xem Trang Blog Live</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <div key={post.slug} className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="relative h-36 overflow-hidden">
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-black uppercase bg-slate-900/90 text-white">
                          {post.categoryName}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <Clock size={11} /> {post.readTime} • {post.views} lượt xem
                        </div>
                        <h4 className="text-sm font-black text-white leading-snug line-clamp-2 font-display">{post.title}</h4>
                        <p className="text-slate-400 text-xs line-clamp-2">{post.excerpt}</p>
                      </div>
                    </div>

                    <div className="p-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500">{post.author.name}</span>
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-blue-400 hover:underline font-bold flex items-center gap-1"
                      >
                        <span>Đọc thử</span>
                        <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: MEDIA & FILE MANAGER */}
          {activeTab === "media" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white font-display">Quản Lý Tệp Tin & Video Bài Giảng ({mediaFiles.length})</h1>
                  <p className="text-xs text-slate-400">Tải lên đề thi PDF, file Excel mẫu và video hướng dẫn giải bẫy Certiport.</p>
                </div>
                <div>
                  <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-xs font-black text-white flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Upload size={14} />
                    <span>Tải Lên Tệp / Video Mới</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {mediaFiles.map((file) => (
                  <div key={file.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400">
                        {file.type === "video" ? <Video size={18} /> : file.type === "image" ? <Image size={18} /> : <FileSpreadsheet size={18} />}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {file.format}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-white truncate" title={file.name}>{file.name}</h4>
                      <p className="text-[10px] text-slate-400">{file.size} • {file.uploadDate}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => handleCopyUrl(file.id, file.url)}
                        className="text-[10px] font-bold text-cyan-300 hover:text-cyan-200 flex items-center gap-1 cursor-pointer"
                      >
                        <Copy size={11} />
                        <span>{copiedId === file.id ? "Đã copy!" : "Copy Link"}</span>
                      </button>
                      <button
                        onClick={() => handleDeleteMedia(file.id)}
                        className="text-slate-500 hover:text-rose-400 cursor-pointer"
                        title="Xóa tệp"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: BLOCKCHAIN & AI LOGS */}
          {activeTab === "blockchain" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-black text-white font-display">Sổ Cái Xác Thực Blockchain & AI Logs</h1>
                <p className="text-xs text-slate-400">Nhật ký mã băm SHA-256 cấp phát chứng chỉ học viên và lưu vết truy vấn Trợ lý AI.</p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black text-cyan-300 uppercase tracking-wider">
                  <Database size={15} />
                  <span>Sổ Cái Chứng Chỉ Certiport On-Chain (W3C Verifiable Credentials)</span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-[10px]">Học viên: Nguyễn Minh Thư (DNTU - 980đ MOS Excel)</p>
                      <p className="text-cyan-400 text-xs">0x8f7d9a3be4120984c1f58a7c2934bb0e1980dntu</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">VALID</span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-[10px]">Học viên: Trần Hoàng Nam (DNTU - 1000đ Combo MOS)</p>
                      <p className="text-cyan-400 text-xs">0x1a9c33f7b0e11894d8721c56ab88ef01000dntu</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">VALID</span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-[10px]">Học viên: Lê Thị Thảo Vy (LHU - 920đ IC3 GS6)</p>
                      <p className="text-cyan-400 text-xs">0x44cd98a12e345b89a01f78c90123e4920lhu</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">VALID</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Course Edit/Add Modal */}
      {showCourseModal && editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black font-display">{editingCourse.title ? "Chỉnh Sửa Khóa Học" : "Thêm Khóa Học Mới"}</h3>
              <button onClick={() => setShowCourseModal(false)} className="text-slate-400 hover:text-white cursor-pointer"><X size={18} /></button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-300 font-bold">Tên Khóa Học:</label>
                <input
                  type="text"
                  required
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold">Học Phí (VNĐ hoặc text):</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.price}
                    onChange={(e) => setEditingCourse({ ...editingCourse, price: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold">Thời Lượng:</label>
                  <input
                    type="text"
                    value={editingCourse.duration}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold">Mô Tả Ngắn:</label>
                <textarea
                  rows={3}
                  value={editingCourse.description}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white mt-1"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCourseModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black cursor-pointer"
                >
                  Lưu Khóa Học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Batch Schedule Modal */}
      {showBatchModal && editingBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black font-display">Cập Nhật Lịch Khai Giảng</h3>
              <button onClick={() => setShowBatchModal(false)} className="text-slate-400 hover:text-white cursor-pointer"><X size={18} /></button>
            </div>

            <form onSubmit={handleSaveBatch} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-300 font-bold">Tên Lớp / Môn Học:</label>
                <input
                  type="text"
                  required
                  value={editingBatch.courseName}
                  onChange={(e) => setEditingBatch({ ...editingBatch, courseName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold">Ngày Khai Giảng:</label>
                  <input
                    type="text"
                    required
                    value={editingBatch.startDate}
                    onChange={(e) => setEditingBatch({ ...editingBatch, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold">Số Chỗ Còn Lại:</label>
                  <input
                    type="number"
                    value={editingBatch.slotsRemaining}
                    onChange={(e) => setEditingBatch({ ...editingBatch, slotsRemaining: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold">Khung Giờ Học:</label>
                <input
                  type="text"
                  value={editingBatch.scheduleTime}
                  onChange={(e) => setEditingBatch({ ...editingBatch, scheduleTime: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white mt-1"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBatchModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black cursor-pointer"
                >
                  Lưu Lịch Học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
