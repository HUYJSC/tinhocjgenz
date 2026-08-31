"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  ShieldCheck,
  ExternalLink,
  LogOut,
  Bell,
  Sparkles,
  Database,
  ChevronRight
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

export function AdminTopbar({ onOpenMobile }: { onOpenMobile: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();

  const getPageTitle = () => {
    if (pathname === "/admin") return "Tổng Quan Điều Hành";
    if (pathname.startsWith("/admin/courses")) return "Quản Lý Khóa Học & Học Phí";
    if (pathname.startsWith("/admin/schedules")) return "Quản Lý Lịch Khai Giảng & Lớp Học";
    if (pathname.startsWith("/admin/leads")) return "CRM Tiếp Nhận & Tư Vấn Học Viên";
    if (pathname.startsWith("/admin/media")) return "Kho Đề Thi MOS/IC3 & Tài Liệu";
    if (pathname.startsWith("/admin/blog")) return "Quản Trị Bài Viết & Tin Tức";
    if (pathname.startsWith("/admin/content-engine")) return "AI Content Engine (Tự Động)";
    if (pathname.startsWith("/admin/certificates")) return "Chứng Chỉ Số Certiport & Blockchain";
    return "Cổng Quản Trị Admin";
  };

  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Left: Mobile Menu Button & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Mở menu quản trị"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2">
          <Link href="/admin" className="text-xs font-bold text-slate-400 hover:text-white transition-colors hidden sm:inline">
            Admin
          </Link>
          <ChevronRight size={14} className="text-slate-400 hidden sm:inline" />
          <h1 className="text-sm sm:text-base font-black text-white tracking-tight">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Right: Status Indicators & Quick Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* System Status Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/70 text-[11px] font-bold text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Hệ thống: Hoạt động tốt</span>
        </div>

        {/* Link to LMS Portal */}
        <a
          href="https://hoctructuyen.tinhocgenz.io.vn/admin"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 hover:text-white text-xs font-bold transition-all shadow-sm"
          title="Chuyển sang Cổng Khảo Thí LMS"
        >
          <ExternalLink size={13} />
          <span>Cổng LMS</span>
        </a>

        {/* Current Admin User Badge */}
        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-800">
          <div className="hidden sm:block text-right">
            <div className="text-xs font-bold text-white leading-tight">
              {user?.name || "Admin"}
            </div>
            <div className="text-[10px] text-blue-400 font-semibold leading-tight">
              Super Admin
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="p-2 rounded-xl bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-300 border border-slate-700/60 hover:border-red-800/80 transition-colors cursor-pointer"
            title="Đăng xuất khỏi trang quản trị"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
