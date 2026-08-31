import { NextRequest, NextResponse } from "next/server";
import { ContentDb } from "@/lib/content-engine/db";
import { AiContentEditorService, RewriteTone } from "@/lib/content-engine/services/ai-editor";
import { AiRelevanceEngine } from "@/lib/content-engine/services/ai-relevance";

export async function POST(
  req: NextRequest,
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

    const body = await req.json().catch(() => ({}));
    const action = body.action || "rewrite"; // 'score' or 'rewrite'
    const tone = (body.tone || "Dễ hiểu") as RewriteTone;

    const normalizedItem = {
      sourceId: article.sourceId,
      sourceName: article.sourceName,
      sourceUrl: article.originalUrl,
      originalUrl: article.originalUrl,
      title: article.originalTitle || article.title,
      description: article.originalDescription || article.excerpt,
      content: article.originalContent || article.content,
      publishedAt: article.originalPublishedAt || article.createdAt,
      image: article.imageUrl,
    };

    if (action === "score") {
      const scoreResult = await AiRelevanceEngine.evaluate(normalizedItem);
      article.aiScore = scoreResult.score;
      article.aiScoreBreakdown = scoreResult.breakdown;
      article.aiReason = scoreResult.reason;
      if (scoreResult.score >= 80 && article.status !== "PUBLISHED") {
        article.status = "AI_DRAFT";
      } else if (scoreResult.score < 60 && article.status !== "PUBLISHED") {
        article.status = "REJECTED";
      }
      ContentDb.saveArticle(article);
      ContentDb.addAuditLog({
        action: "ai_score",
        entityType: "article",
        entityId: id,
        user: "Admin",
        details: `Đã chấm điểm lại AI cho bài viết "${article.title}": ${scoreResult.score}/100`,
      });
      return NextResponse.json({ success: true, data: article });
    }

    // Default: Rewrite with Tone
    const rewritten = await AiContentEditorService.rewrite(
      normalizedItem,
      tone,
      article.categoryName
    );

    article.title = rewritten.title;
    article.slug = rewritten.slug;
    article.excerpt = rewritten.excerpt;
    article.content = rewritten.content;
    article.metaTitle = rewritten.metaTitle;
    article.metaDescription = rewritten.metaDescription;
    article.keywords = rewritten.keywords;
    article.tags = rewritten.tags;
    article.ctaText = rewritten.cta;
    article.readingTimeMinutes = rewritten.readingTimeMinutes;
    article.aiTone = tone;
    if (article.status === "NEW" || article.status === "FETCHED") {
      article.status = "AI_DRAFT";
    }

    ContentDb.saveArticle(article);
    ContentDb.addAuditLog({
      action: "ai_rewrite",
      entityType: "article",
      entityId: id,
      user: "Admin",
      details: `Đã viết lại bài viết bằng AI với phong cách "${tone}": ${article.title}`,
    });

    return NextResponse.json({ success: true, data: article });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi xử lý AI" },
      { status: 500 }
    );
  }
}
