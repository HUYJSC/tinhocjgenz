import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth-server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);

    if (!session) {
      return NextResponse.json({
        authenticated: false,
        user: null,
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        userId: session.userId,
        name: session.name,
        role: session.role,
        expiresAt: new Date(session.exp * 1000).toISOString(),
      },
    });
  } catch {
    return NextResponse.json({ authenticated: false, user: null });
  }
}
