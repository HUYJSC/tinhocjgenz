import { NextRequest, NextResponse } from "next/server";
import { CoursesStore } from "@/lib/courses-store";
import { authorizeAdminRequest } from "@/lib/rbac";
import { AuditService } from "@/lib/audit-service";

export async function GET(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "course.read");
    if (!auth.authorized) return auth.response;

    const { searchParams } = new URL(req.url);
    const includeDeleted = searchParams.get("includeDeleted") === "true";
    const courses = CoursesStore.getCourses(includeDeleted);

    return NextResponse.json({
      success: true,
      total: courses.length,
      data: courses,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "course.create");
    if (!auth.authorized) return auth.response;

    const body = await req.json();
    if (!body.title || !body.priceAmount) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập tên khóa học và học phí." },
        { status: 400 }
      );
    }

    const created = CoursesStore.createCourse({
      code: body.code || `CRS-${Date.now()}`,
      title: body.title,
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: body.category || "mos-ic3",
      categoryName: body.categoryName || "Chứng Chỉ Quốc Tế MOS & IC3",
      tagline: body.tagline || "",
      priceAmount: Number(body.priceAmount) || 0,
      originalPriceAmount: Number(body.originalPriceAmount) || Number(body.priceAmount) * 1.2,
      currency: "VND",
      duration: body.duration || "3 - 5 buổi",
      totalSessions: Number(body.totalSessions) || 5,
      badge: body.badge || "Mới 2026",
      examCode: body.examCode || "Certiport",
      description: body.description || "",
      features: Array.isArray(body.features) ? body.features : ["Cam kết bao đỗ 100%"],
      popular: Boolean(body.popular),
      status: body.status || "DRAFT",
    });

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    await AuditService.recordEvent({
      actorId: auth.session.userId,
      actorUsername: auth.session.username,
      actorRole: auth.session.role,
      action: "COURSE_CREATED",
      resourceType: "Course",
      resourceId: created.id,
      afterState: { title: created.title, code: created.code, status: created.status },
      ipAddress: ip,
      details: `${auth.session.name} đã tạo mới khóa học: ${created.title}`,
      severity: "INFO",
    });

    return NextResponse.json({ success: true, data: created });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "course.update");
    if (!auth.authorized) return auth.response;

    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: "Thiếu ID khóa học." }, { status: 400 });
    }

    const updated = CoursesStore.updateCourse(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Không tìm thấy khóa học." }, { status: 404 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    await AuditService.recordEvent({
      actorId: auth.session.userId,
      actorUsername: auth.session.username,
      actorRole: auth.session.role,
      action: "COURSE_UPDATED",
      resourceType: "Course",
      resourceId: id,
      afterState: { updates },
      ipAddress: ip,
      details: `${auth.session.name} đã cập nhật khóa học: ${updated.title}`,
      severity: "INFO",
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "course.delete");
    if (!auth.authorized) return auth.response;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Thiếu tham số ID." }, { status: 400 });
    }

    const ok = CoursesStore.softDeleteCourse(id);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Không tìm thấy khóa học." }, { status: 404 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    await AuditService.recordEvent({
      actorId: auth.session.userId,
      actorUsername: auth.session.username,
      actorRole: auth.session.role,
      action: "COURSE_DELETED",
      resourceType: "Course",
      resourceId: id,
      ipAddress: ip,
      details: `${auth.session.name} đã chuyển khóa học #${id} vào thùng rác (soft delete).`,
      severity: "WARNING",
    });

    return NextResponse.json({ success: true, message: "Đã chuyển khóa học vào thùng rác an toàn." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
