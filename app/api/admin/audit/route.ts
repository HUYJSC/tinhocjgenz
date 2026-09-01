import { NextRequest, NextResponse } from "next/server";
import { AuditStore } from "@/lib/audit-store";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth-server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);

    // Chặn nếu không phải Quản trị viên
    if (!session || (session.role !== "admin" && session.role !== "super_admin")) {
      return NextResponse.json(
        { success: false, error: "Từ chối truy cập: Chỉ Quản trị viên mới được phép xem nhật ký Audit Log." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action") || undefined;
    const role = searchParams.get("role") || undefined;
    const search = searchParams.get("search") || undefined;
    const severity = searchParams.get("severity") || undefined;

    const logs = AuditStore.getLogs({ action, role, search, severity });
    return NextResponse.json({
      success: true,
      total: logs.length,
      data: logs,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
