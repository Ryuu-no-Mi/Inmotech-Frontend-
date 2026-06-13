import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

// Cliente sin token para llamadas públicas
export const publicApi = axios.create({
    baseURL: "http://localhost:8080/api",
});

export const BASE_URL_IMG = "http://localhost:8080";

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
    if (filters.provincia) params.provincia = filters.provincia;
    if (filters.tipo) params.tipo = filters.tipo;
    if (filters.tipoAgrupado) params.tipo = filters.tipoAgrupado;
    if (filters.precioMin) params.precioMin = filters.precioMin;
    if (filters.precioMax) params.precioMax = filters.precioMax;
    if (filters.superficieMin) params.superficieMin = filters.superficieMin;
    if (filters.superficieMax) params.superficieMax = filters.superficieMax;
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
