"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  HelpCircle,
  Info,
  KeyRound,
  Loader2,
  Lock,
  ShieldCheck,
  Smartphone,
  User,
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login, isLoading } = useAdminAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mfaStep, setMfaStep] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    if (!username.trim() || !password) {
      setErrorMsg("Vui lòng nhập đầy đủ tài khoản và mật khẩu.");
      return;
    }

    if (mfaStep && !/^\d{6}$/.test(mfaCode.trim())) {
      setErrorMsg("Mã bảo mật MFA phải gồm đúng 6 chữ số.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await login({
        username: username.trim(),
        password,
        mfaCode: mfaStep ? mfaCode.trim() : undefined,
      });

      if (result.requireMfa) {
        setMfaStep(true);
        setInfoMsg(result.message || "Vui lòng nhập mã bảo mật MFA để tiếp tục.");
        return;
      }

      if (!result.success) {
        setErrorMsg(result.message || "Thông tin đăng nhập không chính xác.");
      }
    } catch {
      setErrorMsg("Không thể kết nối đến máy chủ xác thực. Vui lòng thử lại.");
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        <p className="mt-4 text-sm font-semibold text-slate-300">Đang kiểm tra phiên quản trị...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Về trang chủ</span>
          </Link>
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-400">
            Tin Học Gen Z
          </span>
        </div>

        <div className="mb-6 text-center">
          <div className="mx-auto mb-3.5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
            <Lock className="h-7 w-7" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Cổng quản trị hệ thống
          </h1>
          <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-slate-400">
            Đăng nhập bằng tài khoản được cấp. Thông tin xác thực không được lưu trong giao diện hoặc mã nguồn phía trình duyệt.
          </p>
        </div>

        {infoMsg && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-800/60 bg-blue-950/60 p-3.5 text-xs text-blue-200">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
            <div className="flex-1">{infoMsg}</div>
          </div>
        )}

        {errorMsg && (
          <div
            className="mb-5 flex items-start gap-3 rounded-xl border border-rose-800/60 bg-rose-950/60 p-3.5 text-xs text-rose-200"
            role="alert"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" />
            <div className="flex-1 font-medium">{errorMsg}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {!mfaStep ? (
            <>
              <div>
                <label htmlFor="admin-username" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Tài khoản hoặc email
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    id="admin-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Nhập tài khoản hoặc email"
                    required
                    autoFocus
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="admin-password" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Mật khẩu
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    id="admin-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Nhập mật khẩu"
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-12 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="admin-mfa-code" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                Mã bảo mật MFA
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  id="admin-mfa-code"
                  name="mfaCode"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={mfaCode}
                  onChange={(event) => setMfaCode(event.target.value.replace(/\D/g, ""))}
                  placeholder="Mã 6 chữ số"
                  required
                  autoFocus
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-center text-lg tracking-[0.35em] text-white placeholder:text-sm placeholder:tracking-normal placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                <span>Đang xác thực...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={16} aria-hidden="true" />
                <span>{mfaStep ? "Xác nhận MFA" : "Đăng nhập"}</span>
              </>
            )}
          </button>

          {mfaStep && (
            <button
              type="button"
              onClick={handleBackToCredentials}
              className="w-full rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              Quay lại thông tin đăng nhập
            </button>
          )}
        </form>

        <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-500">
          <span>Trung tâm Đào tạo & Khảo thí</span>
          <span className="flex items-center gap-1 text-slate-400">
            <HelpCircle size={12} aria-hidden="true" /> Hotline: 0332.298.065
          </span>
        </div>
      </div>
    </div>
  );
}
