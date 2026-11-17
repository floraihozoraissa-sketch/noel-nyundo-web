
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type ApplicationStatus =
  | "submitted"
  | "under_review"
  | "needs_information"
  | "accepted"
  | "rejected"
  | "withdrawn";

export interface AdmissionApplication {
  id: string;
  reference_code: string;
  student_first_name: string;
  student_middle_name: string | null;
  student_last_name: string;
  date_of_birth: string;
  gender: string | null;
  nationality: string | null;
  current_school: string | null;
  current_class: string | null;
  class_applying: string;
  residential_address: string | null;
  previous_school: string | null;
  parent_name: string;
  parent_relationship: string;
  parent_phone: string;
  parent_email: string;
  parent_address: string | null;
  father_details: Record<string, string> | null;
  mother_details: Record<string, string> | null;
  emergency_contact: Record<string, string> | null;
  status: ApplicationStatus;
  reviewed_by: string | null;
  internal_notes: string | null;
  submitted_at: string;
  reviewed_at: string | null;
}

export interface ApplicationDocument {
  id: string;
  document_type: string;
  original_file_name: string;
  mime_type: string;
  size_bytes: number;
  created_at: string;
}

export interface ApplicationPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApplicationsResult {
  applications: AdmissionApplication[];
  pagination: ApplicationPagination;
}

export interface ApplicationDetails {
  application: AdmissionApplication;
  documents: ApplicationDocument[];
}

export interface UpdateApplicationPayload {
  status?: ApplicationStatus;
  internal_notes?: string | null;
}

export interface AdmissionDocumentUrl {
  signedUrl: string;
  expiresIn: number;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

async function request<T>(
  path: string,
  accessToken: string,
  options: RequestInit = {}
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("The API base URL is not configured.");
  }

  const headers = new Headers(options.headers);

  headers.set("Authorization", `Bearer ${accessToken}`);

  if (options.body) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const result: ApiResponse<T> = await response.json();

  if (!response.ok || !result.success || result.data === undefined) {
    if (response.status === 401) {
      throw new Error("Your session is invalid or has expired.");
    }

    if (response.status === 403) {
      throw new Error("You are not authorized to manage admissions.");
    }

    throw new Error(
      result.message || "The admissions request could not be completed."
    );
  }

  return result.data;
}

export function getApplications(
  accessToken: string,
  page = 1,
  limit = 10,
  status?: ApplicationStatus
): Promise<ApplicationsResult> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (status) {
    params.set("status", status);
  }

  return request<ApplicationsResult>(
    `/admissions/manage?${params.toString()}`,
    accessToken
  );
}

export function getApplicationById(
  accessToken: string,
  id: string
): Promise<ApplicationDetails> {
  return request<ApplicationDetails>(
    `/admissions/manage/${encodeURIComponent(id)}`,
    accessToken
  );
}

export function updateApplication(
  accessToken: string,
  id: string,
  payload: UpdateApplicationPayload
): Promise<AdmissionApplication> {
  return request<AdmissionApplication>(
    `/admissions/manage/${encodeURIComponent(id)}`,
    accessToken,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    }
  );
}

// Generate a temporary secure link for an uploaded admission document.
export function getAdmissionDocumentUrl(
  accessToken: string,
  applicationId: string,
  documentId: string
): Promise<AdmissionDocumentUrl> {
  return request<AdmissionDocumentUrl>(
    `/admissions/manage/${encodeURIComponent(applicationId)}/documents/${encodeURIComponent(documentId)}/url`,
    accessToken
  );
}
