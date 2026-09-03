import { NextRequest, NextResponse } from "next/server";
import { AuditStore } from "@/lib/audit-store";
import { authorizeAdminRequest } from "@/lib/rbac";

export async function GET(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "audit.read");
    if (!auth.authorized) {
      return auth.response;
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
