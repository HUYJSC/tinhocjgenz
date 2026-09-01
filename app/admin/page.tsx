"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Users,
  FileSpreadsheet,
  FileText,
  Sparkles,
  Award,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Plus,
  BarChart3,
  Phone,
  Database,
  KeyRound,
  ShieldAlert
} from "lucide-react";
import { coursesData, upcomingBatchesData } from "@/data/mockData";
import { BLOG_POSTS } from "@/data/blogData";

export default function AdminDashboardOverviewPage() {
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((r) => r.json())
      .then((res) => {
        if (res.data) setRecentLeads(res.data);
      })
      .catch(() => {});
  }, []);

  const pendingCount = recentLeads.filter((l) => l.status === "Chờ gọi").length;

  const stats = [
    {
      title: "Khóa Học Đào Tạo",
      value: coursesData.length.toString(),
      subtext: "MOS, IC3, CNTT, AI",
      href: "/admin/courses",
      icon: BookOpen,
      color: "from-blue-600 to-cyan-600",
      textColor: "text-blue-400"
    },
    {
      title: "Lịch Khai Giảng",
      value: upcomingBatchesData.length.toString(),
      subtext: "Đang mở nhận học viên",
      href: "/admin/schedules",
      icon: Calendar,
      color: "from-indigo-600 to-purple-600",
      textColor: "text-indigo-400"
    },
    {
      title: "Học Viên Đăng Ký (Leads)",
      value: recentLeads.length.toString(),
      subtext: `${pendingCount} học viên chờ tư vấn`,
      href: "/admin/leads",
      icon: Users,
      color: "from-emerald-600 to-teal-600",
      textColor: "text-emerald-400"
    },
    {
      title: "Bài Viết & Cẩm Nang",
      value: BLOG_POSTS.length.toString(),
      subtext: "Chuẩn SEO Google",
      href: "/admin/blog",
      icon: FileText,
      color: "from-amber-600 to-orange-600",
      textColor: "text-amber-400"
    },
    {
      title: "Kho Đề Thi & Media",
      value: "128 MB",
      subtext: "Đề MOS, IC3, Template Excel",
      href: "/admin/media",
      icon: FileSpreadsheet,
      color: "from-pink-600 to-rose-600",
      textColor: "text-pink-400"
    },
    {
      title: "AI Content Engine",
      value: "Tự Động",
      subtext: "Quét & Biên tập tin tức",
      href: "/admin/content-engine",
      icon: Sparkles,
      color: "from-violet-600 to-fuchsia-600",
      textColor: "text-violet-400"
    },
    {
      title: "Quản Lý Người Dùng",
      value: "RBAC 4 Cổng",
      subtext: "Học viên, GV, Giáo vụ, Admin",
      href: "/admin/users",
      icon: KeyRound,
      color: "from-cyan-600 to-blue-600",
      textColor: "text-cyan-400"
    },
    {
      title: "Nhật Ký Bảo Mật",
      value: "Audit Log",
      subtext: "Ghi vết sự kiện thời gian thực",
      href: "/admin/audit",
      icon: ShieldAlert,
      color: "from-purple-600 to-indigo-600",
      textColor: "text-purple-400"
    }
  ];


  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 border border-blue-500/20 p-6 sm:p-8">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold mb-3">
            <ShieldCheck size={14} className="text-amber-400" />
            <span>TRUNG TÂM KIỂM SOÁT & QUẢN TRỊ TOÀN DIỆN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
            Bảng Điều Hành Hệ Sinh Thái Tin Học Gen Z
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
            Hệ thống phân quyền đã hợp nhất tất cả các nhiệm vụ trọng tâm: Quản trị danh mục khóa học, lịch chiêu sinh, CRM tiếp nhận học viên, kho tài liệu đề thi và bộ máy AI Content Engine.
          </p>

          <div className="flex flex-wrap gap-3 mt-5">
            <Link
              href="/admin/courses"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition-all shadow-md shadow-blue-600/30"
            >
              <BookOpen size={14} />
              <span>Quản Lý Khóa Học</span>
            </Link>
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all shadow-md shadow-emerald-600/30"
            >
              <Users size={14} />
              <span>Xem Học Viên Chờ Gọi (3)</span>
            </Link>
            <a
              href="https://hoctructuyen.tinhocgenz.io.vn/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white border border-slate-700 text-xs font-bold transition-all"
            >
              <ExternalLink size={14} />
              <span>Mở Cổng Khảo Thí LMS</span>
            </a>
          </div>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <BarChart3 size={16} className="text-blue-400" />
            <span>Chỉ Số Trọng Yếu (KPIs)</span>
          </h3>
          <span className="text-xs text-slate-400 font-medium">Cập nhật thời gian thực</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Link
                key={idx}
                href={stat.href}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all group flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block">{stat.title}</span>
                    <span className="text-2xl font-black text-white tracking-tight mt-1 block font-display">
                      {stat.value}
                    </span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon size={18} />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{stat.subtext}</span>
                  <span className={`${stat.textColor} font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform`}>
                    Chi tiết <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Two Column Section: Recent Leads & Upcoming Batches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries / Leads */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-emerald-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Học Viên Mới Đăng Ký
              </h3>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              Xem tất cả <ArrowRight size={13} />
            </Link>
          </div>

          <div className="space-y-3">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white truncate">{lead.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({lead.phone})</span>
                  </div>
                  <div className="text-[11px] text-blue-400 font-medium truncate mt-0.5">
                    {lead.course} • <span className="text-slate-400">{lead.university}</span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${lead.status === "Chờ gọi"
                    ? "bg-amber-950/80 text-amber-300 border border-amber-800/60"
                    : lead.status === "Đã tư vấn"
                      ? "bg-blue-950/80 text-blue-300 border border-blue-800/60"
                      : "bg-emerald-950/80 text-emerald-300 border border-emerald-800/60"
                    }`}>
                    {lead.status}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">{lead.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Batches */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-indigo-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Lớp Khai Giảng Gần Nhất
              </h3>
            </div>
            <Link
              href="/admin/schedules"
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              Quản lý lịch <ArrowRight size={13} />
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingBatchesData.slice(0, 3).map((batch) => (
              <div
                key={batch.id}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white truncate">{batch.courseName}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-950 text-blue-300 border border-blue-800/50">
                      {batch.courseType}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                    <Clock size={11} className="text-slate-400" />
                    <span>{batch.scheduleTime}</span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-xs font-bold text-amber-400">
                    Còn {batch.slotsRemaining} chỗ
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Khai giảng: {batch.startDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security & Access Control Section (Phân Quyền & Giám Sát Bốn Cổng) */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <ShieldAlert size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">An Ninh Hệ Thống & Kiểm Soát Truy Cập Bốn Cổng</h3>
              <p className="text-xs text-slate-400">Kiểm soát phân quyền theo nguyên tắc Deny-By-Default và truy vết sự kiện</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/users"
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <KeyRound size={13} />
              <span>Quản Lý Người Dùng</span>
            </Link>
            <Link
              href="/admin/audit"
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <ShieldAlert size={13} />
              <span>Xem Toàn Bộ Audit Log</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cổng Học Viên</div>
            <div className="text-xl font-black text-white mt-1">Học Tập & Nộp Bài</div>
            <div className="text-[11px] text-blue-400 mt-1 flex items-center gap-1">
              <CheckCircle2 size={12} /> Khóa dữ liệu người khác (Chống IDOR)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cổng Giảng Viên</div>
            <div className="text-xl font-black text-white mt-1">Điểm Danh & Chấm Bài</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 size={12} /> Chỉ truy cập lớp được phân công
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cổng Giáo Vụ</div>
            <div className="text-xl font-black text-white mt-1">Xếp Lớp & Cấp Chứng Chỉ</div>
            <div className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
              <CheckCircle2 size={12} /> Giới hạn quyền can thiệp hệ thống
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cổng Quản Trị</div>
            <div className="text-xl font-black text-white mt-1">Control Hub & Audit</div>
            <div className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
              <ShieldCheck size={12} /> Super Admin & Cryptographic MFA
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Dock */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Bạn cần thực hiện tác vụ nhanh?</div>
            <div className="text-[11px] text-slate-400">Chọn nhiệm vụ tương ứng để bắt đầu biên tập ngay lập tức.</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/courses"
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 hover:text-white transition-colors"
          >
            + Thêm Khóa Học
          </Link>
          <Link
            href="/admin/schedules"
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 hover:text-white transition-colors"
          >
            + Mở Lớp Mới
          </Link>
          <Link
            href="/admin/media"
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 hover:text-white transition-colors"
          >
            + Tải Lên Đề Thi
          </Link>
        </div>
      </div>
    </div>
  );
}
