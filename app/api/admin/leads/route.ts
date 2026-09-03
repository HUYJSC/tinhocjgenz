import { NextRequest, NextResponse } from "next/server";
import { LeadsStore, LeadStatus } from "@/lib/leads-store";
import { authorizeAdminRequest, hasPermission } from "@/lib/rbac";
import { AuditService } from "@/lib/audit-service";

export async function GET(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "lead.read");
    if (!auth.authorized) {
      return auth.response;
    }

    // Mask phone numbers if user does not have lead.export permission
    const canExport = hasPermission(auth.session.role, "lead.export");
    const leads = LeadsStore.getLeads(!canExport);

    return NextResponse.json({
      success: true,
      total: leads.length,
      canExport,
      data: leads,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "lead.update");
    if (!auth.authorized) {
      return auth.response;
    }

    const body = await req.json();
    const { id, status, activityContent, activityType } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: "Thiếu ID học viên." }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

    if (activityContent) {
      LeadsStore.addActivity(id, {
        actor: auth.session.name || "Admin",
        type: activityType || "NOTE",
        content: activityContent,
      });
    }

    if (status) {
      const updated = LeadsStore.updateStatus(id, status as LeadStatus, auth.session.name);
      if (updated) {
        await AuditService.recordEvent({
          actorId: auth.session.userId,
          actorUsername: auth.session.username,
          actorRole: auth.session.role,
          action: "LEAD_UPDATED",
          resourceType: "Lead",
          resourceId: id,
          afterState: { status },
          ipAddress: ip,
          details: `${auth.session.name} đã chuyển trạng thái Lead #${id} thành [${status}]`,
          severity: "INFO",
        });

        return NextResponse.json({ success: true, message: "Cập nhật trạng thái lead thành công" });
      }
      return NextResponse.json({ success: false, error: "Không tìm thấy lead" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Đã thêm hoạt động tư vấn mới" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "lead.update");
    if (!auth.authorized) {
      return auth.response;
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Thiếu tham số id" }, { status: 400 });
    }

    const deleted = LeadsStore.deleteLead(id);
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    await AuditService.recordEvent({
      actorId: auth.session.userId,
      actorUsername: auth.session.username,
      actorRole: auth.session.role,
      action: "LEAD_DELETED",
      resourceType: "Lead",
      resourceId: id,
      ipAddress: ip,
      details: `${auth.session.name} đã xóa học viên #${id} khỏi CRM`,
      severity: "WARNING",
    });

    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
