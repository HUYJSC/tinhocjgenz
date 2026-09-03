"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Users,
  FileSpreadsheet,
  FileText,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  BarChart3,
  KeyRound,
  ShieldAlert,
  RefreshCw,
  TrendingUp
} from "lucide-react";

interface DashboardKpiData {
  coursesActive: number;
  batchesOpening: number;
  batchesTotal: number;
  leadsTotal: number;
  leadsPending: number;
  postsCount: number;
  storageBytes: number;
  storageFormatted: string;
  usersActive: number;
  systemStatus: string;
}

export default function AdminDashboardOverviewPage() {
  const [kpi, setKpi] = useState<DashboardKpiData>({
    coursesActive: 0,
    batchesOpening: 0,
    batchesTotal: 0,
    leadsTotal: 0,
    leadsPending: 0,
    postsCount: 0,
    storageBytes: 0,
    storageFormatted: "0 B",
    usersActive: 0,
    systemStatus: "OPTIMAL",
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [recentBatches, setRecentBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [kpiRes, leadsRes, batchesRes] = await Promise.all([
        fetch("/api/admin/dashboard/kpi"),
        fetch("/api/admin/leads"),
        fetch("/api/admin/schedules"),
      ]);

      if (kpiRes.ok) {
        const kpiJson = await kpiRes.json();
        if (kpiJson.data) {
          setKpi(kpiJson.data);
          setLastUpdated(new Date(kpiJson.lastUpdatedAt).toLocaleTimeString("vi-VN"));
        }
      }

      if (leadsRes.ok) {
        const leadsJson = await leadsRes.json();
        if (leadsJson.data) setRecentLeads(leadsJson.data.slice(0, 4));
      }

      if (batchesRes.ok) {
        const batchesJson = await batchesRes.json();
        if (batchesJson.data) setRecentBatches(batchesJson.data.slice(0, 3));
      }
    } catch {
      console.warn("Lỗi đồng bộ dữ liệu Dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const stats = [
    {
      title: "Khóa Học Đang Mở",
      value: kpi.coursesActive.toString(),
      subtext: "Chương trình chuẩn quốc tế",
      href: "/admin/courses",
      icon: BookOpen,
      color: "from-blue-600 to-cyan-600",
      textColor: "text-blue-400",
    },
    {
      title: "Lớp Đang Tuyển Sinh",
      value: kpi.batchesOpening.toString(),
      subtext: `Tổng số ${kpi.batchesTotal} ca học`,
      href: "/admin/schedules",
      icon: Calendar,
      color: "from-indigo-600 to-purple-600",
      textColor: "text-indigo-400",
    },
    {
      title: "Học Viên Tiếp Nhận",
      value: kpi.leadsTotal.toString(),
      subtext: `${kpi.leadsPending} học viên mới (NEW)`,
      href: "/admin/leads",
      icon: Users,
      color: "from-emerald-600 to-teal-600",
      textColor: "text-emerald-400",
    },
    {
      title: "Cẩm Nang & Bài Viết",
      value: kpi.postsCount.toString(),
      subtext: "Bài viết SEO đã xuất bản",
      href: "/admin/blog",
      icon: FileText,
      color: "from-amber-600 to-orange-600",
      textColor: "text-amber-400",
    },
    {
      title: "Dung Lượng Đề Thi & Media",
      value: kpi.storageFormatted,
      subtext: "Đã quét an toàn & Private",
      href: "/admin/media",
      icon: FileSpreadsheet,
      color: "from-pink-600 to-rose-600",
      textColor: "text-pink-400",
    },
    {
      title: "Người Dùng Quản Trị",
      value: `${kpi.usersActive} nhân sự`,
      subtext: "RBAC 5 vai trò bảo mật",
      href: "/admin/users",
      icon: KeyRound,
      color: "from-cyan-600 to-blue-600",
      textColor: "text-cyan-400",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 border border-blue-500/20 p-6 sm:p-8">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold mb-3">
            <ShieldCheck size={14} className="text-amber-400" />
            <span>HỆ THỐNG ĐIỀU HÀNH THỜI GIAN THỰC</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
            Bảng Điều Hành Hệ Sinh Thái Tin Học Gen Z
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
            Hợp nhất toàn bộ dữ liệu thực tế từ cơ sở dữ liệu: Khóa học, lịch chiêu sinh, pipeline CRM tiếp nhận học viên, kho đề thi số và nhật ký kiểm toán.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
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
              <span>Xem Leads Chờ Gọi ({kpi.leadsPending})</span>
            </Link>
            <a
              href="https://hoctructuyen.tinhocgenz.io.vn/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white border border-slate-700 text-xs font-bold transition-all"
            >
              <ExternalLink size={14} />
              <span>Cổng LMS Trực Tuyến</span>
            </a>
          </div>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <BarChart3 size={16} className="text-blue-400" />
            <span>Chỉ Số Trọng Yếu Thực Tế (KPIs)</span>
          </h3>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            {lastUpdated && <span>Cập nhật lúc: <strong className="text-white font-mono">{lastUpdated}</strong></span>}
            <button
              type="button"
              onClick={fetchDashboardData}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Cập nhật lại số liệu"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Link
                key={idx}
                href={stat.href}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all group flex flex-col justify-between shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block">{stat.title}</span>
                    <span className="text-2xl font-black text-white tracking-tight mt-1 block font-display font-mono">
                      {loading ? "..." : stat.value}
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
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-emerald-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Học Viên Mới Đăng Ký Gần Nhất
              </h3>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              Xem tất cả ({kpi.leadsTotal}) <ArrowRight size={13} />
            </Link>
          </div>

          <div className="space-y-3">
            {recentLeads.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                Chưa có học viên mới nào đăng ký.
              </div>
            ) : (
              recentLeads.map((lead) => (
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
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800/60 font-mono">
                      {lead.status}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">{lead.date}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Batches */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
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
            {recentBatches.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                Chưa có lịch khai giảng nào.
              </div>
            ) : (
              recentBatches.map((batch) => (
                <div
                  key={batch.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                >
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-white truncate">{batch.courseName}</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-950 text-blue-300 border border-blue-800/50 font-mono">
                        {batch.batchCode}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                      <Clock size={11} className="text-slate-400" />
                      <span>{batch.startTime} - {batch.endTime}</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-xs font-bold text-emerald-400 font-mono">
                      Còn {batch.availableSlots} chỗ
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Khai giảng: {new Date(batch.startDate).toLocaleDateString("vi-VN")}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
