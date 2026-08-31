"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Save,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  RefreshCw,
  Share2,
  FileText,
  Sliders,
  Eye,
  AlertCircle,
  HelpCircle,
  Zap,
  Copy,
  Calendar,
  Layers,
  Tag,
  Check,
} from "lucide-react";
import { Article, SocialPost } from "@/lib/content-engine/types";
import { DEFAULT_CATEGORIES } from "@/lib/content-engine/default-sources";
import { RewriteTone } from "@/lib/content-engine/services/ai-editor";

const TONES: RewriteTone[] = [
  "Dễ hiểu",
  "Ngắn gọn",
  "Chi tiết",
  "Chuyên gia",
  "Chuẩn SEO",
  "Dành cho học sinh",
  "Dành cho dân văn phòng",
];

export default function ArticleReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [selectedTone, setSelectedTone] = useState<RewriteTone>("Dễ hiểu");

  // Social Modal State
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [isGeneratingSocial, setIsGeneratingSocial] = useState(false);
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null);

  // Toast State
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3500);
  };

  const loadArticle = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/admin/content/articles/${id}`);
      const data = await res.json();
      if (data.success) {
        setArticle(data.data);
        if (data.data.aiTone) {
          setSelectedTone(data.data.aiTone as RewriteTone);
        }
      } else {
        showToast("Không tìm thấy bài viết", "error");
      }
    } catch {
      showToast("Lỗi tải chi tiết bài viết", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArticle();
  }, [id]);

  const handleSave = async () => {
    if (!article) return;
    try {
      setIsSaving(true);
      const res = await fetch(`/api/admin/content/articles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });
      const data = await res.json();
      if (data.success) {
        setArticle(data.data);
        showToast("Đã lưu các chỉnh sửa thành công!");
      } else {
        showToast(data.error || "Lỗi khi lưu bài viết", "error");
      }
    } catch {
      showToast("Lỗi kết nối máy chủ", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAiRewrite = async (tone: RewriteTone) => {
    try {
      setIsAiProcessing(true);
      setSelectedTone(tone);
      const res = await fetch(`/api/admin/content/articles/${id}/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "rewrite", tone }),
      });
      const data = await res.json();
      if (data.success) {
        setArticle(data.data);
        showToast(`Đã viết lại bài viết bằng AI theo phong cách "${tone}"!`);
      } else {
        showToast(data.error || "Lỗi xử lý AI", "error");
      }
    } catch {
      showToast("Lỗi kết nối máy chủ khi gọi AI", "error");
    } finally {
      setIsAiProcessing(false);
    }
  };

  const handleApprove = async () => {
    try {
      const res = await fetch(`/api/admin/content/articles/${id}/approve`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setArticle(data.data);
        showToast("Đã duyệt bài viết thành công!");
      }
    } catch {
      showToast("Lỗi duyệt bài", "error");
    }
  };

  const handlePublishNow = async () => {
    try {
      const res = await fetch(`/api/admin/content/articles/${id}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.success) {
        setArticle(data.data);
        showToast("Đã xuất bản bài viết lên trang tin công nghệ!");
      }
    } catch {
      showToast("Lỗi xuất bản", "error");
    }
  };

  const handleReject = async () => {
    const reason = prompt("Lý do từ chối bài viết:", "Nội dung không phù hợp với định hướng khóa học");
    if (!reason) return;

    try {
      const res = await fetch(`/api/admin/content/articles/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      const data = await res.json();
      if (data.success) {
        setArticle(data.data);
        showToast("Đã từ chối bài viết.");
      }
    } catch {
      showToast("Lỗi từ chối bài", "error");
    }
  };

  const handleGenerateSocial = async () => {
    try {
      setIsGeneratingSocial(true);
      setShowSocialModal(true);
      const res = await fetch(`/api/admin/content/articles/${id}/social`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSocialPosts(data.data);
      }
    } catch {
      showToast("Lỗi sinh nội dung mạng xã hội", "error");
    } finally {
      setIsGeneratingSocial(false);
    }
  };

  const copyToClipboard = (text: string, platform: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPlatform(platform);
    setTimeout(() => setCopiedPlatform(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center space-y-3">
        <RefreshCw size={28} className="animate-spin text-blue-600 mx-auto" />
        <p className="text-sm font-bold text-slate-500">Đang tải chi tiết bài viết và nội dung AI...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-slate-600 font-bold">Không tìm thấy bài viết này.</p>
        <Link href="/admin/content-engine/articles" className="text-blue-600 text-xs mt-3 inline-block font-bold">
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Toast */}
      {toast.show && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border text-sm font-semibold transition-all ${
            toast.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 size={18} className="text-emerald-600" /> : <AlertCircle size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/content-engine/articles"
            className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-blue-600">{article.sourceName}</span>
              <span className="text-slate-300">•</span>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                  article.status === "PUBLISHED"
                    ? "bg-emerald-100 text-emerald-800"
                    : article.status === "APPROVED"
                    ? "bg-blue-100 text-blue-800"
                    : article.status === "AI_DRAFT"
                    ? "bg-indigo-100 text-indigo-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {article.status}
              </span>
            </div>
            <h2 className="text-sm font-extrabold text-slate-900 line-clamp-1 max-w-xl">
              {article.title || article.originalTitle}
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            <Save size={13} />
            <span>{isSaving ? "Đang lưu..." : "Lưu Chỉnh Sửa"}</span>
          </button>

          <button
            onClick={handleApprove}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <CheckCircle2 size={13} />
            <span>Duyệt Bài</span>
          </button>

          <button
            onClick={handlePublishNow}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Send size={13} />
            <span>Đăng Ngay</span>
          </button>

          <button
            onClick={handleGenerateSocial}
            className="flex items-center gap-1.5 px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-xl border border-purple-200 transition-colors cursor-pointer"
          >
            <Share2 size={13} />
            <span>Mạng Xã Hội</span>
          </button>

          {article.status === "PUBLISHED" && (
            <Link
              href={`/tin-cong-nghe/${article.slug}`}
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              <Eye size={13} />
              <span>Xem Trực Tiếp</span>
            </Link>
          )}

          <button
            onClick={handleReject}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            title="Từ chối bài này"
          >
            <XCircle size={16} />
          </button>
        </div>
      </div>

      {/* TWO-COLUMN SPLIT SCREEN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN: NỘI DUNG GỐC (5 Columns on Desktop) */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 sticky top-20 max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs">
              <FileText size={16} className="text-slate-500" />
              <span>Nội Dung Nguồn Gốc (Original Source)</span>
            </div>
            {article.originalUrl && (
              <a
                href={article.originalUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline"
              >
                <span>Mở link gốc</span>
                <ExternalLink size={11} />
              </a>
            )}
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <div className="text-[11px] text-slate-500 font-medium">Nguồn: <b>{article.sourceName}</b></div>
              {article.originalAuthor && (
                <div className="text-[11px] text-slate-500 font-medium">Tác giả: {article.originalAuthor}</div>
              )}
              {article.originalPublishedAt && (
                <div className="text-[11px] text-slate-400 font-medium">
                  Ngày đăng gốc: {new Date(article.originalPublishedAt).toLocaleString("vi-VN")}
                </div>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Tiêu Đề Bài Viết Gốc
              </label>
              <p className="font-extrabold text-slate-900 leading-snug bg-slate-50 p-3 rounded-xl border border-slate-100">
                {article.originalTitle}
              </p>
            </div>

            {article.imageUrl && (
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Hình Ảnh Thumbnail
                </label>
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-xl border border-slate-200"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Tóm Tắt Gốc (Description)
              </label>
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {article.originalDescription || "Không có tóm tắt"}
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Chi Tiết Nội Dung Thu Thập
              </label>
              <div className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 max-h-64 overflow-y-auto whitespace-pre-wrap">
                {article.originalContent || article.originalDescription}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: BIÊN TẬP AI & SEO (7 Columns on Desktop) */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
          {/* AI Score Header */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-slate-900 text-xs">
                <Sparkles size={16} className="text-blue-600" />
                <span>Đánh Giá AI Relevance: {article.aiScore} / 100</span>
              </div>
              <span className="text-[11px] font-bold text-indigo-700 bg-white/80 px-2.5 py-0.5 rounded-full border border-indigo-200">
                {article.categoryName}
              </span>
            </div>
            {article.aiReason && (
              <p className="text-xs text-slate-600 leading-relaxed italic">
                &ldquo;{article.aiReason}&rdquo;
              </p>
            )}

            {/* Score Breakdown Bars */}
            {article.aiScoreBreakdown && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-[10px] font-bold text-slate-600 border-t border-blue-200/40">
                <div>Chủ đề: {article.aiScoreBreakdown.topicRelevance}/30</div>
                <div>Độ mới: {article.aiScoreBreakdown.freshness}/20</div>
                <div>Học hỏi: {article.aiScoreBreakdown.educationalValue}/20</div>
                <div>SEO: {article.aiScoreBreakdown.seoPotential}/15</div>
                <div>Chuyển đổi: {article.aiScoreBreakdown.conversionPotential}/15</div>
              </div>
            )}
          </div>

          {/* AI Rewrite Selector Bar */}
          <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Zap size={14} className="text-amber-500" />
                <span>Viết Lại Bằng AI (Tùy Chọn Văn Phong)</span>
              </span>
              {isAiProcessing && (
                <span className="text-[11px] text-blue-600 font-bold flex items-center gap-1">
                  <RefreshCw size={12} className="animate-spin" /> Đang tổng hợp lại...
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {TONES.map((tone) => (
                <button
                  key={tone}
                  type="button"
                  disabled={isAiProcessing}
                  onClick={() => handleAiRewrite(tone)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    selectedTone === tone
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          {/* Editable Form */}
          <div className="space-y-4 text-xs font-semibold">
            {/* Title */}
            <div>
              <label className="block text-slate-700 mb-1">
                Tiêu Đề Bài Viết Tiếng Việt (Chuẩn SEO) *
              </label>
              <input
                type="text"
                value={article.title || ""}
                onChange={(e) => setArticle({ ...article, title: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm font-extrabold rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Slug & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 mb-1">Slug URL (Đường dẫn tĩnh) *</label>
                <input
                  type="text"
                  value={article.slug || ""}
                  onChange={(e) => setArticle({ ...article, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Chuyên Mục</label>
                <select
                  value={article.categoryName || DEFAULT_CATEGORIES[0].name}
                  onChange={(e) =>
                    setArticle({
                      ...article,
                      categoryName: e.target.value,
                      categoryId:
                        DEFAULT_CATEGORIES.find((c) => c.name === e.target.value)?.id || "cat-ai",
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                >
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-slate-700 mb-1">Tóm Tắt Bài Viết (Excerpt)</label>
              <textarea
                rows={2}
                value={article.excerpt || ""}
                onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>

            {/* Content (Markdown / Structured) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-700">Nội Dung Bài Viết (Định dạng Markdown / H2)</label>
                <span className="text-[10px] text-slate-400">
                  Thời lượng đọc ước tính: ~{article.readingTimeMinutes || 3} phút
                </span>
              </div>
              <textarea
                rows={12}
                value={article.content || ""}
                onChange={(e) => setArticle({ ...article, content: e.target.value })}
                className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono text-[11px] leading-relaxed"
              />
            </div>

            {/* SEO Meta Title & Meta Description */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <span className="text-xs font-black text-slate-900 block">
                Cấu Hình SEO Metadata (Google Search)
              </span>

              <div>
                <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                  <span>Meta Title ({article.metaTitle?.length || 0}/65 ký tự)</span>
                </div>
                <input
                  type="text"
                  value={article.metaTitle || ""}
                  onChange={(e) => setArticle({ ...article, metaTitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                  <span>Meta Description ({article.metaDescription?.length || 0}/160 ký tự)</span>
                </div>
                <textarea
                  rows={2}
                  value={article.metaDescription || ""}
                  onChange={(e) => setArticle({ ...article, metaDescription: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>
            </div>

            {/* Contextual CTA */}
            <div>
              <label className="block text-slate-700 mb-1">
                Khung Lời Kêu Gọi Hành Động (CTA Khóa Học)
              </label>
              <textarea
                rows={2}
                value={article.ctaText || ""}
                onChange={(e) => setArticle({ ...article, ctaText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-amber-50/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SOCIAL MEDIA POST MODAL */}
      {showSocialModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Share2 size={18} className="text-purple-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Nội Dung Mạng Xã Hội Tự Động (Social Posts)
                </h3>
              </div>
              <button
                onClick={() => setShowSocialModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            {isGeneratingSocial ? (
              <div className="text-center py-10 space-y-2">
                <RefreshCw size={24} className="animate-spin text-purple-600 mx-auto" />
                <p className="text-xs text-slate-500 font-bold">
                  AI đang tạo mẫu bài đăng tối ưu cho Facebook, Zalo, Telegram...
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                {socialPosts.map((post) => (
                  <div key={post.platform} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-purple-700">
                        {post.platform} Post
                      </span>
                      <button
                        onClick={() => copyToClipboard(post.content, post.platform)}
                        className="flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        {copiedPlatform === post.platform ? (
                          <>
                            <Check size={12} className="text-emerald-600" />
                            <span className="text-emerald-700">Đã sao chép!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                      {post.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowSocialModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 font-bold text-xs rounded-xl"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
