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
    const [distrito, setDistrito] = useState(currentFilters.distrito || "");
    const [barrio, setBarrio] = useState(currentFilters.barrio || "");
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
            distrito,
            barrio,
            tipos,
            tipoAgrupado,
            precioMin,
            precioMax,
            superficieMin,
            superficieMax
        });
    }, [operacion, texto, ciudad, distrito, barrio, tipoAgrupado, precioMin, precioMax, superficieMin, superficieMax, onSearch]);

    const handleClear = useCallback(() => {
        setOperacion("VENTA");
        setTexto("");
        setCiudad("");
        setDistrito("");
        setBarrio("");
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
        setCiudad(ciu);
        setDistrito("");
        setBarrio("");
        const tipos = tipoAgrupado ? TIPO_GRUPO_MAP[tipoAgrupado] : undefined;
        onSearch({ operacion, texto, ciudad: ciu, distrito: "", barrio: "", tipos, tipoAgrupado, precioMin, precioMax, superficieMin, superficieMax });
    }, [tipoAgrupado, operacion, texto, precioMin, precioMax, superficieMin, superficieMax, onSearch]);

    const handleFacetaDistrito = useCallback((dist) => {
        const newDist = distrito === dist ? "" : dist;
        setDistrito(newDist);
        setBarrio("");
        const tipos = tipoAgrupado ? TIPO_GRUPO_MAP[tipoAgrupado] : undefined;
        onSearch({ operacion, texto, ciudad, distrito: newDist, barrio: "", tipos, tipoAgrupado, precioMin, precioMax, superficieMin, superficieMax });
    }, [ciudad, tipoAgrupado, operacion, texto, precioMin, precioMax, superficieMin, superficieMax, onSearch]);

    const handleFacetaBarrio = useCallback((bar) => {
        const newBar = barrio === bar ? "" : bar;
        setBarrio(newBar);
        const tipos = tipoAgrupado ? TIPO_GRUPO_MAP[tipoAgrupado] : undefined;
        onSearch({ operacion, texto, ciudad, distrito, barrio: newBar, tipos, tipoAgrupado, precioMin, precioMax, superficieMin, superficieMax });
    }, [ciudad, distrito, tipoAgrupado, operacion, texto, precioMin, precioMax, superficieMin, superficieMax, onSearch]);

    const handleFacetaTipo = useCallback((tg) => {
        const newTipoAgrupado = tipoAgrupado === tg ? "" : tg;
        setTipoAgrupado(newTipoAgrupado);
        const tipos = newTipoAgrupado ? TIPO_GRUPO_MAP[newTipoAgrupado] : undefined;
        onSearch({ operacion, texto, ciudad, distrito, barrio, tipos, tipoAgrupado: newTipoAgrupado, precioMin, precioMax, superficieMin, superficieMax });
    }, [tipoAgrupado, ciudad, distrito, barrio, operacion, texto, precioMin, precioMax, superficieMin, superficieMax, onSearch]);

    const groupedCiudades = facetas?.ciudades
        ? Object.entries(facetas.ciudades)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 20)
        : [];

    

    return (
        <div className="bg-surface rounded-lg border border-outline-variant shadow-surface p-4">
            <div className="flex bg-surface-container-low rounded-lg p-1 mb-4">
                <button
                    onClick={() => handleOperacionToggle("VENTA")}
                    className={`flex-1 py-2.5 text-label-md font-semibold rounded-md transition-all duration-200 ${
                        operacion === "VENTA"
                            ? "bg-primary text-white shadow-sm"
                            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    }`}
                >
                    Comprar
                </button>
                <button
                    onClick={() => handleOperacionToggle("ALQUILER")}
                    className={`flex-1 py-2.5 text-label-md font-semibold rounded-md transition-all duration-200 ${
                        operacion === "ALQUILER"
                            ? "bg-primary text-white shadow-sm"
                            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    }`}
                >
                    Alquilar
                </button>
                <button
                    onClick={() => handleOperacionToggle("OBRA_NUEVA")}
                    className={`flex-1 py-2.5 text-label-md font-semibold rounded-md transition-all duration-200 ${
                        operacion === "OBRA_NUEVA"
                            ? "bg-primary text-white shadow-sm"
                            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    }`}
                >
                    Obra Nueva
                </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
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
                        className="w-full pl-10 pr-4 py-3 border border-outline rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleSubmit}
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition font-semibold flex items-center gap-2 active:scale-[0.98]"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Buscar
                    </button>
                    <button
                        onClick={() => setMostrarFiltros(!mostrarFiltros)}
                        className="text-primary hover:text-primary/80 font-semibold px-3 py-1 flex items-center gap-1 text-label-md"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12SlidersHorizontal" />
                        </svg>
                        {mostrarFiltros ? "Ocultar" : "Filtros"}
                    </button>
                </div>
            </div>

            {facetas && groupedCiudades.length > 0 && (
                <div className="flex items-center gap-3 mb-2">
                    <select
                        value={ciudad}
                        onChange={(e) => handleFacetaCiudad(e.target.value)}
                        className="flex-1 max-w-xs px-3 py-2.5 border border-outline rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-body-md"
                    >
                        <option value="">Todas las ciudades</option>
                        {groupedCiudades.map(([ciu, count]) => (
                            <option key={ciu} value={ciu}>{ciu} ({count})</option>
                        ))}
                    </select>
                    {ciudad && (
                        <button
                            onClick={() => handleFacetaCiudad("")}
                            className="text-on-surface-variant hover:text-primary text-label-md"
                        >
                            Limpiar
                        </button>
                    )}
                </div>
            )}

            {ciudad && facetas && facetas.distritos && Object.keys(facetas.distritos).length > 0 && (
                <div className="mb-3">
                    <span className="text-label-sm text-on-surface-variant mb-1 block">Distritos</span>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(facetas.distritos)
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 15)
                            .map(([dist, count]) => (
                                <button
                                    key={dist}
                                    onClick={() => handleFacetaDistrito(dist)}
                                    className={`text-label-sm px-3 py-1.5 rounded-full border transition-all ${
                                        distrito === dist
                                            ? "bg-primary text-white border-primary"
                                            : "bg-surface-container text-on-surface-variant border-outline hover:border-primary"
                                    }`}
                                >
                                    {dist} ({count})
                                </button>
                            ))}
                    </div>
                </div>
            )}

            {ciudad && facetas && facetas.barrios && Object.keys(facetas.barrios).length > 0 && (
                <div className="mb-3">
                    <span className="text-label-sm text-on-surface-variant mb-1 block">Barrios</span>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(facetas.barrios)
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 20)
                            .map(([bar, count]) => (
                                <button
                                    key={bar}
                                    onClick={() => handleFacetaBarrio(bar)}
                                    className={`text-label-sm px-3 py-1.5 rounded-full border transition-all ${
                                        barrio === bar
                                            ? "bg-primary text-white border-primary"
                                            : "bg-surface-container text-on-surface-variant border-outline hover:border-primary"
                                    }`}
                                >
                                    {bar} ({count})
                                </button>
                            ))}
                    </div>
                </div>
            )}

            {mostrarFiltros && (
                <div className="mt-4 pt-4 border-t border-outline-variant">
                    <div className="flex flex-wrap gap-3">
                        <select
                            value={precioMin}
                            onChange={(e) => setPrecioMin(e.target.value)}
                            className="px-3 py-2.5 border border-outline rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-body-md"
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
                            className="px-3 py-2.5 border border-outline rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-body-md"
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
                            className="px-3 py-2.5 border border-outline rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-body-md w-36"
                        />
                        <input
                            type="number"
                            placeholder="Superficie max. (m²)"
                            value={superficieMax}
                            onChange={(e) => setSuperficieMax(e.target.value)}
                            className="px-3 py-2.5 border border-outline rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-body-md w-36"
                        />
                        <button
                            onClick={handleClear}
                            className="text-on-surface-variant hover:text-primary text-label-md px-2"
                        >
                            Limpiar filtros
                        </button>
                    </div>

                    {facetas && (
                        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-outline-variant">
                            {["Piso", "Casa"].map((group) => (
                                <button
                                    key={group}
                                    onClick={() => handleFacetaTipo(group)}
                                    className={`text-label-md px-4 py-2 rounded-full border transition-all duration-200 ${
                                        tipoAgrupado === group
                                            ? "bg-primary text-white border-primary"
                                            : "bg-surface-container text-on-surface-variant border-outline hover:border-primary hover:text-primary"
                                    }`}
                                >
                                    {group}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {(ciudad || tipoAgrupado || precioMin || precioMax || superficieMin || superficieMax || distrito || barrio) && (
                <div className="mt-4 flex gap-2 flex-wrap items-center">
                    <span className="text-label-md text-on-surface-variant">Filtros activos:</span>
                    {ciudad && (
                        <span className="inline-flex items-center gap-1 text-label-md bg-primary-container text-primary px-3 py-1.5 rounded-full">
                            {ciudad}
                            <button onClick={() => handleFacetaCiudad("")} className="font-bold hover:text-primary/70 ml-1">×</button>
                        </span>
                    )}
                    {distrito && (
                        <span className="inline-flex items-center gap-1 text-label-md bg-secondary-container text-secondary px-3 py-1.5 rounded-full">
                            {distrito}
                            <button onClick={() => handleFacetaDistrito(distrito)} className="font-bold hover:text-secondary/70 ml-1">×</button>
                        </span>
                    )}
                    {barrio && (
                        <span className="inline-flex items-center gap-1 text-label-md bg-tertiary-container text-tertiary px-3 py-1.5 rounded-full">
                            {barrio}
                            <button onClick={() => handleFacetaBarrio(barrio)} className="font-bold hover:text-tertiary/70 ml-1">×</button>
                        </span>
                    )}
                    {tipoAgrupado && (
                        <span className="inline-flex items-center gap-1 text-label-md bg-primary-container text-primary px-3 py-1.5 rounded-full">
                            {tipoAgrupado}
                            <button onClick={() => handleFacetaTipo(tipoAgrupado)} className="font-bold hover:text-primary/70 ml-1">×</button>
                        </span>
                    )}
                    {precioMin && (
                        <span className="inline-flex items-center gap-1 text-label-md bg-surface-container text-on-surface-variant px-3 py-1.5 rounded-full">
                            Min: {parseInt(precioMin).toLocaleString()} €
                        </span>
                    )}
                    {precioMax && (
                        <span className="inline-flex items-center gap-1 text-label-md bg-surface-container text-on-surface-variant px-3 py-1.5 rounded-full">
                            Max: {parseInt(precioMax).toLocaleString()} €
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}