import { AuthResponse, LoginRequest, RegisterRequest, ApiError } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};

const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh_token");
};

const setTokens = (access: string, refresh: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

const clearTokens = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!response.ok) {
      clearTokens();
      return null;
    }

    const data = (await response.json()) as { access: string };
    localStorage.setItem("access_token", data.access);
    return data.access;
  } catch {
    clearTokens();
    return null;
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  let token = getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401 && token) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      token = newToken;
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
      response = await fetch(url, { ...options, headers });
    }
  }

  if (!response.ok) {
    const errorData = (await response.json()) as ApiError;
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  logout: async (): Promise<void> => {
    return apiRequest<void>("/auth/logout", {
      method: "POST",
    });
  },

  refresh: async (): Promise<{ access: string }> => {
    return apiRequest<{ access: string }>("/auth/refresh", {
      method: "POST",
    });
  },

  me: async (): Promise<{ user: { id: string; name: string; email: string; role: string; avatar?: string } }> => {
    return apiRequest<{ user: { id: string; name: string; email: string; role: string; avatar?: string } }>("/auth/me");
  },
};

export const dashboardApi = {
  getDashboardData: async (): Promise<import("@/types").DashboardData> => {
    return apiRequest<import("@/types").DashboardData>("/dashboard");
  },
};

export const analyticsApi = {
  getSpendingTrends: async (): Promise<import("@/types").AnalyticsData["spending_trend"]> => {
    return apiRequest<import("@/types").AnalyticsData["spending_trend"]>("/analytics/spending-trends/");
  },

  getCategoryBreakdown: async (): Promise<import("@/types").AnalyticsData["category_breakdown"]> => {
    return apiRequest<import("@/types").AnalyticsData["category_breakdown"]>("/analytics/category-breakdown/");
  },

  getSchemeUtilization: async (): Promise<import("@/types").AnalyticsData["scheme_utilization"]> => {
    return apiRequest<import("@/types").AnalyticsData["scheme_utilization"]>("/analytics/scheme-utilization/");
  },

  getGeographicDistribution: async (): Promise<import("@/types").AnalyticsData["geographic_distribution"]> => {
    return apiRequest<import("@/types").AnalyticsData["geographic_distribution"]>("/analytics/geographic-distribution/");
  },
};

export const transactionsApi = {
  getTransactions: async (params?: {
    page?: number;
    limit?: number;
    scheme_id?: string;
    status?: string;
  }): Promise<import("@/types").Transaction[]> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.scheme_id) searchParams.set("scheme_id", params.scheme_id);
    if (params?.status) searchParams.set("status", params.status);

    const query = searchParams.toString();
    return apiRequest<import("@/types").Transaction[]>(`/transactions${query ? `?${query}` : ""}`);
  },

  getTransaction: async (id: string): Promise<import("@/types").Transaction> => {
    return apiRequest<import("@/types").Transaction>(`/transactions/${id}`);
  },
};

export const schemesApi = {
  getSchemes: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
  }): Promise<import("@/types").Scheme[]> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.category) searchParams.set("category", params.category);
    if (params?.status) searchParams.set("status", params.status);

    const query = searchParams.toString();
    return apiRequest<import("@/types").Scheme[]>(`/schemes${query ? `?${query}` : ""}`);
  },

  getScheme: async (id: string): Promise<import("@/types").Scheme> => {
    return apiRequest<import("@/types").Scheme>(`/schemes/${id}`);
  },
};

export const reportsApi = {
  getReports: async (params?: { type?: string; status?: string }): Promise<import("@/types").Report[]> => {
    const searchParams = new URLSearchParams();
    if (params?.type) searchParams.set("type", params.type);
    if (params?.status) searchParams.set("status", params.status);

    const query = searchParams.toString();
    return apiRequest<import("@/types").Report[]>(`/reports${query ? `?${query}` : ""}`);
  },

  generateReport: async (data: { type: string; format: string; start_date: string; end_date: string }): Promise<import("@/types").Report> => {
    return apiRequest<import("@/types").Report>("/reports/generate", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

export const forecastingApi = {
  getForecast: async (params: { scheme_id: string; horizon: number }): Promise<import("@/types").ForecastingData> => {
    const searchParams = new URLSearchParams();
    searchParams.set("scheme_id", params.scheme_id);
    searchParams.set("horizon", params.horizon.toString());

    return apiRequest<import("@/types").ForecastingData>(`/forecasting?${searchParams.toString()}`);
  },

  getForecastingData: async (): Promise<import("@/types").ForecastingData> => {
    return apiRequest<import("@/types").ForecastingData>("/forecasting");
  },
};

export const chatbotApi = {
  sendMessage: async (message: string, context?: string): Promise<import("@/types").ChatMessage> => {
    return apiRequest<import("@/types").ChatMessage>("/chatbot/chat", {
      method: "POST",
      body: JSON.stringify({ message, context }),
    });
  },

  getHistory: async (): Promise<import("@/types").ChatMessage[]> => {
    return apiRequest<import("@/types").ChatMessage[]>("/chatbot/history");
  },
};

export const anomalyApi = {
  getAnomalies: async (params?: { severity?: string; status?: string; limit?: number }): Promise<import("@/types").Anomaly[]> => {
    const searchParams = new URLSearchParams();
    if (params?.severity) searchParams.set("severity", params.severity);
    if (params?.status) searchParams.set("status", params.status);
    if (params?.limit) searchParams.set("limit", params.limit.toString());

    const query = searchParams.toString();
    const data = await apiRequest<import("@/types").Anomaly[] | { anomalies?: import("@/types").Anomaly[]; value?: import("@/types").Anomaly[] }>(`/anomaly/detection${query ? `?${query}` : ""}`);
    return Array.isArray(data) ? data : (data?.anomalies ?? data?.value ?? []);
  },

  getAnomalyDetection: async (): Promise<import("@/types").Anomaly[]> => {
    const data = await apiRequest<import("@/types").Anomaly[] | { anomalies?: import("@/types").Anomaly[]; value?: import("@/types").Anomaly[] }>("/anomaly/detection");
    return Array.isArray(data) ? data : (data?.anomalies ?? data?.value ?? []);
  },

  resolveAnomaly: async (id: string, resolution: string): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>(`/anomaly/${id}/resolve`, {
      method: "POST",
      body: JSON.stringify({ resolution }),
    });
  },
};

export const uploadApi = {
  uploadTransactions: async (file: File): Promise<{ imported: number; errors: string[]; message: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    const token = getToken();
    const headers: HeadersInit = {};
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}/upload/transactions/csv/`, {
      method: "POST",
      headers,
      body: formData,
    });
    if (!response.ok) {
      const errorData = (await response.json()) as ApiError;
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as { imported: number; errors: string[]; message: string };
  },

  uploadSchemes: async (file: File): Promise<{ imported: number; errors: string[]; message: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    const token = getToken();
    const headers: HeadersInit = {};
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}/upload/schemes/csv/`, {
      method: "POST",
      headers,
      body: formData,
    });
    if (!response.ok) {
      const errorData = (await response.json()) as ApiError;
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as { imported: number; errors: string[]; message: string };
  },
};

export { getToken, setTokens, clearTokens };
