import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth-server";

// Cổng đăng nhập duy nhất cho toàn bộ hệ thống
const LMS_LOGIN_URL = "https://hoctructuyen.tinhocgenz.io.vn/";

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  // 1. Chặn chặt Admin API Routes (trừ Login & Session endpoint)
  if (pathname.startsWith("/api/admin")) {
    if (
      pathname === "/api/admin/auth/login" ||
      pathname === "/api/admin/auth/session"
    ) {
      return NextResponse.next();
    }

    if (!session || (session.role !== "admin" && session.role !== "super_admin")) {
      return NextResponse.json(
        {
          success: false,
          error: "Từ chối truy cập: Yêu cầu quyền Quản trị viên hợp lệ (403 Forbidden)",
        },
        { status: 403 }
      );
    }
  }

  // 2. Chặn chặt Portal Giáo vụ (/portal/academic)
  if (pathname.startsWith("/portal/academic")) {
    if (!session || (session.role !== "academic" && session.role !== "admin" && session.role !== "super_admin")) {
      return NextResponse.redirect(LMS_LOGIN_URL);
    }
  }

  // 3. Chặn chặt Portal Giảng viên (/portal/teacher)
  if (pathname.startsWith("/portal/teacher")) {
    if (!session || (session.role !== "teacher" && session.role !== "academic" && session.role !== "admin" && session.role !== "super_admin")) {
      return NextResponse.redirect(LMS_LOGIN_URL);
    }
  }

  // 4. Chặn chặt Cổng Học viên (/portal/student)
  if (pathname.startsWith("/portal/student")) {
    if (!session) {
      return NextResponse.redirect(LMS_LOGIN_URL);
    }
  }

  // 5. Default Response with Hardened Security & Anti-Indexing Headers
  const res = NextResponse.next();
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Anti-indexing & chống rò rỉ thông tin nội bộ (Deny by default)
  if (pathname.startsWith("/admin") || pathname.startsWith("/portal") || pathname.startsWith("/api")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  }

  return res;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/portal/:path*",
    "/api/:path*",
  ],
};
