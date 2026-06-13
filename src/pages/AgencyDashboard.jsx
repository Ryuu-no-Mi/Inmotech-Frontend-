import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { api, publicApi } from "../api";
import ProfileSidebar from "../components/ProfileSidebar";
import PropertyCard from "../components/PropertyCard";
import { Building2, MapPin, Phone, Mail, Users, Plus, MessageSquare } from "lucide-react";

export default function AgencyDashboard() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [agency, setAgency] = useState(null);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.idAgencia) {
            navigate("/create-agency");
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const [propRes, agencyRes] = await Promise.all([
                    publicApi.get("/property"),
                    publicApi.get(`/agency/${user.idAgencia}`)
                ]);

                const allProperties = propRes.data.content || propRes.data;
                const filtered = allProperties.filter(
                    (p) => p.idAgencia === parseInt(user.idAgencia) && p.activo === true
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
    }, [user?.idAgencia, navigate]);

    if (!user?.idAgencia) {
        return null;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-on-surface-variant">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 py-6 lg:flex lg:gap-6">
                <ProfileSidebar type="agency" />

                <main className="flex-1 space-y-6">
                    <section className="bg-surface p-6 rounded-xl border border-outline-variant">
                        <div className="flex items-start gap-4">
                            <div className="w-20 h-20 bg-primary-container rounded-xl flex items-center justify-center">
                                <Building2 className="w-10 h-10 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-headline-lg text-primary">
                                    {agency?.nombre}
                                </h1>
                                {agency?.descripcion && (
                                    <p className="text-on-surface-variant text-label-md mt-1">
                                        {agency.descripcion}
                                    </p>
                                )}
                                <div className="flex flex-wrap gap-4 text-label-md text-on-surface-variant mt-3">
                                    {agency?.ubicacion && (
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {agency.ubicacion}
                                        </span>
                                    )}
                                    {agency?.telefono && (
                                        <span className="flex items-center gap-1">
                                            <Phone className="w-4 h-4" />
                                            {agency.telefono}
                                        </span>
                                    )}
                                    {agency?.email && (
                                        <span className="flex items-center gap-1">
                                            <Mail className="w-4 h-4" />
                                            {agency.email}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-container text-primary text-label-sm rounded-full">
                                    Plan Premium
                                </span>
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-primary-container p-6 rounded-xl text-center">
                            <span className="text-headline-xl text-primary font-bold">
                                {properties.length}
                            </span>
                            <span className="block text-on-primary-container/80 text-label-md">
                                Propiedades activas
                            </span>
                        </div>
                        <div className="bg-secondary-container p-6 rounded-xl text-center opacity-60">
                            <span className="text-headline-xl text-on-secondary-container font-bold">
                                --
                            </span>
                            <span className="block text-on-secondary-container/80 text-label-md">
                                Agentes
                            </span>
                        </div>
                        <div className="bg-surface p-6 rounded-xl text-center border border-outline-variant opacity-60">
                            <MessageSquare className="w-8 h-8 text-outline mx-auto mb-2" />
                            <span className="text-label-md text-on-surface-variant">
                                Mensajes - Próximamente
                            </span>
                        </div>
                    </section>

                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-headline-md text-primary">Propiedades de la agencia</h3>
                            <div className="flex gap-2">
                                <Link
                                    to="/create-property"
                                    className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-label-md hover:bg-primary/90 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Nueva propiedad
                                </Link>
                                <Link
                                    to={`/agency/${user.idAgencia}`}
                                    className="inline-flex items-center gap-2 border border-outline px-4 py-2 rounded-lg text-label-md hover:bg-surface-container transition-colors"
                                >
                                    Ver perfil público
                                </Link>
                            </div>
                        </div>

                        {properties.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 bg-surface rounded-xl border border-outline-variant">
                                <Building2 className="w-12 h-12 text-outline mb-4" />
                                <p className="text-body-lg text-on-surface mb-2">
                                    No hay propiedades activas
                                </p>
                                <p className="text-label-md text-on-surface-variant mb-4">
                                    Crea tu primera propiedad para empezar
                                </p>
                                <Link
                                    to="/create-property"
                                    className="bg-primary text-white px-6 py-2 rounded-lg text-label-md hover:bg-primary/90 transition-colors"
                                >
                                    Crear propiedad
                                </Link>
                            </div>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {properties.map((prop) => (
                                    <PropertyCard
                                        key={prop.id}
                                        prop={prop}
                                        isFavorite={false}
                                        onFavoriteToggle={() => {}}
                                        showFavoriteButton={false}
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="bg-surface p-6 rounded-xl border border-outline-variant opacity-60">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-headline-md text-primary">Agentes de la agencia</h3>
                            <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                Próximamente
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <Users className="w-10 h-10 text-outline mb-3" />
                            <p className="text-label-md text-on-surface-variant mb-1">
                                Gestiona los agentes de tu agencia
                            </p>
                            <p className="text-label-sm text-outline">
                                Próximamente podrás invitar agentes y gestionar sus perfiles
                            </p>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}