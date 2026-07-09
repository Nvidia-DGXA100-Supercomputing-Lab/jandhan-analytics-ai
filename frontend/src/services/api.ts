const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || "Request failed");
  }

  return res.json();
}

export interface ChatResponse {
  response?: string;
  message?: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface DashboardResponse {
  total_spending?: string;
  active_schemes?: string;
  beneficiaries?: string;
  transparency_score?: string;
}

export const api = {
  login: (credentials: { email: string; password: string }) =>
    request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  getDashboard: () => request<DashboardResponse>("/dashboard/"),
  getAnalytics: () => request("/analytics/"),
  getTransactions: () => request("/transactions/"),
  chat: (message: string) =>
    request<ChatResponse>("/chatbot/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    }),
};
