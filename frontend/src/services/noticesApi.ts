
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type NoticeStatus = "draft" | "published" | "archived";

export interface ApiNotice {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  body: string;
  status: NoticeStatus;
  published_at: string | null;
  created_at: string;
}

export interface CreateNoticePayload {
  title: string;
  summary?: string | null;
  body: string;
  status?: "draft" | "published";
}

export interface UpdateNoticePayload {
  title?: string;
  slug?: string;
  summary?: string | null;
  body?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  accessToken?: string
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("The API base URL is not configured.");
  }

  const headers = new Headers(options.headers);

  if (options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const result: ApiResponse<T> = await response.json();

  if (!response.ok || !result.success || result.data === undefined) {
    throw new Error(result.message || "The request could not be completed.");
  }

  return result.data;
}

// PUBLIC: Get published notices
export function getPublishedNotices(): Promise<ApiNotice[]> {
  return request<ApiNotice[]>("/notices");
}

// PUBLIC: Get one published notice
export function getNoticeBySlug(slug: string): Promise<ApiNotice> {
  return request<ApiNotice>(
    `/notices/${encodeURIComponent(slug)}`
  );
}

// STAFF: Get all notices, including drafts and archived notices
export function getManageNotices(
  accessToken: string
): Promise<ApiNotice[]> {
  return request<ApiNotice[]>("/notices/manage", {}, accessToken);
}

// STAFF: Create a notice
export function createNotice(
  accessToken: string,
  payload: CreateNoticePayload
): Promise<ApiNotice> {
  return request<ApiNotice>(
    "/notices",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    accessToken
  );
}

// STAFF: Update notice content
export function updateNotice(
  accessToken: string,
  id: string,
  payload: UpdateNoticePayload
): Promise<ApiNotice> {
  return request<ApiNotice>(
    `/notices/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
    accessToken
  );
}

// STAFF: Change notice status
export function updateNoticeStatus(
  accessToken: string,
  id: string,
  status: NoticeStatus
): Promise<ApiNotice> {
  return request<ApiNotice>(
    `/notices/${encodeURIComponent(id)}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    },
    accessToken
  );
}

// STAFF: Delete a notice (admin only)
export async function deleteNotice(
  accessToken: string,
  id: string
): Promise<void> {
  if (!API_BASE_URL) {
    throw new Error("The API base URL is not configured.");
  }

  const response = await fetch(
    `${API_BASE_URL}/notices/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const result: ApiResponse<unknown> = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Unable to delete notice.");
  }
}
