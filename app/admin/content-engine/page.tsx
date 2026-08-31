"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Rss,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Copy,
  TrendingUp,
  Brain,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Eye,
  Edit,
} from "lucide-react";
import { ContentEngineMetrics, Article, Source } from "@/lib/content-engine/types";

export default function ContentEngineOverviewPage() {
  const [metrics, setMetrics] = useState<ContentEngineMetrics | null>(null);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [resMetrics, resArticles, resSources] = await Promise.all([
        fetch("/api/admin/content/metrics").then((r) => r.json()),
        fetch("/api/admin/content/articles").then((r) => r.json()),
        fetch("/api/admin/content/sources").then((r) => r.json()),
      ]);

      if (resMetrics.success) setMetrics(resMetrics.data);
      if (resArticles.success) setRecentArticles(resArticles.data.slice(0, 6));
      if (resSources.success) setSources(resSources.data);
    } catch (err) {
      console.error("Lỗi lấy dữ liệu tổng quan:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusBadge = (status: Article["status"]) => {
    switch (status) {
      case "PUBLISHED":
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-emerald-100 text-emerald-800">ĐÃ ĐĂNG</span>;
      case "APPROVED":
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-blue-100 text-blue-800">ĐÃ DUYỆT</span>;
      case "AI_DRAFT":
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-indigo-100 text-indigo-800">AI DRAFT</span>;
      case "REVIEW":
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-amber-100 text-amber-800">CHỜ DUYỆT</span>;
      case "REJECTED":
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-slate-200 text-slate-700">TỪ CHỐI</span>;
      case "DUPLICATE":
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-purple-100 text-purple-800">TRÙNG</span>;
      default:
        return <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) {
      return (
        <span className="flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          <Sparkles size={11} /> {score} / 100
        </span>
      );
    }
    if (score >= 60) {
      return (
        <span className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
          {score} / 100
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
        {score} / 100
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold border border-blue-400/30">
              <Brain size={13} />
              <span>AI Content Engine v1.0 • Tự Động Hóa 24/7</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Bảng Điều Khiển Tòa Soạn Công Nghệ Tin học GenZ
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Hệ thống tự động thu thập tin tức từ 10+ nguồn uy tín quốc tế, phát hiện trùng lặp, chấm điểm AI và biên tập lại thành bài viết tiếng Việt chuẩn SEO.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/admin/content-engine/sources"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/15 backdrop-blur-sm transition-all"
            >
              <Rss size={14} />
              <span>Quản Lý {sources.length} Nguồn Tin</span>
            </Link>
            <Link
              href="/admin/content-engine/articles"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95"
            >
              <span>Xem Tất Cả Bài Viết</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Lấy Hôm Nay</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-slate-900">{metrics?.fetchedToday ?? 0}</span>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">bài</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-1">Từ các nguồn kích hoạt</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">AI Draft</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-indigo-600">{metrics?.aiDraftCount ?? 0}</span>
            <Sparkles size={16} className="text-indigo-400" />
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-1">Điểm AI ≥ 80 / 100</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Chờ Duyệt</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-amber-600">{metrics?.reviewCount ?? 0}</span>
            <Clock size={16} className="text-amber-400" />
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-1">Cần Admin xem xét</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Đã Xuất Bản</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-emerald-600">{metrics?.publishedCount ?? 0}</span>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-1">Đang hiển thị trên web</p>
        </div>

        {/* Metric 5 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">Bài Bị Trùng</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-purple-600">{metrics?.duplicateCount ?? 0}</span>
            <Copy size={16} className="text-purple-400" />
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-1">Lọc tự động &gt;85%</p>
        </div>

        {/* Metric 6 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Điểm AI TB</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-blue-600">{metrics?.avgAiScore ?? 0}</span>
            <TrendingUp size={16} className="text-blue-500" />
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-1">Độ phù hợp Tin học GenZ</p>
        </div>
      </div>

      {/* Main Content: Recent Stream & Active Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Articles Feed (2 spans) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-blue-600" />
              <h3 className="text-base font-extrabold text-slate-900">Bài Viết Mới Thu Thập & Biên Tập</h3>
            </div>
            <Link
              href="/admin/content-engine/articles"
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Xem tất cả</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200/80 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                <RefreshCw size={16} className="animate-spin text-blue-600" />
                <span>Đang tải dữ liệu bài viết...</span>
              </div>
            ) : recentArticles.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200/80 text-center text-slate-400 text-xs">
                Chưa có bài viết nào trong hệ thống. Hãy bấm <b>&quot;Quét Toàn Bộ Nguồn&quot;</b> để thu thập tin tức mới.
              </div>
            ) : (
              recentArticles.map((art) => (
                <div
                  key={art.id}
                  className="group bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-blue-400/80 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {getStatusBadge(art.status)}
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {art.sourceName}
                      </span>
                      {getScoreBadge(art.aiScore)}
                      <span className="text-[11px] text-slate-400 font-medium">
                        {new Date(art.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>

                    <Link
                      href={`/admin/content-engine/articles/${art.id}`}
                      className="block text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2"
                    >
                      {art.title || art.originalTitle}
                    </Link>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {art.excerpt || art.originalDescription}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <Link
                      href={`/admin/content-engine/articles/${art.id}`}
                      className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl transition-colors"
                    >
                      <Edit size={13} />
                      <span>Biên tập & Duyệt</span>
                    </Link>
                    {art.status === "PUBLISHED" && (
                      <Link
                        href={`/tin-cong-nghe/${art.slug}`}
                        target="_blank"
                        className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                        title="Xem bài viết trực tiếp"
                      >
                        <ExternalLink size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Active Sources Quick Card */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Rss size={18} className="text-blue-600" />
              <h3 className="text-base font-extrabold text-slate-900">Nguồn Tin Trọng Điểm</h3>
            </div>
            <Link
              href="/admin/content-engine/sources"
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Quản lý ({sources.length})
            </Link>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            {sources.slice(0, 5).map((src) => (
              <div
                key={src.id}
                className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {src.name}
                    </span>
                    {src.priority === "OFFICIAL" && (
                      <span className="text-[9px] font-extrabold bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded">
                        OFFICIAL
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {src.category} • {src.fetchInterval} phút/lần
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      src.isActive ? "bg-emerald-500 ring-4 ring-emerald-100" : "bg-slate-300"
                    }`}
                    title={src.isActive ? "Đang hoạt động" : "Tạm dừng"}
                  />
                </div>
              </div>
            ))}

            <Link
              href="/admin/content-engine/sources"
              className="block text-center text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50/70 hover:bg-blue-50 py-2.5 rounded-xl transition-colors mt-3"
            >
              + Thêm & Kiểm Tra Nguồn RSS Mới
            </Link>
          </div>

          {/* Quick AI & Automation Settings Info */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-100 space-y-3">
            <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs">
              <ShieldCheck size={16} className="text-indigo-600" />
              <span>Tiêu Chuẩn Độc Lập & Bản Quyền</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Mọi bài viết xuất bản đều được AI tổng hợp sự kiện cốt lõi, viết lại bằng tiếng Việt dễ hiểu và luôn giữ trích dẫn link nguồn nguyên bản (Reference Link).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
