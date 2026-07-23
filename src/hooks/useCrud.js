import { useCallback, useEffect, useState } from "react";

export default function useCrud(service) {
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refresh = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);

        try {
            const result = await service.list(params);
            setRows(result.rows ?? []);
            setTotal(result.total ?? 0);
        } catch (requestError) {
            setRows([]);
            setTotal(0);
            setError(requestError);
        } finally {
            setLoading(false);
        }
    }, [service]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { rows, total, loading, error, refresh };
}
