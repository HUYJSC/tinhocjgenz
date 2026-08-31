import { ContentDb } from "../db";
import { Article, Source } from "../types";
import { ContentCollectorService } from "./collector";
import { DuplicateCheckerService } from "./duplicate-checker";
import { AiRelevanceEngine } from "./ai-relevance";
import { AiContentEditorService } from "./ai-editor";

export interface PipelineFetchResult {
  sourceId: string;
  sourceName: string;
  totalFetched: number;
  newArticlesCount: number;
  duplicateCount: number;
  rejectedCount: number;
  draftCount: number;
  errors: string[];
}

export class ContentPipelineService {
  // Run pipeline for a single source
  public static async runForSource(
    source: Source,
    maxItemsToProcess: number = 5
  ): Promise<PipelineFetchResult> {
    const result: PipelineFetchResult = {
      sourceId: source.id,
      sourceName: source.name,
      totalFetched: 0,
      newArticlesCount: 0,
      duplicateCount: 0,
      rejectedCount: 0,
      draftCount: 0,
      errors: [],
    };

    try {
      // 1. Collect
      const items = await ContentCollectorService.collectFromSource(source);
      result.totalFetched = items.length;

      // Update source fetch timestamp
      source.lastFetchAt = new Date().toISOString();
      source.lastSuccessAt = new Date().toISOString();
      source.lastError = null;

      const existingArticles = ContentDb.getArticles();
      const itemsToProcess = items.slice(0, maxItemsToProcess);

      for (const item of itemsToProcess) {
        try {
          // 2. Duplicate Check
          const dupResult = DuplicateCheckerService.check(item, existingArticles);
          if (dupResult.isDuplicate) {
            result.duplicateCount++;
            continue;
          }

          // 3. AI Relevance Scoring
          let aiScoreResult = {
            score: 75,
            breakdown: {
              topicRelevance: 25,
              freshness: 18,
              educationalValue: 18,
              seoPotential: 10,
              conversionPotential: 10,
            },
            category: source.category || "AI & Trí tuệ nhân tạo",
            reason: "Tin công nghệ từ nguồn uy tín",
            recommended: true,
          };

          if (source.autoProcessAi) {
            aiScoreResult = await AiRelevanceEngine.evaluate(item);
          }

          // Determine initial status based on AI Score
          let status: Article["status"] = "REVIEW";
          if (aiScoreResult.score < 60) {
            status = "REJECTED";
            result.rejectedCount++;
          } else if (aiScoreResult.score >= 80) {
            status = "AI_DRAFT";
            result.draftCount++;
          }

          // 4. AI Rewriting if eligible (score >= 60)
          let rewritten = {
            title: item.title,
            slug: AiContentEditorService.slugify(item.title),
            excerpt: item.description.slice(0, 160),
            content: item.description,
            metaTitle: item.title,
            metaDescription: item.description.slice(0, 160),
            keywords: ["Tin công nghệ", "Tin học GenZ"],
            category: aiScoreResult.category,
            tags: ["Công nghệ", "Tin học GenZ"],
            cta: AiContentEditorService.generateCta(item.title, item.description),
            readingTimeMinutes: 3,
            sourceName: item.sourceName,
            sourceUrl: item.originalUrl,
          };

          if (source.autoProcessAi && aiScoreResult.score >= 60) {
            rewritten = await AiContentEditorService.rewrite(
              item,
              "Dễ hiểu",
              aiScoreResult.category
            );
          }

          // Handle auto-publish if configured on source
          let publishedAt: string | null = null;
          if (source.autoPublish && status === "AI_DRAFT") {
            status = "PUBLISHED";
            publishedAt = new Date().toISOString();
          }

          // 5. Create Article entity
          const newArticle: Article = {
            id: `art-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            sourceId: source.id,
            sourceName: source.name,
            originalUrl: item.originalUrl,
            canonicalUrl: item.canonicalUrl || item.originalUrl,

            originalTitle: item.title,
            originalDescription: item.description,
            originalContent: item.content,
            originalAuthor: item.author,
            originalPublishedAt: item.publishedAt,

            title: rewritten.title,
            slug: rewritten.slug,
            excerpt: rewritten.excerpt,
            content: rewritten.content,
            metaTitle: rewritten.metaTitle,
            metaDescription: rewritten.metaDescription,
            keywords: rewritten.keywords,
            categoryId: "cat-ai",
            categoryName: rewritten.category,
            tags: rewritten.tags,
            imageUrl: item.image || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
            ctaText: rewritten.cta,
            readingTimeMinutes: rewritten.readingTimeMinutes,

            aiScore: aiScoreResult.score,
            aiScoreBreakdown: aiScoreResult.breakdown,
            aiReason: aiScoreResult.reason,
            aiTone: "Dễ hiểu",

            status,
            publishedAt,
            views: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          ContentDb.saveArticle(newArticle);
          existingArticles.unshift(newArticle);
          result.newArticlesCount++;
        } catch (itemErr: unknown) {
          const errMsg = itemErr instanceof Error ? itemErr.message : "Lỗi không xác định";
          result.errors.push(`Lỗi xử lý bài "${item.title.slice(0, 30)}...": ${errMsg}`);
        }
      }

      ContentDb.saveSource(source);
      ContentDb.addAuditLog({
        action: "source_fetch",
        entityType: "source",
        entityId: source.id,
        user: "Pipeline",
        details: `Đã thu thập từ "${source.name}": ${result.totalFetched} bài tìm thấy, ${result.newArticlesCount} bài mới được lưu.`,
      });

      return result;
    } catch (sourceErr: unknown) {
      source.lastFetchAt = new Date().toISOString();
      const errMsg = sourceErr instanceof Error ? sourceErr.message : "Lỗi nạp Feed";
      source.lastError = errMsg;
      ContentDb.saveSource(source);
      result.errors.push(errMsg);
      return result;
    }
  }

  // Run pipeline for all active sources
  public static async runAllActive(): Promise<PipelineFetchResult[]> {
    const sources = ContentDb.getSources().filter((s) => s.isActive && s.autoFetch);
    const results: PipelineFetchResult[] = [];

    for (const source of sources) {
      const res = await this.runForSource(source, 3);
      results.push(res);
    }

    return results;
  }
}
