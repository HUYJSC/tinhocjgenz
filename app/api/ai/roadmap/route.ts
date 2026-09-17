import { NextRequest, NextResponse } from "next/server";
import { AiRagService, PathwayCriteria } from "@/lib/ai-rag-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const criteria: PathwayCriteria = body.criteria || {};

    const roadmap = AiRagService.generateRoadmap(criteria);

    return NextResponse.json({
      success: true,
      roadmap,
    });
  } catch (err) {
    console.error("AI Roadmap Generation Error:", err);
    return NextResponse.json(
      { success: false, error: "Không thể tạo lộ trình đào tạo lúc này." },
      { status: 500 }
    );
  }
}

