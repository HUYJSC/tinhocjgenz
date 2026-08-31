"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, KeyRound, ShieldCheck, AlertCircle, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
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
        <p className="text-slate-400 text-sm font-medium">Đang kiểm tra quyền điều khiển trang...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    const res = login(pinInput);
    if (!res.success) {
      setErrorMsg(res.message || "Mã xác thực không hợp lệ.");
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
            <ShieldCheck size={14} /> TIN HỌC GEN Z • ADMIN CONTROL HUB
          </p>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed">
            Khu vực hạn chế dành riêng cho Quản trị viên, Trưởng bộ môn & Giảng viên phụ trách đào tạo.
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
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Mã PIN / Khóa Quản Trị</span>
              <span className="text-[10px] text-slate-500 font-mono">Default: ph2026</span>
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Nhập mã PIN (ví dụ: ph2026)..."
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
            <ShieldCheck size={16} />
            <span>XÁC THỰC QUYỀN TRUY CẬP</span>
          </button>
        </form>

        {/* Quick Fill Demo Helper */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-400 mb-2">Đăng nhập nhanh kiểm thử hệ thống:</p>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setPinInput("ph2026");
                login("ph2026");
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-blue-400 hover:text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer border border-slate-700/60"
            >
              <Sparkles size={12} className="text-amber-400" />
              <span>Dùng mã mẫu: ph2026</span>
            </button>
          </div>
        </div>

        {/* Safety Note */}
        <div className="mt-4 text-center">
          <p className="text-[10px] text-slate-500">
            Phiên đăng nhập được mã hóa và ghi nhớ an toàn trên thiết bị này.
          </p>
        </div>
      </div>
    </div>
  );
}
