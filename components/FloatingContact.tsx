"use client";

import { Phone, MessageCircle } from "lucide-react";
import { CONTACT_INFO } from "@/data/contactInfo";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {/* Zalo Button */}
      {CONTACT_INFO.zaloUrl && (
        <a
          href={CONTACT_INFO.zaloUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-[#0068ff] hover:bg-[#0052cc] text-white px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          aria-label="Chat Zalo"
        >
          <div className="w-6 h-6 rounded-full bg-white text-[#0068ff] flex items-center justify-center font-black text-xs shrink-0">
            Z
          </div>
          <span className="text-xs font-bold pr-1 hidden sm:inline-block">Chat Zalo</span>
        </a>
      )}

      {/* Phone Hotline Pulsing Button */}
      <a
        href={`tel:${CONTACT_INFO.phone}`}
        className="flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-4 py-3 rounded-full shadow-featured hover:shadow-featured-hover hover:scale-105 transition-all duration-300 group relative"
        aria-label="Gọi hotline"
      >
        <span className="absolute -inset-1 rounded-full bg-blue-500/30 animate-ping pointer-events-none" />
        <Phone size={18} className="animate-bounce shrink-0" />
        <div className="flex flex-col items-start leading-none pr-1">
          <span className="text-[9px] uppercase tracking-wider text-cyan-100 font-extrabold">Hotline 24/7</span>
          <span className="text-xs font-black tracking-wide mt-0.5">{CONTACT_INFO.displayPhone}</span>
        </div>
      </a>
    </div>
  );
}
