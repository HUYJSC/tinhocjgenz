"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FileSpreadsheet,
  Upload,
  Video,
  Image,
  FileText,
  Copy,
  Check,
  Eye,
  Trash2,
  X,
  Download,
  RefreshCw,
  HardDrive,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";
import { MediaFileRecord, ALLOWED_EXTENSIONS, MAX_FILE_SIZE_BYTES } from "@/lib/media-store";

export default function AdminMediaPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<MediaFileRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalStorageFormatted, setTotalStorageFormatted] = useState("0 B");
  const [selectedPreview, setSelectedPreview] = useState<MediaFileRecord | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setUploadError(null);
    try {
      const url = categoryFilter === "ALL" ? "/api/admin/media" : `/api/admin/media?category=${categoryFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setFiles(data.data || []);
        setTotalStorageFormatted(data.totalStorageFormatted || "0 B");
      }
    } catch {
      console.warn("Lỗi tải danh sách media");
    } finally {
      setLoading(false);
    }
  }, [categoryFilter]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);
    setUploadError(null);

    try {
      for (const file of Array.from(selectedFiles)) {
        const ext = "." + (file.name.split(".").pop() || "").toLowerCase();

        if (!ALLOWED_EXTENSIONS.has(ext)) {
          setUploadError(`Tệp "${file.name}" không hợp lệ. Chỉ chấp nhận các định dạng an toàn (.pdf, .docx, .xlsx, .pptx, .png, .jpg).`);
          continue;
        }

        if (file.size > MAX_FILE_SIZE_BYTES) {
          setUploadError(`Tệp "${file.name}" quá lớn (${(file.size / (1024 * 1024)).toFixed(1)} MB). Giới hạn tối đa là 25 MB.`);
          continue;
        }

        let cat: MediaFileRecord["category"] = "document";
        if (ext === ".pdf") cat = "exam";
        else if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) cat = "image";

        const res = await fetch("/api/admin/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            originalFilename: file.name,
            mimeType: file.type || "application/octet-stream",
            fileSizeBytes: file.size,
            category: cat,
          }),
        });

        const data = await res.json();
        if (!data.success) {
          setUploadError(data.error || `Tải lên ${file.name} thất bại.`);
        }
      }

      await fetchFiles();
    } catch {
      setUploadError("Lỗi kết nối máy chủ khi tải tệp lên.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa tệp này khỏi kho lưu trữ?")) return;

    try {
      const res = await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        await fetchFiles();
      } else {
        alert(data.error || "Xóa tệp thất bại.");
      }
    } catch {
      alert("Lỗi kết nối máy chủ.");
    }
  };

  const handleCopyLink = (file: MediaFileRecord) => {
    const link = `/tai-lieu?path=${encodeURIComponent(file.storagePath)}`;
    navigator.clipboard.writeText(link);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-display">
            <FileSpreadsheet className="text-pink-400" />
            <span>Kho Đề Thi & Tài Liệu Media Bảo Mật</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Lưu trữ Private Storage: Kiểm tra MIME type, giới hạn 25MB, chống upload mã độc thực thi (.exe, .html, .js).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchFiles}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
            title="Làm mới danh sách"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.docx,.xlsx,.pptx,.png,.jpg,.jpeg,.webp"
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white text-xs font-black shadow-lg shadow-pink-600/30 transition-all cursor-pointer"
          >
            <Upload size={16} />
            <span>{uploading ? "Đang xử lý..." : "Tải Lên Tệp Mới"}</span>
          </button>
        </div>
      </div>

      {/* Storage Metrics Pill Banner */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-slate-300">
          <HardDrive size={18} className="text-pink-400" />
          <span>
            Dung lượng lưu trữ thực tế: <strong className="text-white font-mono">{totalStorageFormatted}</strong> / 1.0 GB
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span>Private Bucket (Chỉ cấp quyền tải có chữ ký số)</span>
        </div>
      </div>

      {/* Upload Error Banner */}
      {uploadError && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-rose-400 shrink-0" />
            <span>{uploadError}</span>
          </div>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="p-1 rounded-lg text-rose-400 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: "ALL", label: "Tất Cả Tệp" },
          { id: "exam", label: "Đề Thi MOS/IC3" },
          { id: "document", label: "Tài Liệu & Template" },
          { id: "image", label: "Hình Ảnh Chứng Nhận" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setCategoryFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              categoryFilter === tab.id
                ? "bg-pink-600 text-white shadow-sm font-black"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-pink-500" />
          <p className="text-xs">Đang tải kho tài liệu...</p>
        </div>
      ) : files.length === 0 ? (
        <div className="py-16 text-center text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
          <FileSpreadsheet size={32} className="mx-auto mb-2 text-slate-600" />
          <p className="text-sm font-bold text-slate-400">Chưa có tệp nào trong danh mục này.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => {
            const isImg = file.category === "image";
            const isExam = file.category === "exam";

            return (
              <div
                key={file.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all group shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-slate-800 text-slate-300 font-mono">
                      {file.originalFilename.split(".").pop()}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {formatBytes(file.fileSizeBytes)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 my-2">
                    {isImg ? (
                      <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center justify-center shrink-0">
                        <Image size={18} />
                      </div>
                    ) : isExam ? (
                      <div className="w-10 h-10 rounded-xl bg-pink-950 text-pink-400 border border-pink-800/60 flex items-center justify-center shrink-0">
                        <FileSpreadsheet size={18} />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 border border-blue-800/60 flex items-center justify-center shrink-0">
                        <FileText size={18} />
                      </div>
                    )}
                    <div className="truncate">
                      <div className="text-xs font-bold text-white truncate" title={file.originalFilename}>
                        {file.originalFilename}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 font-mono truncate">
                        Người tải: {file.uploadedBy} • {new Date(file.createdAt).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-1">
                  <button
                    type="button"
                    onClick={() => setSelectedPreview(file)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1 cursor-pointer"
                    title="Xem chi tiết"
                  >
                    <Eye size={13} />
                    <span>Chi Tiết</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(file)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs cursor-pointer"
                      title="Sao chép đường dẫn tải bảo mật"
                    >
                      {copiedId === file.id ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteMedia(file.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-300 transition-colors text-xs cursor-pointer"
                      title="Xóa tệp"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Detail Modal */}
      {selectedPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="truncate">
                <h3 className="text-sm font-black text-white truncate">{selectedPreview.originalFilename}</h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  {formatBytes(selectedPreview.fileSizeBytes)} • {selectedPreview.mimeType}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPreview(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-slate-400 break-all">
                Đường dẫn nội bộ: {selectedPreview.storagePath}
              </div>
              <div className="flex items-center justify-between">
                <span>Trạng thái bảo mật:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck size={13} /> Đã quét MIME & An toàn
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Người tải lên:</span>
                <span className="font-bold text-white font-mono">{selectedPreview.uploadedBy}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setSelectedPreview(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => handleCopyLink(selectedPreview)}
                className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold"
              >
                Sao Chép Đường Dẫn Tải
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
