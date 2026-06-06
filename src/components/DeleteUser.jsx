import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DeleteUser() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleDelete() {
        if (
            !window.confirm(
                "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer."
            )
        ) {
            return;
        }

        try {
            const res = await fetch(
                `http://localhost:8080/api/user/${user.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            if (!res.ok) {
                const msg = await res.text();
                throw new Error("Error del servidor: " + msg);
            }

            alert("Cuenta eliminada con éxito.");
            logout();
            navigate("/");
        } catch (err) {
            console.error("Error al eliminar cuenta:", err);
            alert("No se pudo eliminar la cuenta: " + err.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4 text-red-600">
                    Eliminar Cuenta
                </h2>
                <p className="mb-6 text-gray-700">
                    ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción
                    es permanente.
                </p>
                <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                >
                    Sí, eliminar mi cuenta
                </button>
                <button
                    onClick={() => navigate("/usuario")}
                    className="ml-4 bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
