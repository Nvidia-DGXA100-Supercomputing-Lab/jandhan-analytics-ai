export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Token {
  access: string;
  refresh: string;
}

export interface AuthState {
  user: User | null;
  token: Token | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: Token;
}

export interface Transaction {
  id: string;
  scheme_id: string;
  amount: number;
  status: string;
  date: string;
  recipient_name: string;
  recipient_account: string;
  created_at: string;
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  budget: number;
  spent: number;
  status: string;
  category: string;
  start_date: string;
  end_date: string;
}

export interface Report {
  id: string;
  title: string;
  type: string;
  generated_at: string;
  file_url: string;
  status: string;
}

export interface DashboardData {
  total_spending: number;
  total_schemes: number;
  total_budget: number;
  total_transactions: number;
  beneficiaries: number;
  pending_verifications: number;
  recent_transactions: Transaction[];
  top_schemes: Transaction[];
}

export interface AnalyticsData {
  spending_trend: Array<{ month: string; amount: number }>;
  category_breakdown: Array<{ category: string; amount: number }>;
  scheme_utilization: Array<{ scheme: string; utilized: number; total: number }>;
  geographic_distribution: Array<{ state: string; amount: number }>;
}

export interface ForecastingData {
  predictions: Array<{ date: string; predicted: number; lower_bound: number; upper_bound: number }>;
  accuracy: number;
  model_version: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: Array<{ title: string; url: string }>;
}

export interface Anomaly {
  id: string;
  transaction_id: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  confidence: number;
  detected_at: string;
  status: string;
}

export interface ApiError {
  detail: string;
  status?: number;
}

export type UserRole = "admin" | "official" | "auditor" | "citizen";
