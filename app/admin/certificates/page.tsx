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
  CheckCheck,
  Image as ImageIcon,
  Camera,
  Link2,
  FileCheck,
  ZoomIn,
  Layers,
  LayoutGrid,
  Table as TableIcon,
  Filter,
  BadgeCheck,
  FileSpreadsheet
} from "lucide-react";

export interface CertificateRecord {
  id: string;
  studentName: string;
  exam: string;
  examType: "mos-excel" | "mos-word" | "mos-ppt" | "ic3" | "cntt" | "python" | "other";
  certCode: string;
  score: number;
  issueDate: string;
  issuer: string;
  instructor: string;
  instructorTitle?: string;
  director?: string;
  directorTitle?: string;
  showSeal?: boolean;
  status: "Hợp lệ" | "Chờ xác thực" | "Đã thu hồi";
  templateType: "tinhocgenz-official" | "certiport-gold" | "custom-image";
  imageUrl?: string;
  displayMode?: "custom-image" | "overlay-template" | "default";
  note?: string;
}

const INITIAL_CERTIFICATES: CertificateRecord[] = [
  {
    id: "cert-1",
    studentName: "Nguyễn Hoàng Nam",
    exam: "MOS Excel 2019 Associate",
    examType: "mos-excel",
    certCode: "CERT-THGZ-2026-9842",
    score: 1000,
    issueDate: "20/08/2026",
    issuer: "CÔNG TY TNHH PH – TIN HỌC GEN Z",
    instructor: "Thầy Nguyễn Đình Huy",
    instructorTitle: "MOS Master Trainer",
    director: "Nguyễn Đình Huy",
    directorTitle: "Giám Đốc Đào Tạo",
    showSeal: true,
    status: "Hợp lệ",
    templateType: "tinhocgenz-official",
    displayMode: "default"
  },
  {
    id: "cert-2",
    studentName: "Trần Thị Thu Thảo",
    exam: "IC3 Digital Literacy GS6 Level 1-3",
    examType: "ic3",
    certCode: "CERT-THGZ-2026-5512",
    score: 980,
    issueDate: "18/08/2026",
    issuer: "CÔNG TY TNHH PH – TIN HỌC GEN Z",
    instructor: "Thầy Lê Văn Minh",
    instructorTitle: "IC3 Authorized Trainer",
    director: "Nguyễn Đình Huy",
    directorTitle: "Giám Đốc Đào Tạo",
    showSeal: true,
    status: "Hợp lệ",
    templateType: "tinhocgenz-official",
    displayMode: "default"
  },
  {
    id: "cert-3",
    studentName: "Lê Minh Trí",
    exam: "MOS Word 2019 Associate",
    examType: "mos-word",
    certCode: "CERT-THGZ-2026-3310",
    score: 1000,
    issueDate: "15/08/2026",
    issuer: "CÔNG TY TNHH PH – TIN HỌC GEN Z",
    instructor: "Thầy Nguyễn Đình Huy",
    instructorTitle: "MOS Master Trainer",
    director: "Nguyễn Đình Huy",
    directorTitle: "Giám Đốc Đào Tạo",
    showSeal: true,
    status: "Hợp lệ",
    templateType: "tinhocgenz-official",
    displayMode: "default"
  },
  {
    id: "cert-4",
    studentName: "Phạm Quỳnh Anh",
    exam: "MOS PowerPoint 2019 Specialist",
    examType: "mos-ppt",
    certCode: "CERT-THGZ-2026-7721",
    score: 1000,
    issueDate: "10/08/2026",
    issuer: "CÔNG TY TNHH PH – TIN HỌC GEN Z",
    instructor: "Cô Hoàng Mai",
    instructorTitle: "MOS Specialist",
    director: "Nguyễn Đình Huy",
    directorTitle: "Giám Đốc Đào Tạo",
    showSeal: true,
    status: "Hợp lệ",
    templateType: "tinhocgenz-official",
    displayMode: "default"
  },
  {
    id: "cert-5",
    studentName: "Vũ Đức Huy",
    exam: "MOS Master Combo (Word, Excel, PPT)",
    examType: "mos-excel",
    certCode: "CERT-THGZ-2026-1189",
    score: 990,
    issueDate: "05/08/2026",
    issuer: "CÔNG TY TNHH PH – TIN HỌC GEN Z",
    instructor: "Thầy Nguyễn Đình Huy",
    instructorTitle: "MOS Master Trainer",
    director: "Nguyễn Đình Huy",
    directorTitle: "Giám Đốc Đào Tạo",
    showSeal: true,
    status: "Hợp lệ",
    templateType: "tinhocgenz-official",
    displayMode: "default"
  },
  {
    id: "cert-6",
    studentName: "Đỗ Mai Linh",
    exam: "MOS Excel 2019 Expert",
    examType: "mos-excel",
    certCode: "CERT-THGZ-2026-4402",
    score: 1000,
    issueDate: "01/08/2026",
    issuer: "CÔNG TY TNHH PH – TIN HỌC GEN Z",
    instructor: "Thầy Nguyễn Đình Huy",
    instructorTitle: "MOS Master Trainer",
    director: "Nguyễn Đình Huy",
    directorTitle: "Giám Đốc Đào Tạo",
    showSeal: true,
    status: "Hợp lệ",
    templateType: "tinhocgenz-official",
    displayMode: "default"
  }
];

const LOCAL_STORAGE_KEY = "tinhocgenz_admin_certificates_v3";

/**
 * Con Dấu Tròn Đỏ Pháp Nhân (SVG Red Seal of Cong Ty TNHH PH - Tin Hoc Gen Z)
 */
function OfficialRedSeal({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const dim = size === "sm" ? "w-8 h-8 sm:w-10 sm:h-10" : size === "lg" ? "w-20 h-20 sm:w-24 sm:h-24" : "w-12 h-12 sm:w-16 sm:h-16";
  return (
    <div className={`relative select-none pointer-events-none ${dim} ${className} rotate-[-8deg]`}>
      <svg viewBox="0 0 200 200" className="w-full h-full text-red-600 drop-shadow-sm opacity-90">
        <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="6 2" />
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="2" />
        
        <path id="seal-text-path-top" d="M 20 100 A 80 80 0 0 1 180 100" fill="none" />
        <text className="text-[12.5px] font-black uppercase tracking-[0.14em]" fill="currentColor">
          <textPath href="#seal-text-path-top" startOffset="50%" textAnchor="middle">
            ★ CÔNG TY TNHH PH ★
          </textPath>
        </text>

        <path id="seal-text-path-bottom" d="M 180 100 A 80 80 0 0 1 20 100" fill="none" />
        <text className="text-[12px] font-black uppercase tracking-[0.18em]" fill="currentColor">
          <textPath href="#seal-text-path-bottom" startOffset="50%" textAnchor="middle">
            TIN HỌC GEN Z
          </textPath>
        </text>

        <polygon
          points="100,68 104,80 117,80 107,88 110,100 100,92 90,100 93,88 83,80 96,80"
          fill="currentColor"
        />
        <text
          x="100"
          y="122"
          textAnchor="middle"
          fill="currentColor"
          className="text-[13px] font-black uppercase tracking-wider"
        >
          GIÁM ĐỐC
        </text>
        <text
          x="100"
          y="138"
          textAnchor="middle"
          fill="currentColor"
          className="text-[9px] font-bold uppercase tracking-widest"
        >
          ĐÃ KÝ & DUYỆT
        </text>
      </svg>
    </div>
  );
}

/**
 * Visual Certificate Component
 */
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

  // CASE 1: Custom Uploaded Image Mode
  if (data.templateType === "custom-image" && data.imageUrl && data.displayMode !== "overlay-template") {
    return (
      <div
        className={`relative select-none overflow-hidden rounded-xl border-4 border-[#0b2545] bg-slate-950 text-white shadow-xl font-sans flex items-center justify-center transition-all ${
          isPrint
            ? "w-full aspect-[1.414/1] p-4 bg-white"
            : isSm
            ? "w-full aspect-[1.414/1] p-1.5"
            : "w-full aspect-[1.414/1] p-3 sm:p-4"
        } ${className}`}
      >
        <img
          src={data.imageUrl}
          alt={`Giấy chứng nhận của ${data.studentName || "học viên"}`}
          className="w-full h-full object-contain rounded-lg shadow-md"
        />

        <div className="absolute top-2.5 right-2.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black px-2.5 py-0.5 shadow-lg rounded-full text-[9px] sm:text-[11px] uppercase tracking-wider flex items-center gap-1">
          <Medal size={11} className="text-slate-950" />
          <span>{data.score || 1000}/1000 ĐIỂM</span>
        </div>

        <div className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-md border border-white/20 text-white font-mono font-bold px-2 py-0.5 rounded text-[8px] sm:text-[10px]">
          {data.certCode || "CERT-THGZ-2026"}
        </div>
      </div>
    );
  }

  // CASE 2: Official TIN HỌC GEN Z Certificate Template (Mẫu phôi độc quyền mới)
  const isOfficialTemplate = data.templateType === "tinhocgenz-official" || !data.templateType;

  if (isOfficialTemplate) {
    return (
      <div
        className={`relative select-none overflow-hidden rounded-xl border border-slate-300 bg-white text-slate-900 shadow-2xl font-sans transition-all w-full aspect-[1024/724] ${className}`}
        style={{
          backgroundImage: "url('/images/certificates/tinhocgenz-clean-template.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* LAYER 1: Họ và tên học viên {{TEN_HOC_VIEN}} */}
        {/* Căn chuẩn Y: 46.5% đến 54.0%, nằm ngay phía trên đường kẻ cam vát kim cương */}
        <div className="absolute top-[46.2%] inset-x-0 flex items-center justify-center pointer-events-none px-8 z-10">
          <h2
            style={{ fontFamily: '"Times New Roman", Times, "Playfair Display", Georgia, serif' }}
            className={`font-black text-[#0c2340] tracking-tight uppercase text-center transition-all ${
              isPrint
                ? "text-3xl sm:text-4xl"
                : isSm
                ? "text-[11px] sm:text-xs leading-none"
                : "text-base sm:text-2xl lg:text-[27px] leading-tight"
            }`}
          >
            {data.studentName || "NGUYỄN HOÀNG NAM"}
          </h2>
        </div>

        {/* LAYER 2: Tên khóa học {{TEN_KHOA_HOC}} */}
        {/* Căn chuẩn Y: 61.2% đến 67.0%, dưới dòng 'đã hoàn thành chương trình đào tạo' */}
        <div className="absolute top-[61.2%] inset-x-0 flex items-center justify-center pointer-events-none px-8 z-10">
          <div
            className={`font-sans font-black text-[#0066cc] uppercase tracking-wide text-center transition-all ${
              isPrint
                ? "text-xl sm:text-2xl"
                : isSm
                ? "text-[8.5px] sm:text-[9.5px] leading-none"
                : "text-xs sm:text-base lg:text-lg leading-tight"
            }`}
          >
            {data.exam || "MOS EXCEL 2019 ASSOCIATE"}
          </div>
        </div>

        {/* LAYER 3: Thời gian hoàn thành & Mã chứng nhận */}
        {/* Căn chuẩn Y: 70.8%, nằm giữa Khóa học và 3 ngôi sao xanh */}
        <div className="absolute top-[70.8%] inset-x-0 flex items-center justify-center pointer-events-none px-6 z-10">
          <div
            className={`text-slate-600 font-sans font-medium flex items-center justify-center gap-2 sm:gap-4 transition-all ${
              isPrint
                ? "text-sm"
                : isSm
                ? "text-[6px] sm:text-[7.5px]"
                : "text-[8px] sm:text-[11px]"
            }`}
          >
            <span>
              Thời gian hoàn thành:{" "}
              <strong className="text-slate-900 font-bold">{data.issueDate || "20/08/2026"}</strong>
            </span>
            <span className="text-slate-300 font-light">|</span>
            <span>
              Mã chứng nhận:{" "}
              <strong className="text-slate-900 font-mono font-bold tracking-tight">
                {data.certCode || "CERT-THGZ-2026-9842"}
              </strong>
            </span>
          </div>
        </div>

        {/* LAYER 4: Chữ ký số hóa Giảng viên (Chỉ hiển thị PHÍA TRÊN đường kẻ Y=618, KHÔNG đè lên chữ 'GIẢNG VIÊN') */}
        {data.instructor && (
          <div className="absolute top-[79.0%] left-[12%] w-[24%] flex items-center justify-center pointer-events-none z-10">
            <span
              style={{ fontFamily: '"Brush Script MT", "Dancing Script", "Segoe Script", cursive, serif' }}
              className="italic text-[#0c2340] font-bold text-[10px] sm:text-sm tracking-tight"
            >
              {data.instructor}
            </span>
          </div>
        )}

        {/* LAYER 5: Chữ ký Đại diện đơn vị & Con Dấu Đỏ Pháp Nhân */}
        {/* Con dấu đỏ được đóng đúng quy chuẩn: trùm lên chữ ký và đường kẻ, TUYỆT ĐỐI KHÔNG chạm vào dòng Mã chứng chỉ ở trên */}
        <div className="absolute top-[75.5%] left-[51%] w-[26%] flex items-center justify-center pointer-events-none z-10">
          {data.showSeal !== false && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <OfficialRedSeal size={isSm ? "sm" : isPrint ? "lg" : "md"} />
            </div>
          )}

          {data.director && (
            <span
              style={{ fontFamily: '"Brush Script MT", "Dancing Script", "Segoe Script", cursive, serif' }}
              className="italic text-[#0c2340] font-bold text-[10px] sm:text-sm tracking-tight z-10"
            >
              {data.director}
            </span>
          )}
        </div>
      </div>
    );
  }

  // CASE 3: Built-in Classic Certiport Gold Template
  const bgStyle =
    data.imageUrl && data.displayMode === "overlay-template"
      ? {
          backgroundImage: `url(${data.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : {
          backgroundImage: "radial-gradient(#e8dfcf 1px, transparent 1px)",
          backgroundSize: isSm ? "12px 12px" : "18px 18px",
        };

  return (
    <div
      className={`relative select-none overflow-hidden rounded-xl border-4 border-[#c5a059] bg-[#fcfbfa] text-slate-900 shadow-xl font-sans transition-all aspect-[1.414/1] ${
        isPrint ? "w-full p-10" : isSm ? "w-full p-3 text-[10px]" : "w-full p-6 sm:p-8 text-xs"
      } ${className}`}
      style={bgStyle}
    >
      <div className="absolute inset-1.5 sm:inset-2.5 border-2 border-[#d8b878] pointer-events-none rounded-lg" />
      <div className="absolute inset-2.5 sm:inset-4 border border-[#e4cca0]/60 pointer-events-none rounded-md" />

      <div className="absolute top-0 right-7 bg-gradient-to-b from-[#d4af37] via-[#c5a059] to-[#99772c] text-white font-black px-3 py-1 shadow-md rounded-b-md text-[9px] sm:text-[11px] uppercase tracking-wider flex items-center gap-1">
        <Medal size={12} className="text-yellow-200" />
        <span>{data.score || 1000}/1000 ĐIỂM</span>
      </div>

      <div className="h-full flex flex-col justify-between relative z-10 text-center">
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

        <div className="flex items-end justify-between border-t border-[#e5d5b5] pt-2 px-2 sm:px-4 text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-11 sm:h-11 bg-white border border-[#c5a059] p-0.5 rounded shadow-sm flex items-center justify-center">
              <QrCode className="w-full h-full text-slate-800" />
            </div>
            <div>
              <div className="text-[7px] sm:text-[9px] uppercase font-bold text-[#6b7280]">Mã xác thực:</div>
              <div className="font-mono text-[8px] sm:text-[10px] font-bold text-[#8c6b2d]">
                {data.certCode || "CERT-THGZ-2026-XXXX"}
              </div>
              <div className="text-[7px] sm:text-[9px] text-slate-500">Ngày: {data.issueDate || "20/08/2026"}</div>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-center">
            <OfficialRedSeal size="sm" />
          </div>

          <div className="text-right">
            <div className="text-[7px] sm:text-[9px] uppercase font-bold text-[#6b7280]">Ban Đào Tạo & Khảo Thí</div>
            <div className="font-serif italic text-xs sm:text-sm text-[#0f2438] font-bold mt-1">
              {data.instructor || "Thầy Nguyễn Đình Huy"}
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
  const [filterTemplate, setFilterTemplate] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"gallery" | "table">("gallery");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modals
  const [previewCert, setPreviewCert] = useState<CertificateRecord | null>(null);
  const [isIssuerOpen, setIsIssuerOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificateRecord | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // File Upload Ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [customUrl, setCustomUrl] = useState("");

  // Form State for Issuer / Editor (WYSIWYG)
  const [formData, setFormData] = useState<Partial<CertificateRecord>>({
    studentName: "",
    exam: "MOS Excel 2019 Associate",
    examType: "mos-excel",
    score: 1000,
    certCode: `CERT-THGZ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    issueDate: new Date().toLocaleDateString("vi-VN"),
    issuer: "CÔNG TY TNHH PH – TIN HỌC GEN Z",
    instructor: "Thầy Nguyễn Đình Huy",
    instructorTitle: "MOS Master Trainer",
    director: "Nguyễn Đình Huy",
    directorTitle: "Giám Đốc Đào Tạo",
    showSeal: true,
    status: "Hợp lệ",
    templateType: "tinhocgenz-official",
    imageUrl: "",
    displayMode: "default",
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
    setShowUrlInput(false);
    setCustomUrl("");
    setFormData({
      studentName: "",
      exam: "MOS Excel 2019 Associate",
      examType: "mos-excel",
      score: 1000,
      certCode: `CERT-THGZ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      issueDate: new Date().toLocaleDateString("vi-VN"),
      issuer: "CÔNG TY TNHH PH – TIN HỌC GEN Z",
      instructor: "Thầy Nguyễn Đình Huy",
      instructorTitle: "MOS Master Trainer",
      director: "Nguyễn Đình Huy",
      directorTitle: "Giám Đốc Đào Tạo",
      showSeal: true,
      status: "Hợp lệ",
      templateType: "tinhocgenz-official",
      imageUrl: "",
      displayMode: "default",
      note: ""
    });
    setIsIssuerOpen(true);
  };

  // Open Issuer Modal for editing existing cert
  const handleOpenEdit = (cert: CertificateRecord) => {
    setEditingCert(cert);
    setShowUrlInput(false);
    setCustomUrl(cert.imageUrl || "");
    setFormData({
      ...cert,
      templateType: cert.templateType || (cert.imageUrl ? "custom-image" : "tinhocgenz-official"),
      displayMode: cert.displayMode || (cert.imageUrl ? "custom-image" : "default"),
      showSeal: cert.showSeal !== false
    });
    setIsIssuerOpen(true);
  };

  // Handle File Upload from Device
  const handleFileChange = (file: File) => {
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert("Vui lòng chọn tệp ảnh có dung lượng dưới 8MB để hệ thống lưu trữ tối ưu.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setFormData((prev) => ({
        ...prev,
        imageUrl: dataUrl,
        templateType: "custom-image",
        displayMode: prev.displayMode || "custom-image"
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Save (Create or Update)
  const handleSaveCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName?.trim()) {
      alert("Vui lòng nhập họ tên học viên.");
      return;
    }

    if (editingCert) {
      const updated = certs.map((c) =>
        c.id === editingCert.id ? ({ ...c, ...formData } as CertificateRecord) : c
      );
      saveCerts(updated);
    } else {
      const newCert: CertificateRecord = {
        id: `cert-${Date.now()}`,
        studentName: formData.studentName?.trim() || "Học Viên",
        exam: formData.exam || "MOS Excel 2019 Associate",
        examType: (formData.examType as any) || "mos-excel",
        score: Number(formData.score) || 1000,
        certCode: formData.certCode || `CERT-THGZ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        issueDate: formData.issueDate || new Date().toLocaleDateString("vi-VN"),
        issuer: formData.issuer || "CÔNG TY TNHH PH – TIN HỌC GEN Z",
        instructor: formData.instructor || "Thầy Nguyễn Đình Huy",
        instructorTitle: formData.instructorTitle || "MOS Master Trainer",
        director: formData.director || "Nguyễn Đình Huy",
        directorTitle: formData.directorTitle || "Giám Đốc Đào Tạo",
        showSeal: formData.showSeal !== false,
        status: (formData.status as any) || "Hợp lệ",
        templateType: formData.templateType || "tinhocgenz-official",
        imageUrl: formData.imageUrl || undefined,
        displayMode: formData.imageUrl ? (formData.displayMode || "custom-image") : "default",
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

  // Print Action
  const handlePrint = () => {
    window.print();
  };

  // Download Action
  const handleDownloadImage = (cert: CertificateRecord) => {
    if (cert.imageUrl) {
      const link = document.createElement("a");
      link.href = cert.imageUrl;
      link.download = `Chung_Chi_${cert.studentName.replace(/\s+/g, "_")}_${cert.certCode}.png`;
      link.click();
    } else {
      window.print();
    }
  };

  // Export CSV Action
  const handleExportCSV = () => {
    const headers = ["Mã Chứng Chỉ", "Học Viên", "Khóa Học", "Điểm Số", "Ngày Cấp", "Giảng Viên", "Trạng Thái"];
    const rows = certs.map((c) => [
      c.certCode,
      `"${c.studentName}"`,
      `"${c.exam}"`,
      c.score,
      c.issueDate,
      `"${c.instructor}"`,
      c.status
    ]);
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Danh_Sach_Chung_Chi_TinHocGenZ_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  // Filtering
  const filteredCerts = certs.filter((c) => {
    const matchSearch =
      c.studentName.toLowerCase().includes(search.toLowerCase()) ||
      c.certCode.toLowerCase().includes(search.toLowerCase()) ||
      c.exam.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;

    if (filterType === "PERFECT" && c.score !== 1000) return false;
    if (filterType === "HAS_IMAGE" && !c.imageUrl) return false;
    if (filterType !== "ALL" && filterType !== "PERFECT" && filterType !== "HAS_IMAGE" && c.examType !== filterType) {
      return false;
    }

    if (filterTemplate === "OFFICIAL" && c.templateType !== "tinhocgenz-official") return false;
    if (filterTemplate === "GOLD" && c.templateType !== "certiport-gold") return false;
    if (filterTemplate === "CUSTOM" && c.templateType !== "custom-image") return false;

    return true;
  });

  // KPI Calculations
  const totalCerts = certs.length;
  const perfectScoreCount = certs.filter((c) => c.score === 1000).length;
  const perfectRate = totalCerts > 0 ? Math.round((perfectScoreCount / totalCerts) * 100) : 0;
  const officialTemplateCount = certs.filter((c) => c.templateType === "tinhocgenz-official" || !c.templateType).length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-16">
      {/* 1. Header Banner & Big Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold mb-2.5">
            <Award size={14} className="text-blue-400" />
            <span>CÔNG TY TNHH PH – TIN HỌC GEN Z</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
            Hệ Thống Cấp & Quản Lý Giấy Chứng Nhận
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
            Phân hệ cấp phát chứng chỉ số độc quyền Tin Học Gen Z, hỗ trợ phôi chuẩn mới của công ty, xem trước định hình trực quan, in ấn khổ A4 ngang và tra cứu bảo mật.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-4 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <FileSpreadsheet size={16} className="text-emerald-400" />
            <span>Xuất Danh Sách Excel</span>
          </button>

          <button
            type="button"
            onClick={handleOpenNewIssuer}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus size={18} className="stroke-[3]" />
            <span>➕ Cấp Giấy Chứng Nhận Mới</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng Đã Cấp</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <Award size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-2 font-display">{totalCerts}</div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 size={12} /> 100% Hồ sơ hợp lệ
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Điểm 1000/1000</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Medal size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 mt-2 font-display">{perfectScoreCount}</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            Chiếm <strong className="text-amber-400">{perfectRate}%</strong> tổng học viên
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phôi Tin Học Gen Z</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
              <BadgeCheck size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-300 mt-2 font-display">{officialTemplateCount}</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">Phôi chuẩn nhận diện mới</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Xác Thực Mã QR</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <QrCode size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2 font-display">Tức Thời</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">Quét mã di động 24/7</div>
        </div>
      </div>

      {/* 3. Controls: Search, Filter Tabs & View Mode Switcher */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tra cứu theo họ tên học viên, mã chứng chỉ (CERT-THGZ...), môn thi..."
              className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
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

          <div className="flex items-center bg-slate-900 p-1 rounded-2xl border border-slate-800 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("gallery")}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "gallery"
                  ? "bg-blue-600 text-white shadow-md font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid size={14} />
              <span>Lưới Bằng</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-blue-600 text-white shadow-md font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <TableIcon size={14} />
              <span>Bảng Dữ Liệu</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar">
            {[
              { label: "Tất cả môn", value: "ALL" },
              { label: "🌟 Điểm 1000", value: "PERFECT" },
              { label: "MOS Excel", value: "mos-excel" },
              { label: "MOS Word", value: "mos-word" },
              { label: "MOS PPT", value: "mos-ppt" },
              { label: "IC3 GS6", value: "ic3" },
              { label: "📷 Có ảnh riêng", value: "HAS_IMAGE" },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setFilterType(tab.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filterType === tab.value
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-black"
                    : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="text-[11px] font-semibold hidden md:inline">Mẫu phôi:</span>
            <select
              value={filterTemplate}
              onChange={(e) => setFilterTemplate(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            >
              <option value="ALL">Tất cả mẫu phôi</option>
              <option value="OFFICIAL">Phôi Tin Học Gen Z (Mới)</option>
              <option value="GOLD">Phôi Certiport Vàng Kim</option>
              <option value="CUSTOM">Ảnh Tải Lên Riêng</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Display Modes */}
      {filteredCerts.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800">
          <Award size={48} className="mx-auto text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-white">Không tìm thấy chứng nhận nào</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Không có kết quả khớp với điều kiện tìm kiếm. Bạn có thể xóa bộ lọc hoặc cấp mới chứng nhận.
          </p>
          <button
            type="button"
            onClick={handleOpenNewIssuer}
            className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors"
          >
            Cấp Chứng Nhận Ngay
          </button>
        </div>
      ) : viewMode === "gallery" ? (
        /* GALLERY VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 overflow-hidden shadow-xl flex flex-col justify-between transition-all group hover:-translate-y-1 hover:shadow-2xl"
            >
              <div
                onClick={() => setPreviewCert(cert)}
                className="p-3 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800 cursor-pointer relative group/preview"
                title="Bấm để phóng to xem đầy đủ giấy chứng nhận"
              >
                <div className="relative transform group-hover/preview:scale-[1.01] transition-transform">
                  <CertificateVisual data={cert} size="sm" />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2 text-white font-bold text-xs backdrop-blur-[1px]">
                    <ZoomIn size={16} />
                    <span>Xem Phóng To Bằng</span>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-blue-400 flex items-center gap-1 truncate">
                      <ShieldCheck size={13} className="shrink-0" />
                      <span className="truncate">{cert.issuer}</span>
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {cert.templateType === "tinhocgenz-official" && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Phôi THGZ
                        </span>
                      )}
                      {cert.imageUrl && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <ImageIcon size={10} /> Ảnh riêng
                        </span>
                      )}
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
                  </div>

                  <h3 className="text-lg font-black text-white tracking-tight font-display">
                    {cert.studentName}
                  </h3>
                  <p className="text-xs text-blue-400 font-bold mt-0.5">{cert.exam}</p>

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

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Ngày: {cert.issueDate}</span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setPreviewCert(cert)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Xem phóng to bằng"
                    >
                      <Eye size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(cert)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-amber-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Sửa thông tin hoặc đổi phôi bằng"
                    >
                      <Edit3 size={14} />
                    </button>

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
      ) : (
        /* TABLE VIEW */
        <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-[11px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3.5">Học Viên</th>
                  <th className="px-4 py-3.5">Khóa Học / Môn Thi</th>
                  <th className="px-4 py-3.5 text-center">Điểm Thi</th>
                  <th className="px-4 py-3.5">Mã Chứng Chỉ</th>
                  <th className="px-4 py-3.5">Mẫu Phôi</th>
                  <th className="px-4 py-3.5">Ngày Cấp</th>
                  <th className="px-4 py-3.5">Trạng Thái</th>
                  <th className="px-4 py-3.5 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredCerts.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-white text-sm">{cert.studentName}</div>
                      <div className="text-[10px] text-slate-500">{cert.instructor}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-blue-400 font-semibold">{cert.exam}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold font-mono text-xs ${
                          cert.score === 1000
                            ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                            : "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                        }`}
                      >
                        {cert.score === 1000 && <Medal size={11} className="text-amber-400" />}
                        {cert.score}/1000
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-mono text-xs text-amber-300 flex items-center gap-1.5">
                        <span>{cert.certCode}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(cert.certCode)}
                          className="text-slate-500 hover:text-white p-0.5"
                          title="Sao chép"
                        >
                          {copiedCode === cert.certCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                        {cert.templateType === "tinhocgenz-official"
                          ? "Phôi THGZ"
                          : cert.imageUrl
                          ? "Ảnh riêng"
                          : "Certiport Gold"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-[11px]">{cert.issueDate}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          cert.status === "Hợp lệ"
                            ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                        }`}
                      >
                        {cert.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setPreviewCert(cert)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                          title="Xem phóng to"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(cert)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-600 text-slate-300 hover:text-white transition-colors"
                          title="Sửa thông tin"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(cert.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
                          title="Xóa"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. MODAL: FULL PREVIEW & PRINT CERTIFICATE */}
      {previewCert && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-5 sm:p-8 shadow-2xl relative my-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">Giấy Chứng Nhận Hoàn Thành Khóa Học</h3>
                  <p className="text-xs text-slate-400">
                    {previewCert.templateType === "tinhocgenz-official"
                      ? "Phôi chính thức CÔNG TY TNHH PH – TIN HỌC GEN Z"
                      : previewCert.imageUrl
                      ? "Ảnh bằng chứng nhận riêng đã tải lên"
                      : "Chứng chỉ quốc tế chuẩn Certiport"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {previewCert.imageUrl && (
                  <button
                    type="button"
                    onClick={() => handleDownloadImage(previewCert)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Tải ảnh về máy"
                  >
                    <Download size={14} />
                    <span className="hidden sm:inline">Tải Ảnh Về</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-blue-600/20"
                >
                  <Printer size={14} />
                  <span>In Bằng (A4 Ngang)</span>
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
            <div id="printable-certificate" className="my-2 shadow-2xl rounded-2xl overflow-hidden flex items-center justify-center bg-black/40 p-2 sm:p-4">
              <CertificateVisual data={previewCert} size="lg" />
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-slate-400">
                Học viên: <strong className="text-white">{previewCert.studentName}</strong> • Mã: <strong className="text-amber-300 font-mono">{previewCert.certCode}</strong> • Điểm: <strong className="text-emerald-400">{previewCert.score}/1000</strong>
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
                  <span>Sửa thông tin / Đổi phôi</span>
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

      {/* 6. MODAL: LIVE WYSIWYG CERTIFICATE ISSUER / EDITOR */}
      {isIssuerOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-6xl w-full max-h-[94vh] flex flex-col shadow-2xl relative overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-md">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white font-display">
                    {editingCert ? "Chỉnh Sửa Chứng Chỉ & Cập Nhật Mẫu Phôi" : "Cấp Giấy Chứng Nhận Khóa Học Mới"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Phôi chính thức Tin Học Gen Z, tự động định hình văn bản theo thời gian thực (WYSIWYG)
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

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0]);
                }
              }}
            />

            <div className="p-5 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* LEFT COLUMN: Form (5 Cols) */}
              <form id="cert-form" onSubmit={handleSaveCertificate} className="lg:col-span-5 space-y-4">
                {/* 1. CHỌN MẪU PHÔI */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <label className="block text-[11px] font-black uppercase text-blue-400 tracking-wider">
                    1. Lựa Chọn Mẫu Phôi Chứng Nhận *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, templateType: "tinhocgenz-official" })}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                        formData.templateType === "tinhocgenz-official" || !formData.templateType
                          ? "bg-blue-600/20 border-blue-500 text-white font-bold shadow-md"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <BadgeCheck size={16} className="text-blue-400" />
                      <span className="text-[10px] leading-tight font-black">Phôi THGZ Mới</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, templateType: "certiport-gold" })}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                        formData.templateType === "certiport-gold"
                          ? "bg-amber-500/20 border-amber-500 text-white font-bold shadow-md"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Award size={16} className="text-amber-400" />
                      <span className="text-[10px] leading-tight font-black">Certiport Vàng Kim</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, templateType: "custom-image" });
                        fileInputRef.current?.click();
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                        formData.templateType === "custom-image"
                          ? "bg-emerald-600/20 border-emerald-500 text-white font-bold shadow-md"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Upload size={16} className="text-emerald-400" />
                      <span className="text-[10px] leading-tight font-black">Tải Ảnh Mẫu Riêng</span>
                    </button>
                  </div>

                  {formData.templateType === "custom-image" && (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`p-3 rounded-xl border-2 border-dashed transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        formData.imageUrl
                          ? "border-emerald-500/40 bg-emerald-950/20"
                          : "border-slate-700 bg-slate-900/60"
                      }`}
                    >
                      {formData.imageUrl ? (
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                          <CheckCircle2 size={14} /> Đã nhận ảnh riêng. Nhấp để chọn ảnh khác.
                        </div>
                      ) : (
                        <div className="text-xs text-slate-300 font-bold flex items-center gap-1.5">
                          <Upload size={14} /> Kéo thả hoặc bấm để tải ảnh từ máy tính
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 2. THÔNG TIN HỌC VIÊN */}
                <div className="space-y-3">
                  <div className="text-[11px] font-black uppercase text-blue-400 tracking-wider">
                    2. Thông tin học viên & Kết quả
                  </div>

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
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Khóa học / Môn thi
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
                        <option value="Python Cho Khoa Học Dữ Liệu">Python Cho Khoa Học Dữ Liệu</option>
                      </select>
                    </div>

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
                </div>

                {/* 3. MÃ CHỨNG CHỈ & NGÀY CẤP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        Mã chứng chỉ
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            certCode: `CERT-THGZ-2026-${Math.floor(1000 + Math.random() * 9000)}`
                          })
                        }
                        className="text-[10px] text-amber-400 hover:text-amber-300 font-bold"
                      >
                        Tạo ngẫu nhiên
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.certCode || ""}
                      onChange={(e) => setFormData({ ...formData, certCode: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-amber-300 font-mono text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Thời gian hoàn thành
                    </label>
                    <input
                      type="text"
                      value={formData.issueDate || ""}
                      onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      placeholder="DD/MM/YYYY"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                    />
                  </div>
                </div>

                {/* 4. KÝ DUYỆT & ĐÓNG DẤU */}
                <div className="space-y-3 pt-2">
                  <div className="text-[11px] font-black uppercase text-blue-400 tracking-wider">
                    3. Giảng viên & Ban Giám đốc Ký Duyệt
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                        Giảng viên ký tên
                      </label>
                      <input
                        type="text"
                        value={formData.instructor || ""}
                        onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                        placeholder="Thầy Nguyễn Đình Huy"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                        Đại diện đơn vị ký
                      </label>
                      <input
                        type="text"
                        value={formData.director || ""}
                        onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                        placeholder="Nguyễn Đình Huy"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.showSeal !== false}
                      onChange={(e) => setFormData({ ...formData, showSeal: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-900 border-slate-700"
                    />
                    <span>Đóng con dấu đỏ pháp nhân của <strong>CÔNG TY TNHH PH – TIN HỌC GEN Z</strong></span>
                  </label>
                </div>
              </form>

              {/* RIGHT COLUMN: Real-Time Preview */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                      <Eye size={13} className="text-emerald-400" />
                      <span>Định hình trực quan thời gian thực (WYSIWYG Live Preview):</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                      {formData.templateType === "tinhocgenz-official" ? "Phôi Tin Học Gen Z mới" : "Phôi tùy chọn"}
                    </span>
                  </div>

                  <div className="p-3 sm:p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner flex items-center justify-center min-h-[300px]">
                    <CertificateVisual data={formData} size="md" />
                  </div>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    💡 Bạn vừa gõ họ tên, điểm số, giảng viên đến đâu - phôi bằng bên cạnh sẽ lập tức cập nhật đến đó theo thời gian thực!
                  </p>
                </div>
              </div>
            </div>

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
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black tracking-wide shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Check size={16} />
                <span>{editingCert ? "Lưu Thay Đổi Chứng Chỉ" : "Xác Nhận Cấp Chứng Nhận"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. MODAL: DELETE CONFIRMATION */}
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
      {/* Print stylesheet for standard A4 landscape certificate printing */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-certificate,
          #printable-certificate * {
            visibility: visible;
          }
          #printable-certificate {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background: white !important;
            z-index: 999999 !important;
          }
          @page {
            size: landscape;
            margin: 0;
          }
        }
      `}} />
    </div>
  );
}
