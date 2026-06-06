import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import BtnVolver from "../components/BtnInicio";

export default function DashboardUser() {
    const { user, myProperties, setMyProperties, favorites } =
        useContext(AuthContext);
    const [agency, setAgency] = useState(null);
    const [favoriteProperties, setFavoriteProperties] = useState([]);
    const [deletingId, setDeletingId] = useState(null);
    const [limits, setLimits] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            api.get("/subscription/limits")
                .then((res) => setLimits(res.data))
                .catch(() => {});
        }
    }, []);

    useEffect(() => {
        if (user?.idAgencia) {
            api.get(`/agency/${user.idAgencia}`)
                .then((res) => setAgency(res.data))
                .catch((err) => console.error("Error cargando agencia", err));
        }
    }, [user]);

    useEffect(() => {
        console.log("Usuario cargado:", user);
    }, [user]);

    useEffect(() => {
        console.log("Propiedades favoritas ", favorites);
        console.log("aaaa ---", user);
        
        if (favorites.length > 0) {
            Promise.all(favorites.map((id) => api.get(`/property/${id}`)))
                .then((responses) =>
                    setFavoriteProperties(responses.map((r) => r.data))
                )
                .catch((err) => console.error("Error cargando favoritos", err));
        }
    }, [favorites]);

    if (!user || !user.email) {
        return (
            <div className="p-4 text-center text-red-500">
                Debes iniciar sesión para ver tu perfil.
                <BtnVolver />
            </div>
        );
    }

    const handleDelete = async (id) => {
        if (
            !window.confirm(
                "¿Estás seguro de que quieres eliminar esta propiedad?"
            )
        )
            return;
        setDeletingId(id);
        try {
            await api.delete(`/property/${id}`);
            alert("Propiedad eliminada correctamente.");
            setMyProperties((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Error al eliminar propiedad:", error);
            alert("No se pudo eliminar la propiedad. Verifica tus permisos.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-indigo-700 mb-6">
                Mi Perfil
            </h1>

            {/* Datos personales */}
            <div className="flex gap-4 justify-between bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Información personal
                    </h2>
                    <p>
                        <strong>Nombre:</strong> {user.nombre}
                    </p>
                    <p>
                        <strong>Apellidos:</strong> {user.apellido}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Teléfono:</strong>{" "}
                        {user.telefono || "No especificado"}
                    </p>
                    <p>
                        <strong>Fecha de nacimiento:</strong>{" "}
                        {user.fechaNacimiento}
                    </p>
                    <p>
                        <strong>Registrado el:</strong> {user.fechaRegistro}
                    </p>
                </div>

                <div className="flex-shrink-0 p-4">
                    <p className="text-lg text-gray-800 mb-2">
                        <strong>Imagen de perfil:</strong>
                    </p>
                    <div className="flex items-center mt-2">
                        <img
                            src={
                                user.imagenUrl
                                    ? `http://localhost:8080${user.imagenUrl.replace(/\\/g,"/")}`
                                    : "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg"
                            }
                            alt="Imagen de perfil"
                            className="w-32 h-32 rounded-full object-cover mt-2"
                        />
                    </div>
                </div>

                <div className="flex flex-col flex-shrink-0 p-4">
                    <p className="text-lg text-center text-gray-800 mb-2">
                        <strong>Acciones:</strong>
                    </p>
                    <button
                        onClick={() => navigate("/edit-user")}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        Editar perfil
                    </button>
                    <button
                        onClick={() => navigate("/coming-soon")}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition mt-2"
                    >
                        Cambiar contraseña
                    </button>
                    <button
                        onClick={() => navigate("/delete-account")}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition mt-2"
                    >
                        Eliminar cuenta
                    </button>
                </div>
            </div>

            {/* Suscripcion y limites */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Mi suscripcion
                        </h2>
                        {limits ? (
                            <div className="space-y-1">
                                <p className="text-sm text-gray-600">
                                    Plan: <strong>{limits.planNombre}</strong>
                                    {limits.esPremium && (
                                        <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
                                            PREMIUM
                                        </span>
                                    )}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Propiedades: {limits.propiedadesActuales} /{" "}
                                    {limits.limiteMaximo === 2147483647 ? "∞" : limits.limiteMaximo}
                                </p>
                                {!limits.esPremium && limits.propiedadesRestantes > 0 && (
                                    <p className="text-sm text-green-600">
                                        Te quedan {limits.propiedadesRestantes} propiedades por publicar
                                    </p>
                                )}
                                {!limits.esPremium && limits.propiedadesRestantes <= 0 && (
                                    <p className="text-sm text-red-600 font-semibold">
                                        Has alcanzado el limite. Actualiza tu plan para seguir publicando.
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">Cargando...</p>
                        )}
                    </div>
                    <button
                        onClick={() => navigate("/planes")}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition text-sm"
                    >
                        {limits?.esPremium ? "Gestionar plan" : "Mejorar plan"}
                    </button>
                </div>
            </div>

            {/* Agencia */}
            {agency && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Mi agencia
                    </h2>
                    <p>
                        <strong>Nombre:</strong> {agency.nombre}
                    </p>
                    <p>
                        <strong>Descripción:</strong> {agency.descripcion}
                    </p>
                </div>
            )}

            {/* Favoritos */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Mis favoritos ({favoriteProperties.length})
                </h2>
                {favoriteProperties.length === 0 ? (
                    <p className="text-gray-600">
                        No tienes propiedades favoritas.
                    </p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {favoriteProperties.map((prop) => (
                            <div
                                key={prop.id}
                                className="cursor-pointer border rounded shadow p-4 bg-gray-50 hover:bg-gray-100"
                                onClick={() => navigate(`/property/${prop.id}`)}
                            >
                                <h3 className="text-lg font-bold">
                                    {prop.titulo}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {prop.direccion}, {prop.ciudad}
                                </p>
                                <p className="text-indigo-600 font-semibold mt-2">
                                    €{prop.precio.toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Mis propiedades */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Mis propiedades ({myProperties.length})
                </h2>
                {myProperties.length === 0 ? (
                    <p className="text-gray-600">
                        No tienes propiedades registradas.
                    </p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {myProperties.map((prop) => (
                            <div
                                key={prop.id}
                                className="border rounded shadow p-4 bg-gray-50 hover:bg-gray-100 flex flex-col justify-between"
                            >
                                <div
                                    className="cursor-pointer"
                                    onClick={() =>
                                        navigate(`/property/${prop.id}`)
                                    }
                                >
                                    <h3 className="text-lg font-bold">
                                        {prop.titulo}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {prop.direccion}, {prop.ciudad}
                                    </p>
                                    <p className="text-indigo-600 font-semibold mt-2">
                                        €{prop.precio.toLocaleString()}
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        navigate(`/property/${prop.id}/edit`)
                                    }
                                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-800 transition mt-4"
                                >
                                    Editar propiedad
                                </button>

                                <button
                                    disabled={deletingId === prop.id}
                                    onClick={() => handleDelete(prop.id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition mt-2 disabled:opacity-50"
                                >
                                    {deletingId === prop.id
                                        ? "Eliminando..."
                                        : "Borrar propiedad"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <BtnVolver />
        </div>
    );
}
