"use client";

import { Award, QrCode, ExternalLink } from "lucide-react";

export default function StudentCertificateTab() {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-10 max-w-2xl mx-auto space-y-6 text-center">
      <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center mx-auto text-blue-400">
        <Award size={36} />
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-white">Chứng Nhận Hoàn Thành Đào Tạo</h3>
        <p className="text-xs text-slate-400">
          Chứng chỉ điện tử chính thức được mã hóa xác thực đối soát theo chuẩn Certiport.
        </p>
      </div>

      <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 text-left">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
          <span className="text-slate-400">Mã chứng nhận:</span>
          <span className="font-mono font-bold text-blue-400">CERT-MOS-2026-9842</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
          <span className="text-slate-400">Học viên:</span>
          <span className="font-bold text-white">Nguyễn Hoàng Nam</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
          <span className="text-slate-400">Khóa thi:</span>
          <span className="font-bold text-white">MOS Excel 2019 Associate</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
          <span className="text-slate-400">Điểm số:</span>
          <span className="font-bold text-blue-400">1000 / 1000 Điểm tuyệt đối</span>
        </div>
        <div className="flex justify-between items-center text-xs pt-1">
          <span className="text-slate-400">Mã xác thực:</span>
          <span className="font-mono text-xs text-slate-400 truncate max-w-[280px]">
            CERT-MO200-NAM1000-VN
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => window.open("/api/v1/certificates/verify/CERT-MOS-2026-9842/", "_blank")}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
        >
          <QrCode size={16} />
          <span>Tra Cứu Mã QR Công Khai</span>
          <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );
}

