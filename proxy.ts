import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth-server";

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Protect Admin API Routes (Excluding Login)
  if (pathname.startsWith("/api/admin")) {
    if (
      pathname === "/api/admin/auth/login" ||
      pathname === "/api/admin/auth/session"
    ) {
      return NextResponse.next();
    }

    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Truy cập bị từ chối: Yêu cầu quyền Quản trị viên hợp lệ (401 Unauthorized)",
        },
        { status: 401 }
      );
    }
  }

  // 2. Default Next response with Security & Indexing Headers
  const res = NextResponse.next();
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "SAMEORIGIN");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Prevent indexing of admin, portal and API routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/portal") || pathname.startsWith("/api")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
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
