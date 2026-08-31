import { XMLParser } from "fast-xml-parser";
import { NormalizedItem, Source } from "../types";

export interface FeedDetectionResult {
  ok: boolean;
  feedType?: "RSS 2.0" | "ATOM" | "XML" | "JSON";
  title?: string;
  description?: string;
  itemCount: number;
  latestItemTitle?: string;
  sampleItems: NormalizedItem[];
  error?: string;
}

export class ContentCollectorService {
  private static USER_AGENT =
    "TinHocGenZ-ContentEngine/1.0 (+https://tinhocgenz.io.vn; admin@tinhocgenz.io.vn)";

  // Helper: Strip HTML tags to clean plain text
  public static cleanHtml(html: string): string {
    if (!html) return "";
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Extract first image URL from HTML or RSS media enclosures
  private static extractImage(item: Record<string, unknown>, rawHtml: string): string | undefined {
    const mediaContent = item["media:content"] as Record<string, unknown> | undefined;
    const mediaThumb = item["media:thumbnail"] as Record<string, unknown> | undefined;

    if (mediaContent && mediaContent["@_url"]) {
      return String(mediaContent["@_url"]);
    }
    if (mediaThumb && mediaThumb["@_url"]) {
      return String(mediaThumb["@_url"]);
    }
    // 2. Enclosure tag
    const enclosure = item.enclosure as Record<string, unknown> | undefined;
    if (enclosure && enclosure["@_url"]) {
      const url = String(enclosure["@_url"]);
      const type = String(enclosure["@_type"] || "");
      if (type.startsWith("image/") || url.match(/\.(jpg|jpeg|png|webp|avif)/i)) {
        return url;
      }
    }
    // 3. Extract <img> from content / description
    const imgMatch = rawHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch && imgMatch[1] && !imgMatch[1].includes("data:image")) {
      return imgMatch[1];
    }
    return undefined;
  }

  // Fetch raw feed XML string with timeout and user agent
  public static async fetchRaw(url: string, timeoutMs: number = 10000): Promise<string> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": this.USER_AGENT,
          Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
        },
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      return await res.text();
    } finally {
      clearTimeout(timer);
    }
  }

  // Parse and normalize raw feed string
  public static parseFeed(rawXml: string, source: Source): NormalizedItem[] {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      textNodeName: "#text",
      trimValues: true,
    });

    const parsed = parser.parse(rawXml);
    const items: NormalizedItem[] = [];

    // Case 1: RSS 2.0 (rss.channel.item)
    if (parsed.rss && parsed.rss.channel) {
      const channel = parsed.rss.channel;
      const rawItems = Array.isArray(channel.item)
        ? channel.item
        : channel.item
        ? [channel.item]
        : [];

      for (const item of rawItems) {
        const title = item.title ? (typeof item.title === "string" ? item.title : item.title["#text"] || "") : "";
        const originalUrl =
          item.link ? (typeof item.link === "string" ? item.link : item.link["#text"] || item.link["@_href"] || "") : item.guid?.["#text"] || "";
        const rawContent =
          item["content:encoded"] || item.description || item.summary || "";
        const description = this.cleanHtml(typeof rawContent === "string" ? rawContent : "");
        const image = this.extractImage(item, typeof rawContent === "string" ? rawContent : "");
        const pubDate = item.pubDate || item.date || item["dc:date"] || new Date().toISOString();

        if (title && originalUrl) {
          items.push({
            sourceId: source.id,
            sourceName: source.name,
            sourceUrl: source.url,
            originalUrl: originalUrl.trim(),
            canonicalUrl: originalUrl.trim(),
            title: this.cleanHtml(title),
            description: description.slice(0, 400),
            content: description.slice(0, 3000),
            author: item.author || item["dc:creator"] || source.name,
            publishedAt: new Date(pubDate).toISOString(),
            image,
            language: source.language || "en",
          });
        }
      }
    }
    // Case 2: ATOM (feed.entry)
    else if (parsed.feed && parsed.feed.entry) {
      const rawEntries = Array.isArray(parsed.feed.entry)
        ? parsed.feed.entry
        : [parsed.feed.entry];

      for (const entry of rawEntries) {
        const title = entry.title ? (typeof entry.title === "string" ? entry.title : entry.title["#text"] || "") : "";
        let link = "";
        if (entry.link) {
          if (Array.isArray(entry.link)) {
            const alt = entry.link.find((l: Record<string, unknown>) => l["@_rel"] === "alternate") || entry.link[0];
            link = typeof alt === "string" ? alt : String(alt?.["@_href"] || "");
          } else if (typeof entry.link === "string") {
            link = entry.link;
          } else {
            link = String(entry.link["@_href"] || "");
          }
        }

        const rawContent = entry.content || entry.summary || "";
        const contentStr = typeof rawContent === "string" ? rawContent : rawContent["#text"] || "";
        const description = this.cleanHtml(contentStr);
        const image = this.extractImage(entry, contentStr);
        const pubDate = entry.published || entry.updated || new Date().toISOString();

        if (title && link) {
          items.push({
            sourceId: source.id,
            sourceName: source.name,
            sourceUrl: source.url,
            originalUrl: link.trim(),
            canonicalUrl: link.trim(),
            title: this.cleanHtml(title),
            description: description.slice(0, 400),
            content: description.slice(0, 3000),
            author: entry.author?.name || source.name,
            publishedAt: new Date(pubDate).toISOString(),
            image,
            language: source.language || "en",
          });
        }
      }
    }

    return items;
  }

  // Test source feed connectivity & return detailed preview
  public static async testSource(source: Source): Promise<FeedDetectionResult> {
    try {
      const xml = await this.fetchRaw(source.feedUrl, 10000);
      const items = this.parseFeed(xml, source);

      const feedType: "RSS 2.0" | "ATOM" | "XML" = xml.includes("<rss")
        ? "RSS 2.0"
        : xml.includes("<feed")
        ? "ATOM"
        : "XML";

      return {
        ok: true,
        feedType,
        title: source.name,
        itemCount: items.length,
        latestItemTitle: items[0]?.title || "N/A",
        sampleItems: items.slice(0, 3),
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Không thể kết nối đến URL Feed.";
      return {
        ok: false,
        itemCount: 0,
        sampleItems: [],
        error: errorMessage,
      };
    }
  }

  // Fetch all items from a source
  public static async collectFromSource(source: Source): Promise<NormalizedItem[]> {
    const xml = await this.fetchRaw(source.feedUrl);
    return this.parseFeed(xml, source);
  }
}
