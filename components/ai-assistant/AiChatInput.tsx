"use client";

import React, { useRef } from "react";
import { ChevronRight, Image as ImageIcon } from "lucide-react";

interface AiChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  loading: boolean;
  placeholder: string;
}

export default function AiChatInput({
  value,
  onChange,
  onSend,
  loading,
  placeholder,
}: AiChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !loading) {
        onSend();
      }
    }
  };

  return (
    <div className="bg-white border-t border-[#E5EEF8] p-3 shrink-0 relative z-30">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (value.trim() && !loading) {
            onSend();
          }
        }}
        className="flex items-center gap-2"
      >
        <button
          type="button"
          title="Đính kèm tệp / ảnh"
          className="p-2 rounded-xl text-slate-400 hover:text-[#0066FF] hover:bg-[#EBF3FF] transition-colors cursor-pointer shrink-0"
          aria-label="Đính kèm"
        >
          <ImageIcon size={18} />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={loading}
          className="flex-1 h-10 px-3.5 text-xs sm:text-sm bg-[#F7FAFE] rounded-xl border border-[#E5EEF8] text-[#0B2545] placeholder:text-slate-400 focus:outline-none focus:border-[#0066FF] focus:bg-white focus:ring-2 focus:ring-[#0066FF]/10 transition-all"
        />

        <button
          type="submit"
          disabled={!value.trim() || loading}
          className="w-10 h-10 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white transition-colors disabled:opacity-40 flex items-center justify-center cursor-pointer shrink-0 shadow-xs active:scale-95"
          aria-label="Gửi tin nhắn"
        >
          <ChevronRight size={18} className="stroke-[2.5]" />
        </button>
      </form>

      {/* Footer Text */}
      <div className="mt-2 text-center text-[10px] text-slate-400 font-medium select-none">
        Tin Học Gen Z • Luôn đồng hành cùng bạn 💙
      </div>
    </div>
  );
}

