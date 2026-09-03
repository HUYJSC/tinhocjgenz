import { NextRequest, NextResponse } from "next/server";
import { SchedulesStore } from "@/lib/schedules-store";
import { authorizeAdminRequest } from "@/lib/rbac";
import { AuditService } from "@/lib/audit-service";

export async function GET(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "schedule.manage");
    if (!auth.authorized) return auth.response;

    const batches = SchedulesStore.getBatches();
    return NextResponse.json({
      success: true,
      total: batches.length,
      data: batches,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "schedule.manage");
    if (!auth.authorized) return auth.response;

    const body = await req.json();
    if (!body.batchCode || !body.courseName || !body.startDate) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập mã lớp, tên khóa học và ngày khai giảng." },
        { status: 400 }
      );
    }

    const created = SchedulesStore.createBatch({
      batchCode: body.batchCode,
      courseId: body.courseId || "general",
      courseName: body.courseName,
      courseType: body.courseType || "MOS",
      startDate: body.startDate,
      endDate: body.endDate,
      daysOfWeek: Array.isArray(body.daysOfWeek) ? body.daysOfWeek : [1, 3, 5],
      startTime: body.startTime || "19:30",
      endTime: body.endTime || "21:30",
      deliveryMode: body.deliveryMode || "ONLINE",
      roomOrMeetingUrl: body.roomOrMeetingUrl || "",
      capacity: Number(body.capacity) || 25,
      reservedCount: Number(body.reservedCount) || 0,
      enrolledCount: Number(body.enrolledCount) || 0,
      status: body.status || "OPENING",
    });

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    await AuditService.recordEvent({
      actorId: auth.session.userId,
      actorUsername: auth.session.username,
      actorRole: auth.session.role,
      action: "BATCH_CREATED",
      resourceType: "ClassBatch",
      resourceId: created.id,
      afterState: { batchCode: created.batchCode, capacity: created.capacity },
      ipAddress: ip,
      details: `${auth.session.name} đã mở lớp khai giảng mới: ${created.batchCode} (${created.courseName})`,
      severity: "INFO",
    });

    return NextResponse.json({ success: true, data: created });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "schedule.manage");
    if (!auth.authorized) return auth.response;

    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: "Thiếu ID ca học." }, { status: 400 });
    }

    const updated = SchedulesStore.updateBatch(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Không tìm thấy ca học." }, { status: 404 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    await AuditService.recordEvent({
      actorId: auth.session.userId,
      actorUsername: auth.session.username,
      actorRole: auth.session.role,
      action: "BATCH_UPDATED",
      resourceType: "ClassBatch",
      resourceId: id,
      ipAddress: ip,
      details: `${auth.session.name} đã cập nhật thông tin lớp học ${updated.batchCode}`,
      severity: "INFO",
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "schedule.manage");
    if (!auth.authorized) return auth.response;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Thiếu ID ca học." }, { status: 400 });
    }

    const ok = SchedulesStore.softDeleteBatch(id);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Không tìm thấy ca học." }, { status: 404 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    await AuditService.recordEvent({
      actorId: auth.session.userId,
      actorUsername: auth.session.username,
      actorRole: auth.session.role,
      action: "BATCH_CANCELLED",
      resourceType: "ClassBatch",
      resourceId: id,
      ipAddress: ip,
      details: `${auth.session.name} đã hủy/dừng ca học #${id}`,
      severity: "WARNING",
    });

    return NextResponse.json({ success: true, message: "Đã hủy ca học thành công." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
