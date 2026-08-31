import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Users, BookOpen, ShieldCheck, ArrowLeft, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Cổng Đào Tạo & Học Vụ | PH Digital Education",
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
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-white font-black text-sm hover:text-blue-400 transition-colors">
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Về Trang Chủ</span>
            </Link>
            <div className="h-4 w-px bg-slate-700 hidden sm:block" />
            <span className="text-xs font-black uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <Sparkles size={13} /> PH DIGITAL EDUCATION • CỔNG ĐÀO TẠO & HỌC VỤ
            </span>
          </div>

          {/* Quick Role Portal Switcher */}
          <nav className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/portal/student"
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-blue-600/20 hover:text-blue-400 border border-slate-700/60 transition-all flex items-center gap-1.5"
            >
              <GraduationCap size={14} className="text-cyan-400" />
              <span>Học Viên</span>
            </Link>
            <Link
              href="/portal/teacher"
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-emerald-600/20 hover:text-emerald-400 border border-slate-700/60 transition-all flex items-center gap-1.5"
            >
              <Users size={14} className="text-emerald-400" />
              <span>Giảng Viên</span>
            </Link>
            <Link
              href="/portal/academic"
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-amber-600/20 hover:text-amber-400 border border-slate-700/60 transition-all flex items-center gap-1.5"
            >
              <BookOpen size={14} className="text-amber-400" />
              <span>Giáo Vụ</span>
            </Link>
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center gap-1.5"
            >
              <ShieldCheck size={14} />
              <span className="hidden sm:inline">Quản Trị</span>
            </Link>
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
