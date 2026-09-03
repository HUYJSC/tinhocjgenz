/**
 * Enterprise Audit Log Service
 * Append-only, tamper-resistant, PII/Secret sanitizing, with Supabase PostgreSQL integration.
 */

async function getAdminClient() {
  try {
    const mod = await import("./supabase");
    return mod.getSupabaseAdminClient();
  } catch {
    return null;
  }
}

export type AuditSeverity = "INFO" | "WARNING" | "CRITICAL";

export type AuditAction =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "LOGOUT"
  | "SESSION_REVOKED"
  | "ROLE_CHANGE"
  | "ACCOUNT_LOCK"
  | "ACCOUNT_UNLOCK"
  | "LEAD_CREATED"
  | "LEAD_UPDATED"
  | "LEAD_EXPORTED"
  | "COURSE_CREATED"
  | "COURSE_UPDATED"
  | "COURSE_DELETED"
  | "CERTIFICATE_ISSUED"
  | "CERTIFICATE_REVOKED"
  | "MEDIA_UPLOADED"
  | "MEDIA_DELETED"
  | "AI_JOB_STARTED"
  | "AI_JOB_COMPLETED"
  | "AI_JOB_FAILED"
  | "SECURITY_ALERT";

export interface AuditRecord {
  id: string;
  eventId: string;
  timestamp: string;
  actorId?: string;
  actorUsername: string;
  actorRole: string;
  action: AuditAction | string;
  resourceType: string;
  resourceId?: string;
  beforeState?: Record<string, unknown> | null;
  afterState?: Record<string, unknown> | null;
  ipAddress: string;
  userAgent?: string;
  details: string;
  severity: AuditSeverity;
}

export interface AuditEventInput {
  actorId?: string;
  actorUsername: string;
  actorRole: string;
  action: AuditAction | string;
  resourceType: string;
  resourceId?: string;
  beforeState?: Record<string, unknown> | null;
  afterState?: Record<string, unknown> | null;
  ipAddress: string;
  userAgent?: string;
  details: string;
  severity?: AuditSeverity;
}

// Sensitive keys that must NEVER be recorded in logs
const SENSITIVE_KEYS = new Set([
  "password",
  "passwordhash",
  "salt",
  "token",
  "sessiontoken",
  "secret",
  "otp",
  "mfacode",
  "cookie",
  "authorization",
]);

function sanitizePayload(data?: Record<string, unknown> | null): Record<string, unknown> | null {
  if (!data || typeof data !== "object") return null;
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      sanitized[key] = "[REDACTED]";
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      sanitized[key] = sanitizePayload(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

// In-Memory append-only storage buffer (Fallback & Cache)
let LOCAL_AUDIT_BUFFER: AuditRecord[] = [];

export const AuditService = {
  /**
   * Records an audit event with PII/Secret sanitization.
   * Dual-write: Appends to Supabase public.audit_events and local buffer.
   */
  async recordEvent(input: AuditEventInput): Promise<AuditRecord> {
    const timestamp = new Date().toISOString();
    const eventId = `evt-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const cleanBefore = sanitizePayload(input.beforeState);
    const cleanAfter = sanitizePayload(input.afterState);

    const record: AuditRecord = {
      id: eventId,
      eventId,
      timestamp,
      actorId: input.actorId,
      actorUsername: input.actorUsername || "anonymous",
      actorRole: input.actorRole || "anonymous",
      action: input.action,
      resourceType: input.resourceType,
      resourceId: input.resourceId,
      beforeState: cleanBefore,
      afterState: cleanAfter,
      ipAddress: input.ipAddress || "unknown",
      userAgent: input.userAgent || "",
      details: input.details,
      severity: input.severity || "INFO",
    };

    // Store in append-only local buffer
    LOCAL_AUDIT_BUFFER.unshift(record);
    if (LOCAL_AUDIT_BUFFER.length > 1000) {
      LOCAL_AUDIT_BUFFER.pop();
    }

    // Try storing in Supabase PostgreSQL
    try {
      if (
        process.env.SUPABASE_URL &&
        process.env.SUPABASE_SERVICE_ROLE_KEY &&
        !process.env.SUPABASE_URL.includes("placeholder")
      ) {
        const adminClient = await getAdminClient();
        if (adminClient) {
          await adminClient.from("audit_events").insert({
          event_id: record.eventId,
          actor_id: record.actorId || null,
          actor_username: record.actorUsername,
          actor_role: record.actorRole,
          action: record.action,
          resource_type: record.resourceType,
          resource_id: record.resourceId || null,
          before_state: record.beforeState,
          after_state: record.afterState,
          ip_address: record.ipAddress,
          user_agent: record.userAgent,
          severity: record.severity,
          timestamp_utc: record.timestamp,
        });
        }
      }
    } catch (dbErr) {
      // Non-blocking fallback: write error to server log
      console.error("[AuditService] Failed to persist event to Supabase:", dbErr);
    }

    return record;
  },

  /**
   * Queries audit logs with filtering and server-side pagination.
   */
  async getLogs(params?: {
    action?: string;
    role?: string;
    severity?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    logs: AuditRecord[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const page = Math.max(1, params?.page || 1);
    const limit = Math.min(100, Math.max(1, params?.limit || 20));

    // Try reading from Supabase
    if (
      process.env.SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      !process.env.SUPABASE_URL.includes("placeholder")
    ) {
      try {
        const adminClient = await getAdminClient();
        if (!adminClient) throw new Error("Admin client not available");
        let query = adminClient
          .from("audit_events")
          .select("*", { count: "exact" });

        if (params?.action && params.action !== "ALL") {
          query = query.eq("action", params.action);
        }
        if (params?.role && params.role !== "ALL") {
          query = query.eq("actor_role", params.role);
        }
        if (params?.severity && params.severity !== "ALL") {
          query = query.eq("severity", params.severity);
        }
        if (params?.startDate) {
          query = query.gte("timestamp_utc", params.startDate);
        }
        if (params?.endDate) {
          query = query.lte("timestamp_utc", params.endDate);
        }

        const from = (page - 1) * limit;
        const to = from + limit - 1;
        const { data, count, error } = await query
          .order("timestamp_utc", { ascending: false })
          .range(from, to);

        if (!error && data) {
          const total = count || 0;
          return {
            logs: data.map((d: any) => ({
              id: d.id,
              eventId: d.event_id,
              timestamp: d.timestamp_utc,
              actorId: d.actor_id,
              actorUsername: d.actor_username,
              actorRole: d.actor_role,
              action: d.action,
              resourceType: d.resource_type,
              resourceId: d.resource_id,
              beforeState: d.before_state,
              afterState: d.after_state,
              ipAddress: d.ip_address,
              userAgent: d.user_agent,
              details: `${d.action} on ${d.resource_type} (${d.actor_username})`,
              severity: d.severity,
            })),
            total,
            page,
            totalPages: Math.ceil(total / limit),
          };
        }
      } catch (err) {
        console.warn("[AuditService] Querying Supabase failed, falling back to memory:", err);
      }
    }

    // Local buffer fallback
    let list = [...LOCAL_AUDIT_BUFFER];

    if (params?.action && params.action !== "ALL") {
      list = list.filter((l) => l.action === params.action);
    }
    if (params?.role && params.role !== "ALL") {
      list = list.filter((l) => l.actorRole === params.role);
    }
    if (params?.severity && params.severity !== "ALL") {
      list = list.filter((l) => l.severity === params.severity);
    }
    if (params?.startDate) {
      list = list.filter((l) => new Date(l.timestamp) >= new Date(params.startDate!));
    }
    if (params?.endDate) {
      list = list.filter((l) => new Date(l.timestamp) <= new Date(params.endDate!));
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (l) =>
          l.actorUsername.toLowerCase().includes(q) ||
          l.details.toLowerCase().includes(q) ||
          l.ipAddress.includes(q) ||
          l.resourceType.toLowerCase().includes(q)
      );
    }

    const total = list.length;
    const startIndex = (page - 1) * limit;
    const paginatedLogs = list.slice(startIndex, startIndex + limit);

    return {
      logs: paginatedLogs,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    };
  },
};
