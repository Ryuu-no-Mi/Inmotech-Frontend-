import { Link } from "react-router-dom";
import { Heart, Bed, Maximize2 } from "lucide-react";
import { BASE_URL_IMG } from "../api";

const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80";

export default function PropertyCard({ 
    prop, 
    isFavorite, 
    onFavoriteToggle,
    showFavoriteButton = false 
}) {
    const imageUrl = prop.imagenes?.[0]?.url
        ? prop.imagenes[0].url.startsWith("http")
            ? prop.imagenes[0].url
            : `${BASE_URL_IMG}${encodeURI(prop.imagenes[0].url)}`
        : DEFAULT_IMAGE_URL;

    const isVenta = prop.operacion === "VENTA" || prop.operacion === "ALQUILER" || prop.operacion === "OBRA_NUEVA";
    const badgeClass = prop.operacion === "ALQUILER" 
        ? "bg-emerald-100 text-emerald-700" 
        : prop.operacion === "OBRA_NUEVA"
        ? "bg-amber-100 text-amber-700"
        : "bg-indigo-100 text-indigo-700";

    const formatPrice = (price) => {
        return new Intl.NumberFormat("es-ES").format(price);
    };

    return (
        <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={imageUrl}
                    alt={prop.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = DEFAULT_IMAGE_URL;
                    }}
                />
                
                <div className="absolute top-3 left-3 z-10">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass}`}>
                        {prop.operacion === "ALQUILER" ? "Alquiler" : 
                         prop.operacion === "OBRA_NUEVA" ? "Obra Nueva" : "Venta"}
                    </span>
                </div>

                {showFavoriteButton && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onFavoriteToggle(prop.id);
                        }}
                        className={`
                            absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300
                            ${isFavorite 
                                ? "bg-red-500 text-white scale-110 hover:bg-red-600" 
                                : "bg-white/90 backdrop-blur-sm text-gray-400 hover:bg-white hover:text-red-500 hover:scale-110"
                            }
                            shadow-md hover:shadow-lg
                        `}
                        aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                    >
                        <Heart className={`w-5 h-5 transition-all duration-300 ${isFavorite ? "fill-current animate-pulse" : ""}`} />
                    </button>
                )}

                {prop.destacado && (
                    <div className="absolute bottom-3 left-3 z-10">
                        <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                            Destacado
                        </span>
                    </div>
                )}
            </div>

            <Link to={`/property/${prop.id}`} className="block p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {formatPrice(prop.precio)} {prop.operacion === "ALQUILER" ? "€/mes" : "€"}
                    </h3>
                </div>

                <p className="text-gray-600 text-sm mb-1 line-clamp-1">
                    {prop.direccion}
                </p>
                <p className="text-gray-500 text-sm mb-3">
                    {prop.ciudad}, {prop.provincia}
                </p>

                <div className="flex items-center gap-4 pt-3 border-t border-gray-50">
                    {prop.superficie && (
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                            <Maximize2 className="w-4 h-4" />
                            <span>{prop.superficie} m²</span>
                        </div>
                    )}
                    {prop.habitaciones && (
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                            <Bed className="w-4 h-4" />
                            <span>{prop.habitaciones} Hab.</span>
                        </div>
                    )}
                    
                </div>
            </Link>
        </div>
    );
}