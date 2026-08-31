"use client";

import React, { useState, useRef } from "react";
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
  ExternalLink,
  Sparkles,
  Download
} from "lucide-react";

interface MediaFile {
  id: string;
  name: string;
  type: "document" | "video" | "image" | "spreadsheet" | "presentation" | "archive";
  format: string;
  size: string;
  uploadDate: string;
  url: string;
  category: string;
}

export default function AdminMediaPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: "file-1",
      name: "De_Thi_Thu_MOS_Excel_2026_Project_1_7.pdf",
      type: "document",
      format: "PDF",
      size: "4.2 MB",
      uploadDate: "23/08/2026",
      url: "/tai-lieu",
      category: "Đề thi MOS"
    },
    {
      id: "file-2",
      name: "Video_Huong_Dan_Giai_Bay_IC3_GS6_FullHD.mp4",
      type: "video",
      format: "MP4",
      size: "185 MB",
      uploadDate: "22/08/2026",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      category: "Video bài giảng"
    },
    {
      id: "file-3",
      name: "Template_Excel_Dashboard_Doanh_So_Dynamic.xlsx",
      type: "spreadsheet",
      format: "XLSX",
      size: "1.8 MB",
      uploadDate: "21/08/2026",
      url: "/tai-lieu",
      category: "Biểu mẫu Excel"
    },
    {
      id: "file-4",
      name: "Chung_Chi_Certiport_DNTU_Diem_Tuyet_Doi_1000.png",
      type: "image",
      format: "PNG",
      size: "2.4 MB",
      uploadDate: "20/08/2026",
      url: "/logo-icon.png",
      category: "Bằng khen & Chứng chỉ"
    }
  ]);

  const [selectedPreview, setSelectedPreview] = useState<MediaFile | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const ext = file.name.split(".").pop()?.toUpperCase() || "FILE";
      let fileType: MediaFile["type"] = "document";

      if (["MP4", "WEBM", "MKV", "MOV"].includes(ext)) {
        fileType = "video";
      } else if (["PNG", "JPG", "JPEG", "WEBP", "SVG", "GIF"].includes(ext)) {
        fileType = "image";
      } else if (["XLSX", "XLS", "CSV"].includes(ext)) {
        fileType = "spreadsheet";
      }

      const sizeInMb = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      const blobUrl = URL.createObjectURL(file);

      const newMedia: MediaFile = {
        id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: file.name,
        type: fileType,
        format: ext,
        size: sizeInMb,
        uploadDate: new Date().toLocaleDateString("vi-VN"),
        url: blobUrl,
        category: "Tài liệu tải lên"
      };

      setMediaFiles((prev) => [newMedia, ...prev]);
    });
  };

  const handleCopyLink = (file: MediaFile) => {
    navigator.clipboard.writeText(file.url);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteMedia = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa tệp tin này?")) {
      setMediaFiles(mediaFiles.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-display">
            <FileSpreadsheet className="text-pink-400" />
            <span>Kho Đề Thi & Tài Liệu Media</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Quản lý đề thi MOS/IC3 bản quyền, video bài tập mẫu và tệp thực hành văn phòng.
          </p>
        </div>
        <div>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-black shadow-lg shadow-pink-600/30 transition-all cursor-pointer"
          >
            <Upload size={16} />
            <span>Tải Lên Tệp Mới</span>
          </button>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mediaFiles.map((file) => (
          <div
            key={file.id}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-slate-800 text-slate-300">
                  {file.format}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{file.size}</span>
              </div>

              <div className="flex items-center gap-2.5 my-2">
                {file.type === "video" ? (
                  <div className="w-10 h-10 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800/60 flex items-center justify-center shrink-0">
                    <Video size={18} />
                  </div>
                ) : file.type === "image" ? (
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center justify-center shrink-0">
                    <Image size={18} />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 border border-blue-800/60 flex items-center justify-center shrink-0">
                    <FileText size={18} />
                  </div>
                )}
                <div className="truncate">
                  <div className="text-xs font-bold text-white truncate" title={file.name}>
                    {file.name}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{file.category}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-1">
              <button
                type="button"
                onClick={() => setSelectedPreview(file)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1"
                title="Xem trước"
              >
                <Eye size={13} />
                <span>Xem</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleCopyLink(file)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs"
                  title="Sao chép liên kết"
                >
                  {copiedId === file.id ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteMedia(file.id)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-300 transition-colors text-xs"
                  title="Xóa tệp"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="truncate">
                <h3 className="text-sm font-black text-white truncate">{selectedPreview.name}</h3>
                <span className="text-[10px] text-slate-400">{selectedPreview.format} • {selectedPreview.size}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPreview(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="min-h-[220px] max-h-[420px] flex items-center justify-center bg-slate-950 rounded-2xl p-4 overflow-hidden">
              {selectedPreview.type === "video" ? (
                <video src={selectedPreview.url} controls className="max-h-[360px] w-auto rounded-lg" />
              ) : selectedPreview.type === "image" ? (
                <img src={selectedPreview.url} alt={selectedPreview.name} className="max-h-[360px] w-auto object-contain rounded-lg" />
              ) : (
                <div className="text-center p-6">
                  <FileText className="w-16 h-16 text-blue-400 mx-auto mb-3" />
                  <p className="text-sm font-bold text-white mb-2">{selectedPreview.name}</p>
                  <p className="text-xs text-slate-400 mb-4">Tệp tài liệu văn bản chuẩn Certiport MOS/IC3.</p>
                  <a
                    href={selectedPreview.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
                  >
                    <Download size={14} /> Tải Tệp Về Máy
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
