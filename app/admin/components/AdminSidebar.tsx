"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import { LayoutDashboard, BookOpen, Calendar, Users, FileSpreadsheet, FileText, Sparkles, Award, ExternalLink, LogOut, ShieldCheck, ShieldAlert, ChevronRight, Globe } from "lucide-react";

import { useAdminAuth } from "../context/AdminAuthContext";

export function AdminSidebar({ onCloseMobile }: { onCloseMobile?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();

  const sections = [
    {
      title: "TỔNG QUAN",
      items: [
        {
          title: "Bảng Điều Hành",
          href: "/admin",
          icon: LayoutDashboard,
          badge: "Dashboard"
        }
      ]
    },
    {
      title: "ĐÀO TẠO & KHẢO THÍ",
      items: [
        {
          title: "Quản Lý Khóa Học",
          href: "/admin/courses",
          icon: BookOpen,
          badge: "MOS / IC3"
        },
        {
          title: "Lịch Khai Giảng",
          href: "/admin/schedules",
          icon: Calendar,
          badge: "Lớp mới"
        },
        {
          title: "Kho Đề Thi & Media",
          href: "/admin/media",
          icon: FileSpreadsheet,
          badge: "Đề thi"
        },
        {
          title: "Kết Quả & Chứng Nhận",
          href: "/admin/certificates",
          icon: Award,
          badge: "Khảo thí"
        },
        {
          title: "AI Tư Vấn Lộ Trình",
          href: "/admin/ai",
          icon: Sparkles,
          badge: "RAG Smart"
        }
      ]
    },
    {
      title: "TUYỂN SINH & MARKETING",
      items: [
        {
          title: "CRM Tiếp Nhận Học Viên",
          href: "/admin/leads",
          icon: Users,
          badge: "Leads"
        },
        {
          title: "Bài Viết & Cẩm Nang",
          href: "/admin/blog",
          icon: FileText,
          badge: "CMS"
        },
        {
          title: "AI Content Engine",
          href: "/admin/content-engine",
          icon: Sparkles,
          badge: "Tự động"
        }
      ]
    },
    {
      title: "HỆ THỐNG",
      items: [
        {
          title: "Quản Lý Người Dùng",
          href: "/admin/users",
          icon: Users,
          badge: "Tài khoản"
        },
        {
          title: "Nhật Ký Bảo Mật Audit",
          href: "/admin/audit",
          icon: ShieldAlert,
          badge: "Audit Log"
        }
      ]
    }
  ];

  const getRoleLabel = () => {
    if (user?.role === "super_admin") return "Super Admin (Toàn quyền)";
    if (user?.role === "academic") return "Giáo vụ (Quản lý đào tạo)";
    if (user?.role === "teacher") return "Giảng viên MOS / IC3";
    return "Cán bộ quản trị";
  };

  const getInitials = () => {
    if (!user?.name) return "AD";
    const parts = user.name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return user.name.slice(0, 2).toUpperCase();
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full shrink-0">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex flex-col gap-2">
        <BrandLogo variant="horizontal" theme="light" size="sm" asLink={true} href="/admin" />
        <div className="text-[10px] font-extrabold text-blue-400 tracking-wider uppercase flex items-center gap-1 pl-0.5">
          <ShieldCheck size={12} className="text-blue-400" /> CỔNG QUẢN TRỊ ADMIN
        </div>
      </div>

      {/* User Role Card */}
      <div className="px-4 py-3 border-b border-slate-800/60 bg-slate-950/40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm shrink-0">
            {getInitials()}
          </div>
          <div className="overflow-hidden flex-1">
            <div className="text-xs font-bold text-white truncate">
              {user?.name || "Quản trị viên"}
            </div>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="truncate">{getRoleLabel()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto custom-scrollbar">
        {sections.map((section, sIdx) => (
          <div key={sIdx}>
            <div className="px-2 pb-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
              {section.title}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        size={16}
                        className={`shrink-0 transition-colors ${
                          isActive ? "text-white" : "text-slate-400 group-hover:text-blue-400"
                        }`}
                      />
                      <span className="truncate">{item.title}</span>
                    </div>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-md font-mono font-bold tracking-tight ${
                        isActive
                          ? "bg-blue-700/80 text-blue-100"
                          : "bg-slate-800 text-slate-400 group-hover:text-slate-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Separator: External links */}
        <div>
          <div className="px-2 pb-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
            HỆ THỐNG LIÊN KẾT
          </div>
          <div className="space-y-1">
            <a
              href="https://hoctructuyen.tinhocgenz.io.vn/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60 transition-colors group"
            >
              <div className="flex items-center gap-2.5 truncate">
                <ExternalLink size={15} className="text-slate-400 shrink-0" />
                <span className="truncate">Cổng Khảo Thí LMS</span>
              </div>
              <span className="text-xs px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400 font-bold">
                Online
              </span>
            </a>

            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              <div className="flex items-center gap-2.5 truncate">
                <Globe size={15} className="text-slate-400 shrink-0" />
                <span className="truncate">Xem Website Chính</span>
              </div>
              <ChevronRight size={13} className="text-slate-400" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-slate-800">
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-red-900/40 text-slate-400 hover:text-red-300 border border-slate-700/60 hover:border-red-800/80 text-xs font-bold transition-all cursor-pointer"
        >
          <LogOut size={15} />
          <span>Đăng Xuất Khỏi Admin</span>
        </button>
      </div>
    </aside>
  );
}
