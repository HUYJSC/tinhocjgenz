export interface AuditRecord {
  id: string;
  timestamp: string;
  user: string;
  role: "super_admin" | "admin" | "academic" | "teacher" | "student" | "system" | "anonymous";
  action: "LOGIN" | "LOGOUT" | "LOGIN_FAILED" | "PERMISSION_CHANGE" | "ACCOUNT_LOCK" | "ACCOUNT_UNLOCK" | "CREATE" | "UPDATE" | "DELETE";
  resourceType: string;
  resourceId: string;
  ipAddress: string;
  details: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
}

let AUDIT_LOGS: AuditRecord[] = [
  {
    id: "aud-001",
    timestamp: "2026-09-01T10:15:00+07:00",
    user: "admin_super",
    role: "super_admin",
    action: "LOGIN",
    resourceType: "Auth",
    resourceId: "auth-session-01",
    ipAddress: "127.0.0.1",
    details: "Đăng nhập phiên Quản trị tối cao Super Admin thành công qua MFA",
    severity: "INFO",
  },
  {
    id: "aud-002",
    timestamp: "2026-09-01T09:45:12+07:00",
    user: "academic_lan",
    role: "academic",
    action: "UPDATE",
    resourceType: "ClassBatch",
    resourceId: "MOS-E2019-T246",
    ipAddress: "118.70.124.55",
    details: "Phê duyệt danh sách và xếp phòng học cho 15 học viên lớp MOS Excel",
    severity: "INFO",
  },
  {
    id: "aud-003",
    timestamp: "2026-09-01T08:30:22+07:00",
    user: "teacher_huy",
    role: "teacher",
    action: "UPDATE",
    resourceType: "GradeRecord",
    resourceId: "HV-MOS-2026-089",
    ipAddress: "171.244.33.12",
    details: "Chấm điểm thực hành Word Buổi 2: Đạt 100/100 điểm kỹ năng Mail Merge",
    severity: "INFO",
  },
  {
    id: "aud-004",
    timestamp: "2026-09-01T07:12:05+07:00",
    user: "unknown",
    role: "anonymous",
    action: "LOGIN_FAILED",
    resourceType: "Auth",
    resourceId: "attacker_scan",
    ipAddress: "192.241.220.10",
    details: "Phát hiện nỗ lực dò quét mật khẩu quản trị trái phép - Hệ thống đã kích hoạt Rate Limiting",
    severity: "WARNING",
  },
  {
    id: "aud-005",
    timestamp: "2026-08-31T21:20:45+07:00",
    user: "admin_super",
    role: "super_admin",
    action: "PERMISSION_CHANGE",
    resourceType: "UserRole",
    resourceId: "teacher_lan",
    ipAddress: "127.0.0.1",
    details: "Cấp quyền Giảng viên bộ môn IC3 GS6 cho nhân sự Lan sau khi hoàn thành khảo thí",
    severity: "CRITICAL",
  },
];

export const AuditStore = {
  getLogs(filters?: {
    action?: string;
    role?: string;
    search?: string;
    severity?: string;
  }): AuditRecord[] {
    let list = [...AUDIT_LOGS];

    if (filters?.action && filters.action !== "ALL") {
      list = list.filter((l) => l.action === filters.action);
    }
    if (filters?.role && filters.role !== "ALL") {
      list = list.filter((l) => l.role === filters.role);
    }
    if (filters?.severity && filters.severity !== "ALL") {
      list = list.filter((l) => l.severity === filters.severity);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (l) =>
          l.user.toLowerCase().includes(q) ||
          l.details.toLowerCase().includes(q) ||
          l.ipAddress.includes(q) ||
          l.resourceType.toLowerCase().includes(q)
      );
    }

    return list.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },

  addLog(record: Omit<AuditRecord, "id" | "timestamp">): AuditRecord {
    const newRecord: AuditRecord = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      ...record,
    };
    AUDIT_LOGS.unshift(newRecord);
    // Keep max 500 records in memory
    if (AUDIT_LOGS.length > 500) {
      AUDIT_LOGS = AUDIT_LOGS.slice(0, 500);
    }
    return newRecord;
  },
};
