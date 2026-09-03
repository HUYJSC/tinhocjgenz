import { NextRequest, NextResponse } from "next/server";
import {
  authenticateUser,
  SESSION_COOKIE_NAME,
  SESSION_EXPIRATION_SECONDS,
} from "@/lib/auth-server";
import { AuditService } from "@/lib/audit-service";

// IP Rate limiter (Max 10 requests per minute)
const IP_TRACKER = new Map<string, { count: number; resetAt: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "";
    const now = Date.now();

    // Rate limiting per IP
    const tracker = IP_TRACKER.get(ip);
    if (tracker) {
      if (tracker.resetAt > now) {
        if (tracker.count >= 10) {
          const waitSecs = Math.ceil((tracker.resetAt - now) / 1000);
          await AuditService.recordEvent({
            actorUsername: "unknown",
            actorRole: "anonymous",
            action: "SECURITY_ALERT",
            resourceType: "Auth",
            ipAddress: ip,
            userAgent,
            details: `Phát hiện nỗ lực gửi yêu cầu đăng nhập vượt ngưỡng (Rate limit: 10 req/min). Chặn tạm thời ${waitSecs}s.`,
            severity: "WARNING",
          });

          return NextResponse.json(
            {
              success: false,
              error: `Quá nhiều lượt gửi yêu cầu đăng nhập. Vui lòng chờ ${waitSecs} giây trước khi thử lại.`,
            },
            { status: 429 }
          );
        }
        tracker.count++;
      } else {
        IP_TRACKER.set(ip, { count: 1, resetAt: now + 60 * 1000 });
      }
    } else {
      IP_TRACKER.set(ip, { count: 1, resetAt: now + 60 * 1000 });
    }

    const body = await req.json();
    const credential = body.username || body.email || body.credential || "";
    const password = body.password || "";
    const mfaCode = body.mfaCode || body.otp || "";

    if (!credential || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Vui lòng nhập đầy đủ tên đăng nhập/email và mật khẩu.",
        },
        { status: 400 }
      );
    }

    const result = await authenticateUser({
      credential,
      password,
      mfaCode: mfaCode ? String(mfaCode).trim() : undefined,
      ipAddress: ip,
    });

    if (result.requireMfa) {
      return NextResponse.json({
        success: false,
        requireMfa: true,
        message: result.message || "Yêu cầu mã xác thực hai bước (MFA)",
      });
    }

    if (!result.success || !result.token) {
      await AuditService.recordEvent({
        actorUsername: credential,
        actorRole: "anonymous",
        action: "LOGIN_FAILED",
        resourceType: "Auth",
        ipAddress: ip,
        userAgent,
        details: `Đăng nhập thất bại: ${result.error || "Sai thông tin xác thực"}. Còn lại: ${result.remainingAttempts ?? "N/A"} lượt.`,
        severity: result.remainingAttempts === 0 ? "CRITICAL" : "WARNING",
      });

      return NextResponse.json(
        {
          success: false,
          error: result.error || "Xác thực thất bại.",
          remainingAttempts: result.remainingAttempts,
        },
        { status: 401 }
      );
    }

    // Record successful login in real Audit Log
    await AuditService.recordEvent({
      actorId: result.user?.userId,
      actorUsername: result.user?.username || credential,
      actorRole: result.user?.role || "admin",
      action: "LOGIN_SUCCESS",
      resourceType: "Auth",
      resourceId: result.user?.userId,
      ipAddress: ip,
      userAgent,
      details: `Đăng nhập thành công với vai trò ${result.user?.role?.toUpperCase()} qua xác thực mật khẩu chuẩn NIST và MFA.`,
      severity: "INFO",
    });

    const response = NextResponse.json({
      success: true,
      user: {
        userId: result.user?.userId,
        username: result.user?.username,
        name: result.user?.name,
        role: result.user?.role,
        loggedInAt: new Date().toISOString(),
      },
    });

    // Set secure HttpOnly cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: result.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_EXPIRATION_SECONDS,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi xử lý xác thực hệ thống" },
      { status: 500 }
    );
  }
}
