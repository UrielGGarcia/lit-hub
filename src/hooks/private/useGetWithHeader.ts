// src/hooks/private/useGetWithHeaders.ts
import { useEffect, useState } from "react";

interface UseGetWithHeadersOptions {
  headers?: Record<string, string>;
}

export function useGetWithHeaders<T>(url: string | null, options?: UseGetWithHeadersOptions) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!url) return; // evita fetch si no hay URL

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(options?.headers || {}),
          },
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, JSON.stringify(options?.headers)]); // stringify evita loops si headers es un objeto

  return { data, isLoading, error };
}
