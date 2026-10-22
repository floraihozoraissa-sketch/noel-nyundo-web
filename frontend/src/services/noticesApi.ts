
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Notice {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  published_at: string;
  created_at: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

async function request<T>(path: string): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("The API base URL is not configured.");
  }

  const response = await fetch(`${API_BASE_URL}${path}`);

  const result: ApiResponse<T> = await response.json();

  if (!response.ok || !result.success || result.data === undefined) {
    throw new Error(result.message || "Unable to load notices.");
  }

  return result.data;
}

export function getPublishedNotices(): Promise<Notice[]> {
  return request<Notice[]>("/notices");
}

export function getNoticeBySlug(slug: string): Promise<Notice> {
  return request<Notice>(
    `/notices/${encodeURIComponent(slug)}`
  );
}
