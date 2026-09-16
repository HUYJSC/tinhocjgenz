"use client";

import { useState } from "react";
import { ShieldCheck, CheckCircle2, X, Copy, Calendar, Award, ExternalLink } from "lucide-react";

export interface VerifiableCertificate {
  id: string;
  studentName: string;
  universityFull: string;
  courseName: string;
  examCode: string;
  score: number;
  maxScore: number;
  completionDate: string;
  badge: string;
  certiportRegId?: string;
  blockchainHash?: string;
}

interface Props {
  cert: VerifiableCertificate | null;
  onClose: () => void;
}

export default function CredentialVerifyModal({ cert, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  if (!cert) return null;

  const regId = cert.certiportRegId || `TGZ-${cert.examCode.replace(/[^a-zA-Z0-9]/g, "")}-${cert.id.toUpperCase()}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(regId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="credential-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white border border-[#E5EEF8] rounded-2xl p-6 sm:p-8 shadow-xl text-slate-800 overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-[#0057B8]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X size={18} />
        </button>

        {/* Header Badges */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0057B8] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={14} className="text-[#0057B8]" />
            <span>Đối Soát Hồ Sơ Khảo Thí</span>
          </span>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 size={12} /> VERIFIED OFFICIAL
          </span>
        </div>

        {/* Modal Title */}
        <div className="space-y-1 mb-6">
          <h3 id="credential-dialog-title" className="text-xl font-bold text-[#0B2545] tracking-tight">
            Chứng Nhận Kết Quả Học Viên
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm">
            Hồ sơ điểm số và kết quả thi thực tế được lưu trữ đối soát theo chuẩn khảo thí quốc tế Certiport.
          </p>
        </div>

        {/* Student Credential Box */}
        <div className="bg-[#F4F8FD] border border-[#E5EEF8] rounded-2xl p-5 space-y-3.5 mb-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div>
              <p className="text-xs text-slate-500 font-medium">Họ và tên học viên</p>
              <h4 className="text-base font-bold text-[#0B2545]">{cert.studentName}</h4>
              <p className="text-xs text-slate-500">{cert.universityFull}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-[#0057B8]">{cert.score}</span>
              <span className="text-xs font-bold text-slate-500"> / {cert.maxScore}</span>
              <p className="text-[11px] font-bold text-emerald-600">ĐẠT CHUẨN XUẤT SẮC</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Khóa học / Chứng chỉ</span>
              <strong className="text-slate-800 font-bold block mt-0.5">{cert.courseName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Mã môn thi</span>
              <strong className="text-slate-800 font-mono font-bold block mt-0.5">{cert.examCode}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Thời gian hoàn thành</span>
              <strong className="text-slate-800 font-bold block mt-0.5 flex items-center gap-1">
                <Calendar size={12} className="text-slate-400" /> {cert.completionDate}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block">Đơn vị khảo thí</span>
              <strong className="text-slate-800 font-bold block mt-0.5 flex items-center gap-1">
                <Award size={12} className="text-slate-400" /> Certiport / IIG VN
              </strong>
            </div>
          </div>
        </div>

        {/* Verification Code Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-600">Mã Tra Cứu Chứng Chỉ:</span>
            <button
              type="button"
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#0057B8] hover:text-[#003F88] cursor-pointer"
            >
              <Copy size={12} />
              <span>{copied ? "Đã chép!" : "Sao chép mã"}</span>
            </button>
          </div>
          <code className="text-xs font-mono font-bold text-slate-800 block break-all bg-white p-2 rounded-lg border border-slate-200">
            {regId}
          </code>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Đóng cửa sổ
          </button>
          <a
            href={`/api/v1/certificates/verify/${regId}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>Tra cứu trên cổng khảo thí</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}

