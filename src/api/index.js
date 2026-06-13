import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api",
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

export const publicApi = axios.create({
    baseURL: "http://localhost:8080/api",
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

export const BASE_URL_IMG = "http://localhost:8080";

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

const TIPO_GRUPO_MAP = {
    Piso: ["PISO", "ESTUDIO", "DUPLEX", "ATICO", "PENTHOUSE"],
    Casa: ["CASA", "CHALET", "VILLA"]
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
    } else if (filters.tipo && !filters.tipoAgrupado) {
        params.tipo = filters.tipo;
    }
    if (filters.tipoAgrupado) {
        const tipos = TIPO_GRUPO_MAP[filters.tipoAgrupado];
        if (tipos) params.tipos = tipos;
    }
    return params;
};

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