"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  Lock,
  Unlock,
  KeyRound,
  GraduationCap,
  BookOpen,
  Filter,
  RefreshCw,
  AlertTriangle
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

interface AdminUserItem {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  role: "student" | "teacher" | "academic" | "admin" | "super_admin";
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  assignedClasses?: string[];
}

export default function AdminUsersPage() {
  const { user: currentAdmin } = useAdminAuth();
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRoleTab, setActiveRoleTab] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Modal State
  const [selectedUser, setSelectedUser] = useState<AdminUserItem | null>(null);
  const [targetRole, setTargetRole] = useState<string>("");
  const [actionLoading, setActionLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeRoleTab !== "ALL") params.set("role", activeRoleTab);
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (searchQuery.trim()) params.set("search", searchQuery.trim());

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch {
      // Ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [activeRoleTab, statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleToggleStatus = async (user: AdminUserItem) => {
    if (!confirm(`Bạn có chắc chắn muốn ${user.isActive ? "KHÓA CHẶT" : "MỞ KHÓA"} tài khoản [${user.fullName}]?`)) {
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, action: "TOGGLE_STATUS" }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedbackMsg({ type: "success", text: data.message });
        fetchUsers();
      } else {
        setFeedbackMsg({ type: "error", text: data.error || "Không thể cập nhật trạng thái." });
      }
    } catch {
      setFeedbackMsg({ type: "error", text: "Lỗi kết nối máy chủ." });
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenRoleModal = (user: AdminUserItem) => {
    setSelectedUser(user);
    setTargetRole(user.role);
    setFeedbackMsg(null);
  };

  const handleSaveRole = async () => {
    if (!selectedUser || !targetRole) return;
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedUser.id, action: "UPDATE_ROLE", newRole: targetRole }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedbackMsg({ type: "success", text: data.message });
        setSelectedUser(null);
        fetchUsers();
      } else {
        setFeedbackMsg({ type: "error", text: data.error || "Không có quyền thay đổi vai trò." });
      }
    } catch {
      setFeedbackMsg({ type: "error", text: "Lỗi kết nối máy chủ." });
    } finally {
      setActionLoading(false);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1"><ShieldAlert size={11} /> Super Admin</span>;
      case "admin":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1"><ShieldCheck size={11} /> Quản Trị</span>;
      case "academic":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1"><BookOpen size={11} /> Giáo Vụ</span>;
      case "teacher":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1"><Users size={11} /> Giảng Viên</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center gap-1"><GraduationCap size={11} /> Học Viên</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Users size={22} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Quản Lý Người Dùng & Phân Quyền Bốn Cổng
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Kiểm soát tài khoản, thăng cấp vai trò RBAC và khóa chặt truy cập theo nguyên tắc Deny-By-Default
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchUsers}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all border border-slate-700/60 self-start sm:self-auto"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          <span>Làm Mới Dữ Liệu</span>
        </button>
      </div>

      {/* Alert banner */}
      {feedbackMsg && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm font-medium flex items-center justify-between gap-3 ${
            feedbackMsg.type === "success"
              ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
              : "bg-rose-950/60 border-rose-500/40 text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedbackMsg.type === "success" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
            <span>{feedbackMsg.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackMsg(null)}
            className="text-xs font-bold underline opacity-80 hover:opacity-100"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Filter Tabs & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
        {/* Role Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "ALL", label: "Tất Cả Người Dùng", icon: Users },
            { id: "student", label: "Học Viên", icon: GraduationCap },
            { id: "teacher", label: "Giảng Viên", icon: Users },
            { id: "academic", label: "Giáo Vụ", icon: BookOpen },
            { id: "admin", label: "Quản Trị / Super Admin", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeRoleTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveRoleTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Status Filter Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <form onSubmit={handleSearch} className="relative flex-1 w-full">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Tìm theo họ tên, username, email, số điện thoại..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </form>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">Mọi trạng thái</option>
              <option value="ACTIVE">Đang hoạt động</option>
              <option value="INACTIVE">Đã khóa tài khoản</option>
            </select>

            <button
              type="button"
              onClick={fetchUsers}
              className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shrink-0"
            >
              Lọc Dữ Liệu
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Tài Khoản / Họ Tên</th>
                <th className="py-3.5 px-4">Vai Trò Hệ Thống</th>
                <th className="py-3.5 px-4">Liên Hệ</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4">Lần Đăng Nhập Cuối</th>
                <th className="py-3.5 px-4 text-right">Thao Tác Bảo Mật</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-blue-500" />
                    Đang tải danh sách tài khoản...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    Không tìm thấy người dùng nào phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{u.fullName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">@{u.username}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      {getRoleBadge(u.role)}
                      {u.assignedClasses && u.assignedClasses.length > 0 && (
                        <div className="text-[10px] text-slate-400 mt-1 max-w-[200px] truncate">
                          Lớp: {u.assignedClasses.join(", ")}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-300">{u.email}</div>
                      <div className="text-[11px] text-slate-500">{u.phone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      {u.isActive ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 size={12} /> Hoạt động
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          <XCircle size={12} /> Đã khóa
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {new Date(u.lastLogin).toLocaleString("vi-VN")}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenRoleModal(u)}
                          disabled={actionLoading}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-[11px] font-bold border border-blue-500/30 transition-all flex items-center gap-1"
                          title="Thay đổi vai trò người dùng (Chỉ Super Admin)"
                        >
                          <KeyRound size={12} />
                          <span>Phân Quyền</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleStatus(u)}
                          disabled={actionLoading || u.role === "super_admin"}
                          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-all flex items-center gap-1 ${
                            u.isActive
                              ? "bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border-rose-500/30"
                              : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/30"
                          } ${u.role === "super_admin" ? "opacity-30 cursor-not-allowed" : ""}`}
                          title={u.isActive ? "Khóa tài khoản này" : "Mở khóa tài khoản"}
                        >
                          {u.isActive ? <Lock size={12} /> : <Unlock size={12} />}
                          <span>{u.isActive ? "Khóa" : "Mở"}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Assignment Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <KeyRound size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Phân Quyền & Thăng Cấp Vai Trò</h3>
                <p className="text-xs text-slate-400">Người dùng: {selectedUser.fullName} (@{selectedUser.username})</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 block">
                Chọn vai trò mới cho tài khoản:
              </label>
              <div className="space-y-2">
                {[
                  { value: "student", label: "Học Viên (Student Portal)", desc: "Chỉ xem khóa học đã mua, lịch học, điểm cá nhân" },
                  { value: "teacher", label: "Giảng Viên (Teacher Portal)", desc: "Quản lý lớp được phân công, điểm danh, chấm bài" },
                  { value: "academic", label: "Giáo Vụ (Academic Portal)", desc: "Xếp lớp, phân công giảng viên, duyệt chứng chỉ" },
                  { value: "admin", label: "Quản Trị Viên (Admin Portal)", desc: "Giám sát hệ thống, quản lý doanh thu, xem audit log" },
                  { value: "super_admin", label: "Super Admin (Tối Cao)", desc: "Toàn quyền hệ thống, thay đổi vai trò người dùng khác" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      targetRole === opt.value
                        ? "bg-blue-600/20 border-blue-500 text-white"
                        : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={opt.value}
                      checked={targetRole === opt.value}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="mt-1 text-blue-600 focus:ring-0"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-200">{opt.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] flex items-center gap-2">
              <AlertTriangle size={15} className="shrink-0" />
              <span>Hành động thay đổi vai trò sẽ được ghi vĩnh viễn vào hệ thống Audit Log.</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              >
                Hủy Bỏ
              </button>
              <button
                type="button"
                onClick={handleSaveRole}
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-lg shadow-blue-600/30"
              >
                {actionLoading ? "Đang cập nhật..." : "Xác Nhận Cập Nhật"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
