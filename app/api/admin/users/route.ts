import { NextRequest, NextResponse } from "next/server";
import { AdminUsersStore, RoleType } from "@/lib/admin-users-store";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth-server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);

    // Chặn nếu không phải Quản trị viên
    if (!session || (session.role !== "admin" && session.role !== "super_admin")) {
      return NextResponse.json(
        { success: false, error: "Từ chối truy cập: Quyền quản trị viên bắt buộc." },
        { status: 403 }
      );
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
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);

    // Chỉ duy nhất Super Admin mới được thay đổi quyền hoặc khóa/mở khóa
    if (!session || session.role !== "super_admin") {
      return NextResponse.json(
        {
          success: false,
          error: "Từ chối truy cập: Chỉ Quản trị viên tối cao (Super Admin) mới được phép phân quyền và quản lý tài khoản.",
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { id, action, newRole } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Thiếu ID người dùng." }, { status: 400 });
    }

    if (action === "TOGGLE_STATUS") {
      const result = AdminUsersStore.toggleStatus(id, session.name || "Super Admin");
      return NextResponse.json(result);
    }

    if (action === "UPDATE_ROLE") {
      if (!newRole) {
        return NextResponse.json({ success: false, error: "Thiếu vai trò mới." }, { status: 400 });
      }
      const result = AdminUsersStore.updateRole(id, newRole as RoleType, session.name || "Super Admin");
      return NextResponse.json(result);
    }

    return NextResponse.json({ success: false, error: "Hành động không hợp lệ." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
