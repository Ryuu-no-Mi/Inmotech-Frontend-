import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import BtnVolver from "../components/BtnInicio";
import GoogleLoginButton from "../components/GoogleLoginButton";

export default function UserLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const nav = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(email, password);
            nav("/");
        } catch (err) {
            console.error("Login error:", err);
            alert("Login failed: " + (err.response?.data?.message || err.message));
        }
        
    }
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Iniciar Sesión
                </h2>
                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo electrónico"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Iniciar Sesion
                </button>

                <div className="relative my-5">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">o</span>
                    </div>
                </div>

                <GoogleLoginButton />

                <p className="mt-5 text-center text-sm text-gray-600">
                    No tienes cuenta?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Registrate
                    </Link>
                </p>
                <BtnVolver />
            </form>
        </div>
    );
}
