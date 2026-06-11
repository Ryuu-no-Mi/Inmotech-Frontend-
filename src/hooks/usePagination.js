import { useState, useEffect } from "react";
import { api, buildPaginationParams, parsePaginatedResponse } from "../api";

export function usePagination(endpoint, { pageSize = 10, sort = "fechaPublicacion", direction = "desc" } = {}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const fetchData = async (pageNum = 0) => {
        setLoading(true);
        setError(null);
        try {
            const params = buildPaginationParams(pageNum, pageSize, sort, direction);
            const response = await api.get(endpoint, { params });
            const result = parsePaginatedResponse(response);

            setData(result.data);
            setPage(result.page);
            setTotalPages(result.totalPages);
            setTotalElements(result.totalElements);
        } catch (err) {
            setError(err.message || "Error cargando datos");
            console.error("Error en usePagination:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(0);
    }, [endpoint, pageSize, sort, direction]);

    const changePage = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            fetchData(newPage);
        }
    };

    const refresh = () => {
        fetchData(page);
    };

    return {
        data,
        loading,
        error,
        page,
        totalPages,
        totalElements,
        changePage,
        refresh,
        pageSize
    };
}