"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Filter,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Edit2,
  Trash2,
  ExternalLink,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
  Send,
  Calendar,
} from "lucide-react";
import { Article, Source, Category } from "@/lib/content-engine/types";
import { DEFAULT_CATEGORIES } from "@/lib/content-engine/default-sources";

export default function ArticlesManagementPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [sourceFilter, setSourceFilter] = useState<string>("ALL");
  const [minScoreFilter, setMinScoreFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Toast
  const [actionToast, setActionToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const loadData = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.append("status", statusFilter);
      if (categoryFilter !== "ALL") params.append("category", categoryFilter);
      if (sourceFilter !== "ALL") params.append("sourceId", sourceFilter);
      if (minScoreFilter) params.append("minScore", minScoreFilter);
      if (searchTerm) params.append("search", searchTerm);

      const [resArticles, resSources] = await Promise.all([
        fetch(`/api/admin/content/articles?${params.toString()}`).then((r) => r.json()),
        fetch("/api/admin/content/sources").then((r) => r.json()),
      ]);

      if (resArticles.success) setArticles(resArticles.data);
      if (resSources.success) setSources(resSources.data);
    } catch (err) {
      console.error("Lỗi nạp bài viết:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, categoryFilter, sourceFilter, minScoreFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setActionToast({ show: true, message, type });
    setTimeout(() => setActionToast({ show: false, message: "", type: "success" }), 3500);
  };

  const handleQuickApprove = async (id: string, title: string) => {
    try {
      const res = await fetch(`/api/admin/content/articles/${id}/approve`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        showToast(`Đã duyệt bài viết: "${title.slice(0, 40)}..."`);
        loadData();
      }
    } catch {
      showToast("Lỗi duyệt bài", "error");
    }
  };

  const handleQuickPublish = async (id: string, title: string) => {
    try {
      const res = await fetch(`/api/admin/content/articles/${id}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Đã xuất bản trực tiếp: "${title.slice(0, 40)}..."`);
        loadData();
      }
    } catch {
      showToast("Lỗi xuất bản", "error");
    }
  };

  const handleQuickReject = async (id: string, title: string) => {
    try {
      const res = await fetch(`/api/admin/content/articles/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: "Admin từ chối" }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Đã từ chối bài viết: "${title.slice(0, 40)}..."`);
        loadData();
      }
    } catch {
      showToast("Lỗi từ chối bài", "error");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/content/articles/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("Đã xóa bài viết thành công!");
        loadData();
      }
    } catch {
      showToast("Lỗi xóa bài viết", "error");
    }
  };

  const getStatusBadge = (status: Article["status"]) => {
    switch (status) {
      case "PUBLISHED":
        return <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-emerald-100 text-emerald-800">ĐÃ ĐĂNG</span>;
      case "APPROVED":
        return <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-blue-100 text-blue-800">ĐÃ DUYỆT</span>;
      case "AI_DRAFT":
        return <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-indigo-100 text-indigo-800">AI DRAFT</span>;
      case "REVIEW":
        return <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-amber-100 text-amber-800">CHỜ DUYỆT</span>;
      case "REJECTED":
        return <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-slate-200 text-slate-700">TỪ CHỐI</span>;
      case "DUPLICATE":
        return <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-purple-100 text-purple-800">TRÙNG</span>;
      default:
        return <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          <Sparkles size={11} /> {score}
        </span>
      );
    }
    if (score >= 60) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
          {score}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
        {score}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {actionToast.show && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border text-sm font-semibold transition-all ${
            actionToast.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span>{actionToast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">Danh Sách Bài Viết Thu Thập & Biên Tập</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Quản lý, duyệt bài hai cột, lọc theo điểm AI và xuất bản lên trang tin tức công nghệ.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
            <span>Làm Mới</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm tiêu đề, từ khóa, tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* Status Select */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="AI_DRAFT">AI Draft (Điểm ≥ 80)</option>
            <option value="REVIEW">Chờ duyệt (Review)</option>
            <option value="APPROVED">Đã duyệt (Approved)</option>
            <option value="PUBLISHED">Đã xuất bản (Published)</option>
            <option value="REJECTED">Bị từ chối (Rejected)</option>
            <option value="DUPLICATE">Bị trùng lặp (Duplicate)</option>
          </select>

          {/* Category Select */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Tất cả chuyên mục</option>
            {DEFAULT_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Source Select */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:border-blue-500 max-w-xs"
          >
            <option value="ALL">Tất cả nguồn tin</option>
            {sources.map((src) => (
              <option key={src.id} value={src.id}>
                {src.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            Lọc Bài
          </button>
        </form>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200/80 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Tiêu Đề Bài Viết</th>
                <th className="px-4 py-3.5">Nguồn</th>
                <th className="px-4 py-3.5">Chuyên Mục</th>
                <th className="px-4 py-3.5">AI Score</th>
                <th className="px-4 py-3.5">Trạng Thái</th>
                <th className="px-4 py-3.5">Ngày Lấy</th>
                <th className="px-4 py-3.5 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    <RefreshCw size={20} className="animate-spin text-blue-600 mx-auto mb-2" />
                    Đang tải danh sách bài viết...
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    Không có bài viết nào khớp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Title */}
                    <td className="px-4 py-3.5 max-w-sm">
                      <Link
                        href={`/admin/content-engine/articles/${article.id}`}
                        className="font-extrabold text-slate-900 hover:text-blue-600 transition-colors line-clamp-2"
                      >
                        {article.title || article.originalTitle}
                      </Link>
                      <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        Gốc: {article.originalTitle}
                      </span>
                    </td>

                    {/* Source */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="text-slate-600 font-semibold">{article.sourceName}</span>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="text-slate-700 font-semibold">{article.categoryName}</span>
                    </td>

                    {/* AI Score */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {getScoreBadge(article.aiScore)}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {getStatusBadge(article.status)}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-500">
                      {new Date(article.createdAt).toLocaleDateString("vi-VN")}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Quick Review / Edit */}
                        <Link
                          href={`/admin/content-engine/articles/${article.id}`}
                          title="Duyệt bài 2 cột (Review & Edit)"
                          className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <Edit2 size={12} />
                          <span>Duyệt</span>
                        </Link>

                        {/* Quick Publish if not published */}
                        {article.status !== "PUBLISHED" && (
                          <button
                            onClick={() =>
                              handleQuickPublish(article.id, article.title || article.originalTitle)
                            }
                            title="Xuất bản ngay"
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Send size={14} />
                          </button>
                        )}

                        {/* Public Link */}
                        {article.status === "PUBLISHED" && (
                          <Link
                            href={`/tin-cong-nghe/${article.slug}`}
                            target="_blank"
                            title="Xem trang web công khai"
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <ExternalLink size={14} />
                          </Link>
                        )}

                        {/* Delete */}
                        <button
                          onClick={() =>
                            handleDelete(article.id, article.title || article.originalTitle)
                          }
                          title="Xóa bài viết"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
