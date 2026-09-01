import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Cổng Đào Tạo Nội Bộ | PH Digital Education",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Portal Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-white font-black text-sm hover:text-blue-400 transition-colors">
              <ArrowLeft size={16} />
              <span>Về Trang Chủ</span>
            </Link>
            <div className="h-4 w-px bg-slate-700 hidden sm:block" />
            <span className="text-xs font-black uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <ShieldCheck size={14} /> KHU VỰC NỘI BỘ • XÁC THỰC PHÂN QUYỀN
            </span>
          </div>

          <nav className="flex items-center gap-2">
            <a
              href="https://hoctructuyen.tinhocgenz.io.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center gap-1.5 shadow-sm"
            >
              <GraduationCap size={14} />
              <span>Cổng Xác Thực LMS</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Main Portal View */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
