import { NextRequest, NextResponse } from "next/server";
import {
  verifyAdminCredentials,
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_EXPIRATION_SECONDS,
} from "@/lib/auth-server";

// In-memory rate limiting tracker (per IP)
const ATTEMPTS_MAP = new Map<string, { count: number; lockedUntil: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const now = Date.now();
    const tracker = ATTEMPTS_MAP.get(ip);

    if (tracker && tracker.lockedUntil > now) {
      const waitSeconds = Math.ceil((tracker.lockedUntil - now) / 1000);
      return NextResponse.json(
        {
          success: false,
          error: `Quá nhiều lần thử thất bại. Vui lòng chờ ${waitSeconds} giây trước khi thử lại.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const key = body.key || body.password || "";

    if (!key) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập mật mã quản trị." },
        { status: 400 }
      );
    }

    const result = verifyAdminCredentials(key);

    if (!result.valid) {
      // Record failed attempt
      const prevCount = (tracker?.lockedUntil || 0) > now ? tracker?.count || 0 : (tracker?.count || 0);
      const newCount = prevCount + 1;
      const lockedUntil = newCount >= 5 ? now + 15 * 60 * 1000 : 0; // Lock 15 mins after 5 failures

      ATTEMPTS_MAP.set(ip, { count: newCount, lockedUntil });

      return NextResponse.json(
        {
          success: false,
          error: "Khóa bảo mật hoặc mật khẩu quản trị không chính xác!",
          remainingAttempts: Math.max(0, 5 - newCount),
        },
        { status: 401 }
      );
    }

    // Success: clear attempts
    ATTEMPTS_MAP.delete(ip);

    const token = await createSessionToken({
      userId: `admin-${Date.now()}`,
      name: result.name,
      role: result.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        name: result.name,
        role: result.role,
        loggedInAt: new Date().toISOString(),
      },
    });

    // Set secure HttpOnly cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_EXPIRATION_SECONDS,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi xử lý xác thực" },
      { status: 500 }
    );
  }
}
