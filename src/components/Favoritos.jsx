// Favoritos.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Favoritos() {
    const userId = 2; // ← el ID real del usuario autenticado
    const navigate = useNavigate();
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/favourite/${userId}`)
            .then((res) => res.json())
            .then((data) => setFavoritos(data.map((f) => f.propiedad)))
            .catch((err) => console.error("Error al obtener favoritos:", err));
    }, []);

    if (favoritos.length === 0) {
        return (
            <div className="p-4 text-gray-500">No tienes favoritos aún.</div>
        );
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">
                Tus Propiedades Favoritas
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {favoritos.map((property) => (
                    <div
                        key={property.id}
                        onClick={() => navigate(`/property/${property.id}`)}
                        className="cursor-pointer bg-white rounded shadow hover:shadow-lg transition"
                    >
                        <img
                            src={property.imagenPortada?.url}
                            alt={property.titulo}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">
                                {property.titulo}
                            </h3>
                            <p className="text-gray-700">
                                {property.direccion}
                            </p>
                            <p className="text-indigo-600 font-bold mt-2">
                                {property.precio.toLocaleString()} €
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
