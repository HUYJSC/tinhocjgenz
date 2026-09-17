"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PhoneCall,
  MessageCircle,
  GraduationCap,
  X,
  Headphones,
  ChevronRight,
} from "lucide-react";
import { CONTACT_INFO } from "@/data/contactInfo";
import AiChatbotModal from "./AiChatbotModal";

export default function FloatingContact() {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsExpanded(false);
      }
    };
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <>
      {/* Supporting Tool: AI Learning Pathway Advisor Chatbot */}
      <AiChatbotModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      <aside
        ref={containerRef}
        aria-label="Kênh hỗ trợ và tư vấn nhanh"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto select-none font-sans pb-[env(safe-area-inset-bottom,0px)]"
      >
        {/* EXPANDED CONSULTATION PANEL */}
        {isExpanded && (
          <div
            role="dialog"
            aria-modal="false"
            aria-labelledby="floating-consultation-title"
            className="w-[330px] sm:w-[360px] bg-white border border-[#E5EEF8] rounded-2xl shadow-xl p-4 sm:p-5 text-slate-800 animate-in fade-in slide-in-from-bottom-3 duration-200 relative overflow-hidden"
          >
            {/* Top Brand Accent */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-[#0057B8]" />

            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-3 pt-1">
              <div>
                <h3
                  id="floating-consultation-title"
                  className="text-sm font-bold text-[#0B2545] leading-tight"
                >
                  Trung Tâm Hỗ Trợ Đào Tạo
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5 font-medium">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>Chuyên viên tư vấn trực tuyến (8:00 - 21:30)</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                aria-label="Đóng bảng tư vấn"
              >
                <X size={18} />
              </button>
            </div>

            {/* Channel List */}
            <div className="space-y-2.5">
              {/* 1. PRIMARY CTA: Tư vấn lộ trình học */}
              <Link
                href="/lien-he"
                onClick={() => setIsExpanded(false)}
                className="group w-full p-3.5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white flex items-center justify-between transition-colors shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0">
                    <GraduationCap size={20} />
                  </div>
                  <div className="text-left leading-snug">
                    <strong className="block text-sm font-bold text-white tracking-tight">
                      Tư vấn lộ trình học
                    </strong>
                    <span className="text-xs text-blue-100 font-normal block">
                      Đội ngũ chuyên gia hỗ trợ
                    </span>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
                />
              </Link>

              {/* 2. SECONDARY CTA: Chat Zalo tư vấn */}
              {CONTACT_INFO.zaloUrl && (
                <a
                  href={CONTACT_INFO.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full p-3 rounded-xl bg-white hover:bg-[#F4F8FD] border border-[#E5EEF8] hover:border-blue-200 text-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-[#0057B8] flex items-center justify-center font-bold text-xs shrink-0">
                      <MessageCircle size={18} className="text-[#0057B8]" />
                    </div>
                    <div className="text-left leading-snug">
                      <strong className="block text-xs sm:text-sm font-bold text-[#0B2545]">
                        Chat Zalo tư vấn
                      </strong>
                      <span className="text-[11px] text-slate-500 font-normal block">
                        Phản hồi trực tiếp trong 5 phút
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#0057B8] group-hover:underline">
                    Nhắn ngay
                  </span>
                </a>
              )}

              {/* 3. THIRD CTA: Hotline tuyển sinh */}
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="group w-full p-3 rounded-xl bg-white hover:bg-[#F4F8FD] border border-[#E5EEF8] hover:border-blue-200 text-slate-800 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-[#0057B8] flex items-center justify-center shrink-0">
                    <PhoneCall size={16} className="text-[#0057B8]" />
                  </div>
                  <div className="text-left leading-snug">
                    <strong className="block text-xs sm:text-sm font-bold text-[#0B2545]">
                      Hotline tuyển sinh
                    </strong>
                    <span className="text-[11px] font-semibold text-[#0057B8] block">
                      {CONTACT_INFO.displayPhone}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-600 group-hover:text-[#0057B8]">
                  Gọi ngay
                </span>
              </a>
            </div>

            {/* Separator */}
            <div className="my-3 border-t border-slate-100" />

            {/* Supporting Tool: Trợ lý học tập AI */}
            <button
              type="button"
              onClick={() => {
                setIsAiModalOpen(true);
                setIsExpanded(false);
              }}
              className="w-full p-2.5 rounded-xl bg-[#F4F8FD] hover:bg-blue-50/80 border border-[#E5EEF8] text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="relative w-7 h-7 rounded-lg bg-blue-100 overflow-hidden shrink-0 border border-blue-200">
                  <Image src="/ai-bot-avatar.png" alt="AI Bot Mascot" fill className="object-contain p-0.5" />
                </div>
                <div className="text-left leading-tight">
                  <span className="text-xs font-bold text-[#0B2545] block">
                    Trợ lý học tập AI
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    Tự thiết kế lộ trình & gợi ý môn học
                  </span>
                </div>
              </div>
              <ChevronRight
                size={15}
                className="text-slate-400 group-hover:text-slate-600 shrink-0"
              />
            </button>

            {/* Trust Footer Note */}
            <p className="text-[10px] text-slate-400 text-center mt-3 pt-2 border-t border-slate-100 font-medium">
              Tin Học Gen Z • Chuẩn Khảo Thí Quốc Tế Certiport
            </p>
          </div>
        )}

        {/* FLOATING TRIGGER BUTTON */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`min-h-12 h-12 px-4 rounded-full flex items-center justify-center gap-2.5 shadow-md transition-all duration-200 cursor-pointer border focus-visible:outline-2 focus-visible:outline-[#0057B8] ${
            isExpanded
              ? "bg-[#0B2545] text-white border-slate-700 hover:bg-[#081b33]"
              : "bg-[#0057B8] hover:bg-[#003F88] text-white border-blue-500/30 hover:shadow-lg"
          }`}
          aria-expanded={isExpanded}
          aria-haspopup="dialog"
          title={isExpanded ? "Đóng bảng tư vấn" : "Tư vấn lộ trình học"}
          aria-label={isExpanded ? "Đóng bảng tư vấn" : "Mở kênh tư vấn tuyển sinh và lộ trình học"}
        >
          {isExpanded ? (
            <>
              <X size={18} aria-hidden="true" />
              <span className="text-xs font-bold">Đóng</span>
            </>
          ) : (
            <>
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 ring-2 ring-white/40" />
              </span>
              <Headphones size={18} className="text-white" aria-hidden="true" />
              <span className="text-xs font-bold tracking-wide">Tư vấn đào tạo</span>
            </>
          )}
        </button>
      </aside>
    </>
  );
}
