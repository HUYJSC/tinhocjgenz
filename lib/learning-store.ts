/**
 * Learning Progress Store
 * Manages lesson completion, exercise scores, and resume learning activity.
 * Designed with idempotent update semantics to prevent duplicate counts.
 */

export interface LessonProgressRecord {
  courseId: string;
  lessonId: string;
  completed: boolean;
  score: number;
  completedAt: string;
  userId: string;
  updatedAt: string;
}

export interface UserCourseProgressSummary {
  courseId: string;
  totalLessons: number;
  completedLessons: number;
  percent: number;
  lastLessonId: string;
  lastLessonTitle?: string;
  lastAccessedAt: string;
}

const IN_MEMORY_PROGRESS: Record<string, LessonProgressRecord> = {};

function makeProgressKey(userId: string, courseId: string, lessonId: string): string {
  return `${userId}:${courseId}:${lessonId}`;
}

/**
 * Save or update progress for a user and lesson.
 * Idempotent: Does not double-count or corrupt state on duplicate submissions.
 */
export function saveLessonProgressServer(params: {
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
}): LessonProgressRecord {
  const { userId, courseId, lessonId, completed, score = 0 } = params;
  const key = makeProgressKey(userId, courseId, lessonId);

  const existing = IN_MEMORY_PROGRESS[key];
  const now = new Date().toISOString();

  if (existing) {
    const updated: LessonProgressRecord = {
      ...existing,
      completed: existing.completed || completed,
      score: Math.max(existing.score, score),
      updatedAt: now,
      completedAt: existing.completed ? existing.completedAt : (completed ? now : existing.completedAt),
    };
    IN_MEMORY_PROGRESS[key] = updated;
    return updated;
  }

  const record: LessonProgressRecord = {
    userId,
    courseId,
    lessonId,
    completed,
    score,
    completedAt: completed ? now : "",
    updatedAt: now,
  };
  IN_MEMORY_PROGRESS[key] = record;
  return record;
}

/**
 * Get all progress records for a user in a given course
 */
export function getUserCourseProgressServer(userId: string, courseId: string): LessonProgressRecord[] {
  const prefix = `${userId}:${courseId}:`;
  return Object.keys(IN_MEMORY_PROGRESS)
    .filter((k) => k.startsWith(prefix))
    .map((k) => IN_MEMORY_PROGRESS[k]);
}

/**
 * Get the most recent learning activity for a user across all courses
 */
export function getUserRecentActivityServer(userId: string): LessonProgressRecord | null {
  const userRecords = Object.values(IN_MEMORY_PROGRESS).filter((r) => r.userId === userId);
  if (userRecords.length === 0) return null;

  userRecords.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  return userRecords[0];
}
