import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import BtnInicio from "../components/BtnInicio";

export default function Register() {

    const [data, setData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        telefono: "",
        fechaNacimiento: "",
        idAgencia: null,
        imagenUrl: "",
        imagenFile: null,
    });

    const { register } = useContext(AuthContext);
    const nav = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const [yyyy, mm, dd] = data.fechaNacimiento.split("-");
            const fechaFormateada = `${dd}/${mm}/${yyyy}`;

            const datosFormateados = {
                ...data,
                fechaNacimiento: fechaFormateada,
            };

            console.log("Enviando datos al backend:", datosFormateados);

            await register(datosFormateados); // Ya incluye login e imagen
            alert("Registro completo");
            nav("/");
        } catch (err) {
            console.error("Register failed:", err);
            alert("Error al registrar: " + err.message);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Regístrate
                </h2>

                {/* SECCIÓN 1: Datos personales */}
                <fieldset className="mb-6 border-t pt-4">
                    <legend className="text-lg font-semibold text-gray-700 mb-2">
                        Información personal
                    </legend>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={data.nombre}
                            onChange={(e) =>
                                setData({ ...data, nombre: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Apellido"
                            value={data.apellido}
                            onChange={(e) =>
                                setData({ ...data, apellido: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4 relative">
                        {" "}
                        {/* Añadimos 'relative' */}
                        <input
                            // Cambiamos el tipo dinámicamente
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            value={data.password}
                            onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                            }
                            // Añadimos padding-right para el icono
                            className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
                        />
                        {/* Botón/Icono para alternar la visibilidad */}
                        <button
                            type="button" // Importante para que no envíe el formulario
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700"
                            aria-label={
                                showPassword
                                    ? "Ocultar contraseña"
                                    : "Mostrar contraseña"
                            }
                        >
                            {showPassword ? (
                                // Icono de ojo tachado (SVG)
                                <svg
                                    viewBox="-2.4 -2.4 28.80 28.80"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    stroke="#000000"
                                    className="w-5 h-5"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke="#CCCCCC"
                                        stroke-width="0.048"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                            d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                                            stroke="#000000"
                                            stroke-width="1.656"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        ></path>{" "}
                                    </g>
                                </svg>
                            ) : (
                                // Icono de ojo (SVG)
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.575 3.01 9.963 7.172.07.29.07.595 0 .889C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.575-3.01-9.963-7.172Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="mb-4">
                        <input
                            type="tel"
                            placeholder="Teléfono"
                            value={data.telefono}
                            onChange={(e) =>
                                setData({ ...data, telefono: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">
                            Fecha de nacimiento:
                        </label>
                        <input
                            type="date"
                            value={data.fechaNacimiento}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    fechaNacimiento: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    {/* <div className="mb-4">
                        <input
                            type="number"
                            placeholder="ID de Agencia (opcional)"
                            value={data.idAgencia || ""}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    idAgencia: e.target.value
                                        ? Number(e.target.value)
                                        : null,
                                })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div> */}
                </fieldset>

                {/* SECCIÓN 2: Imagen */}
                <fieldset className="mb-6 border-t pt-4">
                    <legend className="text-lg font-semibold text-gray-700 mb-2">
                        Foto de perfil
                    </legend>
                    {/* <div className="mb-4">
                        <input
                            type="url"
                            placeholder="URL de Imagen (opcional)"
                            value={data.imagenUrl}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    imagenUrl: e.target.value,
                                    imagenFile: null,
                                })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div> */}
                    <div className="mb-4 bg-gray-50 p-4 rounded-md border border-gray-300">
                        <label className="flex justify-center mb-2 text-gray-700">
                            Selecciona una imagen:
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    imagenFile: e.target.files[0],
                                    imagenUrl: "",
                                })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-m"
                        />
                    </div>
                </fieldset>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    Registrarse
                </button>
            </form>
            <BtnInicio />
        </div>
    );
}
