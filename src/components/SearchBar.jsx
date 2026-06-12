import { useState } from "react";

export default function SearchBar({ onSearch, facetas = null, currentFilters = {} }) {
    const [texto, setTexto] = useState(currentFilters.texto || "");
    const [ciudad, setCiudad] = useState(currentFilters.ciudad || "");
    const [tipo, setTipo] = useState(currentFilters.tipo || "");
    const [precioMin, setPrecioMin] = useState(currentFilters.precioMin || "");
    const [precioMax, setPrecioMax] = useState(currentFilters.precioMax || "");
    const [superficieMin, setSuperficieMin] = useState(currentFilters.superficieMin || "");
    const [superficieMax, setSuperficieMax] = useState(currentFilters.superficieMax || "");
    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    const handleSubmit = () => {
        onSearch({ texto, ciudad, tipo, precioMin, precioMax, superficieMin, superficieMax });
    };

    const handleClear = () => {
        setTexto("");
        setCiudad("");
        setTipo("");
        setPrecioMin("");
        setPrecioMax("");
        setSuperficieMin("");
        setSuperficieMax("");
        onSearch({});
    };

    const handleFacetaClick = (key, value) => {
        if (key === "ciudad") setCiudad(value);
        if (key === "tipo") setTipo(value);
        onSearch({ texto, ciudad: key === "ciudad" ? value : ciudad, tipo: key === "tipo" ? value : tipo, precioMin, precioMax, superficieMin, superficieMax });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
                <input
                    type="text"
                    placeholder="Buscar por texto, título, descripción..."
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    className="w-full md:flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    onClick={handleSubmit}
                    className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                >
                    Buscar
                </button>
                <button
                    onClick={handleClear}
                    className="w-full md:w-auto bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
                >
                    Borrar
                </button>
                <button
                    onClick={() => setMostrarFiltros(!mostrarFiltros)}
                    className="w-full md:w-auto text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1"
                >
                    {mostrarFiltros ? "Ocultar filtros" : "Más filtros"}
                </button>
            </div>

            {mostrarFiltros && (
                <div className="mt-4 flex flex-col md:flex-row gap-3 flex-wrap">
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="w-full md:w-auto p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Tipo de propiedad</option>
                        <option value="Piso">Piso</option>
                        <option value="Casa">Casa</option>
                        <option value="Ático">Ático</option>
                        <option value="Chalet">Chalet</option>
                    </select>
                    <select
                        value={precioMin}
                        onChange={(e) => setPrecioMin(e.target.value)}
                        className="w-full md:w-auto p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Precio mín.</option>
                        <option value="50000">50.000€</option>
                        <option value="100000">100.000€</option>
                        <option value="200000">200.000€</option>
                        <option value="300000">300.000€</option>
                        <option value="500000">500.000€</option>
                    </select>
                    <select
                        value={precioMax}
                        onChange={(e) => setPrecioMax(e.target.value)}
                        className="w-full md:w-auto p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Precio máx.</option>
                        <option value="100000">100.000€</option>
                        <option value="200000">200.000€</option>
                        <option value="300000">300.000€</option>
                        <option value="500000">500.000€</option>
                        <option value="1000000">1.000.000€</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Superficie mín. (m²)"
                        value={superficieMin}
                        onChange={(e) => setSuperficieMin(e.target.value)}
                        className="w-full md:w-48 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="number"
                        placeholder="Superficie máx. (m²)"
                        value={superficieMax}
                        onChange={(e) => setSuperficieMax(e.target.value)}
                        className="w-full md:w-48 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="text"
                        placeholder="Ciudad"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                        className="w-full md:w-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            )}

            {facetas && (
                <div className="mt-4 flex flex-wrap gap-6">
                    {facetas.ciudades && Object.keys(facetas.ciudades).length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-gray-600 mb-2">Ciudades</h4>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(facetas.ciudades).slice(0, 8).map(([ciudadNombre, count]) => (
                                    <button
                                        key={ciudadNombre}
                                        onClick={() => handleFacetaClick("ciudad", ciudadNombre)}
                                        className={`text-sm px-3 py-1 rounded-full border transition ${
                                            currentFilters.ciudad === ciudadNombre
                                                ? "bg-indigo-600 text-white border-indigo-600"
                                                : "bg-gray-50 text-gray-700 border-gray-300 hover:border-indigo-400"
                                        }`}
                                    >
                                        {ciudadNombre} ({count})
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {facetas.tipos && Object.keys(facetas.tipos).length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-gray-600 mb-2">Tipos</h4>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(facetas.tipos).map(([tipoNombre, count]) => (
                                    <button
                                        key={tipoNombre}
                                        onClick={() => handleFacetaClick("tipo", tipoNombre)}
                                        className={`text-sm px-3 py-1 rounded-full border transition ${
                                            currentFilters.tipo === tipoNombre
                                                ? "bg-indigo-600 text-white border-indigo-600"
                                                : "bg-gray-50 text-gray-700 border-gray-300 hover:border-indigo-400"
                                        }`}
                                    >
                                        {tipoNombre} ({count})
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {(currentFilters.ciudad || currentFilters.tipo) && (
                <div className="mt-3 flex gap-2 flex-wrap">
                    {currentFilters.ciudad && (
                        <span className="inline-flex items-center gap-1 text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                            {currentFilters.ciudad}
                            <button onClick={() => { setCiudad(""); onSearch({ ...currentFilters, ciudad: "" }); }} className="font-bold hover:text-indigo-900">×</button>
                        </span>
                    )}
                    {currentFilters.tipo && (
                        <span className="inline-flex items-center gap-1 text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                            {currentFilters.tipo}
                            <button onClick={() => { setTipo(""); onSearch({ ...currentFilters, tipo: "" }); }} className="font-bold hover:text-indigo-900">×</button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}