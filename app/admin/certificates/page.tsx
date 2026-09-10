"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Award,
  Search,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Download,
  Copy,
  Check,
  Plus,
  Edit3,
  Trash2,
  Printer,
  Eye,
  X,
  FileText,
  Calendar,
  User,
  Medal,
  Share2,
  RotateCcw,
  Upload,
  CheckCheck
} from "lucide-react";

export interface CertificateRecord {
  id: string;
  studentName: string;
  exam: string;
  examType: "mos-excel" | "mos-word" | "mos-ppt" | "ic3" | "other";
  certCode: string;
  score: number;
  issueDate: string;
  issuer: string;
  instructor: string;
  status: "Hợp lệ" | "Chờ xác thực" | "Đã thu hồi";
  imageUrl?: string;
  note?: string;
}

const INITIAL_CERTIFICATES: CertificateRecord[] = [
  {
    id: "cert-1",
    studentName: "Nguyễn Hoàng Nam",
    exam: "MOS Excel 2019 Associate",
    examType: "mos-excel",
    certCode: "CERT-MOS-2026-9842",
    score: 1000,
    issueDate: "20/08/2026",
    issuer: "Certiport Official / IIG Vietnam",
    instructor: "Thầy Nguyễn Đình Huy (MOS Master)",
    status: "Hợp lệ"
  },
  {
    id: "cert-2",
    studentName: "Trần Thị Thu Thảo",
    exam: "IC3 Digital Literacy GS6 Level 1-3",
    examType: "ic3",
    certCode: "CERT-IC3-2026-5512",
    score: 980,
    issueDate: "18/08/2026",
    issuer: "Certiport Official / IIG Vietnam",
    instructor: "Thầy Lê Văn Minh (IC3 Trainer)",
    status: "Hợp lệ"
  },
  {
    id: "cert-3",
    studentName: "Lê Minh Trí",
    exam: "MOS Word 2019 Associate",
    examType: "mos-word",
    certCode: "CERT-MOS-2026-3310",
    score: 1000,
    issueDate: "15/08/2026",
    issuer: "Certiport Official / IIG Vietnam",
    instructor: "Thầy Nguyễn Đình Huy (MOS Master)",
    status: "Hợp lệ"
  },
  {
    id: "cert-4",
    studentName: "Phạm Quỳnh Anh",
    exam: "MOS PowerPoint 2019 Specialist",
    examType: "mos-ppt",
    certCode: "CERT-MOS-2026-7721",
    score: 1000,
    issueDate: "10/08/2026",
    issuer: "Certiport Official / IIG Vietnam",
    instructor: "Cô Hoàng Mai (MOS Specialist)",
    status: "Hợp lệ"
  },
  {
    id: "cert-5",
    studentName: "Vũ Đức Huy",
    exam: "MOS Master Combo (Word, Excel, PPT)",
    examType: "mos-excel",
    certCode: "CERT-MOS-2026-1189",
    score: 990,
    issueDate: "05/08/2026",
    issuer: "Certiport Official / IIG Vietnam",
    instructor: "Thầy Nguyễn Đình Huy (MOS Master)",
    status: "Hợp lệ"
  },
  {
    id: "cert-6",
    studentName: "Đỗ Mai Linh",
    exam: "MOS Excel 2019 Expert",
    examType: "mos-excel",
    certCode: "CERT-MOS-2026-4402",
    score: 1000,
    issueDate: "01/08/2026",
    issuer: "Certiport Official / IIG Vietnam",
    instructor: "Thầy Nguyễn Đình Huy (MOS Master)",
    status: "Hợp lệ"
  }
];

const LOCAL_STORAGE_KEY = "tinhocgenz_admin_certificates_v1";

// Visual Certificate Template Component (Khung phôi Giấy Chứng Nhận)
function CertificateVisual({
  data,
  size = "md",
  className = ""
}: {
  data: Partial<CertificateRecord>;
  size?: "sm" | "md" | "lg" | "print";
  className?: string;
}) {
  const isPrint = size === "print";
  const isSm = size === "sm";

  return (
    <div
      className={`relative select-none overflow-hidden rounded-xl border-4 border-[#c5a059] bg-[#fcfbfa] text-slate-900 shadow-xl font-sans transition-all ${
        isPrint ? "w-full aspect-[1.414/1] p-10" : isSm ? "w-full aspect-[1.45/1] p-3 text-[10px]" : "w-full aspect-[1.45/1] p-6 sm:p-8 text-xs"
      } ${className}`}
      style={{
        backgroundImage: "radial-gradient(#e8dfcf 1px, transparent 1px)",
        backgroundSize: isSm ? "12px 12px" : "18px 18px"
      }}
    >
      {/* Decorative Gold Inner Border */}
      <div className="absolute inset-1.5 sm:inset-2.5 border-2 border-[#d8b878] pointer-events-none rounded-lg" />
      <div className="absolute inset-2.5 sm:inset-4 border border-[#e4cca0]/60 pointer-events-none rounded-md" />

      {/* 4 Corner Ornamental Accents */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#b88c3a] pointer-events-none" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#b88c3a] pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#b88c3a] pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#b88c3a] pointer-events-none" />

      {/* Top Gold Ribbon / Badge */}
      <div className="absolute top-0 right-7 bg-gradient-to-b from-[#d4af37] via-[#c5a059] to-[#99772c] text-white font-black px-3 py-1 shadow-md rounded-b-md text-[9px] sm:text-[11px] uppercase tracking-wider flex items-center gap-1">
        <Medal size={12} className="text-yellow-200" />
        <span>{data.score || 1000}/1000 ĐIỂM</span>
      </div>

      {/* Certificate Content Container */}
      <div className="h-full flex flex-col justify-between relative z-10 text-center">
        {/* Header Branding */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059]" />
            <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-[#8c6b2d]">
              TIN HỌC GEN Z • ĐÀO TẠO & KHẢO THÍ QUỐC TẾ
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059]" />
          </div>

          <h2 className="font-serif text-sm sm:text-2xl font-black text-[#1a2e40] tracking-tight uppercase mt-0.5">
            GIẤY CHỨNG NHẬN ĐẠT CHUẨN
          </h2>
          <p className="text-[8px] sm:text-[11px] text-[#6b7280] italic font-serif">
            Certificate of International Achievement
          </p>
        </div>

        {/* Body Awardee */}
        <div className="my-1 sm:my-2">
          <p className="text-[8px] sm:text-[11px] text-[#4b5563] uppercase tracking-wider font-semibold">
            Chứng nhận thành tích xuất sắc trao tặng cho
          </p>
          <div className="font-serif text-base sm:text-2xl lg:text-3xl font-black text-[#0f2438] tracking-tight mt-0.5 sm:mt-1 border-b-2 border-[#c5a059]/50 inline-block px-4 pb-0.5">
            {data.studentName || "Họ Và Tên Học Viên"}
          </div>
          <p className="text-[8px] sm:text-[11px] text-[#4b5563] mt-1 sm:mt-1.5 font-medium">
            Đã hoàn thành kỳ khảo thí năng lực tin học và đạt chuẩn quốc tế:
          </p>
          <div className="text-[10px] sm:text-base font-black text-[#0284c7] uppercase tracking-wide mt-0.5">
            {data.exam || "MOS Excel 2019 Associate"}
          </div>
        </div>

        {/* Footer with QR, Seal, Signatures */}
        <div className="flex items-end justify-between border-t border-[#e5d5b5] pt-2 px-2 sm:px-4 text-left">
          {/* Left: QR Code & Verification ID */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-11 sm:h-11 bg-white border border-[#c5a059] p-0.5 rounded shadow-sm flex items-center justify-center">
              <QrCode className="w-full h-full text-slate-800" />
            </div>
            <div>
              <div className="text-[7px] sm:text-[9px] uppercase font-bold text-[#6b7280]">Mã xác thực:</div>
              <div className="font-mono text-[8px] sm:text-[10px] font-bold text-[#8c6b2d]">
                {data.certCode || "CERT-MOS-2026-XXXX"}
              </div>
              <div className="text-[7px] sm:text-[9px] text-slate-500">Ngày: {data.issueDate || "20/08/2026"}</div>
            </div>
          </div>

          {/* Center: Red Stamp / Seal */}
          <div className="hidden sm:flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-2 border-red-600/80 bg-red-500/10 flex items-center justify-center text-red-600 p-1 rotate-[-12deg] shadow-sm">
              <div className="border border-dashed border-red-600 rounded-full w-full h-full flex flex-col items-center justify-center text-[7px] font-black leading-tight">
                <span>TIN HỌC GEN Z</span>
                <span className="text-[5px]">KHẢO THÍ</span>
              </div>
            </div>
          </div>

          {/* Right: Signature */}
          <div className="text-right">
            <div className="text-[7px] sm:text-[9px] uppercase font-bold text-[#6b7280]">Ban Đào Tạo & Khảo Thí</div>
            <div className="font-serif italic text-xs sm:text-sm text-[#0f2438] font-bold mt-1">
              Thầy Nguyễn Đình Huy
            </div>
            <div className="text-[7px] sm:text-[9px] text-[#8c6b2d] font-semibold">MOS Master Trainer</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState<CertificateRecord[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modals
  const [previewCert, setPreviewCert] = useState<CertificateRecord | null>(null);
  const [isIssuerOpen, setIsIssuerOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificateRecord | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State for Issuer / Editor (WYSIWYG)
  const [formData, setFormData] = useState<Partial<CertificateRecord>>({
    studentName: "Nguyễn Văn A",
    exam: "MOS Excel 2019 Associate",
    examType: "mos-excel",
    score: 1000,
    certCode: `CERT-MOS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    issueDate: new Date().toLocaleDateString("vi-VN"),
    issuer: "Certiport Official / IIG Vietnam",
    instructor: "Thầy Nguyễn Đình Huy (MOS Master)",
    status: "Hợp lệ",
    note: ""
  });

  // Load from localStorage or initial dataset
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCerts(parsed);
          return;
        }
      }
    } catch {}
    setCerts(INITIAL_CERTIFICATES);
  }, []);

  // Save to localStorage whenever certs change
  const saveCerts = (newCerts: CertificateRecord[]) => {
    setCerts(newCerts);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCerts));
    } catch {}
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Open Issuer Modal for creating new cert
  const handleOpenNewIssuer = () => {
    setEditingCert(null);
    setFormData({
      studentName: "",
      exam: "MOS Excel 2019 Associate",
      examType: "mos-excel",
      score: 1000,
      certCode: `CERT-MOS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      issueDate: new Date().toLocaleDateString("vi-VN"),
      issuer: "Certiport Official / IIG Vietnam",
      instructor: "Thầy Nguyễn Đình Huy (MOS Master)",
      status: "Hợp lệ",
      note: ""
    });
    setIsIssuerOpen(true);
  };

  // Open Issuer Modal for editing existing cert
  const handleOpenEdit = (cert: CertificateRecord) => {
    setEditingCert(cert);
    setFormData({ ...cert });
    setIsIssuerOpen(true);
  };

  // Save (Create or Update)
  const handleSaveCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName?.trim()) {
      alert("Vui lòng nhập họ tên học viên.");
      return;
    }

    if (editingCert) {
      // Update
      const updated = certs.map((c) =>
        c.id === editingCert.id ? ({ ...c, ...formData } as CertificateRecord) : c
      );
      saveCerts(updated);
    } else {
      // Create new
      const newCert: CertificateRecord = {
        id: `cert-${Date.now()}`,
        studentName: formData.studentName?.trim() || "Học Viên",
        exam: formData.exam || "MOS Excel 2019 Associate",
        examType: (formData.examType as any) || "mos-excel",
        score: Number(formData.score) || 1000,
        certCode: formData.certCode || `CERT-MOS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        issueDate: formData.issueDate || new Date().toLocaleDateString("vi-VN"),
        issuer: formData.issuer || "Certiport Official / IIG Vietnam",
        instructor: formData.instructor || "Thầy Nguyễn Đình Huy (MOS Master)",
        status: (formData.status as any) || "Hợp lệ",
        note: formData.note || ""
      };
      saveCerts([newCert, ...certs]);
    }

    setIsIssuerOpen(false);
  };

  // Delete
  const handleDelete = (id: string) => {
    const next = certs.filter((c) => c.id !== id);
    saveCerts(next);
    setDeleteConfirmId(null);
  };

  // Print Certificate Action
  const handlePrint = () => {
    window.print();
  };

  const filteredCerts = certs.filter((c) => {
    const matchSearch =
      c.studentName.toLowerCase().includes(search.toLowerCase()) ||
      c.certCode.toLowerCase().includes(search.toLowerCase()) ||
      c.exam.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;
    if (filterType === "ALL") return true;
    if (filterType === "PERFECT") return c.score === 1000;
    return c.examType === filterType;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-16">
      {/* 1. Header Banner & Quick Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold mb-2">
            <Award size={14} className="text-amber-400" />
            <span>KHẢO THÍ & VĂN BẰNG QUỐC TẾ CERTIPORT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
            Chứng Chỉ Số Certiport & Xác Thực Điểm 1000
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
            Hệ thống quản lý, cấp mới và xuất bản văn bằng quốc tế MOS/IC3 cho học viên Tin Học Gen Z đạt chuẩn đầu ra và điểm số tuyệt đối.
          </p>
        </div>

        {/* Big Friendly Action: Issue Certificate Button */}
        <div className="shrink-0 flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenNewIssuer}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus size={18} className="stroke-[3]" />
            <span>Cấp Giấy Chứng Nhận Mới</span>
          </button>
        </div>
      </div>

      {/* 2. Controls: Search Bar & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tra cứu theo họ tên học viên, mã chứng chỉ (CERT-MOS...)..."
            className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar">
          {[
            { label: "Tất cả", value: "ALL" },
            { label: "🌟 Điểm 1000", value: "PERFECT" },
            { label: "MOS Excel", value: "mos-excel" },
            { label: "MOS Word", value: "mos-word" },
            { label: "MOS PPT", value: "mos-ppt" },
            { label: "IC3 GS6", value: "ic3" },
          ].map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setFilterType(tab.value)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterType === tab.value
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-black"
                  : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Certificate Visual Grid Cards */}
      {filteredCerts.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800">
          <Award size={48} className="mx-auto text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-white">Không tìm thấy chứng nhận nào</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Không có kết quả khớp với từ khóa tìm kiếm. Bạn có thể xóa bộ lọc hoặc cấp mới chứng nhận.
          </p>
          <button
            type="button"
            onClick={handleOpenNewIssuer}
            className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors"
          >
            Cấp Chứng Nhận Ngay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 overflow-hidden shadow-xl flex flex-col justify-between transition-all group hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* TOP: Interactive Miniature Certificate Visual Preview */}
              <div
                onClick={() => setPreviewCert(cert)}
                className="p-3 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800 cursor-pointer relative group/preview"
                title="Bấm để phóng to xem đầy đủ giấy chứng nhận"
              >
                <div className="relative transform group-hover/preview:scale-[1.01] transition-transform">
                  <CertificateVisual data={cert} size="sm" />

                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2 text-white font-bold text-xs backdrop-blur-[1px]">
                    <Eye size={16} />
                    <span>Xem Phóng To Bằng</span>
                  </div>
                </div>
              </div>

              {/* MIDDLE: Info Card */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck size={13} /> {cert.issuer}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        cert.status === "Hợp lệ"
                          ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                          : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                      }`}
                    >
                      {cert.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white tracking-tight font-display">
                    {cert.studentName}
                  </h3>
                  <p className="text-xs text-blue-400 font-bold mt-0.5">{cert.exam}</p>

                  {/* Code Snippet Box */}
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-2">
                    <div className="truncate">
                      <div className="text-[9px] text-slate-500 font-bold uppercase">Mã Tra Cứu Số</div>
                      <div className="font-mono text-xs font-bold text-amber-300 truncate">
                        {cert.certCode}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(cert.certCode)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                      title="Sao chép mã chứng chỉ"
                    >
                      {copiedCode === cert.certCode ? (
                        <CheckCheck size={14} className="text-emerald-400" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                </div>

                {/* BOTTOM: Action Buttons Bar */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Ngày cấp: {cert.issueDate}</span>

                  <div className="flex items-center gap-1">
                    {/* View Certificate */}
                    <button
                      type="button"
                      onClick={() => setPreviewCert(cert)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Xem toàn màn hình"
                    >
                      <Eye size={14} />
                    </button>

                    {/* Edit Certificate */}
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(cert)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-amber-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Sửa thông tin chứng chỉ"
                    >
                      <Edit3 size={14} />
                    </button>

                    {/* Delete Certificate */}
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(cert.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Xóa chứng chỉ"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MODAL: FULL PREVIEW & PRINT CERTIFICATE                                 */}
      {/* ========================================================================= */}
      {previewCert && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                  <Award size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Bản Xem Trước Giấy Chứng Nhận</h3>
                  <p className="text-xs text-slate-400">Chứng chỉ quốc tế chuẩn Certiport / Tin Học Gen Z</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer size={14} />
                  <span>In Giấy Chứng Nhận</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewCert(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Certificate Canvas Frame */}
            <div id="printable-certificate" className="my-2 shadow-2xl rounded-2xl overflow-hidden">
              <CertificateVisual data={previewCert} size="md" />
            </div>

            {/* Modal Footer Controls */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-slate-400">
                Mã văn bằng: <strong className="text-amber-300 font-mono">{previewCert.certCode}</strong> • Điểm: <strong className="text-emerald-400">{previewCert.score}/1000</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const certToEdit = previewCert;
                    setPreviewCert(null);
                    handleOpenEdit(certToEdit);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 size={14} />
                  <span>Chỉnh sửa thông tin</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewCert(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL: LIVE WYSIWYG CERTIFICATE ISSUER / EDITOR                         */}
      {/* (Người dùng tự nhìn vào đó định hình lại chỗ cấp giấy chứng nhận)         */}
      {/* ========================================================================= */}
      {isIssuerOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-500 flex items-center justify-center text-slate-950 font-black shadow-md">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white font-display">
                    {editingCert ? "Chỉnh Sửa Giấy Chứng Nhận" : "Bộ Cấp Giấy Chứng Nhận Trực Quan (Live Preview)"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Vừa nhập liệu vừa xem trước phôi bằng thực tế được định hình theo thời gian thực
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsIssuerOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Two-Column Body: Left Form vs Right Live Certificate Preview */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* LEFT COLUMN: Input Form (5 Cols) */}
              <form id="cert-form" onSubmit={handleSaveCertificate} className="lg:col-span-5 space-y-4">
                <div className="text-[11px] font-black uppercase text-blue-400 tracking-wider">
                  1. Thông tin học viên & Môn thi
                </div>

                {/* Student Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Họ và tên học viên *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentName || ""}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="VD: Nguyễn Hoàng Nam..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Exam Course */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Môn thi / Khóa học
                    </label>
                    <select
                      value={formData.exam || "MOS Excel 2019 Associate"}
                      onChange={(e) => {
                        const val = e.target.value;
                        let type: any = "mos-excel";
                        if (val.includes("Word")) type = "mos-word";
                        else if (val.includes("PowerPoint") || val.includes("PPT")) type = "mos-ppt";
                        else if (val.includes("IC3")) type = "ic3";
                        setFormData({ ...formData, exam: val, examType: type });
                      }}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="MOS Excel 2019 Associate">MOS Excel 2019 Associate</option>
                      <option value="MOS Word 2019 Associate">MOS Word 2019 Associate</option>
                      <option value="MOS PowerPoint 2019 Specialist">MOS PowerPoint 2019 Specialist</option>
                      <option value="MOS Excel 2019 Expert">MOS Excel 2019 Expert</option>
                      <option value="MOS Master Combo (Word, Excel, PPT)">MOS Master Combo</option>
                      <option value="IC3 Digital Literacy GS6 Level 1-3">IC3 Digital Literacy GS6</option>
                      <option value="Tin Học Văn Phòng Thực Chiến">Tin Học Văn Phòng Thực Chiến</option>
                    </select>
                  </div>

                  {/* Score */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Điểm thi (Thang 1000)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={1000}
                      required
                      value={formData.score ?? 1000}
                      onChange={(e) => setFormData({ ...formData, score: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="text-[11px] font-black uppercase text-amber-400 tracking-wider pt-2">
                  2. Định danh & Cấp chứng nhận
                </div>

                {/* Certificate Code & Auto Generate */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Mã chứng chỉ (Cert Code)
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          certCode: `CERT-MOS-2026-${Math.floor(1000 + Math.random() * 9000)}`
                        })
                      }
                      className="text-[10px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles size={11} /> Tạo mã ngẫu nhiên
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.certCode || ""}
                    onChange={(e) => setFormData({ ...formData, certCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-amber-300 font-mono text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Issue Date & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Ngày cấp chứng nhận
                    </label>
                    <input
                      type="text"
                      value={formData.issueDate || ""}
                      onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      placeholder="DD/MM/YYYY"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Trạng thái xác thực
                    </label>
                    <select
                      value={formData.status || "Hợp lệ"}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Hợp lệ">Hợp lệ (Đã cấp)</option>
                      <option value="Chờ xác thực">Chờ xác thực</option>
                      <option value="Đã thu hồi">Đã thu hồi</option>
                    </select>
                  </div>
                </div>

                {/* Signer */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Cán bộ / Giảng viên ký duyệt
                  </label>
                  <input
                    type="text"
                    value={formData.instructor || ""}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </form>

              {/* RIGHT COLUMN: Real-Time Live Certificate Preview (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Eye size={13} className="text-emerald-400" />
                    <span>Định hình giấy chứng nhận thực tế (Cập nhật tức thời):</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                    Live Preview
                  </span>
                </div>

                {/* Live Preview Screen */}
                <div className="p-3 sm:p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner flex items-center justify-center flex-1">
                  <CertificateVisual data={formData} size="md" />
                </div>
                <p className="text-[11px] text-slate-500 text-center mt-2">
                  💡 Bạn có thể nhìn trực tiếp vào phôi chứng nhận trên để căn chỉnh họ tên, điểm số và thông tin trước khi hoàn tất cấp bằng.
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsIssuerOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                form="cert-form"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black tracking-wide shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Check size={16} />
                <span>{editingCert ? "Lưu Thay Đổi Chứng Chỉ" : "Xác Nhận Cấp Chứng Nhận"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODAL: DELETE CONFIRMATION DIALOG                                      */}
      {/* ========================================================================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-400 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} />
            </div>

            <h3 className="text-lg font-black text-white">Xác Nhận Xóa Chứng Chỉ?</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Bạn có chắc chắn muốn xóa bản ghi chứng nhận này khỏi hệ thống không? Dữ liệu chứng chỉ sẽ được gỡ bỏ ngay lập tức.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>

              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-rose-600/25"
              >
                Xác Nhận Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
