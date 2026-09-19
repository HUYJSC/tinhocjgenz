"use client";

import React, { useRef } from "react";
import { Send, Image as ImageIcon } from "lucide-react";

interface AiComposerProps {
  value: string;
  onChange: (val: string) => void;
  onSend: (customText?: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function AiComposer({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = "Hỏi mình về Word, Excel, Python, AI...",
}: AiComposerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  return (
    <div className="w-full bg-white border-t border-[#E3EDF8] px-3 pt-2.5 pb-2 shrink-0 select-none">
      <div className="h-11 sm:h-12 border border-[#DDE8F5] focus-within:border-[#0057B8] focus-within:ring-2 focus-within:ring-[#0057B8]/10 rounded-[14px] bg-[#F8FBFF] flex items-center px-2.5 gap-2 transition-all">
        {/* Optional attachment button */}
        <button
          type="button"
          aria-label="Đính kèm ảnh câu hỏi"
          title="Đính kèm bài tập / ảnh lỗi"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#0057B8] hover:bg-white transition-colors cursor-pointer shrink-0"
          onClick={() => {
            onChange(value ? `${value} [Đính kèm bài tập]` : "Mình có bài tập này cần bạn xem giúp:");
            inputRef.current?.focus();
          }}
        >
          <ImageIcon size={17} />
        </button>

        {/* Text Input - 16px on mobile to avoid iOS zoom, 14px on desktop */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          aria-label="Nhập câu hỏi cho trợ lý AI"
          className="flex-1 min-w-0 bg-transparent text-[16px] sm:text-[14px] text-[#0B2545] placeholder:text-slate-400 font-normal focus:outline-none disabled:opacity-60"
        />

        {/* Send Button */}
        <button
          type="button"
          disabled={!value.trim() || disabled}
          onClick={() => onSend()}
          aria-label="Gửi tin nhắn"
          className="w-10 h-10 rounded-xl bg-[#087CF0] hover:bg-[#0057B8] disabled:bg-slate-200 text-white disabled:text-slate-400 flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed shrink-0 active:scale-95 shadow-2xs"
        >
          <Send size={16} className="translate-x-px" />
        </button>
      </div>

      {/* Mini Footer */}
      <div className="text-[11px] text-[#718096] text-center pt-1.5 leading-none font-medium">
        Tin Học Gen Z · Luôn đồng hành cùng bạn ♡
      </div>
    </div>
  );
}
