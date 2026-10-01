import { useState } from "react";
import { Link } from "react-router-dom";
import PropertyList from "../components/PropertyList";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Footer from "../components/Footer";
import { Building2, Home as HomeIcon, Landmark, TreePine, X } from "lucide-react";

const CATEGORIES = [
    { id: "Piso", label: "Pisos", icon: Building2 },
    { id: "Casa", label: "Casas", icon: HomeIcon },
    { id: "OBRA_NUEVA", label: "Obra Nueva", icon: Landmark, proximamente: true },
    { id: "Terreno", label: "Terrenos", icon: TreePine, proximamente: true },
];

export default function Home() {
    const { user } = useContext(AuthContext);
    const [proximamenteMsg, setProximamenteMsg] = useState(null);

    const handleCategoryClick = (cat) => {
        if (cat.proximamente) {
            setProximamenteMsg(cat.label);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main>
                <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-white py-20 px-4">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80')] bg-cover bg-center" />
                    </div>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h1 className="text-headline-lg mb-4">
                            Encuentra tu próximo hogar
                        </h1>
                        <p className="text-body-lg text-white/80 mb-8">
                            Miles de inmuebles te esperan
                        </p>
                        <div className="inline-flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryClick(cat)}
                                    className="flex-shrink-0 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full transition-all duration-200 text-label-md font-semibold cursor-pointer"
                                >
                                    <cat.icon className="w-4 h-4" />
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {proximamenteMsg && (
                    <section className="max-w-6xl mx-auto px-4 mt-6">
                        <div className="bg-secondary-container border border-outline rounded-xl p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                                    <Landmark className="w-6 h-6 text-secondary-foreground" />
                                </div>
                                <div>
                                    <h3 className="text-headline-md text-primary font-semibold">
                                        {proximamenteMsg} - Próximamente
                                    </h3>
                                    <p className="text-body-md text-on-surface-variant">
                                        Estamos trabajando para ofrecerte esta funcionalidad muy pronto.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setProximamenteMsg(null)}
                                className="p-2 hover:bg-surface-container rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-on-surface-variant" />
                            </button>
                        </div>
                    </section>
                )}

                <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
                    <PropertyList />
                </section>

                <section className="bg-surface py-16 mt-8">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-headline-lg text-on-surface mb-3">
                            ¿Tienes una propiedad?
                        </h2>
                        <p className="text-body-lg text-on-surface-variant mb-8">
                            Publica tu anuncio y reach a miles de compradores potenciales
                        </p>
                        <Link
                            to={user ? "/create-property" : "/login"}
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-lg transition active:scale-[0.98] text-label-md"
                        >
                            Publicar mi anuncio
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}