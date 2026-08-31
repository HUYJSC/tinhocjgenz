"use client";

import React, { useState } from "react";
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
  Check
} from "lucide-react";

interface CertificateRecord {
  id: string;
  studentName: string;
  exam: string;
  certCode: string;
  score: number;
  issueDate: string;
  issuer: string;
  status: "Hợp lệ" | "Chờ xác thực";
}

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState<CertificateRecord[]>([
    {
      id: "cert-1",
      studentName: "Nguyễn Hoàng Nam",
      exam: "MOS Excel 2019 Associate",
      certCode: "CERT-MOS-2026-9842",
      score: 1000,
      issueDate: "20/08/2026",
      issuer: "Certiport Official / IIG Vietnam",
      status: "Hợp lệ"
    },
    {
      id: "cert-2",
      studentName: "Trần Thị Thu Thảo",
      exam: "IC3 Digital Literacy GS6 Level 1-3",
      certCode: "CERT-IC3-2026-5512",
      score: 980,
      issueDate: "18/08/2026",
      issuer: "Certiport Official / IIG Vietnam",
      status: "Hợp lệ"
    },
    {
      id: "cert-3",
      studentName: "Lê Minh Trí",
      exam: "MOS Word 2019 Associate",
      certCode: "CERT-MOS-2026-3310",
      score: 1000,
      issueDate: "15/08/2026",
      issuer: "Certiport Official / IIG Vietnam",
      status: "Hợp lệ"
    }
  ]);

  const [search, setSearch] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredCerts = certs.filter(
    (c) =>
      c.studentName.toLowerCase().includes(search.toLowerCase()) ||
      c.certCode.toLowerCase().includes(search.toLowerCase()) ||
      c.exam.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-display">
            <Award className="text-amber-400" />
            <span>Chứng Chỉ Số Certiport & Xác Thực Điểm 1000</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tra cứu chứng chỉ quốc tế MOS/IC3 của học viên đạt chuẩn đầu ra và điểm số tuyệt đối.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
        <Search size={18} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tra cứu theo họ tên học viên, mã chứng chỉ (CERT-MOS...)..."
          className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
        />
      </div>

      {/* Certificates Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              {cert.score}/1000 Điểm
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>{cert.issuer}</span>
              </div>

              <h3 className="text-base font-black text-white tracking-tight font-display">
                {cert.studentName}
              </h3>
              <p className="text-xs text-blue-400 font-semibold mt-1">
                {cert.exam}
              </p>

              <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Mã Định Danh Chứng Chỉ</div>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className="text-xs font-mono font-bold text-amber-300 truncate">
                    {cert.certCode}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(cert.certCode)}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    title="Sao chép mã"
                  >
                    {copiedCode === cert.certCode ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Ngày cấp: {cert.issueDate}</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 size={12} /> Hợp lệ
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
