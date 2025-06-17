import { useState } from "react";

export function usePost(url: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const post = async(body: any) => {
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!res.ok) throw new Error("POST request failed");
                const result = await res.json();
                return result;
        } catch (err: any) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
        
    } 

    return { post, loading, error };
}