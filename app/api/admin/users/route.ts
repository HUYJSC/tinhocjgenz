import { NextRequest, NextResponse } from "next/server";
import { AdminUsersStore, RoleType } from "@/lib/admin-users-store";
import { authorizeAdminRequest, canModifyRole, canLockAccount } from "@/lib/rbac";
import { AuditService } from "@/lib/audit-service";

export async function GET(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "user.read");
    if (!auth.authorized) {
      return auth.response;
    }

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role") || undefined;
    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status") || undefined;

    const users = AdminUsersStore.getUsers({ role, search, status });
    return NextResponse.json({
      success: true,
      total: users.length,
      data: users,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, action, newRole } = body;
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "";

    if (!id) {
      return NextResponse.json({ success: false, error: "Thiếu ID người dùng." }, { status: 400 });
    }

    const targetUser = AdminUsersStore.getUserById(id);
    if (!targetUser) {
      return NextResponse.json({ success: false, error: "Không tìm thấy người dùng." }, { status: 404 });
    }

    if (action === "TOGGLE_STATUS") {
      const auth = await authorizeAdminRequest(req, "user.lock");
      if (!auth.authorized) return auth.response;

      const check = canLockAccount(
        auth.session.userId,
        auth.session.role,
        targetUser.id,
        targetUser.role
      );

      if (!check.allowed) {
        return NextResponse.json(
          { success: false, error: check.reason || "Hành động bị từ chối." },
          { status: 403 }
        );
      }

      const willLock = targetUser.isActive;
      const result = AdminUsersStore.toggleStatus(id, auth.session.name || "Super Admin");

      // Record in Audit Log
      await AuditService.recordEvent({
        actorId: auth.session.userId,
        actorUsername: auth.session.username,
        actorRole: auth.session.role,
        action: willLock ? "ACCOUNT_LOCK" : "ACCOUNT_UNLOCK",
        resourceType: "UserAccount",
        resourceId: targetUser.id,
        beforeState: { isActive: targetUser.isActive },
        afterState: { isActive: !targetUser.isActive },
        ipAddress: ip,
        userAgent,
        details: `${auth.session.name} (${auth.session.role}) đã ${willLock ? "khóa" : "mở khóa"} tài khoản ${targetUser.username} (${targetUser.email}).`,
        severity: "CRITICAL",
      });

      return NextResponse.json(result);
    }

    if (action === "UPDATE_ROLE") {
      const auth = await authorizeAdminRequest(req, "user.role.update");
      if (!auth.authorized) return auth.response;

      if (!newRole) {
        return NextResponse.json({ success: false, error: "Thiếu vai trò mới." }, { status: 400 });
      }

      const check = canModifyRole(auth.session.role, targetUser.role, newRole as RoleType);
      if (!check.allowed) {
        return NextResponse.json(
          { success: false, error: check.reason || "Hành động bị từ chối." },
          { status: 403 }
        );
      }

      const oldRole = targetUser.role;
      const result = AdminUsersStore.updateRole(
        id,
        newRole as RoleType,
        auth.session.name || "Super Admin"
      );

      // Record in Audit Log
      await AuditService.recordEvent({
        actorId: auth.session.userId,
        actorUsername: auth.session.username,
        actorRole: auth.session.role,
        action: "ROLE_CHANGE",
        resourceType: "UserRole",
        resourceId: targetUser.id,
        beforeState: { role: oldRole },
        afterState: { role: newRole },
        ipAddress: ip,
        userAgent,
        details: `${auth.session.name} (${auth.session.role}) đã thay đổi vai trò của ${targetUser.username} từ ${oldRole} sang ${newRole}.`,
        severity: "CRITICAL",
      });

      return NextResponse.json(result);
    }

    return NextResponse.json({ success: false, error: "Hành động không hợp lệ." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
