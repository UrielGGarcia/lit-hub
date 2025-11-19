import { useState } from "react";

export function useUploadFile<T>() {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const uploadFile = async (formData: FormData, url: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const result = await response.json();
            setData(result);
            return result as T;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { uploadFile, data, isLoading, error };
}
