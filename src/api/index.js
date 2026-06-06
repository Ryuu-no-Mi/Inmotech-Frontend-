import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

// Cliente sin token para llamadas públicas
export const publicApi = axios.create({
    baseURL: "http://localhost:8080/api",
});
  
export const BASE_URL_IMG = "http://localhost:8080";

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
