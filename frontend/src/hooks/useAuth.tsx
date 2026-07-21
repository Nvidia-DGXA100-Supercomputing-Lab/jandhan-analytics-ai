"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthState, User, Token } from "@/types";
import { authApi, setTokens, clearTokens } from "@/lib/api";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const initAuth = async () => {
      const access = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
      const refresh = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;
      console.log("[Auth] initAuth access=", access ? "present" : "missing", "refresh=", refresh ? "present" : "missing");

      if (!access || !refresh) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        console.log("[Auth] calling authApi.me...");
        const me = await authApi.me();
        const user = me.user || me;
        console.log("[Auth] me success", user);
        setState({
          user: {
            id: String(user.id),
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
          },
          token: { access, refresh },
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (err) {
        console.log("[Auth] me failed", err);
        clearTokens();
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    console.log("[Auth] login start", email);
    const response = await authApi.login({ email, password });
    console.log("[Auth] login response", response);
    setTokens(response.access_token, response.refresh_token);
    const userData = { id: email, name: email.split("@")[0], email, role: "citizen" };
    setState({
      user: userData,
      token: { access: response.access_token, refresh: response.refresh_token },
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await authApi.register({ name, email, password });
    setTokens(response.access_token, response.refresh_token);
    const userData = { id: email, name, email, role: "citizen" };
    setState({
      user: userData,
      token: { access: response.access_token, refresh: response.refresh_token },
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      clearTokens();
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
