"use client";

import React from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";

interface Props {
  uploadedFile: string | null;
  setUploadedFile: (f: string | null) => void;
  isSubmitting: boolean;
  setIsSubmitting: (b: boolean) => void;
  submissionSuccess: boolean;
  setSubmissionSuccess: (b: boolean) => void;
}

export default function StudentSubmissionsTab({
  uploadedFile,
  setUploadedFile,
  isSubmitting,
  setIsSubmitting,
  submissionSuccess,
  setSubmissionSuccess,
}: Props) {
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
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-white">Nộp Bài Thực Hành Cho Giảng Viên</h3>
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
            <p className="text-xs text-slate-500 mt-1">Dung lượng tối đa 25MB.</p>
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
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wide shadow-lg disabled:opacity-40 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
        <div className="p-6 rounded-2xl bg-blue-950/60 border border-blue-700 text-center space-y-2">
          <CheckCircle2 size={36} className="text-blue-400 mx-auto" />
          <h4 className="text-base font-bold text-white">Đã Nộp Bài Thành Công!</h4>
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
  );
}

