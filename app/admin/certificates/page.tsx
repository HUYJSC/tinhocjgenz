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
  FileSpreadsheet,
  Star
} from "lucide-react";

export interface CertificateTemplateItem {
  id: string;
  name: string;
  imageUrl: string;
  isSystem?: boolean;
  isDefault?: boolean;
  createdAt: string;
  description?: string;
  displayMode?: "overlay-template" | "custom-image";
}

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
  instructorNote?: string;
  director?: string;
  directorTitle?: string;
  directorNote?: string;
  showSeal?: boolean;
  status: "Hợp lệ" | "Chờ xác thực" | "Đã thu hồi";
  templateType: string;
  templateId?: string;
  imageUrl?: string;
  displayMode?: "custom-image" | "overlay-template" | "default";
  note?: string;
}

export const DEFAULT_SYSTEM_TEMPLATES: CertificateTemplateItem[] = [
  {
    id: "tinhocgenz-official",
    name: "Phôi Tin Học Gen Z Chuẩn",
    imageUrl: "/images/certificates/tinhocgenz-clean-template.png",
    isSystem: true,
    isDefault: true,
    createdAt: "2026-08-01",
    description: "Mẫu phôi chuẩn độc quyền Tin Học Gen Z, nền sạch, tự động căn chỉnh đối xứng chữ ký & chức danh",
    displayMode: "overlay-template"
  },
  {
    id: "certiport-gold",
    name: "Phôi Certiport Vàng Kim",
    imageUrl: "",
    isSystem: true,
    isDefault: false,
    createdAt: "2026-08-01",
    description: "Mẫu cổ điển Certiport viền vàng hoàng gia sang trọng",
    displayMode: "overlay-template"
  }
];

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
    instructorTitle: "GIẢNG VIÊN",
    instructorNote: "(Ký và ghi rõ họ tên)",
    director: "Nguyễn Đình Huy",
    directorTitle: "ĐẠI DIỆN ĐƠN VỊ",
    directorNote: "(Ký và ghi rõ họ tên)",
    showSeal: false,
    status: "Hợp lệ",
    templateType: "tinhocgenz-official",
    displayMode: "overlay-template"
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
    instructorTitle: "GIẢNG VIÊN HƯỚNG DẪN",
    instructorNote: "(Ký và ghi rõ họ tên)",
    director: "Nguyễn Đình Huy",
    directorTitle: "ĐẠI DIỆN ĐƠN VỊ",
    directorNote: "(Ký và ghi rõ họ tên)",
    showSeal: false,
    status: "Hợp lệ",
    templateType: "tinhocgenz-official",
    displayMode: "overlay-template"
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
    instructorTitle: "GIẢNG VIÊN",
    instructorNote: "(Ký và ghi rõ họ tên)",
    director: "Nguyễn Đình Huy",
    directorTitle: "GIÁM ĐỐC ĐÀO TẠO",
    directorNote: "(Ký và ghi rõ họ tên)",
    showSeal: false,
    status: "Hợp lệ",
    templateType: "tinhocgenz-official",
    displayMode: "overlay-template"
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
    instructorTitle: "GIẢNG VIÊN",
    instructorNote: "(Ký và ghi rõ họ tên)",
    director: "Nguyễn Đình Huy",
    directorTitle: "ĐẠI DIỆN ĐƠN VỊ",
    directorNote: "(Ký và ghi rõ họ tên)",
    showSeal: false,
    status: "Hợp lệ",
    templateType: "tinhocgenz-official",
    displayMode: "overlay-template"
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
    instructorTitle: "MOS MASTER TRAINER",
    instructorNote: "(Ký và ghi rõ họ tên)",
    director: "Nguyễn Đình Huy",
    directorTitle: "ĐẠI DIỆN CÔNG TY",
    directorNote: "(Ký và ghi rõ họ tên)",
    showSeal: false,
    status: "Hợp lệ",
    templateType: "tinhocgenz-official",
    displayMode: "overlay-template"
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
    instructorTitle: "CHỦ NHIỆM LỚP",
    instructorNote: "(Ký và ghi rõ họ tên)",
    director: "Nguyễn Đình Huy",
    directorTitle: "GIÁM ĐỐC TRUNG TÂM",
    directorNote: "(Ký và ghi rõ họ tên)",
    showSeal: false,
    status: "Hợp lệ",
    templateType: "tinhocgenz-official",
    displayMode: "overlay-template"
  }
];

const LOCAL_STORAGE_KEY = "tinhocgenz_admin_certificates_v3";
const LOCAL_STORAGE_TEMPLATES_KEY = "tinhocgenz_certificate_templates_v2";

/**
 * Visual Certificate Component
 */
function CertificateVisual({
  data,
  size = "md",
  className = "",
  templates = []
}: {
  data: Partial<CertificateRecord>;
  size?: "sm" | "md" | "lg" | "print";
  className?: string;
  templates?: CertificateTemplateItem[];
}) {
  const isPrint = size === "print";
  const isSm = size === "sm";

  // CASE 1: Raw Custom Image (Direct scan / standalone certificate with text already baked in)
  if (data.templateType === "custom-image" && data.imageUrl && data.displayMode === "custom-image") {
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

  // CASE 2: Built-in Classic Certiport Gold Template
  if (data.templateType === "certiport-gold") {
    const bgStyle =
      data.imageUrl && data.displayMode === "overlay-template"
        ? {
            backgroundImage: `url(${data.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }
        : {
            backgroundImage: "radial-gradient(#e8dfcf 1px, transparent 1px)",
            backgroundSize: isSm ? "12px 12px" : "18px 18px"
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
            <div
              style={{ fontFamily: 'Tahoma, Verdana, "Segoe UI", sans-serif' }}
              className="text-base sm:text-2xl lg:text-3xl font-black text-[#0f2438] tracking-tight mt-0.5 sm:mt-1 border-b-2 border-[#c5a059]/50 inline-block px-4 pb-0.5"
            >
              {data.studentName || "Họ Và Tên Học Viên"}
            </div>
            <p className="text-[8px] sm:text-[11px] text-[#4b5563] mt-1 sm:mt-1.5 font-medium">
              Đã hoàn thành kỳ khảo thí năng lực tin học và đạt chuẩn quốc tế:
            </p>
            <div
              style={{ fontFamily: 'Tahoma, Verdana, "Segoe UI", sans-serif' }}
              className="text-[10px] sm:text-base font-black text-[#0284c7] uppercase tracking-wide mt-0.5"
            >
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

            {/* Giảng viên bên trái */}
            <div className="text-center">
              <div
                style={{ fontFamily: 'Tahoma, Verdana, "Segoe UI", sans-serif' }}
                className="text-xs sm:text-sm text-[#0f2438] font-bold"
              >
                {data.instructor || "Thầy Nguyễn Đình Huy"}
              </div>
              <div
                style={{ fontFamily: 'Tahoma, Verdana, "Segoe UI", sans-serif' }}
                className="text-[8px] sm:text-[10px] text-[#8c6b2d] font-bold uppercase"
              >
                {data.instructorTitle || "GIẢNG VIÊN"}
              </div>
            </div>

            {/* Đại diện đơn vị bên phải */}
            <div className="text-right">
              <div
                style={{ fontFamily: 'Tahoma, Verdana, "Segoe UI", sans-serif' }}
                className="text-xs sm:text-sm text-[#0f2438] font-bold"
              >
                {data.director || "Nguyễn Đình Huy"}
              </div>
              <div
                style={{ fontFamily: 'Tahoma, Verdana, "Segoe UI", sans-serif' }}
                className="text-[8px] sm:text-[10px] text-[#8c6b2d] font-bold uppercase"
              >
                {data.directorTitle || "ĐẠI DIỆN ĐƠN VỊ"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CASE 3: Overlay Frame (Official Tin Học Gen Z Clean Template OR Custom Uploaded Frame)
  const activeTemplate = templates.find((t) => t.id === data.templateType);
  const bgImageSrc =
    data.imageUrl && (data.displayMode === "overlay-template" || data.templateType === "custom-image")
      ? data.imageUrl
      : activeTemplate?.imageUrl
      ? activeTemplate.imageUrl
      : "/images/certificates/tinhocgenz-clean-template.png";

  return (
    <div
      className={`relative select-none overflow-hidden rounded-xl border border-slate-300 bg-white text-slate-900 shadow-2xl transition-all w-full aspect-[1024/724] ${className}`}
      style={{
        backgroundImage: `url('${bgImageSrc}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* LAYER 1: Họ và tên học viên - Phông chữ Tahoma chuẩn mực, căn chính xác giữa dòng dẫn và đường kẻ cam */}
      <div className="absolute top-[50.8%] -translate-y-1/2 inset-x-0 flex items-center justify-center pointer-events-none px-8 z-10">
        <h2
          style={{ fontFamily: 'Tahoma, Verdana, "Segoe UI", sans-serif' }}
          className={`font-black text-[#0c2340] tracking-tight uppercase text-center transition-all ${
            isPrint
              ? "text-3xl sm:text-4xl"
              : isSm
              ? "text-[11px] sm:text-xs leading-none"
              : "text-base sm:text-2xl lg:text-[28px] leading-tight"
          }`}
        >
          {data.studentName || "NGUYỄN HOÀNG NAM"}
        </h2>
      </div>

      {/* LAYER 2: Tên khóa học - Phông chữ Tahoma chuẩn mực, căn chính xác giữa dòng dẫn và ngày tháng */}
      <div className="absolute top-[64.9%] -translate-y-1/2 inset-x-0 flex items-center justify-center pointer-events-none px-8 z-10">
        <div
          style={{ fontFamily: 'Tahoma, Verdana, "Segoe UI", sans-serif' }}
          className={`font-bold text-[#0066cc] uppercase tracking-wide text-center transition-all ${
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

      {/* LAYER 3: Thời gian hoàn thành & Mã chứng nhận - Tách 2 cánh đối xứng chuẩn poster, phông Tahoma */}
      {/* 3A. Cánh trái: Thời gian hoàn thành */}
      <div className="absolute top-[71.0%] h-[20px] left-[14.5%] w-[34.0%] flex items-center justify-center pointer-events-none z-10">
        <div
          style={{ fontFamily: 'Tahoma, Verdana, "Segoe UI", sans-serif' }}
          className={`text-slate-600 font-medium transition-all ${
            isPrint
              ? "text-sm"
              : isSm
              ? "text-[6px] sm:text-[7.5px]"
              : "text-[8px] sm:text-[11px]"
          }`}
        >
          <span>Thời gian hoàn thành: </span>
          <strong className="text-slate-900 font-bold">{data.issueDate || "20/08/2026"}</strong>
        </div>
      </div>

      {/* 3B. Vạch phân cách giữa hai cánh */}
      <div className="absolute top-[71.0%] h-[20px] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-10 text-slate-300 font-light text-xs sm:text-sm">
        |
      </div>

      {/* 3C. Cánh phải: Mã chứng nhận */}
      <div className="absolute top-[71.0%] h-[20px] left-[51.5%] w-[34.0%] flex items-center justify-center pointer-events-none z-10">
        <div
          style={{ fontFamily: 'Tahoma, Verdana, "Segoe UI", sans-serif' }}
          className={`text-slate-600 font-medium transition-all ${
            isPrint
              ? "text-sm"
              : isSm
              ? "text-[6px] sm:text-[7.5px]"
              : "text-[8px] sm:text-[11px]"
          }`}
        >
          <span>Mã chứng nhận: </span>
          <strong className="text-slate-900 font-bold tracking-tight">
            {data.certCode || "CERT-THGZ-2026-9842"}
          </strong>
        </div>
      </div>

      {/* LAYER 4: Giảng viên (Cột Trái, X: 14.16% -> 36.43%, Đường kẻ ngang tại Y=598 / 82.6%) */}
      {/* 4A. Tên Giảng viên (nằm ngay sát trên đường kẻ ngang) */}
      <div className="absolute top-[75.2%] h-[6.8%] left-[14.16%] w-[22.27%] flex items-end justify-center pointer-events-none z-10 text-center pb-0.5">
        {data.instructor && (
          <span
            style={{ fontFamily: 'Tahoma, Verdana, "Segoe UI", sans-serif' }}
            className={`font-bold text-[#0c2340] tracking-tight transition-all truncate ${
              isPrint ? "text-base sm:text-lg" : isSm ? "text-[8px] sm:text-[9px]" : "text-[10px] sm:text-xs lg:text-[13px]"
            }`}
          >
            {data.instructor}
          </span>
        )}
      </div>

      {/* 4B. Chức danh Giảng viên (nằm dưới đường kẻ ngang, Y=609..628 / 84.1%..86.7%) */}
      <div className="absolute top-[84.1%] h-[3.0%] left-[14.16%] w-[22.27%] flex items-center justify-center pointer-events-none z-10 text-center">
        <span
          style={{ fontFamily: 'Tahoma, Verdana, "Segoe UI", sans-serif' }}
          className={`font-bold text-[#0c2340] uppercase tracking-wider transition-all ${
            isPrint ? "text-xs sm:text-sm" : isSm ? "text-[6.5px] sm:text-[7.5px]" : "text-[8px] sm:text-[10px]"
          }`}
        >
          {data.instructorTitle ?? "GIẢNG VIÊN"}
        </span>
      </div>

      {/* 4C. Ghi chú Giảng viên (nằm dưới chức danh, Y=635..654 / 87.7%..90.3%) */}
      {data.instructorNote !== "" && (
        <div className="absolute top-[87.8%] h-[2.8%] left-[14.16%] w-[22.27%] flex items-center justify-center pointer-events-none z-10 text-center">
          <span
            style={{ fontFamily: 'Tahoma, Verdana, "Segoe UI", sans-serif' }}
            className={`text-slate-500 italic font-medium transition-all ${
              isPrint ? "text-[9px] sm:text-xs" : isSm ? "text-[5.5px] sm:text-[6.5px]" : "text-[6.5px] sm:text-[8px]"
            }`}
          >
            {data.instructorNote ?? "(Ký và ghi rõ họ tên)"}
          </span>
        </div>
      )}

      {/* LAYER 5: Đại diện đơn vị (Cột Phải, X: 51.76% -> 74.51%, Đường kẻ ngang tại Y=598 / 82.6%) */}
      {/* 5A. Tên Người đại diện (nằm ngay sát trên đường kẻ ngang) */}
      <div className="absolute top-[75.2%] h-[6.8%] left-[51.76%] w-[22.75%] flex items-end justify-center pointer-events-none z-10 text-center pb-0.5">
        {data.director && (
          <span
            style={{ fontFamily: 'Tahoma, Verdana, "Segoe UI", sans-serif' }}
            className={`font-bold text-[#0c2340] tracking-tight transition-all truncate ${
              isPrint ? "text-base sm:text-lg" : isSm ? "text-[8px] sm:text-[9px]" : "text-[10px] sm:text-xs lg:text-[13px]"
            }`}
          >
            {data.director}
          </span>
        )}
      </div>

      {/* 5B. Chức danh Người đại diện (nằm dưới đường kẻ ngang, Y=609..628 / 84.1%..86.7%) */}
      <div className="absolute top-[84.1%] h-[3.0%] left-[51.76%] w-[22.75%] flex items-center justify-center pointer-events-none z-10 text-center">
        <span
          style={{ fontFamily: 'Tahoma, Verdana, "Segoe UI", sans-serif' }}
          className={`font-bold text-[#0c2340] uppercase tracking-wider transition-all ${
            isPrint ? "text-xs sm:text-sm" : isSm ? "text-[6.5px] sm:text-[7.5px]" : "text-[8px] sm:text-[10px]"
          }`}
        >
          {data.directorTitle ?? "ĐẠI DIỆN ĐƠN VỊ"}
        </span>
      </div>

      {/* 5C. Ghi chú Người đại diện (nằm dưới chức danh, Y=635..654 / 87.7%..90.3%) */}
      {data.directorNote !== "" && (
        <div className="absolute top-[87.8%] h-[2.8%] left-[51.76%] w-[22.75%] flex items-center justify-center pointer-events-none z-10 text-center">
          <span
            style={{ fontFamily: 'Tahoma, Verdana, "Segoe UI", sans-serif' }}
            className={`text-slate-500 italic font-medium transition-all ${
              isPrint ? "text-[9px] sm:text-xs" : isSm ? "text-[5.5px] sm:text-[6.5px]" : "text-[6.5px] sm:text-[8px]"
            }`}
          >
            {data.directorNote ?? "(Ký và ghi rõ họ tên)"}
          </span>
        </div>
      )}

      {/* LAYER 6: Khung Quét Mã QR Xác Thực (Góc dưới bên phải, tâm X: 78.6%, tâm Y: 85.9%) */}
      <div className="absolute top-[85.9%] left-[78.6%] -translate-x-1/2 -translate-y-1/2 w-[8.2%] aspect-square flex items-center justify-center z-10 pointer-events-none">
        <QrCode className="w-full h-full text-[#0c2340]/90" />
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

  // Template Manager States
  const [templates, setTemplates] = useState<CertificateTemplateItem[]>([]);
  const [isTemplateManagerOpen, setIsTemplateManagerOpen] = useState(false);
  const [isUploadTemplateModalOpen, setIsUploadTemplateModalOpen] = useState(false);
  const [deleteConfirmTemplateId, setDeleteConfirmTemplateId] = useState<string | null>(null);

  const [uploadTemplateData, setUploadTemplateData] = useState<{
    name: string;
    imageUrl: string;
    description: string;
    displayMode: "overlay-template" | "custom-image";
    isDefault: boolean;
  }>({
    name: "",
    imageUrl: "",
    description: "",
    displayMode: "overlay-template",
    isDefault: false
  });
  const templateFileInputRef = useRef<HTMLInputElement>(null);

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
    instructorTitle: "GIẢNG VIÊN",
    instructorNote: "(Ký và ghi rõ họ tên)",
    director: "Nguyễn Đình Huy",
    directorTitle: "ĐẠI DIỆN ĐƠN VỊ",
    directorNote: "(Ký và ghi rõ họ tên)",
    showSeal: false,
    status: "Hợp lệ",
    templateType: "tinhocgenz-official",
    imageUrl: "",
    displayMode: "overlay-template",
    note: ""
  });

  // Load Templates from localStorage
  useEffect(() => {
    try {
      const savedTpls = localStorage.getItem(LOCAL_STORAGE_TEMPLATES_KEY);
      if (savedTpls) {
        let parsed = JSON.parse(savedTpls);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Auto-migrate any template pointing to the old template path or official template to clean version
          parsed = parsed.map((t: CertificateTemplateItem) => {
            if (t.id === "tinhocgenz-official" || t.imageUrl?.includes("tinhocgenz-template.jpg")) {
              return {
                ...t,
                imageUrl: "/images/certificates/tinhocgenz-clean-template.png"
              };
            }
            return t;
          });
          setTemplates(parsed);
          try {
            localStorage.setItem(LOCAL_STORAGE_TEMPLATES_KEY, JSON.stringify(parsed));
          } catch {}
          return;
        }
      }
    } catch {}
    setTemplates(DEFAULT_SYSTEM_TEMPLATES);
  }, []);

  const saveTemplates = (newTemplates: CertificateTemplateItem[]) => {
    setTemplates(newTemplates);
    try {
      localStorage.setItem(LOCAL_STORAGE_TEMPLATES_KEY, JSON.stringify(newTemplates));
    } catch {}
  };

  const handleSetDefaultTemplate = (templateId: string) => {
    const updated = templates.map((t) => ({
      ...t,
      isDefault: t.id === templateId
    }));
    saveTemplates(updated);
  };

  const handleDeleteTemplate = (templateId: string) => {
    const tpl = templates.find((t) => t.id === templateId);
    if (tpl?.id === "tinhocgenz-official") {
      alert("Không thể xóa phôi chuẩn độc quyền mặc định của Tin Học Gen Z.");
      return;
    }
    const updated = templates.filter((t) => t.id !== templateId);
    if (tpl?.isDefault && updated.length > 0) {
      updated[0].isDefault = true;
    }
    saveTemplates(updated);

    // If the currently selected template in formData is deleted, revert to official template immediately
    if (formData.templateType === templateId) {
      const fallback = updated[0] || DEFAULT_SYSTEM_TEMPLATES[0];
      setFormData((prev) => ({
        ...prev,
        templateType: fallback ? fallback.id : "tinhocgenz-official",
        imageUrl: fallback?.imageUrl || "/images/certificates/tinhocgenz-clean-template.png",
        displayMode: fallback?.displayMode || "overlay-template"
      }));
    }

    setDeleteConfirmTemplateId(null);
  };

  const handleSaveNewTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTemplateData.imageUrl) {
      alert("Vui lòng tải lên tệp ảnh phôi chứng nhận.");
      return;
    }
    if (!uploadTemplateData.name.trim()) {
      alert("Vui lòng đặt tên cho mẫu phôi chứng nhận.");
      return;
    }

    const newTemplateId = `tpl-${Date.now()}`;
    const newTpl: CertificateTemplateItem = {
      id: newTemplateId,
      name: uploadTemplateData.name.trim(),
      imageUrl: uploadTemplateData.imageUrl,
      description: uploadTemplateData.description.trim() || "Khung phôi chứng nhận tự tải lên",
      displayMode: uploadTemplateData.displayMode,
      isDefault: uploadTemplateData.isDefault,
      isSystem: false,
      createdAt: new Date().toLocaleDateString("vi-VN")
    };

    let updatedTemplates = [...templates];
    if (uploadTemplateData.isDefault) {
      updatedTemplates = updatedTemplates.map((t) => ({ ...t, isDefault: false }));
    }
    updatedTemplates.push(newTpl);
    saveTemplates(updatedTemplates);

    setUploadTemplateData({
      name: "",
      imageUrl: "",
      description: "",
      displayMode: "overlay-template",
      isDefault: false
    });
    setIsUploadTemplateModalOpen(false);

    if (isIssuerOpen) {
      setFormData((prev) => ({
        ...prev,
        templateType: newTemplateId,
        imageUrl: newTpl.imageUrl,
        displayMode: newTpl.displayMode
      }));
    }
  };

  // Load from localStorage or initial dataset
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        let parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsed = parsed.map((c: CertificateRecord) => {
            if (c.imageUrl?.includes("tinhocgenz-template.jpg")) {
              return { ...c, imageUrl: "/images/certificates/tinhocgenz-clean-template.png" };
            }
            return c;
          });
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
    const defaultTpl = templates.find((t) => t.isDefault) || templates[0];
    const defaultType = defaultTpl?.id || "tinhocgenz-official";
    setFormData({
      studentName: "",
      exam: "MOS Excel 2019 Associate",
      examType: "mos-excel",
      score: 1000,
      certCode: `CERT-THGZ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      issueDate: new Date().toLocaleDateString("vi-VN"),
      issuer: "CÔNG TY TNHH PH – TIN HỌC GEN Z",
      instructor: "Thầy Nguyễn Đình Huy",
      instructorTitle: "GIẢNG VIÊN",
      instructorNote: "(Ký và ghi rõ họ tên)",
      director: "Nguyễn Đình Huy",
      directorTitle: "ĐẠI DIỆN ĐƠN VỊ",
      directorNote: "(Ký và ghi rõ họ tên)",
      showSeal: false,
      status: "Hợp lệ",
      templateType: defaultType,
      imageUrl: defaultTpl?.imageUrl || "",
      displayMode: defaultTpl?.displayMode || "overlay-template",
      note: ""
    });
    setIsIssuerOpen(true);
  };

  // Open Issuer Modal for editing existing cert
  const handleOpenEdit = (cert: CertificateRecord) => {
    setEditingCert(cert);
    setFormData({
      ...cert,
      instructor: cert.instructor || "Thầy Nguyễn Đình Huy",
      instructorTitle: cert.instructorTitle ?? "GIẢNG VIÊN",
      instructorNote: cert.instructorNote ?? "(Ký và ghi rõ họ tên)",
      director: cert.director || "Nguyễn Đình Huy",
      directorTitle: cert.directorTitle ?? "ĐẠI DIỆN ĐƠN VỊ",
      directorNote: cert.directorNote ?? "(Ký và ghi rõ họ tên)",
      templateType: cert.templateType || (cert.imageUrl ? "custom-image" : "tinhocgenz-official"),
      displayMode: cert.displayMode || (cert.imageUrl ? "custom-image" : "overlay-template"),
      showSeal: false
    });
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
      const updated = certs.map((c) =>
        c.id === editingCert.id ? ({ ...c, ...formData, showSeal: false } as CertificateRecord) : c
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
        instructor: formData.instructor?.trim() || "Thầy Nguyễn Đình Huy",
        instructorTitle: formData.instructorTitle?.trim() || "GIẢNG VIÊN",
        instructorNote: formData.instructorNote !== undefined ? formData.instructorNote.trim() : "(Ký và ghi rõ họ tên)",
        director: formData.director?.trim() || "Nguyễn Đình Huy",
        directorTitle: formData.directorTitle?.trim() || "ĐẠI DIỆN ĐƠN VỊ",
        directorNote: formData.directorNote !== undefined ? formData.directorNote.trim() : "(Ký và ghi rõ họ tên)",
        showSeal: false,
        status: (formData.status as any) || "Hợp lệ",
        templateType: formData.templateType || "tinhocgenz-official",
        imageUrl: formData.imageUrl || undefined,
        displayMode: formData.displayMode || "overlay-template",
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

  // Export CSV Action
  const handleExportCSV = () => {
    const headers = ["Mã Chứng Chỉ", "Học Viên", "Khóa Học", "Điểm Số", "Ngày Cấp", "Giảng Viên", "Đại Diện", "Trạng Thái"];
    const rows = certs.map((c) => [
      c.certCode,
      `"${c.studentName}"`,
      `"${c.exam}"`,
      c.score,
      c.issueDate,
      `"${c.instructor}"`,
      `"${c.director || ''}"`,
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

    if (filterTemplate !== "ALL") {
      if (filterTemplate === "CUSTOM") {
        if (c.templateType !== "custom-image") return false;
      } else {
        if (c.templateType !== filterTemplate) return false;
      }
    }

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
            Phân hệ cấp phát chứng chỉ độc quyền Tin Học Gen Z, tự do tùy biến chữ chân bằng (giảng viên, đại diện cty), quản lý kho phôi tải lên và xóa phôi linh hoạt mà không cần lập trình viên.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsTemplateManagerOpen(true)}
            className="px-4 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Layers size={16} className="text-amber-400" />
            <span>Kho Phôi Chứng Nhận ({templates.length})</span>
          </button>

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
            <CheckCircle2 size={13} />
            <span>100% Lưu trữ bảo mật</span>
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
          <div className="text-[11px] text-amber-400/90 font-medium mt-1">Học viên xuất sắc</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kho Khung / Phôi</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <Layers size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400 mt-2 font-display">{templates.length}</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">Mẫu phôi sẵn sàng</div>
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
              { label: "📷 Có ảnh riêng", value: "HAS_IMAGE" }
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
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
              <option value="CUSTOM">Ảnh Riêng</option>
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
            className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors cursor-pointer"
          >
            Cấp Chứng Nhận Ngay
          </button>
        </div>
      ) : viewMode === "gallery" ? (
        /* GALLERY VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => {
            const matchedTpl = templates.find((t) => t.id === cert.templateType);
            return (
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
                    <CertificateVisual data={cert} size="sm" templates={templates} />

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
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {matchedTpl?.name ? matchedTpl.name.split(" ")[0] + "..." : "Phôi Chuẩn"}
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
            );
          })}
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
                {filteredCerts.map((cert) => {
                  const matchedTpl = templates.find((t) => t.id === cert.templateType);
                  return (
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
                            className="text-slate-500 hover:text-white p-0.5 cursor-pointer"
                            title="Sao chép"
                          >
                            {copiedCode === cert.certCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                          {matchedTpl?.name || (cert.templateType === "tinhocgenz-official" ? "Phôi THGZ" : "Certiport")}
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
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Xem phóng to"
                          >
                            <Eye size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(cert)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Sửa thông tin"
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(cert.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Xóa"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">Xem Trước & In Giấy Chứng Nhận</h3>
                  <p className="text-xs text-slate-400">
                    Mẫu chứng chỉ chính thức của Tin Học Gen Z, sẵn sàng in khổ A4 ngang hoặc tải về
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Printer size={15} />
                  <span>In Bằng Khổ A4</span>
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
              <CertificateVisual data={previewCert} size="lg" templates={templates} />
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
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 size={14} />
                  <span>Sửa thông tin / Đổi phôi</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewCert(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors cursor-pointer"
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
                    {editingCert ? "Chỉnh Sửa Chứng Chỉ & Tùy Biến Chân Bằng" : "Cấp Giấy Chứng Nhận Khóa Học Mới"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Phôi Tin Học Gen Z chuẩn mực, tự do đổi mọi chữ chân bằng (giảng viên, đại diện cty) theo thời gian thực (WYSIWYG)
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

            <div className="p-5 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* LEFT COLUMN: Form (5 Cols) */}
              <form id="cert-form" onSubmit={handleSaveCertificate} className="lg:col-span-5 space-y-4">
                {/* 1. CHỌN MẪU PHÔI */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-black uppercase text-blue-400 tracking-wider">
                      1. Lựa Chọn Mẫu Khung / Phôi Chứng Nhận *
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsTemplateManagerOpen(true)}
                      className="text-[10px] text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Layers size={12} />
                      <span>Kho phôi ({templates.length})</span>
                    </button>
                  </div>

                  {/* Template Selector Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {templates.map((tpl) => {
                      const isSelected = formData.templateType === tpl.id;
                      const canDelete = tpl.id !== "tinhocgenz-official";

                      return (
                        <div
                          key={tpl.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              templateType: tpl.id,
                              imageUrl: tpl.imageUrl,
                              displayMode: tpl.displayMode || "overlay-template"
                            });
                          }}
                          className={`p-2 rounded-xl border text-left transition-all flex flex-col gap-1.5 relative group cursor-pointer ${
                            isSelected
                              ? "bg-blue-600/20 border-blue-500 text-white font-bold shadow-md ring-1 ring-blue-500"
                              : "bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                          }`}
                        >
                          <div className="w-full aspect-[1.414/1] rounded-lg bg-slate-950 overflow-hidden border border-slate-800 flex items-center justify-center relative">
                            {tpl.imageUrl ? (
                              <img
                                src={tpl.imageUrl}
                                alt={tpl.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center text-amber-400 p-2 text-center">
                                <Award size={18} />
                                <span className="text-[8px] font-bold mt-1">Gold SVG</span>
                              </div>
                            )}

                            {/* Default Badge */}
                            {tpl.isDefault && (
                              <span className="absolute top-1 right-1 bg-amber-500 text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded shadow z-10">
                                Mặc định
                              </span>
                            )}

                            {/* Direct Delete Button on Top Left of Thumbnail */}
                            {canDelete && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteConfirmTemplateId(tpl.id);
                                }}
                                className="absolute top-1 left-1 px-1.5 py-0.5 bg-rose-600/90 hover:bg-rose-500 active:scale-95 text-white rounded text-[9px] font-bold shadow-lg transition-all flex items-center gap-0.5 z-20 cursor-pointer border border-rose-400/40"
                                title={`Xóa phôi ${tpl.name}`}
                              >
                                <Trash2 size={10} className="stroke-[2.5]" />
                                <span>Xóa</span>
                              </button>
                            )}
                          </div>

                          <div className="w-full">
                            <div className="text-[10px] font-bold text-white truncate flex items-center justify-between gap-1">
                              <span className="truncate">{tpl.name}</span>
                              {canDelete && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteConfirmTemplateId(tpl.id);
                                  }}
                                  className="text-[9px] text-rose-400 hover:text-rose-300 font-bold hover:underline shrink-0 cursor-pointer flex items-center gap-0.5"
                                  title={`Xóa phôi ${tpl.name}`}
                                >
                                  <Trash2 size={10} />
                                  <span>Xóa</span>
                                </button>
                              )}
                            </div>
                            <div className="flex items-center justify-between text-[8.5px] text-slate-400 mt-0.5">
                              <span>{tpl.isSystem ? "Phôi hệ thống" : "Khung tự tải"}</span>
                              {!tpl.isDefault && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSetDefaultTemplate(tpl.id);
                                  }}
                                  className="text-amber-400 hover:text-amber-300 font-semibold hover:underline cursor-pointer"
                                  title="Đặt làm phôi mặc định"
                                >
                                  ⭐ Mặc định
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Quick upload new template button */}
                    <button
                      type="button"
                      onClick={() => setIsUploadTemplateModalOpen(true)}
                      className="p-2 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 hover:bg-slate-800/60 text-slate-400 hover:text-blue-400 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer min-h-[90px]"
                    >
                      <Plus size={18} className="text-blue-400" />
                      <span className="text-[10px] font-bold text-center leading-tight">Tải Khung Mới</span>
                      <span className="text-[8px] text-slate-500 text-center">Lưu vào kho phôi</span>
                    </button>
                  </div>
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
                        className="text-[10px] text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
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

                {/* 4. KÝ DUYỆT CHÂN BẰNG - TỰ DO SỬA MỌI CHỮ */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-black uppercase text-blue-400 tracking-wider flex items-center gap-1.5">
                      <Edit3 size={13} className="text-blue-400" />
                      <span>3. Giảng viên & Người Đại Diện Duyệt Chân Bằng</span>
                    </div>
                    <span className="text-[9.5px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Tự do sửa mọi chữ
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    💡 Bạn có thể đổi tên giảng viên, chức danh (GIẢNG VIÊN / CHỦ NHIỆM LỚP / MOS MASTER TRAINER...), tên người đại diện và chức danh (ĐẠI DIỆN ĐƠN VỊ / GIÁM ĐỐC TRUNG TÂM / TỔNG GIÁM ĐỐC...) theo nhu cầu thực tế.
                  </p>

                  {/* TWO COLUMNS: Giảng viên (Trái) & Đại diện (Phải) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* CỘT TRÁI: GIẢNG VIÊN */}
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <div className="text-[10px] font-bold uppercase text-amber-400 tracking-wide border-b border-slate-800 pb-1 flex items-center justify-between">
                        <span>Chân Bằng Bên Trái</span>
                        <span className="text-[9px] text-slate-500 font-normal">Giảng viên / Lớp</span>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-300 mb-1">
                          Họ tên người ký
                        </label>
                        <input
                          type="text"
                          value={formData.instructor || ""}
                          onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                          placeholder="VD: Thầy Nguyễn Đình Huy"
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-300 mb-1">
                          Chức danh / Nhãn chân bằng
                        </label>
                        <input
                          type="text"
                          value={formData.instructorTitle || ""}
                          onChange={(e) => setFormData({ ...formData, instructorTitle: e.target.value })}
                          placeholder="GIẢNG VIÊN (hoặc CHỦ NHIỆM LỚP...)"
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-amber-300 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1">
                          Dòng ghi chú dưới chức danh
                        </label>
                        <input
                          type="text"
                          value={formData.instructorNote ?? "(Ký và ghi rõ họ tên)"}
                          onChange={(e) => setFormData({ ...formData, instructorNote: e.target.value })}
                          placeholder="(Ký và ghi rõ họ tên)"
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-[11px] italic focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* CỘT PHẢI: ĐẠI DIỆN ĐƠN VỊ / CÔNG TY */}
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <div className="text-[10px] font-bold uppercase text-blue-400 tracking-wide border-b border-slate-800 pb-1 flex items-center justify-between">
                        <span>Chân Bằng Bên Phải</span>
                        <span className="text-[9px] text-slate-500 font-normal">Đại diện pháp nhân</span>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-300 mb-1">
                          Họ tên người đại diện
                        </label>
                        <input
                          type="text"
                          value={formData.director || ""}
                          onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                          placeholder="VD: Nguyễn Đình Huy"
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-300 mb-1">
                          Chức danh / Nhãn chân bằng
                        </label>
                        <input
                          type="text"
                          value={formData.directorTitle || ""}
                          onChange={(e) => setFormData({ ...formData, directorTitle: e.target.value })}
                          placeholder="ĐẠI DIỆN ĐƠN VỊ (hoặc GIÁM ĐỐC CÔNG TY...)"
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-blue-300 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1">
                          Dòng ghi chú dưới chức danh
                        </label>
                        <input
                          type="text"
                          value={formData.directorNote ?? "(Ký và ghi rõ họ tên)"}
                          onChange={(e) => setFormData({ ...formData, directorNote: e.target.value })}
                          placeholder="(Ký và ghi rõ họ tên)"
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-[11px] italic focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400">
                    <CheckCircle2 size={13} className="shrink-0 text-emerald-400" />
                    <span>Phông chữ Tahoma chuẩn hóa, đối xứng cân bằng hoàn hảo, không có con dấu đỏ.</span>
                  </div>
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
                      Phông Tahoma • Không con dấu
                    </span>
                  </div>

                  <div className="p-3 sm:p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner flex items-center justify-center min-h-[300px]">
                    <CertificateVisual data={formData} size="md" templates={templates} />
                  </div>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    💡 Bạn gõ họ tên, điểm số, giảng viên, chức danh đến đâu - phôi bằng bên cạnh sẽ lập tức cập nhật đến đó theo thời gian thực!
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

      {/* 7. MODAL: DELETE CONFIRMATION FOR CERTIFICATE */}
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

      {/* 8. MODAL: QUẢN LÝ KHO KHUNG / PHÔI CHỨNG NHẬN (TEMPLATE MANAGER) */}
      {isTemplateManagerOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-500 flex items-center justify-center text-slate-950 font-black shadow-md">
                  <Layers size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white font-display flex items-center gap-2">
                    <span>Kho Khung & Phôi Chứng Nhận</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {templates.length} Mẫu Khung
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Tự do thêm khung phôi mới, xóa khung cũ, đặt khung mặc định - Không phụ thuộc team lập trình viên
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadTemplateModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Tải Khung Mới Lên</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsTemplateManagerOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Content List */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {templates.map((tpl) => (
                  <div
                    key={tpl.id}
                    className={`rounded-2xl border bg-slate-950 overflow-hidden flex flex-col justify-between transition-all ${
                      tpl.isDefault
                        ? "border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40"
                        : "border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="w-full aspect-[1.414/1] bg-slate-900 relative overflow-hidden flex items-center justify-center group">
                      {tpl.imageUrl ? (
                        <img
                          src={tpl.imageUrl}
                          alt={tpl.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-amber-400 p-4 text-center">
                          <Award size={32} />
                          <span className="text-xs font-bold mt-2">Certiport Gold Layout</span>
                        </div>
                      )}

                      {/* Default Badge */}
                      {tpl.isDefault && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                          <CheckCircle2 size={11} />
                          <span>Mặc định</span>
                        </div>
                      )}

                      {/* System or Custom Badge */}
                      <div className="absolute top-2 right-2">
                        {tpl.isSystem ? (
                          <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Hệ thống
                          </span>
                        ) : (
                          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Tự tải lên
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Info & Actions */}
                    <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-bold text-white text-sm truncate">{tpl.name}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                          {tpl.description || "Phôi chứng chỉ"}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1.5">
                        {!tpl.isDefault ? (
                          <button
                            type="button"
                            onClick={() => handleSetDefaultTemplate(tpl.id)}
                            className="text-[10px] font-bold text-amber-400 hover:text-amber-300 hover:underline cursor-pointer"
                          >
                            ⭐ Đặt làm mặc định
                          </button>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                            ✓ Đang là mặc định
                          </span>
                        )}

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setIsTemplateManagerOpen(false);
                              handleOpenNewIssuer();
                              setFormData((prev) => ({
                                ...prev,
                                templateType: tpl.id,
                                imageUrl: tpl.imageUrl,
                                displayMode: tpl.displayMode || "overlay-template"
                              }));
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Cấp bằng với phôi này"
                          >
                            <Plus size={13} />
                          </button>

                          {!tpl.isSystem && (
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmTemplateId(tpl.id)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                              title="Xóa phôi này khỏi kho"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400 shrink-0">
              <span>Mọi phôi tải lên được lưu trữ trực tiếp trên thiết bị của bạn.</span>
              <button
                type="button"
                onClick={() => setIsTemplateManagerOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. MODAL: UPLOAD NEW TEMPLATE (TẢI KHUNG MỚI LÊN) */}
      {isUploadTemplateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative my-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Upload size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Tải Khung / Phôi Chứng Nhận Mới</h3>
                  <p className="text-[11px] text-slate-400">Chọn ảnh phôi từ máy tính để thêm vào kho</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsUploadTemplateModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveNewTemplate} className="space-y-3.5">
              {/* Image Picker / Drop Zone */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Tệp ảnh khung phôi * (PNG, JPG, WEBP)
                </label>
                <div
                  onClick={() => templateFileInputRef.current?.click()}
                  className={`p-4 rounded-2xl border-2 border-dashed transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-2 ${
                    uploadTemplateData.imageUrl
                      ? "border-emerald-500/50 bg-emerald-950/20"
                      : "border-slate-700 bg-slate-950/60 hover:border-blue-500"
                  }`}
                >
                  <input
                    ref={templateFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        if (file.size > 8 * 1024 * 1024) {
                          alert("Vui lòng chọn tệp ảnh có dung lượng dưới 8MB.");
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          const dataUrl = ev.target?.result as string;
                          setUploadTemplateData((prev) => ({ ...prev, imageUrl: dataUrl }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />

                  {uploadTemplateData.imageUrl ? (
                    <div className="w-full space-y-2">
                      <div className="w-full aspect-[1.414/1] max-h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                        <img
                          src={uploadTemplateData.imageUrl}
                          alt="Khung xem trước"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                        <CheckCircle2 size={14} />
                        <span>Đã chọn ảnh phôi. Bấm để chọn ảnh khác.</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-4 flex flex-col items-center gap-2">
                      <Upload size={28} className="text-blue-400" />
                      <div className="text-xs font-bold text-slate-200">
                        Nhấp để chọn ảnh từ máy tính hoặc kéo thả vào đây
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Khuyến nghị ảnh ngang tỉ lệ 1024x724 hoặc khổ A4 ngang
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Template Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Tên mẫu khung phôi *
                </label>
                <input
                  type="text"
                  required
                  value={uploadTemplateData.name}
                  onChange={(e) => setUploadTemplateData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="VD: Phôi MOS Xanh Dương 2026, Phôi Tin Học Thực Chiến..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Template Description */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Mô tả ngắn (tùy chọn)
                </label>
                <input
                  type="text"
                  value={uploadTemplateData.description}
                  onChange={(e) => setUploadTemplateData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="VD: Dành cho học viên tốt nghiệp các lớp văn phòng nâng cao..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Checkbox Default */}
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={uploadTemplateData.isDefault}
                  onChange={(e) => setUploadTemplateData((prev) => ({ ...prev, isDefault: e.target.checked }))}
                  className="w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-500 bg-slate-950"
                />
                <span>⭐ Đặt làm khung phôi mặc định cho các chứng chỉ cấp sau này</span>
              </label>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsUploadTemplateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Check size={14} />
                  <span>Lưu Vào Kho Phôi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 10. MODAL: DELETE CONFIRMATION FOR TEMPLATE */}
      {deleteConfirmTemplateId && (() => {
        const tplToDelete = templates.find((t) => t.id === deleteConfirmTemplateId);
        return (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl text-center">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-400 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} />
              </div>

              <h3 className="text-lg font-black text-white">Xác Nhận Xóa Khung Phôi?</h3>
              <p className="text-xs text-slate-300 mt-2 font-semibold">
                Bạn có chắc chắn muốn xóa phôi: <strong className="text-rose-400 font-bold">{tplToDelete?.name || "này"}</strong>?
              </p>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Mẫu khung phôi này sẽ được gỡ bỏ hoàn toàn khỏi hệ thống và bộ nhớ trình duyệt.
              </p>

              {tplToDelete?.imageUrl && (
                <div className="mt-3 mx-auto w-36 aspect-[1.414/1] rounded-lg overflow-hidden border border-slate-700 bg-slate-950 p-1">
                  <img src={tplToDelete.imageUrl} alt={tplToDelete.name} className="w-full h-full object-contain" />
                </div>
              )}

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmTemplateId(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteTemplate(deleteConfirmTemplateId)}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-rose-600/25 flex items-center gap-1.5"
                >
                  <Trash2 size={14} />
                  <span>Xác Nhận Xóa Khung</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}

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
