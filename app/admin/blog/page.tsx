"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Search,
  ExternalLink,
  Clock,
  Tag,
  Eye,
  CheckCircle2,
  X
} from "lucide-react";
import { BLOG_POSTS as initialBlogPosts, BlogPost } from "@/data/blogData";

export default function AdminBlogCMSPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const filteredPosts = blogPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleOpenAdd = () => {
    setEditingBlog({
      slug: `bai-viet-${Date.now()}`,
      title: "",
      excerpt: "",
      content: "",
      coverImage: "/logo-icon.png",
      publishedAt: new Date().toLocaleDateString("vi-VN"),
      readTime: "5 phút",
      tags: ["MOS", "Kinh Nghiệm"],
      author: {
        name: "Ban Đào Tạo Tin Học Gen Z",
        avatar: "/logo-icon.png",
        role: "Giảng viên Certiport Master"
      }
    });
    setShowModal(true);
  };

  const handleOpenEdit = (p: BlogPost) => {
    setEditingBlog({ ...p });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog || !editingBlog.title) return;

    const exists = blogPosts.some((b) => b.slug === editingBlog.slug);
    if (exists) {
      setBlogPosts(blogPosts.map((b) => (b.slug === editingBlog.slug ? editingBlog : b)));
    } else {
      setBlogPosts([editingBlog, ...blogPosts]);
    }
    setShowModal(false);
    setEditingBlog(null);
  };

  const handleDelete = (slug: string) => {
    if (confirm("Xóa bài viết này khỏi hệ thống Blog?")) {
      setBlogPosts(blogPosts.filter((b) => b.slug !== slug));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-display">
            <FileText className="text-amber-400" />
            <span>Quản Trị Bài Viết & Tin Tức (CMS)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Biên tập cẩm nang học tập, bí quyết thi 1000 điểm MOS/IC3 và tin tức công nghệ.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-black shadow-lg shadow-amber-600/30 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Viết Bài Viết Mới</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
        <Search size={18} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm bài viết theo tiêu đề, nội dung tóm tắt, từ khóa tags..."
          className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
        />
      </div>

      {/* Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPosts.map((post) => (
          <div
            key={post.slug}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all"
          >
            <div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-slate-800 text-amber-300 text-[10px] font-bold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <h3 className="text-base font-black text-white tracking-tight line-clamp-2 font-display">
                {post.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className="text-slate-500" />
                  <span>{post.readTime} • {post.publishedAt}</span>
                </div>
                <div className="text-slate-300 font-bold">
                  {post.author.name}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>Xem trên Web</span>
                <ExternalLink size={12} />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(post)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Chỉnh sửa bài viết"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(post.slug)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-300 transition-colors cursor-pointer"
                  title="Xóa bài viết"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Modal */}
      {showModal && editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <FileText size={18} className="text-amber-400" />
                <span>{editingBlog.title ? "Chỉnh Sửa Bài Viết" : "Tạo Bài Viết Mới"}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Tiêu Đề Bài Viết:</label>
                <input
                  type="text"
                  required
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  placeholder="Ví dụ: Bí Quyết Đạt 1000 Điểm MOS Excel..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Đoạn Trích Tóm Tắt (Meta Excerpt):</label>
                <textarea
                  rows={2}
                  value={editingBlog.excerpt}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  placeholder="Tóm tắt ngắn gọn hiển thị trên thẻ bài viết và công cụ tìm kiếm..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Nội Dung Bài Viết (Markdown / Text):</label>
                <textarea
                  rows={6}
                  value={editingBlog.content}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono"
                  placeholder="Soạn thảo nội dung bài viết..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Thời Gian Đọc:</label>
                  <input
                    type="text"
                    value={editingBlog.readTime}
                    onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                    placeholder="Ví dụ: 5 phút"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tác Giả:</label>
                  <input
                    type="text"
                    value={editingBlog.author.name}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        author: { ...editingBlog.author, name: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-black shadow-md shadow-amber-600/30"
                >
                  Lưu & Xuất Bản Bài Viết
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
