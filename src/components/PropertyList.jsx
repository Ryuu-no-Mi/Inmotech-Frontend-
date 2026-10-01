import { useEffect, useState, useCallback, useRef, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { api, publicApi, buildSearchParams, parsePaginatedResponse } from "../api";
import SearchBar from "./SearchBar";
import PropertyCard from "./PropertyCard";
import Pagination from "./common/Pagination";
import { AuthContext } from "../contexts/AuthContext";

export default function PropertyList() {
    const { user, favorites, toggleFavorite } = useContext(AuthContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const [properties, setProperties] = useState([]);
    const [facetas, setFacetas] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingFacetas, setLoadingFacetas] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const [currentFilters, setCurrentFilters] = useState({});
    const [totalPages, setTotalPages] = useState(0);

    const currentPage = parseInt(searchParams.get("page") || "0");

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
        fetchProperties(currentPage, currentFilters);
    }, [fetchFacetas, fetchProperties, currentPage, currentFilters]);

    const handleSearch = (filters) => {
        setSearchParams({});
        setCurrentFilters(filters);
        fetchProperties(0, filters);
        fetchFacetas(filters);
    };

    const handlePageChange = useCallback((newPage) => {
        setSearchParams({ page: newPage.toString() });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleFavoriteToggle = useCallback(async (propertyId) => {
        if (!user?.id) return;
        await toggleFavorite(propertyId);
    }, [user, toggleFavorite]);

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
                    <p className="text-headline-md text-primary font-semibold my-4">
                        {totalElements.toLocaleString()} propiedades encontradas
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {properties.map((prop) => (
                            <PropertyCard
                                key={prop.id}
                                prop={prop}
                                isFavorite={favorites.includes(prop.id)}
                                onFavoriteToggle={handleFavoriteToggle}
                                showFavoriteButton={!!user}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-8 flex justify-center">
                            <Pagination
                                page={currentPage}
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