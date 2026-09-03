import { NextRequest, NextResponse } from "next/server";
import {
  authenticateUser,
  SESSION_COOKIE_NAME,
  SESSION_EXPIRATION_SECONDS,
} from "@/lib/auth-server";

// IP Rate limiter (Max 10 requests per minute)
const IP_TRACKER = new Map<string, { count: number; resetAt: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const now = Date.now();

    // Rate limiting per IP
    const tracker = IP_TRACKER.get(ip);
    if (tracker) {
      if (tracker.resetAt > now) {
        if (tracker.count >= 10) {
          const waitSecs = Math.ceil((tracker.resetAt - now) / 1000);
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
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Xác thực thất bại.",
          remainingAttempts: result.remainingAttempts,
        },
        { status: 401 }
      );
    }

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
