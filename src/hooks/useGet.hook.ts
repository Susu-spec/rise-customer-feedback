import { useEffect, useState } from "react";

export default function useGet<T = any>(url: string, options = {}) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(url, options);
            if (!res.ok) throw new Error("GET request failed");
            const json = await res.json();
            setData(json);
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [url]);

    return { data, loading, error, refetch: fetchData };
}