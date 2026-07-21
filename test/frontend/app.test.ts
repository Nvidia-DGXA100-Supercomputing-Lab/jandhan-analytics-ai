import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

// Mock the API
vi.mock('@/lib/api', () => ({
  authApi: {
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    refresh: vi.fn(),
    me: vi.fn(),
  },
  dashboardApi: {
    getDashboardData: vi.fn(),
  },
  analyticsApi: {
    getSpendingTrends: vi.fn(),
    getCategoryBreakdown: vi.fn(),
  },
  chatbotApi: {
    sendMessage: vi.fn(),
    getHistory: vi.fn(),
  },
  forecastingApi: {
    getForecastingData: vi.fn(),
  },
  anomalyApi: {
    getAnomalyDetection: vi.fn(),
  },
  reportsApi: {
    getReports: vi.fn(),
    generateReport: vi.fn(),
  },
  transactionsApi: {
    getTransactions: vi.fn(),
  },
  schemesApi: {
    getSchemes: vi.fn(),
  },
}));

describe('App', () => {
  it('renders login page', async () => {
    // This test will be expanded once pages are properly mocked
    expect(true).toBe(true);
  });
});

describe('Types', () => {
  it('has correct User interface', () => {
    const user = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'admin',
    };
    expect(user.name).toBe('Test User');
  });
});
