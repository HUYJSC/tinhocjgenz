import crypto from "crypto";
import { Article, NormalizedItem } from "../types";

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  similarity: number; // 0.0 to 1.0
  duplicateOfId?: string;
  reason?: string;
}

export class DuplicateCheckerService {
  private static SIMILARITY_THRESHOLD = 0.85;

  // Compute SHA256 hash of a string
  public static sha256(text: string): string {
    return crypto.createHash("sha256").update(text.trim().toLowerCase()).digest("hex");
  }

  // Normalize string for token comparison
  private static normalizeTokens(text: string): Set<string> {
    const cleaned = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2);
    return new Set(cleaned);
  }

  // Jaccard similarity between two token sets
  public static calculateTokenSimilarity(textA: string, textB: string): number {
    const tokensA = this.normalizeTokens(textA);
    const tokensB = this.normalizeTokens(textB);

    if (tokensA.size === 0 || tokensB.size === 0) return 0;

    let intersectionCount = 0;
    for (const token of tokensA) {
      if (tokensB.has(token)) {
        intersectionCount++;
      }
    }

    const unionCount = tokensA.size + tokensB.size - intersectionCount;
    return unionCount === 0 ? 0 : intersectionCount / unionCount;
  }

  // Clean URL by stripping tracking parameters (utm_*, ref, etc.)
  public static normalizeUrl(url: string): string {
    try {
      const u = new URL(url);
      u.searchParams.delete("utm_source");
      u.searchParams.delete("utm_medium");
      u.searchParams.delete("utm_campaign");
      u.searchParams.delete("utm_content");
      u.searchParams.delete("utm_term");
      u.searchParams.delete("ref");
      u.searchParams.delete("fbclid");
      u.searchParams.delete("gclid");
      return u.origin + u.pathname;
    } catch {
      return url.split("?")[0].trim().toLowerCase();
    }
  }

  // Check if an incoming item is a duplicate against existing articles in DB
  public static check(
    incoming: NormalizedItem,
    existingArticles: Article[]
  ): DuplicateCheckResult {
    const normalizedIncomingUrl = this.normalizeUrl(incoming.originalUrl);

    for (const existing of existingArticles) {
      // 1. Direct URL match
      const existingUrl = this.normalizeUrl(existing.originalUrl);
      if (normalizedIncomingUrl === existingUrl) {
        return {
          isDuplicate: true,
          similarity: 1.0,
          duplicateOfId: existing.id,
          reason: "Trùng khớp chính xác liên kết gốc (Exact URL Match)",
        };
      }

      // 2. Exact Title Match
      if (
        incoming.title.trim().toLowerCase() ===
        existing.originalTitle.trim().toLowerCase()
      ) {
        return {
          isDuplicate: true,
          similarity: 1.0,
          duplicateOfId: existing.id,
          reason: "Trùng khớp 100% tiêu đề gốc",
        };
      }

      // 3. High Title & Content Similarity (> 85%)
      const titleSim = this.calculateTokenSimilarity(
        incoming.title,
        existing.originalTitle
      );
      if (titleSim >= this.SIMILARITY_THRESHOLD) {
        return {
          isDuplicate: true,
          similarity: titleSim,
          duplicateOfId: existing.id,
          reason: `Độ tương đồng tiêu đề cao (${Math.round(titleSim * 100)}%)`,
        };
      }
    }

    return {
      isDuplicate: false,
      similarity: 0,
    };
  }
}
