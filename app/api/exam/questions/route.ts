import { NextResponse } from "next/server";
import { getSanitizedExamQuestions } from "@/lib/exam-engine";

export async function GET() {
  const questions = getSanitizedExamQuestions();
  return NextResponse.json({
    success: true,
    total: questions.length,
    data: questions,
  });
}
