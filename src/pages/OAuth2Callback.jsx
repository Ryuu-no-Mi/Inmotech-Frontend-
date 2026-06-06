import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function OAuth2Callback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { loginWithGoogle } = useContext(AuthContext);

    useEffect(() => {
        const dataParam = searchParams.get("data");
        if (!dataParam) {
            alert("Error: No se recibieron datos de autenticacion");
            navigate("/login");
            return;
        }

        try {
            const data = JSON.parse(decodeURIComponent(dataParam));
            loginWithGoogle(data.token, data.email, data.userId);
            navigate("/");
        } catch (err) {
            console.error("Error procesando callback OAuth2:", err);
            alert("Error al iniciar sesion con Google");
            navigate("/login");
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <p className="text-gray-600 text-lg">Iniciando sesion con Google...</p>
        </div>
    );
}
