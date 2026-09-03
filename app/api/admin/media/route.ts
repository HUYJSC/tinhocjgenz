import { NextRequest, NextResponse } from "next/server";
import { MediaStore } from "@/lib/media-store";
import { authorizeAdminRequest } from "@/lib/rbac";
import { AuditService } from "@/lib/audit-service";

export async function GET(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "media.download");
    if (!auth.authorized) return auth.response;

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const files = MediaStore.getFiles(category);
    const totalBytes = MediaStore.getTotalStorageBytes();

    return NextResponse.json({
      success: true,
      total: files.length,
      totalStorageBytes: totalBytes,
      totalStorageFormatted: MediaStore.formatBytes(totalBytes),
      data: files,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "media.upload");
    if (!auth.authorized) return auth.response;

    const body = await req.json();
    const { originalFilename, mimeType, fileSizeBytes, category } = body;

    if (!originalFilename || !fileSizeBytes) {
      return NextResponse.json(
        { success: false, error: "Vui lòng cung cấp tên tệp và dung lượng hợp lệ." },
        { status: 400 }
      );
    }

    const result = MediaStore.registerFile({
      originalFilename,
      mimeType: mimeType || "application/octet-stream",
      fileSizeBytes: Number(fileSizeBytes),
      category: category || "general",
      uploadedBy: auth.session.username,
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    await AuditService.recordEvent({
      actorId: auth.session.userId,
      actorUsername: auth.session.username,
      actorRole: auth.session.role,
      action: "MEDIA_UPLOADED",
      resourceType: "MediaFile",
      resourceId: result.file.id,
      afterState: { filename: result.file.originalFilename, size: result.file.fileSizeBytes },
      ipAddress: ip,
      details: `${auth.session.name} đã tải lên tệp: ${result.file.originalFilename} (${MediaStore.formatBytes(result.file.fileSizeBytes)})`,
      severity: "INFO",
    });

    return NextResponse.json({ success: true, data: result.file });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await authorizeAdminRequest(req, "media.delete");
    if (!auth.authorized) return auth.response;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Thiếu ID tệp." }, { status: 400 });
    }

    const ok = MediaStore.deleteFile(id);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Không tìm thấy tệp." }, { status: 404 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    await AuditService.recordEvent({
      actorId: auth.session.userId,
      actorUsername: auth.session.username,
      actorRole: auth.session.role,
      action: "MEDIA_DELETED",
      resourceType: "MediaFile",
      resourceId: id,
      ipAddress: ip,
      details: `${auth.session.name} đã xóa tệp #${id} khỏi kho tài liệu`,
      severity: "WARNING",
    });

    return NextResponse.json({ success: true, message: "Đã xóa tệp thành công." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
