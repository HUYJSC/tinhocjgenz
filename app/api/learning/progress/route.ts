import { NextRequest, NextResponse } from "next/server";
import { saveLessonProgressServer, getUserCourseProgressServer, getUserRecentActivityServer } from "@/lib/learning-store";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth-server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");
  const guestSession = req.headers.get("x-guest-session") || searchParams.get("guestSession") || "guest-default";

  // Check authenticated user session
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);
  const userId = session?.userId || guestSession;

  if (!courseId) {
    // Return recent activity across all courses
    const recent = getUserRecentActivityServer(userId);
    return NextResponse.json({
      success: true,
      recentActivity: recent,
      userId,
      isGuest: !session,
    });
  }

  const records = getUserCourseProgressServer(userId, courseId);
  const completedLessonIds = records.filter((r) => r.completed).map((r) => r.lessonId);

  return NextResponse.json({
    success: true,
    courseId,
    userId,
    isGuest: !session,
    completedLessonIds,
    records,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { courseId, lessonId, completed = true, score = 0, guestSession } = body;

    if (!courseId || typeof courseId !== "string" || !lessonId || typeof lessonId !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Dữ liệu không hợp lệ: Yêu cầu courseId và lessonId dạng chuỗi.",
        },
        { status: 400 }
      );
    }

    // Check user session or use guest identifier
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    const userId = session?.userId || guestSession || req.headers.get("x-guest-session") || "guest-default";

    const updated = saveLessonProgressServer({
      userId,
      courseId,
      lessonId,
      completed: Boolean(completed),
      score: Number(score) || 0,
    });

    return NextResponse.json({
      success: true,
      data: updated,
      isGuest: !session,
      notice: !session ? "Tiến độ đang được lưu theo phiên thiết bị hiện tại." : undefined,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Lỗi xử lý yêu cầu lưu tiến độ.",
      },
      { status: 500 }
    );
  }
}
