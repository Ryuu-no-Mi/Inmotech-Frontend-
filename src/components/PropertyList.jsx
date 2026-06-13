import { useEffect, useState, useCallback, useRef } from "react";
import { api, publicApi, buildSearchParams, parsePaginatedResponse } from "../api";
import SearchBar from "./SearchBar";
import PropertyCard from "./PropertyCard";
import Pagination from "./common/Pagination";

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

    const requestControllerRef = useRef(null);
    const facetasControllerRef = useRef(null);

    const fetchFacetas = useCallback(async (filters = {}) => {
        if (facetasControllerRef.current) {
            facetasControllerRef.current.abort();
        }
        facetasControllerRef.current = new AbortController();

        setLoadingFacetas(true);
        const params = buildSearchParams(filters);

        try {
            const res = await publicApi.get("/property/facetas", {
                params,
                signal: facetasControllerRef.current.signal
            });
            setFacetas(res.data);
        } catch (err) {
            if (err.code !== "ERR_CANCELED") {
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

        try {
            const res = await publicApi.get(url, {
                params,
                signal: requestControllerRef.current.signal
            });

            const parsed = parsePaginatedResponse(res);

            setProperties(parsed.data);
            setTotalPages(parsed.totalPages);
            setTotalElements(parsed.totalElements);
            setPage(parsed.page);
        } catch (err) {
            if (err.code !== "ERR_CANCELED") {
                console.error("[PropertyList] properties error:", err);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFacetas({});
        fetchProperties(0, {});
    }, [fetchFacetas, fetchProperties]);

    useEffect(() => {
        if (userId) {
            api.get(`/favourite/${userId}`)
                .then((res) => {
                    const favIds = (res.data || []).map((fav) => fav.propiedadId);
                    setFavorites(favIds);
                })
                .catch((err) => console.error("[PropertyList] favorites error:", err));
        }
    }, [userId]);

    const handleSearch = (filters) => {
        setCurrentFilters(filters);
        fetchProperties(0, filters);
        fetchFacetas(filters);
    };

    const handlePageChange = useCallback((newPage) => {
        fetchProperties(newPage, currentFilters);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentFilters, fetchProperties]);

    const handleFavoriteToggle = useCallback(async (propertyId) => {
        if (!userId) return;
        const isFav = favorites.includes(propertyId);
        try {
            if (isFav) {
                await api.delete(`/favourite/${userId}/${propertyId}`);
                setFavorites((prev) => prev.filter((id) => id !== propertyId));
            } else {
                await api.post(`/favourite/${userId}/${propertyId}`);
                setFavorites((prev) => [...prev, propertyId]);
            }
        } catch (err) {
            console.error("[PropertyList] handleFavoriteToggle error:", err);
        }
    }, [userId, favorites]);

    const isLoading = loading || loadingFacetas;

    return (
        <div className="p-4">
            <SearchBar onSearch={handleSearch} facetas={facetas} currentFilters={currentFilters} />

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="text-on-surface-variant">Cargando propiedades...</div>
                </div>
            ) : properties.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-surface rounded-lg border border-outline-variant">
                    <svg className="w-16 h-16 text-outline mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-body-lg text-on-surface mb-2">No se encontraron propiedades.</p>
                    <p className="text-label-md text-on-surface-variant">Prueba con otros filtros.</p>
                </div>
            ) : (
                <>
                    <p className="text-label-md text-on-surface-variant mb-4">
                        {totalElements} propiedades encontradas
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {properties.map((prop) => (
                            <PropertyCard
                                key={prop.id}
                                prop={prop}
                                isFavorite={favorites.includes(prop.id)}
                                onFavoriteToggle={handleFavoriteToggle}
                                showFavoriteButton={!!userId}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-8 flex justify-center">
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