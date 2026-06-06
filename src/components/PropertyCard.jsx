import { Link } from "react-router-dom";
export default function PropertyCard({ prop }) {
    return (
        <div className="property-card p-4 m-4 border rounded shadow hover:shadow-lg transition-shadow">
            <h2>{prop.titulo}</h2>
            <img
                src={prop.imagenPortada?.url || prop.imagenes?.[0]?.url}
                alt={prop.titulo}
                className="w-full h-48 object-cover rounded mb-2"
            />
            <p>
                {prop.ciudad}, {prop.provincia}
            </p>
            <p>Precio: €{prop.precio}</p>
            <Link to={`/property/${prop.id}`}>Ver detalles</Link>
        </div>
    );
}
