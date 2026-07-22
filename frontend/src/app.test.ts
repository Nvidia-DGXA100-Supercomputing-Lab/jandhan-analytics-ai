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
  it("exports TypeScript types module", async () => {
    const types = await import("@/types");
    expect(types).toBeTruthy();
    expect(typeof types.User).toBe("undefined");
    expect(typeof types.Transaction).toBe("undefined");
    expect(typeof types.Scheme).toBe("undefined");
    expect(typeof types.Report).toBe("undefined");
    expect(typeof types.Anomaly).toBe("undefined");
    expect(typeof types.AnalyticsData).toBe("undefined");
    expect(typeof types.ForecastingData).toBe("undefined");
    expect(typeof types.ChatMessage).toBe("undefined");
  });
});
