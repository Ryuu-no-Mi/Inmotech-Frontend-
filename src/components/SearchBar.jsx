import { useState, useCallback } from "react";

const TIPOS_PISO = ["PISO", "ESTUDIO", "DUPLEX", "ATICO", "PENTHOUSE"];
const TIPOS_CASA = ["CASA", "CHALET", "VILLA"];

const TIPO_GRUPO_MAP = {
    Piso: TIPOS_PISO,
    Casa: TIPOS_CASA
};

export default function SearchBar({ onSearch, facetas = null, currentFilters = {} }) {
    const [operacion, setOperacion] = useState(currentFilters.operacion || "VENTA");
    const [texto, setTexto] = useState(currentFilters.texto || "");
    const [ciudad, setCiudad] = useState(currentFilters.ciudad || "");
    const [tipoAgrupado, setTipoAgrupado] = useState(currentFilters.tipoAgrupado || "");
    const [precioMin, setPrecioMin] = useState(currentFilters.precioMin || "");
    const [precioMax, setPrecioMax] = useState(currentFilters.precioMax || "");
    const [superficieMin, setSuperficieMin] = useState(currentFilters.superficieMin || "");
    const [superficieMax, setSuperficieMax] = useState(currentFilters.superficieMax || "");
    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    const handleSubmit = useCallback(() => {
        const tipos = tipoAgrupado ? TIPO_GRUPO_MAP[tipoAgrupado] : undefined;
        onSearch({ 
            operacion, 
            texto, 
            ciudad, 
            tipos,
            tipoAgrupado,
            precioMin, 
            precioMax, 
            superficieMin, 
            superficieMax 
        });
    }, [operacion, texto, ciudad, tipoAgrupado, precioMin, precioMax, superficieMin, superficieMax, onSearch]);

    const handleClear = useCallback(() => {
        setOperacion("VENTA");
        setTexto("");
        setCiudad("");
        setTipoAgrupado("");
        setPrecioMin("");
        setPrecioMax("");
        setSuperficieMin("");
        setSuperficieMax("");
        onSearch({ operacion: "VENTA" });
    }, [onSearch]);

    const handleOperacionToggle = useCallback((op) => {
        setOperacion(op);
        handleSubmit();
    }, [handleSubmit]);

    const handleFacetaCiudad = useCallback((ciu) => {
        const newCiudad = ciudad === ciu ? "" : ciu;
        setCiudad(newCiudad);
        const tipos = tipoAgrupado ? TIPO_GRUPO_MAP[tipoAgrupado] : undefined;
        onSearch({ operacion, texto, ciudad: newCiudad, tipos, tipoAgrupado, precioMin, precioMax, superficieMin, superficieMax });
    }, [ciudad, tipoAgrupado, operacion, texto, precioMin, precioMax, superficieMin, superficieMax, onSearch]);

    const handleFacetaTipo = useCallback((tg) => {
        const newTipoAgrupado = tipoAgrupado === tg ? "" : tg;
        setTipoAgrupado(newTipoAgrupado);
        const tipos = newTipoAgrupado ? TIPO_GRUPO_MAP[newTipoAgrupado] : undefined;
        onSearch({ operacion, texto, ciudad, tipos, tipoAgrupado: newTipoAgrupado, precioMin, precioMax, superficieMin, superficieMax });
    }, [tipoAgrupado, operacion, texto, ciudad, precioMin, precioMax, superficieMin, superficieMax, onSearch]);

    const groupedCiudades = facetas?.ciudades
        ? Object.entries(facetas.ciudades)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 20)
        : [];

    const countByTipoGroup = (group) => {
        if (!facetas?.tipos) return 0;
        const tipos = group === "Piso" ? TIPOS_PISO : group === "Casa" ? TIPOS_CASA : [];
        return tipos.reduce((sum, t) => sum + (facetas.tipos[t] || 0), 0);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
                <button
                    onClick={() => handleOperacionToggle("VENTA")}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                        operacion === "VENTA"
                            ? "bg-white text-indigo-600 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    Comprar
                </button>
                <button
                    onClick={() => handleOperacionToggle("ALQUILER")}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                        operacion === "ALQUILER"
                            ? "bg-white text-indigo-600 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    Alquilar
                </button>
                <button
                    onClick={() => handleOperacionToggle("OBRA_NUEVA")}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                        operacion === "OBRA_NUEVA"
                            ? "bg-white text-indigo-600 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    Obra Nueva
                </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="¿Dónde quieres vivir?"
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleSubmit}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition font-semibold flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Buscar
                    </button>
                    <button
                        onClick={() => setMostrarFiltros(!mostrarFiltros)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1 flex items-center gap-1"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12SlidersHorizontal" />
                        </svg>
                        {mostrarFiltros ? "Ocultar" : "Filtros"}
                    </button>
                </div>
            </div>

            {facetas && groupedCiudades.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 hide-scrollbar">
                    {groupedCiudades.map(([ciu, count]) => (
                        <button
                            key={ciu}
                            onClick={() => handleFacetaCiudad(ciu)}
                            className={`flex-shrink-0 text-sm px-3 py-1.5 rounded-full border transition whitespace-nowrap ${
                                ciudad === ciu
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-gray-50 text-gray-700 border-gray-200 hover:border-indigo-400"
                            }`}
                        >
                            {ciu} ({count})
                        </button>
                    ))}
                </div>
            )}

            {mostrarFiltros && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-4">
                        <select
                            value={precioMin}
                            onChange={(e) => setPrecioMin(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        >
                            <option value="">Precio min.</option>
                            <option value="50000">50.000 €</option>
                            <option value="100000">100.000 €</option>
                            <option value="200000">200.000 €</option>
                            <option value="300000">300.000 €</option>
                            <option value="500000">500.000 €</option>
                            <option value="1000000">1.000.000 €</option>
                        </select>
                        <select
                            value={precioMax}
                            onChange={(e) => setPrecioMax(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        >
                            <option value="">Precio max.</option>
                            <option value="100000">100.000 €</option>
                            <option value="200000">200.000 €</option>
                            <option value="300000">300.000 €</option>
                            <option value="500000">500.000 €</option>
                            <option value="1000000">1.000.000 €</option>
                            <option value="2000000">2.000.000 €</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Superficie min. (m²)"
                            value={superficieMin}
                            onChange={(e) => setSuperficieMin(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm w-36"
                        />
                        <input
                            type="number"
                            placeholder="Superficie max. (m²)"
                            value={superficieMax}
                            onChange={(e) => setSuperficieMax(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm w-36"
                        />
                        <button
                            onClick={handleClear}
                            className="text-gray-500 hover:text-gray-700 text-sm px-2"
                        >
                            Limpiar filtros
                        </button>
                    </div>

                    {facetas && (
                        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
                            {["Piso", "Casa"].map((group) => {
                                const count = countByTipoGroup(group);
                                if (count === 0) return null;
                                return (
                                    <button
                                        key={group}
                                        onClick={() => handleFacetaTipo(group)}
                                        className={`text-sm px-3 py-1.5 rounded-full border transition ${
                                            tipoAgrupado === group
                                                ? "bg-indigo-600 text-white border-indigo-600"
                                                : "bg-gray-50 text-gray-700 border-gray-200 hover:border-indigo-400"
                                        }`}
                                    >
                                        {group} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {(ciudad || tipoAgrupado || precioMin || precioMax || superficieMin || superficieMax) && (
                <div className="mt-4 flex gap-2 flex-wrap items-center">
                    <span className="text-sm text-gray-500">Filtros activos:</span>
                    {ciudad && (
                        <span className="inline-flex items-center gap-1 text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                            {ciudad}
                            <button onClick={() => handleFacetaCiudad(ciudad)} className="font-bold hover:text-indigo-900 ml-1">×</button>
                        </span>
                    )}
                    {tipoAgrupado && (
                        <span className="inline-flex items-center gap-1 text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                            {tipoAgrupado}
                            <button onClick={() => handleFacetaTipo(tipoAgrupado)} className="font-bold hover:text-indigo-900 ml-1">×</button>
                        </span>
                    )}
                    {precioMin && (
                        <span className="inline-flex items-center gap-1 text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                            Min: {parseInt(precioMin).toLocaleString()} €
                        </span>
                    )}
                    {precioMax && (
                        <span className="inline-flex items-center gap-1 text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                            Max: {parseInt(precioMax).toLocaleString()} €
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}