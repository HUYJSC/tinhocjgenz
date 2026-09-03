import { NextRequest, NextResponse } from "next/server";
import { AuditService } from "@/lib/audit-service";
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
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "25", 10);

    const result = await AuditService.getLogs({
      action,
      role,
      search,
      severity,
      startDate,
      endDate,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
      data: result.logs,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
