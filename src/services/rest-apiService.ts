// services/rest-apiService.ts
import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Algo fallo');
                }
                return response.json();
            })
            .then((data: T) => setData(data))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading, error };
}