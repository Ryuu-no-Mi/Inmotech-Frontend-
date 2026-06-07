import { useNavigate, Link } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function SuscripcionCancelada() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
                <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Pago cancelado
                </h1>
                <p className="text-gray-600 mb-8">
                    No te preocupes, no se ha realizado ningun cargo. Puedes volver a intentarlo cuando quieras.
                </p>
                <div className="space-y-3">
                    <Link
                        to="/planes"
                        className="block w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                    >
                        Volver a los planes
                    </Link>
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