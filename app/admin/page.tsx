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
  RefreshCw,
  Plus,
  PhoneCall,
  Flame,
  Award,
  HelpCircle,
  TrendingUp,
  GraduationCap,
  Layers
} from "lucide-react";
import { useAdminAuth } from "./context/AdminAuthContext";

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
  const { user } = useAdminAuth();

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

  // Greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

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
      badge: "Đang mở",
      badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/30",
      href: "/admin/courses",
      icon: BookOpen,
      color: "from-blue-600 to-cyan-600",
      textColor: "text-blue-400",
    },
    {
      title: "Lớp Đang Tuyển Sinh",
      value: kpi.batchesOpening.toString(),
      subtext: `Tổng cộng ${kpi.batchesTotal} ca học`,
      badge: "Khai giảng",
      badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
      href: "/admin/schedules",
      icon: Calendar,
      color: "from-indigo-600 to-purple-600",
      textColor: "text-indigo-400",
    },
    {
      title: "Học Viên Đăng Ký (Leads)",
      value: kpi.leadsTotal.toString(),
      subtext: `${kpi.leadsPending} học viên mới chờ gọi`,
      badge: `${kpi.leadsPending} Mới`,
      badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      href: "/admin/leads",
      icon: Users,
      color: "from-emerald-600 to-teal-600",
      textColor: "text-emerald-400",
    },
    {
      title: "Bài Viết & Cẩm Nang",
      value: kpi.postsCount.toString(),
      subtext: "Bài viết SEO đã xuất bản",
      badge: "CMS Blog",
      badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      href: "/admin/blog",
      icon: FileText,
      color: "from-amber-600 to-orange-600",
      textColor: "text-amber-400",
    },
    {
      title: "Kho Đề Thi & Media",
      value: kpi.storageFormatted,
      subtext: "Đã quét an toàn nội bộ",
      badge: "Private",
      badgeColor: "bg-pink-500/15 text-pink-300 border-pink-500/30",
      href: "/admin/media",
      icon: FileSpreadsheet,
      color: "from-pink-600 to-rose-600",
      textColor: "text-pink-400",
    },
    {
      title: "Nhân Sự Điều Hành",
      value: `${kpi.usersActive} tài khoản`,
      subtext: "Phân quyền cá nhân an toàn",
      badge: "RBAC",
      badgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
      href: "/admin/users",
      icon: KeyRound,
      color: "from-cyan-600 to-blue-600",
      textColor: "text-cyan-400",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* 1. Friendly Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>HỆ THỐNG ĐIỀU HÀNH TRỰC TUYẾN</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
              {getGreeting()}, {user?.name || "Thầy Huy"}! 👋
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
              Chào mừng bạn đến với Cổng Quản trị <strong>Tin Học Gen Z</strong>. Hôm nay có{" "}
              <strong className="text-emerald-400 font-semibold">{kpi.leadsPending} học viên mới</strong> đang chờ tư vấn và{" "}
              <strong className="text-blue-400 font-semibold">{kpi.batchesOpening} lớp học</strong> đang mở đăng ký.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-5">
              <Link
                href="/admin/courses"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition-all shadow-md shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus size={15} />
                <span>Thêm Khóa Học Mới</span>
              </Link>

              <Link
                href="/admin/schedules"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black transition-all shadow-md shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar size={15} />
                <span>Mở Lịch Khai Giảng</span>
              </Link>

              <Link
                href="/admin/leads"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all shadow-md shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Users size={15} />
                <span>Xử Lý Leads ({kpi.leadsPending})</span>
              </Link>
            </div>
          </div>

          {/* Quick Hub Status Badge */}
          <div className="shrink-0 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 min-w-[200px]">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Trạng Thái Hệ Thống
            </div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-400">
              <CheckCircle2 size={16} />
              <span>Máy chủ hoạt động tối ưu</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80 text-slate-400">
              <span>Đồng bộ:</span>
              <span className="text-white font-mono">{lastUpdated || "Đang cập nhật..."}</span>
            </div>
            <button
              type="button"
              onClick={fetchDashboardData}
              disabled={loading}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              <span>Làm mới số liệu</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Quick Actions Hub (Lối tắt thao tác nhanh) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Layers size={14} className="text-blue-400" />
            <span>Thao Tác Nhanh Thường Dùng</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <Link
            href="/admin/courses"
            className="p-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all flex items-center gap-3 group shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
              <BookOpen size={18} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">Khóa Học</div>
              <div className="text-[10px] text-slate-400 truncate">Tạo / Sửa học phí</div>
            </div>
          </Link>

          <Link
            href="/admin/schedules"
            className="p-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all flex items-center gap-3 group shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
              <Calendar size={18} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">Lịch Học</div>
              <div className="text-[10px] text-slate-400 truncate">Xếp ca & chỗ trống</div>
            </div>
          </Link>

          <Link
            href="/admin/leads"
            className="p-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-center gap-3 group shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
              <Users size={18} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">CRM Leads</div>
              <div className="text-[10px] text-slate-400 truncate">Tư vấn đăng ký</div>
            </div>
          </Link>

          <Link
            href="/admin/media"
            className="p-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-pink-500/40 transition-all flex items-center gap-3 group shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-500/15 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
              <FileSpreadsheet size={18} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">Kho Đề Thi</div>
              <div className="text-[10px] text-slate-400 truncate">MOS & IC3 Thực chiến</div>
            </div>
          </Link>

          <Link
            href="/admin/certificates"
            className="p-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all flex items-center gap-3 group shadow-sm col-span-2 sm:col-span-1"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
              <Award size={18} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">Chứng Chỉ</div>
              <div className="text-[10px] text-slate-400 truncate">Khảo thí & Đỗ Cert</div>
            </div>
          </Link>
        </div>
      </div>

      {/* 3. KPI Metrics Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <BarChart3 size={15} className="text-blue-400" />
            <span>Chỉ Số Trọng Yếu Thực Tế (KPIs)</span>
          </h2>
          <span className="text-xs text-slate-500">Dữ liệu tự động đồng bộ thời gian thực</span>
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
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 block truncate">{stat.title}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${stat.badgeColor}`}>
                        {stat.badge}
                      </span>
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1.5 block font-display font-mono">
                      {loading ? "..." : stat.value}
                    </span>
                  </div>
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform shrink-0`}>
                    <Icon size={20} />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 truncate">{stat.subtext}</span>
                  <span className={`${stat.textColor} font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0`}>
                    Xem chi tiết <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. Two Column Section: Recent Leads & Upcoming Batches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries / Leads */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Users size={16} />
              </div>
              <div>
                <h3 className="text-sm font-black text-white">Học Viên Mới Đăng Ký</h3>
                <p className="text-[11px] text-slate-400">Danh sách cần gọi tư vấn sớm nhất</p>
              </div>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 py-1 px-2.5 rounded-lg hover:bg-slate-800 transition-all"
            >
              Xem tất cả ({kpi.leadsTotal}) <ArrowRight size={13} />
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentLeads.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                Chưa có học viên mới nào đăng ký hôm nay.
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-white truncate">{lead.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono">({lead.phone})</span>
                    </div>
                    <div className="text-[11px] text-blue-400 font-medium truncate mt-0.5">
                      {lead.course} • <span className="text-slate-400">{lead.university}</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <a
                      href={`tel:${lead.phone.replace(/\D/g, "")}`}
                      className="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 transition-colors"
                      title="Gọi điện tư vấn ngay"
                    >
                      <PhoneCall size={14} />
                    </a>
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800/60 font-mono">
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Batches */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                <Calendar size={16} />
              </div>
              <div>
                <h3 className="text-sm font-black text-white">Lớp Sắp Khai Giảng</h3>
                <p className="text-[11px] text-slate-400">Theo dõi số lượng chỗ trống từng lớp</p>
              </div>
            </div>
            <Link
              href="/admin/schedules"
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 py-1 px-2.5 rounded-lg hover:bg-slate-800 transition-all"
            >
              Quản lý lịch <ArrowRight size={13} />
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentBatches.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                Chưa có lớp nào chuẩn bị khai giảng.
              </div>
            ) : (
              recentBatches.map((batch) => (
                <div
                  key={batch.id}
                  className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-white truncate">{batch.courseName}</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-950 text-blue-300 border border-blue-800/50 font-mono">
                        {batch.batchCode}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                      <Clock size={11} className="text-slate-500" />
                      <span>{batch.startTime} - {batch.endTime}</span>
                      <span>• Khai giảng: {new Date(batch.startDate).toLocaleDateString("vi-VN")}</span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="text-xs font-black text-emerald-400 font-mono">
                      Còn {batch.availableSlots} chỗ
                    </div>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      Sĩ số: {batch.capacity} HV
                    </span>
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
