import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { api } from "../api";

export default function SuscripcionExito() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const handleConfirmar = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await api.post("/subscription/confirmar-premium", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setConfirmed(true);
        } catch (err) {
            alert("Error al confirmar la suscripción. Intenta de nuevo.");
            setLoading(false);
        }
    };

    if (confirmed) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        ¡Premium activado!
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Bienvenido a Inmotech Premium. Ahora tienes acceso ilimitado a todas las funcionalidades.
                    </p>
                    <Link
                        to="/usuario"
                        className="block w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                    >
                        Ir a mi perfil
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    ¡Pago recibido!
                </h1>
                <p className="text-gray-600 mb-8">
                    Confirma tu suscripción para activar tu plan Premium.
                </p>
                <div className="space-y-3">
                    <button
                        onClick={handleConfirmar}
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                    >
                        {loading ? "Confirmando..." : "Confirmar suscripción"}
                    </button>
                    <Link
                        to="/"
                        className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}