import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { AuthContext } from "../contexts/AuthContext";
import BtnVolver from "./BtnInicio";


export default function CrearAgencia() {
    const { user,logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        // direccion: "",
        // ciudad: "",
        // provincia: "",
        // telefono: "",
        // email: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/agency", { ...form, idUsuarioAdmin: user.id });
            alert("Agencia creada correctamente");
            logout();
            navigate("/usuario");
        } catch (err) {
            console.error("Error al crear la agencia:", err);
            alert("Ocurrió un error al crear la agencia");
        }
    };

    if (!user?.email) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-center p-6 bg-white rounded shadow-md">
                    <h2 className="text-4xl font-bold text-red-600 mb-4">
                        Debes iniciar sesión para crear una agencia.
                    </h2>
                    <BtnVolver />
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen px-4 bg-gray-100">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-6 text-center">
                    Crear Agencia
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="grid gap-4 sm:grid-cols-2"
                >
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                            placeholder="Nombre de la agencia"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción
                        </label>
                        <input
                            type="textarea"
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            placeholder="Descripción"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dirección
                        </label>
                        <input
                            type="text"
                            name="direccion"
                            value={form.direccion}
                            onChange={handleChange}
                            required
                            placeholder="Dirección"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div> */}

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ciudad
                        </label>
                        <input
                            type="text"
                            name="ciudad"
                            value={form.ciudad}
                            onChange={handleChange}
                            required
                            placeholder="Ciudad"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div> */}

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Provincia
                        </label>
                        <input
                            type="text"
                            name="provincia"
                            value={form.provincia}
                            onChange={handleChange}
                            required
                            placeholder="Provincia"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div> */}

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            name="telefono"
                            value={form.telefono}
                            onChange={handleChange}
                            required
                            placeholder="Teléfono"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="Correo electrónico"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div> */}

                    <div className="sm:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                        >
                            Crear Agencia
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
