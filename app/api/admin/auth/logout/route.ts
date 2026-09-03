import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth-server";
import { AuditService } from "@/lib/audit-service";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";
  const userAgent = req.headers.get("user-agent") || "";

  if (token) {
    const session = await verifySessionToken(token);
    if (session) {
      await AuditService.recordEvent({
        actorId: session.userId,
        actorUsername: session.username,
        actorRole: session.role,
        action: "LOGOUT",
        resourceType: "Auth",
        ipAddress: ip,
        userAgent,
        details: `Người dùng ${session.username} đã đăng xuất phiên làm việc an toàn.`,
        severity: "INFO",
      });
    }
  }

  const response = NextResponse.json({ success: true, message: "Đã đăng xuất thành công" });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
