// src/hooks/private/useApi.ts
import { useState } from "react";

type Method = "GET" | "POST" | "DELETE";

interface UseApiOptions {
  body?: any;
  method?: Method;
  headers?: Record<string, string>;
}

export function useApi<TResponse>() {
  const [data, setData] = useState<TResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const callApi = async (url: string, options?: UseApiOptions) => {
    setIsLoading(true);
    setError(null);

    try {
      // Tomamos token de localStorage automáticamente
      const token = localStorage.getItem("access_token");

      const response = await fetch(url, {
        method: options?.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(options?.headers || {}),
        },
        body: options?.body ? JSON.stringify(options.body) : undefined,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Error: ${response.status}`);
      }

      const result: TResponse = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, callApi };
}
