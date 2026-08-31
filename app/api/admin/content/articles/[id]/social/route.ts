import { NextRequest, NextResponse } from "next/server";
import { ContentDb } from "@/lib/content-engine/db";
import { SocialDistributionService } from "@/lib/content-engine/services/social-generator";

export async function POST(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const article = ContentDb.getArticleById(id);
    if (!article) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy bài viết" },
        { status: 404 }
      );
    }

    const posts = await SocialDistributionService.generateSocialPosts(article);
    for (const p of posts) {
      ContentDb.saveSocialPost(p);
    }

    return NextResponse.json({ success: true, data: posts });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi tạo nội dung mạng xã hội" },
      { status: 500 }
    );
  }
}
