// Analytics & Event Tracking Helper for Google Analytics 4, GTM, Meta Pixel, and TikTok Pixel

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
    ttq?: any;
  }
}

export interface AnalyticsEventParams {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

/**
 * Track custom event across GA4, GTM, and console (for debug)
 */
export function trackEvent(eventName: string, params: AnalyticsEventParams = {}) {
  try {
    // 1. Google Analytics (gtag)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, params);
    }

    // 2. Google Tag Manager (dataLayer)
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...params,
        timestamp: new Date().toISOString(),
      });
    }

    // 3. Meta Pixel (Facebook)
    if (typeof window !== "undefined" && window.fbq) {
      if (eventName === "lead_form_submitted") {
        window.fbq("track", "Lead", params);
      } else if (eventName === "view_course") {
        window.fbq("track", "ViewContent", params);
      } else {
        window.fbq("trackCustom", eventName, params);
      }
    }

    // 4. TikTok Pixel
    if (typeof window !== "undefined" && window.ttq) {
      if (eventName === "lead_form_submitted") {
        window.ttq.track("SubmitForm", params);
      } else {
        window.ttq.track("Click", params);
      }
    }

    // Debug log in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics] Tracked event: ${eventName}`, params);
    }
  } catch (error) {
    console.error("[Analytics] Error dispatching event:", error);
  }
}

// Predefined Business Events
export const AnalyticsEvents = {
  CALL_HOTLINE: (phone: string) =>
    trackEvent("hotline_called", { category: "Conversion", label: phone }),
  CLICK_ZALO: () =>
    trackEvent("zalo_clicked", { category: "Conversion", label: "Zalo Chat Direct" }),
  SUBMIT_LEAD: (courseName: string, studentName?: string) =>
    trackEvent("lead_form_submitted", {
      category: "Lead",
      label: courseName,
      student_name: studentName,
    }),
  START_MOCK_EXAM: (examType: string) =>
    trackEvent("mock_exam_started", { category: "Engagement", label: examType }),
  DOWNLOAD_RESOURCE: (resourceTitle: string) =>
    trackEvent("download_resource_clicked", {
      category: "LeadMagnet",
      label: resourceTitle,
    }),
  VIEW_ARTICLE: (slug: string, title: string) =>
    trackEvent("article_viewed", { category: "Content", label: slug, title }),
};
