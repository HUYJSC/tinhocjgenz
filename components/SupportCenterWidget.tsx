"use client";

import React from "react";
import { X } from "lucide-react";
import MascotBot from "./MascotBot";
import SupportActions from "./SupportActions";

interface SupportCenterWidgetProps {
  onClose: () => void;
  onStartAiChat: () => void;
}

export default function SupportCenterWidget({
  onClose,
  onStartAiChat,
}: SupportCenterWidgetProps) {
  const openAIChat = () => {
    onStartAiChat();
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="support-widget-title"
      className="w-[300px] sm:w-[330px] bg-white border border-[#E5EEF8] rounded-3xl shadow-[0_12px_40px_rgba(11,37,69,0.12)] p-5 text-slate-800 animate-in fade-in slide-in-from-bottom-3 duration-200 relative overflow-hidden font-sans"
    >
      {/* Top Brand Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-[#0057B8]" />

      {/* Header */}
      <div className="flex items-start justify-between gap-2 pb-1">
        <div>
          <h3
            id="support-widget-title"
            className="text-sm font-bold text-[#0B2545] tracking-tight"
          >
            Trung Tâm Hỗ Trợ Đào Tạo
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>Chuyên viên & AI hỗ trợ trực tuyến (8:00 - 21:30)</span>
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          aria-label="Đóng bảng hỗ trợ"
        >
          <X size={16} />
        </button>
      </div>

      {/* Free-standing Transparent Mascot (NO box, NO card, NO background, Pure character) */}
      <div className="pt-3.5 pb-4 flex justify-center items-center">
        <MascotBot
          size={120}
          interactive={true}
          onClick={openAIChat}
          priority={true}
        />
      </div>

      {/* Action Buttons: "Bắt đầu với AI" & "Tư vấn với chuyên viên" */}
      <SupportActions
        onStartAi={openAIChat}
        onConsultHuman={onClose}
      />

      {/* Trust Footer Note */}
      <p className="text-[10px] text-slate-400 text-center mt-3 pt-2 border-t border-slate-100 font-medium">
        Tin Học Gen Z • Chuẩn Khảo Thí Quốc Tế Certiport
      </p>
    </div>
  );
}
