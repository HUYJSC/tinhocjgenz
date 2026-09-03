import { NextRequest, NextResponse } from "next/server";
import { AdminUsersStore, RoleType } from "@/lib/admin-users-store";
import { authorizeAdminRequest, canModifyRole, canLockAccount } from "@/lib/rbac";

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

      const result = AdminUsersStore.toggleStatus(id, auth.session.name || "Super Admin");
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

      const result = AdminUsersStore.updateRole(
        id,
        newRole as RoleType,
        auth.session.name || "Super Admin"
      );
      return NextResponse.json(result);
    }

    return NextResponse.json({ success: false, error: "Hành động không hợp lệ." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
