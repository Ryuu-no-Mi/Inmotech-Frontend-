import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, BASE_URL_IMG } from "../api";
import SearchBar from "./SearchBar";
import { Heart, HeartOff } from "lucide-react";

export default function PropertyList({ userId = null }) {
    const [properties, setProperties] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    const DEFAULT_IMAGE_URL =
        "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg";

    useEffect(() => {
        // Fetch propiedades
        api.get("/property")
            .then((res) => {
                setProperties(res.data);
                setFiltered(res.data);
                console.log("Propiedad datos:", res.data);
            })
            .catch((err) => console.error("Error fetching properties:", err));

        // Solo fetch favoritos si hay userId válido
        if (userId) {
            api.get(`/favourite/${userId}`)
                .then((res) => {
                    // la API devuelve { id, propiedadId }
                    const favIds = res.data.map((fav) => fav.propiedadId);
                    setFavorites(favIds);
                })
                .catch((err) =>
                    console.error("Error fetching favourites:", err)
                );
        }
    }, [userId]);

    // Manejo de "me gusta"
    const handleLike = async (propertyId) => {
        if (!userId) return; // no hacer nada si no hay usuario

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

    // Filtro avanzado
    const handleSearch = ({ ubicacion, tipo, precio }) => {
        let results = properties;

        if (ubicacion) {
            const loc = ubicacion.toLowerCase();
            results = results.filter((p) =>
                `${p.ciudad} ${p.provincia} ${p.direccion}`
                    .toLowerCase()
                    .includes(loc)
            );
        }

        if (tipo) {
            const t = tipo.toLowerCase();
            results = results.filter((p) => p.titulo.toLowerCase().includes(t));
        }

        if (precio) {
            results = results.filter((p) => {
                const pr = p.precio;
                if (precio === "1-100000") return pr <= 100000;
                if (precio === "100000-299999")
                    return pr > 100000 && pr <= 299999;
                if (precio === "300000-499999")
                    return pr > 300000 && pr <= 499999;
                if (precio === "500000+") return pr > 500000;
                return true;
            });
        }

        setFiltered(results);
    };

    return (
        <div className="p-4">
            <SearchBar onSearch={handleSearch} />
            <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((prop) => (
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
                                // 2. Si hay una URL de imagen, determina si es absoluta o relativa.
                                prop.imagenes &&
                                prop.imagenes.length > 0 &&
                                prop.imagenes[0]?.url
                                    ? prop.imagenes[0].url.startsWith("http")
                                        ? prop.imagenes[0].url
                                        : `${BASE_URL_IMG}${encodeURI(
                                            prop.imagenes[0].url
                                          )}` // URL relativa,
                                    : DEFAULT_IMAGE_URL  //  usa la imagen por defecto.
                            }
                            alt={prop.titulo}
                            className="w-full h-64 object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = DEFAULT_IMAGE_URL;
                            }}
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">
                                {prop.titulo}
                            </h3>
                            <p className="text-lg text-gray-800">
                                {prop.direccion}
                            </p>
                            <p className="text-sm text-gray-400">
                                <span className="font-medium">
                                    {prop.provincia}
                                </span>
                                , {prop.ciudad}
                            </p>
                            <p className="text-indigo-600 font-bold text-2xl mt-2">
                                {prop.precio.toLocaleString()} €
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
