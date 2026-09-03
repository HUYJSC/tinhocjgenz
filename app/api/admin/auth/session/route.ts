import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth-server";
import { AdminUsersStore } from "@/lib/admin-users-store";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);

    if (!session) {
      const res = NextResponse.json({
        authenticated: false,
        user: null,
      });
      // Revoke cookie if invalid or expired
      if (token) {
        res.cookies.set({
          name: SESSION_COOKIE_NAME,
          value: "",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 0,
        });
      }
      return res;
    }

    // Check if user account was locked after session was issued
    const user = AdminUsersStore.getUserById(session.userId);
    if (user && !user.isActive) {
      const res = NextResponse.json({
        authenticated: false,
        user: null,
        error: "Tài khoản đã bị tạm khóa.",
      });
      res.cookies.set({
        name: SESSION_COOKIE_NAME,
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
      return res;
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        userId: session.userId,
        username: session.username,
        name: session.name,
        role: session.role,
        expiresAt: new Date(session.exp * 1000).toISOString(),
      },
    });
  } catch {
    return NextResponse.json({ authenticated: false, user: null });
  }
}
