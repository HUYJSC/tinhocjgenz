"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  PlayCircle,
  CheckCircle2,
  Clock,
  Award,
  UploadCloud,
  FileText,
  Sparkles,
  BarChart3,
  QrCode,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  Download
} from "lucide-react";

export default function StudentPortalPage() {
  const [activeTab, setActiveTab] = useState<"lessons" | "submissions" | "skills" | "certificate">("lessons");
  const [selectedLesson, setSelectedLesson] = useState<number>(1);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  const studentInfo = {
    name: "Nguyễn Hoàng Nam",
    studentId: "HV-MOS-2026-089",
    course: "Luyện Thi MOS 2019 / 365 Master Combo (Word, Excel, PowerPoint)",
    progress: 80,
    nextExamDate: "15/09/2026",
    teacher: "Thầy Huy (MOS Master Trainer)",
    status: "Đang học cấp tốc",
  };

  const lessons = [
    {
      id: 1,
      session: "Buổi 1",
      title: "MOS Word Master: Heading Styles & Mục Lục Tự Động",
      duration: "50 phút",
      completed: true,
      hasExercise: true,
      exerciseName: "Bai_Tap_Thuc_Hanh_Word_Buoi_1.docx",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      teacherNote: "Chú ý bẫy định dạng Heading 1 phải chuẩn Font chữ và Spacing."
    },
    {
      id: 2,
      session: "Buổi 2",
      title: "MOS Word Master: Mail Merge & Phân Đoạn Section Break",
      duration: "55 phút",
      completed: true,
      hasExercise: true,
      exerciseName: "De_Luyen_MailMerge_Certiport.docx",
      teacherNote: "Rất tốt! Bài nộp đã đạt 100/100 điểm kỹ năng trộn thư."
    },
    {
      id: 3,
      session: "Buổi 3",
      title: "MOS Excel Specialist: Làm Chủ Hàm XLOOKUP, INDEX & MATCH",
      duration: "65 phút",
      completed: true,
      hasExercise: true,
      exerciseName: "Bai_Tap_Excel_XLOOKUP_Chuyen_Sau.xlsx",
      teacherNote: "Học viên nắm chắc cú pháp hàm, cần lưu ý khóa tham chiếu F4."
    },
    {
      id: 4,
      session: "Buổi 4",
      title: "MOS Excel Specialist: Báo Cáo Động PivotTable & Slicers",
      duration: "60 phút",
      completed: false,
      hasExercise: true,
      exerciseName: "De_Thi_Thu_Excel_Full_Project_1.xlsx",
      teacherNote: "Hãy hoàn thành và nộp trước 20:00 tối mai để được giảng viên sửa bài."
    },
    {
      id: 5,
      session: "Buổi 5",
      title: "MOS PowerPoint Specialist: Slide Master & Hiệu Ứng Nâng Cao",
      duration: "50 phút",
      completed: false,
      hasExercise: false,
      teacherNote: "Buổi tổng kết và luyện đề bấm giờ trên máy ảo."
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0].name);
    }
  };

  const handleSubmitExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <GraduationCap size={13} />
              <span>CỔNG HỌC VIÊN PH DIGITAL • MÃ HỌC VIÊN: {studentInfo.studentId}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Xin chào, {studentInfo.name}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Khóa học: <span className="text-white font-bold">{studentInfo.course}</span>
            </p>
            <p className="text-xs text-slate-400">
              Giảng viên hướng dẫn: <strong className="text-cyan-400">{studentInfo.teacher}</strong> • Dự kiến thi IIG: <strong className="text-amber-400">{studentInfo.nextExamDate}</strong>
            </p>
          </div>

          {/* Progress Tracker Card */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shrink-0 min-w-[260px] space-y-2.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">Tiến độ hoàn thành:</span>
              <span className="text-cyan-400 font-black">{studentInfo.progress}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${studentInfo.progress}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">Đã hoàn thành 3/5 buổi học & 2 bài tập thực hành.</p>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("lessons")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === "lessons" ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          <PlayCircle size={14} />
          <span>Bài Giảng & Video ({lessons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("submissions")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === "submissions" ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          <UploadCloud size={14} />
          <span>Nộp Bài & Phản Hồi Giảng Viên</span>
        </button>

        <button
          onClick={() => setActiveTab("skills")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === "skills" ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          <BarChart3 size={14} />
          <span>Phân Tích Kỹ Năng (Skill Radar)</span>
        </button>

        <button
          onClick={() => setActiveTab("certificate")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === "certificate" ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          <Award size={14} />
          <span>Chứng Nhận QR Quốc Tế</span>
        </button>
      </div>

      {/* 3. Tab Contents */}
      {activeTab === "lessons" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lessons List (Left Column) */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">Lộ trình bài học</h3>
            <div className="space-y-2">
              {lessons.map((les) => (
                <div
                  key={les.id}
                  onClick={() => setSelectedLesson(les.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedLesson === les.id
                      ? "bg-slate-800 border-blue-500 shadow-md"
                      : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-cyan-400">{les.session}</span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock size={11} /> {les.duration}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">{les.title}</h4>
                  <div className="mt-2.5 flex items-center justify-between text-[11px]">
                    {les.completed ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                        <CheckCircle2 size={12} /> Đã hoàn thành
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-400 font-bold">
                        <Clock size={12} /> Đang tiến hành
                      </span>
                    )}
                    {les.hasExercise && (
                      <span className="text-blue-400 font-semibold flex items-center gap-1">
                        <FileText size={11} /> Có bài tập
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Lesson Detail View (Right Column) */}
          <div className="lg:col-span-2 space-y-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6">
            {(() => {
              const cur = lessons.find((l) => l.id === selectedLesson) || lessons[0];
              return (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-xs font-bold text-cyan-400">{cur.session}</span>
                      <h2 className="text-lg font-black text-white">{cur.title}</h2>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 self-start sm:self-auto">
                      Thời lượng: {cur.duration}
                    </span>
                  </div>

                  {/* Video Player Placeholder / Embed */}
                  <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="text-center space-y-2 p-4">
                      <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mx-auto text-blue-400 group-hover:scale-110 transition-transform">
                        <PlayCircle size={36} />
                      </div>
                      <p className="text-xs font-bold text-slate-300">Video Bài Giảng Chuẩn HD Bản Quyền PH Digital</p>
                      <p className="text-[11px] text-slate-500">Mã hóa chống tải lậu & lưu vết xem của từng học viên</p>
                    </div>
                  </div>

                  {/* Teacher Feedback Note */}
                  <div className="bg-blue-950/40 border border-blue-800/60 rounded-2xl p-4 flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-blue-200">Ghi chú & Hướng dẫn của Giảng viên:</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{cur.teacherNote}</p>
                    </div>
                  </div>

                  {/* Download Exercise Attachment */}
                  {cur.hasExercise && (
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-cyan-400" />
                        <div>
                          <p className="text-xs font-bold text-white">{cur.exerciseName}</p>
                          <p className="text-[10px] text-slate-400">File thực hành chuẩn khảo thí Certiport</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert(`Đang tải file bài tập: ${cur.exerciseName}`)}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700"
                      >
                        <Download size={13} />
                        <span>Tải Về</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Submissions Tab */}
      {activeTab === "submissions" && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-white">Nộp Bài Thực Hành Cho Giảng Viên</h3>
            <p className="text-xs text-slate-400">
              Giảng viên sẽ chấm điểm, phát hiện lỗi sai và gửi phản hồi qua cổng trong vòng 24 giờ.
            </p>
          </div>

          {!submissionSuccess ? (
            <form onSubmit={handleSubmitExercise} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Chọn Buổi Học / Bài Tập:</label>
                <select className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs">
                  <option>Buổi 4: Đề Thi Thử Excel Full Project 1</option>
                  <option>Buổi 3: Bài Tập Excel XLOOKUP Chuyên Sâu</option>
                  <option>Buổi 2: Đề Luyện Mail Merge Certiport</option>
                </select>
              </div>

              {/* Drag Drop File Upload Box */}
              <div className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl p-8 text-center bg-slate-950/60 transition-colors relative">
                <input
                  type="file"
                  accept=".xlsx,.docx,.pptx,.pdf,.py,.zip"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <UploadCloud className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <p className="text-xs font-bold text-white">
                  {uploadedFile ? `Tệp đã chọn: ${uploadedFile}` : "Kéo thả hoặc bấm để chọn tệp bài làm (.xlsx, .docx, .py)"}
                </p>
                <p className="text-[10px] text-slate-500 mt-1">Dung lượng tối đa 25MB.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Ghi chú hoặc thắc mắc gửi Giảng viên:</label>
                <textarea
                  rows={3}
                  placeholder="Ví dụ: Em chưa rõ câu số 4 phần PivotTable..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500"
                />
              </div>

              <button
                type="submit"
                disabled={!uploadedFile || isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wide shadow-lg disabled:opacity-40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Đang nộp bài lên hệ thống...</span>
                ) : (
                  <>
                    <UploadCloud size={16} />
                    <span>XÁC NHẬN NỘP BÀI THỰC HÀNH</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-700 text-center space-y-2">
              <CheckCircle2 size={36} className="text-emerald-400 mx-auto" />
              <h4 className="text-base font-black text-white">Đã Nộp Bài Thành Công!</h4>
              <p className="text-xs text-slate-300">
                Tệp <strong>{uploadedFile}</strong> đã được lưu trữ an toàn. Giảng viên phụ trách đã nhận được thông báo chấm bài.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmissionSuccess(false);
                  setUploadedFile(null);
                }}
                className="mt-3 px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-white hover:bg-slate-700"
              >
                Nộp thêm bài tập khác
              </button>
            </div>
          )}
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === "skills" && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">Bảng Đo Lường Năng Lực & Kỹ Năng Số</h3>
              <p className="text-xs text-slate-400">
                Dữ liệu tổng hợp từ bài kiểm tra đầu vào, bài tập thực hành và đề thi thử Certiport.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-950 text-cyan-300 border border-cyan-700">
              ĐIỂM NĂNG LỰC: 885 / 1000
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Công thức & Hàm Excel (XLOOKUP, IF, SUMIFS)", percent: 92, status: "Thành thạo", note: "Đạt chuẩn 1000/1000 bài thi thử" },
              { name: "Cấu trúc Văn bản & Heading Styles Word", percent: 88, status: "Thành thạo", note: "Tạo mục lục tự động chính xác" },
              { name: "Trộn Thư Tự Động (Mail Merge)", percent: 95, status: "Thành thạo", note: "Hoàn thành 100% yêu cầu bài tập" },
              { name: "Báo cáo Động PivotTable & Biểu Đồ", percent: 75, status: "Cần cải thiện", note: "Cần ôn thêm kỹ thuật Slicer lồng nhau" },
              { name: "An Toàn Dữ Liệu & Điện Toán Đám Mây (IC3)", percent: 90, status: "Thành thạo", note: "Hiểu rõ bảo mật 2FA và Cloud" },
              { name: "Slide Master & Hiệu Ứng Trình Chiếu", percent: 65, status: "Cần cải thiện", note: "Sắp học tại Buổi 5" },
            ].map((sk, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-white">{sk.name}</span>
                  <span className={sk.percent >= 80 ? "text-emerald-400" : "text-amber-400"}>
                    {sk.percent}% • {sk.status}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${sk.percent >= 80 ? "bg-emerald-500" : "bg-amber-500"}`}
                    style={{ width: `${sk.percent}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">{sk.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificate Tab */}
      {activeTab === "certificate" && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
            <Award size={36} />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-white">Chứng Nhận Hoàn Thành Đào Tạo</h3>
            <p className="text-xs text-slate-400">
              Chứng chỉ điện tử chính thức được mã hóa xác thực bằng SHA-256 Hash.
            </p>
          </div>

          <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 text-left">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
              <span className="text-slate-400">Mã chứng nhận:</span>
              <span className="font-mono font-bold text-cyan-400">CERT-MOS-2026-9842</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
              <span className="text-slate-400">Học viên:</span>
              <span className="font-bold text-white">Nguyễn Hoàng Nam</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
              <span className="text-slate-400">Khóa thi:</span>
              <span className="font-bold text-white">MOS Excel 2019 Associate</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
              <span className="text-slate-400">Điểm số:</span>
              <span className="font-black text-emerald-400">1000 / 1000 Điểm tuyệt đối</span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1">
              <span className="text-slate-400">Mã băm SHA-256:</span>
              <span className="font-mono text-[10px] text-slate-500 truncate max-w-[280px]">
                e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => window.open("/api/v1/certificates/verify/CERT-MOS-2026-9842/", "_blank")}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <QrCode size={16} />
              <span>Tra Cứu Mã QR Công Khai</span>
              <ExternalLink size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
