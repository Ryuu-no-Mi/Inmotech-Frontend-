import { Heart } from "lucide-react";

export default function FavoriteButton({ 
    isFavorite, 
    onToggle, 
    size = "md",
    className = "" 
}) {
    const sizeClasses = {
        sm: "p-1.5",
        md: "p-2",
        lg: "p-3"
    };

    const iconSizes = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6"
    };

    return (
        <button
            onClick={onToggle}
            className={`
                rounded-full transition-all duration-300
                ${sizeClasses[size]}
                ${isFavorite 
                    ? "bg-red-500 text-white hover:bg-red-600 scale-110" 
                    : "bg-white/90 backdrop-blur-sm text-gray-400 hover:bg-white hover:text-red-500 hover:scale-110"
                }
                shadow-md hover:shadow-lg
                ${className}
            `}
            aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
            <Heart 
                className={`
                    ${iconSizes[size]}
                    transition-all duration-300
                    ${isFavorite ? "fill-current animate-pulse" : ""}
                `} 
            />
        </button>
    );
}