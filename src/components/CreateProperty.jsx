import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { AuthContext } from "../contexts/AuthContext";
import BtnInicio from "./BtnInicio";

export default function CreateProperty() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        operacion: "VENTA",
        precio: "",
        superficie: "",
        direccion: "",
        ciudad: "",
        provincia: "",
        codigoPostal: "",
        latitud: "",
        longitud: "",
        numHabitaciones: "",
        numBanios: "",
        parking: "",
        tipoPropiedad: "",
        anioConstruccion: "",
        estadoPropiedad: "",
        certificacionEnergetica: "",
        imagenes: [],
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // console.log("Formulario de creación de propiedad:", form);
    // console.log("Usuario actual:", user);
    // console.log("ID de usuario:", user?.id);
    // console.log("ID de agencia:", user?.idAgencia || "No asignada");
    // Manejo del envío del formulario

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Enviando formulario:", form);

        try {
            // Paso 1: separar imágenes del resto de datos
            const { imagenes, ...datosPropiedad } = form;

            // Paso 2: crear la propiedad (sin imágenes)
            const res = await api.post("/property", {
                ...datosPropiedad,
                imagenes: [], // evitar enviar Files
                idUsuario: user.id,
                idAgencia: user.idAgencia || null,
            });

            const propiedadCreada = res.data;
            const idProp = propiedadCreada.id;

            console.log("Propiedad creada:", propiedadCreada);

            // Paso 3: subir imágenes (si hay)
            if (imagenes.length > 0) {
                const formData = new FormData();
                for (const img of imagenes) {
                    formData.append("files", img);
                }

                const imgRes = await api.post(
                    `/property/${idProp}/imagenes`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                console.log("Imágenes subidas:", imgRes.data);
            }

            alert("Propiedad y sus imágenes se han creado correctamente.");
            navigate("/usuario");
        } catch (err) {
            console.error("Error al crear propiedad:", err);
            if (err.response?.status === 402) {
                const data = err.response.data;
                alert(data.mensaje || "Has alcanzado tu limite de propiedades.");
                navigate("/planes");
            } else {
                alert("Error al crear la propiedad: " + (err.response?.data?.error || err.message));
            }
        }
    };
    
    

    if (!user?.email) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-center p-6 bg-white rounded shadow-md">
                    <h2 className="text-4xl font-bold text-red-600 mb-4">
                        Debes iniciar sesión para crear una propiedad
                    </h2>
                    <BtnInicio />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6 text-indigo-700">
                Nueva Propiedad
            </h1>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Título
                    </label>
                    <input
                        type="text"
                        name="titulo"
                        value={form.titulo}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Título de la propiedad"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Descripción
                    </label>
                    <textarea
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Descripción de la propiedad"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Operación
                    </label>
                    <select
                        name="operacion"
                        value={form.operacion}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded bg-white"
                    >
                        <option value="VENTA">Venta</option>
                        <option value="ALQUILER">Alquiler</option>
                        <option value="OBRA_NUEVA">Obra Nueva</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Precio (€)
                    </label>
                    <input
                        type="number"
                        name="precio"
                        value={form.precio}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Precio"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Superficie (m²)
                    </label>
                    <input
                        type="number"
                        name="superficie"
                        value={form.superficie}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Superficie en m²"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Dirección
                    </label>
                    <input
                        type="text"
                        name="direccion"
                        value={form.direccion}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Dirección"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Ciudad
                    </label>
                    <input
                        type="text"
                        name="ciudad"
                        value={form.ciudad}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Ciudad"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Provincia
                    </label>
                    <input
                        type="text"
                        name="provincia"
                        value={form.provincia}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Provincia"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Código Postal
                    </label>
                    <input
                        type="text"
                        name="codigoPostal"
                        value={form.codigoPostal}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Código Postal"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Latitud
                    </label>
                    <input
                        type="number"
                        name="latitud"
                        value={form.latitud}
                        onChange={handleChange}
                        step="any"
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Latitud"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Longitud
                    </label>
                    <input
                        type="number"
                        name="longitud"
                        value={form.longitud}
                        onChange={handleChange}
                        step="any"
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Longitud"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Habitaciones
                    </label>
                    <input
                        type="number"
                        name="numHabitaciones"
                        value={form.numHabitaciones}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Número de habitaciones"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Baños
                    </label>
                    <input
                        type="number"
                        name="numBanios"
                        value={form.numBanios}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Número de baños"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Parking
                    </label>
                    <input
                        type="text"
                        name="parking"
                        value={form.parking}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Plaza de parking"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Tipo de Propiedad
                    </label>
                    <select
                        name="tipoPropiedad"
                        value={form.tipoPropiedad}
                        onChange={handleChange}
                        className="w-full p-2 border rounded bg-white"
                    >
                        <option value="">Seleccionar tipo</option>
                        <option value="PISO">Piso</option>
                        <option value="CASA">Casa</option>
                        <option value="DUPLEX">Dúplex</option>
                        <option value="ATICO">Ático</option>
                        <option value="PENTHOUSE">Penthouse</option>
                        <option value="ESTUDIO">Estudio</option>
                        <option value="VILLA">Villa</option>
                        <option value="CHALET">Chalet</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Año de Construcción
                    </label>
                    <input
                        type="number"
                        name="anioConstruccion"
                        value={form.anioConstruccion}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Año de construcción"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Estado de la Propiedad
                    </label>
                    <select
                        name="estadoPropiedad"
                        value={form.estadoPropiedad}
                        onChange={handleChange}
                        className="w-full p-2 border rounded bg-white"
                    >
                        <option value="">Seleccionar estado</option>
                        <option value="NUEVO">Nuevo</option>
                        <option value="BUEN_ESTADO">Buen estado</option>
                        <option value="REFORMAR">Para reformar</option>
                        <option value="REMODELADO">Remodelado</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Certificación Energética
                    </label>
                    <select
                        name="certificacionEnergetica"
                        value={form.certificacionEnergetica}
                        onChange={handleChange}
                        className="w-full p-2 border rounded bg-white"
                    >
                        <option value="">Seleccionar certificación</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                    </select>
                </div>

                {/* <div>
                    <label className="block text-sm font-medium mb-1">
                        URL de la imagen
                    </label>
                    <input
                        type="url"
                        name="imagenPortadaUrl"
                        value={form.imagenPortadaUrl}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="https://imagen.jpg"
                    />
                </div> */}

                <div className="mb-6">
                    <label className="block mb-2 text-gray-700 font-medium">
                        Imágenes de la propiedad
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                            setForm({ ...form, imagenes: Array.from(e.target.files) })
                        }
                        className="w-full border p-2 rounded bg-white"
                    />
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                    >
                        Crear Propiedad
                    </button>
                <BtnInicio />
                </div>
            </form>
        </div>
    );
}
