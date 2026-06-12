import { useState } from "react";

const TIPOS_PISO = ["PISO", "ESTUDIO", "DUPLEX", "ATICO", "PENTHOUSE"];
const TIPOS_CASA = ["CASA", "CHALET", "VILLA"];

export default function SearchBar({ onSearch, facetas = null, currentFilters = {}, onFacetasChange }) {
    const [operacion, setOperacion] = useState(currentFilters.operacion || "");
    const [texto, setTexto] = useState(currentFilters.texto || "");
    const [ciudad, setCiudad] = useState(currentFilters.ciudad || "");
    const [tipoAgrupado, setTipoAgrupado] = useState(currentFilters.tipoAgrupado || "");
    const [precioMin, setPrecioMin] = useState(currentFilters.precioMin || "");
    const [precioMax, setPrecioMax] = useState(currentFilters.precioMax || "");
    const [superficieMin, setSuperficieMin] = useState(currentFilters.superficieMin || "");
    const [superficieMax, setSuperficieMax] = useState(currentFilters.superficieMax || "");
    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    const handleSubmit = () => {
        let tipo = "";
        if (tipoAgrupado === "Piso") tipo = TIPOS_PISO[randomInt(0, TIPOS_PISO.length - 1)];
        else if (tipoAgrupado === "Casa") tipo = TIPOS_CASA[randomInt(0, TIPOS_CASA.length - 1)];
        else if (tipoAgrupado === "Otro") tipo = "OTRO";

        onSearch({ operacion, texto, ciudad, tipo, tipoAgrupado, precioMin, precioMax, superficieMin, superficieMax });
    };

    const handleClear = () => {
        setOperacion("");
        setTexto("");
        setCiudad("");
        setTipoAgrupado("");
        setPrecioMin("");
        setPrecioMax("");
        setSuperficieMin("");
        setSuperficieMax("");
        onSearch({});
    };

    const handleOperacionToggle = (op) => {
        const newOp = operacion === op ? "" : op;
        setOperacion(newOp);
        onSearch({ operacion: newOp, texto, ciudad, tipo: "", tipoAgrupado: "", precioMin, precioMax, superficieMin, superficieMax });
    };

    const handleFacetaCiudad = (ciu) => {
        const newCiudad = ciudad === ciu ? "" : ciu;
        setCiudad(newCiudad);
        onSearch({ operacion, texto, ciudad: newCiudad, tipo: "", tipoAgrupado, precioMin, precioMax, superficieMin, superficieMax });
    };

    const handleFacetaTipo = (tg) => {
        const newTipoAgrupado = tipoAgrupado === tg ? "" : tg;
        setTipoAgrupado(newTipoAgrupado);
        let tipo = "";
        if (newTipoAgrupado === "Piso") tipo = TIPOS_PISO[randomInt(0, TIPOS_PISO.length - 1)];
        else if (newTipoAgrupado === "Casa") tipo = TIPOS_CASA[randomInt(0, TIPOS_CASA.length - 1)];
        else if (newTipoAgrupado === "Otro") tipo = "OTRO";
        onSearch({ operacion, texto, ciudad, tipo, tipoAgrupado: newTipoAgrupado, precioMin, precioMax, superficieMin, superficieMax });
    };

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
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex flex-wrap gap-2 mb-3">
                <button
                    onClick={() => handleOperacionToggle("VENTA")}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                        operacion === "VENTA"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    VENTA
                </button>
                <button
                    onClick={() => handleOperacionToggle("ALQUILER")}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                        operacion === "ALQUILER"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    ALQUILER
                </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3">
                <input
                    type="text"
                    placeholder="Buscar por texto, titulo, descripcion..."
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
                    {mostrarFiltros ? "Ocultar filtros" : "Mas filtros"}
                </button>
            </div>

            {mostrarFiltros && (
                <div className="mt-4 flex flex-col md:flex-row gap-3 flex-wrap">
                    <select
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                        className="w-full md:w-48 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Todas las ciudades</option>
                        {groupedCiudades.map(([ciu, count]) => (
                            <option key={ciu} value={ciu}>{ciu} ({count})</option>
                        ))}
                    </select>
                    <select
                        value={precioMin}
                        onChange={(e) => setPrecioMin(e.target.value)}
                        className="w-full md:w-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Precio min.</option>
                        <option value="50000">50.000 Eur</option>
                        <option value="100000">100.000 Eur</option>
                        <option value="200000">200.000 Eur</option>
                        <option value="300000">300.000 Eur</option>
                        <option value="500000">500.000 Eur</option>
                        <option value="1000000">1.000.000 Eur</option>
                    </select>
                    <select
                        value={precioMax}
                        onChange={(e) => setPrecioMax(e.target.value)}
                        className="w-full md:w-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Precio max.</option>
                        <option value="100000">100.000 Eur</option>
                        <option value="200000">200.000 Eur</option>
                        <option value="300000">300.000 Eur</option>
                        <option value="500000">500.000 Eur</option>
                        <option value="1000000">1.000.000 Eur</option>
                        <option value="2000000">2.000.000 Eur</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Superficie min. (m2)"
                        value={superficieMin}
                        onChange={(e) => setSuperficieMin(e.target.value)}
                        className="w-full md:w-44 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="number"
                        placeholder="Superficie max. (m2)"
                        value={superficieMax}
                        onChange={(e) => setSuperficieMax(e.target.value)}
                        className="w-full md:w-44 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            )}

            {facetas && (
                <div className="mt-4 flex flex-wrap gap-6">
                    {groupedCiudades.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-gray-600 mb-2">Ciudades</h4>
                            <div className="flex flex-wrap gap-2">
                                {groupedCiudades.map(([ciu, count]) => (
                                    <button
                                        key={ciu}
                                        onClick={() => handleFacetaCiudad(ciu)}
                                        className={`text-sm px-3 py-1 rounded-full border transition ${
                                            ciudad === ciu
                                                ? "bg-indigo-600 text-white border-indigo-600"
                                                : "bg-gray-50 text-gray-700 border-gray-300 hover:border-indigo-400"
                                        }`}
                                    >
                                        {ciu} ({count})
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {["Piso", "Casa", "Otro"].map((group) => {
                        const count = countByTipoGroup(group);
                        if (count === 0) return null;
                        return (
                            <div key={group}>
                                <h4 className="text-sm font-semibold text-gray-600 mb-2">{group}</h4>
                                <button
                                    onClick={() => handleFacetaTipo(group)}
                                    className={`text-sm px-3 py-1 rounded-full border transition ${
                                        tipoAgrupado === group
                                            ? "bg-indigo-600 text-white border-indigo-600"
                                            : "bg-gray-50 text-gray-700 border-gray-300 hover:border-indigo-400"
                                    }`}
                                >
                                    {group} ({count})
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {(ciudad || tipoAgrupado || precioMin || precioMax || superficieMin || superficieMax) && (
                <div className="mt-3 flex gap-2 flex-wrap">
                    {ciudad && (
                        <span className="inline-flex items-center gap-1 text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                            {ciudad}
                            <button onClick={() => handleFacetaCiudad(ciudad)} className="font-bold hover:text-indigo-900">x</button>
                        </span>
                    )}
                    {tipoAgrupado && (
                        <span className="inline-flex items-center gap-1 text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                            {tipoAgrupado}
                            <button onClick={() => handleFacetaTipo(tipoAgrupado)} className="font-bold hover:text-indigo-900">x</button>
                        </span>
                    )}
                    {precioMin && (
                        <span className="inline-flex items-center gap-1 text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                            Min: {precioMin} Eur
                        </span>
                    )}
                    {precioMax && (
                        <span className="inline-flex items-center gap-1 text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                            Max: {precioMax} Eur
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}