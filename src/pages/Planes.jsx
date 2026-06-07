import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { Check, X } from "lucide-react";
import StripeCheckoutButton from "../components/StripeCheckoutButton";

export default function Planes() {
    const navigate = useNavigate();
    const [limits, setLimits] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            api.get("/subscription/limits")
                .then((res) => setLimits(res.data))
                .catch(() => {});
        }
    }, []);

    const plans = [
        {
            name: "Gratuito",
            price: "0",
            period: "/mes",
            description: "Para particulares que quieren probar",
            features: [
                { text: "Hasta 2 propiedades", ok: true },
                { text: "Agencias: hasta 4 propiedades", ok: true },
                { text: "Alertas de busqueda", ok: false },
                { text: "Soporte prioritario", ok: false },
                { text: "Recomendaciones IA", ok: false },
            ],
            current: limits && !limits.esPremium,
            highlight: false,
        },
        {
            name: "Premium",
            price: "9.99",
            period: "/mes",
            description: "Para profesionales e inmobiliarias",
            features: [
                { text: "Propiedades ilimitadas", ok: true },
                { text: "Alertas de busqueda", ok: true },
                { text: "Soporte prioritario", ok: true },
                { text: "Recomendaciones IA", ok: true },
                { text: "Sin publicidad", ok: true },
            ],
            current: limits && limits.esPremium,
            highlight: true,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Planes de Suscripcion
                    </h1>
                    <p className="text-lg text-gray-600">
                        Elige el plan que mejor se adapte a tus necesidades
                    </p>
                    {limits && (
                        <p className="mt-2 text-sm text-gray-500">
                            Plan actual: <strong>{limits.planNombre}</strong> —{" "}
                            {limits.propiedadesActuales}/{limits.limiteMaximo === 2147483647 ? "∞" : limits.limiteMaximo} propiedades usadas
                        </p>
                    )}
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`rounded-2xl shadow-lg p-8 ${
                                plan.highlight
                                    ? "bg-indigo-600 text-white ring-4 ring-indigo-300 scale-105"
                                    : "bg-white text-gray-900"
                            } ${plan.current ? "ring-2 ring-green-400" : ""}`}
                        >
                            {plan.current && (
                                <span className="inline-block bg-green-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
                                    Plan actual
                                </span>
                            )}
                            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                            <p className={`mb-4 text-sm ${plan.highlight ? "text-indigo-100" : "text-gray-500"}`}>
                                {plan.description}
                            </p>
                            <div className="mb-6">
                                <span className="text-5xl font-extrabold">{plan.price}</span>
                                <span className="text-xl ml-1 opacity-80">€{plan.period}</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        {f.ok ? (
                                            <Check className={`w-5 h-5 ${plan.highlight ? "text-green-300" : "text-green-500"}`} />
                                        ) : (
                                            <X className={`w-5 h-5 ${plan.highlight ? "text-indigo-300" : "text-gray-400"}`} />
                                        )}
                                        <span className={f.ok ? "" : "opacity-60"}>{f.text}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => {
                                    if (plan.current) {
                                        navigate("/usuario");
                                    } else if (plan.highlight) {
                                        // Premium - Stripe checkout se maneja en el componente
                                    } else {
                                        navigate("/usuario");
                                    }
                                }}
                                className={`w-full py-3 rounded-xl font-semibold transition ${
                                    plan.highlight
                                        ? "bg-white text-indigo-600 hover:bg-indigo-50"
                                        : plan.current
                                        ? "bg-gray-200 text-gray-500 cursor-default"
                                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                                }`}
                            >
                                {plan.current ? "Plan actual" : plan.name === "Premium" ? "Suscribirse" : "Comenzar gratis"}
                            </button>
                            {plan.highlight && !plan.current && (
                                <StripeCheckoutButton />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
