import { NextRequest, NextResponse } from "next/server";
import { ContentDb } from "@/lib/content-engine/db";
import { Article } from "@/lib/content-engine/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const sourceId = searchParams.get("sourceId");
    const minScore = searchParams.get("minScore");
    const search = searchParams.get("search")?.toLowerCase().trim();

    let articles = ContentDb.getArticles();

    if (status && status !== "ALL") {
      articles = articles.filter((a) => a.status === status);
    }
    if (category && category !== "ALL") {
      articles = articles.filter(
        (a) => a.categoryId === category || a.categoryName === category
      );
    }
    if (sourceId && sourceId !== "ALL") {
      articles = articles.filter((a) => a.sourceId === sourceId);
    }
    if (minScore) {
      const scoreNum = Number(minScore);
      if (!isNaN(scoreNum)) {
        articles = articles.filter((a) => a.aiScore >= scoreNum);
      }
    }
    if (search) {
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(search) ||
          a.originalTitle.toLowerCase().includes(search) ||
          a.excerpt?.toLowerCase().includes(search) ||
          a.tags?.some((t) => t.toLowerCase().includes(search))
      );
    }

    // Sort newest first
    articles.sort(
      (a, b) =>
        new Date(b.publishedAt || b.createdAt).getTime() -
        new Date(a.publishedAt || a.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      total: articles.length,
      data: articles,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi lấy danh sách bài viết" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, error: "Tiêu đề và nội dung là bắt buộc" },
        { status: 400 }
      );
    }

    const newArticle: Article = {
      id: body.id || `art-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      sourceId: body.sourceId || "manual",
      sourceName: body.sourceName || "Tin học GenZ Editor",
      originalUrl: body.originalUrl || "",
      originalTitle: body.originalTitle || body.title,
      originalDescription: body.originalDescription || body.excerpt || "",
      originalContent: body.originalContent || body.content,

      title: body.title,
      slug: body.slug || body.title.toLowerCase().replace(/\s+/g, "-"),
      excerpt: body.excerpt || "",
      content: body.content,
      metaTitle: body.metaTitle || body.title,
      metaDescription: body.metaDescription || body.excerpt || "",
      keywords: body.keywords || [],
      categoryId: body.categoryId || "cat-ai",
      categoryName: body.categoryName || "AI & Trí tuệ nhân tạo",
      tags: body.tags || [],
      imageUrl: body.imageUrl,
      ctaText: body.ctaText,
      readingTimeMinutes: Number(body.readingTimeMinutes) || 3,

      aiScore: Number(body.aiScore) || 90,
      aiReason: body.aiReason || "Bài viết tạo thủ công bởi biên tập viên",
      aiTone: body.aiTone || "Dễ hiểu",

      status: body.status || "AI_DRAFT",
      publishedAt: body.status === "PUBLISHED" ? new Date().toISOString() : null,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const saved = ContentDb.saveArticle(newArticle);
    return NextResponse.json({ success: true, data: saved });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Lỗi tạo bài viết mới" },
      { status: 500 }
    );
  }
}
