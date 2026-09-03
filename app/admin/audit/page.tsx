"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ShieldAlert,
  Search,
  RefreshCw,
  User,
  Globe,
  AlertTriangle,
  KeyRound,
  Lock,
  Unlock,
  CheckCircle2,
  Database,
  ChevronLeft,
  ChevronRight,
  LogOut,
  BellRing
} from "lucide-react";

interface AuditLogItem {
  id: string;
  eventId?: string;
  timestamp: string;
  actorUsername?: string;
  user?: string;
  actorRole?: string;
  role?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  ipAddress: string;
  details: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState<string>("ALL");
  const [severityFilter, setSeverityFilter] = useState<string>("ALL");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const params = new URLSearchParams();
      if (actionFilter !== "ALL") params.set("action", actionFilter);
      if (severityFilter !== "ALL") params.set("severity", severityFilter);
      if (roleFilter !== "ALL") params.set("role", roleFilter);
      if (searchQuery.trim()) params.set("search", searchQuery.trim());
      params.set("page", page.toString());
      params.set("limit", "20");

      const res = await fetch(`/api/admin/audit?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setLogs(data.data || []);
        setTotalCount(data.total || 0);
        setTotalPages(data.totalPages || 1);
      } else {
        setFetchError(data.error || "Không thể tải danh sách nhật ký kiểm toán.");
      }
    } catch {
      setFetchError("Lỗi mất kết nối mạng máy chủ khi tải Audit Log.");
    } finally {
      setLoading(false);
    }
  }, [actionFilter, severityFilter, roleFilter, searchQuery, page]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchLogs();
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case "PERMISSION_CHANGE":
      case "ROLE_CHANGE":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <KeyRound size={11} /> Cấp Quyền / Vai Trò
          </span>
        );
      case "LOGIN_FAILED":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <AlertTriangle size={11} /> Đăng Nhập Thất Bại
          </span>
        );
      case "LOGIN":
      case "LOGIN_SUCCESS":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 size={11} /> Đăng Nhập Thành Công
          </span>
        );
      case "LOGOUT":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-slate-500/20 text-slate-300 border border-slate-500/30">
            <LogOut size={11} /> Đăng Xuất
          </span>
        );
      case "SECURITY_ALERT":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-red-600/30 text-red-300 border border-red-500/50">
            <BellRing size={11} /> Cảnh Báo Bảo Mật
          </span>
        );
      case "ACCOUNT_LOCK":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-red-500/20 text-red-300 border border-red-500/30">
            <Lock size={11} /> Khóa Tài Khoản
          </span>
        );
      case "ACCOUNT_UNLOCK":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-teal-500/20 text-teal-300 border border-teal-500/30">
            <Unlock size={11} /> Mở Khóa Tài Khoản
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <Database size={11} /> {action}
          </span>
        );
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case "CRITICAL":
        return <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-rose-950 text-rose-400 border border-rose-800">Critical</span>;
      case "WARNING":
        return <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-950 text-amber-400 border border-amber-800">Warning</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-950 text-blue-400 border border-blue-800">Info</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <ShieldAlert size={22} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Nhật Ký Bảo Mật & Truy Vết Hệ Thống (Audit Log)
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Bảo vệ toàn vẹn dữ liệu: Ghi vết thời gian thực mọi thao tác đăng nhập, cấp quyền, nhập điểm và can thiệp bảo mật
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setPage(1);
            fetchLogs();
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all border border-slate-700/60 self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          <span>Làm Mới Log</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <form onSubmit={handleSearch} className="relative w-full">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Tìm theo người thực hiện, địa chỉ IP, loại tài nguyên, chi tiết hành động..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </form>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400">Hành động:</span>
            <select
              value={actionFilter}
              onChange={(e) => {
                setActionFilter(e.target.value);
                setPage(1);
              }}
              className="h-9 px-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 focus:outline-none"
            >
              <option value="ALL">Mọi hành động</option>
              <option value="LOGIN_SUCCESS">Đăng nhập thành công</option>
              <option value="LOGIN_FAILED">Đăng nhập thất bại</option>
              <option value="LOGOUT">Đăng xuất</option>
              <option value="ROLE_CHANGE">Thay đổi vai trò / Cấp quyền</option>
              <option value="ACCOUNT_LOCK">Khóa tài khoản</option>
              <option value="ACCOUNT_UNLOCK">Mở khóa tài khoản</option>
              <option value="SECURITY_ALERT">Cảnh báo bảo mật</option>
              <option value="LEAD_UPDATED">Cập nhật Lead CRM</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400">Mức độ:</span>
            <select
              value={severityFilter}
              onChange={(e) => {
                setSeverityFilter(e.target.value);
                setPage(1);
              }}
              className="h-9 px-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 focus:outline-none"
            >
              <option value="ALL">Mọi mức độ</option>
              <option value="CRITICAL">Critical (Nghiêm trọng)</option>
              <option value="WARNING">Warning (Cảnh báo)</option>
              <option value="INFO">Info (Thông thường)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400">Vai trò:</span>
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1);
              }}
              className="h-9 px-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 focus:outline-none"
            >
              <option value="ALL">Mọi vai trò</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Quản Trị Viên</option>
              <option value="academic">Giáo Vụ</option>
              <option value="teacher">Giảng Viên</option>
              <option value="student">Học Viên</option>
              <option value="anonymous">Ẩn Danh</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              setPage(1);
              fetchLogs();
            }}
            className="h-9 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors ml-auto cursor-pointer"
          >
            Lọc Dữ Liệu
          </button>
        </div>
      </div>

      {/* Error state */}
      {fetchError && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center justify-between">
          <span>{fetchError}</span>
          <button
            type="button"
            onClick={fetchLogs}
            className="px-3 py-1 rounded-lg bg-rose-900 text-white font-bold hover:bg-rose-800 transition-colors cursor-pointer"
          >
            Thử Lại
          </button>
        </div>
      )}

      {/* Logs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Thời Gian</th>
                <th className="py-3.5 px-4">Người Thực Hiện / Vai Trò</th>
                <th className="py-3.5 px-4">Hành Động</th>
                <th className="py-3.5 px-4">Tài Nguyên / Đối Tượng</th>
                <th className="py-3.5 px-4">Địa Chỉ IP</th>
                <th className="py-3.5 px-4">Chi Tiết Sự Kiện</th>
                <th className="py-3.5 px-4 text-center">Mức Độ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-purple-500" />
                    Đang tải nhật ký kiểm toán...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    Không tìm thấy sự kiện kiểm toán nào phù hợp.
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  const actorName = log.actorUsername || log.user || "unknown";
                  const roleName = log.actorRole || log.role || "anonymous";
                  return (
                    <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                        {new Date(log.timestamp).toLocaleString("vi-VN")}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <User size={13} className="text-purple-400" />
                          <span>{actorName}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase font-mono">
                          {roleName}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {getActionBadge(log.action)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-slate-300 font-medium">{log.resourceType}</span>
                        {log.resourceId && (
                          <div className="text-[10px] text-slate-500 font-mono truncate max-w-[150px]">
                            #{log.resourceId}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 font-mono text-slate-300 text-[11px]">
                          <Globe size={11} className="text-slate-500" />
                          {log.ipAddress}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs text-slate-300 text-[11px] leading-relaxed">
                        {log.details}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {getSeverityBadge(log.severity)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 bg-slate-950/40">
          <div>
            Tổng cộng: <strong className="text-white">{totalCount}</strong> sự kiện kiểm toán
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
              aria-label="Trang trước"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-mono text-[11px]">
              Trang {page} / {totalPages || 1}
            </span>
            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
              aria-label="Trang tiếp"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
