import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropertyList from "../components/PropertyList";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Footer from "../components/Footer";
import { publicApi, parsePaginatedResponse } from "../api";
import { Home as HomeIcon, Apartment, Architecture, Landscape } from "lucide-react";

const CATEGORIES = [
    { id: "Piso", label: "Pisos", icon: Apartment },
    { id: "Casa", label: "Casas", icon: HomeIcon },
    { id: "OBRA_NUEVA", label: "Obra Nueva", icon: Architecture },
    { id: "Terreno", label: "Terrenos", icon: Landscape },
];

export default function Home() {
    const { user } = useContext(AuthContext);
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [loadingFeatured, setLoadingFeatured] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await publicApi.get("/property", {
                    params: { page: 0, size: 6 }
                });
                const parsed = parsePaginatedResponse(res);
                setFeaturedProperties(parsed.data.slice(0, 6));
            } catch (err) {
                console.error("Error fetching featured properties:", err);
            } finally {
                setLoadingFeatured(false);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main>
                <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white py-16 px-4">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80')] bg-cover bg-center" />
                    </div>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Encuentra tu próximo hogar
                        </h1>
                        <p className="text-indigo-100 text-lg mb-8">
                            Miles de inmuebles te esperan
                        </p>
                        <div className="inline-flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                            {CATEGORIES.map((cat) => (
                                <Link
                                    key={cat.id}
                                    to={`/?tipo=${cat.id}`}
                                    className="flex-shrink-0 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full transition text-sm font-medium"
                                >
                                    <cat.icon className="w-4 h-4" />
                                    {cat.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
                    <PropertyList userId={user?.id} />
                </section>

                <section className="bg-white py-12">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                ¿Tienes una propiedad?
                            </h2>
                            <p className="text-gray-600">
                                Publica tu anuncio y reach a miles de compradores potenciales
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <Link
                                to={user?.id ? "/create-property" : "/login"}
                                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition"
                            >
                                Publicar mi anuncio
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}