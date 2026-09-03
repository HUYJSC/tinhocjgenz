import { AuditStore } from "./audit-store";

export type RoleType = "student" | "teacher" | "academic" | "admin" | "super_admin";

export interface AdminUserRecord {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  role: RoleType;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  assignedClasses?: string[];
  passwordHash?: string;
  salt?: string;
  mfaEnabled?: boolean;
  failedAttempts?: number;
  lockedUntil?: number;
  lockReason?: string;
}

let ADMIN_USERS: AdminUserRecord[] = [
  {
    id: "usr-01",
    username: "admin_super",
    email: "admin@tinhocgenz.io.vn",
    fullName: "Nguyễn Đình Huy (Super Admin)",
    phone: "0332298065",
    role: "super_admin",
    isActive: true,
    lastLogin: "2026-09-01T10:15:00+07:00",
    createdAt: "2026-01-01T00:00:00+07:00",
    passwordHash: "6a2e1234aeb7b4bf206446144af95f32dd8d0fb5534d90e270ddf337a17bc9a2",
    salt: "tgz_salt_super_admin_2026",
    mfaEnabled: true,
    failedAttempts: 0,
  },
  {
    id: "usr-02",
    username: "academic_lan",
    email: "giaovu.lan@tinhocgenz.io.vn",
    fullName: "Trần Thị Ngọc Lan (Phụ trách Đào tạo)",
    phone: "0988123456",
    role: "academic",
    isActive: true,
    lastLogin: "2026-09-01T09:45:00+07:00",
    createdAt: "2026-02-15T08:00:00+07:00",
    passwordHash: "b1ba93dcd50f993f417626d8e41b6e5070bf5dd06d6b988df0553a4dfc1d35f3",
    salt: "tgz_salt_academic_2026",
    mfaEnabled: false,
    failedAttempts: 0,
  },
  {
    id: "usr-03",
    username: "teacher_huy",
    email: "giangvien.huy@tinhocgenz.io.vn",
    fullName: "Thầy Huy (MOS Master Trainer)",
    phone: "0332298065",
    role: "teacher",
    isActive: true,
    lastLogin: "2026-09-01T08:30:00+07:00",
    createdAt: "2026-02-01T09:00:00+07:00",
    assignedClasses: ["MOS Excel 2019 Cấp Tốc", "Excel Thực Chiến & Dashboard"],
    passwordHash: "0fc683f9c4f0078e33bbeeb76e550bf4fff57822cd9f00530bcc55b76d07507f",
    salt: "tgz_salt_teacher_2026",
    mfaEnabled: false,
    failedAttempts: 0,
  },
  {
    id: "usr-04",
    username: "teacher_minh",
    email: "giangvien.minh@tinhocgenz.io.vn",
    fullName: "Thầy Lê Văn Minh (IC3 & CNTT)",
    phone: "0912345678",
    role: "teacher",
    isActive: true,
    lastLogin: "2026-08-31T20:15:00+07:00",
    createdAt: "2026-03-10T14:00:00+07:00",
    assignedClasses: ["IC3 Digital Literacy GS6"],
    failedAttempts: 0,
  },
  {
    id: "usr-05",
    username: "student_nam",
    email: "hoangnam.hv@gmail.com",
    fullName: "Nguyễn Hoàng Nam",
    phone: "0909112233",
    role: "student",
    isActive: true,
    lastLogin: "2026-09-01T07:45:00+07:00",
    createdAt: "2026-08-10T10:00:00+07:00",
    assignedClasses: ["MOS Master Combo 2019"],
    failedAttempts: 0,
  },
  {
    id: "usr-06",
    username: "student_mai",
    email: "thimai.hv@gmail.com",
    fullName: "Phạm Thị Mai",
    phone: "0977889900",
    role: "student",
    isActive: true,
    lastLogin: "2026-08-30T16:20:00+07:00",
    createdAt: "2026-08-12T11:30:00+07:00",
    assignedClasses: ["IC3 GS6 Chuẩn Đầu Ra ĐH"],
    failedAttempts: 0,
  },
  {
    id: "usr-07",
    username: "student_locked",
    email: "spammer.bad@gmail.com",
    fullName: "Vũ Tuấn Kiệt (Tài khoản vi phạm)",
    phone: "0966554433",
    role: "student",
    isActive: false,
    lastLogin: "2026-08-25T11:00:00+07:00",
    createdAt: "2026-08-20T09:00:00+07:00",
    lockReason: "Vi phạm quy chế thi trực tuyến",
    failedAttempts: 5,
  },
];

export const AdminUsersStore = {
  getUsers(filters?: { role?: string; search?: string; status?: string }): AdminUserRecord[] {
    let list = [...ADMIN_USERS];

    if (filters?.role && filters.role !== "ALL") {
      list = list.filter((u) => u.role === filters.role);
    }
    if (filters?.status && filters.status !== "ALL") {
      const active = filters.status === "ACTIVE";
      list = list.filter((u) => u.isActive === active);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (u) =>
          u.fullName.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.phone.includes(q)
      );
    }

    return list;
  },

  getUserById(id: string): AdminUserRecord | undefined {
    return ADMIN_USERS.find((u) => u.id === id);
  },

  findByCredential(query: string): AdminUserRecord | undefined {
    const q = query.trim().toLowerCase();
    if (!q) return undefined;
    return ADMIN_USERS.find(
      (u) => u.username.toLowerCase() === q || u.email.toLowerCase() === q
    );
  },

  recordFailedAttempt(id: string): { locked: boolean; remainingAttempts: number } {
    const user = ADMIN_USERS.find((u) => u.id === id);
    if (!user) return { locked: false, remainingAttempts: 0 };

    const current = (user.failedAttempts || 0) + 1;
    user.failedAttempts = current;

    if (current >= 5) {
      user.lockedUntil = Date.now() + 15 * 60 * 1000; // Khóa 15 phút
      return { locked: true, remainingAttempts: 0 };
    }

    return { locked: false, remainingAttempts: 5 - current };
  },

  resetFailedAttempts(id: string) {
    const user = ADMIN_USERS.find((u) => u.id === id);
    if (user) {
      user.failedAttempts = 0;
      user.lockedUntil = undefined;
    }
  },

  updateLastLogin(id: string) {
    const user = ADMIN_USERS.find((u) => u.id === id);
    if (user) {
      user.lastLogin = new Date().toISOString();
      user.failedAttempts = 0;
      user.lockedUntil = undefined;
    }
  },

  updateRole(id: string, newRole: RoleType, actor: string = "admin_super"): { success: boolean; message: string; user?: AdminUserRecord } {
    const user = ADMIN_USERS.find((u) => u.id === id);
    if (!user) {
      return { success: false, message: "Không tìm thấy người dùng." };
    }

    const oldRole = user.role;
    user.role = newRole;

    // Ghi nhận Audit Log
    AuditStore.addLog({
      user: actor,
      role: "super_admin",
      action: "PERMISSION_CHANGE",
      resourceType: "UserRole",
      resourceId: user.username,
      ipAddress: "127.0.0.1",
      details: `Thay đổi vai trò cho ${user.fullName} (${user.username}): từ [${oldRole.toUpperCase()}] sang [${newRole.toUpperCase()}]`,
      severity: "CRITICAL",
    });

    return { success: true, message: `Đã cập nhật vai trò thành công sang ${newRole.toUpperCase()}`, user };
  },

  toggleStatus(id: string, actor: string = "admin_super"): { success: boolean; message: string; user?: AdminUserRecord } {
    const user = ADMIN_USERS.find((u) => u.id === id);
    if (!user) {
      return { success: false, message: "Không tìm thấy người dùng." };
    }

    user.isActive = !user.isActive;

    // Ghi nhận Audit Log
    AuditStore.addLog({
      user: actor,
      role: "super_admin",
      action: user.isActive ? "ACCOUNT_UNLOCK" : "ACCOUNT_LOCK",
      resourceType: "UserAccount",
      resourceId: user.username,
      ipAddress: "127.0.0.1",
      details: `${user.isActive ? "Mở khóa" : "Khóa chặt"} tài khoản ${user.fullName} (${user.username})`,
      severity: user.isActive ? "INFO" : "WARNING",
    });

    return {
      success: true,
      message: user.isActive ? "Đã mở khóa tài khoản thành công." : "Đã khóa chặt tài khoản thành công.",
      user,
    };
  },
};
