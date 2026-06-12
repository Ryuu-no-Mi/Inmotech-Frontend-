import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api, publicApi, BASE_URL_IMG, buildSearchParams, parsePaginatedResponse } from "../api";
import SearchBar from "./SearchBar";
import Pagination from "./common/Pagination";
import { usePagination } from "../hooks/usePagination";
import { Heart, HeartOff } from "lucide-react";

export default function PropertyList({ userId = null }) {
    const [properties, setProperties] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [facetas, setFacetas] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const [currentFilters, setCurrentFilters] = useState({});
    const navigate = useNavigate();

    const pagination = usePagination();

    const DEFAULT_IMAGE_URL =
        "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg";

    const fetchFacetas = useCallback(async () => {
        try {
            const res = await publicApi.get("/property/facetas");
            setFacetas(res.data);
        } catch (err) {
            console.error("Error fetching facetas:", err);
        }
    }, []);

    const fetchProperties = useCallback(async (page = 0, filters = {}) => {
        setLoading(true);
        try {
            let res;
            if (Object.keys(filters).some(k => filters[k])) {
                const params = { ...buildSearchParams(filters), page, size: 12 };
                res = await publicApi.get("/property/buscar", { params });
            } else {
                res = await publicApi.get("/property", { params: { page, size: 12 } });
            }
            const parsed = parsePaginatedResponse(res);
            setProperties(parsed.data);
            pagination.setTotalPages(parsed.totalPages);
            pagination.setTotalElements(parsed.totalElements);
            setTotalElements(parsed.totalElements);
        } catch (err) {
            console.error("Error fetching properties:", err);
        } finally {
            setLoading(false);
        }
    }, [pagination]);

    useEffect(() => {
        fetchFacetas();
        fetchProperties(0, {});
    }, [fetchFacetas, fetchProperties]);

    useEffect(() => {
        if (userId) {
            api.get(`/favourite/${userId}`)
                .then((res) => {
                    const favIds = res.data.map((fav) => fav.propiedadId);
                    setFavorites(favIds);
                })
                .catch((err) => console.error("Error fetching favourites:", err));
        }
    }, [userId]);

    const handleSearch = (filters) => {
        setCurrentFilters(filters);
        fetchProperties(0, filters);
    };

    const handlePageChange = (page) => {
        fetchProperties(page, currentFilters);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleLike = async (propertyId) => {
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
            console.error("Error updating favourite:", err);
        }
    };

    return (
        <div className="p-4">
            <SearchBar onSearch={handleSearch} facetas={facetas} currentFilters={currentFilters} />

            {loading ? (
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
                                        {prop.precio.toLocaleString()} €
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {pagination.totalPages > 1 && (
                        <div className="mt-6">
                            <Pagination
                                page={pagination.page}
                                totalPages={pagination.totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}