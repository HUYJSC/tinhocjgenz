"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Rss,
  FileText,
  History,
  LayoutDashboard,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

export default function ContentEngineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isFetchingAll, setIsFetchingAll] = useState(false);
  const [fetchToast, setFetchToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const handleFetchAll = async () => {
    try {
      setIsFetchingAll(true);
      const res = await fetch("/api/admin/content/fetch", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setFetchToast({
          show: true,
          message: "Đã kích hoạt quét tin từ tất cả các nguồn kích hoạt thành công!",
          type: "success",
        });
      } else {
        setFetchToast({
          show: true,
          message: data.error || "Lỗi khi quét tin.",
          type: "error",
        });
      }
    } catch {
      setFetchToast({
        show: true,
        message: "Lỗi kết nối máy chủ khi nạp tin.",
        type: "error",
      });
    } finally {
      setIsFetchingAll(false);
      setTimeout(() => setFetchToast({ show: false, message: "", type: "success" }), 4000);
    }
  };

  const navItems = [
    {
      href: "/admin/content-engine",
      label: "Tổng quan",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/admin/content-engine/sources",
      label: "Quản lý Nguồn (RSS/API)",
      icon: Rss,
    },
    {
      href: "/admin/content-engine/articles",
      label: "Danh sách Bài viết",
      icon: FileText,
    },
    {
      href: "/admin/content-engine/logs",
      label: "Nhật ký Hoạt động",
      icon: History,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Toast Notification */}
      {fetchToast.show && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border text-sm font-semibold transition-all ${
            fetchToast.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {fetchToast.type === "success" ? (
            <CheckCircle2 size={18} className="text-emerald-600" />
          ) : (
            <ShieldAlert size={18} className="text-red-600" />
          )}
          <span>{fetchToast.message}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Branding & Back link */}
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Admin Portal</span>
              </Link>
              <div className="h-5 w-px bg-slate-200" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h1 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                    Tin học GenZ Content Engine
                  </h1>
                  <p className="text-[11px] text-slate-500 font-medium leading-none">
                    AI Content Aggregator & Automated Newsroom
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/tin-cong-nghe"
                target="_blank"
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-slate-200/70 px-3 py-2 rounded-xl transition-colors"
              >
                <span>Xem Trang Tin Tức</span>
                <ExternalLink size={13} />
              </Link>

              <button
                onClick={handleFetchAll}
                disabled={isFetchingAll}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw
                  size={14}
                  className={isFetchingAll ? "animate-spin" : ""}
                />
                <span>{isFetchingAll ? "Đang quét tin..." : "Quét Toàn Bộ Nguồn"}</span>
              </button>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 pb-0 border-t border-slate-100">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                    isActive
                      ? "text-blue-600 border-blue-600 bg-blue-50/50"
                      : "text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-blue-600" : "text-slate-400"} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
