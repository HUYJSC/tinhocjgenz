/**
 * Utility for normalizing Vietnamese text for case-insensitive and accent-insensitive search.
 */
export function removeVietnameseTones(str: string): string {
  if (!str) return "";
  let s = str.toLowerCase();
  s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  s = s.replace(/[đĐ]/g, "d");
  return s.trim();
}

export function matchesSearch(text: string, query: string): boolean {
  if (!query) return true;
  if (!text) return false;
  const normalizedText = removeVietnameseTones(text);
  const normalizedQuery = removeVietnameseTones(query);
  return normalizedText.includes(normalizedQuery);
}
