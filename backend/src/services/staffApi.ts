
const API_BASE_URL = (
  import.meta as ImportMeta & { env: { VITE_API_BASE_URL?: string } }
).env.VITE_API_BASE_URL;

export interface StaffProfile {
  fullName: string;
  role: "admin" | "admissions_officer" | "editor";
}

interface StaffApiResponse {
  success: boolean;
  message?: string;
  data?: StaffProfile;
}

export async function getAdminProfile(
  accessToken: string
): Promise<StaffProfile> {
  if (!API_BASE_URL) {
    throw new Error("The API base URL is not configured.");
  }

  const response = await fetch(
    `${API_BASE_URL}/staff-test/admin`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const result: StaffApiResponse = await response.json();

  if (!response.ok || !result.success || !result.data) {
    if (response.status === 401) {
      throw new Error("Your session is invalid or has expired.");
    }

    if (response.status === 403) {
      throw new Error("Your account is not authorized as an administrator.");
    }

    throw new Error(
      result.message || "Unable to verify administrator access."
    );
  }

  return result.data;
}
