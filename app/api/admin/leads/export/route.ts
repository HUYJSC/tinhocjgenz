import { NextRequest, NextResponse } from "next/server";
import { LeadsStore } from "@/lib/leads-store";
import { authorizeAdminRequest } from "@/lib/rbac";
import { AuditService } from "@/lib/audit-service";

export async function GET(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "lead.export");
    if (!auth.authorized) {
      return auth.response;
    }

    const leads = LeadsStore.getLeads(false); // Unmasked for export
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

    // Record audit event for PII export
    await AuditService.recordEvent({
      actorId: auth.session.userId,
      actorUsername: auth.session.username,
      actorRole: auth.session.role,
      action: "LEAD_EXPORTED",
      resourceType: "LeadList",
      ipAddress: ip,
      details: `${auth.session.name} đã xuất danh sách toàn bộ ${leads.length} học viên CRM ra file CSV.`,
      severity: "WARNING",
    });

    // Generate CSV with UTF-8 BOM for Excel
    const headers = ["ID", "Họ và Tên", "Số Điện Thoại", "Email", "Khóa Học Quan Tâm", "Trường/Đơn Vị", "Trạng Thái", "Ngày Đăng Ký", "Ghi Chú"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${(l.email || "").replace(/"/g, '""')}"`,
      `"${l.course.replace(/"/g, '""')}"`,
      `"${(l.university || "").replace(/"/g, '""')}"`,
      l.status,
      l.date,
      `"${(l.note || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="tinhocgenz-leads-${Date.now()}.csv"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
