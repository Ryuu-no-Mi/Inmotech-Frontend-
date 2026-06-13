import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { publicApi } from "../api";
import PropertyCard from "../components/PropertyCard";
import Footer from "../components/Footer";
import { ChevronLeft, Building2, Mail, Phone, Star, Users } from "lucide-react";

export default function AgentPublic() {
    const { id } = useParams();
    const [agent, setAgent] = useState(null);
    const [agency, setAgency] = useState(null);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const userRes = await publicApi.get(`/user/${id}`);
                const userData = userRes.data;
                
                setAgent({
                    id: userData.id,
                    nombre: userData.nombre,
                    apellido: userData.apellido,
                    email: userData.email,
                    telefono: userData.telefono,
                    imagenUrl: userData.imagenUrl,
                    idAgencia: userData.idAgencia
                });

                if (userData.idAgencia) {
                    const agencyRes = await publicApi.get(`/agency/${userData.idAgencia}`);
                    setAgency(agencyRes.data);

                    const propRes = await publicApi.get("/property");
                    const allProperties = propRes.data.content || propRes.data;
                    const filtered = allProperties.filter(
                        (p) => p.idAgencia === parseInt(userData.idAgencia) && p.activo === true
                    );
                    setProperties(filtered);
                }
            } catch (err) {
                console.error("Error loading agent:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-on-surface-variant">Cargando...</div>
            </div>
        );
    }

    if (!agent) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <Users className="w-16 h-16 text-outline mx-auto mb-4" />
                    <h2 className="text-headline-md text-on-surface">Agente no encontrado</h2>
                    <Link to="/" className="text-primary mt-4 inline-block">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    const agentInitials = agent.nombre && agent.apellido
        ? `${agent.nombre[0]}${agent.apellido[0]}`.toUpperCase()
        : agent.nombre?.[0]?.toUpperCase() || "A";

    return (
        <div className="min-h-screen bg-background">
            <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                            <span className="text-label-md">Volver</span>
                        </Link>
                    </div>
                    <Link to="/" className="text-headline-md font-bold text-primary">
                        InmoTech
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <section className="bg-surface p-6 rounded-xl border border-outline-variant mb-8">
                    <div className="flex items-start gap-6">
                        <div className="w-24 h-24 rounded-full bg-primary-container flex items-center justify-center text-headline-lg font-bold text-primary shrink-0">
                            {agentInitials}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-headline-lg text-primary">
                                {agent.nombre} {agent.apellido}
                            </h1>
                            <p className="text-on-surface-variant text-label-md mt-1">
                                Agente Inmobiliario
                            </p>
                            
                            {agency && (
                                <Link 
                                    to={`/agency/${agency.id}`}
                                    className="inline-flex items-center gap-2 mt-2 text-primary text-label-md hover:underline"
                                >
                                    <Building2 className="w-4 h-4" />
                                    {agency.nombre}
                                </Link>
                            )}

                            <div className="flex flex-wrap gap-4 text-label-md text-on-surface-variant mt-4">
                                {agent.telefono && (
                                    <span className="flex items-center gap-1">
                                        <Phone className="w-4 h-4" />
                                        {agent.telefono}
                                    </span>
                                )}
                                {agent.email && (
                                    <span className="flex items-center gap-1">
                                        <Mail className="w-4 h-4" />
                                        {agent.email}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2 mt-4">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-4 h-4 ${star <= 4 ? "text-amber-400 fill-amber-400" : "text-outline"}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-label-md text-on-surface-variant">
                                    4.8 (15 reseñas)
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-label-md hover:bg-primary/90 transition-colors">
                                <Mail className="w-4 h-4" />
                                Contactar
                            </button>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-headline-md text-primary mb-4">
                        Propiedades ({properties.length})
                    </h2>

                    {properties.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 bg-surface rounded-xl border border-outline-variant">
                            <Building2 className="w-12 h-12 text-outline mb-4" />
                            <p className="text-body-lg text-on-surface">
                                Sin propiedades activas
                            </p>
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
            </main>

            <Footer />
        </div>
    );
}