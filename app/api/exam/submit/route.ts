import { NextRequest, NextResponse } from "next/server";
import { gradeExamAttempt } from "@/lib/exam-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const answers = body.answers || {};

    if (typeof answers !== "object") {
      return NextResponse.json(
        { success: false, error: "Dữ liệu bài làm không hợp lệ" },
        { status: 400 }
      );
    }

    const grading = gradeExamAttempt(answers);

    return NextResponse.json({
      success: true,
      data: grading,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi xử lý chấm điểm bài thi" },
      { status: 500 }
    );
  }
}
