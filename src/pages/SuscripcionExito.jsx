import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function SuscripcionExito() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/planes");
        }, 8000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    ¡Suscripcion activada!
                </h1>
                <p className="text-gray-600 mb-8">
                    Bienvenido a Inmotech Premium. Ahora tienes acceso ilimitado a todas las funcionalidades.
                </p>
                <div className="space-y-3">
                    <Link
                        to="/usuario"
                        className="block w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                    >
                        Ir a mi perfil
                    </Link>
                    <Link
                        to="/"
                        className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
                    >
                        Volver al inicio
                    </Link>
                </div>
                <p className="text-sm text-gray-400 mt-6">
                    Redirigiendo automaticamente en 8 segundos...
                </p>
            </div>
        </div>
    );
}