"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, GraduationCap, MessageCircle, PhoneCall, ChevronRight } from "lucide-react";
import { CONTACT_INFO } from "@/data/contactInfo";

interface SupportActionsProps {
  onStartAi: () => void;
  onConsultHuman?: () => void;
}

export default function SupportActions({
  onStartAi,
  onConsultHuman,
}: SupportActionsProps) {
  return (
    <div className="space-y-3 w-full">
      {/* 1. Primary CTA: Bắt đầu với AI */}
      <button
        type="button"
        onClick={onStartAi}
        className="w-full py-3 px-4 rounded-xl bg-[#0057B8] hover:bg-[#003F88] active:scale-[0.99] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer group"
      >
        <Sparkles size={16} className="text-cyan-300 group-hover:rotate-12 transition-transform" />
        <span>Bắt đầu với AI</span>
        <ChevronRight size={16} className="text-white/70 group-hover:translate-x-0.5 transition-transform ml-auto" />
      </button>

      {/* 2. Secondary CTA: Tư vấn với chuyên viên */}
      <Link
        href="/lien-he"
        onClick={onConsultHuman}
        className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F4F8FD] active:scale-[0.99] border border-[#E5EEF8] hover:border-blue-200 text-[#0B2545] font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
      >
        <GraduationCap size={16} className="text-[#0057B8]" />
        <span>Tư vấn với chuyên viên</span>
      </Link>

      {/* 3. Subtle Footer Text Links: Zalo & Hotline (No bulky cards) */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-4 text-xs font-medium text-slate-500">
        {CONTACT_INFO.zaloUrl && (
          <a
            href={CONTACT_INFO.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[#0057B8] transition-colors py-1"
          >
            <MessageCircle size={13} className="text-[#0057B8]" />
            <span>Chat Zalo</span>
          </a>
        )}

        <span className="text-slate-300">•</span>

        <a
          href={`tel:${CONTACT_INFO.phone}`}
          className="inline-flex items-center gap-1.5 hover:text-[#0057B8] transition-colors py-1"
        >
          <PhoneCall size={13} className="text-[#0057B8]" />
          <span>Gọi {CONTACT_INFO.displayPhone}</span>
        </a>
      </div>
    </div>
  );
}
