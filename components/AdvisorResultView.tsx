"use client";

import Link from "next/link";
import { ArrowRight, RefreshCw, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { RecommendationResult, getRoleLabel } from "@/lib/advisorRecommendations";

interface AdvisorResultViewProps {
  userRole: string;
  recommendation: RecommendationResult;
  onReset: () => void;
}

export default function AdvisorResultView({
  userRole,
  recommendation: rec,
  onReset,
}: AdvisorResultViewProps) {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Diagnostic Summary Box */}
      <div className="bg-[#F4F8FD] p-5 rounded-2xl border border-[#E5EEF8] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0057B8]">
            LỘ TRÌNH DÀNH CHO: {getRoleLabel(userRole)}
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            Cam Kết Bao Đỗ 100%
          </span>
        </div>

        <h4 className="text-base sm:text-lg font-bold text-[#0B2545] leading-snug">
          {rec.title}
        </h4>

        <p className="text-slate-600 text-xs leading-relaxed">{rec.summary}</p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-center">
          <div className="p-2 rounded-xl bg-white border border-slate-100">
            <span className="text-xs text-slate-500">Thời lượng:</span>
            <p className="text-xs font-bold text-slate-800 mt-0.5">{rec.duration}</p>
          </div>
          <div className="p-2 rounded-xl bg-white border border-slate-100">
            <span className="text-xs text-slate-500">Mục tiêu:</span>
            <p className="text-xs font-bold text-[#0057B8] mt-0.5">{rec.scoreTarget}</p>
          </div>
          <div className="p-2 rounded-xl bg-white border border-slate-100">
            <span className="text-xs text-slate-500">Cam kết:</span>
            <p className="text-xs font-bold text-[#0057B8] mt-0.5">{rec.passRate}</p>
          </div>
        </div>
      </div>

      {/* Voucher Card */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-[#003F88]">Ưu Đãi Học Viên:</p>
          <p className="text-xs text-slate-600">{rec.discount}</p>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-[#0057B8] text-white font-mono font-bold text-xs tracking-wider">
          {rec.code}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <Link
          href="/lien-he"
          className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-sm transition-all"
        >
          <span>Đăng Ký Xếp Lớp Ngay</span>
          <ArrowRight size={14} />
        </Link>

        <a
          href={SITE_CONFIG.contact.zaloUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto py-3 px-5 rounded-xl bg-white hover:bg-slate-50 text-[#0057B8] text-xs font-bold uppercase tracking-wider text-center border border-[#E5EEF8] transition-all flex items-center justify-center gap-1.5"
        >
          <MessageSquare size={14} />
          <span>Tư Vấn Trực Tiếp Zalo</span>
        </a>
      </div>

      {/* Reset button */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw size={11} />
          <span>Thử phân tích với mục tiêu khác</span>
        </button>
      </div>
    </div>
  );
}

