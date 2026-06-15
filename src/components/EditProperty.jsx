import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import BtnInicio from "./BtnInicio";
import { api, BASE_URL_IMG } from "../api";

export default function EditProperty() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { myProperties } = useContext(AuthContext);

    const [form, setForm] = useState(null);
    const [imagenes, setImagenes] = useState([]);
    const [nuevasImagenes, setNuevasImagenes] = useState([]);

    console.log("EditProperty - myProperties:", myProperties);

    useEffect(() => {
        const propiedad = myProperties.find((prop) => prop.id === parseInt(id));

        console.log("Datos de la propiedad" ,propiedad);
        if (propiedad) {
            setForm({
                titulo: propiedad.titulo ?? "",
                descripcion: propiedad.descripcion ?? "",
                precio: propiedad.precio ?? "",
                superficie: propiedad.superficie ?? "",
                direccion: propiedad.direccion ?? "",
                ciudad: propiedad.ciudad ?? "",
                provincia: propiedad.provincia ?? "",
                codigoPostal: propiedad.codigoPostal ?? "",
                latitud: propiedad.latitud ?? "",
                longitud: propiedad.longitud ?? "",
                numHabitaciones: propiedad.numHabitaciones ?? "",
                numBanios: propiedad.numBanios ?? "",
                parking: propiedad.parking ?? "",
                tipoPropiedad: propiedad.tipoPropiedad ?? "",
                anioConstruccion: propiedad.anioConstruccion ?? "",
                estadoPropiedad: propiedad.estadoPropiedad ?? "",
                certificacionEnergetica: propiedad.certificacionEnergetica ?? "",
                idUsuario: propiedad.idUsuario,
                idAgencia: propiedad.idAgencia,
            });
            setImagenes(propiedad.imagenes ?? []);
        } else {
            alert("No se encontró la propiedad.");
            navigate("/usuario");
        }
    }, [id, myProperties, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleNewImages = (e) => {
        const files = Array.from(e.target.files);
        setNuevasImagenes(files);
    };

    const handleEliminarImagen = async (imagenId) => {
        if (!window.confirm("¿Eliminar esta imagen permanentemente?")) return;

        try {
            await fetch(`http://localhost:8080/api/image/${imagenId}`, {
                method: "DELETE",
            });
            setImagenes((prev) => prev.filter((img) => img.id !== imagenId));
        } catch (err) {
            console.error("Error eliminando imagen:", err);
            alert("No se pudo eliminar la imagen.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...form,
                usuario: { id: form.idUsuario },
                agencia: form.idAgencia ? { id: form.idAgencia } : null,
            };
            delete payload.idUsuario;
            delete payload.idAgencia;

            const res = await fetch(
                `http://localhost:8080/api/property/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            const text = await res.text();
            console.log("Status:", res.status);
            console.log("Respuesta del servidor:", text);
            console.log(res)

            if (!res.ok) throw new Error("Error al actualizar la propiedad");

            // Subir nuevas imágenes si hay
            if (nuevasImagenes.length > 0) {
                const formData = new FormData();
                nuevasImagenes.forEach((file) =>
                    formData.append("files", file)
                );

                await api.post(`/property/${id}/imagenes`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            alert("Propiedad actualizada correctamente");
            navigate(`/property/${id}`);
        } catch (err) {
            console.error("Error en la actualización:", err);
            alert("Ocurrió un error al guardar los cambios");
        }
    };

    

    if (!form)
        return <div className="p-6">Cargando datos de la propiedad...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6 text-indigo-700">
                Editar Propiedad
            </h1>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <input
                    name="titulo"
                    value={form.titulo}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="Título"
                />
                <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded md:col-span-2"
                    placeholder="Descripción"
                />
                <input
                    name="precio"
                    type="number"
                    value={form.precio}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="Precio"
                />
                <input
                    name="superficie"
                    type="number"
                    value={form.superficie}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="Superficie"
                />
                <input
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="Dirección"
                />
                <input
                    name="ciudad"
                    value={form.ciudad}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="Ciudad"
                />
                <input
                    name="provincia"
                    value={form.provincia}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="Provincia"
                />
                <input
                    name="codigoPostal"
                    value={form.codigoPostal}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="Código Postal"
                />
                <input
                    name="latitud"
                    type="number"
                    step="any"
                    value={form.latitud ?? ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Latitud"
                />
                <input
                    name="longitud"
                    type="number"
                    step="any"
                    value={form.longitud ?? ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Longitud"
                />
                <input
                    name="numHabitaciones"
                    type="number"
                    value={form.numHabitaciones ?? ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Habitaciones"
                />
                <input
                    name="numBanios"
                    type="number"
                    value={form.numBanios ?? ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Baños"
                />
                <input
                    name="parking"
                    value={form.parking ?? ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Parking"
                />
                <select
                    name="tipoPropiedad"
                    value={form.tipoPropiedad ?? ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-white"
                >
                    <option value="">Tipo de propiedad</option>
                    <option value="PISO">Piso</option>
                    <option value="CASA">Casa</option>
                    <option value="DUPLEX">Dúplex</option>
                    <option value="ATICO">Ático</option>
                    <option value="PENTHOUSE">Penthouse</option>
                    <option value="ESTUDIO">Estudio</option>
                    <option value="VILLA">Villa</option>
                    <option value="CHALET">Chalet</option>
                </select>
                <input
                    name="anioConstruccion"
                    type="number"
                    value={form.anioConstruccion ?? ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Año de construcción"
                />
                <select
                    name="estadoPropiedad"
                    value={form.estadoPropiedad ?? ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-white"
                >
                    <option value="">Estado de la propiedad</option>
                    <option value="NUEVO">Nuevo</option>
                    <option value="BUEN_ESTADO">Buen estado</option>
                    <option value="REFORMAR">Para reformar</option>
                    <option value="REMOBLADO">Remodelado</option>
                </select>
                <select
                    name="certificacionEnergetica"
                    value={form.certificacionEnergetica ?? ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-white"
                >
                    <option value="">Certificación energética</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                </select>

                {/* Seccion de la imagenes */}
                <div className="md:col-span-2">
                    <h3 className="font-semibold mb-2">Imágenes actuales</h3>
                    <div className="flex gap-4 overflow-x-auto mb-4">
                        {imagenes.map((img) => (
                            <div key={img.id} className="relative">
                                <img
                                    src={
                                                                    imagenes.length > 0 &&
                                                                    imagenes[0]?.url
                                                                        ? imagenes[0].url.startsWith("http")
                                                                            ? imagenes[0].url
                                                                            : `${BASE_URL_IMG}${imagenes[0].url}`
                                                                        : "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg"
                                    }
                                    alt="Imagen"
                                    className="w-32 h-32 object-cover border"
                                />
                                <button
                                    onClick={() => handleEliminarImagen(img.id)}
                                    className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 py-0.5 rounded"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>

                    <label className="block font-semibold mb-1">
                        Añadir nuevas imágenes
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleNewImages}
                            className="block w-full mt-2"
                        />
                    </label>

                    {nuevasImagenes.length > 0 && (
                        <div className="mt-2 flex gap-2 overflow-x-auto">
                            {nuevasImagenes.map((file, idx) => (
                                <img
                                    key={idx}
                                    src={URL.createObjectURL(file)}
                                    alt="preview"
                                    className="w-24 h-24 object-cover border"
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                    >
                        Guardar Cambios
                    </button>
                    <BtnInicio />
                </div>
            </form>
        </div>
    );
}
