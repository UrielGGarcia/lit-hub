import { useState } from "react";

export function usePost<T, B = unknown>(url: string) {
  const [data, setData] = useState<T | null | any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const postData = async (body: B) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // Primero validar el status ANTES de intentar json()
      if (!response.ok) {
        let errorText = "Error desconocido";
        try {
          const errorBody = await response.json();
          errorText = errorBody?.message ?? errorText;
        } catch {
          // si no hay JSON, usamos texto seguro
        }

        throw new Error(errorText);
      }

      const result = await response.json();

      // Manejo específico del backend
      if (result?.message?.includes("ya está asociado")) {
        setError(result.message);
        return null;
      }

      if (result?.message?.includes("no está asociado a ninguna cuenta")) {
        setError(result.message);
        return
      }

      setSuccess(true);
      setData(result);
      return result;

    } catch (err: any) {
      const message =
        err?.message === "Failed to fetch"
          ? "Error inesperado, inténtalo más tarde."
          : err?.message ?? "Error desconocido";

      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, success, postData };
}
