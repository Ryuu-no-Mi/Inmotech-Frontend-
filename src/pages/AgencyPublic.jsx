import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { publicApi } from "../api";
import PropertyCard from "../components/PropertyCard";
import Footer from "../components/Footer";
import { Building2, MapPin, Phone, Mail, Users, MessageSquare, ChevronLeft } from "lucide-react";

export default function AgencyPublic() {
    const { id } = useParams();
    const [agency, setAgency] = useState(null);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const [propRes, agencyRes] = await Promise.all([
                    publicApi.get("/property"),
                    publicApi.get(`/agency/${id}`)
                ]);

                const allProperties = propRes.data.content || propRes.data;
                const filtered = allProperties.filter(
                    (p) => p.idAgencia === parseInt(id) && p.activo === true
                );
                setProperties(filtered);
                setAgency(agencyRes.data);
            } catch (err) {
                console.error("Error loading agency:", err);
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

    if (!agency) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <Building2 className="w-16 h-16 text-outline mx-auto mb-4" />
                    <h2 className="text-headline-md text-on-surface">Agencia no encontrada</h2>
                    <Link to="/" className="text-primary mt-4 inline-block">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

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
                        <div className="w-24 h-24 bg-primary-container rounded-xl flex items-center justify-center shrink-0">
                            <Building2 className="w-12 h-12 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-headline-lg text-primary">
                                {agency.nombre}
                            </h1>
                            {agency.descripcion && (
                                <p className="text-on-surface-variant text-body-md mt-2">
                                    {agency.descripcion}
                                </p>
                            )}
                            <div className="flex flex-wrap gap-4 text-label-md text-on-surface-variant mt-4">
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
                </section>

                <section className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-headline-md text-primary">
                            Propiedades ({properties.length})
                        </h2>
                        <div className="flex gap-2">
                            <button className="inline-flex items-center gap-2 border border-outline px-4 py-2 rounded-lg text-label-md hover:bg-surface-container transition-colors">
                                <Users className="w-4 h-4" />
                                Ver agentes
                            </button>
                            <button className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-label-md hover:bg-primary/90 transition-colors">
                                <MessageSquare className="w-4 h-4" />
                                Contactar agencia
                            </button>
                        </div>
                    </div>

                    {properties.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 bg-surface rounded-xl border border-outline-variant">
                            <Building2 className="w-12 h-12 text-outline mb-4" />
                            <p className="text-body-lg text-on-surface">
                                Esta agencia aún no tiene propiedades activas
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

                <section className="bg-surface p-6 rounded-xl border border-outline-variant opacity-60">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-headline-md text-primary">Nuestro equipo</h2>
                        <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Próximamente
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Users className="w-10 h-10 text-outline mb-3" />
                        <p className="text-label-md text-on-surface-variant">
                            Conoce a los profesionales de esta agencia
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}