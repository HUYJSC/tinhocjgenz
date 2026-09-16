/** Convert an unknown thrown value to a safe, user-facing message. */
export function getErrorMessage(error: unknown, fallback = "Đã xảy ra lỗi hệ thống."): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  return fallback;
}
