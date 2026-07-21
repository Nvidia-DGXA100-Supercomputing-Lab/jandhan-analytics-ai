"use client";

import { useState, useCallback } from "react";

type Status = "idle" | "loading" | "success" | "error";

interface UseApiState<T> {
  data: T | null;
  status: Status;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: unknown[]) => Promise<T | undefined>;
  reset: () => void;
}

export function useApi<T>(asyncFn: (...args: unknown[]) => Promise<T>): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    status: "idle",
    error: null,
  });

  const execute = useCallback(
    async (...args: unknown[]): Promise<T | undefined> => {
      setState({ data: null, status: "loading", error: null });

      try {
        const result = await asyncFn(...args);
        setState({ data: result, status: "success", error: null });
        return result;
      } catch (error) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        setState({ data: null, status: "error", error: message });
        return undefined;
      }
    },
    [asyncFn]
  );

  const reset = useCallback(() => {
    setState({ data: null, status: "idle", error: null });
  }, []);

  return { ...state, execute, reset };
}
