import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api, publicApi, BASE_URL_IMG, buildSearchParams, parsePaginatedResponse } from "../api";
import SearchBar from "./SearchBar";
import Pagination from "./common/Pagination";
import { Heart, HeartOff } from "lucide-react";

export default function PropertyList({ userId = null }) {
    const [properties, setProperties] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [facetas, setFacetas] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingFacetas, setLoadingFacetas] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const [currentFilters, setCurrentFilters] = useState({});
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const requestControllerRef = useRef(null);
    const facetasControllerRef = useRef(null);

    const DEFAULT_IMAGE_URL =
        "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg";

    const fetchFacetas = useCallback(async (filters = {}) => {
        if (facetasControllerRef.current) {
            facetasControllerRef.current.abort();
        }
        facetasControllerRef.current = new AbortController();

        setLoadingFacetas(true);
        const params = buildSearchParams(filters);
        console.log("[PropertyList] GET /property/facetas", params);

        try {
            const res = await publicApi.get("/property/facetas", {
                params,
                signal: facetasControllerRef.current.signal
            });
            console.log("[PropertyList] facetas response:", res.data);
            setFacetas(res.data);
        } catch (err) {
            if (err.code === "ERR_CANCELED") {
                console.log("[PropertyList] facetas request cancelled");
            } else {
                console.error("[PropertyList] facetas error:", err);
            }
        } finally {
            setLoadingFacetas(false);
        }
    }, []);

    const fetchProperties = useCallback(async (pageNum = 0, filters = {}) => {
        if (requestControllerRef.current) {
            requestControllerRef.current.abort();
        }
        requestControllerRef.current = new AbortController();

        setLoading(true);

        const hasFilters = Object.keys(filters).some(k => filters[k] && filters[k] !== "");
        const url = hasFilters ? "/property/buscar" : "/property";
        const params = { page: pageNum, size: 12, ...buildSearchParams(filters) };

        console.log(`[PropertyList] GET ${url}`, params);

        try {
            const res = await publicApi.get(url, {
                params,
                signal: requestControllerRef.current.signal
            });
            console.log(`[PropertyList] ${url} response:`, res.data);

            const parsed = parsePaginatedResponse(res);
            console.log("[PropertyList] parsed:", parsed);

            setProperties(parsed.data);
            setTotalPages(parsed.totalPages);
            setTotalElements(parsed.totalElements);
            setPage(parsed.page);
        } catch (err) {
            if (err.code === "ERR_CANCELED") {
                console.log("[PropertyList] properties request cancelled");
            } else {
                console.error("[PropertyList] properties error:", err);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        console.log("[PropertyList] Mount - fetching initial data");
        fetchFacetas({});
        fetchProperties(0, {});
    }, [fetchFacetas, fetchProperties]);

    useEffect(() => {
        if (userId) {
            console.log(`[PropertyList] fetching favorites for userId=${userId}`);
            api.get(`/favourite/${userId}`)
                .then((res) => {
                    console.log("[PropertyList] favorites response:", res.data);
                    const favIds = res.data.map((fav) => fav.propiedadId);
                    setFavorites(favIds);
                })
                .catch((err) => console.error("[PropertyList] favorites error:", err));
        }
    }, [userId]);

    const handleSearch = (filters) => {
        console.log("[PropertyList] handleSearch:", filters);
        setCurrentFilters(filters);
        fetchProperties(0, filters);
        fetchFacetas(filters);
    };

    const handlePageChange = useCallback((newPage) => {
        console.log("[PropertyList] handlePageChange:", newPage, "filters:", currentFilters);
        fetchProperties(newPage, currentFilters);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentFilters, fetchProperties]);

    const handleLike = async (propertyId) => {
        if (!userId) return;
        const isFav = favorites.includes(propertyId);
        console.log(`[PropertyList] handleLike propertyId=${propertyId}, isFav=${isFav}`);
        try {
            if (isFav) {
                await api.delete(`/favourite/${userId}/${propertyId}`);
                setFavorites((prev) => prev.filter((id) => id !== propertyId));
            } else {
                await api.post(`/favourite/${userId}/${propertyId}`);
                setFavorites((prev) => [...prev, propertyId]);
            }
        } catch (err) {
            console.error("[PropertyList] handleLike error:", err);
        }
    };

    const isLoading = loading || loadingFacetas;

    return (
        <div className="p-4">
            <SearchBar onSearch={handleSearch} facetas={facetas} currentFilters={currentFilters} />

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="text-gray-500">Cargando propiedades...</div>
                </div>
            ) : properties.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <p className="text-gray-500 text-lg">No se encontraron propiedades.</p>
                    <p className="text-gray-400 text-sm mt-2">Prueba con otros filtros.</p>
                </div>
            ) : (
                <>
                    <p className="text-sm text-gray-500 mb-4">{totalElements} propiedades encontradas</p>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {properties.map((prop) => (
                            <div
                                key={prop.id}
                                className="relative cursor-pointer bg-white rounded shadow hover:shadow-lg transition"
                                onClick={() => navigate(`/property/${prop.id}`)}
                            >
                                {userId && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleLike(prop.id);
                                        }}
                                        className="absolute top-2 right-2 z-10 bg-white p-1 rounded-full shadow hover:scale-110 transition"
                                    >
                                        {favorites.includes(prop.id) ? (
                                            <Heart className="text-red-500 fill-red-500" />
                                        ) : (
                                            <HeartOff className="text-gray-400" />
                                        )}
                                    </button>
                                )}
                                <div className="absolute top-2 left-2 z-10">
                                    <span className={`text-xs px-2 py-1 rounded font-semibold ${
                                        prop.operacion === "ALQUILER"
                                            ? "bg-green-600 text-white"
                                            : "bg-indigo-600 text-white"
                                    }`}>
                                        {prop.operacion}
                                    </span>
                                </div>
                                <img
                                    src={
                                        prop.imagenes && prop.imagenes.length > 0 && prop.imagenes[0]?.url
                                            ? prop.imagenes[0].url.startsWith("http")
                                                ? prop.imagenes[0].url
                                                : `${BASE_URL_IMG}${encodeURI(prop.imagenes[0].url)}`
                                            : DEFAULT_IMAGE_URL
                                    }
                                    alt={prop.titulo}
                                    className="w-full h-64 object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = DEFAULT_IMAGE_URL;
                                    }}
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold">{prop.titulo}</h3>
                                    <p className="text-lg text-gray-800">{prop.direccion}</p>
                                    <p className="text-sm text-gray-400">
                                        <span className="font-medium">{prop.provincia}</span>, {prop.ciudad}
                                    </p>
                                    <p className="text-indigo-600 font-bold text-2xl mt-2">
                                        {prop.precio.toLocaleString()} Eur
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-6">
                            <Pagination
                                page={page}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}