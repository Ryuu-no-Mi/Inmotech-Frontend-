import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { api, BASE_URL_IMG } from "../api";
import ProfileSidebar from "../components/ProfileSidebar";
import PropertyCard from "../components/PropertyCard";
import { Heart, Settings, Mail, Calendar, Shield, Crown } from "lucide-react";

export default function UserProfile() {
    const { user, favorites } = useContext(AuthContext);
    const [favoriteProperties, setFavoriteProperties] = useState([]);
    const [loadingFavorites, setLoadingFavorites] = useState(true);

    useEffect(() => {
        if (favorites && favorites.length > 0) {
            setLoadingFavorites(true);
            Promise.all(
                favorites.map((id) => api.get("/property/" + id))
            )
                .then((responses) => {
                    setFavoriteProperties(responses.map((r) => r.data));
                })
                .catch((err) => console.error("Error loading favorites:", err))
                .finally(() => setLoadingFavorites(false));
        } else {
            setLoadingFavorites(false);
            setFavoriteProperties([]);
        }
    }, [favorites]);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES", {
            month: "long",
            year: "numeric"
        });
    };

    const userInitials = user?.nombre && user?.apellido
        ? `${user.nombre[0]}${user.apellido[0]}`.toUpperCase()
        : user?.nombre?.[0]?.toUpperCase() || "U";

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 py-6 lg:flex lg:gap-6">
                <ProfileSidebar type="user" />

                <main className="flex-1 space-y-6">
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 bg-surface p-6 rounded-xl border border-outline-variant flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-primary-container flex items-center justify-center text-headline-lg font-bold text-primary">
                                {userInitials}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-headline-lg text-primary">
                                    {user?.nombre} {user?.apellido}
                                </h1>
                                <p className="text-on-surface-variant text-label-md mt-1">
                                    Miembro desde {formatDate(user?.fechaRegistro)}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-container text-primary text-label-sm rounded-full">
                                        <Shield className="w-3 h-3" />
                                        Usuario Verificado
                                    </span>
                                    {user?.idAgencia && (
                                        <Link 
                                            to={`/agency/${user.idAgencia}`}
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-secondary-container text-on-secondary-container text-label-sm rounded-full hover:bg-secondary-fixed transition-colors"
                                        >
                                            <Crown className="w-3 h-3" />
                                            Admin de Agencia
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary-container p-6 rounded-xl flex flex-col justify-center items-center text-center">
                            <span className="text-headline-xl text-primary font-bold">
                                {favorites?.length || 0}
                            </span>
                            <span className="text-on-primary-container/80 text-label-md">
                                Favoritos guardados
                            </span>
                        </div>
                    </section>

                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-headline-md text-primary">Hogares guardados</h3>
                            <Link 
                                to="/my-profile/favorites" 
                                className="text-primary text-label-md hover:underline"
                            >
                                Ver todos
                            </Link>
                        </div>

                        {loadingFavorites ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="text-on-surface-variant">Cargando favoritos...</div>
                            </div>
                        ) : favoriteProperties.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 bg-surface rounded-xl border border-outline-variant">
                                <Heart className="w-12 h-12 text-outline mb-4" />
                                <p className="text-body-lg text-on-surface mb-2">
                                    No tienes favoritos guardados
                                </p>
                                <p className="text-label-md text-on-surface-variant">
                                    Explora propiedades y guarda las que te gusten
                                </p>
                                <Link
                                    to="/"
                                    className="mt-4 bg-primary text-white px-6 py-2 rounded-lg text-label-md hover:bg-primary/90 transition-colors"
                                >
                                    Explorar propiedades
                                </Link>
                            </div>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2">
                                {favoriteProperties.slice(0, 4).map((prop) => (
                                    <PropertyCard
                                        key={prop.id}
                                        prop={prop}
                                        isFavorite={true}
                                        onFavoriteToggle={() => {}}
                                        showFavoriteButton={false}
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-surface p-6 rounded-xl border border-outline-variant">
                            <h3 className="text-headline-md text-primary mb-4">Configuración</h3>
                            <div className="space-y-2">
                                <Link
                                    to="/edit-user"
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <Settings className="w-5 h-5 text-secondary" />
                                        <div>
                                            <p className="text-label-md">Información personal</p>
                                            <p className="text-label-sm text-on-surface-variant">
                                                Gestiona tu nombre y datos
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-outline group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </div>

                        <div className="bg-surface p-6 rounded-xl border border-outline-variant opacity-60">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-headline-md text-primary">Mensajes</h3>
                                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    Próximamente
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <Mail className="w-10 h-10 text-outline mb-3" />
                                <p className="text-label-md text-on-surface-variant">
                                    La mensajería estará disponible pronto
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}