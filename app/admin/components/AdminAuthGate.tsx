"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  HelpCircle,
  Info,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Smartphone,
  User,
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

type GateMode = "login" | "forgot_request" | "forgot_reset";

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login, isLoading } = useAdminAuth();

  // Login State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mfaStep, setMfaStep] = useState(false);
  const [mfaCode, setMfaCode] = useState("");

  // Mode Switch
  const [mode, setMode] = useState<GateMode>("login");

  // Forgot Password State
  const [recoveryCredential, setRecoveryCredential] = useState("");
  const [recoveryOtp, setRecoveryOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [maskedTarget, setMaskedTarget] = useState("");

  // Status & Feedback
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // 1. Submit Login
  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);
    setSuccessMsg(null);

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
        setInfoMsg(result.message || "Vui lòng nhập mã bảo mật MFA (mặc định: 686868) để tiếp tục.");
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

  // 2. Request OTP for Forgot Password
  const handleRequestOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);
    setSuccessMsg(null);

    const cred = recoveryCredential.trim();
    if (!cred) {
      setErrorMsg("Vui lòng nhập Email hoặc Số điện thoại quản trị viên.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/auth/forgot-password/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: cred }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMaskedTarget(data.maskedTarget || cred);
        setMode("forgot_reset");
        setInfoMsg(data.message);
      } else {
        setErrorMsg(data.error || "Không thể gửi mã OTP khôi phục.");
      }
    } catch {
      setErrorMsg("Lỗi kết nối máy chủ khi gửi OTP.");
    } finally {
      setSubmitting(false);
    }
  };

  // 3. Reset Password with OTP
  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);
    setSuccessMsg(null);

    if (!recoveryOtp.trim() || !/^\d{6}$/.test(recoveryOtp.trim())) {
      setErrorMsg("Mã OTP phải gồm đúng 6 chữ số.");
      return;
    }

    if (!newPassword || newPassword.length < 12) {
      setErrorMsg("Mật khẩu mới phải có tối thiểu 12 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Mật khẩu xác nhận không khớp với mật khẩu mới.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/auth/forgot-password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          credential: recoveryCredential.trim(),
          otp: recoveryOtp.trim(),
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg("Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay bằng mật khẩu vừa tạo.");
        if (data.username) {
          setUsername(data.username);
        }
        setPassword(newPassword);
        setMode("login");
        setRecoveryOtp("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setErrorMsg(data.error || "Không thể đặt lại mật khẩu.");
      }
    } catch {
      setErrorMsg("Lỗi kết nối máy chủ khi đặt lại mật khẩu.");
    } finally {
      setSubmitting(false);
    }
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

        {/* Title Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3.5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
            <Lock className="h-7 w-7" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {mode === "login"
              ? "Cổng quản trị hệ thống"
              : mode === "forgot_request"
              ? "Khôi phục mật khẩu Admin"
              : "Thiết lập mật khẩu mới"}
          </h1>
          <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-slate-400">
            {mode === "login"
              ? "Đăng nhập bằng tài khoản quản trị viên được cấp."
              : mode === "forgot_request"
              ? "Nhập Email hoặc Số điện thoại quản trị đã đăng ký để nhận mã xác thực OTP."
              : `Nhập mã xác thực OTP và mật khẩu mới cho tài khoản (${maskedTarget}).`}
          </p>
        </div>

        {/* Alerts & Notifications */}
        {successMsg && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-800/60 bg-emerald-950/60 p-3.5 text-xs text-emerald-200">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
            <div className="flex-1 font-medium">{successMsg}</div>
          </div>
        )}

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

        {/* ========================================================================= */}
        {/* MODE 1: LOGIN FORM                                                        */}
        {/* ========================================================================= */}
        {mode === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-4" noValidate>
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
                      placeholder="Nhập tài khoản, email hoặc SĐT"
                      required
                      autoFocus
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label htmlFor="admin-password" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Mật khẩu
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg(null);
                        setInfoMsg(null);
                        setMode("forgot_request");
                        if (username) setRecoveryCredential(username);
                      }}
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
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
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label htmlFor="admin-mfa-code" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Mã bảo mật MFA (Mặc định: 686868)
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
                    placeholder="Nhập 686868"
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
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
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
                onClick={() => {
                  setMfaStep(false);
                  setMfaCode("");
                  setErrorMsg(null);
                  setInfoMsg(null);
                }}
                className="w-full rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white cursor-pointer"
              >
                Quay lại thông tin đăng nhập
              </button>
            )}
          </form>
        )}

        {/* ========================================================================= */}
        {/* MODE 2: FORGOT PASSWORD - REQUEST OTP                                     */}
        {/* ========================================================================= */}
        {mode === "forgot_request" && (
          <form onSubmit={handleRequestOtp} className="space-y-4" noValidate>
            <div>
              <label htmlFor="recovery-credential" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                Email hoặc Số điện thoại quản trị
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  id="recovery-credential"
                  name="recoveryCredential"
                  type="text"
                  value={recoveryCredential}
                  onChange={(e) => setRecoveryCredential(e.target.value)}
                  placeholder="admin@tinhocgenz.io.vn hoặc 0332298065"
                  required
                  autoFocus
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400">
                Gợi ý: Dùng email <span className="text-blue-400">admin@tinhocgenz.io.vn</span> hoặc hotline <span className="text-blue-400">0332298065</span>.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  <span>Đang gửi mã OTP...</span>
                </>
              ) : (
                <span>Gửi mã xác thực OTP</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("login");
                setErrorMsg(null);
                setInfoMsg(null);
              }}
              className="w-full rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white cursor-pointer"
            >
              Quay lại đăng nhập
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* MODE 3: FORGOT PASSWORD - RESET WITH OTP                                  */}
        {/* ========================================================================= */}
        {mode === "forgot_reset" && (
          <form onSubmit={handleResetPassword} className="space-y-4" noValidate>
            <div>
              <label htmlFor="recovery-otp" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                Mã OTP 6 chữ số
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  id="recovery-otp"
                  name="recoveryOtp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={recoveryOtp}
                  onChange={(e) => setRecoveryOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="Nhập 6 chữ số OTP"
                  required
                  autoFocus
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-center text-lg tracking-[0.35em] text-white placeholder:text-sm placeholder:tracking-normal placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
            </div>

            <div>
              <label htmlFor="new-password" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                Mật khẩu mới (Tối thiểu 12 ký tự)
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  id="new-password"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Tối thiểu 12 ký tự"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-12 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((curr) => !curr)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:text-white cursor-pointer"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                Xác nhận mật khẩu mới
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-12 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  <span>Đang cập nhật mật khẩu...</span>
                </>
              ) : (
                <span>Xác nhận đổi mật khẩu</span>
              )}
            </button>

            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={handleRequestOtp}
                className="text-xs font-medium text-blue-400 hover:underline cursor-pointer"
              >
                Gửi lại mã OTP
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMsg(null);
                  setInfoMsg(null);
                }}
                className="text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
              >
                Quay lại đăng nhập
              </button>
            </div>
          </form>
        )}

        {/* Footer info */}
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
