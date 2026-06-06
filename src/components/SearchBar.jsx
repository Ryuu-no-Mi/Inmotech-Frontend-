import { useState } from "react";

export default function SearchBar({ onSearch }) {
    const [ubicacion, setUbicacion] = useState("");
    const [tipo, setTipo] = useState("");
    const [precio, setPrecio] = useState("");

    const handleSubmit = () => {
        onSearch({ ubicacion, tipo, precio });
    };

    const handleClear = () => {
        setUbicacion("");
        setTipo("");
        setPrecio("");
        onSearch({ ubicacion: "", tipo: "", precio: "" });
    };

    return (
        <div className="search-bar flex flex-col md:flex-row md:items-center md:justify-center gap-3 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            {/* Input de Ubicación */}
            <input
                type="text"
                placeholder="Buscar por ubicación"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                // En pantallas pequeñas ocupa todo el ancho, en md y superiores ocupa espacio flexible
                className="w-full md:flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Select de Tipo de Propiedad */}
            <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                // En pantallas pequeñas ocupa todo el ancho, en md y superiores un ancho fijo o auto
                className="w-full md:w-auto p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <option value="">Tipo de propiedad</option>
                <option value="Piso">Piso</option>
                <option value="Casa">Casa</option>
                <option value="Ático">Ático</option>
                <option value="Chalet">Chalet</option>
            </select>

            {/* Select de Precio */}
            <select
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                // Similar al select anterior
                className="w-full md:w-auto p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <option value="">Todos los precios</option>
                <option value="1-100000">1 - 100.000€</option>
                <option value="100000-299999">100.000€ - 299.999€</option>
                <option value="300000-499999">300.000€ - 499.999€</option>
                <option value="500000+">Más de 500.000€</option>
            </select>

            {/* Botón Buscar */}
            <button
                onClick={handleSubmit}
                // En pantallas pequeñas ocupa todo el ancho, en md y superiores ancho automático
                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Buscar
            </button>

            {/* Botón Borrar Filtros */}
            <button
                onClick={handleClear}
                className="w-full md:w-auto bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
                Borrar Filtros
            </button>
        </div>
    );
}
