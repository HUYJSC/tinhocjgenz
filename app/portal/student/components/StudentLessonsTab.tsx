"use client";

import { PlayCircle, CheckCircle2, Clock, FileText, MessageSquare, Download } from "lucide-react";

export interface LessonItem {
  id: number;
  session: string;
  title: string;
  duration: string;
  completed: boolean;
  hasExercise: boolean;
  exerciseName?: string;
  videoUrl?: string;
  teacherNote?: string;
}

interface Props {
  lessons: LessonItem[];
  selectedLesson: number;
  setSelectedLesson: (id: number) => void;
  downloadNotice: string | null;
  setDownloadNotice: (msg: string | null) => void;
}

export default function StudentLessonsTab({
  lessons,
  selectedLesson,
  setSelectedLesson,
  downloadNotice,
  setDownloadNotice,
}: Props) {
  const cur = lessons.find((l) => l.id === selectedLesson) || lessons[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Lessons List (Left Column) */}
      <div className="lg:col-span-1 space-y-3">
        <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">Lộ trình bài học</h3>
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
                <span className="font-bold text-blue-400">{les.session}</span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock size={11} /> {les.duration}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">{les.title}</h4>
              <div className="mt-2.5 flex items-center justify-between text-xs">
                {les.completed ? (
                  <span className="inline-flex items-center gap-1 text-blue-400 font-bold">
                    <CheckCircle2 size={12} /> Đã hoàn thành
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-blue-400 font-bold">
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
      <div className="lg:col-span-2 space-y-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-bold text-blue-400">{cur.session}</span>
              <h2 className="text-lg font-bold text-white">{cur.title}</h2>
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
              <p className="text-xs text-slate-500">Mã hóa chống tải lậu & lưu vết xem của từng học viên</p>
            </div>
          </div>

          {/* Teacher Feedback Note */}
          {cur.teacherNote && (
            <div className="bg-blue-950/40 border border-blue-800/60 rounded-2xl p-4 flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-blue-200">Ghi chú & Hướng dẫn của Giảng viên:</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{cur.teacherNote}</p>
              </div>
            </div>
          )}

          {/* Download Exercise Attachment */}
          {cur.hasExercise && cur.exerciseName && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">{cur.exerciseName}</p>
                  <p className="text-xs text-slate-400">File thực hành chuẩn khảo thí Certiport</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDownloadNotice(`Đang bắt đầu tải: ${cur.exerciseName}`);
                  setTimeout(() => setDownloadNotice(null), 3000);
                }}
                className="min-h-12 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-blue-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <Download size={15} />
                <span>Tải Về</span>
              </button>
            </div>
          )}

          {downloadNotice && (
            <div role="status" aria-live="polite" className="p-3 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-400 shrink-0" />
              <span>{downloadNotice}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

