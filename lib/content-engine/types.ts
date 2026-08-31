export type SourceType = "RSS" | "ATOM" | "XML" | "API" | "CRAWLER";
export type SourcePriority = "LOW" | "NORMAL" | "HIGH" | "OFFICIAL";

export type ArticleStatus =
  | "NEW"
  | "FETCHED"
  | "FILTERED"
  | "AI_PROCESSING"
  | "AI_DRAFT"
  | "REVIEW"
  | "APPROVED"
  | "SCHEDULED"
  | "PUBLISHED"
  | "REJECTED"
  | "DUPLICATE"
  | "FAILED";

export interface Source {
  id: string;
  name: string;
  url: string;
  feedUrl: string;
  sourceType: SourceType;
  category: string;
  language: string;
  priority: SourcePriority;
  isActive: boolean;
  autoFetch: boolean;
  autoProcessAi: boolean;
  autoPublish: boolean;
  fetchInterval: number; // minutes
  lastFetchAt?: string | null;
  lastSuccessAt?: string | null;
  lastError?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  order: number;
  isActive: boolean;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface NormalizedItem {
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  originalUrl: string;
  canonicalUrl?: string;
  title: string;
  description: string;
  content: string;
  author?: string;
  publishedAt: string;
  image?: string;
  language?: string;
}

export interface AiScoreResult {
  score: number; // 0 - 100
  breakdown: {
    topicRelevance: number; // max 30
    freshness: number; // max 20
    educationalValue: number; // max 20
    seoPotential: number; // max 15
    conversionPotential: number; // max 15
  };
  category: string;
  reason: string;
  recommended: boolean;
}

export interface AiContentResult {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Structured Markdown / HTML
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  tags: string[];
  cta: string;
  readingTimeMinutes: number;
  sourceName: string;
  sourceUrl: string;
}

export interface Article {
  id: string;
  sourceId: string;
  sourceName: string;
  originalUrl: string;
  canonicalUrl?: string;

  // Raw Content
  originalTitle: string;
  originalDescription: string;
  originalContent: string;
  originalAuthor?: string;
  originalPublishedAt?: string;

  // AI Rewritten & SEO Content
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  categoryId: string;
  categoryName: string;
  tags: string[];
  imageUrl?: string;
  ctaText?: string;
  readingTimeMinutes?: number;

  // AI Evaluation
  aiScore: number;
  aiScoreBreakdown?: {
    topicRelevance: number;
    freshness: number;
    educationalValue: number;
    seoPotential: number;
    conversionPotential: number;
  };
  aiReason?: string;
  aiTone?: string;

  // Lifecycle
  status: ArticleStatus;
  publishedAt?: string | null;
  scheduledAt?: string | null;
  views?: number;
  duplicateOfId?: string | null;
  errorMessage?: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  action:
    | "source_add"
    | "source_edit"
    | "source_delete"
    | "source_fetch"
    | "ai_score"
    | "ai_generate"
    | "ai_rewrite"
    | "article_edit"
    | "approve"
    | "reject"
    | "publish"
    | "schedule"
    | "delete";
  entityType: "source" | "article" | "system";
  entityId: string;
  user: string;
  ip?: string;
  details: string;
  timestamp: string;
}

export interface SocialPost {
  id: string;
  articleId: string;
  platform: "facebook" | "zalo" | "telegram";
  content: string;
  status: "DRAFT" | "READY" | "PUBLISHED" | "FAILED";
  scheduledAt?: string | null;
  publishedAt?: string | null;
  error?: string | null;
  createdAt: string;
}

export interface ContentEngineMetrics {
  totalSources: number;
  activeSources: number;
  totalArticles: number;
  fetchedToday: number;
  newCount: number;
  aiDraftCount: number;
  reviewCount: number;
  approvedCount: number;
  scheduledCount: number;
  publishedCount: number;
  rejectedCount: number;
  duplicateCount: number;
  errorCount: number;
  avgAiScore: number;
}
