"use client";

import { useState } from "react";
import { GraduationCap, PlayCircle, Award, UploadCloud, BarChart3, Users } from "lucide-react";
import StudentLessonsTab, { LessonItem } from "./components/StudentLessonsTab";
import StudentSubmissionsTab from "./components/StudentSubmissionsTab";
import StudentSkillsRadar from "./components/StudentSkillsRadar";
import StudentCertificateTab from "./components/StudentCertificateTab";

const STUDENT_INFO = {
  name: "Nguyễn Hoàng Nam",
  studentId: "HV-MOS-2026-089",
  course: "Luyện Thi MOS 2019 / 365 Master Combo (Word, Excel, PowerPoint)",
  progress: 80,
  nextExamDate: "15/09/2026",
  teacher: "Thầy Huy (MOS Master Trainer)",
  status: "Đang học cấp tốc",
};

const DEFAULT_LESSONS: LessonItem[] = [
  {
    id: 1,
    session: "Buổi 1",
    title: "MOS Word Master: Heading Styles & Mục Lục Tự Động",
    duration: "50 phút",
    completed: true,
    hasExercise: true,
    exerciseName: "Bai_Tap_Thuc_Hanh_Word_Buoi_1.docx",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    teacherNote: "Chú ý bẫy định dạng Heading 1 phải chuẩn Font chữ và Spacing.",
  },
  {
    id: 2,
    session: "Buổi 2",
    title: "MOS Word Master: Mail Merge & Phân Đoạn Section Break",
    duration: "55 phút",
    completed: true,
    hasExercise: true,
    exerciseName: "De_Luyen_MailMerge_Certiport.docx",
    teacherNote: "Rất tốt! Bài nộp đã đạt 100/100 điểm kỹ năng trộn thư.",
  },
  {
    id: 3,
    session: "Buổi 3",
    title: "MOS Excel Specialist: Làm Chủ Hàm XLOOKUP, INDEX & MATCH",
    duration: "65 phút",
    completed: true,
    hasExercise: true,
    exerciseName: "Bai_Tap_Excel_XLOOKUP_Chuyen_Sau.xlsx",
    teacherNote: "Học viên nắm chắc cú pháp hàm, cần lưu ý khóa tham chiếu F4.",
  },
  {
    id: 4,
    session: "Buổi 4",
    title: "MOS Excel Specialist: Báo Cáo Động PivotTable & Slicers",
    duration: "60 phút",
    completed: false,
    hasExercise: true,
    exerciseName: "De_Thi_Thu_Excel_Full_Project_1.xlsx",
    teacherNote: "Hãy hoàn thành và nộp trước 20:00 tối mai để được giảng viên sửa bài.",
  },
  {
    id: 5,
    session: "Buổi 5",
    title: "MOS PowerPoint Specialist: Slide Master & Hiệu Ứng Nâng Cao",
    duration: "50 phút",
    completed: false,
    hasExercise: false,
    teacherNote: "Buổi tổng kết và luyện đề bấm giờ trên máy ảo.",
  },
];

export default function StudentPortalPage() {
  const [activeTab, setActiveTab] = useState<"lessons" | "submissions" | "skills" | "certificate">("lessons");
  const [selectedLesson, setSelectedLesson] = useState<number>(1);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Mobile Account Hub */}
      <div className="lg:hidden space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">Hệ Thống Trực Tuyến</p>
            <h1 className="text-xl font-bold text-white font-display">TÀI KHOẢN HỌC TẬP</h1>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            Học viên trực tuyến
          </span>
        </div>

        {/* Dual Portal Switchers */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href="https://hoctructuyen.tinhocgenz.io.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-12 p-3 rounded-2xl bg-blue-600/30 border border-blue-500/40 text-white flex items-center gap-2.5 shadow-sm active:scale-98 transition-transform"
          >
            <GraduationCap size={20} className="text-blue-400 shrink-0" />
            <div className="text-left leading-tight">
              <span className="text-xs font-bold block text-blue-200">Cổng Học Viên</span>
              <span className="text-xs text-slate-300">Vào lớp LMS</span>
            </div>
          </a>
          <a
            href="https://hoctructuyen.tinhocgenz.io.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-12 p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-white flex items-center gap-2.5 shadow-sm active:scale-98 transition-transform"
          >
            <Users size={20} className="text-blue-400 shrink-0" />
            <div className="text-left leading-tight">
              <span className="text-xs font-bold block text-blue-200">Cổng Giảng Viên</span>
              <span className="text-xs text-slate-300">Quản lý lớp</span>
            </div>
          </a>
        </div>
      </div>

      {/* 1. Header Banner */}
      <div className="bg-blue-950 border border-slate-800 rounded-2xl p-5 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <GraduationCap size={13} />
              <span>CỔNG HỌC VIÊN PH DIGITAL • MÃ HỌC VIÊN: {STUDENT_INFO.studentId}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
              Xin chào, {STUDENT_INFO.name}! 👋
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Khóa học: <span className="text-white font-bold">{STUDENT_INFO.course}</span>
            </p>
            <p className="text-xs text-slate-400">
              Giảng viên hướng dẫn: <strong className="text-blue-400">{STUDENT_INFO.teacher}</strong> • Dự kiến thi IIG:{" "}
              <strong className="text-blue-400">{STUDENT_INFO.nextExamDate}</strong>
            </p>
          </div>

          {/* Progress Tracker Card */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shrink-0 min-w-[260px] space-y-2.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">Tiến độ hoàn thành:</span>
              <span className="text-blue-400 font-bold">{STUDENT_INFO.progress}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${STUDENT_INFO.progress}%` }}
              />
            </div>
            <p className="text-xs text-slate-400">Đã hoàn thành 3/5 buổi học & 2 bài tập thực hành.</p>
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
          <span>Bài Giảng & Video ({DEFAULT_LESSONS.length})</span>
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
        <StudentLessonsTab
          lessons={DEFAULT_LESSONS}
          selectedLesson={selectedLesson}
          setSelectedLesson={setSelectedLesson}
          downloadNotice={downloadNotice}
          setDownloadNotice={setDownloadNotice}
        />
      )}

      {activeTab === "submissions" && (
        <StudentSubmissionsTab
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          submissionSuccess={submissionSuccess}
          setSubmissionSuccess={setSubmissionSuccess}
        />
      )}

      {activeTab === "skills" && <StudentSkillsRadar />}

      {activeTab === "certificate" && <StudentCertificateTab />}
    </div>
  );
}
