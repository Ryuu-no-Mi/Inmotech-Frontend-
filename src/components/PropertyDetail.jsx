import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Heart, HeartOff } from "lucide-react";
import SearchBar from "./SearchBar";
import { BASE_URL_IMG } from "../api";


export default function PropertyDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // console.log("PropertyDetail useEffect (Property Fetch) - id:", id);
        fetch(`http://localhost:8080/api/property/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setProperty(data))
            .catch((err) => {
                console.error("Error al cargar propiedad:", err);
            });
            console.log("usuario: " + user);
    }, [id]); // Solo se ejecuta cuando 'id' cambia

    useEffect(() => {
        // Estos logs están aquí para depuración y te muestran qué está pasando
        // console.log(
        //     "PropertyDetail useEffect (User Fetch) - property:",
        //     property
        // );
        // console.log("PropertyDetail useEffect (User Fetch) - user:", user); 
        // console.log(
        //     "PropertyDetail useEffect (User Fetch) - id (from params):",
        //     id
        // );

            if (property?.idUsuario && !user) {
                fetch(`http://localhost:8080/api/user/${property.idUsuario}`)
                    .then((res) => {
                        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
                        return res.json();
                    })
                    .then((userData) => {
                        setUser(userData);
        
                        // 🚀 Nueva petición si tiene agencia
                        if (userData.idAgencia) {
                            fetch(`http://localhost:8080/api/agency/${userData.idAgencia}`)
                                .then((res) => res.json())
                                .then((agencyData) => {
                                    setUser((prevUser) => ({
                                        ...prevUser,
                                        agencia: agencyData, // añadimos 'agencia' manualmente
                                    }));
                                })
                                .catch((err) =>
                                    console.error("Error al cargar la agencia:", err)
                                );
                        }
                    })
                    .catch((err) => console.error("Error al cargar el usuario:", err));
            }
        }, [property?.idUsuario, user]);
        

    if (!property) return <div className="p-4">Cargando...</div>;

    // console.log("PropertyDetail - imagenes:", property.imagenes);
    // console.log("PropertyDetail - imagenPortada:", property.imagenPortada);
    // console.log("PropertyDetail - imagenUrl[0].url:", property.imagenUrl[0].url);


    console.log("Imagen URL:", property.imagenes[0]?.url);
    console.log("No poner nombre con tilde o caracrtesres especiales");
    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Imagen Principal */}
                    <div className="w-full h-80 sm:h-96 md:h-[500px] bg-gray-200 flex items-center justify-center">
                        <img
                            src={
                                property.imagenes.length > 0 &&
                                property.imagenes[0]?.url
                                    ? property.imagenes[0].url.startsWith("http")
                                        ? property.imagenes[0].url
                                        : `${BASE_URL_IMG}${property.imagenes[0].url}`
                                    : "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg"
                            }
                            alt={property.titulo || "Propiedad"}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                    "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg";
                            }}
                        />
                    </div>

                    <div className="p-6 md:p-8 lg:p-10">
                        {/* Título y Descripción */}
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                            {property.titulo}
                        </h1>
                        <p className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
                            {property.precio.toLocaleString()} €
                        </p>
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                            {property.descripcion}
                        </p>

                        {/* --- Seccion --- */}

                        {/* Detalles de la Propiedad */}
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Información General
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-base">
                            <p>
                                <strong>Dirección:</strong> {property.direccion}
                                , {property.ciudad}
                            </p>
                            <p>
                                <strong>Provincia:</strong> {property.provincia}
                            </p>
                            <p>
                                <strong>Código postal:</strong>{" "}
                                {property.codigoPostal}
                            </p>
                            <p>
                                <strong>Superficie:</strong>{" "}
                                {property.superficie} m²
                            </p>
                            <p>
                                <strong>Latitud:</strong> {property.latitud}
                            </p>
                            <p>
                                <strong>Longitud:</strong> {property.longitud}
                            </p>
                            <p>
                                <strong>Tipo:</strong>{" "}
                                {property.tipoPropiedad || "N/A"}
                            </p>
                            <p>
                                <strong>Habitaciones:</strong>{" "}
                                {property.habitaciones || "N/A"}
                            </p>
                            <p>
                                <strong>Baños:</strong>{" "}
                                {property.banos || "N/A"}
                            </p>
                            <p>
                                <strong>Parking:</strong>{" "}
                                {property.parking || "N/A"}
                            </p>
                            <p>
                                <strong>Año de Construcción:</strong>{" "}
                                {property.anioConstruccion || "N/A"}
                            </p>
                            <p>
                                <strong>Estado:</strong>{" "}
                                {property.estadoPropiedad || "N/A"}
                            </p>
                            <p>
                                <strong>Certificación Energética:</strong>{" "}
                                {property.certificacionEnergetica || "N/A"}
                            </p>
                            <p>
                                <strong>Publicado el:</strong>{" "}
                                {property.fechaPublicacion?.split("T")[0]}
                            </p>
                        </div>

                        {/* --- Seccion --- */}

                        {/* Galería de imágenes */}
                        {property.imagenes && property.imagenes.length > 0 && (
                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    Galería de Imágenes
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {property.imagenes.map((img) => (
                                        <div
                                            key={img.id}
                                            className="relative w-full h-40 sm:h-48 bg-gray-200 rounded-lg overflow-hidden group"
                                        >
                                            <img
                                                src={
                                                    img.url.startsWith("http")
                                                        ? img.url
                                                        : BASE_URL_IMG + img.url
                                                }
                                                alt={`Imagen ${img.id}`}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src =
                                                        "https://via.placeholder.com/400x300?text=Imagen+no+disponible";
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- Seccion --- */}

                        {/* Información del Propietario */}
                        {user && (
                            <div className="mt-8 border-t pt-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    Publicado por
                                </h2>
                                <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                                    <img
                                        src={
                                            user.imagenUrl ||
                                            "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg"
                                        }
                                        alt={user.nombre || "Usuario"}
                                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-300"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://cdn-icons-png.flaticon.com/512/847/847969.png";
                                        }}
                                    />
                                    <div>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {user.nombre} {user.apellido}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong className="font-medium">
                                                Email:
                                            </strong>{" "}
                                            {user.email}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong className="font-medium">
                                                Teléfono:
                                            </strong>{" "}
                                            {user.telefono || "No disponible"}
                                        </p>

                                        {user.agencia && (
                                            <div className="mt-3">
                                                <p className="text-sm text-gray-600 italic">
                                                    Este usuario pertenece a la
                                                    agencia:{" "}
                                                    <span className="font-medium text-indigo-700">
                                                        {user.agencia.nombre}
                                                    </span>
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/agency/${user.agencia.id}`
                                                        )
                                                    }
                                                    className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out text-sm"
                                                >
                                                    Ver detalles de la agencia
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- Seccion --- */}

                        {/* Formulario de Consulta */}
                        <div className="mt-8 border-t pt-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                ¿Interesado? Envía una consulta al propietario
                            </h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const mensaje = e.target.mensaje.value;
                                    if (!mensaje.trim()) {
                                        alert("Por favor, escribe un mensaje.");
                                        return;
                                    }

                                    const currentUserId = user ? user.id : null;
                                    if (!currentUserId) {
                                        alert(
                                            "Debes iniciar sesión para enviar una consulta."
                                        );
                                        return;
                                    }

                                    fetch("http://localhost:8080/api/inquiry", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            mensaje,
                                            usuario: { id: currentUserId },
                                            propiedad: { id: property.id },
                                        }),
                                    })
                                        .then((res) => {
                                            if (res.ok) {
                                                alert(
                                                    "Mensaje enviado correctamente. El propietario se pondrá en contacto contigo."
                                                );
                                                e.target.reset();
                                            } else {
                                                throw new Error(
                                                    "Error al enviar la consulta. Inténtalo de nuevo."
                                                );
                                            }
                                        })
                                        .catch((err) =>
                                            alert("Error: " + err.message)
                                        );
                                }}
                                className="flex flex-col gap-4 bg-gray-100 p-6 rounded-lg shadow-sm"
                            >
                                <textarea
                                    name="mensaje"
                                    rows="5"
                                    placeholder="Escribe tu mensaje para el propietario aquí. Por ejemplo: 'Estoy interesado en la propiedad y me gustaría programar una visita.'"
                                    className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-y"
                                    required
                                ></textarea>
                                <button
                                    type="submit"
                                    className="self-end sm:self-start px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                                >
                                    Enviar consulta
                                </button>
                            </form>
                        </div>

                        {/* --- Seccion --- */}

                        {/* Botón Volver */}
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => navigate(-1)}
                                className="inline-flex items-center px-6 py-3 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                Volver al listado
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
