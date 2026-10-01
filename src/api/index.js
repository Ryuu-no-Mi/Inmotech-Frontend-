import axios from "axios";

export const BACKEND_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/, "");
export const API_BASE_URL = `${BACKEND_URL}/api`;

export const api = axios.create({
    baseURL: API_BASE_URL,
    paramsSerializer: (params) => {
        return Object.entries(params)
            .flatMap(([k, v]) =>
                Array.isArray(v)
                    ? v.map(item => `${encodeURIComponent(k)}=${encodeURIComponent(item)}`)
                    : [`${encodeURIComponent(k)}=${encodeURIComponent(v)}`]
            )
            .join('&');
    }
});

// Cliente sin token para llamadas públicas
export const publicApi = axios.create({
    baseURL: API_BASE_URL,
    paramsSerializer: (params) => {
        return Object.entries(params)
            .flatMap(([k, v]) =>
                Array.isArray(v)
                    ? v.map(item => `${encodeURIComponent(k)}=${encodeURIComponent(item)}`)
                    : [`${encodeURIComponent(k)}=${encodeURIComponent(v)}`]
            )
            .join('&');
    }
});

export const BASE_URL_IMG = BACKEND_URL;

// Helper para paginación
export const buildPaginationParams = (page, size, sort = "fechaPublicacion", direction = "desc") => ({
    page,
    size,
    sort,
    direction
});

export const parsePaginatedResponse = (response) => {
    const { content, page, size, totalElements, totalPages, first, last } = response.data;
    return {
        data: content,
        page,
        size,
        totalElements,
        totalPages,
        first,
        last
    };
};

export const buildSearchParams = (filters) => {
    const params = {};
    if (filters.operacion) params.operacion = filters.operacion;
    if (filters.texto) params.texto = filters.texto;
    if (filters.ciudad) params.ciudad = filters.ciudad;
    if (filters.distrito) params.distrito = filters.distrito;
    if (filters.barrio) params.barrio = filters.barrio;
    if (filters.provincia) params.provincia = filters.provincia;
    if (filters.precioMin) params.precioMin = filters.precioMin;
    if (filters.precioMax) params.precioMax = filters.precioMax;
    if (filters.superficieMin) params.superficieMin = filters.superficieMin;
    if (filters.superficieMax) params.superficieMax = filters.superficieMax;
    if (filters.tipos && Array.isArray(filters.tipos)) {
        params.tipos = filters.tipos;
    } else if (filters.tipo) {
        params.tipo = filters.tipo;
    }
    return params;
};

// añadir JWT desde localStorage
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);   
