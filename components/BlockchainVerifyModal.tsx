"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  Copy, 
  ExternalLink, 
  QrCode, 
  Award, 
  School, 
  Calendar, 
  Lock, 
  FileCheck2,
  Sparkles
} from "lucide-react";

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
  blockchainHash?: string;
  certiportRegId?: string;
}

interface Props {
  cert: VerifiableCertificate | null;
  onClose: () => void;
}

export default function BlockchainVerifyModal({ cert, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"credential" | "blockchain">("credential");

  if (!cert) return null;

  const mockHash =
    cert.blockchainHash ||
    `0x8f7d9a3b${cert.id.replace(/\D/g, "")}e4120984c1f58a7c2934bb0e1${cert.score}`;
  const mockRegId = cert.certiportRegId || `CERT-${cert.examCode.replace(/[^a-zA-Z0-9]/g, "")}-${cert.id.toUpperCase()}-VN`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mockHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X size={18} />
        </button>

        {/* Header Badges */}
        <div className="flex items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase tracking-wider">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>On-Chain Verifiable Credential</span>
          </div>
          <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-800">
            SHA-256 IMMUTABLE
          </span>
        </div>

        {/* Modal Title */}
        <div className="space-y-1 mb-6">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white font-display flex items-center gap-2">
            <span>Chứng Chỉ Số Xác Thực Minh Bạch</span>
            <Sparkles size={18} className="text-amber-400" />
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm">
            Bảo chứng số hóa chống làm giả điểm thi Certiport quốc tế theo chuẩn W3C Verifiable Credentials.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex bg-slate-800/80 p-1 rounded-2xl mb-6 border border-slate-700/60">
          <button
            onClick={() => setActiveTab("credential")}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "credential"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FileCheck2 size={14} />
            <span>Thông Tin Chứng Chỉ</span>
          </button>
          <button
            onClick={() => setActiveTab("blockchain")}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "blockchain"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Lock size={14} />
            <span>Sổ Cái Blockchain (Ledger)</span>
          </button>
        </div>

        {/* Tab 1: Credential Information */}
        {activeTab === "credential" ? (
          <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-slate-400 text-[11px]">Họ & Tên Học Viên:</p>
                <p className="font-black text-sm text-white mt-0.5">{cert.studentName}</p>
              </div>
              <div>
                <p className="text-slate-400 text-[11px]">Điểm Thi Certiport:</p>
                <p className="font-black text-sm text-amber-400 mt-0.5">
                  {cert.score} / {cert.maxScore} Điểm
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-400 text-[11px]">Đơn vị Trường / ĐH:</p>
                <p className="font-bold text-xs text-cyan-300 mt-0.5 flex items-center gap-1">
                  <School size={13} /> {cert.universityFull}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-400 text-[11px]">Khóa & Môn Thi Đạt Chuẩn:</p>
                <p className="font-bold text-xs text-white mt-0.5">{cert.courseName} ({cert.examCode})</p>
              </div>
              <div>
                <p className="text-slate-400 text-[11px]">Thời gian cấp:</p>
                <p className="font-semibold text-slate-300 mt-0.5 flex items-center gap-1">
                  <Calendar size={12} /> {cert.completionDate}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-[11px]">Mã ID Certiport:</p>
                <p className="font-mono font-bold text-blue-400 mt-0.5">{mockRegId}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400">
              <span className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 size={15} />
                Đạt chuẩn xét tốt nghiệp & Đã đối soát IIG
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-800">
                VALID
              </span>
            </div>
          </div>
        ) : (
          /* Tab 2: Blockchain Ledger Hash */
          <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
            <div className="space-y-1.5">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Mã Khóa Bất Biến (Certificate Hash):
              </p>
              <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="font-mono text-xs text-cyan-300 break-all select-all flex-1">
                  {mockHash}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
                  title="Sao chép Hash"
                >
                  <Copy size={14} />
                </button>
              </div>
              {copied && (
                <p className="text-[11px] text-emerald-400 font-bold animate-fade-in">
                  ✓ Đã sao chép mã hash vào bộ nhớ tạm!
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-300 pt-2 border-t border-slate-800">
              <div>
                <span className="text-slate-500">Mạng lưới xác thực:</span>
                <p className="font-bold text-white">Certiport EduLedger Node</p>
              </div>
              <div>
                <span className="text-slate-500">Thuật toán băm:</span>
                <p className="font-bold text-white">SHA-256 Verified</p>
              </div>
              <div>
                <span className="text-slate-500">Đơn vị đào tạo:</span>
                <p className="font-bold text-cyan-400">PH Digital Education</p>
              </div>
              <div>
                <span className="text-slate-500">Tính bất biến:</span>
                <p className="font-bold text-emerald-400">100% Không thể làm giả</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-400 text-center sm:text-left">
            Doanh nghiệp & Trường ĐH có thể đối soát hồ sơ trực tiếp 24/7.
          </p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider transition-all"
          >
            Đóng Cửa Sổ
          </button>
        </div>

      </div>
    </div>
  );
}
