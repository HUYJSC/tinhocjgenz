import { NextRequest, NextResponse } from "next/server";
import { ContentPipelineService } from "@/lib/content-engine/services/pipeline";

export async function GET(req: NextRequest) {
  return handleCron(req);
}

export async function POST(req: NextRequest) {
  return handleCron(req);
}

async function handleCron(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const { searchParams } = new URL(req.url);
  const querySecret = searchParams.get("key") || searchParams.get("secret");

  const cronSecret = process.env.CRON_SECRET;

  // If CRON_SECRET is set in environment, enforce authentication
  if (cronSecret) {
    const isBearerValid = authHeader === `Bearer ${cronSecret}`;
    const isQueryValid = querySecret === cronSecret;

    if (!isBearerValid && !isQueryValid) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid CRON_SECRET" },
        { status: 401 }
      );
    }
  }

  try {
    const results = await ContentPipelineService.runAllActive();
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Lỗi tiến trình Cron content-fetch",
      },
      { status: 500 }
    );
  }
}
