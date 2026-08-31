"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, KeyRound, ShieldCheck, AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login, isLoading } = useAdminAuth();
  const [pinInput, setPinInput] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 text-sm font-medium">Đang xác thực phiên quản trị máy chủ...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const res = await login(pinInput);
      if (!res.success) {
        setErrorMsg(res.message || "Mã xác thực không hợp lệ.");
      }
    } catch {
      setErrorMsg("Có lỗi xảy ra khi kết nối đến máy chủ xác thực.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={14} /> Quay lại Trang chủ Website
        </Link>

        {/* Security Shield Header */}
        <div className="text-center mb-7">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25 ring-4 ring-blue-500/10">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white font-display">
            CỔNG QUẢN TRỊ HỆ THỐNG
          </h1>
          <p className="text-xs font-bold text-blue-400 tracking-wider uppercase mt-1 flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} /> PH DIGITAL EDUCATION • RBAC SECURE GATE
          </p>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed">
            Khu vực kiểm soát quyền hạn cao dành riêng cho Quản trị viên, Giáo vụ và Giảng viên được cấp phép.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-5 p-3.5 bg-red-950/60 border border-red-800/80 rounded-2xl flex items-start gap-2.5 text-xs text-red-200 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Mã PIN / Mật Khẩu Quản Trị Hệ Thống
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Nhập mật mã quản trị bảo mật..."
                required
                autoFocus
                className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all tracking-wider font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm tracking-wide shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>ĐANG XÁC THỰC MÁY CHỦ...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={16} />
                <span>XÁC THỰC QUYỀN TRUY CẬP</span>
              </>
            )}
          </button>
        </form>

        {/* Safety Note */}
        <div className="mt-6 text-center border-t border-slate-800/80 pt-4">
          <p className="text-[11px] text-slate-500">
            Hệ thống bảo vệ đa tầng ASVS Level 2, chống brute-force và mã hóa phiên theo chuẩn quốc tế.
          </p>
        </div>
      </div>
    </div>
  );
}
