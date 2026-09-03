/**
 * Core RBAC & Authorization Rules (Framework-agnostic & Pure)
 */

export type RoleType = "student" | "teacher" | "academic" | "admin" | "super_admin";

export type Permission =
  // Khóa học
  | "course.read"
  | "course.create"
  | "course.update"
  | "course.delete"
  // Lịch học & Khai giảng
  | "schedule.manage"
  // CRM Tiếp nhận học viên
  | "lead.read"
  | "lead.update"
  | "lead.export"
  // Kho Media & Đề thi
  | "media.upload"
  | "media.download"
  | "media.delete"
  // CMS Bài viết & Tin tức
  | "post.create"
  | "post.review"
  | "post.publish"
  // Quản lý người dùng & Phân quyền
  | "user.read"
  | "user.role.update"
  | "user.lock"
  // Nhật ký bảo mật Audit Log
  | "audit.read"
  // Kết quả & Chứng nhận học viên
  | "certificate.issue"
  | "certificate.revoke";

/**
 * Role to Permissions Matrix (Deny by default)
 */
export const ROLE_PERMISSIONS_MAP: Record<RoleType, Permission[]> = {
  super_admin: [
    "course.read",
    "course.create",
    "course.update",
    "course.delete",
    "schedule.manage",
    "lead.read",
    "lead.update",
    "lead.export",
    "media.upload",
    "media.download",
    "media.delete",
    "post.create",
    "post.review",
    "post.publish",
    "user.read",
    "user.role.update",
    "user.lock",
    "audit.read",
    "certificate.issue",
    "certificate.revoke",
  ],
  admin: [
    "course.read",
    "course.create",
    "course.update",
    "course.delete",
    "schedule.manage",
    "lead.read",
    "lead.update",
    "lead.export",
    "media.upload",
    "media.download",
    "media.delete",
    "post.create",
    "post.review",
    "post.publish",
    "user.read",
    "user.role.update",
    "user.lock",
    "audit.read",
    "certificate.issue",
  ],
  academic: [
    "course.read",
    "course.create",
    "course.update",
    "schedule.manage",
    "lead.read",
    "lead.update",
    "lead.export",
    "media.upload",
    "media.download",
    "post.create",
    "post.review",
    "user.read",
    "certificate.issue",
  ],
  teacher: [
    "course.read",
    "schedule.manage",
    "media.download",
    "certificate.issue",
  ],
  student: [
    "course.read",
    "media.download",
  ],
};

/**
 * Checks if a specific role possesses the required permission
 */
export function hasPermission(role: RoleType, permission: Permission): boolean {
  if (role === "super_admin") return true;
  const permissions = ROLE_PERMISSIONS_MAP[role] || [];
  return permissions.includes(permission);
}

/**
 * Rules for role updates (Privilege escalation prevention)
 */
export function canModifyRole(
  actorRole: RoleType,
  targetCurrentRole: RoleType,
  targetNewRole: RoleType,
  activeSuperAdminCount: number = 1
): { allowed: boolean; reason?: string } {
  // Only Admin and Super Admin can update roles
  if (actorRole !== "super_admin" && actorRole !== "admin") {
    return {
      allowed: false,
      reason: "Chỉ Quản trị viên và Quản trị viên tối cao mới có quyền phân quyền người dùng.",
    };
  }

  // Only Super Admin can grant or revoke Super Admin
  if (
    (targetNewRole === "super_admin" || targetCurrentRole === "super_admin") &&
    actorRole !== "super_admin"
  ) {
    return {
      allowed: false,
      reason: "Chỉ Quản trị viên tối cao mới có quyền chỉ định hoặc hạ quyền Super Admin.",
    };
  }

  // Prevent demoting the last Super Admin
  if (targetCurrentRole === "super_admin" && targetNewRole !== "super_admin") {
    if (activeSuperAdminCount <= 1) {
      return {
        allowed: false,
        reason: "Không thể hạ quyền Super Admin cuối cùng đang hoạt động trong hệ thống.",
      };
    }
  }

  return { allowed: true };
}

/**
 * Rules for account locking
 */
export function canLockAccount(
  actorId: string,
  actorRole: RoleType,
  targetId: string,
  targetRole: RoleType
): { allowed: boolean; reason?: string } {
  // Prevent self-lock
  if (actorId === targetId) {
    return {
      allowed: false,
      reason: "Bạn không thể tự khóa tài khoản của chính mình.",
    };
  }

  // Only Admin and Super Admin can lock accounts
  if (actorRole !== "super_admin" && actorRole !== "admin") {
    return {
      allowed: false,
      reason: "Chỉ Quản trị viên mới có quyền khóa tài khoản người dùng.",
    };
  }

  // Cannot lock Super Admin unless actor is Super Admin
  if (targetRole === "super_admin" && actorRole !== "super_admin") {
    return {
      allowed: false,
      reason: "Không được phép khóa tài khoản của Quản trị viên tối cao.",
    };
  }

  return { allowed: true };
}
