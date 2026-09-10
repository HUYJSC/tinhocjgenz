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
  Info,
  Crown,
  GraduationCap,
  Sparkles,
  ClipboardList,
  Check,
  HelpCircle
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login, isLoading } = useAdminAuth();

  // Mode: "quick" (1-touch login) | "manual" (manual input form)
  const [activeTab, setActiveTab] = useState<"quick" | "manual">("quick");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // MFA verification step state
  const [mfaStep, setMfaStep] = useState(false);
  const [mfaCode, setMfaCode] = useState("");

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [quickLoginRole, setQuickLoginRole] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4">
        <div className="relative">
          <div className="w-14 h-14 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-blue-400">
            <Sparkles size={20} className="animate-pulse" />
          </div>
        </div>
        <p className="text-slate-300 text-sm font-semibold mt-4">Đang kết nối Cổng Quản trị Tin Học Gen Z...</p>
        <p className="text-slate-500 text-xs mt-1">Vui lòng chờ trong giây lát</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Handle 1-Click Quick Login
  const handleQuickLogin = async (role: "super_admin" | "academic" | "teacher") => {
    setErrorMsg(null);
    setInfoMsg(null);
    setSubmitting(true);
    setQuickLoginRole(role);

    try {
      let res;
      if (role === "super_admin") {
        res = await login({
          username: "admin",
          password: "TinHocGenZ@2026!",
          mfaCode: "888666"
        });
      } else if (role === "academic") {
        res = await login({
          username: "academic_lan",
          password: "TinHocGenZ@2026!"
        });
      } else {
        res = await login({
          username: "teacher_huy",
          password: "TinHocGenZ@2026!"
        });
      }

      if (!res.success) {
        setErrorMsg(res.message || "Đăng nhập nhanh không thành công. Vui lòng thử lại.");
      }
    } catch {
      setErrorMsg("Không thể kết nối máy chủ xác thực. Vui lòng kiểm tra lại mạng.");
    } finally {
      setSubmitting(false);
      setQuickLoginRole(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    if (!username.trim() || !password) {
      setErrorMsg("Vui lòng nhập đầy đủ tài khoản và mật khẩu.");
      return;
    }

    if (mfaStep && (!mfaCode.trim() || mfaCode.trim().length !== 6)) {
      setErrorMsg("Vui lòng nhập đúng mã bảo mật MFA gồm 6 chữ số (gợi ý: 888666).");
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
        setErrorMsg(res.message || "Thông tin đăng nhập không chính xác. Bạn có thể dùng tính năng Đăng nhập nhanh.");
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

  const handleFillCredentials = (userVal: string, passVal: string) => {
    setUsername(userVal);
    setPassword(passVal);
    setActiveTab("manual");
    setInfoMsg(`Đã điền sẵn tài khoản "${userVal}". Bạn chỉ cần bấm Đăng nhập.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl bg-slate-900/90 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10">
        {/* Back Link */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Quay lại Trang chủ</span>
          </Link>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
            Tin Học Gen Z
          </span>
        </div>

        {/* Friendly Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center mx-auto mb-3.5 shadow-lg shadow-blue-500/25 ring-4 ring-blue-500/10">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
            Cổng Quản Trị Hệ Thống
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-sm mx-auto">
            Không gian làm việc dành riêng cho Ban điều hành, Giáo vụ và Giảng viên
          </p>
        </div>

        {/* Tab Selector: Quick Login vs Manual */}
        <div className="grid grid-cols-2 gap-1.5 bg-slate-950/70 p-1.5 rounded-2xl border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab("quick");
              setErrorMsg(null);
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "quick"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles size={14} />
            <span>Đăng Nhập 1-Chạm (Nhanh)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("manual");
              setErrorMsg(null);
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "manual"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <KeyRound size={14} />
            <span>Nhập Thủ Công</span>
          </button>
        </div>

        {/* Notifications */}
        {infoMsg && (
          <div className="mb-5 p-3.5 bg-blue-950/60 border border-blue-800/60 rounded-2xl flex items-start gap-3 text-xs text-blue-200">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div className="flex-1">{infoMsg}</div>
          </div>
        )}

        {errorMsg && (
          <div className="mb-5 p-3.5 bg-rose-950/60 border border-rose-800/60 rounded-2xl flex items-start gap-3 text-xs text-rose-200" role="alert">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{errorMsg}</div>
          </div>
        )}

        {/* TAB 1: QUICK 1-TOUCH LOGIN CARDS */}
        {activeTab === "quick" && (
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <span>Chọn vai trò để vào ngay:</span>
            </div>

            {/* Card 1: Super Admin */}
            <div className="group relative bg-slate-950/60 hover:bg-slate-950/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 transition-all hover:shadow-xl hover:shadow-amber-500/10">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20 shrink-0">
                    <Crown size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-white truncate">Thầy Huy (Super Admin)</span>
                      <span className="text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                        Toàn quyền
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      Quản lý tài khoản, cấu hình hệ thống & nhật ký bảo mật
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleQuickLogin("super_admin")}
                  className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 shrink-0 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {submitting && quickLoginRole === "super_admin" ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <span>Vào ngay →</span>
                  )}
                </button>
              </div>
            </div>

            {/* Card 2: Academic */}
            <div className="group relative bg-slate-950/60 hover:bg-slate-950/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-4 transition-all hover:shadow-xl hover:shadow-blue-500/10">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
                    <ClipboardList size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-white truncate">Cô Lan (Phụ trách Đào tạo)</span>
                      <span className="text-[10px] font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full">
                        Giáo vụ
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      Lịch khai giảng, khóa học, tư vấn học viên CRM & chứng chỉ
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleQuickLogin("academic")}
                  className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-all shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 shrink-0 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {submitting && quickLoginRole === "academic" ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <span>Vào ngay →</span>
                  )}
                </button>
              </div>
            </div>

            {/* Card 3: Teacher */}
            <div className="group relative bg-slate-950/60 hover:bg-slate-950/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 transition-all hover:shadow-xl hover:shadow-emerald-500/10">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
                    <GraduationCap size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-white truncate">Thầy Huy (Giảng Viên)</span>
                      <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        MOS Master
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      Xem lớp được phân công, chấm thi & kho đề thi thực chiến
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleQuickLogin("teacher")}
                  className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 shrink-0 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {submitting && quickLoginRole === "teacher" ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <span>Vào ngay →</span>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2 text-center">
              <p className="text-[11px] text-slate-500">
                Cần đăng nhập tài khoản khác? Chuyển sang thẻ <strong>Nhập Thủ Công</strong> ở trên.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: MANUAL FORM */}
        {activeTab === "manual" && (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {!mfaStep ? (
              <>
                {/* Username / Email */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="admin-username"
                      className="block text-xs font-bold text-slate-300 uppercase tracking-wider"
                    >
                      Tài khoản hoặc Email
                    </label>
                    <span className="text-[11px] text-slate-500">Gợi ý: admin, academic_lan, teacher_huy</span>
                  </div>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="admin-username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin hoặc email..."
                      required
                      autoFocus
                      className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="admin-password"
                      className="block text-xs font-bold text-slate-300 uppercase tracking-wider"
                    >
                      Mật khẩu cá nhân
                    </label>
                    <button
                      type="button"
                      onClick={() => setPassword("TinHocGenZ@2026!")}
                      className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer"
                    >
                      Điền mật khẩu mặc định
                    </button>
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="admin-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="TinHocGenZ@2026!"
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
                </div>
              </>
            ) : (
              /* Step 2: MFA Code */
              <div className="space-y-3">
                <label
                  htmlFor="admin-mfa-code"
                  className="block text-xs font-bold text-slate-300 uppercase tracking-wider"
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
                    placeholder="888666"
                    required
                    autoFocus
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-center text-lg tracking-[0.4em] font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex items-center justify-between text-xs bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Mã dự phòng: <strong className="text-amber-400 font-mono">888666</strong></span>
                  <button
                    type="button"
                    onClick={() => setMfaCode("888666")}
                    className="px-2.5 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white font-bold text-[11px] transition-all cursor-pointer"
                  >
                    Dán nhanh mã 888666
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full min-h-[46px] py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-3"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Đang đăng nhập...</span>
                </>
              ) : mfaStep ? (
                <>
                  <ShieldCheck size={16} />
                  <span>Xác nhận & Vào hệ thống</span>
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
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white font-medium text-xs transition-colors cursor-pointer"
              >
                Quay lại bước nhập tài khoản
              </button>
            )}

            {/* Helper links */}
            <div className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-400">
              <span>Hỗ trợ nhanh:</span>
              <button
                type="button"
                onClick={() => handleFillCredentials("admin", "TinHocGenZ@2026!")}
                className="text-blue-400 hover:underline"
              >
                Admin
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleFillCredentials("academic_lan", "TinHocGenZ@2026!")}
                className="text-blue-400 hover:underline"
              >
                Giáo vụ
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleFillCredentials("teacher_huy", "TinHocGenZ@2026!")}
                className="text-blue-400 hover:underline"
              >
                Giảng viên
              </button>
            </div>
          </form>
        )}

        {/* Footer info */}
        <div className="mt-6 text-center border-t border-slate-800/80 pt-4 flex items-center justify-between text-[11px] text-slate-500">
          <span>Tin Học Gen Z • Trung tâm Đào tạo & Khảo thí</span>
          <span className="flex items-center gap-1 text-slate-400">
            <HelpCircle size={12} /> Hotline: 0332.298.065
          </span>
        </div>
      </div>
    </div>
  );
}
