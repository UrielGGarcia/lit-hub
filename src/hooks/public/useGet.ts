import { useEffect, useState } from "react";

export function useGet<T>(url: string ) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
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

        if (url) fetchData();
    }, [url]);
    return { data, isLoading, error };
}