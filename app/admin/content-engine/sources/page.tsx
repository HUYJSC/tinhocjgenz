"use client";

import { useState, useEffect } from "react";
import {
  Rss,
  Plus,
  Play,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Edit2,
  Trash2,
  ExternalLink,
  RefreshCw,
  Zap,
  Search,
  Check,
  X,
  Radio,
} from "lucide-react";
import { Source, SourcePriority, SourceType } from "@/lib/content-engine/types";
import { DEFAULT_CATEGORIES } from "@/lib/content-engine/default-sources";

export default function SourcesManagementPage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State: Add / Edit
  const [showModal, setShowModal] = useState(false);
  const [editingSource, setEditingSource] = useState<Partial<Source> | null>(null);

  // Modal State: Test Feed
  const [testResult, setTestResult] = useState<any | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);

  // Fetch single source state
  const [fetchingSourceId, setFetchingSourceId] = useState<string | null>(null);
  const [actionToast, setActionToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const loadSources = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/content/sources");
      const data = await res.json();
      if (data.success) {
        setSources(data.data);
      }
    } catch (err) {
      console.error("Lỗi tải nguồn:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSources();
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setActionToast({ show: true, message, type });
    setTimeout(() => setActionToast({ show: false, message: "", type: "success" }), 4000);
  };

  const handleSaveSource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSource?.name || !editingSource?.feedUrl) {
      showToast("Vui lòng điền tên nguồn và Feed URL!", "error");
      return;
    }

    try {
      const isEditing = !!editingSource.id;
      const url = isEditing
        ? `/api/admin/content/sources/${editingSource.id}`
        : "/api/admin/content/sources";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingSource),
      });

      const data = await res.json();
      if (data.success) {
        showToast(isEditing ? "Đã cập nhật nguồn tin!" : "Đã thêm nguồn tin mới!");
        setShowModal(false);
        setEditingSource(null);
        loadSources();
      } else {
        showToast(data.error || "Lỗi lưu nguồn tin", "error");
      }
    } catch {
      showToast("Lỗi kết nối máy chủ", "error");
    }
  };

  const handleDeleteSource = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa nguồn "${name}" không?`)) return;

    try {
      const res = await fetch(`/api/admin/content/sources/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast(`Đã xóa nguồn "${name}"!`);
        loadSources();
      } else {
        showToast(data.error || "Lỗi xóa nguồn", "error");
      }
    } catch {
      showToast("Lỗi kết nối máy chủ", "error");
    }
  };

  const handleToggleActive = async (source: Source) => {
    try {
      const res = await fetch(`/api/admin/content/sources/${source.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !source.isActive }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Đã ${!source.isActive ? "bật" : "tắt"} nguồn "${source.name}"!`);
        loadSources();
      }
    } catch {
      showToast("Lỗi cập nhật trạng thái", "error");
    }
  };

  const handleTestFeed = async (sourceOrUrl: { id?: string; feedUrl?: string; name?: string; sourceType?: string }) => {
    try {
      setIsTesting(true);
      setShowTestModal(true);
      setTestResult(null);

      const targetId = sourceOrUrl.id || "test-temp";
      const res = await fetch(`/api/admin/content/sources/${targetId}/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sourceOrUrl),
      });
      const data = await res.json();
      setTestResult(data.data || { ok: false, error: data.error });
    } catch (err: any) {
      setTestResult({ ok: false, error: err?.message || "Không thể kết nối" });
    } finally {
      setIsTesting(false);
    }
  };

  const handleFetchNow = async (source: Source) => {
    try {
      setFetchingSourceId(source.id);
      const res = await fetch("/api/admin/content/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceId: source.id }),
      });
      const data = await res.json();
      if (data.success) {
        const fetchedCount = data.data?.[0]?.newArticlesCount ?? 0;
        showToast(`Đã thu thập thành công! Tìm thấy ${fetchedCount} bài mới từ "${source.name}".`);
        loadSources();
      } else {
        showToast(data.error || "Lỗi nạp tin", "error");
      }
    } catch {
      showToast("Lỗi máy chủ", "error");
    } finally {
      setFetchingSourceId(null);
    }
  };

  const filteredSources = sources.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.feedUrl.toLowerCase().includes(search.toLowerCase())
  );

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
          {actionToast.type === "success" ? (
            <CheckCircle2 size={18} className="text-emerald-600" />
          ) : (
            <AlertCircle size={18} className="text-red-600" />
          )}
          <span>{actionToast.message}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">Quản Lý Nguồn Tin Tức (RSS / ATOM / API)</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Cấu hình danh sách nguồn công nghệ, tần suất quét và chế độ AI biên tập tự động.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm nguồn tin..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={() => {
              setEditingSource({
                name: "",
                url: "",
                feedUrl: "",
                sourceType: "RSS",
                category: "AI & Trí tuệ nhân tạo",
                language: "en",
                priority: "NORMAL",
                isActive: true,
                autoFetch: true,
                autoProcessAi: true,
                autoPublish: false,
                fetchInterval: 30,
              });
              setShowModal(true);
            }}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm shadow-blue-500/20 transition-all shrink-0 cursor-pointer"
          >
            <Plus size={14} />
            <span>Thêm Nguồn Mới</span>
          </button>
        </div>
      </div>

      {/* Sources Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200/80 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Trạng Thái</th>
                <th className="px-4 py-3.5">Tên Nguồn & Feed URL</th>
                <th className="px-4 py-3.5">Chuyên Mục</th>
                <th className="px-4 py-3.5">Độ Ưu Tiên</th>
                <th className="px-4 py-3.5">Tần Suất</th>
                <th className="px-4 py-3.5">Lần Quét Cuối</th>
                <th className="px-4 py-3.5 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    <RefreshCw size={20} className="animate-spin text-blue-600 mx-auto mb-2" />
                    Đang tải danh sách nguồn...
                  </td>
                </tr>
              ) : filteredSources.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    Không tìm thấy nguồn tin nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredSources.map((source) => (
                  <tr key={source.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Active Toggle */}
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => handleToggleActive(source)}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          source.isActive ? "bg-emerald-500" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            source.isActive ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </td>

                    {/* Name & URL */}
                    <td className="px-4 py-3.5 max-w-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-xs">{source.name}</span>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-blue-600"
                          title="Trang chủ nguồn"
                        >
                          <ExternalLink size={12} />
                        </a>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5" title={source.feedUrl}>
                        {source.feedUrl}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3.5">
                      <span className="text-slate-700 font-semibold">{source.category}</span>
                    </td>

                    {/* Priority */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                          source.priority === "OFFICIAL"
                            ? "bg-blue-100 text-blue-800"
                            : source.priority === "HIGH"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {source.priority}
                      </span>
                    </td>

                    {/* Interval */}
                    <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
                      {source.fetchInterval} phút
                    </td>

                    {/* Last Fetch */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {source.lastFetchAt ? (
                        <div>
                          <span className="text-slate-700 font-semibold">
                            {new Date(source.lastFetchAt).toLocaleTimeString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            {new Date(source.lastFetchAt).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400">Chưa quét</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Test Feed Button */}
                        <button
                          onClick={() => handleTestFeed(source)}
                          title="Kiểm tra kết nối Feed (Test)"
                          className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Zap size={15} />
                        </button>

                        {/* Fetch Now Button */}
                        <button
                          onClick={() => handleFetchNow(source)}
                          disabled={fetchingSourceId === source.id}
                          title="Quét tin ngay bây giờ"
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <Play
                            size={15}
                            className={fetchingSourceId === source.id ? "animate-spin" : ""}
                          />
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() => {
                            setEditingSource(source);
                            setShowModal(true);
                          }}
                          title="Chỉnh sửa nguồn"
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 size={15} />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteSource(source.id, source.name)}
                          title="Xóa nguồn tin"
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 size={15} />
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

      {/* MODAL 1: Add / Edit Source Modal */}
      {showModal && editingSource && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">
                {editingSource.id ? "Chỉnh Sửa Nguồn Tin" : "Thêm Nguồn Tin Mới"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveSource} className="space-y-4 mt-4 text-xs font-semibold">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1">Tên Nguồn *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Microsoft 365 Updates"
                    value={editingSource.name || ""}
                    onChange={(e) => setEditingSource({ ...editingSource, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Loại Nguồn</label>
                  <select
                    value={editingSource.sourceType || "RSS"}
                    onChange={(e) =>
                      setEditingSource({ ...editingSource, sourceType: e.target.value as SourceType })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="RSS">RSS 2.0</option>
                    <option value="ATOM">ATOM Feed</option>
                    <option value="XML">XML Custom</option>
                    <option value="API">REST API</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">URL Feed (RSS/ATOM link) *</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    placeholder="https://example.com/feed/"
                    value={editingSource.feedUrl || ""}
                    onChange={(e) => setEditingSource({ ...editingSource, feedUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleTestFeed({
                        name: editingSource.name,
                        feedUrl: editingSource.feedUrl,
                        sourceType: editingSource.sourceType,
                      })
                    }
                    className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl shrink-0 transition-colors cursor-pointer"
                  >
                    Test Feed
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Website URL Gốc</label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={editingSource.url || ""}
                  onChange={(e) => setEditingSource({ ...editingSource, url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1">Chuyên Mục Mặc Định</label>
                  <select
                    value={editingSource.category || DEFAULT_CATEGORIES[0].name}
                    onChange={(e) => setEditingSource({ ...editingSource, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                  >
                    {DEFAULT_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Độ Ưu Tiên</label>
                  <select
                    value={editingSource.priority || "NORMAL"}
                    onChange={(e) =>
                      setEditingSource({
                        ...editingSource,
                        priority: e.target.value as SourcePriority,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="LOW">LOW (Thấp)</option>
                    <option value="NORMAL">NORMAL (Bình thường)</option>
                    <option value="HIGH">HIGH (Ưu tiên cao)</option>
                    <option value="OFFICIAL">OFFICIAL (Chính thống)</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={editingSource.autoFetch ?? true}
                    onChange={(e) =>
                      setEditingSource({ ...editingSource, autoFetch: e.target.checked })
                    }
                    className="rounded text-blue-600"
                  />
                  <span className="text-[11px] text-slate-700">Tự động quét</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={editingSource.autoProcessAi ?? true}
                    onChange={(e) =>
                      setEditingSource({ ...editingSource, autoProcessAi: e.target.checked })
                    }
                    className="rounded text-blue-600"
                  />
                  <span className="text-[11px] text-slate-700">AI biên tập</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={editingSource.autoPublish ?? false}
                    onChange={(e) =>
                      setEditingSource({ ...editingSource, autoPublish: e.target.checked })
                    }
                    className="rounded text-blue-600"
                  />
                  <span className="text-[11px] text-slate-700">Tự đăng (Auto-Publish)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  Lưu Nguồn Tin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Test Feed Result Modal */}
      {showTestModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-indigo-600" />
                <h3 className="text-base font-extrabold text-slate-900">Kiểm Tra Kết Nối Feed</h3>
              </div>
              <button
                onClick={() => setShowTestModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <div className="py-4 space-y-4">
              {isTesting ? (
                <div className="text-center py-8 space-y-2">
                  <RefreshCw size={24} className="animate-spin text-blue-600 mx-auto" />
                  <p className="text-xs text-slate-500 font-medium">
                    Đang gửi request và phân tích cấu trúc Feed...
                  </p>
                </div>
              ) : testResult ? (
                <div className="space-y-3">
                  {testResult.ok ? (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-xs">
                        <CheckCircle2 size={16} className="text-emerald-600" />
                        <span>Kết nối thành công (Connection: OK)</span>
                      </div>
                      <div className="text-xs space-y-1 font-medium text-emerald-900">
                        <p>• Định dạng: <b>{testResult.feedType}</b></p>
                        <p>• Số bài phát hiện: <b>{testResult.itemCount} bài</b></p>
                        <p className="truncate">• Bài mới nhất: <i>{testResult.latestItemTitle}</i></p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-xs">
                        <XCircle size={16} className="text-rose-600" />
                        <span>Không thể kết nối hoặc XML không hợp lệ</span>
                      </div>
                      <p className="text-xs text-rose-700">{testResult.error}</p>
                    </div>
                  )}

                  {testResult.sampleItems && testResult.sampleItems.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold text-slate-700">Xem trước bài viết mẫu ({testResult.sampleItems.length}):</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {testResult.sampleItems.map((item: any, idx: number) => (
                          <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                            <p className="font-bold text-slate-900 truncate">{item.title}</p>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowTestModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
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
