
const API_BASE_URL = (
  import.meta as ImportMeta & { env: { VITE_API_BASE_URL?: string } }
).env.VITE_API_BASE_URL;

export type ContactMessageStatus = "new" | "in_progress" | "handled";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: ContactMessageStatus;
  handled_by: string | null;
  handled_at: string | null;
  created_at: string;
}

export interface ContactMessagesResult {
  messages: ContactMessage[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  statistics: {
    new: number;
    in_progress: number;
    handled: number;
  };
}

export interface ContactSubmission {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

function getApiUrl(): string {
  if (!API_BASE_URL) {
    throw new Error("The API base URL is not configured.");
  }

  return API_BASE_URL;
}

// PUBLIC: Submit a contact message.
export async function submitContactMessage(
  submission: ContactSubmission
): Promise<{ id: string }> {
  const response = await fetch(`${getApiUrl()}/contact/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: submission.fullName,
      email: submission.email,
      phone: submission.phone?.trim() || null,
      subject: submission.subject,
      message: submission.message,
    }),
  });

  const result: ApiResponse<{ id: string }> = await response.json();

  if (!response.ok || !result.success || !result.data) {
    throw new Error(
      result.message || "Unable to submit your message. Please try again."
    );
  }

  return result.data;
}

// ADMIN: Retrieve contact messages with optional status filtering.
export async function getContactMessages(
  accessToken: string,
  page = 1,
  limit = 10,
  status?: ContactMessageStatus
): Promise<ContactMessagesResult> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (status) {
    params.set("status", status);
  }

  const response = await fetch(
    `${getApiUrl()}/contact/manage?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const result: ApiResponse<ContactMessagesResult> =
    await response.json();

  if (!response.ok || !result.success || !result.data) {
    throw new Error(
      result.message || "Unable to retrieve contact messages."
    );
  }

  return result.data;
}

// ADMIN: Update a contact message's status.
export async function updateContactMessageStatus(
  accessToken: string,
  messageId: string,
  status: ContactMessageStatus
): Promise<ContactMessage> {
  const response = await fetch(
    `${getApiUrl()}/contact/manage/${encodeURIComponent(messageId)}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  const result: ApiResponse<ContactMessage> = await response.json();

  if (!response.ok || !result.success || !result.data) {
    throw new Error(
      result.message || "Unable to update the contact message."
    );
  }

  return result.data;
}
