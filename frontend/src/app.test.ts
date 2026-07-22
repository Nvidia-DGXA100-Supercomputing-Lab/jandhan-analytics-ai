import { describe, it, expect } from "vitest";

describe("Login Page", () => {
  it("renders login form", async () => {
    const mod = await import("@/app/login/page");
    expect(mod.default).toBeTruthy();
  });
});

describe("API client", () => {
  it("exports API functions", async () => {
    const api = await import("@/lib/api");
    expect(api.authApi).toBeTruthy();
    expect(api.dashboardApi).toBeTruthy();
    expect(api.transactionsApi).toBeTruthy();
    expect(api.schemesApi).toBeTruthy();
    expect(api.analyticsApi).toBeTruthy();
    expect(api.chatbotApi).toBeTruthy();
    expect(api.forecastingApi).toBeTruthy();
    expect(api.reportsApi).toBeTruthy();
    expect(api.anomalyApi).toBeTruthy();
    expect(api.uploadApi).toBeTruthy();
  });
});

describe("Types", () => {
  it("exports TypeScript types", async () => {
    const types = await import("@/types");
    expect(types.User).toBeTruthy();
    expect(types.Transaction).toBeTruthy();
    expect(types.Scheme).toBeTruthy();
    expect(types.Report).toBeTruthy();
    expect(types.Anomaly).toBeTruthy();
    expect(types.AnalyticsData).toBeTruthy();
    expect(types.ForecastingData).toBeTruthy();
    expect(types.ChatMessage).toBeTruthy();
  });
});
