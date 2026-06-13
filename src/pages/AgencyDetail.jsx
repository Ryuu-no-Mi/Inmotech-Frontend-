import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { api, publicApi } from "../api";
import PropertyCard from "../components/PropertyCard";
import BtnVolver from "../components/BtnInicio";
import { Building2, MapPin, Phone, Mail } from "lucide-react";

export default function AgencyDetail() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const [properties, setProperties] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [agency, setAgency] = useState(null);
    const [loading, setLoading] = useState(true);

    const agencyId = id || user?.idAgencia;
    const isOwner = user?.idAgencia && user.idAgencia.toString() === agencyId?.toString();

    useEffect(() => {
        if (!agencyId) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const [propRes, agencyRes] = await Promise.all([
                    publicApi.get("/property"),
                    publicApi.get(`/agency/${agencyId}`)
                ]);

                const allProperties = propRes.data.content || propRes.data;
                const filtered = allProperties.filter(
                    (p) => p.idAgencia === parseInt(agencyId) && p.activo === true
                );
                setProperties(filtered);
                setAgency(agencyRes.data);
            } catch (err) {
                console.error("Error loading agency data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [agencyId]);

    useEffect(() => {
        if (user?.id && isOwner) {
            api.get(`/favourite/${user.id}`)
                .then((res) => {
                    const favIds = (res.data || []).map((f) => f.propiedadId);
                    setFavorites(favIds);
                })
                .catch((err) => console.error("Error loading favorites:", err));
        }
    }, [user?.id, isOwner]);

    const handleFavoriteToggle = async (propertyId) => {
        if (!user?.id) return;
        const isFav = favorites.includes(propertyId);
        try {
            if (isFav) {
                await api.delete(`/favourite/${user.id}/${propertyId}`);
                setFavorites((prev) => prev.filter((id) => id !== propertyId));
            } else {
                await api.post(`/favourite/${user.id}/${propertyId}`);
                setFavorites((prev) => [...prev, propertyId]);
            }
        } catch (err) {
            console.error("Error toggling favorite:", err);
        }
    };

    if (!id && !user?.idAgencia) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto p-6 text-center">
                    <div className="bg-white rounded-xl shadow-sm p-8">
                        <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Sin agencia asignada
                        </h2>
                        <p className="text-gray-600 mb-4">
                            No estás vinculado a ninguna agencia y no se especificó una.
                        </p>
                        <BtnVolver />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                {agency && (
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center">
                                <Building2 className="w-8 h-8 text-indigo-600" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                    {agency.nombre}
                                </h1>
                                {agency.descripcion && (
                                    <p className="text-gray-600 mb-3">{agency.descripcion}</p>
                                )}
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                    {agency.ubicacion && (
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {agency.ubicacion}
                                        </span>
                                    )}
                                    {agency.telefono && (
                                        <span className="flex items-center gap-1">
                                            <Phone className="w-4 h-4" />
                                            {agency.telefono}
                                        </span>
                                    )}
                                    {agency.email && (
                                        <span className="flex items-center gap-1">
                                            <Mail className="w-4 h-4" />
                                            {agency.email}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Propiedades de la agencia ({properties.length})
                        </h2>
                        {isOwner && (
                            <button
                                onClick={() => navigate("/create-property")}
                                className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                + Nueva propiedad
                            </button>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="text-gray-500">Cargando propiedades...</div>
                        </div>
                    ) : properties.length === 0 ? (
                        <div className="text-center py-12">
                            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">
                                No hay propiedades activas en esta agencia.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {properties.map((prop) => (
                                <PropertyCard
                                    key={prop.id}
                                    prop={prop}
                                    isFavorite={favorites.includes(prop.id)}
                                    onFavoriteToggle={handleFavoriteToggle}
                                    showFavoriteButton={isOwner}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <BtnVolver />
                </div>
            </div>
        </div>
    );
}