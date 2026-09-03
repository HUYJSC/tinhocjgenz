"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  User,
  KeyRound,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
  Loader2,
  Eye,
  EyeOff,
  Smartphone,
  Info
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login, isLoading } = useAdminAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // MFA verification step state
  const [mfaStep, setMfaStep] = useState(false);
  const [mfaCode, setMfaCode] = useState("");

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 text-sm font-medium">Đang kiểm tra phiên làm việc...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    if (!username.trim() || !password) {
      setErrorMsg("Vui lòng nhập đầy đủ tên đăng nhập/email và mật khẩu.");
      return;
    }

    if (password.length < 12) {
      setErrorMsg("Mật khẩu quản trị phải có tối thiểu 12 ký tự.");
      return;
    }

    if (mfaStep && (!mfaCode.trim() || mfaCode.trim().length !== 6)) {
      setErrorMsg("Vui lòng nhập đúng mã bảo mật MFA gồm 6 chữ số.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await login({
        username: username.trim(),
        password,
        mfaCode: mfaStep ? mfaCode.trim() : undefined,
      });

      if (res.requireMfa) {
        setMfaStep(true);
        setInfoMsg(res.message || "Tài khoản yêu cầu mã xác thực hai bước (MFA).");
        return;
      }

      if (!res.success) {
        setErrorMsg(res.message || "Thông tin đăng nhập không chính xác.");
      }
    } catch {
      setErrorMsg("Không thể kết nối đến máy chủ xác thực. Vui lòng kiểm tra lại đường truyền.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackToCredentials = () => {
    setMfaStep(false);
    setMfaCode("");
    setErrorMsg(null);
    setInfoMsg(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={14} /> Quay lại Trang chủ Website
        </Link>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20 ring-4 ring-blue-500/10">
            {mfaStep ? <Smartphone className="w-8 h-8 text-white" /> : <Lock className="w-8 h-8 text-white" />}
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-display">
            CỔNG QUẢN TRỊ NỘI BỘ
          </h1>
          <p className="text-xs font-semibold text-blue-400 tracking-wider uppercase mt-1">
            TIN HỌC GEN Z • ĐÀO TẠO & KHẢO THÍ
          </p>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed">
            {mfaStep
              ? "Vui lòng nhập mã xác thực 6 chữ số từ ứng dụng xác thực (Authenticator) để hoàn tất đăng nhập."
              : "Khu vực giới hạn dành riêng cho Ban điều hành, Giáo vụ và Giảng viên được phân quyền."}
          </p>
        </div>

        {/* Info Notification */}
        {infoMsg && (
          <div className="mb-4 p-3 bg-blue-950/70 border border-blue-800/80 rounded-xl flex items-start gap-2.5 text-xs text-blue-200">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>{infoMsg}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-950/70 border border-red-800/80 rounded-xl flex items-start gap-2.5 text-xs text-red-200" role="alert">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {!mfaStep ? (
            <>
              {/* Username / Email */}
              <div>
                <label
                  htmlFor="admin-username"
                  className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
                >
                  Tài khoản hoặc Email
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="admin-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nhập tên đăng nhập hoặc email..."
                    required
                    autoFocus
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
                >
                  Mật khẩu cá nhân
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="admin-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu tối thiểu 12 ký tự..."
                    required
                    className="w-full pl-10 pr-12 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-md transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Chính sách bảo mật: Mật khẩu bắt buộc có độ dài từ 12 ký tự trở lên.
                </p>
              </div>
            </>
          ) : (
            /* Step 2: MFA Code */
            <div>
              <label
                htmlFor="admin-mfa-code"
                className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2"
              >
                Mã xác thực 2 bước (MFA / TOTP)
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="admin-mfa-code"
                  name="mfaCode"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-center text-lg tracking-[0.4em] font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5 text-center">
                Nhập mã 6 số từ Google Authenticator hoặc mã dự phòng quản trị.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Đang xử lý xác thực...</span>
              </>
            ) : mfaStep ? (
              <>
                <ShieldCheck size={16} />
                <span>Xác nhận mã bảo mật</span>
              </>
            ) : (
              <>
                <ShieldCheck size={16} />
                <span>Đăng nhập hệ thống</span>
              </>
            )}
          </button>

          {mfaStep && (
            <button
              type="button"
              onClick={handleBackToCredentials}
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white font-medium text-xs transition-colors cursor-pointer"
            >
              Quay lại bước nhập tài khoản
            </button>
          )}
        </form>

        {/* Truthful Audit Notice */}
        <div className="mt-6 text-center border-t border-slate-800/80 pt-4">
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Mọi phiên đăng nhập thành công và thất bại đều được ghi nhận vào Nhật ký Bảo mật (Audit Log) theo thời gian thực cùng địa chỉ IP và định danh tài khoản.
          </p>
        </div>
      </div>
    </div>
  );
}
